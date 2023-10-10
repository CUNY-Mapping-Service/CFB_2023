ContributionMap.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    Entities.ContributionDataManager = function (options) {
        this.baseUrl = options.baseUrl + 'api/candidates/';
    }
    _.extend(Entities.ContributionDataManager.prototype, Backbone.Events, {
        buildUrl: function(candidate, geography, filingPeriod){
            return this.baseUrl + candidate + '/' + geography + '/filingPeriods/' + filingPeriod;
        },
        getData: function (candidate, geography, filingPeriod) {

            return this.fetchData(this.buildUrl(candidate, geography, filingPeriod)).then(function (data) {
                return data;
            });

        },
        fetchData: function (url) {
            return $.ajax({
                dataType: "json",
                url: url,
                context: this
            });
        }
    });


});