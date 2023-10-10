ContributionMap.module('Map.Legend', function (Legend, App, Backbone, Marionette, $, _) {



    Legend.LegendItemView = Backbone.Marionette.ItemView.extend({


        template: '#legend-item',

        templateHelpers: _.extend(
            App.Common.templateHelpers, {
            fixMaxValueText: function (val) {
                if (val === Infinity) {
                    return 'or greater';
                }
                //SR EDIT: FOR NEGATIVE AMOUNT
                else if (val === -10000000) {
                    return '<$0';
                }
                return val;
            },
            asMoney: function (val) {

                newVal = this.fixMaxValueText(val);

                if (isNaN(newVal)) {
                    return newVal;
                } else {
                    return '$' + this.addCommas(newVal);
                }
            }

        }),

        tagName: 'li',
        className: 'legend-item'

    });

    Legend.LegendItemViewNumber = Legend.LegendItemView.extend({

        template: '#legend-item-number'

    });


    Legend.LegendView = Backbone.Marionette.CompositeView.extend({
        template: '#legend-composite',
        className: 'legend',

        //childView: Legend.LegendItemView,
        getChildView: function (item) {

            if (this.model.get('type') === 'number') {
                return Legend.LegendItemViewNumber;
            }

            return Legend.LegendItemView;
        },
        childViewContainer: '.legend-items',

        templateHelpers: {
            getAmountTypeTitle: function (amountType) {
                if (amountType === 'number') {
                    return amountType + ' of';
                }

                return amountType;
            }

        },

        ui: {
            cityCouncilLegendItem: '.city-council-legend-item',
            selectedDistrictLegendItem: '.selected-district-legend-item'

        },

        showCityCouncilLegendItem: function (cityCouncilDistrict) {
            if (cityCouncilDistrict) {
                this.ui.cityCouncilLegendItem.find('span').text(cityCouncilDistrict);
                this.ui.cityCouncilLegendItem.show();
            } else {
                this.ui.cityCouncilLegendItem.hide();
            }
        },

        showSelectedDistrictLegendItem: function (text) {
            if (text) {
                this.ui.selectedDistrictLegendItem.find('span').text(text);
                this.ui.selectedDistrictLegendItem.show();
            } else {
                this.ui.selectedDistrictLegendItem.hide();
            }
        }

    });


});