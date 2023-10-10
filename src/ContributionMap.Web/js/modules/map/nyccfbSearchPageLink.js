ContributionMap.module('Map', function (Map, App, Backbone, Marionette, $, _) {

    Map.getNyccfbSearchPageLink = function (options) {

        var contributorType = options.contributorType || 'individuals';//possible values ar individual or committees_unions
        var query = options.query;
        var candidate = options.candidate;
        var zipCode = options.zipCode;

        //var baseUrl = 'http://www.nyccfb.info/searchabledb/AdvancedContributionSearchResult.aspx?';
        //SR change testing new CFB FTM URL parameters
        var baseUrl = 'https://www.nyccfb.info/FTMSearch/Candidates/Contributions?';
        var params = {};

        //COMMON PARAMETERS FOR ALL QUERIES
        //params['ec'] = '2017';
        params['ec'] = '2023';
        //params['ec_id'] = '2017';
        //params['RecTyp'] = 'Candidates only';
        params['rt'] = 'can';
        //params['TransTyp'] = 'Monetary contributions';
        //params['TransTyp_id'] = 'ABC';
        params['trans'] = 'ABC,M';

        //CONTRIBUTOR TYPE
        switch (contributorType) {
            case 'individuals':
                //params['ccode'] = 'Individuals';
                //params['ccode_id'] = 'ind,can,spo,fam';
                //params['ct'] = 'IND%2CCAN%2CSPO%2CFAM';
                params['ct'] = 'IND,CAN,SPO,FAM';
                break;
            case 'committees_unions':
                //params['ccode'] = 'Political Committees; Labor Unions; Business Entities; Other/Unclassified';
                //params['ccode_id'] = 'pcom,pcomc,pcomp,pcomz,empo,corp,part,llc,othr,unkn';
                //2017
                //params['ct'] = 'PCOM,PCOMC,PCOMP,PCOMZ,EMPO,CORP,PART,LLC,OTHR,UNKN';
                //2021
                params['ct'] = 'PCOMC,PCOMZ,PCOMP,empo,CORP,PART,LLC,othr_unkn';
                break;
        }

        if (candidate) {
            //OFFICE PARAMETERS
            if (candidate.get('cfbOfficeId')) {
                //params['office'] = query.get('office');
                //params['office_id'] = query.get('office');
                params['ofc'] = candidate.get('cfbOfficeId');
            }
            //CANDIDATE PARAMETERS
            if (candidate.get('cfbRecipId')) {
                //params['cand'] = candidate.get('name');
                //params['cand_id'] = candidate.get('name');
                params['cand'] = candidate.get('cfbRecipId');
            } else {
                //params['cand'] = 'AllAll';
                console.log('no cand');
            }
        }

        //FILING PERIOD PARAMETERS
        if (query.get('filingPeriod') > 0) {
            //params['stmt'] = '';//#1  (01/12/2014 - 07/11/2014)';
            params['stmt'] = query.get('filingPeriod');

            //params['stmt_display'] = 'Statement (#' + query.get('filingPeriod') + ')';
            //params['date'] = 'Statement (#' + query.get('filingPeriod') + ')';
        }

        //ZIP CODE PARAMETERS
        if (zipCode) {
            params['geo'] = zipCode.id;
            params['zip'] = zipCode.id;
        }
        //console.log(baseUrl + $.param(params));
       // console.log(App.QueryBuilder.parentUrl + $.param(params));
        //return App.QueryBuilder.parentUrl + $.param(params);
        return baseUrl + $.param(params);


    };


});