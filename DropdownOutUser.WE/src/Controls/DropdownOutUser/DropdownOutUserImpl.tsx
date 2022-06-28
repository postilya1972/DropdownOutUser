import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { DropdownOutUser, DropdownOutUserParams } from "./DropdownOutUser";
import { InputBasedControlImpl, InputBasedControlState } from "@docsvision/webclient/System/InputBasedControlImpl";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { ComboBoxTitle } from "@docsvision/webclient/Helpers/ComboBox/ComboBoxTitle";
import { resources } from "@docsvision/webclient/System/Resources";
import { CancelableEvent } from "@docsvision/webclient/System/CancelableEvent";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { SimpleEvent } from "@docsvision/webclient/System/SimpleEvent";
import { EditMode } from "@docsvision/webclient/System/EditMode";
import { Helpers } from "@docsvision/webclient/Legacy/Utils";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { classIfNot } from "@docsvision/webclient/System/CssUtils";
import { IValidationParams } from "@docsvision/webclient/System/IValidationParams";
import { IValidationResult } from "@docsvision/webclient/System/IValidationResult";
import { IEditPopoverProps } from "@docsvision/webclient/Helpers/PopoverHelpers/EditPopover/IEditPopoverProps";
import { LabeledText } from "@docsvision/webclient/Helpers/LabeledText";
import { getRequiredLabel } from "@docsvision/webclient/System/GetRequiredLabel";
import { ComboBoxWrapper } from "@docsvision/webclient/Helpers/ComboBox/ComboBoxWrapper";
import { ComboBoxWrapperContent } from "@docsvision/webclient/Helpers/ComboBox/Helpers/ComboBoxWrapperContent";
import { ComboBoxTitleContent } from "@docsvision/webclient/Helpers/ComboBox/Helpers/ComboBoxTitleContent";
import { PopoverComboBoxBodyContent } from "@docsvision/webclient/Helpers/ComboBox/Helpers/PopoverComboBoxBodyContent";
import { ClosePopoverListener } from "@docsvision/webclient/Helpers/PopoverHelpers/ClosePopoverListener";
import { Focusable } from "@docsvision/webclient/Helpers/FocusManagement/Focusable";
import { ComboBoxElement } from "@docsvision/webclient/Helpers/ComboBox/ComboBoxElement";
import { ComboBoxElementContent } from "@docsvision/webclient/Helpers/ComboBox/Helpers/ComboBoxElementContent";
import { PopoverMode } from "@docsvision/webclient/Helpers/PopoverHelpers/Popover";

/** @internal */
export interface DropdownOutUserState extends DropdownOutUserParams, InputBasedControlState<string> {
    binding: IBindingResult<string>;
    onMouseDownEvent: boolean;
    passedValidation?: boolean;
}

/** @internal */
export type DropdownOutUserImplState = DropdownOutUserState;

/** @internal */
export class DropdownOutUserImpl extends InputBasedControlImpl<string, DropdownOutUserParams, DropdownOutUserState> {
    /**
     * Корневой узел дропдауна
     */
    protected el: HTMLElement;
    /**
     * Сфокусированный элемент
     */
    protected focusedElement: GenModels.BindingMetadata;
    /**
     * Заголовок комбобокса
     */
    protected comboboxTitle: ComboBoxTitle;

    /**
     * Предыдущий сфокусированный элемент (глобально)
     */
    protected prevActiveElement: HTMLElement;
    protected prevActiveElementEvent: (event: FocusEvent) => void;

    static readonly EMPTY_ELEMENT: GenModels.BindingMetadata = { key: null, value: resources.DropDown_NotSelectedValue };
    /**
     * Родительский модальный элемент (ModalDialog), если такой существует
     */
    private parentModal;

    constructor(props: DropdownOutUserParams, state: DropdownOutUserState) {
        super(props, state);

        this.onDropdownOutUserContainerClick = this.onDropdownOutUserContainerClick.bind(this);
        this.onElementClick = this.onElementClick.bind(this);
        this.onClearValueClick = this.onClearValueClick.bind(this);

        this.state.collapsing = CancelableEvent.Create<IEventArgs>(this.state.wrapper);
        this.state.collapsed = SimpleEvent.Create<IEventArgs>(this.state.wrapper);
        this.state.expanding = CancelableEvent.Create<IEventArgs>(this.state.wrapper);
        this.state.expanded = SimpleEvent.Create<IEventArgs>(this.state.wrapper);
        this.state.onMouseDownEvent = false;
    }

