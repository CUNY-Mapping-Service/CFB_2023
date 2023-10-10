using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ContributionMap.Core.Entities;
using ContributionMap.Core.Interfaces;

using ContributionMap.Web.Models;

namespace ContributionMap.Web.Controllers
{
    public class HomeController : Controller
    {

        private IElectedOfficeRepository _raceRepository;
        private ICandidateRepository _candidateRepository;
        private IFilingPeriodRepository _fpRepository;
        public HomeController(IElectedOfficeRepository raceRepository, ICandidateRepository candidateRepository,
            IFilingPeriodRepository fpRepository
            )
        {
            _raceRepository = raceRepository;
            _candidateRepository = candidateRepository;
            _fpRepository = fpRepository;
        }


        // GET: Home
        public ActionResult Map(
            string office = "All Races", string candidate = "", string geography = "zipcodes", 
            int? filingPeriod=0, string amountType = "total", bool embed = true
        )
        {

            IEnumerable<ElectedOffice> races = _raceRepository.GetAll();
            ElectedOffice selectedOffice;
            selectedOffice = races.FirstOrDefault(x => x.Id.ToLower() == office.ToLower())
                ?? races.FirstOrDefault(x => x.Id == "All Races");

            ViewBag.RaceId = selectedOffice.Id;
            ViewBag.Races = races;


            IEnumerable<Candidate> candidates = _candidateRepository.GetByElectedOffice(selectedOffice.Id);
            Candidate selectedCandidate;
            selectedCandidate = candidates.FirstOrDefault(x => x.Id.ToLower() == candidate.ToLower())
                ?? candidates.FirstOrDefault();
 
            ViewBag.CandidateId = selectedCandidate.Id;
            ViewBag.Candidates = candidates;

            //Console.WriteLine("here");
            IEnumerable<FilingPeriod> fps = _fpRepository.GetFilingPeriodsThatHaveData();
            FilingPeriod selectedFilingPeriod = fps.FirstOrDefault(x => x.StatementNo == filingPeriod)
                ?? fps.FirstOrDefault(x => x.StatementNo == 0);

            ViewBag.FilingPeriodId = selectedFilingPeriod.StatementNo;
            ViewBag.FilingPeriods = fps;

            //ViewBag.GeographyId = geography.ToLower();

            

            //HttpUtility.HtmlEncode
            //MapViewCleanedQueryParameters queryParameters 

            MapView mapView = new MapView()
            {
                Offices = races,
                Office = selectedOffice,
                Candidates = candidates,
                Candidate = selectedCandidate,
                FilingPeriods = fps,
                FilingPeriod = selectedFilingPeriod,
                Geography = geography,
                AmountType = amountType

            };

            //JAN 2021: COMMENT OUT ALL LINES EXCEPT FIRST return LINE TO ONLY SHOW MAP LAYOUT BY DEFAULT
            //WHEN ALL LINES ARE NOT COMMENTED OUT, IT'LL SHOW MAP WITHIN OVERALL CFB PAGE
            //if (embed == true)
            //{
                return View("Map", "_EmbedLayout", mapView); //Always return Embed Layout!
            //}
            //else
            //{
            //    return View(mapView);
            //}


        }

        
    }
}