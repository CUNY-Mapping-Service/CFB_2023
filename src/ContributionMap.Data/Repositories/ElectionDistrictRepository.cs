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
    public class ElectionDistrictRepository : BaseRepository, IElectionDistrictRepository
    {
        IConnectionFactory _connectionFactory;
        public ElectionDistrictRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public IEnumerable<ElectionDistrict> GetByCandidate(string candidateId, int filingPeriod)
        {

            IEnumerable<ElectionDistrict> cds;
            using (var conn = _connectionFactory.CreateConnection())
            {
                conn.Open();
                cds = conn.Query<ElectionDistrict>("GetCandidateContributionsByElectionDistrict", new { CANDIDATEID = candidateId, FILINGPERIOD = filingPeriod }, commandType: CommandType.StoredProcedure).ToList();
            }

            return cds;

        }
        //private string _tableName = "ContributionsByElectionDistrict";
        //private string _columnMapping = @"CURELECTDIST Id, 
        //                                    CURCode Candidate, 
        //                                    PrePrimTot,
        //                                    PrePrimNum ,
        //                                    PostPrimTot,
        //                                    PostPrimNum 
        //                                ";
        //public IEnumerable<ElectionDistrict> GetByCandidate(string candidateId)
        //{
        //    IEnumerable<ElectionDistrict> eds;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format("SELECT {0} FROM {1} WHERE CURCODE=@ID", _columnMapping, _tableName);
        //        conn.Open();
        //        eds = conn.Query<ElectionDistrict>(query, new { ID = candidateId }).ToList();
        //    }

        //   return eds;
        //}

    }
}
