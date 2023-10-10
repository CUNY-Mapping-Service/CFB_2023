using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ContributionMap.Core.Entities;

namespace ContributionMap.Core.Interfaces
{
    public interface IElectionDistrictRepository
    {
        //IEnumerable<ElectionDistrict> GetAll();
        IEnumerable<ElectionDistrict> GetByCandidate(string candidateId, int filingPeriod);
    }
}
