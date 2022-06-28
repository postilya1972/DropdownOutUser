import { app } from "@docsvision/webclient/App";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { $LabelWidth } from "@docsvision/webclient/System/$LabelWidth";
import { BasicApiEvent, CancelableApiEvent } from "@docsvision/webclient/System/ApiEvent";
import { setNewValueDisplayName, setSavedValueDisplayName } from "@docsvision/webclient/System/BindingMetadataConstants";
import { apiEvent } from "@docsvision/webclient/System/Event";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";
import { at, handler } from "@docsvision/webclient/System/Handler";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { InputBasedControl, InputBasedControlParams } from "@docsvision/webclient/System/InputBasedControl";
import { $EditOperationStore, $LayoutInfo } from "@docsvision/webclient/System/LayoutServices";
import { editOperationAvailable } from "@docsvision/webclient/System/OperationUtils";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { Optional } from "@docsvision/webclient/System/ServiceContainer";
import { $DropdownOutUserController } from "../../Services/DropdownOutUserController";
import { DropdownOutUserImpl, DropdownOutUserState } from "./DropdownOutUserImpl";

/**
 * Содержит публичные свойства элемента управления [Раскрывающийся список]{@link DropdownOutUser}.
 */
export class DropdownOutUserParams extends InputBasedControlParams<string> {
    /** Стандартный CSS класс со стилями элемента управления */
    @r standardCssClass?: string = "system-dropdown";

    /** Список элементов, доступных для выбора */
    @rw items: GenModels.Element[] = [];

    /** Флаг развернутости Раскрывающегося списка */
    @rw isCollapsed?: boolean = true;

    /** Доступно ли нулевое значение для выбора. Как правило значение сооветствует настройкам привязанного поля карточки в метаданных. */
    @rw isEmptyKeyAllowed?: boolean = false;

    /** Событие возникает при сворачивании Раскрывающегося списка. */
    @apiEvent collapsing?: CancelableApiEvent<IEventArgs>;
    /** Событие возникает после сворачивания Раскрывающегося списка. */
    @apiEvent collapsed?: BasicApiEvent<IEventArgs>;
    /** Событие возникает при разворачивании Раскрывающегося списка. */
    @apiEvent expanding?: CancelableApiEvent<IEventArgs>;
    /** Событие возникает после разворачивания Раскрывающегося списка. */
    @apiEvent expanded?: BasicApiEvent<IEventArgs>;

    @rw elementContentRenderFunc?: (element: GenModels.Element) => JSX.Element;

    @rw services?: $EditOperationStore & $LayoutInfo & Optional<$LabelWidth> & $DropdownOutUserController = app;
}

/**
 * Класс элемента управления Раскрывающийся список.
 */
export class DropdownOutUser extends InputBasedControl<string, DropdownOutUserParams, DropdownOutUserState> {
    protected createParams() {
        return new DropdownOutUserParams();
    }

    static ControlTypeName = "DropdownOutUser";

    /** Возвращает численное значение выбранного элемента. */
    public get valueCode() {
        return this.state.items.find(x => x.key == this.value)?.valueCode;
    }
    public set valueCode(code: number) {
        this.value = this.state.items.find(x => x.valueCode == code)?.key;
    }

    protected getServices() {
        return this.state.services;
    }

    @handler("elements")
    private set setElements(val: IBindingResult<GenModels.ElementsDataModel> | GenModels.Element[]) {
        let binding = val as IBindingResult<GenModels.ElementsDataModel>;
        if (binding && binding.value) {
            this.state.items = binding.value.elements;
            this.state.isEmptyKeyAllowed = binding && binding.value && binding.value.isEmptyKeyAllowed;
        } else {
            this.state.items = binding as any;
        }
    }

    @handler("elements")
    private get getElements(): GenModels.Element[] {
        return this.state.items;
    }

    @handler("binding")
    private set setBinding(binding: IBindingResult<string>) {
        if (binding) {
            this.value = binding && binding.value;
        }
        this.state.canEdit = editOperationAvailable(this.state.services, binding);
        this.state.binding = binding;
        setSavedValueDisplayName(this.state.binding, this.getImpl<DropdownOutUserImpl>().getTextValueFor(binding.value));
    }

    @handler("defaultElement")
    private set setDefault(elementKey: string) {
        this.state.default = elementKey;
        if (!this.value && this.state.default) {
            this.value = this.state.default;
        }
    }

    protected getBindings(): IBindingResult<any>[] {
        setNewValueDisplayName(this.state.binding, this.getImpl<DropdownOutUserImpl>().getTextValueFor(this.value));
        return [getBindingResult(this.state.binding, this.params.value && this.params.value.toString() || null, () => at(DropdownOutUserParams).labelText)];
    }

    protected getDefault(): string {
        return this.state.default;
    }

    async onSaved() {
        setSavedValueDisplayName(this.state.binding, this.getImpl<DropdownOutUserImpl>().getTextValueFor(this.value));
    }

    /** @internal */
    protected createImpl() {
        return new DropdownOutUserImpl(this.props, this.state);
    }
}
