var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { DropdownOutUser } from "./DropdownOutUser";
import { InputBasedControlImpl } from "@docsvision/webclient/System/InputBasedControlImpl";
import { ComboBoxTitle } from "@docsvision/webclient/Helpers/ComboBox/ComboBoxTitle";
import { resources } from "@docsvision/webclient/System/Resources";
import { CancelableEvent } from "@docsvision/webclient/System/CancelableEvent";
import { SimpleEvent } from "@docsvision/webclient/System/SimpleEvent";
import { EditMode } from "@docsvision/webclient/System/EditMode";
import { Helpers } from "@docsvision/webclient/Legacy/Utils";
import { classIfNot } from "@docsvision/webclient/System/CssUtils";
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
var DropdownOutUserImpl = /** @class */ (function (_super) {
    __extends(DropdownOutUserImpl, _super);
    function DropdownOutUserImpl(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.handleDocumentClick = function (event) {
            var target = Helpers.GetTarget(event);
            var domElement = _this.componentDOMNode;
            if (domElement && !domElement.contains(target) && !_this.state.isCollapsed) {
                _this.toggleCollapsed();
            }
        };
        _this.handleDocumentFocus = function (event) {
            _this.prevActiveElement = event.target;
        };
        _this.toggleCollapsed = function () {
            return _this.state.isCollapsed ? _this.expandDropdownOutUser() : _this.collapseDropdownOutUser();
        };
        _this.expandDropdownOutUser = function () {
            var trigger = CancelableEvent.cast(_this.state.expanding).trigger();
            trigger.accepted(function () {
                _this.setState({
                    isCollapsed: false
                }, function () {
                    SimpleEvent.cast(_this.state.expanded).trigger();
                });
            });
            return trigger;
        };
        _this.collapseDropdownOutUser = function () {
            var trigger = CancelableEvent.cast(_this.state.collapsing).trigger();
            trigger.accepted(function () {
                _this.setState({
                    isCollapsed: true
                }, function () {
                    SimpleEvent.cast(_this.state.collapsed).trigger();
                });
            });
            return trigger;
        };
        _this.onCloseDropdownOutUserTriggered = function () {
            if (!_this.state.isCollapsed) {
                _this.collapseDropdownOutUser();
            }
        };
        _this.isNotSameDropdownOutUser = function (target) {
            return $(target).closest('.dv-control[data-control-name="' + _this.state.name + '"]').length === 0;
        };
        /**
         * При фокусе элемента списка
         * @param event Событие фокуса
         * @param element Текущий элемент
         */
        _this.onFocusElement = function (event, element) {
            _this.focusedElement = element;
            if (_this.isNotSameDropdownOutUser(_this.prevActiveElement)) {
                _super.prototype.onInputFocus.call(_this, event);
            }
        };
        /**
         * При снятии фокуса у элемента списка
         * @param event Событие снятия фокуса
         * @param element Текущий элемент
         */
        _this.onBlurElement = function (event, element) {
            (_this.focusedElement && _this.focusedElement.key == element.key) && (_this.focusedElement = null);
            setTimeout(function () {
                if (_this.isNotSameDropdownOutUser(document.activeElement)) {
                    _super.prototype.onInputBlur.call(_this, event);
                }
            }, 0);
        };
        /**
         * При фокусе соседнего элемента в списке
         * @param element Текущий элемент
         * @param mode Какой из соседних элементов должен получить фокус (предыдущий или следующий)
         */
        _this.onFocusSiblingElement = function (element, mode) {
            var elementPosition = _this.state.items.findIndex(function (el) { return el.key == element.key; });
            if (elementPosition == -1 && !(_this.state.isEmptyKeyAllowed && !_this.state.required && element.key == null)) {
                return;
            }
            elementPosition += (mode == 'prev') ? -1 : 1;
            var siblingElement = (_this.state.isEmptyKeyAllowed && !_this.state.required && elementPosition == -1) ?
                DropdownOutUserImpl.EMPTY_ELEMENT :
                _this.state.items[elementPosition];
            if (siblingElement && (!_this.focusedElement || _this.focusedElement.key != siblingElement.key)) {
                _this.focusedElement = siblingElement;
                _this.forceUpdate();
            }
        };
        _this.onDropdownOutUserContainerClick = _this.onDropdownOutUserContainerClick.bind(_this);
        _this.onElementClick = _this.onElementClick.bind(_this);
        _this.onClearValueClick = _this.onClearValueClick.bind(_this);
        _this.state.collapsing = CancelableEvent.Create(_this.state.wrapper);
        _this.state.collapsed = SimpleEvent.Create(_this.state.wrapper);
        _this.state.expanding = CancelableEvent.Create(_this.state.wrapper);
        _this.state.expanded = SimpleEvent.Create(_this.state.wrapper);
        _this.state.onMouseDownEvent = false;
        return _this;
    }
    DropdownOutUserImpl.prototype.UNSAFE_componentWillMount = function () {
        _super.prototype.UNSAFE_componentWillMount.call(this);
        if (typeof this.state.currentValue === 'undefined' && this.state.editMode === EditMode.Edit) {
            this.setValue(this.getDefaultValue(), false);
        }
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('focus', this.handleDocumentFocus, true);
    };
    DropdownOutUserImpl.prototype.componentDidMount = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var control, element, users, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        control = this.state.wrapper && ReactDOM.findDOMNode(this.state.wrapper);
                        element = control.parentNode;
                        while (element && !this.parentModal) {
                            if ((_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains("modal-dialog-box-helper")) {
                                this.parentModal = element;
                            }
                            element = element.parentNode;
                        }
                        this.parentModal && this.parentModal.addEventListener('click', this.handleDocumentClick);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.state.services.dropdownOutUserController.getUsersInfo()];
                    case 2:
                        users = _c.sent();
                        this.setState({ items: users });
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _c.sent();
                        alert("Возникла ошибка при запросе данных о пользователях из внешенй системы");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DropdownOutUserImpl.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('focus', this.handleDocumentFocus);
        this.parentModal && this.parentModal.removeEventListener('click', this.handleDocumentClick);
        _super.prototype.componentWillUnmount.call(this);
    };
    DropdownOutUserImpl.prototype.setValue = function (value, redraw) {
        _super.prototype.setValue.call(this, value, redraw);
        if (!this.state.isCollapsed) {
            this.collapseDropdownOutUser();
            if (this.comboboxTitle) {
                var title = ReactDOM.findDOMNode(this.comboboxTitle);
                if (title && title.focus) {
                    title.focus();
                }
            }
        }
    };
    DropdownOutUserImpl.prototype.getTextValue = function () {
        var key = this.getValue();
        return this.getTextValueFor(key);
    };
    DropdownOutUserImpl.prototype.getTextValueFor = function (key) {
        var element = this.state.items && this.state.items.find(function (l) { return l.key == key; });
        return !!element && element.value || '';
    };
    DropdownOutUserImpl.prototype.onDropdownOutUserContainerClick = function (e) {
        if (this.editAvailable && (!e || !e.target.classList.contains("clear-button-icon"))) {
            this.toggleCollapsed();
        }
    };
    DropdownOutUserImpl.prototype.onElementClick = function (element) {
        this.setValue(element.key, true);
    };
    DropdownOutUserImpl.prototype.onClearValueClick = function (e) {
        e.preventDefault();
        this.setValue(null, true);
    };
    DropdownOutUserImpl.prototype.onPlaceholderClick = function (event) {
        this.onDropdownOutUserContainerClick(event);
    };
    DropdownOutUserImpl.prototype.getCssClass = function () {
        return _super.prototype.getCssClass.call(this) + classIfNot(this.state.passedValidation, "validation-input");
    };
    DropdownOutUserImpl.prototype.onInputFocus = function (event) {
        if (this.isNotSameDropdownOutUser(this.prevActiveElement)) {
            _super.prototype.onInputFocus.call(this, event);
        }
    };
    DropdownOutUserImpl.prototype.onMouseDown = function () {
        this.state.onMouseDownEvent = true;
    };
    DropdownOutUserImpl.prototype.onInputBlur = function (event) {
        var _this = this;
        setTimeout(function () {
            if (_this.isNotSameDropdownOutUser(document.activeElement)) {
                if (!_this.state.onMouseDownEvent) {
                    _this.setState({ inputFocused: false });
                    _this.validate({ ShowErrorMessage: true });
                    _super.prototype.onInputBlur.call(_this, event);
                }
                else {
                    _this.state.onMouseDownEvent = false;
                }
            }
        }, 0);
    };
    DropdownOutUserImpl.prototype.validate = function (params) {
        var _a;
        if (this.state.required) {
            var message = this.state.visibility ? resources.Validation_FieldRequired :
                (_a = resources.Error_HiddenParameter) === null || _a === void 0 ? void 0 : _a.format(this.state.name);
            var passed = this.hasValue();
            var result = {
                Passed: passed,
                Message: passed ? null : message,
                Visibility: this.state.visibility
            };
            if (!result.Passed && params.ShowErrorMessage) {
                this.setState({
                    validationMessage: result.Message
                });
                this.state.passedValidation = false;
                this.forceUpdate();
            }
            else if (result.Passed) {
                this.state.passedValidation = true;
                this.forceUpdate();
            }
            return result;
        }
        else {
            return { Passed: true, Message: "" };
        }
    };
    DropdownOutUserImpl.prototype.showEditPopover = function (popoverOptions) {
        popoverOptions = popoverOptions || {};
        popoverOptions.className = classNames(popoverOptions.className, "dropdown-edit-popover");
        return _super.prototype.showEditPopover.call(this, popoverOptions);
    };
    DropdownOutUserImpl.prototype.renderWithText = function () {
        this.updateValidationMessage();
        return (React.createElement("div", null,
            React.createElement(LabeledText, { label: this.state.labelText, text: this.getTextValue(), alignment: this.state.services.labelWidth && this.state.services.labelWidth.alignment, labelWidth: this.state.services.labelWidth && this.state.services.labelWidth.width, onFocus: this.onInputFocus, onBlur: this.onInputBlur, showEmpty: this.state.showEmptyLabel || this.state.hadValue, onTextClick: this.onValueClick, attachText: this.attachText, wrapLongTextUnderLabel: this.state.wrapLongValueUnderLabel, clickableText: this.canShowEditDialog(), title: this.state.tip, valueTitle: this.getValueTitle(), tabIndex: this.getTabIndex() }),
            this.state.validationMessage ? this.renderValidationMessage() : ""));
    };
    DropdownOutUserImpl.prototype.renderInto = function (props, container) {
        ReactDOM.render(React.createElement(DropdownOutUser, __assign({}, props, { key: props.name })), container);
    };
    DropdownOutUserImpl.prototype.renderInput = function () {
        var _this = this;
        var currentPlaceHolder = this.state.placeHolder;
        if (this.state.required) {
            currentPlaceHolder = (this.state.placeHolder ? getRequiredLabel(this.state.placeHolder) : "*");
        }
        var placeholderTitle = (!this.state.inputFocused && this.state.isCollapsed && currentPlaceHolder);
        var title = (this.getValue() == null || this.getValue() == '') ?
            (placeholderTitle || DropdownOutUserImpl.EMPTY_ELEMENT.value) :
            (this.getTextValue());
        return (React.createElement("div", { ref: function (el) { return _this.el = el; } },
            React.createElement("div", { className: "combobox-label text-trim" }, this.state.required ? (getRequiredLabel(this.state.labelText || "")) : this.state.labelText || ""),
            React.createElement(ComboBoxWrapper, { disabled: !this.editAvailable },
                React.createElement(ComboBoxWrapperContent, { title: React.createElement(ComboBoxTitle, { ref: function (ref) { return _this.comboboxTitle = ref; }, disabled: !this.editAvailable, className: 'dropdown-combobox-title-helper', onFocus: this.onInputFocus, onBlur: this.onInputBlur, expanded: !this.state.isCollapsed, tabIndex: this.getTabIndex() == 0, onClick: this.onDropdownOutUserContainerClick },
                        React.createElement(ComboBoxTitleContent, null, title)), body: React.createElement(PopoverComboBoxBodyContent, { mode: PopoverMode.BottomDropdown, isOpen: !this.state.isCollapsed, className: classNames("combobox-helper", this.props.name) },
                        React.createElement("div", { "data-control-name": this.state.name },
                            React.createElement(ClosePopoverListener, { onClose: this.onCloseDropdownOutUserTriggered, boundaryTarget: this.el },
                                React.createElement(Focusable, { selectorToFocus: '.combobox-element-helper-selected', selectorToReturnFocus: null },
                                    this.state.isEmptyKeyAllowed && !this.state.required && React.createElement(ComboBoxElement, { tabIndex: true, selected: !this.hasValue(), focused: this.focusedElement && this.focusedElement.key == null, onSelect: function () { return _this.setValue(null, true); }, onFocus: function (event) { return _this.onFocusElement(event, DropdownOutUserImpl.EMPTY_ELEMENT); }, onBlur: function (event) { return _this.onBlurElement(event, DropdownOutUserImpl.EMPTY_ELEMENT); }, onFocusNext: function () { return _this.onFocusSiblingElement(DropdownOutUserImpl.EMPTY_ELEMENT, 'next'); }, onFocusPrev: function () { return _this.onFocusSiblingElement(DropdownOutUserImpl.EMPTY_ELEMENT, 'prev'); } },
                                        React.createElement(ComboBoxElementContent, null, DropdownOutUserImpl.EMPTY_ELEMENT.value)),
                                    React.createElement("div", { className: "dropdown-variants-list" }, this.state.items.map(function (element) {
                                        return React.createElement(ComboBoxElement, { key: element.key, id: element.key, tabIndex: true, selected: element.key == _this.getValue(), focused: _this.focusedElement && _this.focusedElement.key == element.key, onMouseDown: function () { return _this.onMouseDown(); }, onSelect: function () { return _this.onElementClick(element); }, onFocus: function (event) { return _this.onFocusElement(event, element); }, onBlur: function (event) { return _this.onBlurElement(event, element); }, onFocusNext: function () { return _this.onFocusSiblingElement(element, 'next'); }, onFocusPrev: function () { return _this.onFocusSiblingElement(element, 'prev'); } },
                                            React.createElement(ComboBoxElementContent, null, _this.state.elementContentRenderFunc
                                                ? _this.state.elementContentRenderFunc(element)
                                                : element.value));
                                    })))))) }))));
    };
    DropdownOutUserImpl.prototype.renderPlaceholder = function () {
        return null;
    };
    DropdownOutUserImpl.EMPTY_ELEMENT = { key: null, value: resources.DropDown_NotSelectedValue };
    return DropdownOutUserImpl;
}(InputBasedControlImpl));
export { DropdownOutUserImpl };
//# sourceMappingURL=DropdownOutUserImpl.js.map