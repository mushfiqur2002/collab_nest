export let array =[];

async function fetchAllStudents() {
    try {
        let response = await fetch('http://localhost:3600/datas');
        let students = await response.json();
        console.log(students);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function fetchAGuest() {
    try {
        let response = await fetch('http://localhost:3600/guest');
        let guest = await response.json();
        array = guest;
        console.log('guest array : ', guest);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchAllStudents();
fetchAGuest();
