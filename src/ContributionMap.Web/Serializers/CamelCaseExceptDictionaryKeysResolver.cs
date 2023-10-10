using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Newtonsoft.Json.Serialization;

namespace ContributionMap.Web.Serializers
{
    public class CamelCaseExceptDictionaryKeysResolver : CamelCasePropertyNamesContractResolver
    {

        protected override JsonDictionaryContract CreateDictionaryContract(Type objectType)
        {
            JsonDictionaryContract contract = base.CreateDictionaryContract(objectType);

            contract.DictionaryKeyResolver = propertyName => propertyName;

            return contract;
        }
       

    }
}