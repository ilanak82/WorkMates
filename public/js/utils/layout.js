// public/js/utils/layout.js

export function createNavbar() {
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
  return navbar;
}

export function createFooter() {
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
  return footer;
}

export function createContainer(wrapperClass = "register-wrapper", boxClass = "register-box container") {
  const wrapper = document.createElement("div");
  wrapper.className = wrapperClass;

  const box = document.createElement("div");
  box.className = boxClass;
  // Standard margins
  box.style.marginTop = "100px";
  box.style.marginBottom = "60px";

  wrapper.appendChild(box);
  return { wrapper, box };
}
