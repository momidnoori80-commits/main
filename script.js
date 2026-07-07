/* ==========================================
   OMID NOORI PORTFOLIO
   JAVASCRIPT PART 1
========================================== */



// ==========================
// PAGE LOADER
// ==========================


window.addEventListener("load", () => {


    const loader = document.querySelector(".page-loader");


    setTimeout(() => {


        loader.style.opacity = "0";


        loader.style.pointerEvents = "none";


        setTimeout(() => {


            loader.remove();


        },500);



    },800);



});







// ==========================
// MOBILE MENU
// ==========================


const menuButton = document.querySelector(".menu-button");

const mobileNav = document.querySelector(".mobile-nav");

const mobileLinks = document.querySelectorAll(".mobile-nav a");




menuButton.addEventListener("click", () => {


    mobileNav.classList.toggle("active");


    menuButton.classList.toggle("active");



});






// Close mobile menu after clicking a link


mobileLinks.forEach(link => {


    link.addEventListener("click", () => {


        mobileNav.classList.remove("active");


        menuButton.classList.remove("active");


    });


});









// ==========================
// DARK / LIGHT MODE
// ==========================


const themeCheckbox = document.querySelector("#theme-checkbox");

const body = document.body;



// Load saved theme


const savedTheme = localStorage.getItem("theme");



if(savedTheme === "light"){


    body.classList.add("light");


    themeCheckbox.checked = true;


}






themeCheckbox.addEventListener("change", () => {



    if(themeCheckbox.checked){


        body.classList.add("light");


        localStorage.setItem(
            "theme",
            "light"
        );



    }else{


        body.classList.remove("light");


        localStorage.setItem(
            "theme",
            "dark"
        );


    }



});






// ==========================
// HEADER SHADOW ON SCROLL
// ==========================


const header = document.querySelector(".header");



window.addEventListener("scroll", () => {



    if(window.scrollY > 50){


        header.style.background =
        "rgba(0,0,0,0.65)";



    }else{


        header.style.background =
        "rgba(0,0,0,0.25)";



    }



});
/* ==========================================
   JAVASCRIPT PART 2
   FINAL INTERACTIONS
========================================== */



// ==========================
// BACK TO TOP BUTTON
// ==========================


const backToTop = document.querySelector(".back-to-top");



window.addEventListener("scroll", () => {



    if(window.scrollY > 500){


        backToTop.classList.add("active");


    }else{


        backToTop.classList.remove("active");


    }



});





backToTop.addEventListener("click", () => {


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});









// ==========================
// ACTIVE NAVIGATION
// ==========================


const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(
    ".desktop-nav a, .mobile-nav a"
);




window.addEventListener("scroll", () => {



    let current = "";



    sections.forEach(section => {



        const sectionTop = section.offsetTop - 150;


        const sectionHeight = section.offsetHeight;



        if(
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ){


            current = section.getAttribute("id");


        }



    });






    navLinks.forEach(link => {



        link.classList.remove("active");



        if(
            link.getAttribute("href") === "#" + current
        ){


            link.classList.add("active");


        }



    });



});









// ==========================
// SMOOTH ANCHOR SCROLLING
// ==========================


document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {



    anchor.addEventListener(
        "click",
        function(e){



            const target =
            document.querySelector(
                this.getAttribute("href")
            );



            if(target){


                e.preventDefault();



                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });



            }



        }

    );



});









// ==========================
// REVEAL ANIMATION FALLBACK
// FOR MOBILE BROWSERS
// ==========================


const animatedElements =
document.querySelectorAll(
".glass-card, .skill-card, .project-card, .experience-card, .journey-item"
);




const observer =
new IntersectionObserver(
(entries)=>{



    entries.forEach(entry=>{



        if(entry.isIntersecting){



            entry.target.style.opacity="1";


            entry.target.style.transform=
            "translateY(0)";



            observer.unobserve(
                entry.target
            );



        }



    });



},
{

    threshold:0.15

});






animatedElements.forEach(element=>{


    element.style.opacity="0";


    element.style.transform=
    "translateY(50px)";


    element.style.transition=
    "opacity .7s ease, transform .7s ease";


    observer.observe(element);


});









// ==========================
// MOBILE HEIGHT FIX
// ANDROID CHROME
// ==========================


// Fixes 100vh issues on mobile browsers


function setMobileHeight(){


    document.documentElement.style
    .setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
    );


}



setMobileHeight();



window.addEventListener(
    "resize",
    setMobileHeight
);







// ==========================
// PREVENT DOUBLE TAP ZOOM
// ON BUTTONS
// ==========================


let lastTouchEnd = 0;



document.addEventListener(
"touchend",
function(event){


    const now =
    new Date().getTime();



    if(now - lastTouchEnd <= 300){


        event.preventDefault();


    }



    lastTouchEnd = now;



},
false
);








// ==========================
// CONSOLE MESSAGE
// ==========================


console.log(
`
Welcome to Mohammad Omid Noori's Portfolio.
Designed with HTML, CSS and JavaScript.
`
);
