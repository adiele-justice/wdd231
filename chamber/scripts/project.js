document.addEventListener('DOMContentLoaded', async () => {
    const memberList = document.getElementById('member-list');

    const fetchMembers = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Failed to fetch members:', error);
            memberList.innerHTML = '<p>Error loading member data.</p>'; // Display error message
        }
    };

    const displayMembers = (members) => {
        memberList.innerHTML = ''; // Clear existing members
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card'); // Use consistent class name
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

    document.getElementById('toggle-view').addEventListener('click', () => {
        memberList.classList.toggle('grid-view');
    });

    await fetchMembers();
});
