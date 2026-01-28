// Grade → Grade Point mapping
const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "U": 0,
    "RA": 0,
    "AB": 0
};


// Validate semester count
function checkcondition() {
    const value = Number(document.getElementById("numSem").value);

    if (value > 0 && value <= 8) {
        createSemesters();
    } else {
        document.getElementById("output").innerText =
            "Enter valid number of semesters (1–8)";
    }
}

// Create semester blocks
function createSemesters() {
    const n = Number(document.getElementById("numSem").value);
    const container = document.getElementById("semesters");
    container.innerHTML = "";

    for (let s = 1; s <= n; s++) {
        container.innerHTML += `
            <div class="semester-box">
                <h3>Semester ${s}</h3>
                <label>No. of Subjects</label>
                <input type="number" min="1" id="sub_${s}">
                <button onclick="createSubjects(${s})">Add Subjects</button>
                <div id="subjects_${s}"></div>
            </div>
        `;
    }
}

// Create subject rows
function createSubjects(sem) {
    const n = Number(document.getElementById(`sub_${sem}`).value);
    const container = document.getElementById(`subjects_${sem}`);
    container.innerHTML = "";

    for (let i = 1; i <= n; i++) {
        container.innerHTML += `
            <div class="subject-row">
                <input type="number" min="0" placeholder="Credits" id="c_${sem}_${i}">
                <select id="g_${sem}_${i}">
                    <option value="O">O</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="U">U</option>
                    <option value="RA">RA</option>
                    <option value="AB">AB</option>
                </select>
            </div>
        `;
    }
}

// Calculate CGPA
function calculateCGPA() {
    const n = Number(document.getElementById("numSem").value);
    let totalCredits = 0;
    let totalPoints = 0;

    for (let s = 1; s <= n; s++) {
        const sub = Number(document.getElementById(`sub_${s}`).value);

        if (!sub || sub <= 0) {
            alert(`Add subjects for Semester ${s}`);
            return;
        }

        for (let i = 1; i <= sub; i++) {
            const creditInput = document.getElementById(`c_${s}_${i}`).value;
            const grade = document.getElementById(`g_${s}_${i}`).value;

            if (creditInput === "" || Number(creditInput) <= 0) {
                alert(`Enter valid credits for Semester ${s}, Subject ${i}`);
                return;
            }

            if (grade === "U" || grade === "RA" || grade === "AB") continue;

            const credit = Number(creditInput);
            totalCredits += credit;
            totalPoints += credit * gradePoints[grade];
        }
    }

    const cgpa = Math.round((totalPoints / totalCredits) * 1000) / 1000;
    document.getElementById("output").innerText = `Your CGPA is: ${cgpa}`;
}
