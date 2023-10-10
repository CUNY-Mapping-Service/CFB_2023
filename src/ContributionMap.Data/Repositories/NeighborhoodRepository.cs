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
    public class NeighborhoodRepository : BaseRepository, INeighborhoodRepository
    {
        IConnectionFactory _connectionFactory;
        public NeighborhoodRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public IEnumerable<Neighborhood> GetByCandidate(string candidateId, int filingPeriod)
        {

            IEnumerable<Neighborhood> cds;
            using (var conn = _connectionFactory.CreateConnection())
            {
                conn.Open();
                cds = conn.Query<Neighborhood>("GetCandidateContributionsByNta", new { CANDIDATEID = candidateId, FILINGPERIOD = filingPeriod }, commandType: CommandType.StoredProcedure).ToList();
            }

            return cds;

        }
        //private string _tableName = "ContributionsByNta";
        //private string _columnMapping = @"CURNTACODE Id, 
        //                                    CURCode Candidate, 
        //                                    PrePrimTot,
        //                                    PrePrimNum ,
        //                                    PostPrimTot,
        //                                    PostPrimNum 
        //                                ";

        //public IEnumerable<Neighborhood> GetByCandidate(string candidateId)
        //{
        //    IEnumerable<Neighborhood> ntas;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format("SELECT {0} FROM {1} WHERE CURCODE=@ID", _columnMapping, _tableName);
        //        conn.Open();
        //        ntas = conn.Query<Neighborhood>(query, new { ID = candidateId }).ToList();
        //    }

        //    return ntas;
        //}
    }
}
