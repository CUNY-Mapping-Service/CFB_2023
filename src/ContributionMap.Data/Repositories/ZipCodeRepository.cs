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
    public class ZipCodeRepository : BaseRepository, IZipCodeRepository
    {
        IConnectionFactory _connectionFactory;
        public ZipCodeRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        private string _tableName = "ContributionsByZipCode";
        private string _columnMapping = @"CURZIP Id, 
                                            CURCode Candidate, 
                                            PrePrimTot,
                                            PrePrimNum ,
                                            PostPrimTot,
                                            PostPrimNum 
                                        ";

        //public IEnumerable<ZipCode> GetAll()
        //{
        //    IEnumerable<ZipCode> districts;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {

        //        conn.Open();
        //        districts = conn.Query<ZipCode>("GetContributionsByZipCode", commandType: CommandType.StoredProcedure);

        //    }

        //    return districts;
        //}

        //public IEnumerable<ZipCode> GetByCandidate(string candidateId)
        //{
        //    IEnumerable<ZipCode> zips;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format("SELECT {0} FROM {1} WHERE CURCODE=@ID", _columnMapping, _tableName);
        //        conn.Open();
        //        zips = conn.Query<ZipCode>(query, new { ID = candidateId }).ToList();
        //    }

        //    return zips;
        //}

        public IEnumerable<ZipCode> GetByCandidate(string candidateId, int filingPeriod)
        {

            IEnumerable<ZipCode> zips;
            using (var conn = _connectionFactory.CreateConnection())
            {
                conn.Open();
                zips = conn.Query<ZipCode>("GetCandidateContributionsByZipCode", new { CANDIDATEID = candidateId, FILINGPERIOD = filingPeriod }, commandType: CommandType.StoredProcedure).ToList();
            }

            return zips;

        }
        //public IEnumerable<ZipCode> GetByCandidate(string candidateId, int filingPeriod)
        //{

        //    if(filingPeriod == 0)
        //    {
        //        return GetByCandidateForAllFilingPeriods(candidateId);
        //    }
        //    else
        //    {
        //        return GetByCandidateForFilingPeriod(candidateId, filingPeriod);
        //    }
        //}


        //public IEnumerable<ZipCode> GetByCandidateForAllFilingPeriods(string candidateId)
        //{
        //    IEnumerable<ZipCode> zips;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format(@"SELECT SUM([PrePrimTot]) PrePrimTot
        //                        ,SUM([PostPrimTot]) PostPrimTot
        //                        ,SUM([PrePrimNum]) PrePrimNum
        //                        ,SUM([PostPrimNum]) PostPrimNum
        //                        ,[CURZIP] Id
        //                        ,[CURCODE] Candidate
        //                        FROM {0}
        //                        WHERE CURCODE=@ID
        //                        GROUP BY CURZIP, CURCode", _tableName);
        //        conn.Open();
        //        zips = conn.Query<ZipCode>(query, new { ID = candidateId }).ToList();
        //    }

        //    return zips;
        //}

        //public IEnumerable<ZipCode> GetByCandidateForFilingPeriod(string candidateId, int filingPeriod)
        //{
        //    IEnumerable<ZipCode> zips;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format("SELECT {0} FROM {1} WHERE CURCODE=@ID AND STATEMENT_NO=@FILINGPERIOD", _columnMapping, _tableName);
        //        conn.Open();
        //        zips = conn.Query<ZipCode>(query, new { ID = candidateId, FILINGPERIOD = filingPeriod  }).ToList();
        //    }

        //    return zips;
        //}
    }
}
