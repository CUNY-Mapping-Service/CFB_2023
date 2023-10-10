ContributionMap.module('Map', function (Map, App, Backbone, Marionette, $, _) {

    Map.getNyccfbSearchPageLink = function (options) {

        var contributorType = options.contributorType || 'individuals';//possible values ar individual or committees_unions
        var query = options.query;
        var candidate = options.candidate;
        var zipCode = options.zipCode;

        var baseUrl = 'http://www.nyccfb.info/searchabledb/AdvancedContributionSearchResult.aspx?';
        var params = {};

        //COMMON PARAMETERS FOR ALL QUERIES
        params['ec'] = '2017';
        params['ec_id'] = '2017';
        params['RecTyp'] = 'Candidates only';
        params['RecTyp_id'] = 'Can';
        params['TransTyp'] = 'Monetary contributions';
        params['TransTyp_id'] = 'ABC';

        //CONTRIBUTOR TYPE
        switch (contributorType) {
            case 'individuals' :
                params['ccode'] = 'Individuals';
                params['ccode_id'] = 'ind,can,spo,fam';
                break;
            case 'committees_unions':
                params['ccode'] = 'Political Committees; Labor Unions; Business Entities; Other/Unclassified';
                params['ccode_id'] = 'pcom,pcomc,pcomp,pcomz,empo,corp,part,llc,othr,unkn';
                break;
        }

        if (candidate) {
            //OFFICE PARAMETERS
            if (candidate.get('cfbOfficeId')) {
                params['office'] = query.get('office');
                params['office_id'] = candidate.get('cfbOfficeId');
            }
            //CANDIDATE PARAMETERS
            if (candidate.get('cfbRecipId')) {
                params['cand'] = candidate.get('name');
                params['cand_id'] = candidate.get('cfbRecipId');
            }
        }

        //FILING PERIOD PARAMETERS
        if (query.get('filingPeriod') > 0) {
            params['stmt'] = '';//#1  (01/12/2014 - 07/11/2014)';
            params['stmt_id'] = query.get('filingPeriod');

            params['stmt_display'] = 'Statement (#' + query.get('filingPeriod') + ')';
            params['date'] = 'Statement (#' + query.get('filingPeriod') + ')';
        }

        //ZIP CODE PARAMETERS
        if (zipCode) {
            params['geo'] = zipCode.id;
            params['zip'] = zipCode.id;
        }

        return baseUrl + $.param(params);


    };


});