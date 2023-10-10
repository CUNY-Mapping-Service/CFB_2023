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
    public class CityCouncilDistrictRepository : BaseRepository, ICityCouncilDistrictRepository
    {
        IConnectionFactory _connectionFactory;
        public CityCouncilDistrictRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        //private string _tableName = "ContributionsByCouncilDistrict";
        //private string _columnMapping = @"CURCOUNCIL Id, 
        //                                    CURCode Candidate, 
        //                                    PrePrimTot,
        //                                    PrePrimNum ,
        //                                    PostPrimTot,
        //                                    PostPrimNum 
        //                                ";

        public IEnumerable<CityCouncilDistrict> GetByCandidate(string candidateId, int filingPeriod)
        {

            IEnumerable<CityCouncilDistrict> cds;
            using (var conn = _connectionFactory.CreateConnection())
            {
                conn.Open();
                cds = conn.Query<CityCouncilDistrict>("GetCandidateContributionsByCouncilDistrict", new { CANDIDATEID = candidateId, FILINGPERIOD = filingPeriod }, commandType: CommandType.StoredProcedure).ToList();
            }

            return cds;

        }
        //public IEnumerable<CityCouncilDistrict> GetByCandidate(string candidateId, int filingPeriod)
        //{
        //    if (filingPeriod == 0)
        //    {
        //        return GetByCandidateForAllFilingPeriods(candidateId);
        //    }
        //    else
        //    {
        //        return GetByCandidateForFilingPeriod(candidateId, filingPeriod);
        //    }
        //}


        //public IEnumerable<CityCouncilDistrict> GetByCandidateForAllFilingPeriods(string candidateId)
        //{
        //    IEnumerable<CityCouncilDistrict> cds;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format(@"SELECT 
        //                        [CURCOUNCIL] Id
        //                        ,[CURCODE] Candidate
        //                        ,SUM([PrePrimTot]) PrePrimTot
        //                        ,SUM([PostPrimTot]) PostPrimTot
        //                        ,SUM([PrePrimNum]) PrePrimNum
        //                        ,SUM([PostPrimNum]) PostPrimNum
        //                        FROM {0}
        //                        WHERE CURCODE=@ID
        //                        GROUP BY CURCOUNCIL, CURCode", _tableName);
        //        conn.Open();
        //        cds = conn.Query<CityCouncilDistrict>(query, new { ID = candidateId }).ToList();
        //    }

        //    return cds;
        //}

        //public IEnumerable<CityCouncilDistrict> GetByCandidateForFilingPeriod(string candidateId, int filingPeriod)
        //{
        //    IEnumerable<CityCouncilDistrict> cds;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format("SELECT {0} FROM {1} WHERE CURCODE=@ID AND STATEMENT_NO=@FILINGPERIOD", _columnMapping, _tableName);
        //        conn.Open();
        //        cds = conn.Query<CityCouncilDistrict>(query, new { ID = candidateId, FILINGPERIOD = filingPeriod }).ToList();
        //    }

        //    return cds;
        //}


    }
}
