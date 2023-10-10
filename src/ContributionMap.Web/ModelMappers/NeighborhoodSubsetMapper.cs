using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Reflection;

using ContributionMap.Web.Model;
using ContributionMap.Core.Entities;

namespace ContributionMap.Web.ModelMappers
{
    public class NeighborhoodSubsetMapper
    {

         public NeighborhoodSubsetMapper(string candidate)
        {

            this.Candidate = candidate;
        }

        public string Candidate { get; set; }

        const string NUMBER_PRE = "num{0}Pre";
        const string NUMBER_POST = "num{0}Post";
        const string TOTAL_PRE = "tot{0}Pre";
        const string TOTAL_POST = "tot{0}Post";

        public NeighborhoodSubset CreateCategory(Neighborhood nhood)
        {
            double? NumberPre = this.GetValue(nhood, string.Format(NUMBER_PRE, this.Candidate));
            double? NumberPost = this.GetValue(nhood, string.Format(NUMBER_POST, this.Candidate));
            double? TotalPre = this.GetValue(nhood, string.Format(TOTAL_PRE, this.Candidate));
            double? TotalPost = this.GetValue(nhood, string.Format(TOTAL_POST, this.Candidate));

            return new NeighborhoodSubset
            {
                Id = nhood.Id,
                NumberPre = NumberPre,
                NumberPost = NumberPost,
                TotalPre = TotalPre,
                TotalPost = TotalPost
                //NumberPre = this.GetValue(nhood, string.Format(NUMBER_PRE, this.Candidate)),
                //NumberPost = this.GetValue(nhood, string.Format(NUMBER_POST, this.Candidate)),
                //TotalPre = this.GetValue(nhood, string.Format(TOTAL_PRE, this.Candidate)),
                //TotalPost = this.GetValue(nhood, string.Format(TOTAL_POST, this.Candidate))
            };
        }


        public double? GetValue(Neighborhood n, string property)
        {
            return (double?)this.GetProperty(property).GetValue(n);

        }
        private PropertyInfo GetProperty(string property)
        {
            return typeof(Neighborhood).GetProperty(property);

        }
    }


     
}