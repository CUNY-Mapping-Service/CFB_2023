ContributionMap.module('Map.Identify', function (Identify, App, Backbone, Marionette, $, _) {

    Identify.IdentifyControl = function (options) {

        this.baseDiv = document.createElement('div');
        this.$baseDiv = $(this.baseDiv);

        this.geographicDataTitleTemplates = {};

        _.each(_.keys(options.geographicDataFiles), function (key, i) {
            this.geographicDataTitleTemplates[key] = _.template(options.geographicDataFiles[key].hoverTitleTemplate);
        }, this)
    };

    _.extend(Identify.IdentifyControl.prototype, {

        setMap: function (map, position) {
            this.map = map;
            map.controls[position].push(this.baseDiv);

        },

        setCandidate: function(candidate){
            this.candidate = candidate;

            this.show(this.item, this.candidate);

        },
        setFeatureData: function(item){
            this.item = item;

            this.show(this.item, this.candidate);
        },
        show: function (item, candidate) {
            //var t = this.candidate;
            //this.item = item;
           
            if (item) {
               
                var geographyType = item.query.get('geography');
                var data = item.data;

                var nyccfbSearchPageLink;
                var showCfbLink = false;
                if (geographyType == 'zipcodes' && candidate) {
                    showCfbLink = true;
                    nyccfbSearchPageLink = App.Map.getNyccfbSearchPageLink({
                        query: item.query,
                        candidate: candidate,
                        zipCode: item.data
                    });
                }
               
                console.log(item)
               
                var view = new Identify.IdentifyView({
                    data: {
                        featureLabel: this.geographicDataTitleTemplates[geographyType]({ id: data['id'], name: data['name'] }),
                        totalPre: data['prePrimTot'],
                        totalPost: data['postPrimTot'],
                        numberPre: data['prePrimNum'],
                        numberPost: data['postPrimNum'],
                        showCfbLink: showCfbLink,
                        nyccfbSearchPageLink: nyccfbSearchPageLink
                    }
                });

                this.$baseDiv.html(view.render().el);
            } else {
                this.$baseDiv.html('');
            }
           
        }


    });


});