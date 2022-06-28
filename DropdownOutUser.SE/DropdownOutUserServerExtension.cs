using Autofac;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using DropdownOutUser.SE.Services;
using DocsVision.WebClient.Extensibility;

namespace DropdownOutUser.SE {
    /// <summary>
    /// Задаёт описание расширения для WebClient, реализованное в текущей сборке
    /// </summary>
    public class DropdownOutUserServerExtension : WebClientExtension {

        /// <summary>
        /// Создаёт новый экземпляр CustomControlServerExtension
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public DropdownOutUserServerExtension(IServiceProvider serviceProvider) : base(serviceProvider) {
        }

        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName {
            get { return Assembly.GetAssembly(typeof(DropdownOutUserServerExtension)).GetName().Name; }
        }

        /// <summary>
        /// Получить версию расширения
        /// </summary>
        public override Version ExtensionVersion {
            get { return new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion); }
        }

        /// <summary>
        /// Регистрация типов в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeContainer(ContainerBuilder containerBuilder) {
            //Регистрация сервисов
            containerBuilder.RegisterType<DropdownOutUserService>().As<IDropdownOutUserService>().SingleInstance();
        }

        #region WebClientExtension Overrides

        /// <summary>
        /// Gets resource managers for layout extension
        /// </summary>
        /// <returns></returns>
        protected override List<ResourceManager> GetLayoutExtensionResourceManagers() {
            return new List<ResourceManager> {
            };
        }

        #endregion
    }
}