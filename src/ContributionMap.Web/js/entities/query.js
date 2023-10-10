ContributionMap.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {


    var _selFilingPeriod;

    
    Entities.on('start', function (config) {
        
        _selFilingPeriod = $('#selFilingPeriod');

       //console.log(config)
    });

    //TODO: OVERRIDE DEFAULTS HERE

    Entities.Query = Backbone.Model.extend({
        defaults: {
            office: 'All Races',
            candidate: 'AllAll',
            geography: 'zipcodes',
            amountType: 'total',//total or average
            //electionPeriod: 'combined'//pre (PRIMARY), post (GENERAL), combined
            filingPeriod: 0//0 is all filing periods combined
        },

        currentOfficeIsACityCouncilDistrict: function () {
            var val = this.get('office');

            if (val.toLowerCase().indexOf('city council ') > -1) {
                return true;
            }
            return false;
            
        },
        getFilingPeriodLabel: function () {
            var fp = this.get('filingPeriod');
            var fpLabel = _selFilingPeriod.find('option[value="' + fp + '"]').text();

            if (fp !== 0) {
                fpLabel += ' filing period';
            }

            return fpLabel;
        }

    });

});