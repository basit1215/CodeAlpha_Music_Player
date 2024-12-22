let CurrentMusic = 0;

const music = document.querySelector('#audio');

const progressBar = document.querySelector('.progress-bar');
const songName = document.querySelector('.name-of-music');
const artistName = document.querySelector('.name-of-artist');
const musicDisk = document.querySelector('.music-disk');
const currentTime = document.querySelector('.current-state');
const songTime = document.querySelector('.song-time');
const playBtn = document.querySelector('.play');
const forwardOpt = document.querySelector('.forward-opt');
const backwardOpt = document.querySelector('.backward-opt');


playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause');
    musicDisk.classList.toggle('play');
})

//Setting Up Music

const setMusic = (i) => {
    progressBar.value = 0; //set the value of range slide to 0.
    let song = songs[i];
    CurrentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    musicDisk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        progressBar.max = music.duration;
        songTime.innerHTML = formatTime(music.duration);
    }, 300)
}

setMusic(0);

//formatting of time in minutes and seconds.

const formatTime = (time) => {
    let min = Math.floor(time/60);
    if (min < 10) {
        min = `0${min}`;
    }

    let sec = Math.floor(time%60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

//make the progess bar to run.

setInterval(() => {
    progressBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500)

//jump into the progress bar. 

progressBar.addEventListener('change' ,() => {
    music.currentTime = progressBar.value;
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    musicDisk.classList.add('play');
}

//making forward and backward buttons operational. 

forwardOpt.addEventListener('click' ,() => {
    if(CurrentMusic >= songs.length - 1) {
        CurrentMusic = 0;
    } else {
        CurrentMusic++;
    }
    setMusic(CurrentMusic);
    playMusic();
})

backwardOpt.addEventListener('click' ,() => {
    if(CurrentMusic <= 0) {
        CurrentMusic = songs.length - 1;
    } else {
        CurrentMusic--;
    }
    setMusic(CurrentMusic);
    playMusic();
})