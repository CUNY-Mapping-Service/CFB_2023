ContributionMap.module('Map.CandidateSummary', function (CandidateSummary, App, Backbone, Marionette, $, _) {

    CandidateSummary.CandidateSummaryControl = function () {

        //this.baseDiv = document.createElement('div');
        //this.baseDiv.style.minHeight = '280px';
        //this.$baseDiv = $(this.baseDiv);
        this.$baseDiv = $('#candidateSummary');

        this.inOutNycChartColors = ['#008000', '#800080'];
        this.contributionAmountChartColors = ['#2244ee', '#ee2222'];
        this.contributorTypeChartColors = ['#2166ac', '#d1e5f0'];


        

    };

    _.extend(CandidateSummary.CandidateSummaryControl.prototype, {

        setMap: function (map, position) {
            this.map = map;
            map.controls[position].push(this.baseDiv);
        },

        showCandidate: function (candidate, query) {
               
           
           
            if (!candidate) { return; }

            var infoView = new CandidateSummary.CandidateSummaryView({
                model: candidate,
                query: query
            });

            this.$baseDiv.html(infoView.render().el);
            
          
            this.showChartPrimaryInOutNyc(candidate);
            //this.showChartGeneralInOutNyc(candidate);
            //this.showChartOverallInOutNyc(candidate);
            this.showChartPrimaryAmount(candidate);
            //this.showChartGeneralAmount(candidate);
            //this.showChartOverallAmount(candidate);
            this.showChartPrimaryContributorType(candidate);

           
            var self = this;
            google.maps.event.addListenerOnce(this.map, 'idle', function (e) {
                self.showChartPrimaryInOutNyc(candidate);
                //self.showChartGeneralInOutNyc(candidate);
                //self.showChartOverallInOutNyc(candidate);
                self.showChartPrimaryAmount(candidate);
                //self.showChartGeneralAmount(candidate);
                //self.showChartOverallAmount(candidate);
            })

            
        },
        showChart: function (chartDiv, data, colors, tooltipPrefix) {
            data = _.map(data, function (d) { return Math.round(d); });
            chartDiv.sparkline(data, {
                offset: -90,
                type: 'pie',
                width: '32',
                height: '32',
                sliceColors: colors,
                borderWidth: 0,
                tooltipPrefix: tooltipPrefix,
                tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}} ({{percent.1}}%)'
            });
        },
        showChartPrimaryInOutNyc: function (candidate) {
            var data = [
                candidate.get('totalFromInsideNyc'),
                candidate.get('totalFromOutsideNyc')
            ];
            this.showChart(
               this.$baseDiv.find('#piePrimaryInNyc'),
               data,
               this.inOutNycChartColors,
               '$'
           );
        },
        showChartGeneralInOutNyc: function (candidate) {
            var data = [
                candidate.get('generalDetails')['totalFromInsideNyc'],
                candidate.get('generalDetails')['totalFromOutsideNyc']
            ];
            this.showChart(
               this.$baseDiv.find('#pieGeneralInNyc'),
               data,
               this.inOutNycChartColors,
               '$'
           );
        },
        showChartOverallInOutNyc: function (candidate) {
            var data = [
                candidate.get('primaryDetails')['totalFromInsideNyc'] + candidate.get('generalDetails')['totalFromInsideNyc'],
                candidate.get('primaryDetails')['totalFromOutsideNyc'] + candidate.get('generalDetails')['totalFromOutsideNyc']
            ];
            this.showChart(
               this.$baseDiv.find('#pieOverallInNyc'),
               data,
               this.inOutNycChartColors,
               '$'
           );
        },
        showChartPrimaryAmount: function (candidate) {
            var data = [
                candidate.get('lessThanOrEqualTo250'),
                candidate.get('greaterThan250')
            ];
            this.showChart(
               this.$baseDiv.find('#piePrimaryAmount'),
               data,
               this.contributionAmountChartColors,
               ''
           );
        },
        showChartGeneralAmount: function (candidate) {
            var data = [
                candidate.get('generalDetails')['lessThanOrEqualTo250'],
                candidate.get('generalDetails')['greaterThan250']
            ];
            this.showChart(
               this.$baseDiv.find('#pieGeneralAmount'),
               data,
               this.contributionAmountChartColors,
               ''
           );
        },
        showChartOverallAmount: function (candidate) {
            var data = [
                candidate.get('primaryDetails')['lessThanOrEqualTo250'] + candidate.get('generalDetails')['lessThanOrEqualTo250'],
                candidate.get('primaryDetails')['greaterThan250'] + candidate.get('generalDetails')['greaterThan250']
            ];
            this.showChart(
               this.$baseDiv.find('#pieOverallAmount'),
               data,
               this.contributionAmountChartColors,
               ''
           );
        },
        showChartPrimaryContributorType: function (candidate) {
            var data = [
                candidate.get('totalFromIndividuals'),
                candidate.get('totalFromNotIndividuals')
            ];
            this.showChart(
               this.$baseDiv.find('#piePrimaryContributorType'),
               data,
               this.contributorTypeChartColors,
               '$'
           );
        }
    });


});