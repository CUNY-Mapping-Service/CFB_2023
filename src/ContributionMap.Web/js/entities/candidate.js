ContributionMap.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    var _url = 'api/candidates';
    Entities.on('start', function (options) {
        _url = options.baseUrl + _url;
    });

    Entities.Candidate = Backbone.Model.extend({
        defaults: {
            totalContributionAmount : 0,
            totalNumberOfContributions : 0,
            totalFromInsideNyc : 0,
            totalFromOutsideNyc : 0,
            lessThanOrEqualTo250 : 0,
            greaterThan250 : 0
        }
    });

    Entities.CandidateList = Backbone.Collection.extend({
        url: function () { return _url; },
        model: Entities.Candidate
    });


    var _candidatesByOffice = {};

    Entities.CandidateList.getByOffice = function (officeId) {
        var data = null;
        if (officeId) {
            data = { race: officeId }
        }

        if (!_candidatesByOffice[officeId]) {
            _candidatesByOffice[officeId] = new Entities.CandidateList().fetch({
                data: data
            }).then(function (data) {

                return new Entities.CandidateList(data);
            });
        }

        return _candidatesByOffice[officeId];
    };

    Entities.CandidateList.getAll = function () {

        var officeId = 'allthecandidates';

        if (!_candidatesByOffice[officeId]) {
            _candidatesByOffice[officeId] = new Entities.CandidateList().fetch({
            }).then(function (data) {

                return new Entities.CandidateList(data);
            });
        }

        return _candidatesByOffice[officeId];
    };

    //var _contributionsByCandidate = {};
    Entities.CandidateList.getContributionsByCandidate = function (candidateId, filingPeriod) {

        var url = _url + '/' + candidateId + '/filingperiods/' + filingPeriod;
        return $.ajax({
            url: url,
            dataType: 'json'
        }).then(function (data) {

            return new Entities.Candidate(data);
        });

    };


});