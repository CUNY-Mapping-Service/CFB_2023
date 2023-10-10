using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;


namespace ContributionMap.Web.ViewHelpers
{
    public static class HtmlHelperExtension
    {

        public static IHtmlString RenderTemplates(this HtmlHelper htmlHelper, string src)
        {
            var context = htmlHelper.ViewContext.HttpContext;
            if (string.IsNullOrEmpty(src) || context == null || context.Request.Url == null)
            {
                return null;
            }
            using (WebClient Client = new WebClient())
            {
                Client.Encoding = Encoding.UTF8;
                var request = context.Request;

               // string t = string.Format("{0}------{1}/", request.Url.GetLeftPart(UriPartial.Authority), request.ApplicationPath.TrimEnd('/'));

                var url = request.Url.Scheme + "://" + request.Url.Authority + Scripts.Url(src).ToHtmlString();
                //var content = Client.DownloadString(url);
                var content = Client.DownloadString(url).Replace(System.Environment.NewLine, String.Empty).Replace("~", request.ApplicationPath.TrimEnd('/'));
                return new MvcHtmlString(content);
            }

        }
    }
}