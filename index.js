/* =====================================
   OMID COMMUNITY
   INDEX.JS
===================================== */



// ===============================
// ELEMENTS
// ===============================


const themeButton =
document.getElementById("themeButton");


const mobileMenu =
document.getElementById("mobileMenu");


const mobileNavigation =
document.getElementById("mobileNavigation");



const audioPlayer =
document.getElementById("audioPlayer");


const playMusic =
document.getElementById("playMusic");


const previousSong =
document.getElementById("previousSong");


const nextSong =
document.getElementById("nextSong");


const progressBar =
document.getElementById("progressBar");


const volumeControl =
document.getElementById("volumeControl");


const songTitle =
document.getElementById("songTitle");


const artistName =
document.getElementById("artistName");


const albumCover =
document.getElementById("albumCover");


const playlist =
document.getElementById("playlist");






// ===============================
// DARK / LIGHT MODE
// ===============================



let lightMode =
localStorage.getItem("theme")
===
"light";



function loadTheme(){


if(lightMode){


document.body.classList.add(
"light-mode"
);


themeButton.innerHTML =
`
<i class="fa-solid fa-sun"></i>
`;


}

}



loadTheme();






themeButton.addEventListener(
"click",
()=>{


lightMode =
!lightMode;



if(lightMode){


document.body.classList.add(
"light-mode"
);


localStorage.setItem(
"theme",
"light"
);



themeButton.innerHTML =
`
<i class="fa-solid fa-sun"></i>
`;


}

else{


document.body.classList.remove(
"light-mode"
);


localStorage.setItem(
"theme",
"dark"
);



themeButton.innerHTML =
`
<i class="fa-solid fa-moon"></i>
`;

}


});









// ===============================
// MOBILE MENU
// ===============================



mobileMenu.addEventListener(
"click",
()=>{


mobileNavigation.classList.toggle(
"show"
);


});









// ===============================
// MUSIC PLAYER
// ===============================



const songs = [


{

title:"Your Song 1",

artist:"OMID Music",

file:"music/song1.mp3",

cover:"music/covers/cover1.jpg"

},


{

title:"Your Song 2",

artist:"OMID Music",

file:"music/song2.mp3",

cover:"music/covers/cover2.jpg"

},


{

title:"Your Song 3",

artist:"OMID Music",

file:"music/song3.mp3",

cover:"music/covers/cover3.jpg"

}


];





let currentSong = 0;



function loadSong(index){


let song =
songs[index];


songTitle.textContent =
song.title;


artistName.textContent =
song.artist;


audioPlayer.src =
song.file;


albumCover.src =
song.cover;


}



loadSong(currentSong);









playMusic.addEventListener(
"click",
()=>{


if(audioPlayer.paused){


audioPlayer.play();


playMusic.innerHTML =
`
<i class="fa-solid fa-pause"></i>
`;


}

else{


audioPlayer.pause();


playMusic.innerHTML =
`
<i class="fa-solid fa-play"></i>
`;


}


});









nextSong.addEventListener(
"click",
()=>{


currentSong++;



if(currentSong >= songs.length)

currentSong=0;



loadSong(currentSong);

audioPlayer.play();


});







previousSong.addEventListener(
"click",
()=>{


currentSong--;



if(currentSong < 0)

currentSong =
songs.length-1;



loadSong(currentSong);

audioPlayer.play();


});








audioPlayer.addEventListener(
"timeupdate",
()=>{


progressBar.value =

(audioPlayer.currentTime /
audioPlayer.duration)
*
100;


});






progressBar.addEventListener(
"input",
()=>{


audioPlayer.currentTime =

(progressBar.value /
100)
*
audioPlayer.duration;


});






volumeControl.addEventListener(
"input",
()=>{


audioPlayer.volume =

volumeControl.value / 100;


});








// ===============================
// PLAYLIST GENERATOR
// ===============================



songs.forEach(
(song,index)=>{


let item =
document.createElement("div");



item.className =
"playlist-item";


item.innerHTML =
`
<i class="fa-solid fa-music"></i>

${song.title}

`;



item.onclick =
()=>{


currentSong=index;


loadSong(index);


audioPlayer.play();


};



playlist.appendChild(item);



});









// ===============================
// EMAILJS CONTACT FORM
// ===============================



const feedbackForm =
document.getElementById(
"feedbackForm"
);



feedbackForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const name =
document.getElementById(
"contactName"
).value;



const email =
document.getElementById(
"contactEmail"
).value;



const message =
document.getElementById(
"contactMessage"
).value;



emailjs.send(

"YOUR_SERVICE_ID",

"YOUR_TEMPLATE_ID",

{

name:name,

email:email,

message:message

}

)
.then(
()=>{


alert(
"Message sent successfully!"
);


feedbackForm.reset();


}

)
.catch(
(error)=>{


console.error(error);


alert(
"Failed to send message"
);


}

);



});









// ===============================
// SCROLL ANIMATION
// ===============================



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"fade-in"
);


}


});


},

{

threshold:.15

}

);






document
.querySelectorAll(
"section, .feature-card"
)
.forEach(
(element)=>{


observer.observe(element);


});







console.log(
"OMID homepage loaded successfully"
);
