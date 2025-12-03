// NAVBAR START
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");
  const overlayLinks = document.querySelectorAll("#overlay .overlay-content a");
  const allHashLinks = document.querySelectorAll('a[href^="#"]');

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("active");
    overlay.classList.toggle("show");
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });
  overlayLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      hamburger.classList.remove("active");
      overlay.classList.remove("show");
      document.body.style.overflow = "auto";
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      const offset = 90;
      const topPos =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    });
  });
  allHashLinks.forEach((link) => {
    if (link.closest("#overlay")) return;

    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      const offset = 70;
      const topPos =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    });
  });
});
// NAVBAR END

//ICONIC LIVING & PROJECT HIGHLIGHTS ANIMATIONS START
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  const elements = document.querySelectorAll(
    ".slide-left, .slide-right, .slide-up"
  );
  elements.forEach((el) => observer.observe(el));
});
//ICONIC LIVING & PROJECT HIGHLIGHTS ANIMATIONS END

// FLOOR PLAN START
document.addEventListener("DOMContentLoaded", () => {
  const leftImages = document.querySelectorAll("#floor-plan .slide-left-img");
  const rightItems = document.querySelectorAll("#floor-plan .fade-up");
  const rightImage = document.querySelector("#floor-plan .zoom-in");

  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  leftImages.forEach((img, index) => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.classList.add("show");

          if (index === 0 && leftImages[1]) {
            setTimeout(() => {
              leftImages[1].classList.add("show");
            }, 400);
          }
          obs.unobserve(img);
        }
      });
    }, observerOptions);
    observer.observe(img);
  });
  rightItems.forEach((li, i) => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              li.classList.add("show");
            }, i * 150);
            obs.unobserve(li);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(li);
  });

  const imgObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rightImage.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  imgObserver.observe(rightImage);
});
// FLOOR PLAN END

//GALLERY START
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(
    "#gallery .gallery-slide-left, #gallery .gallery-slide-right, #gallery .gallery-slide-up"
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("gallery-show");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  galleryImages.forEach((img) => observer.observe(img));
  const overlay = document.getElementById("gallery-overlay");
  const overlayImg = document.getElementById("overlay-img");

  const galleryZoomImages = document.querySelectorAll(".gallery-img");
  galleryZoomImages.forEach((img) => {
    img.addEventListener("click", () => {
      overlay.style.display = "flex";
      overlayImg.src = img.src;
    });
  });
  overlay.addEventListener("click", (e) => {
    if (e.target !== overlayImg) {
      overlay.style.display = "none";
    }
  });
});
//GALLERY END

//FORM ANIMATION START
const elements = document.querySelectorAll(".form-animate");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

//FORM ANIMATION END

// FOOTER ANIMATION START
elements.forEach((el) => observer.observe(el));
const footer = document.querySelector(".footer-animate");

const observerFooter = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      footer.classList.add("visible");
    }
  });
});
observerFooter.observe(footer);
//FOOTER ANIMATION END

//FORM VALIDATIONS
const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
  initialCountry: "in",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  separateDialCode: true,
});

//Regex Patterns
const nameRegex = /^[A-Za-z.\s]*$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const urlRegex = /(https?:\/\/[^\s]+)/gi;

//Error Handling
function showError(id, message) {
  const el = document.getElementById(id);
  el.innerText = message;
  el.classList.add("error-visible");
}

function hideError(id) {
  const el = document.getElementById(id);
  el.classList.remove("error-visible");
}

//Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let hasError = false;

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("emailAddress").value.trim();
  const message = document.getElementById("messageBox").value.trim();
  const phoneValue = phoneInput.value.trim();
  const phoneValid = iti.isValidNumber();

  //VALIDATIONS
  if (!name || !nameRegex.test(name)) {
    showError("nameError", "Please enter a valid name.");
    hasError = true;
  } else hideError("nameError");

  if (!email || !emailRegex.test(email)) {
    showError("emailError", "Please enter a valid email.");
    hasError = true;
  } else hideError("emailError");

  if (!phoneValue || !phoneValid) {
    showError("phoneError", "Enter a valid phone number.");
    hasError = true;
  } else hideError("phoneError");

  if (!message || message.length > 150 || urlRegex.test(message)) {
    showError("messageError", "Invalid message (no URLs, max 150 chars).");
    hasError = true;
  } else hideError("messageError");

  //CREATE DATA OBJECT
  const formData = {
    name: name,
    email: email,
    phone: iti.getNumber(),
    message: message,
    countryData: iti.getSelectedCountryData(),
  };

  //SEND DATA TO URL
  fetch("https://your-url-here.com/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server Response:", data);
      alert("Form submitted successfully!");

      // Clear all fields after successful submission
      document.getElementById("fullName").value = "";
      document.getElementById("emailAddress").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("messageBox").value = "";

      // Optional: hide any error messages if visible
      hideError("nameError");
      hideError("emailError");
      hideError("phoneError");
      hideError("messageError");
    })
    .catch((err) => {
      console.error("Error submitting form:", err);
    });
});
