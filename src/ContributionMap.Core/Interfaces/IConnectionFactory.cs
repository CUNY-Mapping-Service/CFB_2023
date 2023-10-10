using System.Data.SqlClient;

namespace ContributionMap.Core.Interfaces
{
    public interface IConnectionFactory
    {
        SqlConnection CreateConnection();
    }
}
