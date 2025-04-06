// public/js/login.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // So cookies work with JWT
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed.");
                return;
            }

            // Optionally store user info (if sent)
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            // Redirect to homepage
            window.location.href = "/homepage.html";
        } catch (err) {
            console.error("Login error:", err);
            alert("An error occurred during login. Please try again.");
        }
    });
});
