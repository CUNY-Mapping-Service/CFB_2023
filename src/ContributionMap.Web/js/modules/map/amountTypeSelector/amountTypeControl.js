ContributionMap.module('Map.AmountTypeSelector', function (AmountTypeSelector, App, Backbone, Marionette, $, _) {

    AmountTypeSelector.AmountTypeControl = function (options) {

        this.baseDiv = document.createElement('div');
        this.$baseDiv = $(this.baseDiv);
        
    };

    _.extend(AmountTypeSelector.AmountTypeControl.prototype, {

        setMap: function (map, position) {
            this.map = map;
            map.controls[position].push(this.baseDiv);
    
        },
        show: function (query) {
            var view = new AmountTypeSelector.AmountTypeView({ model: query });
            view.render();
            this.$baseDiv.html(view.el);
            
        }
    });

        

});