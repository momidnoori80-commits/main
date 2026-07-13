/* =====================================
   OMID COMMUNITY
   MAIN.JS
   SUPABASE PROFESSIONAL VERSION

   PART 1/4
===================================== */


import { supabase } from "./supabase.js";




// =====================================
// DOM ELEMENTS
// =====================================



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



const logoutButton =
document.getElementById("logout");



const editUsername =
document.getElementById("editUsername");



const editID =
document.getElementById("editID");



const changePhoto =
document.getElementById("changePhoto");



const fileInput =
document.getElementById("fileInput");



const profileSettings =
document.getElementById("profileSettings");





const searchInput =
document.getElementById("searchInput");



const usersList =
document.getElementById("usersList");





const chatName =
document.getElementById("chatName");



const chatID =
document.getElementById("chatID");



const chatProfile =
document.getElementById("chatProfile");



const messages =
document.getElementById("messages");



const messageInput =
document.getElementById("messageInput");



const sendButton =
document.getElementById("sendButton");



const emojiButton =
document.getElementById("emojiButton");



const emojiPicker =
document.getElementById("emojiPicker");







// =====================================
// GLOBAL DATA
// =====================================



let currentUser = null;



let profileData = {

id:"",

username:"",

user_id:"",

email:"",

avatar_url:"",

created_at:""

};




let selectedUser = null;









// =====================================
// LOAD AUTH SESSION
// =====================================



async function loadUser(){



try{


const {

data:{
session

},

error

}

=

await supabase.auth.getSession();





if(error){


console.error(
"Session error:",
error.message
);


return;


}






if(!session){


console.log(
"No active login session"
);


// Do NOT redirect here
// prevents reload loop


return;


}





currentUser =
session.user;







console.log(
"Logged user:",
currentUser.email
);






await loadProfile();





}

catch(error){


console.error(
"Auth loading failed:",
error
);


}



}











// =====================================
// LOAD PROFILE
// =====================================



async function loadProfile(){



const {

data,

error

}

=

await supabase

.from("profiles")

.select("*")

.eq(

"id",

currentUser.id

)

.single();







if(error){


console.error(
"Profile error:",
error.message
);


return;


}







profileData = data;



displayProfile();





}












// =====================================
// DISPLAY PROFILE
// =====================================



function displayProfile(){



if(displayName)

displayName.textContent =

profileData.username ||

"Username";





if(popupName)

popupName.textContent =

profileData.username ||

"Username";







if(displayID)

displayID.textContent =

"@" +

(profileData.user_id || "user");







if(popupID)

popupID.textContent =

"@" +

(profileData.user_id || "user");








if(profileData.avatar_url){



if(profileImage)

profileImage.src =

profileData.avatar_url;





if(popupImage)

popupImage.src =

profileData.avatar_url;



}



}











// =====================================
// START APPLICATION
// =====================================



loadUser();





console.log(
"OMID Community Core Loaded 🚀"
);

/* =====================================
   PART 2
   PROFILE + THEME SYSTEM
===================================== */







// =====================================
// DARK / LIGHT MODE
// =====================================



let lightMode =

localStorage.getItem(
"community-theme"
)

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

lightMode

?

"light"

:

"dark"

);





applyTheme();




};



}









// =====================================
// PROFILE POPUP
// =====================================



if(profileButton){



profileButton.onclick = ()=>{



if(
profilePopup.style.display === "block"
){



profilePopup.style.display =
"none";



}

else{



profilePopup.style.display =
"block";



}



};



}







// Close popup outside click



document.addEventListener(

"click",

(event)=>{



if(

profilePopup &&

profileButton &&

!

profilePopup.contains(event.target)

&&

!

profileButton.contains(event.target)

){



profilePopup.style.display =
"none";


}



}

);











// =====================================
// CHANGE USERNAME
// =====================================



