// public/js/register.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = form.fullName.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (!fullName || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // So cookies are sent/stored
                body: JSON.stringify({ fullName, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed.");
                return;
            }

            // Optionally store user info (if returned)
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            // Redirect to login page
            window.location.href = "/login.html";
        } catch (err) {
            console.error("Registration error:", err);
            alert("An error occurred during registration. Please try again.");
        }
    });
});
