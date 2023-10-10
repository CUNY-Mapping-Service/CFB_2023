using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributionMap.Core.Entities
{
    public class CandidateContributions
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public string CfbRecipId { get; set; }
        public string CfbOfficeId { get; set; }

        public virtual decimal TotalContributionAmount { get; set; }
        public virtual int TotalNumberOfContributions { get; set; }

        public virtual decimal TotalFromInsideNyc { get; set; }
        public virtual decimal TotalFromOutsideNyc { get; set; }

        public virtual int LessThanOrEqualTo250 { get; set; }
        public virtual int GreaterThan250 { get; set; }

        public virtual decimal TotalFromIndividuals { get; set; }
        public virtual decimal TotalFromNotIndividuals{ get; set; }
    }
}
