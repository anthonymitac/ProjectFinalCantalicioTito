using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace juegoPD.Models
{
    public class Jugador
    {
        public string nombre { get; set; }
        public string apellido { get; set; }
        public Puntuacion puntuacion { get; set; }
        public float puntuacionTotal { get; set; }
    }
}
