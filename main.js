// =====================================
// OMID COMMUNITY
// main.js
// =====================================


// ===============================
// THEME SYSTEM
// ===============================


const themeButton = document.getElementById("themeButton");

let lightMode = false;



themeButton.addEventListener("click",()=>{


    lightMode = !lightMode;



    if(lightMode){


        document.documentElement.style.setProperty(
            "--background",
            "#e9f5ff"
        );


        document.documentElement.style.setProperty(
            "--text",
            "#111"
        );


        document.documentElement.style.setProperty(
            "--glass",
            "rgba(255,255,255,.55)"
        );


        themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';



    }
    else{


        document.documentElement.style.setProperty(
            "--background",
            "#050505"
        );


        document.documentElement.style.setProperty(
            "--text",
            "white"
        );


        document.documentElement.style.setProperty(
            "--glass",
            "rgba(255,255,255,.08)"
        );


        themeButton.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }


});







// ===============================
// PROFILE MENU
// ===============================


const profileButton =
document.getElementById("profileButton");


const profilePopup =
document.getElementById("profilePopup");



profileButton.addEventListener(
"click",
()=>{


    if(profilePopup.style.display==="block"){

        profilePopup.style.display="none";

    }

    else{

        profilePopup.style.display="block";

    }


});





document.addEventListener(
"click",
(e)=>{


    if(
        !profileButton.contains(e.target)
        &&
        !profilePopup.contains(e.target)
    ){

        profilePopup.style.display="none";

    }


});









// ===============================
// PROFILE IMAGE UPLOAD
// ===============================


const changePhoto =
document.getElementById("changePhoto");



const fileInput =
document.getElementById("fileInput");




changePhoto.addEventListener(
"click",
()=>{


    fileInput.click();


});






fileInput.addEventListener(
"change",
()=>{


    const file =
    fileInput.files[0];


    if(file){


        const imageURL =
        URL.createObjectURL(file);



        document.getElementById(
            "profileImage"
        ).src=imageURL;



        document.getElementById(
            "popupImage"
        ).src=imageURL;



    }


});








// ===============================
// EMOJI SYSTEM
// ===============================


const emojiButton =
document.getElementById("emojiButton");


const emojiPicker =
document.getElementById("emojiPicker");




emojiButton.addEventListener(
"click",
()=>{


    if(
        emojiPicker.style.display==="block"
    ){

        emojiPicker.style.display="none";

    }

    else{


        emojiPicker.style.display="block";



        loadDeviceEmojis();


    }



});






function loadDeviceEmojis(){


    emojiPicker.innerHTML = `

😀 😃 😄 😁 😂 😊 😎

❤️ 💙 💚 💛 💜

🔥 🚀 ⭐ 👍 👎

👋 🤝 🎉 💯

`;



}





// click emoji


emojiPicker.addEventListener(
"click",
(e)=>{


    if(e.target.textContent.trim()){


        messageInput.value +=
        e.target.textContent;


    }


});









// ===============================
// MESSAGE SYSTEM
// ===============================



const messageInput =
document.getElementById("messageInput");


const sendButton =
document.getElementById("sendButton");


const messages =
document.getElementById("messages");





function sendMessage(){


    const text =
    messageInput.value.trim();



    if(!text)
    return;



    const div =
    document.createElement("div");



    div.className =
    "message sent";



    div.textContent =
    text;



    messages.appendChild(div);



    messageInput.value="";



    messages.scrollTop =
    messages.scrollHeight;



}





sendButton.addEventListener(
"click",
sendMessage
);





messageInput.addEventListener(
"keydown",
(e)=>{


    if(e.key==="Enter"){


        sendMessage();


    }


});









// ===============================
// USER SEARCH READY
// ===============================


const searchInput =
document.getElementById("searchInput");



searchInput.addEventListener(
"input",
()=>{


    const value =
    searchInput.value.trim();



    if(value.startsWith("@")){


        console.log(
            "Searching user:",
            value
        );


        /*
        Later:

        Firebase query:

        users
        where userID == value

        */


    }


});









// ===============================
// UPLOAD BUTTON
// ===============================



const uploadButton =
document.getElementById("uploadButton");



uploadButton.addEventListener(
"click",
()=>{


    fileInput.click();


});









console.log(
"OMID Community loaded successfully"
);