    UNSAFE_componentWillMount() {
        super.UNSAFE_componentWillMount();
        if (typeof this.state.currentValue === 'undefined' && this.state.editMode === EditMode.Edit) {
            this.setValue(this.getDefaultValue(), false);
        }

        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('focus', this.handleDocumentFocus, true);
    }

    async componentDidMount() {
        let control = this.state.wrapper && ReactDOM.findDOMNode(this.state.wrapper);
        let element = control.parentNode as HTMLElement;
        while (element && !this.parentModal) {
            if (element.classList?.contains("modal-dialog-box-helper")) {
                this.parentModal = element;
            }
            element = element.parentNode as HTMLElement;
        }
        this.parentModal && this.parentModal.addEventListener('click', this.handleDocumentClick);
        try {
            //Запрос списка пользователей из внешней системы
            const users = await this.state.services.dropdownOutUserController.getUsersInfo();
            this.setState({ items: users});
        } catch {
            alert("Возникла ошибка при запросе данных о пользователях из внешенй системы");
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('focus', this.handleDocumentFocus);
        this.parentModal && this.parentModal.removeEventListener('click', this.handleDocumentClick);

        super.componentWillUnmount();
    }

    protected handleDocumentClick = (event?: Event) => {
        let target = Helpers.GetTarget(event);
        let domElement = this.componentDOMNode;
        if (domElement && !domElement.contains(target) && !this.state.isCollapsed) {
            this.toggleCollapsed();
        }
    };

    protected handleDocumentFocus = (event: FocusEvent) => {
        this.prevActiveElement = event.target as HTMLElement;
    };

    setValue(value: string, redraw: boolean) {
        super.setValue(value, redraw);

        if (!this.state.isCollapsed) {
            this.collapseDropdownOutUser();

            if (this.comboboxTitle) {
                const title = ReactDOM.findDOMNode(this.comboboxTitle) as HTMLInputElement;
                if (title && title.focus) {
                    title.focus();
                }
            }
        }
    }

    protected getTextValue(): string {
        let key = this.getValue();
        return this.getTextValueFor(key);
    }

    public getTextValueFor(key: string) {
        let element = this.state.items && this.state.items.find(l => l.key == key);
        return !!element && element.value || '';
    }

    protected onDropdownOutUserContainerClick(e?: any) {
        if (this.editAvailable && (!e || !e.target.classList.contains("clear-button-icon"))) {
            this.toggleCollapsed();
        }
    }

    protected onElementClick(element: GenModels.BindingMetadata) {
        this.setValue(element.key, true);
    }

    protected onClearValueClick(e: React.MouseEvent<any>) {
        e.preventDefault();
        this.setValue(null, true);
    }

    protected onPlaceholderClick(event) {
        this.onDropdownOutUserContainerClick(event);
    }

    protected toggleCollapsed = (): CancelableEventArgs<IEventArgs> => {
        return this.state.isCollapsed ? this.expandDropdownOutUser() : this.collapseDropdownOutUser();
    };

    protected expandDropdownOutUser = (): CancelableEventArgs<IEventArgs> => {
        const trigger = CancelableEvent.cast(this.state.expanding).trigger();
        trigger.accepted(() => {
            this.setState({
                isCollapsed: false
            }, () => {
                SimpleEvent.cast(this.state.expanded).trigger();
            });
        });

        return trigger;
    };

    protected collapseDropdownOutUser = (): CancelableEventArgs<IEventArgs> => {
        const trigger = CancelableEvent.cast(this.state.collapsing).trigger();
        trigger.accepted(() => {
            this.setState({
                isCollapsed: true
            }, () => {
                SimpleEvent.cast(this.state.collapsed).trigger();
            });
        });

        return trigger;
    };

    protected onCloseDropdownOutUserTriggered = () => {
        if (!this.state.isCollapsed) {
            this.collapseDropdownOutUser();
        }
    }

    protected isNotSameDropdownOutUser = (target: HTMLElement) => {
        return $(target).closest('.dv-control[data-control-name="' + this.state.name + '"]').length === 0;
    };

    protected getCssClass(): string {
        return super.getCssClass() + classIfNot(this.state.passedValidation, "validation-input");
    }

    protected onInputFocus(event: React.FocusEvent<any>) {
        if (this.isNotSameDropdownOutUser(this.prevActiveElement)) {
            super.onInputFocus(event);
        }
    }

    protected onMouseDown() {
        this.state.onMouseDownEvent = true;
    }

    protected onInputBlur(event: React.FocusEvent<any>) {
        setTimeout(() => {
            if (this.isNotSameDropdownOutUser(document.activeElement as HTMLElement)) {
                if (!this.state.onMouseDownEvent) {
                    this.setState({ inputFocused: false });
                    this.validate({ ShowErrorMessage: true } as IValidationParams);
                    super.onInputBlur(event);
                } else {
                    this.state.onMouseDownEvent = false;
                }
            }
        }, 0);
    }

    public validate(params: any): IValidationResult;
    public validate(params: IValidationParams): IValidationResult {
        if (this.state.required) {
            let message = this.state.visibility ? resources.Validation_FieldRequired :
                resources.Error_HiddenParameter?.format(this.state.name);
            let passed = this.hasValue();
            let result = {
                Passed: passed,
                Message: passed ? null : message,
                Visibility: this.state.visibility
            } as IValidationResult;

            if (!result.Passed && params.ShowErrorMessage) {
                this.setState({
                    validationMessage: result.Message
                });
                this.state.passedValidation = false;
                this.forceUpdate();
            } else if (result.Passed) {
                this.state.passedValidation = true;
                this.forceUpdate();
            }
            return result;
        } else {
            return { Passed: true, Message: "" };

        }
    }


    /**
     * При фокусе элемента списка
     * @param event Событие фокуса
     * @param element Текущий элемент
     */
    protected onFocusElement = (event: React.FocusEvent<any>, element: GenModels.BindingMetadata) => {
        this.focusedElement = element;
        if (this.isNotSameDropdownOutUser(this.prevActiveElement)) {
            super.onInputFocus(event);
        }
    }

    /**
     * При снятии фокуса у элемента списка
     * @param event Событие снятия фокуса
     * @param element Текущий элемент
     */
    protected onBlurElement = (event: React.FocusEvent<any>, element: GenModels.BindingMetadata) => {
        (this.focusedElement && this.focusedElement.key == element.key) && (this.focusedElement = null);

        setTimeout(() => {
            if (this.isNotSameDropdownOutUser(document.activeElement as HTMLElement)) {
                super.onInputBlur(event);
            }
        }, 0);
    }

    /**
     * При фокусе соседнего элемента в списке
     * @param element Текущий элемент
     * @param mode Какой из соседних элементов должен получить фокус (предыдущий или следующий)
     */
    protected onFocusSiblingElement = (element: GenModels.BindingMetadata, mode: 'prev' | 'next') => {
        let elementPosition = this.state.items.findIndex(el => el.key == element.key);
        if (elementPosition == -1 && !(this.state.isEmptyKeyAllowed && !this.state.required && element.key == null)) {
            return;
        }

        elementPosition += (mode == 'prev') ? -1 : 1;

        const siblingElement = (this.state.isEmptyKeyAllowed && !this.state.required && elementPosition == -1) ?
            DropdownOutUserImpl.EMPTY_ELEMENT :
            this.state.items[elementPosition];

        if (siblingElement && (!this.focusedElement || this.focusedElement.key != siblingElement.key)) {
            this.focusedElement = siblingElement;
            this.forceUpdate();
        }
    }

    protected showEditPopover(popoverOptions?: IEditPopoverProps): Promise<DropdownOutUser> {
        popoverOptions = popoverOptions || {} as IEditPopoverProps;
        popoverOptions.className = classNames(popoverOptions.className, "dropdown-edit-popover");
        return super.showEditPopover(popoverOptions) as any;
    }

    protected renderWithText() {
        this.updateValidationMessage();

        return (
            <div>
                <LabeledText label={this.state.labelText} text={this.getTextValue()}
                    alignment={this.state.services.labelWidth && this.state.services.labelWidth.alignment}
                    labelWidth={this.state.services.labelWidth && this.state.services.labelWidth.width}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    showEmpty={this.state.showEmptyLabel || this.state.hadValue}
                    onTextClick={this.onValueClick} attachText={this.attachText}
                    wrapLongTextUnderLabel={this.state.wrapLongValueUnderLabel}
                    clickableText={this.canShowEditDialog()}
                    title={this.state.tip} valueTitle={this.getValueTitle()} tabIndex={this.getTabIndex()} />
                {this.state.validationMessage ? this.renderValidationMessage() : ""}
            </div>
        );
    }

    protected renderInto(props: DropdownOutUserParams, container: HTMLElement): void {
        ReactDOM.render(<DropdownOutUser {...props} key={props.name} />, container);
    }

    protected renderInput(): React.ReactNode {
        let currentPlaceHolder = this.state.placeHolder;
        if (this.state.required) {
            currentPlaceHolder = (this.state.placeHolder ? getRequiredLabel(this.state.placeHolder) : "*");
        }
        const placeholderTitle = (!this.state.inputFocused && this.state.isCollapsed && currentPlaceHolder);
        let title = (this.getValue() == null || this.getValue() == '') ?
            (placeholderTitle || DropdownOutUserImpl.EMPTY_ELEMENT.value) :
            (this.getTextValue());

        return (
            <div ref={el => this.el = el}>
                {<div className="combobox-label text-trim">
                    {this.state.required ? (getRequiredLabel(this.state.labelText || "")) : this.state.labelText || ""}
                </div>}
                <ComboBoxWrapper disabled={!this.editAvailable}>
                    <ComboBoxWrapperContent title={
                        <ComboBoxTitle ref={ref => this.comboboxTitle = ref} disabled={!this.editAvailable}
                            className='dropdown-combobox-title-helper'
                            onFocus={this.onInputFocus}
                            onBlur={this.onInputBlur}
                            expanded={!this.state.isCollapsed}
                            tabIndex={this.getTabIndex() == 0}
                            onClick={this.onDropdownOutUserContainerClick}>
                            <ComboBoxTitleContent>{title}</ComboBoxTitleContent>
                        </ComboBoxTitle>} body={

                            <PopoverComboBoxBodyContent mode={PopoverMode.BottomDropdown} isOpen={!this.state.isCollapsed}
                                className={classNames("combobox-helper", this.props.name)}>
                                <div data-control-name={this.state.name}>
                                    <ClosePopoverListener onClose={this.onCloseDropdownOutUserTriggered} boundaryTarget={this.el}>
                                        <Focusable selectorToFocus='.combobox-element-helper-selected' selectorToReturnFocus={null}>
                                            {this.state.isEmptyKeyAllowed && !this.state.required && <ComboBoxElement tabIndex={true}
                                                selected={!this.hasValue()}
                                                focused={this.focusedElement && this.focusedElement.key == null}
                                                onSelect={() => this.setValue(null, true)}
                                                onFocus={event => this.onFocusElement(event, DropdownOutUserImpl.EMPTY_ELEMENT)}
                                                onBlur={event => this.onBlurElement(event, DropdownOutUserImpl.EMPTY_ELEMENT)}
                                                onFocusNext={() => this.onFocusSiblingElement(DropdownOutUserImpl.EMPTY_ELEMENT, 'next')}
                                                onFocusPrev={() => this.onFocusSiblingElement(DropdownOutUserImpl.EMPTY_ELEMENT, 'prev')}>
                                                <ComboBoxElementContent>{DropdownOutUserImpl.EMPTY_ELEMENT.value}</ComboBoxElementContent>
                                            </ComboBoxElement>}
                                            <div className="dropdown-variants-list">
                                                {this.state.items.map((element: GenModels.Element) => {
                                                    return <ComboBoxElement key={element.key}
                                                        id={element.key}
                                                        tabIndex={true}
                                                        selected={element.key == this.getValue()}
                                                        focused={this.focusedElement && this.focusedElement.key == element.key}
                                                        onMouseDown={() => this.onMouseDown()}
                                                        onSelect={() => this.onElementClick(element)}
                                                        onFocus={event => this.onFocusElement(event, element)}
                                                        onBlur={event => this.onBlurElement(event, element)}
                                                        onFocusNext={() => this.onFocusSiblingElement(element, 'next')}
                                                        onFocusPrev={() => this.onFocusSiblingElement(element, 'prev')}>
                                                        <ComboBoxElementContent>
                                                            {this.state.elementContentRenderFunc
                                                                ? this.state.elementContentRenderFunc(element)
                                                                : element.value}
                                                        </ComboBoxElementContent>
                                                    </ComboBoxElement>;
                                                })}
                                            </div>
                                        </Focusable>
                                    </ClosePopoverListener>
                                </div>
                            </PopoverComboBoxBodyContent>} />
                </ComboBoxWrapper>
            </div>
        );
    }

    protected renderPlaceholder() {
        return null;
    }
}
