let courseCount = 0;

// Standard 4.0 grade points mapping
const gradePoints = {
    "A+": 4.00,
    "A": 4.00,
    "A-": 3.75,
    "B+": 3.50,
    "B": 3.00,
    "B-": 2.75,
    "C+": 2.50,
    "C": 2.00,
    "F": 0.00
};

// Add a new course
function addCourse() {
    courseCount++;
    const coursesDiv = document.getElementById("courses");

    const courseHTML = `
        <div class="form-group" id="course-${courseCount}">
            <input type="text" placeholder="Course Name" class="form-control course-name" required />
            <input type="number" placeholder="Credit Hours" class="form-control credit-hours" min="1" required />
            <input type="text" placeholder="Grade (A, B+, C-, etc.)" class="form-control grade" required />
            <button type="button" onclick="removeCourse(${courseCount})" class="form-button remove-btn">Remove</button>
        </div>
    `;

    coursesDiv.insertAdjacentHTML("beforeend", courseHTML);
}

// Remove a course
function removeCourse(id) {
    document.getElementById(`course-${id}`).remove();
}

// Calculate GPA
document.getElementById("gpaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const names = document.querySelectorAll(".course-name");
    const credits = document.querySelectorAll(".credit-hours");
    const grades = document.querySelectorAll(".grade");
    const showData = document.getElementById("showdata");

    let totalPoints = 0;
    let totalCredits = 0;
    let output = "<ul>";

    for (let i = 0; i < names.length; i++) {
        const name = names[i].value;
        const credit = parseFloat(credits[i].value);
        const grade = grades[i].value.toUpperCase();

        if (!gradePoints.hasOwnProperty(grade) || isNaN(credit) || credit <= 0) {
            showData.innerHTML = `❌ Invalid input for ${name}. Please enter valid credit hours and grade.`;
            showData.style.color = "red";
            return;
        }

        const points = gradePoints[grade] * credit;
        totalPoints += points;
        totalCredits += credit;

        output += `<li>${name}: ${credit} credit(s), Grade: ${grade}, Grade Points: ${(gradePoints[grade]).toFixed(2)}</li>`;
    }

    const gpa = totalPoints / totalCredits;
    output += `</ul>`;
    output += `<p>✅ Total Credit Hours: ${totalCredits}, GPA: ${gpa.toFixed(2)}</p>`;

    showData.innerHTML = output;
    showData.style.color = "#222";
});
