using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributionMap.Core.Entities
{
    public class Neighborhood
    {

        public string Id { get; set; }
        public string Candidate { get; set; }

        public double PrePrimTot { get; set; }
        public int PrePrimNum { get; set; }
       //Deleted a ton of fields here too. see old project if needed

    }
}
