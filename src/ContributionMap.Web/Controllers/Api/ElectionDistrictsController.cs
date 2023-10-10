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
    public class ElectionDistrictsController : ApiController
    {
        IElectionDistrictRepository _electionDistrictRepository;
        public ElectionDistrictsController(IElectionDistrictRepository repository)
        {
            _electionDistrictRepository = repository;
        }

        //public IEnumerable<ElectionDistrictSubset> GetElectionDistrictsForCandidate(string candidateId)
        //{
        //    IEnumerable<ElectionDistrict> eds = _electionDistrictRepository.GetAll();

        //    ElectionDistrictSubsetMapper mapper = new ElectionDistrictSubsetMapper(candidateId);
        //    IEnumerable<ElectionDistrictSubset> vals = eds.Select(mapper.CreateCategory).Where(d => d != null).ToList();

        //    //IDictionary<string, ElectionDistrictSubset> dict = vals.ToDictionary(x => x.Id, x => x);
        //    //return dict;

        //    return vals;
        //}
        //public IDictionary<string, ElectionDistrictSubset> GetElectionDistrictsForCandidate(string candidateId)
        //{
        //    IEnumerable<ElectionDistrict> eds = _electionDistrictRepository.GetAll();

        //    ElectionDistrictSubsetMapper mapper = new ElectionDistrictSubsetMapper(candidateId);
        //    IEnumerable<ElectionDistrictSubset> vals = eds.Select(mapper.CreateCategory).Where(d => d != null).ToList();

        //    IDictionary<string, ElectionDistrictSubset> dict = vals.ToDictionary(x => x.Id, x => x);
        //    return dict;

        //    //return vals;
        //}
        [Route("api/candidates/{candidateId}/electiondistricts/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public IDictionary<string, ElectionDistrict> GetElectionDistrictsForCandidate(string candidateId, int filingPeriod = 0)
        {
            IEnumerable<ElectionDistrict> eds = _electionDistrictRepository.GetByCandidate(candidateId, filingPeriod);
            IDictionary<string, ElectionDistrict> dict = eds.ToDictionary(x => x.Id, x => x);
            return dict;
        }

    }
}
