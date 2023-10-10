using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ContributionMap.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

           
           // config.Routes.MapHttpRoute(
           //   name: "CityCouncilDistrictCandidatesApiRoute",
           //   routeTemplate: "api/candidates/{candidateId}/citycouncildistricts/",
           //   defaults: new
           //   {
           //       controller = "CityCouncilDistricts"

           //   }
           // );
           // config.Routes.MapHttpRoute(
           //   name: "ElectionDistrictCandidatesApiRoute",
           //   routeTemplate: "api/candidates/{candidateId}/electiondistricts/",
           //   defaults: new
           //   {
           //       controller = "ElectionDistricts"

           //   }
           // );

           // config.Routes.MapHttpRoute(
           //  name: "NeighborhoodsCandidatesApiRoute",
           //  routeTemplate: "api/candidates/{candidateId}/neighborhoods/",
           //  defaults: new
           //  {
           //      controller = "Neighborhoods"

           //  }
           //);

           // config.Routes.MapHttpRoute(
           //  name: "ZipCodesCandidatesApiRoute",
           //  routeTemplate: "api/candidates/{candidateId}/zipcodes/{fillingPeriod}",
           //  defaults: new
           //  {
           //      controller = "ZipCodes"

           //  }
           //);

           // config.Routes.MapHttpRoute(
           //    name: "CandidatesApiRoute",
           //    routeTemplate: "api/candidates/",
           //    defaults: new
           //    {
           //         controller = "Candidates",
           //         race = RouteParameter.Optional

           //    }
           //);

            config.Routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );


        }
    }
}
