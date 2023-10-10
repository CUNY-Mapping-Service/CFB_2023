ContributionMap.module('QueryBuilder', {
    startWithParent: false,
   
    define: function (Module, App, Backbone, Marionette, $, _) {

        

        Module.on('start', function (options) {


            var query = options.query;

            var _builderView = new Module.QueryBuilderView({model: query});
            _builderView.render();

            var candidateSearchBox = new Module.CandidateSearchBox({ query: query });
           
        });


    }
});
