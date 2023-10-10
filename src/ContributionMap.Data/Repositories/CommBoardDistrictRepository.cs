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
    public class CommBoardRepository : BaseRepository, ICommBoardRepository
    {
        IConnectionFactory _connectionFactory;
        public CommBoardRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }


        public IEnumerable<CommBoardDistrict> GetByCandidate(string candidateId, int filingPeriod)
        {

            IEnumerable<CommBoardDistrict> cds;
            using (var conn = _connectionFactory.CreateConnection())
            {
                conn.Open();
                cds = conn.Query<CommBoardDistrict>("GetCandidateContributionsByCouncilDistrict", new { CANDIDATEID = candidateId, FILINGPERIOD = filingPeriod }, commandType: CommandType.StoredProcedure).ToList();
            }

            return cds;

        }



    }
}
