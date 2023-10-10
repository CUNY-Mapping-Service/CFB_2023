using System.Web;
using System.Web.Optimization;

namespace ContributionMap.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {


            bundles.Add(new StyleBundle("~/css/app")
                .Include(
                    "~/css/bootstrap.css",
                    "~/css/typeaheadjs.css",
                    "~/css/map.css"
                )
            );


            ////TEMPLATES
            bundles.Add(new Bundle("~/bundle/js/templates/html").IncludeDirectory("~/js/templates", "*.html", false));

            //JS LIBRARIES
            bundles.Add(new ScriptBundle("~/js/_lib/lib")
               .Include(
                    "~/js/_lib/json2.js",
                    "~/js/_lib/jquery-{version}.js",
                     "~/js/_lib/underscore.js",
                    "~/js/_lib/backbone.js",
                    "~/js/_lib/backbone.marionette.js",
                    "~/js/_lib/bootstrap.js",
                    "~/js/_lib/spin.js",
                    "~/js/_lib/spin.jquery.js",
                    "~/js/_lib/typeahead.bundle.js",
                    "~/js/_lib/jquery.sparkline.min.js"
                   
               )
           );

            //JS APP
            bundles.Add(new ScriptBundle("~/js/app")
                .Include(
                    "~/js/app.js",
                    "~/js/appConfig.js",

                    "~/js/common/loadingView.js",
                    "~/js/common/templateHelpers.js",

                    "~/js/entities/candidate.js",
                    "~/js/entities/dataBreaks.js",
                    "~/js/entities/contributionDataManager.js",
                    "~/js/entities/geographicDataManager.js",
                    "~/js/entities/query.js",

                    "~/js/modules/about/aboutView.js",
                    "~/js/modules/about/shareView.js",

                    "~/js/modules/map/mapModule.js",
                    "~/js/modules/map/mapController.js",
                    "~/js/modules/map/mapLoadingMask.js",
                    "~/js/modules/map/queryVisualizer.js",
                    "~/js/modules/map/logoControl.js",

                    "~/js/modules/map/nyccfbSearchPageLink.js",

                    "~/js/modules/map/amountTypeSelector/amountTypeControl.js",
                    "~/js/modules/map/amountTypeSelector/amountTypeView.js",

                    "~/js/modules/map/legend/legendControl.js",
                    "~/js/modules/map/legend/legendView.js",



                    "~/js/modules/map/candidateSummary/candidateSummaryControl.js",
                    "~/js/modules/map/candidateSummary/candidateSummaryView.js",

                    "~/js/modules/map/identify/identifyControl.js",
                    "~/js/modules/map/identify/identifyView.js",

                    "~/js/modules/map/search/searchControl.js",

                    "~/js/modules/map/link/linkView.js",
                    "~/js/modules/map/link/queryStringParser.js",

                    "~/js/modules/map/layer/highlightedCouncilDistrictLayer.js",

                    "~/js/modules/queryBuilder/queryBuilderModule.js",
                    "~/js/modules/queryBuilder/queryBuilderView.js",
                    "~/js/modules/queryBuilder/candidateSearchBox.js"

                )
            );


            //BundleTable.EnableOptimizations = true;

        }

    }
}