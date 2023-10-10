ContributionMap.module('Map', {
    startWithParent: false,

    define: function (Module, App, Backbone, Marionette, $, _) {

        var _mapController;
        var _query;
        //var _geographicDataManager;
        Module.on('start', function (options) {
           // console.log(options.query)

            _query = options.query;

            _mapController = Module.Controller;
            _mapController.initialize(options.config, options.query, options.queryString);

        });


    }
});