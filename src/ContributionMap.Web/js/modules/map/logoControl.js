ContributionMap.module('Map', function (Map, App, Backbone, Marionette, $, _) {

    Map.LogoControl = function (options) {

        this.baseDiv = document.createElement('div');
        this.$baseDiv = $(this.baseDiv);

        var template = _.template($('#logo-control').html());
        this.$baseDiv.html(template());

       

    };

    _.extend(Map.LogoControl.prototype, {

        setMap: function (map, position) {
            map.controls[position].push(this.baseDiv);
        }
    });
});