const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleProjects");

let isRed = true;

themeBtn.addEventListener("click", () => {
    const link = document.querySelector("link[rel='stylesheet']");

    if (isRed) {
        link.href = "green.css";
    } else {
        link.href = "red.css";
    }

    isRed = !isRed;
});

const projects = document.querySelector(".projects");

toggleBtn.addEventListener("click", () => {
    if (projects.style.display === "none") {
        projects.style.display = "block";
    } else {
        projects.style.display = "none";
    }
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // pola
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // bledy
  let isValid = true;

  // reset 
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  // imie
  if (firstName === "") {
    document.getElementById("firstNameError").textContent = "Imię jest wymagane";
    isValid = false;
  } else if (/\d/.test(firstName)) {
    document.getElementById("firstNameError").textContent = "Imię nie może zawierać cyfr";
    isValid = false;
  }

  // nazwisko
  if (lastName === "") {
    document.getElementById("lastNameError").textContent = "Nazwisko jest wymagane";
    isValid = false;
  } else if (/\d/.test(lastName)) {
    document.getElementById("lastNameError").textContent = "Nazwisko nie może zawierać cyfr";
    isValid = false;
  }

  // email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    document.getElementById("emailError").textContent = "Email jest wymagany";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Niepoprawny email";
    isValid = false;
  }

  // wiad
  if (message === "") {
    document.getElementById("messageError").textContent = "Wiadomość jest wymagana";
    isValid = false;
  }

  // sukces
  if (isValid) {
    alert("Formularz wysłany poprawnie!");
    form.reset();
  }
});