if(editUsername){



editUsername.onclick = async()=>{



if(!currentUser){

alert(
"Please login first"
);

return;

}





const newName =

prompt(
"Enter your new username"
);





if(!newName)

return;







const {

error

}

=

await supabase

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











// =====================================
// CHANGE USER ID
// =====================================



if(editID){



editID.onclick = async()=>{





const newID =

prompt(

"Enter new User ID"

);






if(!newID)

return;






const cleanID =

newID

.replace("@","")

.trim();








const {

data:existing

}

=

await supabase

.from("profiles")

.select("id")

.eq(

"user_id",

cleanID

);






if(existing && existing.length){



alert(
"This User ID is already taken"
);



return;



}







const {

error

}

=

await supabase

.from("profiles")

.update({

user_id:cleanID

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
cleanID;




displayProfile();




alert(
"User ID updated"
);





};



}











// =====================================
// PROFILE IMAGE UPLOAD
// =====================================

if(changePhoto){

changePhoto.onclick = ()=>{

if(fileInput)
fileInput.click();

};

}



if(fileInput){


fileInput.onchange = async()=>{


const file = fileInput.files[0];


if(!file)
return;



// Allow only images

const allowedTypes = [
"image/jpeg",
"image/png",
"image/jpg",
"image/heif"
];


if(!allowedTypes.includes(file.type)){


alert(
"Only JPG, JPEG, PNG and HEIF images are allowed"
);


return;


}



if(!currentUser){


alert(
"User not logged in"
);


return;


}



// Correct storage path

const filePath =

`${currentUser.id}/avatar-${Date.now()}.${file.name.split(".").pop()}`;





// Upload

const {

data,

error:uploadError

}

=

await supabase.storage

.from("avatars")

.upload(

filePath,

file,

{

upsert:true

}

);





if(uploadError){


console.error(uploadError);


alert(
uploadError.message
);


return;


}






// Get public URL

const {

data:urlData

}

=

supabase.storage

.from("avatars")

.getPublicUrl(

filePath

);





const avatarURL =
urlData.publicUrl;





// Save URL in profile table

const {

error:updateError

}

=

await supabase

.from("profiles")

.update({

avatar_url:avatarURL

})

.eq(

"id",

currentUser.id

);





if(updateError){


alert(updateError.message);


return;


}






profileData.avatar_url =
avatarURL;


displayProfile();





alert(
"Profile photo updated successfully 🚀"
);



};


}











// =====================================
// SETTINGS BUTTON
// =====================================



if(profileSettings){



profileSettings.onclick = ()=>{



alert(

"Settings system coming soon 🚀"

);



};



}







// =====================================
// LOGOUT
// =====================================



if(logoutButton){



logoutButton.onclick = async()=>{



await supabase.auth.signOut();



window.location.href =
"login.html";



};



}

 /* =====================================
   PART 3
   USER SEARCH + CHAT SYSTEM
===================================== */







// =====================================
// SEARCH USERS
// =====================================



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

}

=

await supabase

.from("profiles")

.select(

"id,username,user_id,avatar_url"

)

.ilike(

"user_id",

`%${value}%`

)

.limit(20);







if(error){



console.log(
"Search error:",
error.message
);



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

<img src="${

user.avatar_url ||

"default-avatar.png"

}">



<div>


<h4>

${user.username || "User"}

</h4>



<p>

@${user.user_id}

</p>



</div>


`;







card.onclick = ()=>{


openChat(user);


};







usersList.appendChild(card);





}



);



}









if(searchInput){



searchInput.addEventListener(

"input",

()=>{



const value =

searchInput.value

.trim()

.replace("@","");





searchUsers(value);



}

);



}











// =====================================
// OPEN CHAT
// =====================================



async function openChat(user){



if(!currentUser)

return;






selectedUser = user;






if(chatName)

chatName.textContent =

user.username || "User";





if(chatID)

chatID.textContent =

"@" + user.user_id;






if(chatProfile)

chatProfile.src =

user.avatar_url ||

"default-avatar.png";







console.log(

"Chat opened:",

user.username

);






await loadMessages();





}













// =====================================
// LOAD MESSAGES
// =====================================



async function loadMessages(){



if(

!currentUser ||

!selectedUser

)

return;







const {

data,

error

}

=

await supabase

.from("messages")

.select("*")

.or(

`

and(

sender_id.eq.${currentUser.id},

receiver_id.eq.${selectedUser.id}

),

and(

sender_id.eq.${selectedUser.id},

receiver_id.eq.${currentUser.id}

)

`

)

.order(

"created_at",

{

ascending:true

}

);








if(error){



console.log(

"Loading messages failed:",

error.message

);



return;


}







messages.innerHTML = "";







data.forEach(

(msg)=>{



createMessageBubble(msg);



}

);








messages.scrollTop =

messages.scrollHeight;





}













// =====================================
// CREATE MESSAGE ELEMENT
// =====================================



function createMessageBubble(message){





const div =

document.createElement("div");






if(

message.sender_id === currentUser.id

){



div.className =

"message sent";


}

else{



div.className =

"message received";


}







div.textContent =

message.message;







messages.appendChild(div);



}












// =====================================
// SEND MESSAGE TO DATABASE
// =====================================



async function sendMessage(){



const text =

messageInput.value.trim();







if(!text)

return;







if(!selectedUser){



alert(

"Select a user first"

);



return;



}







const {

error

}

=

await supabase

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







messageInput.value = "";





}









if(sendButton){



sendButton.onclick =
sendMessage;



}









if(messageInput){



messageInput.addEventListener(

"keydown",

(e)=>{



if(

e.key === "Enter"

){



sendMessage();



}



}

);



}











// =====================================
// EMOJI PICKER
// =====================================



const emojiList = [


"😀",
"😃",
"😂",
"🤣",
"😍",
"❤️",
"🔥",
"👍",
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



if(
emojiPicker.style.display === "block"

){



emojiPicker.style.display =
"none";

return;

}





emojiPicker.style.display =
"block";







if(
emojiPicker.innerHTML === ""
){



emojiList.forEach(

emoji=>{



const button =

document.createElement("span");



button.textContent =
emoji;



button.className =
"emoji";



button.onclick = ()=>{



messageInput.value += emoji;



};




emojiPicker.appendChild(button);



}

);



}



};



}

/* =====================================
   PART 4
   REALTIME + FINAL SYSTEM
===================================== */







// =====================================
// SUPABASE REALTIME CHAT
// =====================================



function startRealtime(){



supabase

.channel(
"omid-community-messages"
)

.on(

"postgres_changes",

{

event:"INSERT",

schema:"public",

table:"messages"

},

(payload)=>{



const newMessage =

payload.new;







if(

!selectedUser ||

!currentUser

)

return;







if(

(

newMessage.sender_id === currentUser.id &&

newMessage.receiver_id === selectedUser.id

)

||

(

newMessage.sender_id === selectedUser.id &&

newMessage.receiver_id === currentUser.id

)

)

{



loadMessages();



}



}



)

.subscribe(

(status)=>{



console.log(

"Realtime status:",

status

);



}

);



}








startRealtime();









// =====================================
// AUTO UPDATE SESSION
// =====================================



supabase.auth.onAuthStateChange(

(event,session)=>{



console.log(

"Auth event:",

event

);



if(

event === "SIGNED_OUT"

){



window.location.href =
"login.html";


}



}

);












// =====================================
// CLICK OUTSIDE EMOJI CLOSE
// =====================================



document.addEventListener(

"click",

(e)=>{



if(

emojiPicker &&

emojiButton &&

!

emojiPicker.contains(e.target)

&&

!

emojiButton.contains(e.target)

){



emojiPicker.style.display =
"none";



}



}

);











// =====================================
// PROTECT AGAINST EMPTY VALUES
// =====================================



window.addEventListener(

"beforeunload",

()=>{


console.log(

"OMID Community closing"

);


}

);









// =====================================
// FINAL CHECK
// =====================================



console.log(

`

🚀 OMID COMMUNITY READY

User:
${currentUser?.email || "Waiting..."}

Supabase:
Connected

Realtime:
Enabled

`

);
