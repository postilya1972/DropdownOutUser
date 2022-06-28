using System;
using System.Collections.Generic;
using DocsVision.BackOffice.WebClient.RadioGroup;

namespace DropdownOutUser.SE.Services {
    /// <summary>
    /// Предоставляет реализацию сервиса для получения данных контрола "CustomControl"
    /// </summary>
    public class DropdownOutUserService : IDropdownOutUserService {
        private readonly IServiceProvider _serviceProvider;

        /// <summary>
        /// Создаёт новый экземпляр
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
        public DropdownOutUserService(IServiceProvider provider) {
            if (provider == null) {
                throw new ArgumentNullException("provider");
            }
            _serviceProvider = provider;
        }

        /// <summary>
        /// Возвращает список пользователей из внешней системы
        /// </summary>
        /// <param name="sessionContext">контекст</param>
        /// <returns>список с информацие о пользователях</returns>
        public List<Element> GetUsersInfo() {
            //TODO
            // Здесь должен быть вызов извлечения данных о пользователеях из внешней системы
            // ...
            var users = new List<Element> {
                new Element{ Key="1", Value="Иванов И.И.", ValueCode = 1 },
                new Element{ Key="2", Value="Петров П.П.", ValueCode = 2 },
                new Element{ Key="3", Value="Сидоров С.С.", ValueCode = 3 },
                new Element{ Key="4", Value="Кузнецов Н.Н.", ValueCode = 4 },
            };
            return users;
        }

    }
}
