// public/js/register.js
import { createNavbar, createFooter, createContainer } from "./utils/layout.js";
import { apiPostFormData } from "./utils/api.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // === Navbar ===
  const navbar = createNavbar();
  document.body.appendChild(navbar);

  // === Register Wrapper using container utility ===
  const { wrapper, box } = createContainer("register-wrapper", "register-box container");
  box.style.marginTop = "100px";
  box.style.marginBottom = "60px";

  const heading = document.createElement("h2");
  heading.textContent = "Create Your Account";

  const subtext = document.createElement("p");
  subtext.textContent = "Join the network built for professionals.";

  const form = document.createElement("form");
  form.id = "registerForm";
  form.enctype = "multipart/form-data";

  const errorList = document.createElement("ul");
  errorList.id = "formErrors";
  errorList.className = "form-errors";
  form.appendChild(errorList);

  // === Email Field ===
  const emailGroup = document.createElement("div");
  emailGroup.className = "form-group";

  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email";

  const emailInput = document.createElement("input");
  emailInput.name = "email";
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.placeholder = "your@email.com";
  emailInput.required = true;

  // Error message span for email
  const emailError = document.createElement("span");
  emailError.className = "error-message";
  emailError.style.display = "none";
  emailGroup.append(emailLabel, emailInput, emailError);

  // Validate email on blur
  emailInput.addEventListener("blur", () => {
    const value = emailInput.value.trim();
    if (!value) {
      emailError.textContent = "Please enter your email address.";
      emailError.style.display = "block";
      emailInput.classList.add("invalid-input");
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
      emailInput.classList.add("invalid-input");
    } else {
      emailError.textContent = "";
      emailError.style.display = "none";
      emailInput.classList.remove("invalid-input");
    }
  });

  // === Password Field with Eye Icon ===
  const passwordGroup = document.createElement("div");
  passwordGroup.className = "form-group password-group";

  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Password";

  const passwordInput = document.createElement("input");
  passwordInput.name = "password";
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.placeholder = "At least 8 characters";
  passwordInput.required = true;

  // Error message span for password
  const passwordError = document.createElement("span");
  passwordError.className = "error-message";
  passwordError.style.display = "none";

  // Container for password input and eye icon
  const passwordContainer = document.createElement("div");
  passwordContainer.className = "password-container";
  passwordContainer.append(passwordInput);
  const passwordEyeIcon = document.createElement("span");
  passwordEyeIcon.className = "password-eye-icon";
  passwordEyeIcon.innerHTML = `<i class="fa fa-eye"></i>`;
  passwordContainer.append(passwordEyeIcon);
  passwordGroup.append(passwordLabel, passwordContainer, passwordError);

  // Validate password on blur
  passwordInput.addEventListener("blur", () => {
    const value = passwordInput.value;
    if (!value) {
      passwordError.textContent = "Please enter your password.";
      passwordError.style.display = "block";
      passwordInput.classList.add("invalid-input");
    } else if (value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters.";
      passwordError.style.display = "block";
      passwordInput.classList.add("invalid-input");
    } else {
      passwordError.textContent = "";
      passwordError.style.display = "none";
      passwordInput.classList.remove("invalid-input");
    }
  });

  // Toggle password visibility
  passwordEyeIcon.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordEyeIcon.innerHTML = `<i class="fa fa-eye-slash"></i>`;
    } else {
      passwordInput.type = "password";
      passwordEyeIcon.innerHTML = `<i class="fa fa-eye"></i>`;
    }
  });

  // === Remember Me ===
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

  // === Legal Terms ===
  const legalNote = document.createElement("p");
  legalNote.className = "legal-note";
  legalNote.innerHTML = `By clicking Continue to join or sign in, you agree to WorkMates’ <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.`;

  // === Submit Button ===
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "form-group button-wrapper";

  const joinBtn = document.createElement("button");
  joinBtn.type = "submit";
  joinBtn.className = "join-btn";
  joinBtn.textContent = "Agree & Join";
  buttonWrapper.appendChild(joinBtn);

  // === Third-Party Login Buttons ===
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

  const bottomLine = document.createElement("div");
  bottomLine.className = "bottom-line";
  bottomLine.innerHTML = `
    <span class="auth-switch">
      Already on WorkMates? <a href="login.html"><strong>Sign in</strong></a>
    </span>
  `;

  // === Assemble the Form and Page Elements ===
  form.append(
    emailGroup,
    passwordGroup,
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
  const footer = createFooter();
  document.body.appendChild(footer);

  // === Form Submission ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Trigger blur events to run validations
    emailInput.dispatchEvent(new Event("blur"));
    passwordInput.dispatchEvent(new Event("blur"));

    // Prevent submission if email or password are invalid
    if (
      emailInput.classList.contains("invalid-input") ||
      passwordInput.classList.contains("invalid-input")
    ) {
      return;
    }

    const formData = new FormData(form);
    const errors = [];
    const emailValue = formData.get("email").trim();
    const passwordValue = formData.get("password");

    if (!emailValue || !/^\S+@\S+\.\S+$/.test(emailValue)) {
      errors.push("Please enter a valid email address.");
    }
    if (!passwordValue || passwordValue.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }

    errorList.innerHTML = "";
    errorList.classList.remove("visible");

    if (errors.length > 0) {
      errorList.classList.add("visible");
      const ul = document.createElement("ul");
      errors.forEach((err) => {
        const li = document.createElement("li");
        li.textContent = `• ${err}`;
        ul.appendChild(li);
      });
      errorList.innerHTML = "<p><strong>There were some issues:</strong></p>";
      errorList.appendChild(ul);
      return;
    }

    try {
      const result = await apiPostFormData("/api/auth/register", formData);
      if (!result.success) {
        alert(result.error || "Registration failed");
        return;
      }
      alert("Registered successfully!");
      window.location.href = "/login.html";
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong. Please try again later.");
    }
  });
});
