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

  // === Login Wrapper ===
  const wrapper = document.createElement("div");
  wrapper.className = "login-wrapper";

  const box = document.createElement("div");
  box.className = "login-box container";
  box.style.marginTop = "100px";
  box.style.marginBottom = "60px";

  const heading = document.createElement("h2");
  heading.textContent = "Welcome Back";

  const subtext = document.createElement("p");
  subtext.textContent = "Log in to stay connected with your professional network.";

  const form = document.createElement("form");
  form.id = "loginForm";

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

  // === Email field
  const emailGroup = document.createElement("div");
  emailGroup.className = "form-group";
  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email";
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.required = true;
  emailGroup.append(emailLabel, emailInput);

  // === Password field
  const passwordGroup = document.createElement("div");
  passwordGroup.className = "form-group";
  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "Password";
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.required = true;
  passwordGroup.append(passwordLabel, passwordInput);

  // === Forgot Password
  const options = document.createElement("div");
  options.className = "form-options";
  const forgotLink = document.createElement("a");
  forgotLink.href = "#";
  forgotLink.textContent = "Forgot password?";
  options.appendChild(forgotLink);

  // === Remember Me
  const rememberGroup = document.createElement("div");
  rememberGroup.className = "form-group remember-group";
  rememberGroup.style.justifyContent = "flex-start";

  const rememberInput = document.createElement("input");
  rememberInput.type = "checkbox";
  rememberInput.id = "keepLoggedIn";
  rememberInput.name = "keepLoggedIn";

  const rememberLabel = document.createElement("label");
  rememberLabel.setAttribute("for", "keepLoggedIn");
  rememberLabel.innerHTML = `<span class="checkbox-label">Keep me logged in</span>`;

  rememberGroup.append(rememberInput, rememberLabel);

  // === Submit Button
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "form-group button-wrapper";

  const loginBtn = document.createElement("button");
  loginBtn.type = "submit";
  loginBtn.className = "signin-btn";
  loginBtn.textContent = "Sign in";

  buttonWrapper.appendChild(loginBtn);

  // === Bottom Line
  const bottomLine = document.createElement("div");
  bottomLine.className = "bottom-line";
  bottomLine.innerHTML = `
  <span class="auth-switch">
    New to WorkMates? <a href="register.html"><strong>Join now</strong></a>
  </span>
`;

  // Append everything in correct order
  form.append(
    googleBtn,
    microsoftBtn,
    divider,
    emailGroup,
    passwordGroup,
    options,
    rememberGroup,
    buttonWrapper,
    bottomLine
  );

  box.append(heading, subtext, form);
  wrapper.appendChild(box);
  document.body.appendChild(wrapper);

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
