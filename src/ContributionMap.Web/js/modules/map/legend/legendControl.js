ContributionMap.module('Map.Legend', function (Legend, App, Backbone, Marionette, $, _) {

    Legend.LegendControl = function (options) {

        this.baseDiv = document.createElement('div');
        this.$baseDiv = $(this.baseDiv);

        this.legendView = null;

        this.geographicDataLegendTemplates = {};

        _.each(_.keys(options.geographicDataFiles), function (key, i) {
            this.geographicDataLegendTemplates[key] = _.template(options.geographicDataFiles[key].legendTemplate);
        }, this)

    };

    _.extend(Legend.LegendControl.prototype, {

        setMap: function (map, position) {

            //var t = map.controls[position].getAt(0);
            map.controls[position].push(this.baseDiv);
        },

        showLegend: function (query) {

            //var dataBreak = App.request('databreak:bygeography', query.geography.id);
            //var dataBreak = App.request('databreak:bytype', query.dataType.id);
            var dataBreak = App.Entities.DataBreakList.getByType(query.get('amountType'));

            this.legendView = new Legend.LegendView({
                model: dataBreak,
                collection: new Backbone.Collection(
                    dataBreak.get('breaks')
                )
            });

            this.$baseDiv.html(this.legendView.render().el);

            this.showOffice(query);

        },
        showOffice: function (query) {
            var office = query.get('office');
            if (office.indexOf('City Council') > -1) {
                var id = office.split(' ')[2];
                var text = this.geographicDataLegendTemplates['citycouncildistricts']({ id: id});
                this.legendView.showCityCouncilLegendItem(text);
            } else {
                this.legendView.showCityCouncilLegendItem(null);
            }
        },
        showSelected: function (e) {
            if (e) {
                var data = e.data;
                var query = e.query;
                var text = this.geographicDataLegendTemplates[query.get('geography')]({ id: data['id'], name: data['name'] });
                this.legendView.showSelectedDistrictLegendItem(text);
            } else {
                this.legendView.showSelectedDistrictLegendItem(null);
            }
           


        }

    });


});