import { auth, db } from "./firebase.js";
import { doc, updateDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

let selectedSkills = [];

// ✅ **Use `onAuthStateChanged()` to track login status**
onAuthStateChanged(auth, async (user) => {
    if (user) {
            const userName = localStorage.getItem("userName") || "User"; 
        document.getElementById("userGreeting").textContent = `Choose Your Path, ${userName || "Adventurer"}`;

        // Load existing skills from Firebase
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            selectedSkills = userSnap.data().skills || [];
            updateUI();
        }
    } else {
        alert("Please log in to select your skills.");
        window.location.href = "index.html"; // Redirect only if user is NOT logged in
    }
});

function selectSkill(skill) {
    if (selectedSkills.includes(skill)) {
        selectedSkills = selectedSkills.filter(s => s !== skill);
    } else {
        selectedSkills.push(skill);
    }
    updateUI();
}

function updateUI() {
    document.querySelectorAll(".skill-card").forEach(card => {
        const skillName = card.querySelector("h3").textContent;
        card.style.boxShadow = selectedSkills.includes(skillName) 
            ? "0 0 40px #ffcc00, 0 0 80px #ffcc00" 
            : "0 0 20px #9f7aea";
    });
}

// ✅ **Store selected skills in Firebase when confirming**
document.getElementById("confirmSelection").addEventListener("click", async () => {
    if (selectedSkills.length === 0) {
        alert("Please select at least one skill.");
        return;
    }

    const user = auth.currentUser;
    if (user) {
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { skills: selectedSkills });

            alert("Skills saved successfully!");
            localStorage.setItem("selectedSkills", JSON.stringify(selectedSkills));
            window.location.href = "booking.html"; // Redirect after saving
        } catch (error) {
            console.error("Error saving skills:", error);
            alert("Error saving skills. Please try again.");
        }
    }
});
window.selectSkill = selectSkill;