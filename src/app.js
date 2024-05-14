let favmusic = document.querySelector(".fav-music-btn");
let musicList = document.querySelector(".music-list");

let removebtn = document.querySelector(".remove");

favmusic.addEventListener("click", ()=>{
    console.log("btn clicked");
    console.log(musicList.classList);
    musicList.classList.toggle("show");
});

removebtn.addEventListener("click", ()=>{

    console.log("btn clicked");
    favmusic.click();
});