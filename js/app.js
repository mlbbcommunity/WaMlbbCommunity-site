let data = {};
fetch('data.json')
.then(res => res.json())
.then(json => { data = json; initHeroes(); initBots(); })
.catch(e => console.error(e));
function initHeroes() {
const grid = document.getElementById('hero-grid');
if(!grid) return;
data.heroes.forEach(hero => {
const card = document.createElement('div');
card.classList.add('card');
card.innerHTML = `<img src='${hero.image}' alt='${hero.name}'><h3>$
{hero.name}</h3>`;
card.addEventListener('click', () => openHeroModal(hero));
grid.appendChild(card);
});
}
function openHeroModal(hero){
const modal = document.getElementById('hero-modal');
const info = document.getElementById('modal-hero-info');
const builds = document.getElementById('modal-builds');
info.innerHTML = `<h2>${hero.name}</h2>`;
builds.innerHTML = '';
hero.builds.forEach(build => {
const bCard = document.createElement('div');
bCard.classList.add('build-card');
bCard.innerHTML = build.items.map(i => `<img src='${i.image}' title='$
{i.name}'><span>${i.name}</span>`).join('');
bCard.innerHTML += `<p>Recommended by: ${build.recommended_by}</p>`;
builds.appendChild(bCard);
});
modal.classList.remove('hidden');
gsap.from('.modal-content', {duration:0.5, scale:0.8, opacity:0});
}
const closeModal = document.getElementById('close-modal');
if(closeModal) closeModal.addEventListener('click',
()=>{document.getElementById('hero-modal').classList.add('hidden');});
function initBots(){
const grid = document.getElementById('bot-grid');
if(!grid) return;
data.bots.forEach(bot => {
const card = document.createElement('div');
card.classList.add('card');
card.innerHTML = `<img src='${bot.image}' alt='${bot.name}'><h3>${bot.name}
</h3><p>${bot.short_description}</p>`;
grid.appendChild(card);
});
}
