ContributionMap.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    var _colorSchemes;
    var _dataBreakList;


    Entities.DataBreak = Backbone.Model.extend({


    });

    Entities.DataBreakList = Backbone.Collection.extend({
        model: Entities.DataBreak

    });


    Entities.DataBreakList.getByType = function (type) {
        return _dataBreakList.find(function (db) {
            return db.get('type') === type;
        });
    }
    Entities.on('start', function (config) {
        
        _colorSchemes = config.colorSchemes;

        _dataBreakList = new Entities.DataBreakList();

        var dbConfig = config.dataBreaks;

        for (var key in dbConfig) {

            _dataBreakList.add(
                _.extend(dbConfig[key], { name: key })
            );

        }

        _dataBreakList.each(function (db) {
            var breaks = db.get('breaks');
            var colors = _colorSchemes[db.get('colorScheme')];

            for (var i = 0, len = breaks.length; i < len; i++) {
                breaks[i]['color'] = colors[i];
            }

        });
    });

});