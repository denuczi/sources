const audio = document.getElementById("audio");
const progreso = document.getElementById("progreso");
const volumen = document.getElementById("volumen");
const botonReproducirPausar = document.querySelector(".reproducir-pausar");
const botonAtras = document.querySelector(".atras");
const botonAdelante = document.querySelector(".adelante");
const botonMutear = document.querySelector(".mutear");
const tituloCancion = document.querySelector(".titulo-cancion");
const artistaCancion = document.querySelector(".artista-cancion");
const portada = document.querySelector(".portada");
const tiempoActual = document.querySelector(".tiempo-actual");
const tiempoTotal = document.querySelector(".tiempo-total");

const canciones = [
  {
    titulo: "Symphony",
    artista: "Clean Bandit ft. Zara Larsson",
    portada: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
    fuente: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Clean-Bandit-Symphony.mp3"
  },
  {
    titulo: "Butterflies",
    artista: "Sia",
    portada: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
    fuente: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
    url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
  },
  {
    titulo: "The Final Victory",
    artista: "Haggard",
    portada: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
    fuente: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
    url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
  }
  // Añade más canciones aquí
];

let indiceActual = 0;

// Cargar una canción y actualizar el fondo
function cargarCancion(indice) {
  const cancion = canciones[indice];
  tituloCancion.textContent = cancion.titulo;
  artistaCancion.textContent = cancion.artista;
  portada.src = cancion.portada;
  audio.src = cancion.fuente;

  // Cambiar el fondo al de la canción actual
  document.body.style.background = `url(${cancion.portada}) no-repeat center center fixed`;
  document.body.style.backgroundSize = "cover";
}

// Actualizar progreso de la canción
function actualizarProgreso() {
  progreso.value = (audio.currentTime / audio.duration) * 100;
  tiempoActual.textContent = formatoTiempo(audio.currentTime);
}

// Formatear tiempo en minutos y segundos
function formatoTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60);
  return `${minutos}:${segundosRestantes < 10 ? "0" : ""}${segundosRestantes}`;
}

// Cambiar a la siguiente o anterior canción de forma consecutiva
function cambiarCancion(siguiente = true) {
  if (siguiente) {
    // Avanzar a la siguiente canción
    indiceActual = (indiceActual + 1) % canciones.length;
  } else {
    // Retroceder a la canción anterior
    indiceActual = (indiceActual - 1 + canciones.length) % canciones.length;
  }
  cargarCancion(indiceActual);
  audio.play();
}

// Reproducción al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCancion(indiceActual); // Cargar la primera canción
});

// Eventos del audio
audio.addEventListener("timeupdate", actualizarProgreso);
audio.addEventListener("loadedmetadata", () => {
  tiempoTotal.textContent = formatoTiempo(audio.duration);
});

// **Nueva función para cuando termine la canción**
audio.addEventListener("ended", () => {
  cambiarCancion(true); // Pasar automáticamente a la siguiente canción
});

// Botón de reproducir/pausar
botonReproducirPausar.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    botonReproducirPausar.textContent = "⏸"; // Pausar
  } else {
    audio.pause();
    botonReproducirPausar.textContent = "▶"; // Reproducir
  }
});

// Progreso de la canción
progreso.addEventListener("input", () => {
  audio.currentTime = (progreso.value / 100) * audio.duration;
});

// Botones de avanzar y retroceder
botonAtras.addEventListener("click", () => cambiarCancion(false));
botonAdelante.addEventListener("click", () => cambiarCancion(true));

// Botón de mutear
botonMutear.addEventListener("click", () => {
  audio.muted = !audio.muted;
  botonMutear.textContent = audio.muted ? "🔇" : "🔊";
});

// Control del volumen
volumen.addEventListener("input", () => {
  audio.volume = volumen.value;
});

 /* Modifica el fondo del body después de cargar todo el contenido
        window.addEventListener('load', () => {
            document.body.style.backgroundImage = "url('https://sun9-57.userapi.com/impg/ist1iX2rurzGTY4pKg_3AYQFTPkc5XzO4jK_4Q/kSxzGIjQD9o.jpg?size=1892x1080&quality=96&sign=db80ae3aa398349e8fb5b7492b3d3d25&type=album')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition="center";
        });*/
        
        
        document.querySelector('.reproducir').addEventListener('click', () => {
    const img = document.querySelector('#cuerpodos');
    const yb = document.querySelector('#youtube');
    const video = document.querySelector('#youtube video'); // Selecciona el video dentro de #youtube.
    const button = document.querySelector('.reproducir'); // Selecciona el botón.

    // Verificar el estado actual y alternar entre mostrar y ocultar
    if (yb.style.display === "none" || yb.style.display === "") {
        img.style.display = "none"; // Ocultar la imagen
        yb.style.display = "block"; // Mostrar el div con videos
        video.play(); // Reproducir el video.
        button.textContent = "Salir"; // Cambiar el texto del botón a "Salir"
    } else {
        img.style.display = "block"; // Mostrar la imagen
        yb.style.display = "none";  // Ocultar el div con videos
        video.pause(); // Pausar el video.
        button.textContent = "Mis Videos"; // Cambiar el texto del botón a "Mis Videos"
    }
});

