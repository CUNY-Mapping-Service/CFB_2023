ContributionMap.module('Map.Search', function (Search, App, Backbone, Marionette, $, _) {

    Search.SearchControl = function (options) {

        this.baseDiv = document.createElement('div');
        this.baseDiv.className = 'search-control';
        this.baseDiv.style.zIndex = 1;

        this.title = document.createElement('label');
        //this.title.style.display = 'block';
        //this.title.style.marginBottom = '1px';
        $(this.title).text('Search By...');
        this.baseDiv.appendChild(this.title);

        this.input = document.createElement('input');
        this.input.type = 'text';

        //this.input.placeholder = 'enter zipcode...';
        this.input.className = 'form-control';

        this.baseDiv.appendChild(this.input);

        //this.$baseDiv = $(this.baseDiv);

        this.geoLabelsForTitle = {};
        
        _.each(_.keys(options.config.geographicDataFiles), function (key, i) {
            this.geoLabelsForTitle[key] = options.config.geographicDataFiles[key].label;
        }, this);

        this.geoManager = App.Entities.GeographicDataManager.getInstance();
        

        this.bh = new Bloodhound({
            //datumTokenizer: Bloodhound.tokenizers.nonword,
            datumTokenizer: function (datum) {
               
                var name = datum.name;
                var tokens = [name].concat(Bloodhound.tokenizers.nonword(name));

                for(var i = 1, l = name.length; i < l; i++) {
                    var char = name.charAt(i);

                    if($.trim(char) !== ''
                      && char === char.toUpperCase()) {
                        tokens.push(name.slice(i));
                    }
                }

                return tokens;
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            // `states` is an array of state names defined in "The Basics"
            local: [],
            sorter: function (a, b) {
                var alc = a.name.toLowerCase();
                var blc = b.name.toLowerCase();
                if (alc < blc) return -1;
                if (alc > blc) return 1;
                return 0;
            }
        });

        $(this.input).typeahead({
            hint: false,
            highlight: true,
            minLength: 1
            
        },
        {
            //name: 'states',
            source: this.bh,
            limit: 10,
            display:'name'
        });


        var self = this;
        $(this.input).on('typeahead:selected', function (e, item, dsName) {
            
            self.trigger('selected', { item: item.id, geography: self.query.get('geography') });
        });
    };

    _.extend(Search.SearchControl.prototype, Backbone.Events, {

        setMap: function (map, position) {
            
            map.controls[position].push(this.baseDiv);
        },
        setQuery: function (query) {

            this.query = query;
            this.query.on('change:geography', this.onQueryGeographyChanged, this);

            this.onQueryGeographyChanged(query, query.get('geography'));

        },

        setTitle: function (geography) {

            $(this.title).text('Search By ' + this.geoLabelsForTitle[geography]);
        },
        onQueryGeographyChanged: function (query, geography) {
            
            this.setTitle(geography);
            $(this.input).val('');
            $(this.input).typeahead('val', '');
            this.geoManager.getData(geography).then($.proxy(function (data) {
                var objectKey = _.keys(data.objects)[0];
                var objs = data.objects[objectKey].geometries;

                var datum = _.map(objs, function (obj) {
                    var id, name;
                    id = obj.id + '';
                    name = (obj.properties) ? obj.properties.NTAName || id : id;
                    return {id: id, name: name}

                    
                });


                //var states = new Bloodhound({
                //    datumTokenizer: Bloodhound.tokenizers.whitespace,
                //    queryTokenizer: Bloodhound.tokenizers.whitespace,
                //    // `states` is an array of state names defined in "The Basics"
                //    local: ids
                //});
                this.bh.clear();
                this.bh.local = datum;
                this.bh.initialize(true);
               

            }, this));
        }

    });

});