ContributionMap.module('Map.Link', function (Link, App, Backbone, Marionette, $, _) {

    Link.LinkView = Marionette.ItemView.extend({

        template: '#link-view',

        className: 'link-view',

        initialize: function(options){
            this.query = options.query;
            this.map = options.map;
            this.queryVisualizer = options.queryVisualizer;

            this.listenTo(this.query, 'change:candidate', this.updatetxtLink);
            this.listenTo(this.query, 'change:geography', this.updatetxtLink);
            this.listenTo(this.query, 'change:filingPeriod', this.updatetxtLink);
            this.listenTo(this.query, 'change:amountType', this.updatetxtLink);

            google.maps.event.addListener(this.map, 'idle', $.proxy(this.updatetxtLink, this));

            this.listenTo(this.queryVisualizer, 'selected', this.updatetxtLink);
            this.listenTo(this.queryVisualizer, 'unselected', this.updatetxtLink);
        },

        onRender: function(){
            //this.updatetxtLink();
        },

        ui:{
            txtLink: '#txtLink'
           
        },
        events: {
            //'click input[type=text]': 'onLinkTextBoxClick',
            'click .btn-select': 'onBtnSelectClick'
        },



        onBtnSelectClick: function (e) {

            this.ui.txtLink.focus();
            if (this.ui.txtLink[0].setSelectionRange) {
                this.ui.txtLink[0].setSelectionRange(0, this.ui.txtLink[0].value.length);
            } else {
                this.ui.txtLink.select();
            }
            
        },

        getBaseUrl: function () {
            var url = location.protocol + '//' + (App.QueryBuilder.parentHost || location.host);

            if (!App.QueryBuilder.parentHost || typeof App.QueryBuilder.parentHost === 'undefined') {
                url += window.parent.location.pathname
            }

            return url
        },

        generateLink: function(){

            var params = {};
            var center = this.map.getCenter();
            if(center){
                params['latlng'] = center.toUrlValue();
                params['z'] = this.map.getZoom();
            }

            
            var query = this.query;
            params['office'] = query.get('office');
            params['candidate'] = query.get('candidate');
            params['geography'] = query.get('geography');
            params['amountType'] = query.get('amountType');
            params['filingPeriod'] = query.get('filingPeriod');
            
            if (this.queryVisualizer.selectedFeature) {
                params['selected'] = this.queryVisualizer.selectedFeature.getId();
            }

            

            return this.getBaseUrl() + '?' +  $.param(params);

            //return "https://www.nyccfb.info/follow-the-money/cunymap-2021" + '?' +  $.param(params);
        },

        updatetxtLink: function () {
            var link = this.generateLink();
            this.ui.txtLink.val(link);
            console.log(link)

            $("#full-map-link").attr("href", link);
        }
       
    });

});
