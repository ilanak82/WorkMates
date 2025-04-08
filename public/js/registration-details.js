// public/js/registration-details.js
import { apiPostFormData } from "./utils/api.js";
import { validateRegistrationDetails } from "./utils/validators.js";
import { createNavbar, createFooter, createContainer } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    // Append the common navbar
    const navbar = createNavbar();
    document.body.appendChild(navbar);
    console.log("Navbar appended");

    // Create the main container using our layout utility.
    const { wrapper, box } = createContainer();
    document.body.appendChild(wrapper);
    console.log("Container appended");

    // Add heading and subtext
    const heading = document.createElement("h2");
    heading.textContent = "Complete Your Registration";
    const subtext = document.createElement("p");
    subtext.textContent =
      "Fill in additional details to complete your profile.";

    // Create the form element
    const form = document.createElement("form");
    form.id = "registrationDetailsForm";
    form.enctype = "multipart/form-data";

    // Overall error notifications container
    const errorBox = document.createElement("ul");
    errorBox.id = "formErrors";
    errorBox.className = "form-errors";
    form.appendChild(errorBox);

    // Extract the userId from URL and append as a hidden field
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    if (userId) {
      const userIdInput = document.createElement("input");
      userIdInput.type = "hidden";
      userIdInput.name = "userId";
      userIdInput.value = userId;
      form.appendChild(userIdInput);
    } else {
      console.warn("No userId found in query parameters.");
    }

    // Helper function to create an input group with inline error messaging
    const createInputGroup = (labelText, name, type = "text", placeholder = "") => {
      const group = document.createElement("div");
      group.className = "form-group";

      // Label
      const label = document.createElement("label");
      label.setAttribute("for", name);
      label.textContent = labelText;

      // Input
      const input = document.createElement("input");
      input.name = name;
      input.id = name;
      input.type = type;
      input.placeholder = placeholder;
      input.required = true;
      if (name === "birthDate") {
        input.type = "date";
        input.max = new Date().toISOString().split("T")[0];
      }

      // Inline error span
      const errorSpan = document.createElement("span");
      errorSpan.className = "error-message";

      // Validation events
      input.addEventListener("invalid", (e) => {
        e.preventDefault();
        if (e.target.validity.valueMissing) {
          e.target.setCustomValidity(`Please provide your ${labelText}`);
        } else if (e.target.validity.typeMismatch) {
          e.target.setCustomValidity(`Please enter a valid ${labelText}`);
        } else if (e.target.validity.tooShort) {
          e.target.setCustomValidity(`Your ${labelText} must be at least 8 characters`);
        }
        errorSpan.textContent = e.target.validationMessage;
      });
      input.addEventListener("input", (e) => {
        e.target.setCustomValidity("");
        errorSpan.textContent = "";
      });
      input.addEventListener("blur", (e) => {
        errorSpan.textContent = e.target.validationMessage;
      });

      group.append(label, input, errorSpan);
      return group;
    };

    // Build the form fields using our input group helper
    const firstNameGroup = createInputGroup("First Name", "fName");
    const lastNameGroup = createInputGroup("Last Name", "lName");
    const usernameGroup = createInputGroup("Username", "username");
    const addressGroup = createInputGroup("Address", "address", "text", "Your address");
    const birthDateGroup = createInputGroup("Birth Date", "birthDate");

    // Profile Picture group (optional)
    const pictureGroup = document.createElement("div");
    pictureGroup.className = "form-group";
    const pictureLabel = document.createElement("label");
    pictureLabel.setAttribute("for", "profilePic");
    pictureLabel.textContent = "Profile Picture (optional)";
    const pictureInput = document.createElement("input");
    pictureInput.type = "file";
    pictureInput.name = "profilePic";
    pictureInput.id = "profilePic";
    pictureInput.accept = "image/*";
    pictureGroup.append(pictureLabel, pictureInput);

    // Submit button group
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "form-group button-wrapper";
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "join-btn";
    submitBtn.textContent = "Submit";
    buttonWrapper.appendChild(submitBtn);

    // Append form groups to the form
    form.append(
      firstNameGroup,
      lastNameGroup,
      usernameGroup,
      addressGroup,
      birthDateGroup,
      pictureGroup,
      buttonWrapper
    );

    // Append heading, subtext, and form to the box container
    box.append(heading, subtext, form);
    console.log("Form built and appended");

    // Append the common footer
    const footer = createFooter();
    document.body.appendChild(footer);
    console.log("Footer appended");

    // --- Form Submission Handling ---
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorBox.innerHTML = "";
      errorBox.classList.remove("visible");

      // Use our existing validator to check registration details
      const errors = validateRegistrationDetails({
        fName: form.fName.value,
        lName: form.lName.value,
        username: form.username.value,
        address: form.address.value,
        birthDate: form.birthDate.value,
      });

      if (errors.length > 0) {
        errorBox.classList.add("visible");
        const ul = document.createElement("ul");
        errors.forEach((err) => {
          const li = document.createElement("li");
          li.textContent = `• ${err}`;
          ul.appendChild(li);
        });
        errorBox.innerHTML = "<p><strong>There were some issues:</strong></p>";
        errorBox.appendChild(ul);
        return;
      }

      // Create FormData and submit using our API helper
      const formData = new FormData(form);
      try {
        const result = await apiPostFormData("/api/auth/register-details", formData);
        if (!result.success) {
          alert(result.error || "Failed to update registration details.");
          return;
        }
        alert("Registration completed successfully!");
        window.location.href = "/dashboard.html";
      } catch (err) {
        console.error("Error submitting registration details:", err);
        alert("An error occurred. Please try again later.");
      }
    });

  } catch (err) {
    console.error("Error during registration-details.js execution", err);
  }
});
