ContributionMap = (function (Backbone, Marionette, $, _) {
    var App = new Marionette.Application();


    App.on('start', function (config) {


        var entities = App.module('Entities');
        //console.log(entities)
        // var query = new entities.Query({
        //     office: $('#selOffice').val(),
        //     candidate: $('#selCandidate').val(),
        //     geography: $('#selGeography').val(),
        //     filingPeriod: $('#selFilingPeriod').val(),
        //     amountType: $('input:radio[name=radAmountType]').filter(':checked').val()
        // });
       // console.log(query)

        
        var geographicDataManager = new entities.GeographicDataManager({
            baseUrl: config.baseUrl,
            geographicDataFiles: config.geographicDataFiles
        });

        var mapModule = App.module('Map');
        var qbModule = App.module('QueryBuilder');

        if (config.parentUrl) {
            //console.log(window.parent)
            qbModule.parentUrl = config.parentUrl; 
            //if(config.parentUrl)
            qbModule.parentHost = config.parentUrl.replace('https://', '').replace('http://', '').split('/').join('/').split('?')[0];
            //console.log(config.parentUrl)

            var str = config.parentUrl.replace('https://', '').replace('http://', '').split('/');
            if(qbModule.parentUrl.indexOf("?")===-1){
                qbModule.parentSearch = "";
            }else{
                qbModule.parentSearch = str[str.length-1];

            }
        }


        var queryString = new mapModule.Link.QueryStringParser().queryString;

        


        var query = new entities.Query({
            office: $('#selOffice').val(),
            candidate: $('#selCandidate').val(),
            geography: $('#selGeography').val(),
            filingPeriod: $('#selFilingPeriod').val(),
            amountType: $('input:radio[name=radAmountType]').filter(':checked').val()
        });

        var queryObj = {}
        for(var key in queryString){
            queryObj[key] = queryString[key]; 
            query.set(queryObj);
            switch(key.toLowerCase()){
                case 'office':
                    if(queryString[key].toLowerCase() === 'mayorall'){
                        queryString[key] = 'mayorall'
                    }
                    $('#selOffice').val(queryString[key])
                break;
                case 'candidate':
                    if(queryString[key].toLowerCase() !=='allall'){
                    		var i = 0;
							var timer = setInterval(function() {
					  			
					  			if (i > 20 || $("#selCandidate option[value='"+queryString[key]+"']").length > 0){
									$('#selCandidate').val(queryString[key])
									clearInterval(timer);
								}
					  			
							}, 200);
								}else{
									$('#selCandidate').val(queryString[key])
								}
                break;
                case 'geography':
                    $('#selGeography').val(queryString[key])
                break;
                case 'filingperiod':
                    $('#selFilingPeriod').val(queryString[key])
                break;
                case 'amounttype':
                    $('input:radio[value='+queryString[key]+']').attr('checked', true);
                break;
            }
        }
        

        mapModule.start({ config: config, query: query, queryString: queryString });
        qbModule.start({ config: config, query: query });

    });
    return App;
})(Backbone, Marionette, $, _);