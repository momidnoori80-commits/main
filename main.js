// =====================================
// OMID COMMUNITY
// main.js
// =====================================



// ===============================
// ELEMENTS
// ===============================


const themeButton = document.getElementById("themeButton");

const profileButton = document.getElementById("profileButton");

const profilePopup = document.getElementById("profilePopup");

const changePhoto = document.getElementById("changePhoto");

const editUsername = document.getElementById("editUsername");

const editID = document.getElementById("editID");

const profileSettings = document.getElementById("profileSettings");

const logoutButton = document.getElementById("logout");


const profileImage = document.getElementById("profileImage");

const popupImage = document.getElementById("popupImage");


const displayName = document.getElementById("displayName");

const popupName = document.getElementById("popupName");


const displayID = document.getElementById("displayID");

const popupID = document.getElementById("popupID");



const fileInput = document.getElementById("fileInput");

const uploadButton = document.getElementById("uploadButton");


const emojiButton = document.getElementById("emojiButton");

const emojiPicker = document.getElementById("emojiPicker");


const messageInput = document.getElementById("messageInput");

const sendButton = document.getElementById("sendButton");

const messages = document.getElementById("messages");


const searchInput = document.getElementById("searchInput");






// ===============================
// USER DATA
// (Later replaced by Firebase)
// ===============================


let currentUser = {

    name:"Username",

    id:"@user001",

    photo:"default-avatar.png"

};







// ===============================
// DARK / LIGHT MODE
// ===============================


let lightMode = false;



themeButton.addEventListener(
"click",
()=>{


    lightMode = !lightMode;



    if(lightMode){


        document.documentElement.style.setProperty(
            "--background",
            "#eaf6ff"
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


profileButton.addEventListener(
"click",
()=>{


    profilePopup.style.display =

    profilePopup.style.display==="block"

    ? "none"

    : "block";


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
// CHANGE PROFILE PHOTO
// ===============================



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


        const url =
        URL.createObjectURL(file);



        profileImage.src=url;

        popupImage.src=url;



        currentUser.photo=url;


    }


});









// ===============================
// CHANGE USERNAME
// ===============================



editUsername.addEventListener(
"click",
()=>{


    let name =
    prompt(
        "Enter your new username:"
    );



    if(name && name.trim()){


        currentUser.name =
        name.trim();



        displayName.textContent =
        currentUser.name;



        popupName.textContent =
        currentUser.name;


    }


});









// ===============================
// CHANGE USER ID
// ===============================



editID.addEventListener(
"click",
()=>{


    let id =
    prompt(
        "Enter your new ID:"
    );



    if(!id)
    return;



    if(!id.startsWith("@")){


        alert(
        "ID must start with @"
        );


        return;


    }



    // Firebase uniqueness check will be added later


    currentUser.id=id;



    displayID.textContent=id;

    popupID.textContent=id;



    alert(
    "ID changed successfully"
    );


});









// ===============================
// SETTINGS
// ===============================



profileSettings.addEventListener(
"click",
()=>{


    alert(
    "Settings page coming soon"
    );


});









// ===============================
// LOGOUT
// ===============================



logoutButton.addEventListener(
"click",
()=>{


    alert(
    "Logout system will connect with Firebase"
    );


});









// ===============================
// EMOJI PICKER
// ===============================


emojiButton.addEventListener(
"click",
()=>{


    emojiPicker.style.display =

    emojiPicker.style.display==="block"

    ? "none"

    : "block";



    emojiPicker.innerHTML = `

😀 😃 😄 😁 😂 😊 😎

❤️ 🔥 🚀 👍 👋

🎉 ⭐ 💯 😍 🤝

`;



});





emojiPicker.addEventListener(
"click",
(e)=>{


    messageInput.value +=
    e.target.textContent;


});









// ===============================
// SEND MESSAGE
// ===============================



function sendMessage(){


    let text =
    messageInput.value.trim();



    if(!text)
    return;



    let message =
    document.createElement("div");



    message.className =
    "message sent";



    message.textContent=text;



    messages.appendChild(message);



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
// SEARCH USER ID
// ===============================



searchInput.addEventListener(
"input",
()=>{


    let value =
    searchInput.value.trim();



    if(value.startsWith("@")){


        console.log(
        "Searching:",
        value
        );


        /*
        Later:

        Firestore query:

        users
        where uniqueID == value

        */


    }


});









// ===============================
// UPLOAD BUTTON
// ===============================



uploadButton.addEventListener(
"click",
()=>{


    fileInput.click();


});








console.log(
"OMID Community JS loaded"
);
