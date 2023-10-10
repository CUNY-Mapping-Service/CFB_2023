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
    public class CityCouncilDistrictsController : ApiController
    {
        ICityCouncilDistrictRepository _ccdRepository;
        public CityCouncilDistrictsController(ICityCouncilDistrictRepository repository)
        {
            _ccdRepository = repository;
        }

        [Route("api/candidates/{candidateId}/nycommboarddistricts/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public IDictionary<string, CityCouncilDistrict> GetCityCouncilDistrictsForCandidate(string candidateId, int filingPeriod = 0)
        {
            IEnumerable<CityCouncilDistrict> cds = _ccdRepository.GetByCandidate(candidateId, filingPeriod);
            IDictionary<string, CityCouncilDistrict> dict = cds.ToDictionary(x => x.Id, x => x);
            return dict;
        }

    }
}
