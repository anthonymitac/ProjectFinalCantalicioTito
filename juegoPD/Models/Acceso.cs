using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace juegoPD.Models
{
    public class Acceso
    {
        private static Acceso _acceso = null;
        private static Jugador _jugador = null;
        private static Puntuacion _puntuacion = null;
        private static float punto = 0f;

        public Jugador CrearJugador(string name, string lastname)
        {
            if (_jugador == null)
                _jugador = new Jugador() { nombre = name, apellido=lastname, puntuacion = null, puntuacionTotal=0 };
            return _jugador;
        }

        public Jugador InstanceJugador()
        {
            return _jugador;
        }

        public void EstablecerPuntuacion(int puntB, int puntM) {
            _puntuacion = new Puntuacion() { cantidadAcertadas = puntB, cantidadFallidas = puntM };
            _jugador.puntuacion = _puntuacion;
            _jugador.puntuacion.cantidadAcertadas = puntB;
            _jugador.puntuacion.cantidadFallidas = puntM;
            punto = (float)100/(puntB + puntM);
            _jugador.puntuacionTotal = puntB * punto;
        }

        public static Acceso Instance
        {
            get
            {
                if (_acceso == null)
                    _acceso = new Acceso();

                return _acceso;
            }
        }
    }
}
