// =====================================
// OMID COMMUNITY
// main.js
// =====================================


import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


import {
    doc,
    getDoc,
    updateDoc,
    query,
    collection,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";




// ===============================
// ELEMENTS
// ===============================


const themeButton =
document.getElementById("themeButton");


const profileButton =
document.getElementById("profileButton");


const profilePopup =
document.getElementById("profilePopup");


const profileImage =
document.getElementById("profileImage");


const popupImage =
document.getElementById("popupImage");


const displayName =
document.getElementById("displayName");


const popupName =
document.getElementById("popupName");


const displayID =
document.getElementById("displayID");


const popupID =
document.getElementById("popupID");



const changePhoto =
document.getElementById("changePhoto");


const editUsername =
document.getElementById("editUsername");


const editID =
document.getElementById("editID");


const profileSettings =
document.getElementById("profileSettings");


const logoutButton =
document.getElementById("logout");



const fileInput =
document.getElementById("fileInput");



const emojiButton =
document.getElementById("emojiButton");


const emojiPicker =
document.getElementById("emojiPicker");



const messageInput =
document.getElementById("messageInput");


const sendButton =
document.getElementById("sendButton");


const messages =
document.getElementById("messages");



const searchInput =
document.getElementById("searchInput");







// ===============================
// CURRENT USER
// ===============================


let firebaseUser = null;

let userData = {

    username:"",
    userID:"",
    photoURL:""

};









// ===============================
// LOAD USER AFTER LOGIN
// ===============================


onAuthStateChanged(auth, async(user)=>{


    if(!user){


        window.location.href =
        "index.html";


        return;

    }



    firebaseUser = user;



    const userRef =
    doc(
        db,
        "users",
        user.uid
    );



    const snapshot =
    await getDoc(userRef);



    if(snapshot.exists()){


        userData =
        snapshot.data();



        displayProfile();


    }



});







function displayProfile(){



    displayName.textContent =
    userData.username || "User";


    popupName.textContent =
    userData.username || "User";



    displayID.textContent =
    userData.userID || "@unknown";


    popupID.textContent =
    userData.userID || "@unknown";



    if(userData.photoURL){


        profileImage.src =
        userData.photoURL;


        popupImage.src =
        userData.photoURL;


    }


}









// ===============================
// DARK LIGHT MODE
// ===============================



let lightMode=false;


themeButton.onclick=()=>{


    lightMode=!lightMode;



    if(lightMode){


        document.documentElement.style.setProperty(
        "--background",
        "#eaf6ff"
        );


        document.documentElement.style.setProperty(
        "--text",
        "#111"
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


        themeButton.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }


};









// ===============================
// PROFILE MENU
// ===============================


profileButton.onclick=()=>{


    profilePopup.style.display =

    profilePopup.style.display==="block"

    ?"none"

    :"block";


};









// ===============================
// CHANGE USERNAME
// ===============================


editUsername.onclick=async()=>{


    let name =
    prompt(
    "Enter new username"
    );



    if(!name)
    return;



    await updateDoc(

        doc(
            db,
            "users",
            firebaseUser.uid
        ),

        {

            username:name

        }

    );



    userData.username=name;


    displayProfile();


};









// ===============================
// CHANGE USER ID
// ===============================


editID.onclick=async()=>{


let id =
prompt(
"Enter new ID like @omid001"
);



if(!id.startsWith("@")){


    alert(
    "ID must start with @"
    );


    return;


}





const check =
query(

collection(db,"users"),

where(
"userID",
"==",
id
)

);



const result =
await getDocs(check);




if(!result.empty){


    alert(
    "This ID already exists"
    );


    return;


}






await updateDoc(

doc(
db,
"users",
firebaseUser.uid
),

{

userID:id

}

);



userData.userID=id;


displayProfile();



alert(
"ID changed successfully"
);



};









// ===============================
// PROFILE IMAGE
// ===============================


changePhoto.onclick=()=>{


fileInput.click();


};





fileInput.onchange=()=>{


const file =
fileInput.files[0];


if(file){


const url =
URL.createObjectURL(file);



profileImage.src=url;


popupImage.src=url;



// Firebase Storage will replace this later


}



};









// ===============================
// SETTINGS
// ===============================


profileSettings.onclick=()=>{


alert(
"Settings page coming soon"
);


};








// ===============================
// LOGOUT
// ===============================


logoutButton.onclick=()=>{


signOut(auth);


};








// ===============================
// EMOJI
// ===============================


emojiButton.onclick=()=>{


emojiPicker.style.display =

emojiPicker.style.display==="block"

?"none"

:"block";



emojiPicker.textContent =

"😀 😃 😄 😂 ❤️ 🔥 👍 👋 🚀 🎉 😎";


};





emojiPicker.onclick=(e)=>{


messageInput.value +=
e.target.textContent;


};









// ===============================
// MESSAGE
// ===============================


function sendMessage(){


let text =
messageInput.value.trim();



if(!text)
return;



let div =
document.createElement("div");



div.className =
"message sent";


div.textContent=text;



messages.appendChild(div);



messageInput.value="";


messages.scrollTop =
messages.scrollHeight;


}



sendButton.onclick =
sendMessage;



messageInput.onkeydown=(e)=>{


if(e.key==="Enter"){

sendMessage();

}


};









// ===============================
// SEARCH USER
// ===============================


searchInput.oninput=()=>{


let value =
searchInput.value.trim();



if(value.startsWith("@")){


console.log(
"Searching user:",
value
);


// Firebase user search will go here


}


};





console.log(
"OMID Community connected"
);
