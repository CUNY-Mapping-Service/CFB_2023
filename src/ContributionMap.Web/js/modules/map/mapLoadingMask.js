ContributionMap.module('Map', function (Map, App, Backbone, Marionette, $, _) {




    Map.LoadingMask = function () {

        this.maskDiv = $('.loading-mask');

        this.loadingView = new App.Common.LoadingView({
            title: ' ',
            message: ' '
        });

        this.maskDiv.append(this.loadingView.render().el);
        this.loadingView.startSpinning();

        this.showBusy(false);
    };

    _.extend(Map.LoadingMask.prototype, {

        showBusy: function (busy) {
            if (busy) {
                this.maskDiv.css({ 'display': 'block' });
            } else {
                this.maskDiv.css({ 'display': 'none' });
            }
        }

    });

  

});