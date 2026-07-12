/* =====================================
   OMID COMMUNITY
   MAIN.JS
   SUPABASE VERSION
===================================== */


import { supabase } from "./supabase.js";



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


const usersList =
document.getElementById("usersList");






// ===============================
// USER DATA
// ===============================


let currentUser = null;


let profileData = {

username:"",

user_id:"",

avatar_url:""

};







// ===============================
// AUTH CHECK
// ===============================


async function loadUser(){



const {

data,

error

}= await supabase.auth.getUser();




if(error || !data.user){


window.location.href =
"login.html";


return;


}




currentUser =
data.user;





const {

data:profile,

error:profileError

}= await supabase

.from("profiles")

.select("*")

.eq("id",currentUser.id)

.single();





if(profileError){


console.log(
"Profile loading error:",
profileError.message
);


return;


}





profileData = profile;


displayProfile();



console.log(
"User loaded:",
currentUser.email
);



}



loadUser();








// ===============================
// DISPLAY PROFILE
// ===============================


function displayProfile(){



if(displayName)

displayName.textContent =

profileData.username || "Username";




if(popupName)

popupName.textContent =

profileData.username || "Username";




if(displayID)

displayID.textContent =

"@" + (profileData.user_id || "user");




if(popupID)

popupID.textContent =

"@" + (profileData.user_id || "user");






if(profileData.avatar_url){


if(profileImage)

profileImage.src =
profileData.avatar_url;



if(popupImage)

popupImage.src =
profileData.avatar_url;



}



}






// ===============================
// LOGOUT
// ===============================


if(logoutButton){


logoutButton.onclick = async()=>{


await supabase.auth.signOut();


window.location.href =
"login.html";


};


}
// ===============================
// DARK / LIGHT MODE
// ===============================


let lightMode =

localStorage.getItem("community-theme")
===
"light";





function applyTheme(){



if(lightMode){


document.body.classList.add(
"light-mode"
);



if(themeButton)

themeButton.innerHTML =
`
<i class="fa-solid fa-sun"></i>
`;



}

else{


document.body.classList.remove(
"light-mode"
);



if(themeButton)

themeButton.innerHTML =
`
<i class="fa-solid fa-moon"></i>
`;



}



}




applyTheme();






if(themeButton){



themeButton.onclick = ()=>{


lightMode =
!lightMode;



localStorage.setItem(

"community-theme",

lightMode ?

"light"

:

"dark"

);



applyTheme();



};



}











// ===============================
// PROFILE POPUP
// ===============================



if(profileButton){



profileButton.onclick = ()=>{



if(profilePopup.style.display === "block"){


profilePopup.style.display =
"none";


}

else{


profilePopup.style.display =
"block";


}


};



}








// close popup when clicking outside


document.addEventListener(

"click",

(e)=>{


if(

profilePopup &&

profileButton &&

!profilePopup.contains(e.target)

&&

!profileButton.contains(e.target)

){


profilePopup.style.display =
"none";


}



}

);












// ===============================
// CHANGE USERNAME
// ===============================



if(editUsername){



editUsername.onclick = async()=>{



let newName =

prompt(
"Enter your new username"
);





if(!newName)

return;





const {

error

}= await supabase

.from("profiles")

.update({

username:newName

})

.eq(

"id",

currentUser.id

);






if(error){


alert(
error.message
);


return;


}






profileData.username =
newName;



displayProfile();



alert(
"Username updated successfully"
);



};



}









// ===============================
// CHANGE USER ID
// ===============================



if(editID){



editID.onclick = async()=>{



let newID =

prompt(
"Enter your new user ID"
);





if(!newID)

return;






newID =
newID.replace("@","");






const {

data:exists

}= await supabase

.from("profiles")

.select("id")

.eq(

"user_id",

newID

);






if(exists && exists.length > 0){


alert(
"This ID is already taken"
);


return;


}







const {

error

}= await supabase

.from("profiles")

.update({

user_id:newID

})

.eq(

"id",

currentUser.id

);







if(error){


alert(
error.message
);


return;


}







profileData.user_id =
newID;



displayProfile();



alert(
"User ID changed successfully"
);



};



}









// ===============================
// PROFILE IMAGE PREVIEW
// ===============================



if(changePhoto){



changePhoto.onclick = ()=>{


if(fileInput)

fileInput.click();



};



}






if(fileInput){



fileInput.onchange = ()=>{


const file =

fileInput.files[0];



if(!file)

return;





const preview =

URL.createObjectURL(file);





if(profileImage)

profileImage.src =
preview;



if(popupImage)

popupImage.src =
preview;





console.log(
"Image selected:",
file.name
);



// Supabase Storage upload
// will be added next



};



}
// ===============================
// EMOJI PICKER
// ===============================



const emojis = [

"😀",
"😃",
"😄",
"😂",
"🤣",
"😍",
"❤️",
"🔥",
"👍",
"👎",
"👏",
"🎉",
"🚀",
"😎",
"🤝",
"😭",
"😡",
"🤔"

];






