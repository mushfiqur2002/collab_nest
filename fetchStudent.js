async function fetchAllStudents() {
    try {
        let response = await fetch('http://localhost:3600/datas');
        let students = await response.json();
        console.log(students);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchAllStudents();
