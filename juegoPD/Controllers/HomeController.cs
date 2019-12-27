using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using juegoPD.Models;

namespace juegoPD.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        Acceso access = Acceso.Instance;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(string nombres, string apellidos)
        {
            return View("ToPlay", access.CrearJugador(nombres, apellidos));
        }

        public IActionResult ToPlay(Jugador jug)
        {
            return View(jug);
        }

        [HttpPost]
        public IActionResult ToPlay(string bueno, string malo)
        {
            access.EstablecerPuntuacion(Convert.ToInt32(bueno), Convert.ToInt32(malo));
            return View("Felicitacion", access.InstanceJugador());
        }

        public IActionResult Felicitacion(Jugador jug)
        {
            return View(jug);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
