using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;

using Dapper;

using ContributionMap.Core.Entities;
using ContributionMap.Core.Interfaces;



namespace ContributionMap.Data.Repositories
{
    public class CandidateRepository : BaseRepository, ICandidateRepository
    {
        IConnectionFactory _connectionFactory;
        public CandidateRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        private string _tableName = "Candidates";
        private string _columnMapping = @"CURCODE Id, 
                                            RecipId RecipId, 
                                            RecipName Name, 
                                            OfficeCd OfficeId, 
                                            OfficeDetail OfficeName,
                                            RecipId CfbRecipId,
                                            URLoffice_id CfbOfficeId
                                        ";

        public IEnumerable<Candidate> GetByElectedOffice(string officeId)
        {
            if(officeId.ToLower() == "all races")
            {
                return GetAllCandidates();
            }

            IEnumerable<Candidate> cds;
            using (var conn = _connectionFactory.CreateConnection())
            {
                string query = String.Format("SELECT {0} FROM {1} WHERE OFFICEDETAIL=@OFFICEID ORDER BY URLCAND, NAME", _columnMapping, _tableName);
                conn.Open();
                cds = conn.Query<Candidate>(query, new { OFFICEID = officeId }).ToList();
            }

            return cds;
        }

        //JUST GETS INDIVIDUAL CANDIDATES
        public IEnumerable<Candidate> GetAllCandidates()
        {
            IEnumerable<Candidate> cds;
            using (var conn = _connectionFactory.CreateConnection())
            {
                string query = String.Format("SELECT {0} FROM {1} WHERE RECIPID IS NOT NULL OR CURCODE='AllAll' ORDER BY URLCAND, RECIPNAME", _columnMapping, _tableName);
                conn.Open();
                cds = conn.Query<Candidate>(query).ToList();
            }

            return cds;
        }

        //GETS INDIVIDUAL CANDIDATES PLUS AGGREGATED CANDIDATE STAND IN (ie All Queens Borough President Candidates
        public IEnumerable<Candidate> GetAll()
        {
            IEnumerable<Candidate> cds;
            using (var conn = _connectionFactory.CreateConnection())
            {
                string query = String.Format("SELECT {0} FROM {1} ORDER BY RECIPID", _columnMapping, _tableName);
                conn.Open();
                cds = conn.Query<Candidate>(query).ToList();
            }

            return cds;
        }


        public CandidateContributions GetContributionsByCandidate(string candidateId, int filingPeriod)
        {
            CandidateContributions cont;
          
            using (var conn = _connectionFactory.CreateConnection())
            {
                conn.Open();
                cont = conn.Query<CandidateContributions>("GetTotalContributionsByCandidate", new { CANDIDATEID = candidateId, FILINGPERIOD = filingPeriod }, commandType: CommandType.StoredProcedure).SingleOrDefault();

                if(cont == null)
                {
                    string query = String.Format("SELECT {0} FROM {1} WHERE CURCODE=@CANDIDATEID", _columnMapping, _tableName);
                    cont = conn.Query<CandidateContributions>(query, new { CANDIDATEID = candidateId }).SingleOrDefault();
                }
            }


            return cont; ;
        }

       


        //private string _tableName = "ContributionsByCandidateUNIONContributionsByElectedOffice";
        //private string _columnMapping = @"CURCODE Id, 
        //                                    RecipId RecipId, 
        //                                    RecipName Name, 
        //                                    OfficeCd RaceId, 
        //                                    OfficeDetail RaceName,
        //                                    '' SplitOnPrimary,
        //                                    PrePrimTot TotalContributionAmount,
        //                                    PrePrimNum TotalNumberOfContributions,
        //                                    PrePrimTotINNYC TotalFromInsideNyc,
        //                                    PrePrimTotOUTNYC TotalFromOutsideNyc,
        //                                    PrePrimNumLE175 LessThanOrEqualTo175,
        //                                    PrePrimNumGT175 GreaterThan175,
        //                                    '' SplitOnGeneral,
        //                                    PostPrimTot TotalContributionAmount,
        //                                    PostPrimNum TotalNumberOfContributions,
        //                                    PostPrimTotINNYC TotalFromInsideNyc,
        //                                    PostPrimTotOUTNYC TotalFromOutsideNyc,
        //                                    PostPrimNumLE175 LessThanOrEqualTo175,
        //                                    PostPrimNumGT175 GreaterThan175
        //                                ";


        //public IEnumerable<Candidate> GetByRace(string race)
        //{

        //    IEnumerable<Candidate> candidates;
        //    using (var conn = _connectionFactory.CreateConnection())
        //    {
        //        string query = String.Format("SELECT {0} FROM {1} WHERE OFFICEDETAIL=@RACEID ORDER BY RECIPID", _columnMapping, _tableName);
        //        conn.Open();
        //        //candidates = conn.Query<Candidate>(query, new { RACEID = race });

        //        candidates = conn.Query<Candidate, ContributionDetails, ContributionDetails, Candidate>(
        //            query,
        //            (candidate, primary, general) =>
        //            {
        //                candidate.PrimaryDetails = primary;
        //                candidate.GeneralDetails = general;
        //                return candidate;
        //            }, new { RACEID = race }, splitOn: "SplitOnPrimary,SplitOnGeneral").ToList();
        //    }

        //    return candidates;
        //}
    }
}
