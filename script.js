console.log("Welcome to Music");

let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('mastersongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Ajit Singh", filePath: "song/1.mp3", coverPath: "covers/1.jpeg" },
    { songName: "Breakup Song", filePath: "song/2.mp3", coverPath: "covers/2.jpeg" },
    { songName: "Love Song", filePath: "song/3.mp3", coverPath: "covers/3.jpeg" },
    { songName: "KK Song", filePath: "song/4.mp3", coverPath: "covers/4.jpeg" },
    { songName: "Hum Aapke Hain Akon", filePath: "song/5.mp3", coverPath: "covers/5.jpeg" },
    { songName: "Udit Narayan", filePath: "song/6.mp3", coverPath: "covers/6.jpeg" },
    { songName: "Shreya Ghoshal", filePath: "song/7.mp3", coverPath: "covers/7.jpeg" },
    { songName: "Sonu Nigam", filePath: "song/8.mp3", coverPath: "covers/8.jpeg" }
];

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("img")[0].alt = songs[i].songName;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songItemPlay")[0].id = i; 
});

const playSong = () => {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    gif.src = songs[songIndex].coverPath; 
    gif.classList.add('rotate'); 
};

const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    gif.classList.remove('rotate'); 
};

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        let index = parseInt(e.target.id);
        songIndex = index; 
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[index].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        playSong();
    });
});

const playNextSong = () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    playSong();
};

const playPreviousSong = () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    playSong();
};

document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('previous').addEventListener('click', playPreviousSong);

audioElement.addEventListener('ended', playNextSong);
