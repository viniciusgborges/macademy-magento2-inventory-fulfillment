define([
    'ko',
    'uiComponent',
    'Macademy_InventoryFulFillment/js/model/sku',
    'Macademy_InventoryFulFillment/js/model/box-configurations',
    'mage/url',
    'mage/storage'
], function (
    ko,
    Component,
    skuModel,
    boxConfigurationsModel,
    url,
    storage
) {
    'use strict';

    return Component.extend({
        defaults: {
            numberOfBoxes: boxConfigurationsModel.numberOfBoxes(),
            shipmentWeight: boxConfigurationsModel.shipmentWeight(),
            billableWeight: boxConfigurationsModel.billableWeight(),
            isTermsChecked: ko.observable(false),
            boxConfigurationsIsSuccess: boxConfigurationsModel.isSuccess,
            skuModel: skuModel,
            boxConfigurations: boxConfigurationsModel.boxConfigurations,
            sku: skuModel.sku
        },
        initialize() {
            this._super();

            console.log('reviewSubmit has been loaded');

            this.canSubmit = ko.computed(() => {
                return skuModel.isSuccess()
                    && boxConfigurationsModel.isSuccess()
                    && this.isTermsChecked();
            });
        },
        handleSubmit() {
            if (this.canSubmit()) {
                console.log('The review submit form has been submit');

                storage
                    .post('inventory-fulfillment/index/post', {
                        'sku': skuModel.sku,
                        'boxConfigurations': ko.toJSON(boxConfigurationsModel.boxConfigurations)
                    })
                    .done(response => console.log('Response', response))
                    .fail(error => console.log('Error', error));
            } else {
                console.log('The review submit form has an error');
            }
        }
    });
})
