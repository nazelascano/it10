const formSection = document.getElementById("setup");
const profileForm = document.getElementById("profile-form");
const nameInput = document.getElementById("name");
const bioInput = document.getElementById("bio");
const skillsContainer = document.getElementById("skills-container");
const addSkillBtn = document.getElementById("add-skill-btn");
const projectsContainer = document.getElementById("projects-container");
const addProjectBtn = document.getElementById("add-project-btn");
const contactsContainer = document.getElementById("contacts-container");
const addContactBtn = document.getElementById("add-contact-btn");
const portfolioContent = document.getElementById("portfolio-content");
const siteTitle = document.getElementById("site-title");
const bioContent = document.getElementById("bio-content");
const skillsList = document.getElementById("skills-list");
const projectsList = document.getElementById("projects-list");
const contactList = document.getElementById("contact-list");
const themeToggle = document.getElementById("theme-toggle");
const editBtn = document.getElementById("edit-profile");
const resetBtn = document.getElementById("reset-profile");
const cancelBtn = document.getElementById("cancel-btn");
const footerYear = document.getElementById("footer-year");
const footerName = document.getElementById("footer-name");
const statusOverlay = document.getElementById("status-overlay");
const statusForm = document.getElementById("status-form");
const statusInput = document.getElementById("status-input");
const statusSection = document.getElementById("todays-status");
const statusDisplay = document.getElementById("status-display");

const savedStatus = sessionStorage.getItem("todaysStatus");

if (savedStatus) {
  statusDisplay.textContent = savedStatus;
  statusSection.classList.remove("hidden");
} else {
  statusOverlay.classList.remove("hidden");
  statusSection.classList.add("hidden");

  statusForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = statusInput.value.trim();
    if (message) {
      sessionStorage.setItem("todaysStatus", message);

      statusDisplay.textContent = message;
      statusSection.classList.remove("hidden");
      statusOverlay.classList.add("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  footerYear.textContent = new Date().getFullYear();

  document.querySelectorAll(".remove-skill").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".skill-input").remove();
    });
  });
  document.querySelectorAll(".remove-project").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".project-input").remove();
    });
  });
  document.querySelectorAll(".remove-contact").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".contact-input").remove();
    });
  });
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const hamburgerMenu = document.getElementById("hamburger-menu");

  hamburgerBtn.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!hamburgerBtn.contains(e.target) && !hamburgerMenu.contains(e.target)) {
      hamburgerMenu.classList.add("hidden");
    }
  });

  const storedData = localStorage.getItem("portfolioData");
  if (storedData) {
    const data = JSON.parse(storedData);
    populatePortfolio(data);
    formSection.classList.add("hidden");
    portfolioContent.classList.remove("hidden");
    editBtn.style.display = "inline-block";
    resetBtn.style.display = "inline-block";
    cancelBtn.style.display = "none";
  } else {
    formSection.classList.remove("hidden");
    portfolioContent.classList.add("hidden");
    editBtn.style.display = "none";
    resetBtn.style.display = "none";
    cancelBtn.style.display = "none";
  }

  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light Mode";
  } else {
    themeToggle.textContent = "Dark Mode";
  }
});
addSkillBtn.addEventListener("click", addSkillField);
addProjectBtn.addEventListener("click", addProjectField);
addContactBtn.addEventListener("click", addContactField);

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveProfile();
});

editBtn.addEventListener("click", () => {
  const storedData = JSON.parse(localStorage.getItem("portfolioData"));
  if (storedData) {
    fillForm(storedData);
    formSection.classList.remove("hidden");
    portfolioContent.classList.add("hidden");
    cancelBtn.style.display = "inline-block";
  }
});

cancelBtn.addEventListener("click", () => {
  formSection.classList.add("hidden");
  portfolioContent.classList.remove("hidden");
  cancelBtn.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to reset your profile? This will clear all data."
    )
  ) {
    localStorage.removeItem("portfolioData");
    location.reload();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "Dark Mode";
  }
});

function addSkillField() {
  const skillDiv = document.createElement("div");
  skillDiv.classList.add("skill-input");
  skillDiv.innerHTML = `
        <input type="text" class="skill" placeholder="Enter a skill">
        <button type="button" class="remove-skill" title="Remove Skill">✕</button>
    `;
  skillsContainer.appendChild(skillDiv);
  skillDiv.querySelector(".remove-skill").addEventListener("click", () => {
    skillDiv.remove();
  });
}

function addProjectField() {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project-input");
  projectDiv.innerHTML = `
        <input type="text" class="project-title" placeholder="Project Title">
        <textarea class="project-desc" placeholder="Project Description"></textarea>
        <button type="button" class="remove-project" title="Remove Project">✕</button>
    `;
  projectsContainer.appendChild(projectDiv);
  // Add event listener for remove
  projectDiv.querySelector(".remove-project").addEventListener("click", () => {
    projectDiv.remove();
  });
}

