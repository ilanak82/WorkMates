// public/js/logout.js
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Log out";
  logoutBtn.className = "logout-btn";
  // Append the logout button; consider placing it in a designated area like the navbar if needed
  document.body.appendChild(logoutBtn);

  logoutBtn.addEventListener("click", async () => {
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
