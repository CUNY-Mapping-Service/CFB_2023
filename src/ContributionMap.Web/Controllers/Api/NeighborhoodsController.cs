using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using ContributionMap.Web.Serializers;


using ContributionMap.Core.Entities;
using ContributionMap.Core.Interfaces;

using ContributionMap.Web.Model;
using ContributionMap.Web.ModelMappers;

namespace ContributionMap.Web.Controllers.Api
{
    public class NeighborhoodsController : ApiController
    {
        INeighborhoodRepository _neighborhoodRepository;
        public NeighborhoodsController(INeighborhoodRepository repository)
        {
            _neighborhoodRepository = repository;
        }

        //public IEnumerable<NeighborhoodSubset> GetNeighborhoodsForCandidate(string candidateId)
        //{
        //    IEnumerable<Neighborhood> eds = _neighborhoodRepository.GetAll();

        //    NeighborhoodSubsetMapper mapper = new NeighborhoodSubsetMapper(candidateId);
        //    IEnumerable<NeighborhoodSubset> vals = eds.Select(mapper.CreateCategory).Where(d => d != null).ToList();

        //    return vals;
        //}

        [Route("api/candidates/{candidateId}/neighborhoods/filingperiods/{filingPeriod?}")]
        [HttpGet]
        public HttpResponseMessage GetNeighborhoodsForCandidate(string candidateId, int filingPeriod = 0)
        {


            IEnumerable<Neighborhood> ntas = _neighborhoodRepository.GetByCandidate(candidateId, filingPeriod);
            IDictionary<string, Neighborhood> dict = ntas.ToDictionary(x => x.Id, x => x);


            //NEED A SPECIAL SERILIZER BECAUSE NTA IDS ARE TWO LETTERS FOLLOWED BY NUMBERS
            //FOR EXAMPLE BK12. THE STANDARD CAMELCASE SERIALIZER TURNS THE DICT KEY (WHICH IS LOOKS LIKE 
            //A PROPERTY NAME IN JSON) INTO bK12 WHICH IS BAD. THIS SERIAALIZER MAINTAINS CASE FOR DICT KEYS
            JsonSerializerSettings settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCaseExceptDictionaryKeysResolver(),
                Formatting = Formatting.None
            };

            StringContent sc = new StringContent(JsonConvert.SerializeObject(dict, settings));
            sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            HttpResponseMessage resp = new HttpResponseMessage();
            resp.Content = sc;

            return resp;
            
        }
    }
}
