document.addEventListener("DOMContentLoaded", function() {
    // Lazy loading images
    const lazyImages = document.querySelectorAll("img.lazy");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Handling last visit message
    const visitMessage = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / oneDay);
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
        }
    }

    // Update last visit date
    localStorage.setItem("lastVisit", currentDate);
});
