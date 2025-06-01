import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, addUserData } from "./firebase.js";
// Form Switching
function showLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('form-title').textContent = 'Welcome Back';
    document.getElementById('form-subtitle').textContent = 'Login to continue your journey';
}

function showRegister() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('form-title').textContent = 'Start Your Journey';
    document.getElementById('form-subtitle').textContent = 'Create an account to begin';
}

function redirectToSkills() {
    const nameInput = document.querySelector("#register-form input[type='text']");
    if (nameInput) {
        localStorage.setItem("userName", nameInput.value.trim()); // Store name in localStorage
    }
    window.location.href = "skills.html"; // Redirect to skills page
}

// Add event listeners for form buttons


// Event listener for Registration
document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.querySelector("#register-form button.action");

    registerBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const name = document.querySelector("#register-form input[type='text']").value.trim();
        const email = document.querySelector("#register-form input[type='email']").value.trim();
        const password = document.querySelectorAll("#register-form input[type='password']")[0].value.trim();
        const confirmPassword = document.querySelectorAll("#register-form input[type='password']")[1].value.trim();

        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data in Firestore
            await addUserData(user.uid, name, email);

            localStorage.setItem("userName", name); 
            window.location.href = "skills.html";
        } catch (error) {
            alert("Error registering user: " + error.message);
        }
    });
});

// Event listener for Login
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector("#login-form button.action");

    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#login-form input[type='email']").value.trim();
        const password = document.querySelector("#login-form input[type='password']").value.trim();

        if (email === "" || password === "") {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            localStorage.setItem("userName", user.displayName || "User");
            window.location.href = "skills.html";
        } catch (error) {
            alert("Error logging in: " + error.message);
        }
    });
});
window.showLogin = showLogin;
window.showRegister = showRegister;
