using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Reflection;

using ContributionMap.Web.Model;
using ContributionMap.Core.Entities;

namespace ContributionMap.Web.ModelMappers
{
    public class ZipCodeSubsetMapper
    {

        
        public ZipCodeSubsetMapper(string candidate)
        {

            this.Candidate = candidate;
        }

        public string Candidate { get; set; }

        const string NUMBER_PRE = "num{0}Pre";
        const string NUMBER_POST = "num{0}Post";
        const string TOTAL_PRE = "tot{0}Pre";
        const string TOTAL_POST = "tot{0}Post";

        public ZipCodeSubset CreateCategory(ZipCode zip)
        {

            double? NumberPre = this.GetValue(zip, string.Format(NUMBER_PRE, this.Candidate));
            double? NumberPost = this.GetValue(zip, string.Format(NUMBER_POST, this.Candidate));
            double? TotalPre = this.GetValue(zip, string.Format(TOTAL_PRE, this.Candidate));
            double? TotalPost = this.GetValue(zip, string.Format(TOTAL_POST, this.Candidate));

            return new ZipCodeSubset
            {
                Id = zip.Id,
                NumberPre = NumberPre,
                NumberPost = NumberPost,
                TotalPre = TotalPre,
                TotalPost = TotalPost
                //NumberPre = this.GetValue(zip, string.Format(NUMBER_PRE, this.Candidate)),
                //NumberPost = this.GetValue(zip, string.Format(NUMBER_POST, this.Candidate)),
                //TotalPre = this.GetValue(zip, string.Format(TOTAL_PRE, this.Candidate)),
                //TotalPost = this.GetValue(zip, string.Format(TOTAL_POST, this.Candidate))
            };
        }

        //private double GetNumberPreValue(ZipCode zip)
        //{
        //    return this.GetValue(zip, "num" + this.Candidate + "Pre");

        //}
        //private double GetNumberPostValue(ZipCode zip)
        //{
        //    return this.GetValue(zip, "num" + this.Candidate + "Post");
        //}

        //private double GetTotalPreValue(ZipCode zip)
        //{
        //    return this.GetValue(zip, "tot" + this.Candidate + "Pre");
        //}
        //private double GetTotalPostValue(ZipCode zip)
        //{
        //    return this.GetValue(zip, "tot" + this.Candidate + "Post");
        //}

        public double? GetValue(ZipCode zip, string property)
        {

            return (double?)this.GetProperty(property).GetValue(zip);

        }
        private PropertyInfo GetProperty(string property){
            
            
            return typeof(ZipCode).GetProperty(property);

        }


    }
}