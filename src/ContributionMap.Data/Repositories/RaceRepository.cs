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
    public class ElectedOfficeRepository : BaseRepository, IElectedOfficeRepository
    {
        IConnectionFactory _connectionFactory;
        public ElectedOfficeRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        private string _tableName = "ElectedOffices";
        private string _columnMapping = @"Office Id";


        public IEnumerable<ElectedOffice> GetAll()
        {
            IEnumerable<ElectedOffice> races;
            using (var conn = _connectionFactory.CreateConnection())
            {
                string query = String.Format("SELECT {0} FROM {1}", _columnMapping, _tableName);
                conn.Open();
                races = conn.Query<ElectedOffice>(query).ToList();
            }

            return races;
        }
    }
}
