ContributionMapConfig = function (options) {

    var _baseUrl = options.baseUrl;
    var _parentUrl = options.parentUrl;
    var config = {
        baseUrl: _baseUrl,
        parentUrl: _parentUrl || null,
        mapConfig: {
            initialExtent: {
                ////MANHATTAN
                //lowerLeft: [40.5159961, -74.2390879],
                //upperRight: [40.8952556, -73.6202721]
                //MANHATTAN - SHIFTED TO THE RIGHT
                lowerLeft: [40.5159961, -74.2090879],
                upperRight: [40.8952556, -73.5902721]
            },

            baseMapStyles: [
                { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
                //{ featureType: "transit", elementType:"all", stylers: [{visibility:"simplified"}]}, 
                //// { featureType: "transit.station", elementType:"labels", stylers:[{visibility:"off"}]},
                { featureType: "all", elementType: "all", stylers: [{ lightness: 40 }, { gamma: 0.8 }, { saturation: -95 }] },
                //{ featureType: "all", elementType: "all", stylers: [ { lightness: 43 }, { gamma: 0.8 }, { saturation: -91 } ] },
                { featureType: "road.local", elementType: "geometry", stylers: [{ saturation: -73 }, { lightness: 33 }, { gamma: 0.8 }, { visibility: "simplified" }] },
                { featureType: "road.arterial", elementType: "geometry", stylers: [{ saturation: -91 }, { gamma: 0.8 }, { visibility: "simplified" }, { lightness: 100 }] },
                { featureType: "road.arterial", elementType: "labels.text", stylers: [{ visibility: "on" }, { weight: 0.1 }] },
                { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "simplified" }] },
                { featureType: "road.highway", elementType: "geometry", stylers: [{ visibility: "simplified" }, { saturation: -91 }, { gamma: 0.8 }, { lightness: 94 }] },
                { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "on" }, { weight: 0.1 }] }

                //{ featureType: "landscape.man_made", elementType: "geometry", stylers: [ { visibility: "simplified" }, { gamma: 0.76 } ] } // turn off 3d buildings
            ]
        },

        geographicDataFiles: {
            'citycouncildistricts': { label: 'City Council District', url: 'geography/nycc.topojson.js', idPropertyName: 'CounDist', hoverTitleTemplate: 'City Council District <%= id %>', legendTemplate: 'City Council District <%= id %>' },
            'electiondistricts': { label: 'Election District', url: 'geography/nyed.topojson.js', idPropertyName: 'ElectDist', hoverTitleTemplate: 'Election District <%= parseInt(id.toString().substring(2,5)) %> in Assembly District <%= id.toString().substring(0,2) %> ', legendTemplate: 'Election District <%= id %>' },
            'neighborhoods': { label: 'Neighborhood', url: 'geography/nynta.topojson.js', idPropertyName: 'NTACode', namePropertyName: 'NTAName', hoverTitleTemplate: 'the <%= name %> neighborhood area (<%= id %>)', legendTemplate: 'Neighborhood Area <%= id %>' },
            'nysassemblydistricts': { label: 'New York State Assembly District', url: 'geography/nyad.topojson.js', idPropertyName: 'AssmDist', hoverTitleTemplate: 'New York State Assembly District <%= id %>', legendTemplate: 'New York State AD <%= id %>' },
            'nycommboarddistricts': { label: 'New York City Community Board', url: 'geography/nycd.topojson.js', idPropertyName: 'commboard', hoverTitleTemplate: 'New York City Community Board <%= id %>', legendTemplate: 'New York City CB <%= id %>' },
            'zipcodes': { label: 'ZIP Code', url: 'geography/NYCZIPCODESESRI2019.topojson.js', idPropertyName: 'ZIPCODE', hoverTitleTemplate: 'ZIP Code <%= id %>', legendTemplate: 'ZIP Code <%= id %>' }
        },

        colorSchemes: {
            //'red5': [
            //    'rgb(254, 217, 118)',
            //    'rgb(253, 141, 60)',
            //    'rgb(252, 78, 42)',
            //    'rgb(227, 26, 28)',
            //    'rgb(177, 0, 38)'
            //],
            'redAlphaBlack': [
                'rgba(255, 255, 255, 0.8)',
                'rgba(255, 255, 179, 0.8)',
                'rgba(255, 218, 117, 0.8)',
                'rgba(252, 141, 61, 0.8)',
                'rgba(252, 78, 43, 0.8)',
                'rgba(189, 0, 38, 0.8)',
                'rgba(128, 0, 38, 0.8)',
                'rgba(60, 0, 38, 0.8)',
                'rgba(26, 0, 16, 0.8)'
            ],
            'redAlpha8': [
                //SR: USE WHITE FOR NEGATIVE AMOUNT
                'rgba(255, 255, 255, 0.8)',
                'rgba(255, 255, 179, 0.8)',
                'rgba(255, 218, 117, 0.8)',
                'rgba(252, 141, 61, 0.8)',
                'rgba(252, 78, 43, 0.8)',
                'rgba(189, 0, 38, 0.8)',
                'rgba(128, 0, 38, 0.8)',
                'rgba(60, 0, 38, 0.8)'
            ],
            //'redAlpha8': [
            //   'rgba(255, 255, 255, 0.8)',
            //   'rgba(255, 255, 179, 0.8)',
            //   'rgba(255, 218, 117, 0.8)',
            //   'rgba(252, 141, 61, 0.8)',
            //   'rgba(252, 78, 43, 0.8)',
            //   'rgba(189, 0, 38, 0.8)',
            //   'rgba(128, 0, 38, 0.8)',
            //   'rgba(60, 0, 38, 0.8)'
            //],
            //'red': [
            //   'rgb(255, 255, 255)',
            //   'rgb(255, 255, 179)',
            //   'rgb(255, 218, 117)',
            //   'rgb(252, 141, 61)',
            //   'rgb(252, 78, 43)',
            //   'rgb(189, 0, 38)',
            //   'rgb(128, 0, 38)',
            //   'rgb(60, 0, 38)'
            //],
            //'greenblueInverse': [
            //   'rgb(0,68,27)',
            //   'rgb(0,110,44)',
            //   'rgb(65,171,93)',
            //   'rgb(116,196,118)',
            //   'rgb(199,233,192)',
            //   'rgb(229,245,224)',
            //   'rgb(255, 255, 255)'
            //],
            //'greenblue': [
            //    'rgb(255, 255, 255)',
            //    'rgb(229,245,224)',
            //    'rgb(199,233,192)',
            //    'rgb(116,196,118)',
            //    'rgb(65,171,93)',
            //    'rgb(0,110,44)',
            //    'rgb(0,68,27)',
            //],
            'greenAlphaBlack': [
                'rgba(255, 255, 255, 0.8)',
                'rgba(229,245,224, 0.8)',
                'rgba(199,233,192, 0.8)',
                'rgba(116,196,118, 0.8)',
                'rgba(65,171,93, 0.8)',
                'rgba(35,139,69, 0.8)',
                'rgba(0,109,44, 0.8)',
                'rgba(0, 69, 28, 0.8)',
                'rgba(0,40,0, 0.8)'
            ],
            'greenAlphaYellowBlack': [
                //SR: USE WHITE FOR NEGATIVE AMOUNT
                'rgba(255, 255, 255, 0.8)',
                //'rgba(247,252,185, 0.8)',
                'rgba(217,240,163, 0.8)',
                'rgba(173,221,142, 0.8)',
                'rgba(120,198,121, 0.8)',
                'rgba(65,171,93, 0.8)',
                'rgba(35,132,67, 0.8)',
                'rgba(0,104,55, 0.8)',
                'rgba(0,69,41, 0.8)',
                'rgba(0,30,0, 0.8)'
            ],
            'blueAlpha': [
                'rgba(247,251,255, 0.8)',
                'rgba(222,235,247, 0.8)',
                'rgba(198,219,239, 0.8)',
                'rgba(158,202,225, 0.8)',
                'rgba(107,174,214, 0.8)',
                'rgba(66,146,198, 0.8)',
                'rgba(33,113,181, 0.8)',
                'rgba(8,81,156, 0.8)',
                'rgba(8,48,107, 0.8)'
                //'rgba(255, 255, 255, 0.8)',
                //'rgba(239,243,255, 0.8)',
                //'rgba(198,219,239, 0.8)',
                //'rgba(158,202,225, 0.8)',
                //'rgba(107,174,214, 0.8)',
                //'rgba(66,146,198, 0.8)',
                //'rgba(33,113,181, 0.8)',
                //'rgba(8,69,148, 0.8)',
                //'rgba(12,44,132, 0.8)'
            ]

        },



        dataBreaks: {
            totalDefault: {
                type: 'total',
                colorScheme: 'greenAlphaYellowBlack',
                breaks: [
                    //SR EDIT: FOR NEGATIVE AMOUNT
                    //{ min: 0, max: 100 },
                    { min: -10000000, max: 100 },
                    { min: 100, max: 500 },
                    { min: 500, max: 1000 },
                    { min: 1000, max: 5000 },
                    { min: 5000, max: 10000 },
                    { min: 10000, max: 25000 },
                    { min: 25000, max: 100000 },
                    { min: 100000, max: 1000000 },
                    { min: 1000000, max: Infinity }
                ]
            },
            countDefault: {
                type: 'number',
                colorScheme: 'blueAlpha',
                breaks: [
                    { min: 1, max: 2 },
                    //{ min: 2, max: 3 },
                    { min: 2, max: 5 },
                    { min: 5, max: 10 },
                    { min: 10, max: 25 },
                    { min: 25, max: 50 },
                    { min: 50, max: 100 },
                    { min: 100, max: 200 },
                    { min: 200, max: 500 },
                    //{ min: 400, max: 600 },
                    { min: 500, max: Infinity }
                ]
            },
            averageDefault: {
                type: 'average',
                colorScheme: 'redAlpha8',
                breaks: [
                    //SR EDIT: FOR NEGATIVE AMOUNT
                    { min: -10000000, max: 25 },
                    //{ min: 1, max: 25 },
                    { min: 25, max: 50 },
                    { min: 50, max: 100 },
                    { min: 100, max: 250 },
                    { min: 250, max: 500 },
                    { min: 500, max: 1000 },
                    { min: 1000, max: 2500 },
                    { min: 2500, max: Infinity }

                ]
            }

        }




        //        dataBreaks: {
        //        totalDefault: {
        //        type: 'total',
        //        colorScheme : 'redAlpha',
        //    breaks: [
        //        { min: 1, max: 100 },
        //        { min: 100.01, max: 500 },
        //        { min: 500.01, max: 1000 },
        //        { min: 1000.01, max: 5000 },
        //        { min: 5000.01, max: 10000 },
        //        { min: 10000.01, max: 25000 },
        //        { min: 25000.01, max: 100000 },
        //        { min: 100000.01, max: Infinity }
        //    ]
        //},



        //dataBreaks: [{
        //    geography: 'zipcodes',
        //    type: 'total',
        //    colorScheme: 'red',
        //    breaks: [
        //        { min: 0.01, max: 500 },
        //        { min: 500.01, max: 1000 },
        //        { min: 1000.01, max: 2500 },
        //        { min: 2500.01, max: 10000 },
        //        { min: 10000.01, max: Infinity }
        //    ]

        //}, {
        //    geography: 'neighborhoods',
        //    type: 'total',
        //    colorScheme: 'red',
        //    breaks: [
        //       { min: 0.01, max: 500 },
        //        { min: 500.01, max: 1000 },
        //        { min: 1000.01, max: 2500 },
        //        { min: 2500.01, max: 10000 },
        //        { min: 10000.01, max: Infinity }
        //    ]

        //},{
        //    geography: 'citycouncildistricts',
        //    type: 'total',
        //    colorScheme: 'red',
        //    breaks: [
        //        { min: 0.01, max: 500 },
        //        { min: 500.01, max: 1000 },
        //        { min: 1000.01, max: 2500 },
        //        { min: 2500.01, max: 10000 },
        //        { min: 10000.01, max: Infinity }
        //    ]

        //},{
        //    geography: 'electiondistricts',
        //    type: 'total',
        //    colorScheme: 'red',
        //    breaks: [
        //        { min: 0.01, max: 500 },
        //        { min: 500.01, max: 1000 },
        //        { min: 1000.01, max: 2500 },
        //        { min: 2500.01, max: 10000 },
        //        { min: 10000.01, max: Infinity }
        //    ]

        //}]

    };

    return config;

};