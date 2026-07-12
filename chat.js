// =====================================
// OMID COMMUNITY - PHONE VERIFICATION
// chat.js
// =====================================


// Import Firebase authentication

import { auth } from "./firebase.js";

import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";




// ================================
// HTML ELEMENTS
// ================================

const phoneInput = document.getElementById("phone");

const sendCodeBtn = document.getElementById("sendCode");

const verifyCodeBtn = document.getElementById("verifyCode");

const verificationInput = document.getElementById("verificationCode");

const codeSection = document.getElementById("code-section");




// ================================
// VARIABLES
// ================================

let confirmationResult = null;




// ================================
// CREATE RECAPTCHA
// ================================


window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
        size: "invisible",

        callback: () => {

            console.log(
                "reCAPTCHA completed"
            );

        },

        "expired-callback": () => {

            console.log(
                "reCAPTCHA expired"
            );

        }
    }
);





// ================================
// SEND SMS CODE
// ================================


sendCodeBtn.addEventListener(
"click",
async ()=>{


    const phoneNumber = phoneInput.value.trim();



    if(!phoneNumber){

        alert(
            "Please enter your phone number"
        );

        return;

    }



    sendCodeBtn.disabled = true;

    sendCodeBtn.innerText =
    "Sending...";



    try{


        confirmationResult =
        await signInWithPhoneNumber(
            auth,
            phoneNumber,
            window.recaptchaVerifier
        );



        console.log(
            "SMS sent successfully"
        );



        // Show verification box

        codeSection.style.display =
        "block";



        alert(
            "Verification code sent"
        );



    }



    catch(error){


        console.error(
            "SMS Error:",
            error
        );


        alert(
            error.message
        );



        // Reset captcha

        window.recaptchaVerifier =
        new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size:"invisible"
            }
        );


    }



    finally{


        sendCodeBtn.disabled = false;


        sendCodeBtn.innerText =
        "Send Verification Code";


    }



});







// ================================
// VERIFY SMS CODE
// ================================


verifyCodeBtn.addEventListener(
"click",
async ()=>{


    const code =
    verificationInput.value.trim();



    if(!code){


        alert(
            "Enter the SMS code"
        );


        return;


    }



    if(!confirmationResult){


        alert(
            "Please request a verification code first"
        );


        return;


    }



    try{


        const result =
        await confirmationResult.confirm(
            code
        );



        console.log(
            "Phone verified successfully",
            result.user.phoneNumber
        );



        alert(
            "Phone verified!"
        );



        // Go to your real chat website

        window.location.href =
        "main.html";



    }



    catch(error){


        console.error(
            "Verification error:",
            error
        );


        alert(
            "Invalid verification code"
        );


    }



});





// ================================
// PAGE LOADED
// ================================


console.log(
    "Phone verification system loaded"
);
