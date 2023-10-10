using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContributionMap.Web.Model
{
    public class CityCouncilDistrictSubset
    {
        public string Id { get; set; }
        public double? NumberPre { get; set; }
        public double? NumberPost { get; set; }
        public double? TotalPre { get; set; }
        public double? TotalPost { get; set; }

    }
}