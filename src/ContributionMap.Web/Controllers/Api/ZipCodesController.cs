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
    public class ZipCodesController : ApiController
    {
        IZipCodeRepository _zipRepository;
        public ZipCodesController(IZipCodeRepository repository)
        {
            _zipRepository = repository;
        }

        //public IEnumerable<ZipCodeSubset> GetZipCodesForCandidate(string candidateId)
        //{
        //    IEnumerable<ZipCode> eds = _zipRepository.GetAll();

        //    ZipCodeSubsetMapper mapper = new ZipCodeSubsetMapper(candidateId);
        //    IEnumerable<ZipCodeSubset> vals = eds.Select(mapper.CreateCategory).Where(d => d != null).ToList();

        //    return vals;
        //}

        //public IDictionary<string, ZipCodeSubset> GetElectionDistrictsForCandidate(string candidateId)
        //{
        //    IEnumerable<ZipCode> eds = _zipRepository.GetAll();

        //    ZipCodeSubsetMapper mapper = new ZipCodeSubsetMapper(candidateId);
        //    IEnumerable<ZipCodeSubset> vals = eds.Select(mapper.CreateCategory).Where(d => d != null).ToList();

        //    IDictionary<string, ZipCodeSubset> dict = vals.ToDictionary(x => x.Id, x => x);
        //    return dict;

        //    //return vals;
        //}

        [Route("api/candidates/{candidateId}/zipcodes/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public IDictionary<string, ZipCode> GetZipCodesForCandidate(string candidateId, int filingPeriod = 0)
        {
            IEnumerable<ZipCode> zips = _zipRepository.GetByCandidate(candidateId, filingPeriod);
            IDictionary<string, ZipCode> dict = zips.ToDictionary(x => x.Id, x => x);
            return dict;
        }
    }
}
