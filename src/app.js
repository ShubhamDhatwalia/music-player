let favmusic = document.querySelector(".fav-music-btn");
let musicList = document.querySelector(".music-list");

let removebtn = document.querySelector(".close");

favmusic.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

removebtn.addEventListener("click", () => {
    favmusic.click();
});




let musicImage = document.querySelector(".img-area img");
let musicName = document.querySelector(".song-details .song-name");
let musicArtist = document.querySelector(".song-details .artist");
let playPauseBtn = document.querySelector(".play-pause");
let mainAudio = document.querySelector("#main-audio");
let container = document.querySelector(".container");
let playPauseBtnText = document.querySelector(".play-pause i");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let repeatbtn = document.querySelector("#repeat");
let progressBar = document.querySelector(".progress-baar");
let currentTime = document.querySelector(".curr-time");
let duration = document.querySelector(".max-time");
let progressArea = document.querySelector(".progress-area");
let volumeSlider = document.querySelector(".volume-bar");
const volumeIcon = document.querySelector(".volume-up");
const volumeBar = document.querySelector(".volume-bar");
let favMusicList = document.querySelector(".music-list ul");
let addFavorite = document.querySelector(".add-to-favorite");
let currentSong;



//   ------------ Music Index ----------------------------
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});





//  ----------------------- Add to favorite list --------------------------
addFavorite.addEventListener("click", () => {

    console.log("btn clicked");

    const isSongInFavorites = Array.from(favMusicList.children).some(listItem => {
        const songDetails = listItem.querySelector('.list-song-details');
        const songName = songDetails.querySelector('.list-song-name').innerText.trim();
        const songArtist = songDetails.querySelector('.artist').innerText.trim();
        return songName === musicName.innerText && songArtist === currentSong.artist;
    });

    if (!isSongInFavorites) {
        let listItem = document.createElement("li");
        
        listItem.innerHTML =
            `<div class="list-song-details">
                <span class="list-song-name">${musicName.innerText}</span>
                <span class="artist">${currentSong.artist}</span>
            </div>
            <span class="material-symbols-outlined">heart_minus</span>`;

        favMusicList.appendChild(listItem);
    } else {
        console.log("Song is already in the favorites.");
    }
});


// Add event listener to each "heart_minus" icon
favMusicList.addEventListener("click", (event) => {
    if (event.target.classList.contains("material-symbols-outlined") && event.target.innerText === "heart_minus") {
        // Remove the parent li element containing the song details
        event.target.parentElement.remove();
    }
});




//  ----------------------- Load Music ------------------------------
function loadMusic(indexNumber) {
    currentSong = allMusic[indexNumber - 1];

    musicImage.src = `./images/${currentSong.img}.jpg`;
    mainAudio.src = `./songs/${currentSong.src}.mp3`;
    musicName.innerText = `${currentSong.name}||`;
    musicArtist.innerText = `${currentSong.artist}`;
}




//  ----------------------- Play Music ------------------------------
function playMusic() {
    container.classList.add("paused");
    playPauseBtnText.innerText = "pause";
    mainAudio.play();
};
//      ------------------------ Pause Music ------------------------
function pauseMusic() {
    container.classList.remove("paused");
    playPauseBtnText.innerText = "play_arrow";
    mainAudio.pause();
}

//      -------------------------- Play Pause Button ------------------

playPauseBtn.addEventListener("click", () => {
    const isPaused = container.classList.contains("paused");
    isPaused ? pauseMusic() : playMusic();
});


//  ------------------ Next Music ----------------------
function nextMusic() {
    let isRepeatOne = repeatbtn.innerText === "repeat_one";
    let isShuffle = repeatbtn.innerText === "shuffle";

    if (!isRepeatOne && !isShuffle) {
        // If neither repeat_one nor shuffle mode is active, move to the next song
        musicIndex++;
        musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    } else if (isShuffle) {
        // If shuffle mode is active, generate a random index until it's different from the current index
        let randIndx = musicIndex;
        do {
            randIndx = Math.floor((Math.random() * allMusic.length) + 1);
        } while (musicIndex === randIndx);

        musicIndex = randIndx;
    }

    loadMusic(musicIndex);
    playMusic();
}




//     ------------------  Prev Music  ------------------

function prevMusic() {
    musicIndex--;

    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


//  ----------------- nextbtn and prevbtn events ------------------------

nextBtn.addEventListener("click", () => {
    nextMusic();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});



//  ---------- repeate repeatOne shuffle icon CHange ------------------------

repeatbtn.addEventListener("click", () => {
    let getText = repeatbtn.innerText;


    switch (getText) {
        case "repeat":
            repeatbtn.innerText = "repeat_one";
            repeatbtn.setAttribute("title", "song looped");
            break;

        case "repeat_one":
            repeatbtn.innerText = "shuffle";
            repeatbtn.setAttribute("title", "shuffled");
            break;

        case "shuffle":
            repeatbtn.innerText = "repeat";
            repeatbtn.setAttribute("title", "playlist looped");
            break;
    }
});


//    -----------------  play song according to repeat shuffle btns -----------------

mainAudio.addEventListener("ended", () => {
    let getText = repeatbtn.innerText;

    switch (getText) {
        case "repeat":
            nextMusic();
            break;

        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;

        case "shuffle":

            let randIndx = Math.floor((Math.random() * allMusic.length) + 1);

            do {
                randIndx = Math.floor((Math.random() * allMusic.length) + 1);
            }
            while (musicIndex == randIndx)

            musicIndex = randIndx;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});





// -----------------  uptdating progress area according to song current time ---------

mainAudio.addEventListener("timeupdate", (e) => {
    const currTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currTime / duration) * 100;

    progressBar.style.width = `${progressWidth}%`;




    let currMin = Math.floor(currTime / 60);
    let currSec = Math.floor(currTime % 60);
    if (currSec < 10) {
        currSec = `0${currSec}`;
    }

    currentTime.innerText = `${currMin}:${currSec}`;


});

//  ----------------- updating current time and duration according to song ------------

mainAudio.addEventListener("loadeddata", () => {


    let mainAudioDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAudioDuration / 60);
    let totalSec = Math.floor(mainAudioDuration % 60);

    if (totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    duration.innerText = `${totalMin}:${totalSec}`;

});



// ------------------- update current time and progres bar width --------------

progressArea.addEventListener("click", (e) => {

    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});


//  ------------------    volume slider -----------------------------------

volumeSlider.addEventListener("input", () => {

    let volumeValue = parseFloat(volumeSlider.value);
    if (!isNaN(volumeValue) && volumeValue >= 0 && volumeValue <= 100) {
        mainAudio.volume = volumeValue / 100;
    }

});



//    ------------ volume slider on clicking of volume up btn ----------------------


volumeIcon.addEventListener("click", () => {
    // Toggle the visibility of the volume bar
    if (volumeBar.style.display === "block") {
        volumeBar.style.display = "none";
    } else {
        volumeBar.style.display = "block";
    }
});



//   ----------------------  Add to favorite list  --------------------


