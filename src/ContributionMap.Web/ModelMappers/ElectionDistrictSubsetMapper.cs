using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Reflection;

using ContributionMap.Web.Model;
using ContributionMap.Core.Entities;

namespace ContributionMap.Web.ModelMappers
{
    public class ElectionDistrictSubsetMapper
    {

        public ElectionDistrictSubsetMapper(string candidate)
        {

            this.Candidate = candidate;
        }

        public string Candidate { get; set; }

        const string NUMBER_PRE = "num{0}Pre";
        const string NUMBER_POST = "num{0}Post";
        const string TOTAL_PRE = "tot{0}Pre";
        const string TOTAL_POST = "tot{0}Post";

        public ElectionDistrictSubset CreateCategory(ElectionDistrict ed)
        {

            double? NumberPre = this.GetValue(ed, string.Format(NUMBER_PRE, this.Candidate));
            double? NumberPost = this.GetValue(ed, string.Format(NUMBER_POST, this.Candidate));
            double? TotalPre = this.GetValue(ed, string.Format(TOTAL_PRE, this.Candidate));
            double? TotalPost = this.GetValue(ed, string.Format(TOTAL_POST, this.Candidate));

            if (NumberPre != 0 || NumberPost != 0 || TotalPre != 0 || TotalPost != 0)
            {

                return new ElectionDistrictSubset
                {
                    Id = ed.Id,
                    //Pre = new Contribution() { Number = NumberPre, Total = TotalPre},
                    //Post = new Contribution() { Number = NumberPost, Total = TotalPost },
                    NumberPre = NumberPre,
                    NumberPost = NumberPost,
                    TotalPre = TotalPre,
                    TotalPost = TotalPost


                };
            } //else
            //{
                return null;
            //}

        }


        public double? GetValue(ElectionDistrict zip, string property)
        {
            return (double?)this.GetProperty(property).GetValue(zip);
        }

        private PropertyInfo GetProperty(string property)
        {
            return typeof(ElectionDistrict).GetProperty(property);
        }
    }
}