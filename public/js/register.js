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

  // === Register Wrapper ===
  const wrapper = document.createElement("div");
  wrapper.className = "register-wrapper";

  const box = document.createElement("div");
  box.className = "register-box container";
  box.style.marginTop = "100px";
  box.style.marginBottom = "60px";

  const heading = document.createElement("h2");
  heading.textContent = "Create Your Account";

  const subtext = document.createElement("p");
  subtext.textContent = "Join the network built for professionals.";

  const form = document.createElement("form");
  form.id = "registerForm";

  // Utility to create input group
  const createInputGroup = (labelText, name, type = "text", required = true) => {
    const group = document.createElement("div");
    group.className = "form-group";

    const label = document.createElement("label");
    label.textContent = labelText;

    const input = document.createElement("input");
    input.name = name;
    input.type = type;
    if (required) input.required = true;

    group.append(label, input);
    return group;
  };

  // === Input fields
  const firstNameGroup = createInputGroup("First Name", "fName");
  const lastNameGroup = createInputGroup("Last Name", "lName");
  const usernameGroup = createInputGroup("Username", "username");
  const emailGroup = createInputGroup("Email", "email", "email");
  const passwordGroup = createInputGroup("Password", "password", "password");
  const confirmGroup = createInputGroup("Confirm Password", "confirmPassword", "password");
  const birthDateGroup = createInputGroup("Birth Date", "birthDate", "date", false);
  const pictureGroup = createInputGroup("Profile Picture URL (optional)", "picture", "text", false);

  // === Remember Me
  const rememberGroup = document.createElement("div");
  rememberGroup.className = "form-group remember-group";

  const rememberInput = document.createElement("input");
  rememberInput.type = "checkbox";
  rememberInput.id = "remember";
  rememberInput.name = "remember";

  const rememberLabel = document.createElement("label");
  rememberLabel.setAttribute("for", "remember");
  rememberLabel.innerHTML = `<span class="checkbox-label">Remember me</span>`;

  rememberGroup.append(rememberInput, rememberLabel);

  // === Legal Note
  const legalNote = document.createElement("p");
  legalNote.className = "legal-note";
  legalNote.innerHTML = `
    By clicking Continue to join or sign in, you agree to WorkMates’
    <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.
  `;

  // === Submit Button
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "form-group button-wrapper";

  const joinBtn = document.createElement("button");
  joinBtn.type = "submit";
  joinBtn.className = "join-btn";
  joinBtn.textContent = "Agree & Join";

  buttonWrapper.appendChild(joinBtn);

  // === Divider + Third-party buttons
  const divider = document.createElement("div");
  divider.className = "divider";
  divider.textContent = "or";

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

  // === Bottom line
  const bottomLine = document.createElement("div");
  bottomLine.className = "bottom-line";
  bottomLine.innerHTML = `
  <span class="auth-switch">
    Already on WorkMates? <a href="login.html"><strong>Sign in</strong></a>
  </span>
`;

  // === Assemble the form
  form.append(
    firstNameGroup,
    lastNameGroup,
    usernameGroup,
    emailGroup,
    passwordGroup,
    confirmGroup,
    birthDateGroup,
    pictureGroup,
    rememberGroup,
    legalNote,
    buttonWrapper,
    divider,
    googleBtn,
    microsoftBtn,
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
