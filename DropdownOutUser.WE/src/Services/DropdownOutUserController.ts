import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";

export class DropdownOutUserController {

    constructor(private services: $RequestManager) {
    }

    /**
      * Получение списка пользователей из внешней системы
      */
    public getUsersInfo(): Promise<GenModels.Element[]> {
        var url = urlStore.urlResolver.resolveUrl("GetUsersInfo", "DropdownOutUser");
        return this.services.requestManager.get(url);
    }

}

export type $DropdownOutUserController = { dropdownOutUserController: DropdownOutUserController };
export const $DropdownOutUserController = serviceName((s: $DropdownOutUserController) => s.dropdownOutUserController);