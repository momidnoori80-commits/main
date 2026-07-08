/* =================================
   OMID PORTFOLIO JAVASCRIPT
================================= */


/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }

});




/* ==========================
   LIVE CLOCK
========================== */

const clock = document.getElementById("live-clock");


function updateClock() {

    if (!clock) return;

    const now = new Date();

    clock.textContent =
    now.toLocaleTimeString();

}


setInterval(updateClock, 1000);

updateClock();







/* ==========================
   TYPING ANIMATION
========================== */

const typingElement =
document.querySelector(".typing");


const words = [

    "Programmer",

    "Graphic Designer",

    "Technology Enthusiast",

    "Powerlifting Athlete",

    "Creative Learner"

];


let wordIndex = 0;

let letterIndex = 0;

let deleting = false;



function typingAnimation() {


    if (!typingElement) return;


    const currentWord =
    words[wordIndex];



    if (!deleting) {


        typingElement.textContent =
        currentWord.substring(
            0,
            letterIndex++
        );


        if (letterIndex > currentWord.length) {


            deleting = true;


            setTimeout(
                typingAnimation,
                1000
            );


            return;

        }


    } else {


        typingElement.textContent =
        currentWord.substring(
            0,
            letterIndex--
        );


        if (letterIndex < 0) {


            deleting = false;


            wordIndex++;


            if (wordIndex >= words.length) {

                wordIndex = 0;

            }


        }


    }



    setTimeout(

        typingAnimation,

        deleting ? 50 : 120

    );


}


typingAnimation();








/* ==========================
   DARK / LIGHT MODE
========================== */


const themeButton =
document.getElementById(
"theme-toggle"
);



if (themeButton) {


    themeButton.addEventListener(
    "click",
    () => {


        document.body.classList.toggle(
        "light-mode"
        );



        const icon =
        themeButton.querySelector("i");



        if (
        document.body.classList.contains(
        "light-mode")
        ) {


            icon.className =
            "fa-solid fa-sun";


        } else {


            icon.className =
            "fa-solid fa-moon";


        }


    });


}








/* ==========================
   MOBILE MENU
========================== */


const menuButton =
document.querySelector(".menu-btn");


const navLinks =
document.querySelector(".nav-links");



if (menuButton && navLinks) {


    menuButton.addEventListener(
    "click",
    () => {


        navLinks.classList.toggle(
        "active"
        );


    });


}




document.querySelectorAll(
".nav-links a"
)
.forEach(link => {


    link.addEventListener(
    "click",
    () => {


        navLinks.classList.remove(
        "active"
        );


    });


});








/* ==========================
   SCROLL ANIMATIONS
========================== */


const animatedElements =
document.querySelectorAll(
".glass-card, .section-title"
);



const observer =
new IntersectionObserver(

(entries) => {


entries.forEach(entry => {


    if(entry.isIntersecting){


        entry.target.classList.add(
        "show"
        );


    }


});


},

{

threshold:0.15

}

);



animatedElements.forEach(element => {

    observer.observe(element);

});








/* ==========================
   BACK TO TOP BUTTON
========================== */


const backButton =
document.getElementById(
"back-top"
);



window.addEventListener(
"scroll",
() => {


    if(!backButton) return;



    if(window.scrollY > 500){


        backButton.classList.add(
        "active"
        );


    }

    else{


        backButton.classList.remove(
        "active"
        );


    }


});





if(backButton){


    backButton.addEventListener(
    "click",
    () => {


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });


}








/* ==========================
   EMAILJS CONTACT FORM
========================== */


(function(){


    emailjs.init({

        publicKey:
        "ViuNUOQ_RYxORWZlc"

    });


})();






const contactForm =
document.getElementById(
"contact-form"
);




if(contactForm){


    contactForm.addEventListener(
    "submit",
    function(event){


        event.preventDefault();



        const button =
        contactForm.querySelector(
        "button"
        );



        button.innerHTML =
        "Sending...";





        emailjs.sendForm(

            "service_a5305nm",

            "template_fjyje18",

            this

        )



        .then(() => {



            button.innerHTML =
            "Message Sent ✓";



            contactForm.reset();




            setTimeout(() => {


                button.innerHTML =
                "Send Message";


            },3000);



        })



        .catch((error)=>{


            console.log(
            "EmailJS Error:",
            error
            );



            button.innerHTML =
            "Try Again";



            alert(
            "Message could not be sent. Please try again."
            );


        });



    });


}
/* ==========================
   BLOG SEARCH
========================== */


const searchInput =
document.getElementById("blog-search");


const blogCards =
document.querySelectorAll(".blog-card");



if(searchInput){


searchInput.addEventListener(
"input",
()=>{


const searchValue =
searchInput.value.toLowerCase();



blogCards.forEach(card=>{


const text =
card.textContent.toLowerCase();



if(text.includes(searchValue)){


card.style.display="block";


}

else{


card.style.display="none";


}


});


});


}
/* ==========================
   MUSIC PLAYER
========================== */


const musicButton =
document.querySelector(".music-toggle");

const musicPanel =
document.querySelector(".music-panel");

const closeMusic =
document.querySelector(".close-music");

const audio =
document.getElementById("audio-player");

const songs =
document.querySelectorAll(".song");

const playButton =
document.getElementById("play-song");

const previousButton =
document.getElementById("previous-song");

const nextButton =
document.getElementById("next-song");

const title =
document.getElementById("current-song");

const progress =
document.getElementById("progress");

const volume =
document.getElementById("volume");


let currentSong = 0;


const playlist = [

{
name:"navazesh-tataloo",
file:"navazesh.mp3"
},

{
name:"ahmad zahir; to ba yak dasht por az gol",
file:"tbydpag.mp3"
},

{
name:"shab ke mishe",
file:"skm.mp3"
}

];



if(musicButton && musicPanel){


musicButton.addEventListener("click",()=>{

musicPanel.classList.toggle("active");

});


}



if(closeMusic && musicPanel){


closeMusic.addEventListener("click",()=>{

musicPanel.classList.remove("active");

});


}




function loadSong(index){


if(!audio || !title) return;


currentSong=index;


audio.src =
playlist[index].file;


title.textContent =
playlist[index].name;


audio.play();


if(playButton){

playButton.innerHTML =
'<i class="fa-solid fa-pause"></i>';

}


}



songs.forEach((song,index)=>{


song.addEventListener("click",()=>{


loadSong(index);


});


});




if(playButton){


playButton.addEventListener("click",()=>{


if(audio.paused){

audio.play().catch(error=>{
    console.log("Playback blocked:", error);
});

playButton.innerHTML =
'<i class="fa-solid fa-pause"></i>';

}

else{

audio.pause();

playButton.innerHTML =
'<i class="fa-solid fa-play"></i>';

}


});


}




if(nextButton){


nextButton.addEventListener("click",()=>{


currentSong++;


if(currentSong >= playlist.length){

currentSong=0;

}


loadSong(currentSong);


});


}




if(previousButton){


previousButton.addEventListener("click",()=>{


currentSong--;


if(currentSong < 0){

currentSong=playlist.length-1;

}


loadSong(currentSong);


});


}




if(audio && progress){


audio.addEventListener("timeupdate",()=>{


progress.value =
(audio.currentTime / audio.duration) * 100 || 0;


});


}



if(progress && audio){


progress.addEventListener("input",()=>{


audio.currentTime =
(progress.value/100) * audio.duration;


});


}



if(volume && audio){


volume.addEventListener("input",()=>{


audio.volume =
volume.value;


});


}



if(audio && nextButton){


audio.addEventListener("ended",()=>{


nextButton.click();


});


}
