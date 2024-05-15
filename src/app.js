let favmusic = document.querySelector(".fav-music-btn");
let musicList = document.querySelector(".music-list");

let removebtn = document.querySelector(".close");

favmusic.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

removebtn.addEventListener("click", ()=>{
    favmusic.click();
});




let musicImage  =document.querySelector(".img-area img");
let musicName = document.querySelector(".song-details .song-name");
let playPauseBtn = document.querySelector(".play-pause");
let mainAudio = document.querySelector("#main-audio");
let container = document.querySelector(".container");
let playPauseBtnText = document.querySelector(".play-pause i");
console.log(mainAudio.src);




//   ------------ Music Index ----------------------------
let musicIndex = Math.floor((Math.random()*allMusic.length)+1);
console.log(musicIndex);

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
});


//    -------------------------- load music function ------------
function loadMusic(indexNumber){

    musicImage.src = `./images/${allMusic[indexNumber-1].img}.jpg`;
    mainAudio.src = `./songs/${allMusic[indexNumber-1].src}.mp3`;
    musicName.innerText = `${allMusic[indexNumber-1].name}||${allMusic[indexNumber-1].artist}`;
    console.log(mainAudio.src);
}


//  ----------------------- Play Music ------------------------------
function playMusic(){
    container.classList.add("paused");
    playPauseBtnText.innerText = "pause";
    mainAudio.play();
};
//      ------------------------ Pause Music ------------------------
function pauseMusic(){
    container.classList.remove("paused");
    playPauseBtnText.innerText = "play_arrow";
    mainAudio.pause();
}

//      -------------------------- Play Pause Button --------------------

playPauseBtn.addEventListener("click", ()=>{
    const isPaused = container.classList.contains("paused");
    isPaused ? pauseMusic():playMusic();
});

//   --------------------------  Add to favorite list ------------------------

let addFavorite = document.querySelector(".add-to-favorite");

addFavorite.addEventListener("click", ()=>{

});