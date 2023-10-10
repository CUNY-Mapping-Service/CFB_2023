using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.SqlClient;

using ContributionMap.Core.Interfaces;

namespace ContributionMap.Data.Connections
{
    public class SqlConnectionFactory : IConnectionFactory
    {
        private readonly string _connectionString;

        public SqlConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public SqlConnection CreateConnection()
        {
            var connection = new SqlConnection(_connectionString);
            return connection;
        }

        //public SqlConnection GetOpenConnection()
        //{
        //    var connection = new SqlConnection(_connectionString);
        //    connection.Open();
        //    return connection;
        //}
    }
}
