using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ContributionMap.Core.Entities;

namespace ContributionMap.Web.Models
{
    public class MapView
    {
        public MapView(){
            AmountTypes = new List<string>() { "total", "average", "number" };
            Geographies = new List<string>() { "zipcodes", "neighborhoods", "citycouncildistricts","electiondistricts", "nysassemblydistricts" };
        }

        public IEnumerable<ElectedOffice> Offices { get; set; }
        public ElectedOffice Office { get; set; }

        public IEnumerable<Candidate> Candidates { get; set; }
        public Candidate Candidate { get; set; }

        public IEnumerable<string> Geographies { get; set; }
        public string Geography { get; set; }

        public IEnumerable<FilingPeriod> FilingPeriods { get; set; }
        public FilingPeriod FilingPeriod { get; set; }

        public IEnumerable<string> AmountTypes { get; set; }
        private string _amountType;
        public string AmountType
        {
            get { return _amountType; }
            set {
                _amountType = AmountTypes.FirstOrDefault(x => x == value.ToLower()) ?? "total";

            }
        }

    }
}