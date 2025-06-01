
document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName") || "Adventurer";
    const selectedSkills = JSON.parse(localStorage.getItem("selectedSkills")) || [];
    const exerciseList = document.getElementById("exerciseList");
    const xpBar = document.getElementById("xpBar");
    const currentXP = document.getElementById("currentXP");
    const userRank = document.getElementById("userRank");

    

    const exercises = {
        "Strength Training": ["Push-ups", "Pull-ups", "Handstand Push-ups", "Deadlift", "Squats", "Bench Press"],
        "Cardio Training": ["Running", "Jumping Jacks", "Burpees", "High Knees", "Mountain Climbers", "Skipping"],
        "Agility Training": ["Ladder Drills", "Box Jumps", "Side Shuffles", "Cone Drills", "Speed Ladder", "Hurdle Hops"],
        "Flexibility Training": ["Hamstring Stretch", "Quadriceps Stretch", "Hip Flexor stretch", "Spinal Stretch"],
        "Mental Focus": ["Meditation", "Puzzles", "Memory training", "Yoga"]
    };

    let xp = 0;
    document.getElementById("userName").textContent = userName;

    selectedSkills.forEach(skill => {
        if (exercises[skill]) {
            exercises[skill].forEach(exercise => {
                const li = document.createElement("li");
                li.textContent = exercise;
                const btn = document.createElement("button");
                btn.textContent = "Complete";
                btn.classList.add("complete-btn");

                btn.addEventListener("click", () => {
                    if (!btn.disabled) {
                        btn.disabled = true;
                        btn.style.opacity = "0.5";
                        xp += 15;
                        currentXP.textContent = xp;
                        xpBar.style.width = `${Math.min((xp / 100) * 100,100)}%`;
                        xpBar.style.transition = "width 0.3s ease-in-out";

                        if (xp >= 100 ) {
                            xp=0;
                            userRank.textContent = "D-Rank";
                            xpBar.style.backgroundColor = "#ffcc00";
                             xpBar.style.width = `${Math.min((xp /300) *100, 100)}%`;

                         
                        }
                    }
                });

                li.appendChild(btn);
                exerciseList.appendChild(li);
            });
        }
    });
});

// Finish Button Functionality
document.getElementById("finishButton").addEventListener("click", () => {
    const motivationalPopup = document.getElementById("motivationalPopup");
    motivationalPopup.style.display = "flex";
});

// Close Popup Button
document.getElementById("closePopup").addEventListener("click", () => {
    const motivationalPopup = document.getElementById("motivationalPopup");
    motivationalPopup.style.display = "none";
});
