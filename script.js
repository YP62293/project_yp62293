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

    // proj
    const projectsList = document.querySelector(".projects");
    projectsList.innerHTML = "";

    data.projects.forEach(project => {
      const li = document.createElement("li");
      li.textContent = project;
      projectsList.appendChild(li);
    });

  })
  .catch(error => console.error(error));

  //  local stor

const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.querySelector(".notes");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    });

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

addNoteBtn.addEventListener("click", () => {
  const value = noteInput.value.trim();

  if (value !== "") {
    notes.push(value);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    renderNotes();
  }
});

renderNotes();