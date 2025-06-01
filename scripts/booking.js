import { auth, db } from "./firebase.js";
import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userName = localStorage.getItem("userName") || "User";  
    document.getElementById("welcomeMessage").textContent = `Welcome, ${userName}!`;

    const selectedSkills = JSON.parse(localStorage.getItem("selectedSkills")) || [];
    const skillsList = document.getElementById("selectedSkillsList");

    selectedSkills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    document.getElementById("bookClass").addEventListener("click", async () => {
        const timeSlot = document.querySelector(".timeSlot").value;
        
        if (!timeSlot) {
            alert("Please select a time slot.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("Please log in to book a class.");
            window.location.href = "index.html";  // Redirect if not logged in
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { 
                booking: {
                    timeSlot: timeSlot,
                    skills: selectedSkills,
                    trainer: "Manu",
                }
            });

            alert(`Class booked at ${timeSlot} for ${selectedSkills.join(", ")}!`);
            localStorage.setItem("selectedSkills", JSON.stringify(selectedSkills));  // Save locally
            window.location.href = "exercises.html";  // Redirect to exercises page

        } catch (error) {
            console.error("Error booking class:", error);
            alert("Error booking class. Please try again.");
        }
    });
});