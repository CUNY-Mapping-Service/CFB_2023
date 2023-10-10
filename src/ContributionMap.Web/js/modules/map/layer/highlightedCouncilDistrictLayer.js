ContributionMap.module('Map.Layer', function (Layer, App, Backbone, Marionette, $, _) {

    Layer.HighlightedCouncilDistrictLayer = function (options) {

        this.geographyType = options.geographyType;

        this.geoManager = App.Entities.GeographicDataManager.getInstance();
        this.geoJson = null;
        this.data = new google.maps.Data({
            map: options.map,
            style: {
                clickable: false,
                fillOpacity:0,
                strokeColor: '#0000ff',
                zIndex: 100,
                strokeWeight: 2
            }
        });
        

    };

    _.extend(Layer.HighlightedCouncilDistrictLayer.prototype, Backbone.Events, {
        getGeoJson: function () {
           
            if (!this.geoJson) {
                return this.geoManager.getData(this.geographyType).then($.proxy(function (data) {

                    var objectKey = _.keys(data.objects)[0];
                    this.geoJson = topojson.feature(data, data.objects[objectKey]);
                   
                    return this.geoJson;
                }, this));
            } else {
                return $.Deferred().resolve(this.geoJson);
            }

        },
        getFeatureByName: function(name){
            //NAMES ARE CITY COUNCIL #. TO GET ID SPLI BY SPACE THEN GET THE THIRD ITEM
            var id = parseInt(name.split(' ')[2], 10);
            return this.getFeature(id);
        },
        getFeature: function (id) {
            return this.getGeoJson().then($.proxy(function (geoJ) {
                var features = geoJ.features;
                return _.find(features, function (feature) {
                    return feature.id === id;
                })
            }, this));
        },
        highlightFeature: function (name) {

            this.unhighlightAll();

            if (name) {
                this.getFeatureByName(name).then($.proxy(function (feature) {
                    this.data.addGeoJson(feature);
                }, this));
            }
            
        },
        unhighlightAll: function () {
            var data = this.data;
            data.forEach(function (f) {
                data.remove(f);
            });
        }
    });

});