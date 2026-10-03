// Adicionando os dados da música

const songs = [
    { title: "Selva Russa", artist: "SonoTWS, Caio Ocean",
        img: "assets/imagens/SelvaRussa.jpg",
        src: "assets/musica/SelvaRussa.mp3" }
];

// Renderizar músicas

const songList = document.getElementByID('songList');
songs.forEach((song, index) => {
    songList.innerHTML += "
        <div class="card" onclick="playSong(${index})">
            <img src="${song.img}" alt="${song.title}">
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>";
});

// Reprodutor de áudio

const audio = new Audio();
let currentIndex = 0;
function playSong(index) {
    currentIndex = index;
    audio.src = song[index].src;
    audio.play();
    document.getElementByID('currentTitle').innerText = songs[index].title;
    document.getElementByID('currentArtist').innerText = songs[index].artist
}

// Reproduzir e Pausar

const playBtn = document.getElementByID('playBtn');
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "❚❚";
    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
    }
});

// Avançar e Voltar

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
}
function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex)
}

// Barra de progresso

const progress = document.getElementByID("progress");
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration * 100);
});
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});