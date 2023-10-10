using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContributionMap.Web.Model
{
    public class ElectionDistrictSubset
    {

        public string Id { get; set; }
        public double? NumberPre { get; set; }
        public double? NumberPost { get; set; }
        public double? TotalPre { get; set; }
        public double? TotalPost { get; set; }
        //public Contribution Pre { get; set; }
        //public Contribution Post { get; set; }
    }

    //public class Contribution
    //{
    //    public double? Number { get; set; }
    //    public double? Total { get; set; }
    //}
}