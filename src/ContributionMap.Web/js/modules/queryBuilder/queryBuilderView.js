ContributionMap.module('QueryBuilder', function (QueryBuilder, App, Backbone, Marionette, $, _) {


    QueryBuilder.QueryBuilderView = Backbone.Marionette.ItemView.extend({
        el: '#queryBuilderForm',

        render: function () {

            this.bindUIElements(); // wire up this.ui, if any.

            //this.ui.selGeography.val(this.model.get('geography'));
        },


        modelEvents:{
            'change:office': 'onOfficeChanged',
            'change:candidate' : 'onCandidateChanged'

        },

        ui: {
            selOffice: '#selOffice',
            selCandidate: '#selCandidate',
            selGeography: '#selGeography',
            //radDataType: 'input:radio[name=radDataType]',
            //radTimePeriod: 'input:radio[name=radTimePeriod]'
            selFilingPeriod: '#selFilingPeriod'
        },

        events: {
            'change @ui.selOffice' : 'onSelOfficeChanged',
            'change @ui.selCandidate': 'onSelCandidateChanged',
            'change @ui.selGeography': 'onSelGeographyChanged',
            //'change @ui.radDataType': 'onRadDataTypeChanged',
            //'change @ui.radTimePeriod': 'onRadTimePeriodChanged'
            'change @ui.selFilingPeriod': 'onSelFilingPeriodChanged'
        },

        onSelOfficeChanged: function(e){
            this.model.set('office', this.ui.selOffice.val());
        },
        onSelCandidateChanged: function (e) {
            this.model.set('candidate', this.ui.selCandidate.val());
        },
        onSelGeographyChanged: function (e) {
            this.model.set('geography', this.ui.selGeography.val());
        },
        //onRadDataTypeChanged: function (e) {
        //    this.model.set('amountType', this.ui.radDataType.filter(":checked").val());
        //},
        //onRadTimePeriodChanged: function (e) {
        //    this.model.set('electionPeriod', this.ui.radTimePeriod.filter(":checked").val());
        //},
        onSelFilingPeriodChanged: function (e) {
            this.model.set('filingPeriod', this.ui.selFilingPeriod.val());
        },
        onOfficeChanged: function (e) {
            App.Entities.CandidateList.getByOffice(this.model.get('office')).then($.proxy(
                function(candidates){
                    this.updateCandidateList(candidates);
                    if(this.model.changed.candidate){
                        //this.model.set('candidate', this.model.get('candidate'));
                        this.ui.selOffice.val(this.model.get('office'));
                        this.ui.selCandidate.val(this.model.get('candidate'));
                    } else {
                        this.model.set('candidate', candidates.at(0).get('id'));
                    }
                    //
                }
                
            , this));
        },

        onCandidateChanged: function(query, candidateId){
            this.ui.selCandidate.val(candidateId);
        },

        updateCandidateList: function (candidates) {
            var sel = this.ui.selCandidate;
            sel.empty(); // remove old options
            candidates.each(function (c, i) {
                sel.append($("<option></option>")
                    .attr("value", c.get('id')).text(c.get('name')));
            });
        }
        //onQueryChanged: function () {
        //    this.trigger('change:query',  this.getQuery());
           
        //}, 

        //getCandidate: function(){
        //    return this.ui.selCandidate.val();
        //},

        //getQuery: function () {
        //    return {
        //        race : {
        //            id: this.ui.selOffice.val(),
        //            text: this.ui.selOffice.children("option:selected").text()
        //        },
        //        candidate: {
        //            id: this.ui.selCandidate.val(),
        //            text: this.ui.selCandidate.children("option:selected").text()
        //        },

        //        geography: {
        //            id: this.ui.selGeography.val(),
        //            text: this.ui.selGeography.children("option:selected").text()
        //        },
        //        dataType: {
        //            id: this.ui.radDataType.filter(":checked").val(),
        //            text: this.ui.radDataType.filter(":checked").val()
        //        },
        //        timePeriod: {
        //            id: this.ui.radTimePeriod.filter(":checked").val(),
        //            text: this.ui.radTimePeriod.filter(":checked").val()

        //        }
        //    };

          
        //},

        //updateCandidateList: function (candidates) {

        //    var sel = this.ui.selCandidate;

        //    sel.empty(); // remove old options
        //    candidates.each(function (c, i) {
               
        //        sel.append($("<option></option>")
        //           .attr("value", c.get('id')).text(c.get('name')));
        //    });

        //}



    });
    

   
});
