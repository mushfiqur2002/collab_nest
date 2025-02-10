import { array } from "./fetchStudent.js";

// Store user ID in localStorage (for testing)
localStorage.setItem("loggedInUser", "user123");

console.log(array);

// Fetch the stored user ID
const storedUserId = localStorage.getItem("loggedInUser");

// Find user based on ID
const user = users.find(u => u.id === storedUserId);

// Function to update the UI
function updateProfile(user) {
    if (user) {
        document.getElementById("profileImage").src = user.image || "default.png";
        document.getElementById("userName").textContent = user.name;
        document.getElementById("boardName").textContent = user.board;
        document.getElementById("boardReg").textContent = user.regNo;
        document.getElementById("versityName").textContent = user.versity;
    } else {
        document.getElementById("userName").textContent = "User Not Found";
    }
}

// Call the function
updateProfile(user);
