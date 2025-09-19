// Fetch data from local JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    displayHeroes(data.heroes);
    displayBots(data.bots);
    animateCards(".hero-card");
    animateCards(".bot-card");
  })
  .catch(error => console.error("Error loading data:", error));

// Display hero cards
function displayHeroes(heroes) {
  const container = document.getElementById('hero-container');
  container.innerHTML = ''; 
  heroes.forEach(hero => {
    const card = document.createElement('div');
    card.classList.add('card', 'hero-card');
    card.innerHTML = `
      <img src="${hero.image}" alt="${hero.name}">
      <h3>${hero.name}</h3>
      <p>Recommended Build: ${hero.recommended_build.join(', ')}</p>
    `;
    container.appendChild(card);
  });
}

// Display bot cards
function displayBots(bots) {
  const container = document.getElementById('bot-container');
  container.innerHTML = ''; 
  bots.forEach(bot => {
    const card = document.createElement('div');
    card.classList.add('card', 'bot-card');
    card.innerHTML = `
      <img src="${bot.image}" alt="${bot.name}">
      <h3>${bot.name}</h3>
      <p>${bot.short_description}</p>
      <ul>
        ${bot.commands.map(c => `<li><b>${c.command}:</b> ${c.description}</li>`).join('')}
      </ul>
    `;
    container.appendChild(card);
  });
}

// GSAP Animations
function animateCards(selector) {
  gsap.from(selector, {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out"
  });
}
