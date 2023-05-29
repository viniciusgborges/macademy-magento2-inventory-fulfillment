define([
    'ko',
    'uiComponent',
    'Macademy_InventoryFulFillment/js/model/box-configurations',
    'Macademy_InventoryFulFillment/js/model/sku',
    'jquery'
], function (
    ko,
    Component,
    boxConfigurationsModel,
    skuModel,
    $
) {
    'use strict';

    return Component.extend({
        defaults: {
            boxConfigurationsModel: boxConfigurationsModel,
            skuModel: skuModel
        },

        initialize() {
            this._super();
            console.log('boxConfigurations has been loaded');

            skuModel.isSuccess.subscribe((value) => {
                console.log('SKU isSuccess new value', value);
            });

            skuModel.isSuccess.subscribe((value) => {
                console.log('SKU isSuccess old value', value);
            }, null, 'beforeChange');
        },

        handleAdd() {
            boxConfigurationsModel.add();
        },

        handleDelete(index) {
            boxConfigurationsModel.delete(index);
        },

        handleSubmit() {
            $('.box-configurations form input').removeAttr('aria-invalid');

            if ($('.box-configurations form').valid()) {
                boxConfigurationsModel.isSuccess(true);
            } else {
                boxConfigurationsModel.isSuccess(false);
            }
        },
    });
})
