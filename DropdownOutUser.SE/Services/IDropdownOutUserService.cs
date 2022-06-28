using System.Collections.Generic;
using DocsVision.BackOffice.WebClient.RadioGroup;

namespace DropdownOutUser.SE.Services {
    /// <summary>
    /// Предоставляет описание сервиса для получения данных контрола "DropdownOutUser"
    /// </summary>
    public interface IDropdownOutUserService {

        /// <summary>
        /// Возвращает список пользователей из внешней системы
        /// </summary>
        /// <param name="sessionContext">контекст</param>
        /// <returns>список с информацие о пользователях</returns>
        List<Element> GetUsersInfo();
    }

}
