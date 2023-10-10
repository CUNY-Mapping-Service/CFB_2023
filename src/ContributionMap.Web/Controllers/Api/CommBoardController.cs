using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using ContributionMap.Core.Entities;
using ContributionMap.Core.Interfaces;

using ContributionMap.Web.Model;
using ContributionMap.Web.ModelMappers;

namespace ContributionMap.Web.Controllers.Api
{
    public class CommBoardController : ApiController
    {
        ICommBoardRepository _ccdRepository;
        public CommBoardController(ICommBoardRepository repository)
        {
            _ccdRepository = repository;
        }

        [Route("api/candidates/{candidateId}/nycommboarddistricts/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public IDictionary<string, CommBoardDistrict> GetCityCouncilDistrictsForCandidate(string candidateId, int filingPeriod = 0)
        {
            IEnumerable<CommBoardDistrict> cds = _ccdRepository.GetByCandidate(candidateId, filingPeriod);
            IDictionary<string, CommBoardDistrict> dict = cds.ToDictionary(x => x.Id, x => x);
            return dict;
        }

    }
}
