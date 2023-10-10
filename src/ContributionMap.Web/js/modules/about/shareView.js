ContributionMap.module("About", function (Module, App, Backbone, Marionette, $, _) {

    Module.ShareWindow = Backbone.View.extend({
        el: $('#shareModal'),

        initialize: function (model, options) {

            var _baseUrl = options.baseUrl;

            var self = this;
            this.$el.on('show.bs.modal', function (e) {
                var t = self.tabs.find('#shareTab');
                t.tab('show');
            });


            this.tabs = $('#shareTabs');
            this.tabs.bind('show.bs.tab', function (e) {
                //var tabs = $(this);
                var tab = $(e.target);
                var tabContent = $(tab.attr('href'));
                var url = _baseUrl + tabContent.attr('data-html');

                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    cache: false,
                    success: function (html) {
                        var body = html.replace(/^[\S\s]*<body[^>]*?>/i, "").replace(/<\/body[\S\s]*$/i, "");
                        tabContent.html(body);
                        tab.tab();
                    }
                });
            });
            this.render();
        },

        render: function () {
            return this;
        },

        showWin: function (tab) {
            this.$el.modal('show');

            var t = this.tabs.find(tab);
            t.tab('show');
        }
    });


    App.on('start', function (config) {
        var share = new Module.ShareWindow(null, {baseUrl: config.baseUrl});
    });




});
