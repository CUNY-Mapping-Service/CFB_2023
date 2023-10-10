using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Runtime.Serialization;

namespace ContributionMap.Core.Entities
{
    
    public class Candidate
    {

        public string Id { get; set; }

        [IgnoreDataMember]//I SET THIS TO BE IGNORED IN SERIALIZATION. PROBABLY DONT HAVE  TO. BUT I DID ANYWAY
        public string RecipId { get; set; }

        public string Name { get; set; }
        public string OfficeId { get; set; }
        public string OfficeName { get; set; }


    }
}
