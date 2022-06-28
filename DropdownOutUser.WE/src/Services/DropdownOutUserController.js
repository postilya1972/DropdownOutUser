import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var DropdownOutUserController = /** @class */ (function () {
    function DropdownOutUserController(services) {
        this.services = services;
    }
    /**
      * Получение списка пользователей из внешней системы
      */
    DropdownOutUserController.prototype.getUsersInfo = function () {
        var url = urlStore.urlResolver.resolveUrl("GetUsersInfo", "DropdownOutUser");
        return this.services.requestManager.get(url);
    };
    return DropdownOutUserController;
}());
export { DropdownOutUserController };
export var $DropdownOutUserController = serviceName(function (s) { return s.dropdownOutUserController; });
//# sourceMappingURL=DropdownOutUserController.js.map