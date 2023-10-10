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
    public class NysAssemblyDistrictsController : ApiController
    {

        INysAssemblyDistrictRepository _nysDistrictRepository;
        public NysAssemblyDistrictsController(INysAssemblyDistrictRepository repository)
        {
            _nysDistrictRepository = repository;
        }

        [Route("api/candidates/{candidateId}/nysassemblydistricts/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public IDictionary<string, NysAssemblyDistrict> GetNysAssemblyDistrictsForCandidate(string candidateId, int filingPeriod = 0)
        {
            IEnumerable<NysAssemblyDistrict> ads = _nysDistrictRepository.GetByCandidate(candidateId, filingPeriod);
            IDictionary<string, NysAssemblyDistrict> dict = ads.ToDictionary(x => x.Id, x => x);
            return dict;
        }
    }
}
