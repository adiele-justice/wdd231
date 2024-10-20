// Modal functionality
const modalLinks = document.querySelectorAll('.modal-link');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Modal event listeners
modalLinks.forEach(link => {
    link.onclick = function(event) {
        event.preventDefault();
        const modalId = this.getAttribute('href');
        document.querySelector(modalId).style.display = "block";
    };
});

closeButtons.forEach(button => {
    button.onclick = function() {
        this.parentElement.parentElement.style.display = "none";
    };
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

// Function to get and display the current date
function updateDate() {
    const dateElement = document.querySelector('.current-date'); // Change this to your date element
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = currentDate;
}

// Call updateDate on page load
updateDate();

