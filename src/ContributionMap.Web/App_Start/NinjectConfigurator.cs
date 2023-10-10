using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Configuration;

using Ninject;
using Ninject.Activation;

using ContributionMap.Core.Interfaces;
using ContributionMap.Data.Connections;
using ContributionMap.Data.Repositories;

namespace ContributionMap.Web
{
    public class NinjectConfigurator
    {
        public void Configure(IKernel container)
        {
            AddBindings(container);
        }

        private void AddBindings(IKernel container)
        {

            container.Bind<IConnectionFactory>().To<SqlConnectionFactory>().WithConstructorArgument("connectionString", ConfigurationManager.ConnectionStrings["ContributionMapDb"].ConnectionString);
            container.Bind<ICandidateRepository>().To<CandidateRepository>();
            container.Bind<IElectedOfficeRepository>().To<ElectedOfficeRepository>();
            container.Bind<IFilingPeriodRepository>().To<FilingPeriodRepository>();
            container.Bind<ICityCouncilDistrictRepository>().To<CityCouncilDistrictRepository>();

            container.Bind<ICommBoardRepository>().To<CommBoardRepository>();

            container.Bind<IElectionDistrictRepository>().To<ElectionDistrictRepository>();
            container.Bind<INeighborhoodRepository>().To<NeighborhoodRepository>();
            container.Bind<IZipCodeRepository>().To<ZipCodeRepository>();
            container.Bind<INysAssemblyDistrictRepository>().To<NysAssemblyDistrictRepository>();

        }

        
    }
}