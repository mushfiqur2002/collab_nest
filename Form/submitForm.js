// import { notification } from "./../index.html";
import { array } from "../fetchStudent.js";

let sumbitForms = document.querySelectorAll('form');

sumbitForms.forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // ✅ Prevent default form submission

        let targetFormId = event.target.id;
        let targetFormData = new FormData(event.target);
        let typeOfForm = event.target.dataset.type;

        // ✅ Guest Forms (Login & Signup)
        if (targetFormId === 'guest') {
            if (typeOfForm === 'login') {
                handleGuestLogin(targetFormData);
            } else {
                handleGuestSignUp(targetFormData);
            }
        }
        // ✅ Versity Forms (Login & Signup)
        else if (targetFormId === 'versity') {
            if (typeOfForm === 'login') {
                handelVersityLogin(targetFormData);
            } else {
                handelVersitySignUp(targetFormData);
            }
        }
    });
});

// Fetch API Function
async function fetchAPI(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

// Guest Login
function handleGuestLogin(data) {
    const newData = Object.fromEntries(data.entries());
console.log("Login Data Sent:", newData); // ✅ Check what data is sent

const reg = parseInt(newData.regNumber);
const email = newData.email;
const pass = newData.password;
const board_name = newData.board;

const foundUser = array.some(user => 
    user.reg_id == reg && 
    user.board_name === board_name && 
    user.email === email && 
    user.password === pass
);

if (foundUser) {
    alert('Login Successfully');

    // Store reg_id in localStorage for session tracking
    localStorage.setItem("loggedInUser", reg);

    window.location.href = "./../index.html"; // Redirect to home
} else {
    alert('Incorrect credentials. Please try again.');
    window.location.href = "login.html"; // Redirect back to login page
}




    // fetchAPI('http://localhost:3600/login', {
    //     reg_id: parseInt(newData.regNumber),
    //     board_name: newData.board,
    //     email: newData.email,
    //     password: newData.pass
    // })
    // .then(result => {
    //     console.log("Login Response:", result); // ✅ Check the response
    //     if (result.success) {
    //         alert('Login successful');
    //         window.location.href = './../index.html';
    //     } else {
    //         alert('Login failed: ' + result.error);
    //     }
    // })
    // .catch(() => alert('Something went wrong'));
}




// Versity Login
function handelVersityLogin(data) {
    const newData = Object.fromEntries(data.entries());
    console.log("Versity login:", newData);
}

// Guest Signup
function handleGuestSignUp(data) {
    const newData = Object.fromEntries(data.entries());
    const { regNumber, board, email, pass } = newData;

    fetchAPI('http://localhost:3600/checkStudent', {
        reg_id: parseInt(regNumber),
        board_name: board
    })
        .then(result => {
            if (!result.exists) throw new Error('Student not found');

            return fetchAPI('http://localhost:3600/signup', {
                reg_id: parseInt(regNumber),
                board_name: board,
                email: email,
                password: pass
            });
        })
        .then(result => {
            if (result.success) {
                alert('Signup successful');
                window.location.href = 'login.html';
            } else {
                alert(result.error);
            }
        })
        .catch(error => alert(error.message));
}

// Versity Signup
function handelVersitySignUp(data) {
    const newData = Object.fromEntries(data.entries());
    console.log("Versity signup:", newData);
}
