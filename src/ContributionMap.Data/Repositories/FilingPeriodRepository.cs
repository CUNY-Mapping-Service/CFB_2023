using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ContributionMap.Core.Entities;
using ContributionMap.Core.Interfaces;

using Dapper;

namespace ContributionMap.Data.Repositories
{
    public class FilingPeriodRepository : BaseRepository, IFilingPeriodRepository
    {
        IConnectionFactory _connectionFactory;
        public FilingPeriodRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        private string _tableName = "FilingPeriods";
        private string _columnMapping = @"Statement_No StatementNo, FilingDeadline, DisclosurePeriod";


        public IEnumerable<FilingPeriod> GetAll()
        {
            Console.WriteLine("GetAll");

            IEnumerable<FilingPeriod> filingPeriods;
            using (var conn = _connectionFactory.CreateConnection())
            {
                string query = String.Format("SELECT {0} FROM {1} ORDER BY Statement_No", _columnMapping, _tableName);
                conn.Open();
                filingPeriods = conn.Query<FilingPeriod>(query).ToList();
            }
            System.Diagnostics.Debug.WriteLine("test");
            return filingPeriods;
        }

        public IEnumerable<FilingPeriod> GetFilingPeriodsThatHaveData()
        {
            Console.WriteLine("GetFilingPeriodsThatHaveData");
            IEnumerable<FilingPeriod> filingPeriods;
            using (var conn = _connectionFactory.CreateConnection())
            {
                string query = String.Format("SELECT {0} FROM {1} WHERE HaveData=@HAVEDATA ORDER BY Statement_No ", _columnMapping, _tableName);
                conn.Open();
                bool haveData = true;
                filingPeriods = conn.Query<FilingPeriod>(query, new { haveData = haveData }).ToList();
            }

            return filingPeriods;
        }
    }
}
