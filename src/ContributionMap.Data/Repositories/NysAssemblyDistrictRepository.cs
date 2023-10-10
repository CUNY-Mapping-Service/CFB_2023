using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using ContributionMap.Core.Entities;
using ContributionMap.Core.Interfaces;

using Dapper;

namespace ContributionMap.Data.Repositories
{
    public class NysAssemblyDistrictRepository : BaseRepository, INysAssemblyDistrictRepository
    {
        IConnectionFactory _connectionFactory;
        public NysAssemblyDistrictRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public IEnumerable<NysAssemblyDistrict> GetByCandidate(string candidateId, int filingPeriod)
        {
            IEnumerable<NysAssemblyDistrict> ads;
            using (var conn = _connectionFactory.CreateConnection())
            {
                conn.Open();
                ads = conn.Query<NysAssemblyDistrict>("GetCandidateContributionsByNysAssemblyDistrict", new { CANDIDATEID = candidateId, FILINGPERIOD = filingPeriod }, commandType: CommandType.StoredProcedure).ToList();
            }

            return ads;
        }
    }
}