function addContactField() {
  const contactDiv = document.createElement("div");
  contactDiv.classList.add("contact-input");
  contactDiv.innerHTML = `
        <input type="text" class="contact-type" placeholder="e.g. GitHub, Email, Phone Number">
        <input type="text" class="contact-link" placeholder="Contacts">
        <button type="button" class="remove-contact" title="Remove Contact">✕</button>
    `;
  contactsContainer.appendChild(contactDiv);
  contactDiv.querySelector(".remove-contact").addEventListener("click", () => {
    contactDiv.remove();
  });
}

function saveProfile() {
  const name = nameInput.value.trim();
  const bio = bioInput.value.trim();
  const skillElems = skillsContainer.querySelectorAll(".skill");
  const projectTitles = projectsContainer.querySelectorAll(".project-title");
  const projectDescs = projectsContainer.querySelectorAll(".project-desc");
  const contactTypes = contactsContainer.querySelectorAll(".contact-type");
  const contactLinks = contactsContainer.querySelectorAll(".contact-link");

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  const skills = [];
  skillElems.forEach((input) => {
    if (input.value.trim() !== "") {
      skills.push(input.value.trim());
    }
  });

  const projects = [];
  for (let i = 0; i < projectTitles.length; i++) {
    const title = projectTitles[i].value.trim();
    const desc = projectDescs[i].value.trim();
    if (title || desc) {
      projects.push({ title, desc });
    }
  }
  if (projects.length === 0) {
    alert("Please enter at least one project title or description.");
    return;
  }

  const contacts = [];
  for (let i = 0; i < contactTypes.length; i++) {
    const type = contactTypes[i].value.trim();
    const link = contactLinks[i].value.trim();
    if (type && link) {
      contacts.push({ type, link });
    }
  }

  const profileData = { name, bio, skills, projects, contacts };
  localStorage.setItem("portfolioData", JSON.stringify(profileData));

  populatePortfolio(profileData);

  formSection.classList.add("hidden");
  portfolioContent.classList.remove("hidden");
  cancelBtn.style.display = "none";
  editBtn.style.display = "inline-block";
  resetBtn.style.display = "inline-block";
}

function populatePortfolio(data) {
  siteTitle.textContent = data.name + "'s Portfolio";
  footerName.textContent = data.name;

  bioContent.textContent = data.bio;

  skillsList.innerHTML = "";
  data.skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  projectsList.innerHTML = "";
  data.projects.forEach((proj) => {
    const projDiv = document.createElement("div");
    projDiv.classList.add("project-item");
    const h3 = document.createElement("h3");
    h3.textContent = proj.title;
    const p = document.createElement("p");
    p.textContent = proj.desc;
    projDiv.appendChild(h3);
    projDiv.appendChild(p);
    projectsList.appendChild(projDiv);
  });

  contactList.innerHTML = "";
  data.contacts.forEach((contact) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = contact.type;
    a.href = contact.link;
    a.target = "_blank";
    li.appendChild(a);
    contactList.appendChild(li);
  });
}

function fillForm(data) {
  nameInput.value = data.name;
  bioInput.value = data.bio;

  skillsContainer.innerHTML = "";
  projectsContainer.innerHTML = "";
  contactsContainer.innerHTML = "";

  data.skills.forEach((skill) => {
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("skill-input");
    skillDiv.innerHTML = `
            <input type="text" class="skill" value="${skill}" placeholder="Enter a skill">
            <button type="button" class="remove-skill" title="Remove Skill">✕</button>
        `;
    skillsContainer.appendChild(skillDiv);
    skillDiv.querySelector(".remove-skill").addEventListener("click", () => {
      skillDiv.remove();
    });
  });
  if (data.skills.length === 0) {
    addSkillField();
  }

  data.projects.forEach((proj) => {
    const projDiv = document.createElement("div");
    projDiv.classList.add("project-input");
    projDiv.innerHTML = `
            <input type="text" class="project-title" value="${proj.title}" placeholder="Project Title">
            <textarea class="project-desc" placeholder="Project Description">${proj.desc}</textarea>
            <button type="button" class="remove-project" title="Remove Project">✕</button>
        `;
    projectsContainer.appendChild(projDiv);
    projDiv.querySelector(".remove-project").addEventListener("click", () => {
      projDiv.remove();
    });
  });
  if (data.projects.length === 0) {
    addProjectField();
  }

  data.contacts.forEach((cont) => {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact-input");
    contactDiv.innerHTML = `
            <input type="text" class="contact-type" value="${cont.type}" placeholder="e.g. GitHub, Email, Phone Number">
            <input type="text" class="contact-link" value="${cont.link}" placeholder="Contacts">
            <button type="button" class="remove-contact" title="Remove Contact">✕</button>
        `;
    contactsContainer.appendChild(contactDiv);
    contactDiv
      .querySelector(".remove-contact")
      .addEventListener("click", () => {
        contactDiv.remove();
      });
  });
  if (data.contacts.length === 0) {
    addContactField();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const statusForm = document.getElementById("status-form");
  const statusInput = document.getElementById("status-input");
  const statusDisplay = document.getElementById("status-display");
});
