// =====================================
// OMID COMMUNITY CHAT
// main.js
// =====================================



// ==============================
// THEME SWITCHING
// ==============================


const themeButton = document.getElementById("themeButton");

let darkMode = true;



themeButton.addEventListener("click",()=>{


    darkMode = !darkMode;



    if(darkMode){


        document.body.style.background =
        "#050505";


        themeButton.innerHTML =
        '<i class="fa-solid fa-moon"></i>';



    }
    else{


        document.body.style.background =
        "linear-gradient(135deg,#dff6ff,#ffffff,#d9e8ff)";


        document.body.style.color =
        "#111";


        themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';


    }



});







// ==============================
// MESSAGE SYSTEM
// ==============================


const messageInput =
document.querySelector(".input-area input");



const sendButton =
document.querySelector(".send");



const messagesContainer =
document.querySelector(".messages");






function sendMessage(){


    const text =
    messageInput.value.trim();



    if(text === ""){

        return;

    }




    const message =
    document.createElement("div");



    message.classList.add(
        "message",
        "sent"
    );



    message.textContent =
    text;




    messagesContainer.appendChild(
        message
    );



    messageInput.value = "";



    scrollMessages();



}






// Button click

sendButton.addEventListener(
"click",
sendMessage
);




// Enter key

messageInput.addEventListener(
"keydown",
(event)=>{


    if(event.key === "Enter"){


        sendMessage();


    }


});






// ==============================
// AUTO SCROLL
// ==============================


function scrollMessages(){


    messagesContainer.scrollTop =
    messagesContainer.scrollHeight;


}



scrollMessages();







// ==============================
// USER PROFILE PLACEHOLDER
// READY FOR FIREBASE
// ==============================


const userProfile = {


    username:"Username",

    photo:
    "https://i.pravatar.cc/150"


};



// Later Firebase will replace this:



function loadUserProfile(){


    document.querySelector(
        ".profile-image"
    ).src =
    userProfile.photo;



    document.querySelector(
        ".profile-info h3"
    ).textContent =
    userProfile.username;



}



loadUserProfile();







// ==============================
// ONLINE STATUS ANIMATION
// ==============================


const status =
document.querySelector(".profile-info span");



setInterval(()=>{


    status.style.opacity =
    status.style.opacity === "0.4"
    ? "1"
    :"0.4";



},1200);







console.log(
"OMID Chat System Loaded"
);
