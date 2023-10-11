ContributionMap.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {



    Entities.GeographicDataManager = function (options) {

        this.baseUrl = options.baseUrl;
        this.geographicDataFiles = options.geographicDataFiles;
        this.geoJsonData = {};


    };
    _.extend(Entities.GeographicDataManager.prototype, Backbone.Events, {
        getData: function (geographyType) {
           // console.log(geographyType)
            if (!this.geoJsonData[geographyType]) {
            this.geoJsonData[geographyType] = this.fetchGeoJson(this.geographicDataFiles[geographyType].url).then(function (data) {
                   // console.log(data)
                if (data.objects[geographyType]) {
                 //   console.log(data.objects[geographyType])
                        if (data.objects[geographyType].geometries) {
                            var geos = data.objects[geographyType].geometries;
                            for (var i = 0; i < geos.length; i++) {
                                if (geos[i].properties.id) {
                                   // console.log(geos[i].properties)
                                    geos[i].id = geos[i].properties.id//.toString()
                                   // console.log(geos[i])
                                }
                               // || geos[i].id;
                            }
                        }
                    }
                   // console.log(data)
                    return data;
                });
            }

            return this.geoJsonData[geographyType];
        },
        fetchGeoJson: function (url) {
            var url = this.baseUrl + url;
            return $.ajax({
                dataType: "json",
                url: url,
                context: this

            });
        }
    });


    var _geoManager;
    Entities.on('start', function (config) {
        _geoManager = _geographicDataManager = new Entities.GeographicDataManager({
            baseUrl: config.baseUrl,
            geographicDataFiles: config.geographicDataFiles
        });
    });
    Entities.GeographicDataManager.getInstance = function () {
        return _geoManager;
    };


    ////ON APPLICATION START
    //var _geographicDataManager
    //Entities.on('start', function (options) {
    //    _geographicDataManager = new Entities.GeographicDataManager({


    //    })

    //});



    ////STATIC METHODS
    //var _geographicData = {};
    //Entities.GeographicDataManager.getData = function (type) {
    //    var data = null;
    //    if (officeId) {
    //        data = { race: officeId }
    //    }

    //    if (!_candidatesByOffice[officeId]) {
    //       _candidatesByOffice[officeId] = new Entities.CandidateList().fetch({
    //            data: data
    //        }).then(function (data) {

    //            return new Entities.CandidateList(data);
    //        })
    //    }

    //    return _candidatesByOffice[officeId]
    //}


});