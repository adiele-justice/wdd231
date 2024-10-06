const courses = [
    { title: "WDD 130", completed: true, credits: 3, type: "WDD" },
    { title: "WDD 231", completed: false, credits: 3, type: "WDD" },
    { title: "CSE 210", completed: false, credits: 4, type: "CSE" },
    { title: "WDD 131", completed: true, credits: 3, type: "WDD" },
    { title: "CSE 110", completed: true, credits: 3, type: "CSE" },
    { title: "CSE 111", completed: true, credits: 4, type: "CSE" },
];

function displayCourses(coursesToDisplay) {
    const courseCardsDiv = document.getElementById("course-cards");
    courseCardsDiv.innerHTML = '';
    let totalCredits = 0;

    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card' + (course.completed ? ' completed' : '');
        courseCard.innerHTML = `<h3>${course.title}</h3><p>Credits: ${course.credits}</p>`;
        courseCardsDiv.appendChild(courseCard);
        totalCredits += course.credits;
    });

    document.getElementById("credit-total").textContent = `Total Credits: ${totalCredits}`;
}

function filterCourses(type) {
    if (type === 'all') {
        displayCourses(courses);
    } else {
        displayCourses(courses.filter(course => course.type === type));
    }
}

document.getElementById("menu-toggle").addEventListener("click", () => {
    const navList = document.getElementById("nav-list");
    navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

displayCourses(courses); // Initial display of courses
