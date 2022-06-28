using System;
using System.Collections.Generic;
using System.Resources;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.Helpers;
using DocsVision.Platform.Tools.LayoutEditor.Infrostructure;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;

namespace DropdownOutUser.DE.Extension {
    /// <summary>
    /// Возвращает описание свойств расширения редактора
    /// </summary>
    class DropdownOutUserDesignerExtension : WebLayoutsDesignerExtension {
        
        /// <summary>
        /// Создает экземпляр класса <see cref="DropdownOutUser"/>
        /// </summary>
        /// <param name="provider">service provider</param>
        public DropdownOutUserDesignerExtension(IServiceProvider provider)
                : base(provider) {
        }

        /// <summary>
        /// Возвращает описание пользовательских контролов
        /// </summary>
        /// <returns></returns>
        protected override List<ControlTypeDescription> GetControlTypeDescriptions() {
            return new List<ControlTypeDescription> {
                GetControlDescription()
            };
        }

        /// <summary>
        /// Возвращает ResourceManager этого расширения (расширяет словарь локализации конструктора разметок, не путать с окном Localization конструктора разметок)
        /// </summary>
        /// <returns></returns>
        protected override List<ResourceManager> GetResourceManagers() {
            return new List<ResourceManager> {
                Resources.ResourceManager
            };
        }

        /// <summary>
        /// Возвращает описание контрола
        /// </summary>
        private ControlTypeDescription GetControlDescription() {

            var CustomControl = new ControlTypeDescription(Constants.DropdownOutUserControl.ClassName) {
                DisplayName = Resources.ControlName,
                ControlGroupDisplayName = Resources.ControlGroup_DigitalDesign,
                PropertyDescriptions =
                {
                    PropertyFactory.GetNameProperty(),
                    PropertyFactory.GetVisibilityProperty(),
                    PropertyFactory.GetCustomCssClassesProperty(),
                    PropertyFactory.GetLabelTextProperty(),
                    PropertyFactory.GetShowEmptyLabelProperty(),
                    PropertyFactory.GetTabStopProperty(),
                    PropertyFactory.GetTipProperty(),
                    PropertyFactory.GetEditModeProperty(),
                    PropertyFactory.GetRequiredProperty(),
                    PropertyFactory.GetPlaceHolderProperty(),
					// Блок свойств Binding
                    PropertyFactory.GetDataSourceProperty(),
                    PropertyFactory.GetDataFieldProperty(),					
					// Биндинг для набора элементов
					PropertyFactory.GetBindingProperty(),
                    PropertyFactory.GetEditOperationProperty(),

                    PropertyFactory.GetDataChangedEvent(),
                    PropertyFactory.GetMouseOutEvent(),
                    PropertyFactory.GetMouseOverEvent()
                }
            };
            return CustomControl;
        }

        #region Property_Description

        #endregion Property_Description

    }
}
