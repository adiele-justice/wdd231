document.addEventListener('DOMContentLoaded', async () => {
    const memberList = document.getElementById('member-list');
    const lastModified = document.getElementById('last-modified');
    const currentYear = document.getElementById('current-year');

    // Fetch member data
    const fetchMembers = async () => {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    };

    // Display members
    const displayMembers = (members) => {
        memberList.innerHTML = ''; // Clear existing members
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Website</a></p>
            `;
            memberList.appendChild(card);
        });
    };

    // Toggle view
    document.getElementById('toggle-view').addEventListener('click', () => {
        memberList.classList.toggle('grid-view');
    });

    // Set last modified date
    lastModified.textContent = document.lastModified;

    // Set current year
    currentYear.textContent = new Date().getFullYear();

    // Load members
    await fetchMembers();
});