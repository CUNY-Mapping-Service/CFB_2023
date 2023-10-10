using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributionMap.Core.Entities
{
    public class ElectionDistrict
    {
        public string Id { get; set; }
        public string Candidate { get; set; }

        public double PrePrimTot { get; set; }
        public int PrePrimNum { get; set; }
        //public double PostPrimTot { get; set; }
        //public int PostPrimNum { get; set; }

    }
}
