using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ContributionMap.Core.Entities;

namespace ContributionMap.Core.Interfaces
{
    public interface ICandidateRepository
    {
        //Candidate GetById(string id);
        IEnumerable<Candidate> GetByElectedOffice(string race);
        IEnumerable<Candidate> GetAll();
        CandidateContributions GetContributionsByCandidate(string candidateId, int filingPeriod);
    }
}
