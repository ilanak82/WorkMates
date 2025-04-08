// public/js/index.js
import { createNavbar, createFooter } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", () => {
  // === Navbar ===
  const navbar = createNavbar();
  document.body.appendChild(navbar);

  // === Landing Section ===
  const landing = document.createElement("main");
  landing.className = "landing";

  // Left side image
  const landingLeft = document.createElement("div");
  landingLeft.className = "landing-left";
  const image = document.createElement("img");
  image.src = "img/main-visual.png";
  image.alt = "WorkMates illustration";
  landingLeft.style.marginRight = "40px";
  landingLeft.appendChild(image);

  // Right side content
  const landingRight = document.createElement("div");
  landingRight.className = "landing-right";

  const heading = document.createElement("h1");
  heading.textContent = "Work smarter. Connect faster.";

  const subtext = document.createElement("p");
  subtext.textContent =
    "Join WorkMates and take your professional journey to the next level. Connect, grow, and discover new job opportunities with ease.";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "auth-buttons";

  const googleBtn = document.createElement("button");
  googleBtn.className = "google-btn";
  googleBtn.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google icon" />
    Continue with Google
  `;

  const microsoftBtn = document.createElement("button");
  microsoftBtn.className = "microsoft-btn";
  microsoftBtn.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Microsoft icon" />
    Continue with Microsoft
  `;

  const divider = document.createElement("div");
  divider.className = "divider";
  divider.textContent = "or";

  const emailBtn = document.createElement("a");
  emailBtn.className = "email-btn";
  emailBtn.href = "login.html";
  emailBtn.textContent = "Sign in with email";

  const legalNote = document.createElement("p");
  legalNote.className = "legal-note";
  legalNote.innerHTML = `
    By clicking Continue to join or sign in, you agree to WorkMates’
    <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.
  `;

  const bottomLine = document.createElement("div");
  bottomLine.className = "bottom-line";
  bottomLine.innerHTML = `
    <span class="auth-switch">
      New to WorkMates? <a href="register.html"><strong>Join now</strong></a>
    </span>
  `;

  // Append elements in correct order
  buttonContainer.append(
    googleBtn,
    microsoftBtn,
    divider,
    emailBtn,
    legalNote,
    bottomLine
  );
  landingRight.append(heading, subtext, buttonContainer);
  landing.append(landingLeft, landingRight);
  document.body.appendChild(landing);

  // === Footer ===
  const footer = createFooter();
  document.body.appendChild(footer);
});