if(emojiButton && emojiPicker){



emojiButton.onclick = ()=>{



emojiPicker.style.display =

emojiPicker.style.display === "block"

?

"none"

:

"block";





if(
emojiPicker.innerHTML === ""
){



emojis.forEach(
emoji=>{


const span =
document.createElement("span");


span.textContent =
emoji;


span.style.cursor =
"pointer";


span.style.fontSize =
"25px";


span.style.margin =
"5px";



span.onclick = ()=>{


messageInput.value += emoji;



};



emojiPicker.appendChild(span);



}

);



}



};



}











// ===============================
// SEND MESSAGE
// ===============================



async function sendMessage(){



const text =

messageInput.value.trim();





if(!text)

return;





if(!currentUser){


alert(
"Please login first"
);


return;


}







const messageBox =

document.createElement("div");



messageBox.className =
"message sent";



messageBox.textContent =
text;




messages.appendChild(
messageBox
);





messageInput.value = "";





messages.scrollTop =

messages.scrollHeight;





/*

Later this will insert into:

messages table

Example:

await supabase
.from("messages")
.insert({
sender_id:currentUser.id,
message:text
})


*/



}







if(sendButton){



sendButton.onclick =
sendMessage;



}







if(messageInput){



messageInput.onkeydown =
(e)=>{


if(e.key === "Enter"){


sendMessage();


}



};



}











// ===============================
// USER SEARCH
// ===============================



async function searchUsers(value){



if(!usersList)

return;




if(!value){


usersList.innerHTML = "";


return;


}





const {

data,

error

}= await supabase

.from("profiles")

.select(

"username,user_id,avatar_url"

)

.ilike(

"user_id",

`%${value}%`

)

.limit(10);







if(error){


console.log(error);


return;


}






usersList.innerHTML = "";







data.forEach(
(user)=>{



const card =

document.createElement("div");



card.className =
"user-card";




card.innerHTML =

`

<img src="${user.avatar_url || "default-avatar.png"}">


<div>

<h4>
${user.username}
</h4>


<p>
@${user.user_id}
</p>


</div>

`;





usersList.appendChild(card);





}

);





}










if(searchInput){



searchInput.oninput = ()=>{


const value =

searchInput.value

.trim()

.replace("@","");




searchUsers(value);



};



}
// ===============================
// REALTIME CHAT SYSTEM
// ===============================



let selectedUser = null;






// ===============================
// OPEN CHAT WITH USER
// ===============================



async function openChat(user){



selectedUser = user;



console.log(
"Chat opened with:",
user.user_id
);



// You can update your chat header here


const chatName =

document.getElementById(
"chatName"
);



const chatID =

document.getElementById(
"chatID"
);



const chatProfile =

document.getElementById(
"chatProfile"
);





if(chatName)

chatName.textContent =
user.username;



if(chatID)

chatID.textContent =
"@" + user.user_id;



if(chatProfile)

chatProfile.src =
user.avatar_url || "default-avatar.png";





loadMessages();



}









// ===============================
// LOAD OLD MESSAGES
// ===============================



async function loadMessages(){



if(!selectedUser || !currentUser)

return;






const {

data,

error

}= await supabase

.from("messages")

.select("*")

.or(

`and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedUser.id}),and(sender_id.eq.${selectedUser.id},receiver_id.eq.${currentUser.id})`

)

.order(

"created_at",

{

ascending:true

}

);







if(error){


console.log(
"Message error:",
error.message
);


return;


}







messages.innerHTML = "";







data.forEach(
(msg)=>{


const div =

document.createElement("div");



div.className =

msg.sender_id === currentUser.id

?

"message sent"

:

"message received";




div.textContent =
msg.message;



messages.appendChild(div);



}

);






messages.scrollTop =

messages.scrollHeight;



}











// ===============================
// SEND TO DATABASE
// ===============================



async function sendDatabaseMessage(){



const text =

messageInput.value.trim();





if(!text || !selectedUser)

return;






const {

error

}= await supabase

.from("messages")

.insert({


sender_id:

currentUser.id,



receiver_id:

selectedUser.id,



message:text



});






if(error){


console.log(error);


alert(
"Message failed"
);


return;


}






messageInput.value="";



loadMessages();



}









// replace previous send button


if(sendButton){


sendButton.onclick =
sendDatabaseMessage;


}









// ===============================
// REALTIME LISTENER
// ===============================



function startRealtime(){



supabase

.channel("messages-channel")

.on(

"postgres_changes",

{

event:"INSERT",

schema:"public",

table:"messages"

},

(payload)=>{



const msg =
payload.new;




if(

selectedUser &&

(

msg.sender_id === selectedUser.id ||

msg.receiver_id === selectedUser.id

)

){



loadMessages();



}



}

)

.subscribe();



}





startRealtime();











// ===============================
// CLICK USER CARD
// ===============================



document.addEventListener(

"click",

(e)=>{



const card =

e.target.closest(
".user-card"
);





if(card){



const id =

card.querySelector("p")

.textContent

.replace("@","");





supabase

.from("profiles")

.select("*")

.eq(

"user_id",

id

)

.single()

.then(

({data})=>{


if(data)

openChat(data);



}

);



}



}

);








console.log(
"OMID Community Supabase system ready 🚀"
);
