// Check If there is local Storage
let mainColors = localStorage.getItem("color_option");
// console.log(mainColors);

if (mainColors !== null) {
  // console.log("Local Storage is Not Empty You can Set It in Root Now");
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove  Active Class Form All colors List item
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");

    if (el.dataset.color === mainColors) {
      //  Add Active Class
      el.classList.add("active");
    }
  });
}
// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// Check If there's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  // console.log(backgroundLocalItem);
  // console.log(typeof backgroundLocalItem); // String Not Boolean

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-background span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Toggle spin class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Random BackGround Option
const randomBackgroundsEl = document.querySelectorAll(
  ".random-background span"
);

// Loop On all Spans
randomBackgroundsEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      //change Background Image Url
      landingPage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`; // 'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // SKills Offset top
  let skillsOffsetTop = ourSkills.offsetTop; // Height Over Skill Section
  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight; // Height of Skill Section
  // Window Height
  let windowHeight = this.innerHeight;
  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // THen You Have Reached Skills Section
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With the image
let ourGalary = document.querySelectorAll(".galary img");

ourGalary.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create OverLay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Create the Popup
    let popupBox = document.createElement("div");

    // Add Class To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text for heading
      let imgText = document.createTextNode(img.alt);

      // Append the Text To the Text
      imgHeading.appendChild(imgText);

      // Append the Heading to the Popup box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image to Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box to Body
    document.body.appendChild(popupBox);

    // Create the Closing Span
    let closeButtom = document.createElement("span");

    // Create The Close span Text
    let closeButtomText = document.createTextNode("X");

    closeButtom.appendChild(closeButtomText);

    // Add Class to Close Buttom
    closeButtom.className = "close-buttom";

    // Add Close Button To the popup
    popupBox.appendChild(closeButtom);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-buttom") {
    // Remove Current Popup
    e.target.parentNode.remove();
    // Remove OverLay
    document.querySelector(".popup-overlay").remove();
  }
});
document.onkeyup = function (e) {
  if (e.key === "Escape") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
};
// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// allBullets.forEach((bullet) => {
//   bullet.addEventListener("click", (e) => {
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

// Select All Links
const allLinks = document.querySelectorAll(".links a");

// allLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// Handle Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// bullet option
let bulletSpan = document.querySelectorAll(".bullets-span span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-span .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-span .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear(); // You Can remove All Things inside local Storage
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  // Reload Window
  window.location.reload();
};

//  Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};

// Click Anywhere outside the menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    // Check If menu is Open
    if (links.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
});

// Stop Propagation to menu
links.onclick = function (e) {
  e.stopPropagation();
};
