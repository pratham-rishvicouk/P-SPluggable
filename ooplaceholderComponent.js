'use strict';
define(function (require) {
  const placeholderManager = require('core/placeholderManager');/* doubt */ /* How it will decide the place? */
  const openorderWindow = require('../Simple/placeholderOrderTemplate.js');

  const placeHolder = function ($scope, $element, controlService) {
    this.getItems = () => {
      const items = [
        {
          text: 'Print S & P', // Button name
          key: 'placeholderOrderTemplate', // Button id (unique)
          icon: 'fa fa-th-large', // Button icon
          content: {
            moduleName: 'placeholderOrderTemplate', // same as ngModule.name in placeholderOrderTemplate.js
            controlName: 'placeholderOrderTemplate', // same as ngModule.name in placeholderOrderTemplate.js
          },
        },
      ];

      return items;
    };

    this.isEnabled = (itemKey) => {
      return true;
    };
    /* will we be using below code? */
    this.onClick = () => {
      const control = controlService.createControl({
        selector: openorderWindow.selector,
        isPersistent: true,
        data: {
          selectedOrders: $scope.viewStats.get_selected_orders(),
        },
      });

      control.load().then(() => {
        control.show();
      });

      control.promise.then((data) => {
        if (data?.search) {
          $scope.$ctrl.control.$scope.$ctrl.search_value = data.search;
          $scope.$ctrl.control.$scope.$ctrl.search_text();

          $scope.$evalAsync();
        }
      });
    };
  };
  /* what's this */
  placeholderManager.register('OpenOrders_OrderControlButtons', placeHolder);
});
