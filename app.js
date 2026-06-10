const songs = [
    {
        title: "LUNA",
        artist: "Feid",
        file: "assets/songs/luna.mp3",
        cover: "assets/covers/luna.jpg"
    },
    {
        title: "Q U E V A S H A C E R H O Y ?",
        artist: "Omar Courtz, De La Rose",
        file: "assets/songs/qvao.mp3",
        cover: "assets/covers/qvao.jpg"
    },
    {
        title: "Cuando No Era Cantante",
        artist: "El Bogueto, Yung Beef",
        file: "assets/songs/cuando_no_era_cantante.mp3",
        cover: "assets/covers/cuando_no_era_cantante.jpg"
    },
    {
        title: "Es Un Secreto",
        artist: "Plan B",
        file: "assets/songs/es_un_secreto.mp3",
        cover: "assets/covers/es_un_secreto.jpg"
    },
];

const container = document.getElementById("songsContainer");
const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const artist = document.getElementById("artistName");
const cover = document.getElementById("cover");
const fullPlayer = document.getElementById("fullPlayer");
const fullCover = document.getElementById("fullCover");
const fullTitle = document.getElementById("fullTitle");
const fullArtist = document.getElementById("fullArtist");
const bgBlur = document.querySelector(".bg-blur");
const playBtn = document.getElementById("playBtn");

let currentSong = 0;

// Renderiza las canciones (por defecto usa la lista completa)
function renderSongs(songsToRender = songs) {
    container.innerHTML = "";
    songsToRender.forEach((song, index) => {
        // Buscamos el índice real de la canción en la lista original
        const originalIndex = songs.findIndex(s => s.file === song.file);
        
        container.innerHTML += `
            <div class="card" onclick="loadSong(${originalIndex})">
                <img src="${song.cover}">
                <div class="info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            </div>
        `;
    });
}

function loadSong(index) {
    currentSong = index;
    audio.src = songs[index].file;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    
    if (fullCover) fullCover.src = songs[index].cover;
    if (fullTitle) fullTitle.textContent = songs[index].title;
    if (fullArtist) fullArtist.textContent = songs[index].artist;
    if (bgBlur) bgBlur.style.backgroundImage = `url(${songs[index].cover})`;

    audio.play();
    playBtn.textContent = "⏸";
}

playBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

document.getElementById("nextBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    loadSong(currentSong);
});

document.getElementById("prevBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
});

// BUSCADOR CORREGIDO Y FUNCIONAL
document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    
    // Filtra si el título o el artista coinciden con la búsqueda
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query)
    );
    
    // Vuelve a renderizar solo las canciones filtradas
    renderSongs(filteredSongs);
});

// Inicializar la app cargando las canciones
renderSongs();