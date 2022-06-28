define(['@docsvision/webclient/System/ExtensionManager', '@docsvision/webclient/System/Service', '@docsvision/webclient/System/ServiceUtils', '@docsvision/webclient/System/UrlStore', 'tslib', '@docsvision/webclient/App', '@docsvision/webclient/System/BindingMetadataConstants', '@docsvision/webclient/System/Event', '@docsvision/webclient/System/GetBindingResult', '@docsvision/webclient/System/Handler', '@docsvision/webclient/System/InputBasedControl', '@docsvision/webclient/System/OperationUtils', '@docsvision/webclient/System/Readonly', '@docsvision/webclient/System/Readwrite', 'react', 'react-dom', 'classnames', '@docsvision/webclient/System/InputBasedControlImpl', '@docsvision/webclient/Helpers/ComboBox/ComboBoxTitle', '@docsvision/webclient/System/Resources', '@docsvision/webclient/System/CancelableEvent', '@docsvision/webclient/System/SimpleEvent', '@docsvision/webclient/System/EditMode', '@docsvision/webclient/Legacy/Utils', '@docsvision/webclient/System/CssUtils', '@docsvision/webclient/Helpers/LabeledText', '@docsvision/webclient/System/GetRequiredLabel', '@docsvision/webclient/Helpers/ComboBox/ComboBoxWrapper', '@docsvision/webclient/Helpers/ComboBox/Helpers/ComboBoxWrapperContent', '@docsvision/webclient/Helpers/ComboBox/Helpers/ComboBoxTitleContent', '@docsvision/webclient/Helpers/ComboBox/Helpers/PopoverComboBoxBodyContent', '@docsvision/webclient/Helpers/PopoverHelpers/ClosePopoverListener', '@docsvision/webclient/Helpers/FocusManagement/Focusable', '@docsvision/webclient/Helpers/ComboBox/ComboBoxElement', '@docsvision/webclient/Helpers/ComboBox/Helpers/ComboBoxElementContent', '@docsvision/webclient/Helpers/PopoverHelpers/Popover'], (function (ExtensionManager, Service, ServiceUtils, UrlStore, tslib, App, BindingMetadataConstants, Event, GetBindingResult, Handler, InputBasedControl, OperationUtils, Readonly, Readwrite, React, ReactDOM, classNames, InputBasedControlImpl, ComboBoxTitle, Resources, CancelableEvent, SimpleEvent, EditMode, Utils, CssUtils, LabeledText, GetRequiredLabel, ComboBoxWrapper, ComboBoxWrapperContent, ComboBoxTitleContent, PopoverComboBoxBodyContent, ClosePopoverListener, Focusable, ComboBoxElement, ComboBoxElementContent, Popover) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
    var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

    var DropdownOutUserController = /** @class */ (function () {
        function DropdownOutUserController(services) {
            this.services = services;
        }
        /**
          * ��������� ������ ������������� �� ������� �������
          */
        DropdownOutUserController.prototype.getUsersInfo = function () {
            var url = UrlStore.urlStore.urlResolver.resolveUrl("GetUsersInfo", "DropdownOutUser");
            return this.services.requestManager.get(url);
        };
        return DropdownOutUserController;
    }());
    var $DropdownOutUserController = ServiceUtils.serviceName(function (s) { return s.dropdownOutUserController; });

    /** @internal */
    var DropdownOutUserImpl = /** @class */ (function (_super) {
        tslib.__extends(DropdownOutUserImpl, _super);
        function DropdownOutUserImpl(props, state) {
            var _this = _super.call(this, props, state) || this;
            _this.handleDocumentClick = function (event) {
                var target = Utils.Helpers.GetTarget(event);
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
                var trigger = CancelableEvent.CancelableEvent.cast(_this.state.expanding).trigger();
                trigger.accepted(function () {
                    _this.setState({
                        isCollapsed: false
                    }, function () {
                        SimpleEvent.SimpleEvent.cast(_this.state.expanded).trigger();
                    });
                });
                return trigger;
            };
            _this.collapseDropdownOutUser = function () {
                var trigger = CancelableEvent.CancelableEvent.cast(_this.state.collapsing).trigger();
                trigger.accepted(function () {
                    _this.setState({
                        isCollapsed: true
                    }, function () {
                        SimpleEvent.SimpleEvent.cast(_this.state.collapsed).trigger();
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
            _this.state.collapsing = CancelableEvent.CancelableEvent.Create(_this.state.wrapper);
            _this.state.collapsed = SimpleEvent.SimpleEvent.Create(_this.state.wrapper);
            _this.state.expanding = CancelableEvent.CancelableEvent.Create(_this.state.wrapper);
            _this.state.expanded = SimpleEvent.SimpleEvent.Create(_this.state.wrapper);
            _this.state.onMouseDownEvent = false;
            return _this;
        }
        DropdownOutUserImpl.prototype.UNSAFE_componentWillMount = function () {
            _super.prototype.UNSAFE_componentWillMount.call(this);
            if (typeof this.state.currentValue === 'undefined' && this.state.editMode === EditMode.EditMode.Edit) {
                this.setValue(this.getDefaultValue(), false);
            }
            document.addEventListener('click', this.handleDocumentClick);
            document.addEventListener('focus', this.handleDocumentFocus, true);
        };
        DropdownOutUserImpl.prototype.componentDidMount = function () {
            var _a;
            return tslib.__awaiter(this, void 0, void 0, function () {
                var control, element, users;
                return tslib.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            control = this.state.wrapper && ReactDOM__default["default"].findDOMNode(this.state.wrapper);
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
                            _c.sent();
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
                    var title = ReactDOM__default["default"].findDOMNode(this.comboboxTitle);
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
            return _super.prototype.getCssClass.call(this) + CssUtils.classIfNot(this.state.passedValidation, "validation-input");
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
                var message = this.state.visibility ? Resources.resources.Validation_FieldRequired : (_a = Resources.resources.Error_HiddenParameter) === null || _a === void 0 ? void 0 : _a.format(this.state.name);
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
            popoverOptions.className = classNames__default["default"](popoverOptions.className, "dropdown-edit-popover");
            return _super.prototype.showEditPopover.call(this, popoverOptions);
        };
        DropdownOutUserImpl.prototype.renderWithText = function () {
            this.updateValidationMessage();
            return (React__default["default"].createElement("div", null,
                React__default["default"].createElement(LabeledText.LabeledText, { label: this.state.labelText, text: this.getTextValue(), alignment: this.state.services.labelWidth && this.state.services.labelWidth.alignment, labelWidth: this.state.services.labelWidth && this.state.services.labelWidth.width, onFocus: this.onInputFocus, onBlur: this.onInputBlur, showEmpty: this.state.showEmptyLabel || this.state.hadValue, onTextClick: this.onValueClick, attachText: this.attachText, wrapLongTextUnderLabel: this.state.wrapLongValueUnderLabel, clickableText: this.canShowEditDialog(), title: this.state.tip, valueTitle: this.getValueTitle(), tabIndex: this.getTabIndex() }),
                this.state.validationMessage ? this.renderValidationMessage() : ""));
        };
        DropdownOutUserImpl.prototype.renderInto = function (props, container) {
            ReactDOM__default["default"].render(React__default["default"].createElement(DropdownOutUser, tslib.__assign({}, props, { key: props.name })), container);
        };
        DropdownOutUserImpl.prototype.renderInput = function () {
            var _this = this;
            var currentPlaceHolder = this.state.placeHolder;
            if (this.state.required) {
                currentPlaceHolder = (this.state.placeHolder ? GetRequiredLabel.getRequiredLabel(this.state.placeHolder) : "*");
            }
            var placeholderTitle = (!this.state.inputFocused && this.state.isCollapsed && currentPlaceHolder);
            var title = (this.getValue() == null || this.getValue() == '') ?
                (placeholderTitle || DropdownOutUserImpl.EMPTY_ELEMENT.value) :
                (this.getTextValue());
            return (React__default["default"].createElement("div", { ref: function (el) { return _this.el = el; } },
                React__default["default"].createElement("div", { className: "combobox-label text-trim" }, this.state.required ? (GetRequiredLabel.getRequiredLabel(this.state.labelText || "")) : this.state.labelText || ""),
                React__default["default"].createElement(ComboBoxWrapper.ComboBoxWrapper, { disabled: !this.editAvailable },
                    React__default["default"].createElement(ComboBoxWrapperContent.ComboBoxWrapperContent, { title: React__default["default"].createElement(ComboBoxTitle.ComboBoxTitle, { ref: function (ref) { return _this.comboboxTitle = ref; }, disabled: !this.editAvailable, className: 'dropdown-combobox-title-helper', onFocus: this.onInputFocus, onBlur: this.onInputBlur, expanded: !this.state.isCollapsed, tabIndex: this.getTabIndex() == 0, onClick: this.onDropdownOutUserContainerClick },
                            React__default["default"].createElement(ComboBoxTitleContent.ComboBoxTitleContent, null, title)), body: React__default["default"].createElement(PopoverComboBoxBodyContent.PopoverComboBoxBodyContent, { mode: Popover.PopoverMode.BottomDropdown, isOpen: !this.state.isCollapsed, className: classNames__default["default"]("combobox-helper", this.props.name) },
                            React__default["default"].createElement("div", { "data-control-name": this.state.name },
                                React__default["default"].createElement(ClosePopoverListener.ClosePopoverListener, { onClose: this.onCloseDropdownOutUserTriggered, boundaryTarget: this.el },
                                    React__default["default"].createElement(Focusable.Focusable, { selectorToFocus: '.combobox-element-helper-selected', selectorToReturnFocus: null },
                                        this.state.isEmptyKeyAllowed && !this.state.required && React__default["default"].createElement(ComboBoxElement.ComboBoxElement, { tabIndex: true, selected: !this.hasValue(), focused: this.focusedElement && this.focusedElement.key == null, onSelect: function () { return _this.setValue(null, true); }, onFocus: function (event) { return _this.onFocusElement(event, DropdownOutUserImpl.EMPTY_ELEMENT); }, onBlur: function (event) { return _this.onBlurElement(event, DropdownOutUserImpl.EMPTY_ELEMENT); }, onFocusNext: function () { return _this.onFocusSiblingElement(DropdownOutUserImpl.EMPTY_ELEMENT, 'next'); }, onFocusPrev: function () { return _this.onFocusSiblingElement(DropdownOutUserImpl.EMPTY_ELEMENT, 'prev'); } },
                                            React__default["default"].createElement(ComboBoxElementContent.ComboBoxElementContent, null, DropdownOutUserImpl.EMPTY_ELEMENT.value)),
                                        React__default["default"].createElement("div", { className: "dropdown-variants-list" }, this.state.items.map(function (element) {
                                            return React__default["default"].createElement(ComboBoxElement.ComboBoxElement, { key: element.key, id: element.key, tabIndex: true, selected: element.key == _this.getValue(), focused: _this.focusedElement && _this.focusedElement.key == element.key, onMouseDown: function () { return _this.onMouseDown(); }, onSelect: function () { return _this.onElementClick(element); }, onFocus: function (event) { return _this.onFocusElement(event, element); }, onBlur: function (event) { return _this.onBlurElement(event, element); }, onFocusNext: function () { return _this.onFocusSiblingElement(element, 'next'); }, onFocusPrev: function () { return _this.onFocusSiblingElement(element, 'prev'); } },
                                                React__default["default"].createElement(ComboBoxElementContent.ComboBoxElementContent, null, _this.state.elementContentRenderFunc
                                                    ? _this.state.elementContentRenderFunc(element)
                                                    : element.value));
                                        })))))) }))));
        };
        DropdownOutUserImpl.prototype.renderPlaceholder = function () {
            return null;
        };
        DropdownOutUserImpl.EMPTY_ELEMENT = { key: null, value: Resources.resources.DropDown_NotSelectedValue };
        return DropdownOutUserImpl;
    }(InputBasedControlImpl.InputBasedControlImpl));

    /**
     * Содержит публичные свойства элемента управления [Раскрывающийся список]{@link DropdownOutUser}.
     */
    var DropdownOutUserParams = /** @class */ (function (_super) {
        tslib.__extends(DropdownOutUserParams, _super);
        function DropdownOutUserParams() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** Стандартный CSS класс со стилями элемента управления */
            _this.standardCssClass = "system-dropdown";
            /** Список элементов, доступных для выбора */
            _this.items = [];
            /** Флаг развернутости Раскрывающегося списка */
            _this.isCollapsed = true;
            /** Доступно ли нулевое значение для выбора. Как правило значение сооветствует настройкам привязанного поля карточки в метаданных. */
            _this.isEmptyKeyAllowed = false;
            _this.services = App.app;
            return _this;
        }
        tslib.__decorate([
            Readonly.r
        ], DropdownOutUserParams.prototype, "standardCssClass", void 0);
        tslib.__decorate([
            Readwrite.rw
        ], DropdownOutUserParams.prototype, "items", void 0);
        tslib.__decorate([
            Readwrite.rw
        ], DropdownOutUserParams.prototype, "isCollapsed", void 0);
        tslib.__decorate([
            Readwrite.rw
        ], DropdownOutUserParams.prototype, "isEmptyKeyAllowed", void 0);
        tslib.__decorate([
            Event.apiEvent
        ], DropdownOutUserParams.prototype, "collapsing", void 0);
        tslib.__decorate([
            Event.apiEvent
        ], DropdownOutUserParams.prototype, "collapsed", void 0);
        tslib.__decorate([
            Event.apiEvent
        ], DropdownOutUserParams.prototype, "expanding", void 0);
        tslib.__decorate([
            Event.apiEvent
        ], DropdownOutUserParams.prototype, "expanded", void 0);
        tslib.__decorate([
            Readwrite.rw
        ], DropdownOutUserParams.prototype, "elementContentRenderFunc", void 0);
        tslib.__decorate([
            Readwrite.rw
        ], DropdownOutUserParams.prototype, "services", void 0);
        return DropdownOutUserParams;
    }(InputBasedControl.InputBasedControlParams));
    /**
     * Класс элемента управления Раскрывающийся список.
     */
    var DropdownOutUser = /** @class */ (function (_super) {
        tslib.__extends(DropdownOutUser, _super);
        function DropdownOutUser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DropdownOutUser.prototype.createParams = function () {
            return new DropdownOutUserParams();
        };
        Object.defineProperty(DropdownOutUser.prototype, "valueCode", {
            /** Возвращает численное значение выбранного элемента. */
            get: function () {
                var _this = this;
                var _a;
                return (_a = this.state.items.find(function (x) { return x.key == _this.value; })) === null || _a === void 0 ? void 0 : _a.valueCode;
            },
            set: function (code) {
                var _a;
                this.value = (_a = this.state.items.find(function (x) { return x.valueCode == code; })) === null || _a === void 0 ? void 0 : _a.key;
            },
            enumerable: false,
            configurable: true
        });
        DropdownOutUser.prototype.getServices = function () {
            return this.state.services;
        };
        Object.defineProperty(DropdownOutUser.prototype, "setElements", {
            set: function (val) {
                var binding = val;
                if (binding && binding.value) {
                    this.state.items = binding.value.elements;
                    this.state.isEmptyKeyAllowed = binding && binding.value && binding.value.isEmptyKeyAllowed;
                }
                else {
                    this.state.items = binding;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DropdownOutUser.prototype, "getElements", {
            get: function () {
                return this.state.items;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DropdownOutUser.prototype, "setBinding", {
            set: function (binding) {
                if (binding) {
                    this.value = binding && binding.value;
                }
                this.state.canEdit = OperationUtils.editOperationAvailable(this.state.services, binding);
                this.state.binding = binding;
                BindingMetadataConstants.setSavedValueDisplayName(this.state.binding, this.getImpl().getTextValueFor(binding.value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DropdownOutUser.prototype, "setDefault", {
            set: function (elementKey) {
                this.state.default = elementKey;
                if (!this.value && this.state.default) {
                    this.value = this.state.default;
                }
            },
            enumerable: false,
            configurable: true
        });
        DropdownOutUser.prototype.getBindings = function () {
            BindingMetadataConstants.setNewValueDisplayName(this.state.binding, this.getImpl().getTextValueFor(this.value));
            return [GetBindingResult.getBindingResult(this.state.binding, this.params.value && this.params.value.toString() || null, function () { return Handler.at(DropdownOutUserParams).labelText; })];
        };
        DropdownOutUser.prototype.getDefault = function () {
            return this.state.default;
        };
        DropdownOutUser.prototype.onSaved = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    BindingMetadataConstants.setSavedValueDisplayName(this.state.binding, this.getImpl().getTextValueFor(this.value));
                    return [2 /*return*/];
                });
            });
        };
        /** @internal */
        DropdownOutUser.prototype.createImpl = function () {
            return new DropdownOutUserImpl(this.props, this.state);
        };
        DropdownOutUser.ControlTypeName = "DropdownOutUser";
        tslib.__decorate([
            Handler.handler("elements")
        ], DropdownOutUser.prototype, "setElements", null);
        tslib.__decorate([
            Handler.handler("elements")
        ], DropdownOutUser.prototype, "getElements", null);
        tslib.__decorate([
            Handler.handler("binding")
        ], DropdownOutUser.prototype, "setBinding", null);
        tslib.__decorate([
            Handler.handler("defaultElement")
        ], DropdownOutUser.prototype, "setDefault", null);
        return DropdownOutUser;
    }(InputBasedControl.InputBasedControl));

    /**
     * Главная входная точка всего расширения
     * Данный файл должен импортировать прямо или косвенно все остальные файлы,
     * чтобы rollup смог собрать их все в один бандл.
     */
    ExtensionManager.extensionManager.registerExtension({
        name: "DropdownOutUser front extension",
        version: "5.5.16.1",
        //Сервис-контроллер для запроса данных о пользователях из внешней системы
        layoutServices: [
            Service.Service.fromFactory($DropdownOutUserController, function (services) { return new DropdownOutUserController(services); })
        ],
        controls: [
            { controlTypeName: "DropdownOutUser", constructor: DropdownOutUser },
        ],
    });

}));
//# sourceMappingURL=extension.js.map
