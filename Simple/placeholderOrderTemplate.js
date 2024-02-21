'use strict';
define(function (require) {
  const template = require('text!./placeholderOrderTemplate.html');
  require('css!./placeholderOrderTemplate.css');

  const ngModule = angular.module('placeholderOrderTemplate', []);
  ngModule.component('placeholderOrderTemplate', {
    template,
    require: {
      control: '^',
    },
    controller: [
      '$scope',
      'controlService',
      '$q',
      '$element',
      function ($scope, controlService, $q, $element) {
        this.isMinimizeAllowed = controlService.isMinimizeAllowed();
        const self = this;

        this.selectedOrders = [];

        this.windowTitle = 'OOB Placeholder Template';

        this.selectedRow = null;

        this.$onInit = () => {
          self.selectedOrders = self.control.data.selectedOrders;
        };

        this.close = (data) => {
          this.control.close(data);
        };
      },
    ],
  });

  return {
    exports: ngModule.name,
    selector: 'placeholder-order-template',
  };
});
