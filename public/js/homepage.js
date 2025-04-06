document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // === Navbar ===
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  navbar.innerHTML = `
    <div class="navbar-left">
      <div class="navbar-brand">
        <a href="index.html"><img class="logo" src="img/logo.png" alt="WorkMates Logo"></a>
      </div>
      <div class="navbar-icons">
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
      <button class="signin-btn" id="logoutBtn">Log out</button>
    </div>
  `;
  body.appendChild(navbar);

  // === Greeting Section ===
  const greeting = document.createElement("div");
  greeting.style.margin = "120px auto 40px";
  greeting.style.textAlign = "center";
  greeting.innerHTML = `
    <h1>Welcome back to WorkMates!</h1>
    <p>This is your homepage.</p>
  `;
  body.appendChild(greeting);

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
  body.appendChild(footer);

  // === Logout Handler ===
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("user");
        window.location.href = "/login.html";
      } else {
        alert("Logout failed.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("An error occurred.");
    }
  });
});
