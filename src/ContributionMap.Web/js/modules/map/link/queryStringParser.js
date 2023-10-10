ContributionMap.module('Map.Link', function (Link, App, Backbone, Marionette, $, _) {

    Link.QueryStringParser = function () {
        this.queryString = this.parseQueryString(App.module('QueryBuilder').parentSearch || window.location.search);
        return this;
    };

    _.extend(Link.QueryStringParser.prototype, {
        parseQueryString: function (qs) {
            
            if(qs == "") return {};
            var a = qs.split('?')[1].split('&');//.toLowerCase()
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=');
                if (p.length != 2) continue;
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        }

    });
    


});