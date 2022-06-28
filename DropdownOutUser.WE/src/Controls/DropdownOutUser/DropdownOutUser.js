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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import { app } from "@docsvision/webclient/App";
import { setNewValueDisplayName, setSavedValueDisplayName } from "@docsvision/webclient/System/BindingMetadataConstants";
import { apiEvent } from "@docsvision/webclient/System/Event";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";
import { at, handler } from "@docsvision/webclient/System/Handler";
import { InputBasedControl, InputBasedControlParams } from "@docsvision/webclient/System/InputBasedControl";
import { editOperationAvailable } from "@docsvision/webclient/System/OperationUtils";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { DropdownOutUserImpl } from "./DropdownOutUserImpl";
/**
 * Содержит публичные свойства элемента управления [Раскрывающийся список]{@link DropdownOutUser}.
 */
var DropdownOutUserParams = /** @class */ (function (_super) {
    __extends(DropdownOutUserParams, _super);
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
        _this.services = app;
        return _this;
    }
    __decorate([
        r
    ], DropdownOutUserParams.prototype, "standardCssClass", void 0);
    __decorate([
        rw
    ], DropdownOutUserParams.prototype, "items", void 0);
    __decorate([
        rw
    ], DropdownOutUserParams.prototype, "isCollapsed", void 0);
    __decorate([
        rw
    ], DropdownOutUserParams.prototype, "isEmptyKeyAllowed", void 0);
    __decorate([
        apiEvent
    ], DropdownOutUserParams.prototype, "collapsing", void 0);
    __decorate([
        apiEvent
    ], DropdownOutUserParams.prototype, "collapsed", void 0);
    __decorate([
        apiEvent
    ], DropdownOutUserParams.prototype, "expanding", void 0);
    __decorate([
        apiEvent
    ], DropdownOutUserParams.prototype, "expanded", void 0);
    __decorate([
        rw
    ], DropdownOutUserParams.prototype, "elementContentRenderFunc", void 0);
    __decorate([
        rw
    ], DropdownOutUserParams.prototype, "services", void 0);
    return DropdownOutUserParams;
}(InputBasedControlParams));
export { DropdownOutUserParams };
/**
 * Класс элемента управления Раскрывающийся список.
 */
var DropdownOutUser = /** @class */ (function (_super) {
    __extends(DropdownOutUser, _super);
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
            this.state.canEdit = editOperationAvailable(this.state.services, binding);
            this.state.binding = binding;
            setSavedValueDisplayName(this.state.binding, this.getImpl().getTextValueFor(binding.value));
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
        setNewValueDisplayName(this.state.binding, this.getImpl().getTextValueFor(this.value));
        return [getBindingResult(this.state.binding, this.params.value && this.params.value.toString() || null, function () { return at(DropdownOutUserParams).labelText; })];
    };
    DropdownOutUser.prototype.getDefault = function () {
        return this.state.default;
    };
    DropdownOutUser.prototype.onSaved = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setSavedValueDisplayName(this.state.binding, this.getImpl().getTextValueFor(this.value));
                return [2 /*return*/];
            });
        });
    };
    /** @internal */
    DropdownOutUser.prototype.createImpl = function () {
        return new DropdownOutUserImpl(this.props, this.state);
    };
    DropdownOutUser.ControlTypeName = "DropdownOutUser";
    __decorate([
        handler("elements")
    ], DropdownOutUser.prototype, "setElements", null);
    __decorate([
        handler("elements")
    ], DropdownOutUser.prototype, "getElements", null);
    __decorate([
        handler("binding")
    ], DropdownOutUser.prototype, "setBinding", null);
    __decorate([
        handler("defaultElement")
    ], DropdownOutUser.prototype, "setDefault", null);
    return DropdownOutUser;
}(InputBasedControl));
export { DropdownOutUser };
//# sourceMappingURL=DropdownOutUser.js.map