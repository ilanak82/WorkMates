document.addEventListener("DOMContentLoaded", () => {
  // === Navbar ===
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  navbar.innerHTML = `
    <div class="navbar-left">
      <div class="navbar-brand">
        <a href="index.html">
          <img class="logo" src="img/logo.png" alt="WorkMates Logo">
        </a>
      </div>
      <div class="navbar-icons">
        <div class="navbar-divider"></div>
        <a href="/jobs" class="navbar-icon">
          <i class="fa-solid fa-suitcase"></i><span>Jobs</span>
        </a>
        <div class="navbar-divider"></div>
        <a href="/people" class="navbar-icon">
          <i class="fa-solid fa-users"></i><span>People</span>
        </a>
      </div>
    </div>
    <div class="navbar-links">
      <a href="register.html" class="join-btn">Join now</a>
      <a href="login.html" class="signin-btn">Sign in</a>
    </div>
  `;
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
  landingLeft.style.marginRight = '40px';
  landingLeft.appendChild(image);

  // Right side content
  const landingRight = document.createElement("div");
  landingRight.className = "landing-right";

  const heading = document.createElement("h1");
  heading.textContent = "Work smarter. Connect faster.";

  const subtext = document.createElement("p");
  subtext.textContent = "Join WorkMates and take your professional journey to the next level. Connect, grow, and discover new job opportunities with ease.";

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

  // Append all elements in exact order
  buttonContainer.append(googleBtn, microsoftBtn, divider, emailBtn, legalNote, bottomLine);
  landingRight.append(heading, subtext, buttonContainer);
  landing.append(landingLeft, landingRight);
  document.body.appendChild(landing);

  // === Footer ===
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <p>
      © 2025 WorkMates ·
      <a href="#">About</a> ·
      <a href="#">Contact</a> ·
      <a href="#">Terms</a> ·
      <label for="language">🌐 Language:</label>
      <select id="language" name="language">
        <option value="en">English</option>
        <option value="he">עברית</option>
        <option value="ar">العربية</option>
      </select>
    </p>
  `;
  document.body.appendChild(footer);
});
