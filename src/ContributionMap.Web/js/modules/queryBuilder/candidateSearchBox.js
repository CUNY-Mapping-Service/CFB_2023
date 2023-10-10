ContributionMap.module('QueryBuilder', function (QueryBuilder, App, Backbone, Marionette, $, _) {

    QueryBuilder.CandidateSearchBox = function (options) {

        this.txtBox = $('#txtCandidateSearch');
        this.query = options.query;
        this.datum = null;
        
        this.bh = new Bloodhound({
            //datumTokenizer: Bloodhound.tokenizers.nonword,
            datumTokenizer: function (datum) {
                var name = datum.name;
                var tokens = [name].concat(Bloodhound.tokenizers.nonword(name));

                for (var i = 1, l = name.length; i < l; i++) {
                    var char = name.charAt(i);

                    if ($.trim(char) !== ''
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

        this.txtBox.typeahead({
            hint: false,
            highlight: true,
            minLength: 1

        },{
            //name: 'states',
            source: this.bh,
            limit: 10,
            display: 'name'
        });



        var self = this;
        this.txtBox.on('typeahead:selected', function (e, item, dsName) {
            self.query.set({'office': item.office, 'candidate': item.id});
            //self.query.set('candidate', item.id);
        });

        
        this.txtBox.on('focus', function(e){
            if (self.datum === null) {
               
                App.Entities.CandidateList.getAll().then(function (candidates) {

                    self.datum = candidates.map(function (obj) {
                        var id, name;
                        id = obj.id + '';
                        office = obj.get('officeName'),
                        name = obj.get('name') + ' - ' + obj.get('officeName');
                        return { id: id, name: name, office: office }

                    });

                    self.bh.clear();
                    self.bh.local = self.datum;
                    self.bh.initialize(true);
                  
                });
            }

        });

    };

    _.extend(QueryBuilder.CandidateSearchBox.prototype, Backbone.Events, {


    });



    


    

});
