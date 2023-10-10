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

        //public IEnumerable<CityCouncilDistrictSubset> GetCityCouncilDistrictsForCandidate(string candidateId)
        //{
        //    IEnumerable<CityCouncilDistrict> cds = _ccdRepository.GetAll();

        //    CityCouncilDistrictSubsetMapper mapper = new CityCouncilDistrictSubsetMapper(candidateId);
        //    IEnumerable<CityCouncilDistrictSubset> vals = cds.Select(mapper.CreateCategory).Where(d => d != null).ToList();

        //    //IDictionary<string, CityCouncilDistrictSubset> dict = new Dictionary<string, CityCouncilDistrictSubset>();

        //    //IDictionary<string, CityCouncilDistrictSubset> dict = vals.ToDictionary(x => x.Id, x => x);
        //    //return dict;


        //    return vals;
        //}

        [Route("api/candidates/{candidateId}/citycouncildistricts/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public IDictionary<string, CityCouncilDistrict> GetCityCouncilDistrictsForCandidate(string candidateId, int filingPeriod = 0)
        {
            IEnumerable<CityCouncilDistrict> cds = _ccdRepository.GetByCandidate(candidateId, filingPeriod);
            IDictionary<string, CityCouncilDistrict> dict = cds.ToDictionary(x => x.Id, x => x);
            return dict;
        }

    }
}
