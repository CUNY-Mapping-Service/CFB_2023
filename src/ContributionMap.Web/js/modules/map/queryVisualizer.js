ContributionMap.module('Map', function (Map, App, Backbone, Marionette, $, _) {

    //THIS IS FOR FIXING THE WEIRD CHROME BUG THAT CAUSES THE SECOND ELECTION DISTRICT UPDATE TO HANG.
    //DOESNT HANG ON THE FIRST OR THIRD THROUGH INFINITY. BUT ONLY THE SECOND UPDATE. WHY???
    var _isWebKit = navigator.userAgent.search(/webkit/i) > 0;

    Map.QueryVisualizer = function (options) {
        this.map = options.map;

        this.query = options.query;

        this.dataManager = new App.Entities.ContributionDataManager({
            baseUrl: options.config.baseUrl
        });

        //this.geoManager = _geographicDataManager = new App.Entities.GeographicDataManager({
        //    baseUrl: options.config.baseUrl,
        //    geographicDataFiles: options.config.geographicDataFiles
        //});
        this.geoManager = App.Entities.GeographicDataManager.getInstance();



        this.listenTo(this.query, 'change:candidate', this.onQueryChanged);
        this.listenTo(this.query, 'change:geography', this.onQueryChanged);
        //this.listenTo(this.query, 'change:electionPeriod', this.onQueryChanged);
        this.listenTo(this.query, 'change:amountType', this.onQueryChanged);
        this.listenTo(this.query, 'change:filingPeriod', this.onQueryChanged);

        this.dataBreak = App.Entities.DataBreakList.getByType(this.query.get('amountType'));
        this.contributionData = null;
        this.geoLayers = {};
        this.geoLayersFeatureCount = {};
        //THIS IS FOR FIXING THE WEIRD CHROME BUG THAT CAUSES THE SECOND ELECTION DISTRICT UPDATE TO HANG.
        //DOESNT HANG ON THE FIRST OR THIRD THROUGH INFINITY. BUT ONLY THE SECOND UPDATE. WHY???
        //this.geoLayersStyleUpdateCount = {};

        //this.infoTooltip = new Map.MapTooltip({ map: this.map, geographicDataFiles: options.config.geographicDataFiles });


        //this.infoWindow = new google.maps.InfoWindow({
        //    disableAutoPan: true,
        //    maxWidth: 200,
        //    pixelOffset: new google.maps.Size(0, -20),
        //    zIndex: 0
        //});
        //google.maps.event.addListener(this.infoWindow, 'domready', function () {

        //    // Reference to the DIV that wraps the bottom of infowindow
        //    var iwOuter = $('.gm-style-iw');
        //    var iwCloseBtn = iwOuter.next();

        //    iwCloseBtn.css({ display: 'none' });

        //});

        //this.atCursor =  document.createElement('div');
        //this.$atCursor = $(this.atCursor);
        //this.$atCursor.css({
        //    position: 'absolute',
        //    width: '50px',
        //    height: '35px',
        //    background: '#ff0000',
        //    zIndex: 1,
        //    cursor: 'pointer'
        //});
        //$('#map').append(this.$atCursor);

        $.when(this.updateData(), this.updateGeography()).done($.proxy(function (data, geo) {
            this.updateStyle();
            this.trigger('ready');
        }, this));
    };

    _.extend(Map.QueryVisualizer.prototype, Backbone.Events, {
        valueFunctions: {
            'pre': function (data, amountType) {
                var tot = data['prePrimTot'];
                var num = data['prePrimNum'];

                if (amountType === 'average') {
                    if (tot < 0 && num === 0) {
                        return tot;
                    } else {
                        return tot / num;
                    }
                } else if (amountType === 'number') {
                    return num;
                }
                else {
                    return tot;
                }
            },
            'post': function (data, amountType) {
                var tot = data['postPrimTot'];
                var num = data['postPrimNum'];

                if (amountType === 'average') {
                    return tot / num;
                } else if (amountType === 'number') {
                    return num;
                }
                else {
                    return tot;
                }
            },
            'combined': function (data, amountType) {
                var tot = data['prePrimTot'] + data['postPrimTot'];
                var num = data['prePrimNum'] + data['postPrimNum'];

                if (amountType === 'average') {
                    return tot / num;
                } else if (amountType === 'number') {
                    return num;
                }
                else {
                    return tot;
                }
            }
        },
        onQueryChanged: function (model, val, options) {

            this.trigger('query:changed');
            if (model.hasChanged('candidate')) {
                $.when(this.updateData(), this.updateGeography()).done($.proxy(function (data, geo) {
                    this.updateStyle();
                    if (this.selectedFeature) {
                        this.selectFeature(this.selectedFeature, this.geoLayers[this.query.get('geography')]);
                    }
                }, this));
            }
            if (model.hasChanged('geography')) {

                //_.each(this.geoLayersStyleUpdateCount, function (val, key) {
                //    this.geoLayersStyleUpdateCount[key] = 0;
                //}, this);

                var geoLayer = this.geoLayers[this.query.previous('geography')];
                this.unhighlightFeature(this.highlightedFeature, geoLayer);
                this.unselectFeature(this.selectedFeature, geoLayer);

                $.when(this.updateData(), this.updateGeography()).done($.proxy(function (data, geo) {
                    this.updateStyle();
                }, this));
            }
            if (model.hasChanged('filingPeriod')) {
                $.when(this.updateData(), this.updateGeography()).done($.proxy(function (data, geo) {
                    this.updateStyle();
                    if (this.selectedFeature) {
                        this.selectFeature(this.selectedFeature, this.geoLayers[this.query.get('geography')]);
                    }
                }, this));
            }
            if (model.hasChanged('amountType')) {
                this.dataBreak = App.Entities.DataBreakList.getByType(model.get('amountType'));
                this.updateStyle();
            }

        },
        updateGeography: function () {

            var geography = this.query.get('geography');
            if (!this.geoLayers[geography]) {

                return this.geoManager.getData(geography).then($.proxy(function (topoJson) {
                    var objectKey = _.keys(topoJson.objects)[0];
                    var geoj = topojson.feature(topoJson, topoJson.objects[objectKey]);
                    console.log(geoj)
                    this.geoLayersFeatureCount[geography] = geoj.features.length;
                    //this.geoLayersStyleUpdateCount[geography] = 0;
                    this.geoLayers[geography] = new google.maps.Data({ style: { fillOpacity: 0, strokeOpacity: 0 } });
                    this.geoLayers[geography].addGeoJson(
                        geoj
                    );



                    var self = this;

                    //var overlay = new google.maps.OverlayView();
                    //overlay.draw = function () { };
                    //overlay.setMap(this.map); // 'map' is new google.maps.Map(...)

                    //function test(e) {
                    //    self.infoTooltip.setPosition(e.latLng);
                    //    //self.infoWindow.setPosition(e.latLng);

                    //    //var t = self.map.getProjection().fromLatLngToPoint(e.latLng);

                    //    //var projection = overlay.getProjection();
                    //    //var pixel = projection.fromLatLngToContainerPixel(e.latLng);

                    //    ////self.$atCursor.offset({top: pixel.y, left: pixel.x})
                    //    //self.$atCursor.css({ top: pixel.y -55, left: pixel.x})
                    //}

                    //var thrott =_.throttle(test, 10)
                    ////this.geoLayers[geography].addListener('mousemove', function (e) {
                    ////    self.infoWindow.setPosition(e.latLng);


                    ////});
                    //this.geoLayers[geography].addListener('mousemove', test);



                    this.geoLayers[geography].addListener('mouseover', function (e) {
                        //self.infoTooltip.show(e.feature, geography);

                        self.highlightFeature(e.feature, this);

                    });



                    this.geoLayers[geography].addListener('mouseout', function (e) {
                        //self.infoTooltip.hide();
                        self.unhighlightFeature(e.feature, this);

                    });

                    this.geoLayers[geography].addListener('click', function (e) {
                        if (!self.selectedFeature || self.selectedFeature !== e.feature) {
                            self.selectFeature(e.feature, this);
                        } else {
                            self.unselectFeature(e.feature, this);
                            self.highlightFeature(e.feature, this);
                        }

                    });

                    return this.geoLayers[geography];
                }, this));

            } else {
                return $.Deferred().resolve(this.geoLayers[geography]);
            }

            //_.each(this.geoLayers, function (gMapsData) {
            //    gMapsData.setMap(null);
            //})
        },
        updateData: function () {
            var candidate = this.query.get('candidate');
            var geography = this.query.get('geography');
            var filingPeriod = this.query.get('filingPeriod');
            return this.dataManager.getData(candidate, geography, filingPeriod).then($.proxy(function (data) {
                this.contributionData = data;

            }, this));
        },
        updateStyle: function () {

            this.trigger('style:updating');

            var query = this.query;
            var breaks = this.dataBreak.get('breaks');
           
            // valueFunction = this.valueFunctions[this.query.get('electionPeriod')];
            var valueFunction = this.valueFunctions['pre'];
            //var calcAverage = (this.query.get('amountType') === 'average') ? true : false;
        
            var amountType = this.query.get('amountType');
            var geography = this.query.get('geography');
            var data = this.contributionData;

           
            var count = 0;
            var allRecords = this.geoLayersFeatureCount[geography];

           // console.log(allRecords)
            var self = this;
            var styleFunction = function (feature) {
                   
                count += 1;
                if (count === allRecords) {
                    self.trigger('style:updated');
                }
                //document.title = count;
                //return { fillColor: '#ff0000', fillOpcaity: 1 }


                var fillColor;
                var fillOpacity = 1;
                var strokeOpacity = 0.7;

                var id = feature.getId();
                if (!id) {
                    id = feature.getProperty('id')
                }
             //  console.log(id)
                var prop = data[id];
                //console.log(prop)
                //var val = prop ? prop.totalPre + prop.totalPost : 0;
                if (!prop) {
                    return {
                        fillColor: 'rgb(211,211,211)',
                        fillOpacity: 0.3,
                        strokeOpacity: 0,
                        strokeColor: '#ffffff',
                        strokeWeight: 0.5
                    };
                }
                var val = valueFunction(prop, amountType);
                //console.log(val)
                var len = breaks.length;
                if (val === 0) {
                    fillColor = 'rgb(211,211,211)';
                    fillOpacity = 0.3;
                    strokeOpacity = 0;
                } else {
                    for (var i = 0; i < len; i++) {
                        if (val >= breaks[i].min && val <= breaks[i].max) {
                            fillColor = breaks[i].color;
                            break;
                        }
                    }
                }




                return {
                    fillColor: fillColor,
                    fillOpacity: fillOpacity,
                    strokeColor: '#ffffff',
                    strokeWeight: 0.5,
                    strokeOpacity: strokeOpacity
                };
            };





            //this.geoLayers[geography].revertStyle();

            ////alert('start')
            //var counter = 0;;
            //var self = this;
            //this.geoLayers[geography].forEach(function (feature) {

            //    counter += 1;
            //    if (counter === allRecords) {
            //        self.trigger('style:updated');
            //    //    alert('end');
            //    }

            //    self.geoLayers[geography].overrideStyle(feature, style)

            //})

            //this.geoLayersStyleUpdateCount[geography] += 1;
            //if (this.geoLayersStyleUpdateCount[geography] === 2) {
            //    this.geoLayers[geography].setMap(null);
            //}



            if (_isWebKit && allRecords > 2000) {
                self.geoLayers[geography].setMap(null);
            }

            self.geoLayers[geography].setStyle(styleFunction);


            //this.geoLayers[geography].setMap(this.map);

            _.each(this.geoLayers, function (gMapsData, key) {
                //if (key !== geography && gMapsData.getMap() || key == 'electiondistricts') {//Election districts has an initial weird hang bug in chrome. This fixes it.
                if (key !== geography && gMapsData.getMap()) {
                    gMapsData.setMap(null);
                }
            }, this);
            if (!this.geoLayers[geography].getMap()) {
                this.geoLayers[geography].setMap(this.map);
            }


            //alert('triggered');
            //this.trigger('style:updated');


        },
        show: function (query) {
           
            var candidate = query.get('candidate');
            var geography = query.get('geography');
            var self = this;
            $.when(this.dataManager.getData(candidate, geography), this.geoManager.getData(geography)).done(function (data, geo) {

                _.each(self.dataLayers, function (gMapsData) {
                    gMapsData.setMap(null);
                });

                if (!self.dataLayers[geography]) {
                    var objectKey = _.keys(geo.objects)[0];
                    var geoj = topojson.feature(geo, geo.objects[objectKey]);
                    console.log(geoj)
                    self.dataLayers[geography] = new google.maps.Data();
                    self.dataLayers[geography].addGeoJson(
                        geoj
                    );
                }

                var dataBreak = App.Entities.DataBreakList.getByType(query.get('amountType'));
                var breaks = dataBreak.get('breaks');

                var styleFunction = function (feature) {
                   // console.log(feature)
                    var id = feature.getId();
                    if (!id) {
                        id = feature.getProperty('id')
                    }
                    var prop = data[id];
                    var val = prop ? prop.totalPre + prop.totalPost : 0;

                    var fillColor;
                    var fillOpacity = 1;
                    var strokeOpacity = 0.7;


                    var len = breaks.length;
                    if (val === 0) {
                        fillColor = 'rgb(211,211,211)';
                        fillOpacity = 0.3;
                        strokeOpacity = 0;
                    } else {
                        for (var i = 0; i < len; i++) {
                            if (val >= breaks[i].min && val <= breaks[i].max) {
                                fillColor = breaks[i].color;
                                break;
                            }
                        }
                    }

                    return {
                        fillColor: fillColor,
                        fillOpacity: fillOpacity,
                        strokeColor: '#ffffff',
                        strokeWeight: 0.5,
                        strokeOpacity: strokeOpacity
                    };
                };
                self.dataLayers[geography].setStyle(styleFunction);
                self.dataLayers[geography].setMap(self.map);


                //self.map.data.addGeoJson(
                //    geoJson, {
                //        idPropertyName: self.idPropertyName
                //    }
                //);
            });
        },
        processPoints: function (geometry, callback, thisArg) {
            if (geometry instanceof google.maps.LatLng) {
                callback.call(thisArg, geometry);
            } else if (geometry instanceof google.maps.Data.Point) {
                callback.call(thisArg, geometry.get());
            } else {
                geometry.getArray().forEach(function (g) {
                    this.processPoints(g, callback, thisArg);
                }, this);
            }
        },
        getPolygonBounds: function (poly) {
            var bounds = new google.maps.LatLngBounds();
            this.processPoints(poly.getGeometry(), bounds.extend, bounds);
            return bounds;

        },
        findFeature: function (id, geography) {
            var geoData = this.geoLayers[geography];
            var feature = geoData.getFeatureById(id);

            if (feature) {
                this.selectFeature(feature, geoData);
                var bounds = this.getPolygonBounds(feature);
                this.map.panToBounds(bounds);
                this.map.fitBounds(bounds);
                this.map.setZoom(this.map.getZoom() - 1);
            }


        },

        selectFeature: function (feature, geoLayer) {
            this.selectedFeature = feature;

            geoLayer.revertStyle();
            geoLayer.overrideStyle(feature, {
                strokeColor: '#dd00dd',
                strokeOpacity: 0.7,
                strokeWeight: 4,
                zIndex: 2
            });

            var eventData = this.eventData(feature);
            this.trigger('selected', eventData);
        },
        unselectFeature: function (feature, geoLayer) {

            if (!feature) { return; }

            geoLayer.revertStyle();

            this.selectedFeature = null;
            this.trigger('unselected', feature);
        },
        highlightFeature: function (feature, geoLayer) {

            this.highlightedFeature = feature;

            if (!this.selectedFeature) {
                geoLayer.overrideStyle(feature, {
                    strokeColor: '#000000',
                    strokeOpacity: 0.7,
                    strokeWeight: 3,
                    zIndex: 2
                });


                var eventData = this.eventData(feature);

                this.trigger('highlighted', eventData);

            } else if (feature.getId() !== this.selectedFeature.getId()) {
                geoLayer.overrideStyle(feature, {
                    strokeColor: '#707070',
                    strokeOpacity: 0.7,
                    strokeWeight: 3,
                    zIndex: 2
                });
            }


            //this.trigger('highlighted', this.highlightedFeature);
            //this.trigger('mouseover', { geography: geography, data: data });

        },
        unhighlightFeature: function (feature, geoLayer) {

            if (!feature) { return; }

            if (!this.selectedFeature || feature.getId() !== this.selectedFeature.getId()) {
                geoLayer.revertStyle(this.highlightedFeature);
            }

            if (!this.selectedFeature) {
                this.trigger('unhighlighted', feature);
            }

            this.highlightedFeature = null;

            //this.trigger('mouseout');
        },
        eventData: function (feature) {
            var id = feature.getId();
            var name = feature.getProperty('NTAName');

            var attr = this.contributionData[id] ||
            {
                id: id,
                prePrimTot: 0,
                postPrimTot: 0,
                prePrimNum: 0,
                postPrimNum: 0
            };
            var data = _.extend({ name: name }, attr);
            //var geography = this.query.get('geography');

            return { query: this.query, data: data };
        }
    });


});