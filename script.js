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

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  // valid

  // ime
  if (firstName === "") {
    document.getElementById("firstNameError").textContent = "Imię jest wymagane";
    isValid = false;
  } else if (firstName.length < 2) {
    document.getElementById("firstNameError").textContent = "Za krótkie imię";
    isValid = false;
  } else if (!/^[A-Za-zÀ-ÿ]+$/.test(firstName)) {
    document.getElementById("firstNameError").textContent = "Tylko litery";
    isValid = false;
  }

  // nazwi
  if (lastName === "") {
    document.getElementById("lastNameError").textContent = "Nazwisko jest wymagane";
    isValid = false;
  } else if (lastName.length < 2) {
    document.getElementById("lastNameError").textContent = "Za krótkie nazwisko";
    isValid = false;
  } else if (!/^[A-Za-zÀ-ÿ]+$/.test(lastName)) {
    document.getElementById("lastNameError").textContent = "Tylko litery";
    isValid = false;
  }

  // maio
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    document.getElementById("emailError").textContent = "Email jest wymagany";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Niepoprawny email";
    isValid = false;
  }

  // sms
  if (message === "") {
    document.getElementById("messageError").textContent = "Wiadomość jest wymagana";
    isValid = false;
  }

  if (!isValid) return;

  // fth
  try {
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        message
      })
    });

    const result = await response.json();

    if (result.success) {
      const successMsg = document.getElementById("formSuccess");

      successMsg.style.display = "block";
      form.reset();

      setTimeout(() => {
        successMsg.style.display = "none";
      }, 3000);
    }

  } catch (error) {
    console.error(error);
    alert("Błąd połączenia z serwerem");
  }
});

fetch("data.json")
  .then(response => response.json())
  .then(data => {

    // skill
    const skillsList = document.querySelector(".skills");
    skillsList.innerHTML = "";

    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    // proje
    const projectsList = document.querySelector(".projects");
    projectsList.innerHTML = "";

    data.projects.forEach(project => {
      const li = document.createElement("li");
      li.textContent = project;
      projectsList.appendChild(li);
    });

  })
  .catch(error => console.error(error));