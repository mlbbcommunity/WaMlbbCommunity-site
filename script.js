// Fetch data from local JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    displayHeroes(data.heroes);
    displayLeaderboard(data.members);
    animateHeroes();
    animateLeaderboard();
  })
  .catch(error => console.error("Error loading data:", error));

// Display hero cards
function displayHeroes(heroes) {
    const container = document.getElementById('hero-container');
    container.innerHTML = ''; // Clear container
    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.classList.add('hero-card');
        card.innerHTML = `
            <img src="${hero.image}" alt="${hero.name}">
            <h3>${hero.name}</h3>
            <p>Recommended Build: ${hero.recommended_build.join(', ')}</p>
        `;
        container.appendChild(card);
    });
}

// Display leaderboard
function displayLeaderboard(members) {
    const container = document.getElementById('leaderboard-container');
    container.innerHTML = ''; // Clear container
    // Sort by CC descending
    members.sort((a, b) => b.cc - a.cc).forEach(member => {
        const entry = document.createElement('div');
        entry.classList.add('leaderboard-entry');
        entry.innerHTML = `${member.username} - CC: ${member.cc}`;
        container.appendChild(entry);
    });
}

// GSAP Animations
function animateHeroes() {
    gsap.from(".hero-card", {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });
}

function animateLeaderboard() {
    gsap.from(".leaderboard-entry", {
        duration: 1,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });
}
