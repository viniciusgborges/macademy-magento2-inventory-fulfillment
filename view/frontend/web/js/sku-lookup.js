define([
    'ko',
    'uiComponent',
    'mage/storage',
    'jquery',
    'mage/translate',
    'Macademy_InventoryFulFillment/js/model/sku'
], function (
    ko,
    Component,
    storage,
    $,
    $t,
    skuModel
) {
    'use strict';

    return Component.extend({
        defaults: {
            sku: skuModel.sku,
            placeholder: $t('Example: %1').replace('%1', '24-MB01'),
            messageResponse: ko.observable(''),
            isSuccess: skuModel.isSuccess
        },
        initialize() {
            this._super();
            console.log('skuLookup has been loaded');
        },

        handleSubmit() {
            $('body').trigger('processStart');
            this.messageResponse('');
            this.isSuccess(false);

            storage.get(`rest/V1/products/${this.sku()}`)
                .done(response => {
                    this.messageResponse($t('Product found! %1').replace('%1', `<strong>${response.name}</strong>`));
                    this.isSuccess(true);
                })
                .fail(() => {
                    this.messageResponse($t('Product not found.'));
                    this.isSuccess(false);
                })
                .always(() => {
                    $('body').trigger('processStop');
                })
        }
    });
})
