// public/js/utils/validators.js

// Validate full registration fields
export function validateRegistration({
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    birthDate,
    profilePicUrl,
}) {
    const errors = [];

    // First Name
    if (!firstName || firstName.trim().length < 2) {
        errors.push("First name must be at least 2 characters");
    } else if (!/^[a-zA-Z]+$/.test(firstName.trim())) {
        errors.push("First name can only contain letters");
    }

    // Last Name
    if (!lastName || lastName.trim().length < 2) {
        errors.push("Last name must be at least 2 characters");
    } else if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
        errors.push("Last name can only contain letters");
    }

    // Username
    if (!username || username.length < 3) {
        errors.push("Username must be at least 3 characters");
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        errors.push(
            "Username can only contain letters, numbers, and underscores (3–20 characters)"
        );
    }

    // Email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("Please enter a valid email address");
    }

    // Password
    if (!password || password.length < 8) {
        errors.push("Password must be at least 8 characters");
    } else {
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must include at least one uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must include at least one lowercase letter");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Password must include at least one number");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must include at least one special character");
        }
    }

    // Confirm Password
    if (confirmPassword !== password) {
        errors.push("Passwords do not match");
    }

    // Birth Date (basic check)
    if (!birthDate) {
        errors.push("Birth date is required");
    } else {
        const age = calculateAge(new Date(birthDate));
        if (isNaN(age)) {
            errors.push("Birth date must be a valid date");
        } else if (age < 13) {
            errors.push("You must be at least 13 years old to join");
        }
    }

    // Profile Pic URL (optional)
    if (profilePicUrl && profilePicUrl.trim() !== "") {
        try {
            new URL(profilePicUrl); // throws if not a valid URL
        } catch (err) {
            errors.push("Profile picture must be a valid URL");
        }
    }

    return errors;
}

// Helper: Calculate age based on birth date
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Validate additional registration details (e.g. for profile extension)
export function validateRegistrationDetails({ fName, lName, username, address, birthDate }) {
    const errors = [];

    if (!fName || fName.trim() === "") errors.push("First name is required.");
    if (!lName || lName.trim() === "") errors.push("Last name is required.");
    if (!username || username.trim() === "") errors.push("Username is required.");
    if (!address || address.trim() === "") errors.push("Address is required.");
    if (!birthDate) errors.push("Birth date is required.");

    // Username only allows alphanumerics and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (username && !usernameRegex.test(username)) {
        errors.push("Username can only contain letters, numbers, and underscores.");
    }

    return errors;
}
