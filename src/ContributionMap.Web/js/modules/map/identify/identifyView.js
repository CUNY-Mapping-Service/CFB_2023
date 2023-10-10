ContributionMap.module('Map.Identify', function (Identify, App, Backbone, Marionette, $, _) {

    Identify.IdentifyView = Backbone.Marionette.ItemView.extend({
        className: 'panel panel-default hover-info',

        template: '#hover-info',

        templateHelpers: _.extend(
            App.Common.templateHelpers,
            {
                formatNumber: function (val) {
                    if (!val) {
                        return 0;
                    }

                    return this.addCommas(Math.round(val));
                },
                getSum: function (val1, val2) {
                    if (!val1) {
                        return 0;
                    }
                    return (val1 + val2);

                },
                getAverage: function (numerator, denominator) {
                    if (!denominator) {
                        return 0;
                    }
                    return (numerator / denominator);

                }
            }
        ),

        serializeData: function () {

            return this.options.data;
        }

    });


});