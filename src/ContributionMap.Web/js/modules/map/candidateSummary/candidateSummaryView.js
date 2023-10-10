ContributionMap.module('Map.CandidateSummary', function (CandidateSummary, App, Backbone, Marionette, $, _) {

    CandidateSummary.CandidateSummaryView = Backbone.Marionette.ItemView.extend({


        template: '#candidate-info',

        className: 'candidate-info',

        tooltipTemplates: {
            'tooltiptotal': _.template($('#tooltip-total').html())
        },

        onRender: function () {
           
            this.$el.find('.tooltip-total').tooltip({
                html: 'true',
                title: this.tooltipTemplates.tooltiptotal()
            });
        },

        templateHelpers: _.extend(
            App.Common.templateHelpers,
            {
                formatNumber: function(val){
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
                    if (!denominator ) {
                        return 0;
                    }
                    return  (numerator / denominator);

                },
                getPercent: function (value, total) {
                    if (!total) { return 0; }
                    var percent = (value / total) * 100;
                    return Math.round(percent * 10) / 10;
                }
            }
        ),

        serializeData: function () {
            var fpLabel = this.options.query.getFilingPeriodLabel();
            var nyccfbSearchPageLink = App.Map.getNyccfbSearchPageLink({
                query: this.options.query,
                candidate: this.model
            });
            var nyccfbSearchPageLinkCommittees = App.Map.getNyccfbSearchPageLink({
                contributorType: 'committees_unions',
                query: this.options.query,
                candidate: this.model
            });
            return _.extend(this.model.toJSON(), {
                filingPeriodLabel: fpLabel,
                nyccfbSearchPageLink: nyccfbSearchPageLink,
                nyccfbSearchPageLinkCommittees: nyccfbSearchPageLinkCommittees
            });
        }

    });

});