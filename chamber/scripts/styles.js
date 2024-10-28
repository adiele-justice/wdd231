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



// Initialize the page
document.getElementById('current-year').innerText = new Date().getFullYear();
document.getElementById('last-modified').innerText = document.lastModified;