import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { IExtension } from "@docsvision/webclient/System/IExtension";
import { IControlDescription } from "@docsvision/webclient/System/IControlDescription";
import { Service } from "@docsvision/webclient/System/Service";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $DropdownOutUserController, DropdownOutUserController } from "./Services/DropdownOutUserController";
import { DropdownOutUser } from "./Controls/DropdownOutUser/DropdownOutUser";

/**
 * Главная входная точка всего расширения
 * Данный файл должен импортировать прямо или косвенно все остальные файлы,
 * чтобы rollup смог собрать их все в один бандл.
 */
extensionManager.registerExtension({
    name: "DropdownOutUser front extension",
    version: "5.5.16.1",

	 //Сервис-контроллер для запроса данных о пользователях из внешней системы
    layoutServices: [
        Service.fromFactory($DropdownOutUserController, (services: $RequestManager) => new DropdownOutUserController(services))
    ],
	
    controls: [
        { controlTypeName: "DropdownOutUser", constructor: DropdownOutUser } as any,
    ] as IControlDescription[] ,

} as IExtension);
