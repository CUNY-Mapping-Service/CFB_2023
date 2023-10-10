using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using ContributionMap.Core.Entities;
using ContributionMap.Core.Interfaces;


namespace ContributionMap.Web.Controllers.Api
{
    public class CandidatesController : ApiController
    {

        ICandidateRepository _candidateRepository;

        public CandidatesController(ICandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }

        [Route("api/candidates/{candidateId}/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public CandidateContributions GetContributionsByCandidate(string candidateId, int filingPeriod = 0)
        {
            return _candidateRepository.GetContributionsByCandidate(candidateId, filingPeriod);
        }

        public IEnumerable<Candidate> GetCandidateList(string race = "")
        {
            if (String.IsNullOrEmpty(race))
            {
                return _candidateRepository.GetAll();
            } else
            {
                return _candidateRepository.GetByElectedOffice(race);
            }
        }

        

    }
}
