ContributionMap.module('Map.AmountTypeSelector', function (AmountTypeSelector, App, Backbone, Marionette, $, _) {

    AmountTypeSelector.AmountTypeView = Backbone.Marionette.ItemView.extend({

        el: '.amount-type-selector',

        render: function () {

            this.bindUIElements(); // wire up this.ui, if any.
            this.$el.css({ 'display': 'block' });
        },


        ui: {
            radDataType: 'input:radio[name=radAmountType]',
        },

        events: {
            'change @ui.radDataType': 'onRadDataTypeChanged'
        },

     
        onRadDataTypeChanged: function (e) {
            this.model.set('amountType', this.ui.radDataType.filter(":checked").val());
        }
        
    });

});