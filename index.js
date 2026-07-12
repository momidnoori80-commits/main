/* =====================================
   OMID COMMUNITY
   INDEX.JS
===================================== */



// ===============================
// EMAILJS INITIALIZATION
// ===============================


emailjs.init({

publicKey:

"ViuNUOQ_RYxORWZlc"

});







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
localStorage.getItem("theme") === "light";



function loadTheme(){


if(lightMode && themeButton){


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





if(themeButton){


themeButton.onclick = ()=>{


lightMode=!lightMode;



document.body.classList.toggle(
"light-mode"
);



localStorage.setItem(

"theme",

lightMode ? "light" : "dark"

);



themeButton.innerHTML =

lightMode ?

`
<i class="fa-solid fa-sun"></i>
`

:

`
<i class="fa-solid fa-moon"></i>
`;



};


}









// ===============================
// MOBILE MENU
// ===============================



if(mobileMenu && mobileNavigation){


mobileMenu.onclick=()=>{


mobileNavigation.classList.toggle(
"show"
);


};


}









// ===============================
// MUSIC PLAYER
// ===============================



const songs=[


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





let currentSong=0;





function loadSong(index){


if(!audioPlayer)
return;


const song=songs[index];



if(songTitle)
songTitle.textContent=song.title;



if(artistName)
artistName.textContent=song.artist;



audioPlayer.src=song.file;



if(albumCover)
albumCover.src=song.cover;



}




if(audioPlayer)
loadSong(currentSong);









if(playMusic){


playMusic.onclick=()=>{


if(audioPlayer.paused){


audioPlayer.play();


playMusic.innerHTML=
`
<i class="fa-solid fa-pause"></i>
`;

}


else{


audioPlayer.pause();


playMusic.innerHTML=
`
<i class="fa-solid fa-play"></i>
`;

}


};


}








if(nextSong){


nextSong.onclick=()=>{


currentSong++;


if(currentSong>=songs.length)

currentSong=0;



loadSong(currentSong);


audioPlayer.play();



};


}







if(previousSong){


previousSong.onclick=()=>{


currentSong--;


if(currentSong<0)

currentSong=songs.length-1;



loadSong(currentSong);


audioPlayer.play();


};


}









if(audioPlayer && progressBar){


audioPlayer.addEventListener(
"timeupdate",
()=>{


if(audioPlayer.duration){


progressBar.value=

(audioPlayer.currentTime /
audioPlayer.duration)*100;


}


});


}





if(progressBar){


progressBar.oninput=()=>{


audioPlayer.currentTime=

(progressBar.value/100)
*
audioPlayer.duration;


};


}





if(volumeControl){


volumeControl.oninput=()=>{


audioPlayer.volume=

volumeControl.value/100;


};


}









// ===============================
// PLAYLIST
// ===============================



if(playlist){


songs.forEach(
(song,index)=>{


const item=document.createElement("div");


item.className="playlist-item";


item.innerHTML=

`
<i class="fa-solid fa-music"></i>
${song.title}
`;



item.onclick=()=>{


currentSong=index;


loadSong(index);


audioPlayer.play();


};



playlist.appendChild(item);



});


}









// ===============================
// EMAILJS CONTACT FORM
// ===============================



const feedbackForm =

document.getElementById(
"feedbackForm"
);





if(feedbackForm){


feedbackForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();





try{



await emailjs.send(


"service_a5305nm",


"template_fjyje18",


{


from_name:

document.getElementById(
"contactName"
).value,



from_email:

document.getElementById(
"contactEmail"
).value,



message:

document.getElementById(
"contactMessage"
).value


}



);





alert(
"Message sent successfully!"
);



feedbackForm.reset();



}

catch(error){


console.error(error);


alert(
"Failed to send message"
);



}



});


}










// ===============================
// SCROLL ANIMATION
// ===============================



const observer=

new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


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
"section,.feature-card"
)
.forEach(element=>{


observer.observe(element);


});






console.log(
"OMID homepage loaded successfully"
);
