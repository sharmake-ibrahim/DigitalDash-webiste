import {
    Modal,
    Accordion,
    SignupFormValidator,
    LoginFormValidator,
    ResetPasswordValidator,
    ResetPasswordForm
} from "./classes.js";

function initModal(button, className, text) {
    const modal = new Modal(button, className, text);
    modal.showModal();
}

let currentlyOpenAccordion = null;
let currentlyOpenButton = null;

function initAccordion(clickedButton, id, height, text) {
    const existingAccordion = document.getElementById(id);

    if (clickedButton === currentlyOpenButton && existingAccordion && existingAccordion.style.display !== 'none') {
        const acc = new Accordion(clickedButton, id, height, "");
        acc.hideAccordion(currentlyOpenAccordion);
        currentlyOpenAccordion = null;
        currentlyOpenButton = null;
        return;
    }

    if (currentlyOpenAccordion) {
        const prev = new Accordion(currentlyOpenButton, currentlyOpenAccordion.id, height, "");
        prev.hideAccordion(currentlyOpenAccordion);
    }

    const acc = new Accordion(clickedButton, id, height, text);
    const newAccordion = acc.showAccordion();

    currentlyOpenAccordion = newAccordion;
    currentlyOpenButton = clickedButton;
}

function showPasswords() {
    const buttons = document.getElementsByClassName('show_password');

    Array.from(buttons).forEach(button => {
        if (!button || !button.parentElement) return;

        button.style.display = "none";

        const input = button.parentElement.firstElementChild;
        if (!input) return;

        input.addEventListener("input", (event) => {
            button.style.display = event.currentTarget.value ? "block" : "none";
        });

        button.addEventListener("click", (event) => {
            const input = event.currentTarget.parentElement?.firstElementChild;
            if (input) {
                input.type = input.type === "password" ? "text" : "password";
            }
        });
    });
}

showPasswords();

window.initModal = initModal;
window.initAccordion = initAccordion;

if (document.getElementById('resetpwdfrm')) {
    const resetForm = document.querySelector('form[action*="reset-password.inc.php"]');
    if (resetForm) {
        new ResetPasswordForm('resetpwdfrm');
    } else {
        new ResetPasswordValidator('resetpwdfrm');
    }
}

if (document.getElementById('signupfrm')) {
    new SignupFormValidator('signupfrm');
}

if (document.getElementById('loginfrm')) {
    new LoginFormValidator('loginfrm');
}

document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-background video');
    if (!videos || videos.length === 0) return; // Guard clause if no videos found

    let currentVideoIndex = 0;

    function switchVideo() {
        if (!videos[currentVideoIndex]) return; // Guard against undefined video
        videos[currentVideoIndex].classList.remove('active');

        setTimeout(() => {
            videos[currentVideoIndex].currentTime = 0;

            currentVideoIndex = (currentVideoIndex + 1) % videos.length;

            // Start new video from beginning and show it
            videos[currentVideoIndex].currentTime = 0;
            videos[currentVideoIndex].play().catch((e) => {
                if (e.name !== 'AbortError') {
                    console.warn('Video play error:', e);
                }
            });
            videos[currentVideoIndex].classList.add('active');
        }, 1000);
    }

    if (videos[0]) {
        videos[0].play().catch((e) => {
            if (e.name !== 'AbortError') {
                console.warn('Video play error:', e);
            }
        });

        videos[0].classList.add('active');
    }

    videos.forEach((video, index) => {
        if (index !== 0) {
            video.pause();
            video.currentTime = 0;
        }
    });

    setInterval(switchVideo, 10000);
});

document.addEventListener("click", function (event) {
    const hbmContent = document.querySelector(".hbm-content");
    const overlay = document.querySelector("#hamburger .overlay");

    if (!hbmContent || !overlay) return;

    if (event.target.closest("#open-hbm")) {
        hbmContent.classList.add("active");
        overlay.style.display = "block";
    }

    if (event.target.closest(".close-hbm") || event.target === overlay) {
        hbmContent.classList.remove("active");
        overlay.style.display = "none";
    }
});

window.addEventListener("resize", function () {
    const hbmContent = document.querySelector(".hbm-content");
    const overlay = document.querySelector("#hamburger .overlay");

    if (window.innerWidth > 1080 && hbmContent?.classList.contains("active")) {
        hbmContent.classList.remove("active");
        if (overlay) overlay.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.querySelector('.profile__menu');

    if (profileBtn) {
        const userContent = profileBtn.querySelector('.user-content');

        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            userContent.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!profileBtn.contains(e.target)) {
                userContent.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                userContent.classList.remove('active');
            }
        });
    }
});

// Account Settings
const handleAccount_Settings = () => {
    const fName = document.getElementById("fname");
    const lName = document.getElementById("lname");
    const password = document.getElementById("password");
    const Email = document.getElementById("Email");

    const SaveBtn = document.querySelector(".save-btn");
    const EditBtn = document.querySelector('.edit-btn');

    const handleReadOnly = (...fields) => {
        fields.forEach((field) => {
            if (field.value.trim() !== "") {
                field.readOnly = true;
            } else {
                field.style.border = "2px solid red";
                setTimeout(() => {
                    field.style.border = "";
                }, 2000);
            }
        });
    }

    const handleEdit = (...fields) => {
        fields.forEach((field) => {
            if (field.value.trim() !== "") {
                field.readOnly = false;
            }
        });
    }

    SaveBtn.addEventListener("click", () => {
        handleReadOnly(fName, lName, password, Email);
    });

    EditBtn.addEventListener("click", () => {
        handleEdit(fName, lName, password, Email);
    });
}

document.addEventListener("DOMContentLoaded", handleAccount_Settings);

/**
 * 
 * THEME SWITCHER SCRIPT
 * 
*/

// document.addEventListener("DOMContentLoaded", () => {


//     const button = document.getElementById("theme-switcher");
//     let Li = document.querySelector(".bi")
//     let logo = document.querySelector(".logo-img");
//      let root = document.querySelector(":root");

//     button.addEventListener("click", (event) => {
//         console.log("Theme switcher has been clicked!");
//                 root.classList.toggle("light")
//         if (Li.classList.contains("bi-brightness-low-fill")) {
//             Li.classList.remove("bi-brightness-low-fill")
//             Li.classList.add( "bi-moon-stars-fill")
         
//              logo.src = " assets/images/logo/logo_black_white.webp";
             
//         } 
//         else {
//               Li.classList.remove("bi-moon-stars-fill")
//             Li.classList.add( "bi-brightness-low-fill")
//               logo.src = " assets/images/logo/logo_color_transparent_png.png";
    
             
//         }
//     })
// });

    function changeTheme() {
          let prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
      
        //  let Li = document.querySelector(".bi")
         let logo = document.getElementById("logo");
     if (prefersDark) {
        // logo.src = "assets/images/logo/logo_black_white_green.webp";
        logo.src = "assets/images/logo/logo_black_white_green.webp";
        } 
    }

    changeTheme();

    const button = document.getElementById("theme-switcher");
    let Li = document.querySelector(".bi")
    let logo = document.querySelector(".logo-img");

    button.addEventListener("click", (event) => {
      
        if (Li.classList.contains("bi-brightness-low-fill")) {
            Li.classList.remove("bi-brightness-low-fill")
            Li.classList.add("bi-moon-stars-fill")

            logo.src = " assets/images/logo/logo_black_white.webp";

        }
        else {
            Li.classList.remove("bi-moon-stars-fill")
            Li.classList.add("bi-brightness-low-fill")
            logo.src = " assets/images/logo/logo_color_transparent_png.png";


        }
    })

