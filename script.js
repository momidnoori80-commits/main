/* =====================================
   OMID PORTFOLIO WEBSITE
   COMPLETE JAVASCRIPT
===================================== */


/* ===============================
   DARK / LIGHT MODE
================================ */


const themeToggle = document.getElementById("theme-toggle");


if(themeToggle){

    const savedTheme = localStorage.getItem("theme");


    if(savedTheme === "light"){

        document.body.classList.add("light");

        themeToggle.checked = true;

    }



    themeToggle.addEventListener("change",()=>{


        document.body.classList.toggle("light");


        if(document.body.classList.contains("light")){

            localStorage.setItem("theme","light");

        }

        else{

            localStorage.setItem("theme","dark");

        }


    });

}





/* ===============================
   QUICK MENU SCROLL
================================ */


const menuCards = document.querySelectorAll(".menu-card");


menuCards.forEach(card=>{


    card.addEventListener("click",()=>{


        let target = card.getAttribute("data-target");


        let section = document.getElementById(target);


        if(section){

            section.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});







/* ===============================
   NAVIGATION ACTIVE EFFECT
================================ */


const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");



window.addEventListener("scroll",()=>{


    let current="";


    sections.forEach(section=>{


        let top = section.offsetTop - 200;


        if(scrollY >= top){

            current = section.id;

        }


    });



    navLinks.forEach(link=>{


        link.style.color="";


        if(link.getAttribute("href") === "#" + current){


            link.style.color="var(--main-color)";


        }


    });



});







/* ===============================
   TYPING ANIMATION
================================ */


const typing = document.querySelector(".typing");


if(typing){


const words=[

"Powerlifter",

"Wrestler",

"Web Developer",

"Creative Thinker"

];


let wordIndex=0;

let charIndex=0;

let deleting=false;



function typeEffect(){


let word = words[wordIndex];



if(!deleting){


typing.textContent =
word.substring(0,charIndex++);



if(charIndex > word.length){


deleting=true;

setTimeout(typeEffect,1000);

return;


}



}

else{


typing.textContent =
word.substring(0,charIndex--);



if(charIndex < 0){


deleting=false;

wordIndex++;


if(wordIndex >= words.length){

wordIndex=0;

}


}



}



setTimeout(typeEffect,100);


}



typeEffect();


}









/* ===============================
   VISITOR LOCAL CLOCK
================================ */


function updateClock(){


const now = new Date();



const dateElement =
document.getElementById("date");


const timeElement =
document.getElementById("time");



if(dateElement){


dateElement.textContent =
now.toLocaleDateString(undefined,{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

});


}



if(timeElement){


timeElement.textContent =
now.toLocaleTimeString();


}



}



setInterval(updateClock,1000);


updateClock();








/* ===============================
   COPY BUTTON SYSTEM
================================ */


const copyButtons =
document.querySelectorAll(".copy-btn");



copyButtons.forEach(button=>{


button.addEventListener("click",async()=>{


const text =
button.getAttribute("data-copy");



try{


await navigator.clipboard.writeText(text);



const old =
button.innerHTML;



button.innerHTML =

`
<i class="fa-solid fa-check"></i>
Text Copied!
`;



button.style.transform =
"scale(1.08)";



setTimeout(()=>{


button.innerHTML=old;


button.style.transform="";


},2000);



}


catch(error){


alert("Copy failed. Please copy manually.");


}



});


});








/* ===============================
   PROFILE 3D MOVEMENT
================================ */


const profile =
document.querySelector(".profile-container");



if(profile){


window.addEventListener("mousemove",(event)=>{


let x =
(window.innerWidth/2 - event.clientX)/50;


let y =
(window.innerHeight/2 - event.clientY)/50;



profile.style.transform =
`rotateY(${x}deg) rotateX(${y}deg)`;



});


}








/* ===============================
   PAGE LOAD EFFECT
================================ */


window.addEventListener("load",()=>{


document.body.style.opacity="1";


});