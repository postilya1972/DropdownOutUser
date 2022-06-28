using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DropdownOutUser.SE.Services;
using DocsVision.BackOffice.WebClient.RadioGroup;
using DocsVision.Platform.WebClient.Diagnostics;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models.Generic;

namespace DropdownOutUser.SE.Controllers {
    /// <summary>
    /// Предоставляет контроллер для работы с данными пользователей из внешней системы
    /// </summary>
    public class DropdownOutUserController : Controller {

        private readonly IServiceProvider _serviceProvider;

        /// <summary>
        /// Создаёт новый экземпляр
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public DropdownOutUserController(IServiceProvider serviceProvider) {
            _serviceProvider = serviceProvider;
        }

        /// <summary>
        /// Возвращает информацию о списке пользователей во снешней системе
        /// </summary>
        /// <returns>модель со списком пользователей</returns>
        public ActionResult GetUsersInfo() {
            var response = new CommonResponse<List<Element>>();
            try {
                //Получаем сервис
                var service = ServiceUtil.GetService<IDropdownOutUserService>(_serviceProvider);
                //Вызываем метод получения данных о пользователях
                var data = service.GetUsersInfo();
                response.InitializeSuccess(data);
            } catch (Exception exc) {
                Trace.TraceError($"DropdownOutUserService.GetUsersInfo: <{exc}> ");
                response.InitializeError(exc.Message);
            }
            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }
    }
}
