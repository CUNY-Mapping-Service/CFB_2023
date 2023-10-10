using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Reflection;

using ContributionMap.Web.Model;
using ContributionMap.Core.Entities;


namespace ContributionMap.Web.ModelMappers
{
    public class CityCouncilDistrictSubsetMapper
    {

        public CityCouncilDistrictSubsetMapper(string candidate)
        {

            this.Candidate = candidate;
        }

        public string Candidate { get; set; }

        const string NUMBER_PRE = "num{0}Pre";
        const string NUMBER_POST = "num{0}Post";
        const string TOTAL_PRE = "tot{0}Pre";
        const string TOTAL_POST = "tot{0}Post";

        public CityCouncilDistrictSubset CreateCategory(CityCouncilDistrict cd)
        {
            double? NumberPre = this.GetValue(cd, string.Format(NUMBER_PRE, this.Candidate));
            double? NumberPost = this.GetValue(cd, string.Format(NUMBER_POST, this.Candidate));
            double? TotalPre = this.GetValue(cd, string.Format(TOTAL_PRE, this.Candidate));
            double? TotalPost = this.GetValue(cd, string.Format(TOTAL_POST, this.Candidate));


            return new CityCouncilDistrictSubset
            {
                Id = cd.Id,
                NumberPre = NumberPre,
                NumberPost = NumberPost,
                TotalPre = TotalPre,
                TotalPost = TotalPost
                //NumberPre = this.GetValue(cd, string.Format(NUMBER_PRE, this.Candidate)),
                //NumberPost = this.GetValue(cd, string.Format(NUMBER_POST, this.Candidate)),
                //TotalPre = this.GetValue(cd, string.Format(TOTAL_PRE, this.Candidate)),
                //TotalPost = this.GetValue(cd, string.Format(TOTAL_POST, this.Candidate))
            };
        }


        public double? GetValue(CityCouncilDistrict zip, string property)
        {
            return (double?)this.GetProperty(property).GetValue(zip);
        }

        private PropertyInfo GetProperty(string property)
        {
            return typeof(CityCouncilDistrict).GetProperty(property);
        }


    }
}