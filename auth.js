/* =====================================
   OMID COMMUNITY
   SUPABASE AUTH SYSTEM
===================================== */


import { supabase } from "./supabase.js";




// ===============================
// ELEMENTS
// ===============================


const signupBtn =
document.getElementById("signupBtn");


const loginBtn =
document.getElementById("loginBtn");


const googleBtn =
document.getElementById("googleBtn");







// ===============================
// SIGN UP WITH EMAIL
// ===============================



if(signupBtn){


signupBtn.onclick = async()=>{


const username =
document.getElementById("username").value.trim();


const email =
document.getElementById("email").value.trim();


const password =
document.getElementById("password").value;




if(!username || !email || !password){


alert(
"Please fill all fields"
);


return;


}




if(password.length < 6){


alert(
"Password must be at least 6 characters"
);


return;


}





const {
data,
error

}= await supabase.auth.signUp({

email,

password,


options:{


data:{


username:username


}


}


});






if(error){


alert(error.message);

return;


}





const user =
data.user;






if(user){



const {error:profileError}=

await supabase

.from("profiles")

.insert({


id:user.id,


username:username,


email:email,


avatar:"default-avatar.png",


created_at:new Date()


});





if(profileError){


console.log(profileError.message);


}





alert(
"Account created successfully!"
);



location.href="main.html";



}



};



}









// ===============================
// LOGIN WITH EMAIL
// ===============================




if(loginBtn){



loginBtn.onclick = async()=>{


const email =

document.getElementById("email").value;



const password =

document.getElementById("password").value;





if(!email || !password){


alert(
"Enter email and password"
);


return;


}





const {

data,

error

}=await supabase.auth.signInWithPassword({


email,

password


});






if(error){


alert(error.message);


return;


}




location.href="main.html";



};



}









// ===============================
// GOOGLE AUTH
// ===============================




if(googleBtn){



googleBtn.onclick = async()=>{



const {data,error}=

await supabase.auth.signInWithOAuth({


provider:"google",


options:{



redirectTo:

window.location.origin+
"/main.html"



}



});





if(error){


alert(error.message);


}



};



}









// ===============================
// CHECK USER SESSION
// ===============================




async function checkUser(){



const {

data

}=

await supabase.auth.getSession();





if(data.session){


console.log(
"User logged in:",
data.session.user.email
);


}


}



checkUser();






console.log(
"OMID Authentication Loaded Successfully"
);
