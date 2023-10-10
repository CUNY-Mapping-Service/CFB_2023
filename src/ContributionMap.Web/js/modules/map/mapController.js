ContributionMap.module('Map', function (Map, App, Backbone, Marionette, $, _) {

    

    var _map;
    var _queryVisualizer;

    var _loadingMask;

    var _legend;
    var _identify;
    var _candidateInfo;

    var _highlightedCouncilDistrict;


    Map.Controller = {
        initialize: function (config, query, queryString) {

            _loadingMask = new Map.LoadingMask();
            _loadingMask.showBusy(true);

            this.initMap(config.mapConfig, queryString);

            this.initQueryVisualizer(config, query, queryString);
            

            
            this.initializeMapControls(config, query);

            
            _highlightedCouncilDistrict = new Map.Layer.HighlightedCouncilDistrictLayer({ map: _map, geographyType: 'citycouncildistricts' });
            query.on('change:office', function (model, val) {

                if (model.currentOfficeIsACityCouncilDistrict()) {
                    _highlightedCouncilDistrict.highlightFeature(val);
                } else {
                    _highlightedCouncilDistrict.highlightFeature(null);
                }
            });
           
            if (query.currentOfficeIsACityCouncilDistrict()) {
                _highlightedCouncilDistrict.highlightFeature(query.get('office'));
            }

           

            return;

        },

        initMap: function (mapConfig, queryString) {


            _map = new google.maps.Map(
               document.getElementById('map'),
                {
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        //position: google.maps.ControlPosition.TOP_LEFT
                        position: google.maps.ControlPosition.BOTTOM_LEFT
                    },
                    panControl: false,


                    zoomControlOptions: {
                        //position: google.maps.ControlPosition.LEFT_TOP
                        position: google.maps.ControlPosition.RIGHT_BOTTOM
                    },
                    styles: mapConfig.baseMapStyles
                }
           );

            //_map.setOptions({ styles: mapConfig.baseMapStyles });

            if (queryString['z'] && queryString['latlng']) {

                var ll = queryString['latlng'].split(',');

                _map.setOptions({
                    zoom: parseInt(queryString['z'], 10),
                    center: new google.maps.LatLng(ll[0], ll[1])
                });
            } else {
                var bounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(mapConfig.initialExtent.lowerLeft[0], mapConfig.initialExtent.lowerLeft[1]),
                    new google.maps.LatLng(mapConfig.initialExtent.upperRight[0], mapConfig.initialExtent.upperRight[1])
                );
                _map.fitBounds(
                    bounds
                );
            }
           

        },
       
      
        initializeMapControls: function (config, query) {


            var amountTypeSelector = new Map.AmountTypeSelector.AmountTypeControl();
            amountTypeSelector.setMap(_map, google.maps.ControlPosition.RIGHT_TOP);
            amountTypeSelector.show(query);

            _legend = new Map.Legend.LegendControl({ geographicDataFiles: config.geographicDataFiles });
            _legend.setMap(_map, google.maps.ControlPosition.RIGHT_TOP);
            _legend.showLegend(query);

            
            query.on('change:amountType', function (model, val) { _legend.showLegend(query); });
            query.on('change:office', function (model, val) { _legend.showOffice(query); });


            _candidateInfo = new Map.CandidateSummary.CandidateSummaryControl();
            _candidateInfo.setMap(_map, google.maps.ControlPosition.LEFT_TOP);

            var logoControl = new Map.LogoControl();
            logoControl.setMap(_map, google.maps.ControlPosition.LEFT_BOTTOM);



            App.Entities.CandidateList.getContributionsByCandidate(query.get('candidate'), query.get('filingPeriod')).then(function (candidate) {
                _candidateInfo.showCandidate(candidate, query);
                _identify.setCandidate(candidate);
            });

            query.on('change:candidate', function (model, val) {

               
                App.Entities.CandidateList.getContributionsByCandidate(model.get('candidate'), model.get('filingPeriod')).then(function (candidate) {
                    _candidateInfo.showCandidate(candidate, model);
                    _identify.setCandidate(candidate);
                    //_identify.setCandidate();

                });
            });
            query.on('change:filingPeriod', function (model, val) {

                App.Entities.CandidateList.getContributionsByCandidate(model.get('candidate'), model.get('filingPeriod')).then(function (candidate) {
                    _candidateInfo.showCandidate(candidate, model);
                    _identify.setCandidate(candidate);

                });
            });

            var search = new Map.Search.SearchControl({config: config});
            search.setMap(_map, google.maps.ControlPosition.LEFT_TOP);
            search.setQuery(query);
            search.on('selected', function (e) {

                _queryVisualizer.findFeature(e.item, e.geography);

            });
          
            _identify = new Map.Identify.IdentifyControl({geographicDataFiles: config.geographicDataFiles});
            _identify.setMap(_map, google.maps.ControlPosition.LEFT_TOP);
            var linkView = new Map.Link.LinkView({ query: query, map: _map, queryVisualizer: _queryVisualizer });
            $('#link-region').append(linkView.render().el).hide();
            if (!query.attributes.embed) {
                
                $('#link-region').show();
                $("#share-modal-link").show();
                $("#2017-link").show();
                $("#queryBuilderForm").show();
            }else{
                $("#full-map-link").show();
            }

        },

        initQueryVisualizer: function(config, query, queryString){
          //  console.log(query)
           // query.attributes = queryString

            _queryVisualizer = new Map.QueryVisualizer({
                map: _map,
                config: config,
                query: query
            });

            _queryVisualizer.once('ready', function () {
                if (queryString['selected']) {
                    _queryVisualizer.findFeature(queryString['selected'].toUpperCase(), query.get('geography'));
                }
            });
            

            _queryVisualizer.on('query:changed', function () {
                _loadingMask.showBusy(true);
            });
            _queryVisualizer.on('style:updated', function () {
                _loadingMask.showBusy(false);
            });
            _queryVisualizer.on('selected', function (data) {
                
                //_identify.show(data);
                _identify.setFeatureData(data);
                _legend.showSelected(data);
            });
            _queryVisualizer.on('unselected', function (data) {
                //_identify.show(null);
                _identify.setFeatureData(null);
                _legend.showSelected(null);
            });
            _queryVisualizer.on('highlighted', function (data) {
                //_identify.show(data);
                _identify.setFeatureData(data);
            });
            _queryVisualizer.on('unhighlighted', function (data) {
                //_identify.show(null);
                _identify.setFeatureData(null);
            });
        },
        addMapClickHandler: function () {

        },

        
        identify: function (latlng) {
           

        },

        zoomToBounds: function (bounds) {
            //var offsetLeft = _sidebar.isVisible() ? _sidebar.getOffset() : 0;
            _map.fitBounds(bounds, { paddingTopLeft: [300, 0] });
        },


        buildVal: function (feature, query) {
            console.log(feature.getProperty('totalPre') + feature.getProperty('totalPost'))
            return feature.getProperty('totalPre') + feature.getProperty('totalPost');

        },

        setContributionLayer: function (query) {
            console.log(query)
            _dataVisualizer.show(query);

            _legend.showLegend(query);
        },

        showCandidate: function (candidate) {
            _candidateInfo.showCandidate(candidate);
        },

        showDistrict: function (name) {
           
            _cityCouncilDistrict.forEach(function (f) {
                _cityCouncilDistrict.remove(f);

            });


            if (name.indexOf('City Council ') > -1) {
                $.when(App.request('citycouncildistrict:byname', name)).done(function (district) {

                    _cityCouncilDistrict.addGeoJson(
                        district, {
                            idPropertyName: 'CounDist'
                        }
                    );
                    _cityCouncilDistrict.setMap(_map);
                });

            } else {
                _cityCouncilDistrict.setMap(null);
            }

        }
       
    };



});