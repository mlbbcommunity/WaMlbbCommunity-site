
const DATA_URL = 'data.json';
let DATA = {};
async function init(){
  try{
    const res = await fetch(DATA_URL);
    DATA = await res.json();
    buildHome();
    bindNav();
    startTitleTyping();
    setupPageTransitions();
    observeCards();
    setupParallax();
  }catch(e){
    console.error('Failed to load data.json', e);
    const g = document.querySelector('.grid');
    if(g) g.innerHTML = '<p style="color:#f88;padding:20px">Failed to load content.</p>';
  }
}

function bindNav(){
  document.querySelectorAll('.nav a').forEach(a=>{
    if(location.pathname.endsWith(a.getAttribute('href')) || (location.pathname.endsWith('/') && a.getAttribute('href')==='index.html')){
      a.classList.add('active');
    }
    a.addEventListener('click', (ev)=>{
      const href = a.getAttribute('href');
      if(/^https?:\/\//.test(href)) return;
      ev.preventDefault();
      doNavigate(href);
    });
  });
}

function doNavigate(href){
  const container = document.querySelector('.page-fade') || document.body;
  container.classList.remove('enter');
  container.classList.add('exit');
  setTimeout(()=>{ location.href = href; }, 280);
}

function setupPageTransitions(){
  const container = document.querySelector('main') || document.body;
  container.classList.add('page-fade');
  requestAnimationFrame(()=> setTimeout(()=> container.classList.add('enter'),20));
}

function buildHome(){
  const page = document.body.dataset.page || 'index';
  const g = document.querySelector('.grid');
  if(!g) return;
  if(page==='index'){
    const heroes = DATA.heroes || [];
    const bots = DATA.bots || [];
    const items = heroes.slice(0,6).map(h=>({...h,type:'hero'})).concat(bots.slice(0,6).map(b=>({...b,type:'bot'})));
    g.innerHTML = items.map(i=>cardHtml(i)).join('');
  } else if(page==='heroes'){
    const heroes = DATA.heroes || [];
    g.innerHTML = heroes.map(h=>cardHtml({...h,type:'hero'})).join('');
  } else if(page==='bots'){
    const bots = DATA.bots || [];
    g.innerHTML = bots.map(b=>cardHtml({...b,type:'bot'})).join('');
  }
  attachCardClicks();
}

// card html
function cardHtml(i){
  const img = (i.image && i.image.length>3) ? `<img src="${i.image}" alt="${i.name}" onerror="this.style.display='none'">` : '';
  const initials = i.name.split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase();
  return `<div class="card" data-type="${i.type}" data-name="${i.name}" data-json='${escapeHtml(JSON.stringify(i))}'>
    <div class="avatar">${img || initials}</div>
    <div class="card-body"><div class="card-title">${i.name}</div><div class="card-desc">${i.tag || i.role || i.desc || 'Tap to view profile'}</div></div>
  </div>`;
}

function attachCardClicks(){
  document.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('click', ()=>{
      const js = JSON.parse(unescapeHtml(c.dataset.json));
      openModal(js);
    });
  });
}

function openModal(data){
  const modalBg = document.querySelector('.modal-bg');
  modalBg.style.display = 'flex';
  const modal = document.querySelector('.modal');
  setTimeout(()=> modal.classList.add('open'),20);
  const large = document.querySelector('.modal .large-avatar');
  large.innerHTML = '';
  if(data.image){
    const i = document.createElement('img'); i.src = data.image; i.onerror = ()=>{ large.textContent = data.name.split(' ').map(s=>s[0]).slice(0,2).join('') }
    large.appendChild(i);
  } else {
    large.textContent = data.name.split(' ').map(s=>s[0]).slice(0,2).join('');
  }
  document.querySelector('.modal .m-title').textContent = data.name;
  document.querySelector('.modal .m-sub').textContent = data.role || data.tag || '';
  document.querySelector('.modal .m-desc').textContent = data.desc || data.bio || 'No description available.';
}

function closeModal(){
  const modal = document.querySelector('.modal');
  modal.classList.remove('open');
  setTimeout(()=>{
    document.querySelector('.modal-bg').style.display='none';
    const la = document.querySelector('.modal .large-avatar'); if(la) la.innerHTML='';
  }, 260);
}

// typing animation
function startTitleTyping(){
  const el = document.querySelector('.animated-name');
  if(!el) return;
  const text = 'WAMLBB Community';
  el.textContent = '';
  let i=0;
  const step = ()=>{
    if(i<=text.length){
      el.textContent = text.slice(0,i);
      i++;
      setTimeout(step, 36 + Math.random()*36);
    } else {
      setTimeout(()=>{ i=0; setTimeout(step,600)},2000);
    }
  };
  step();
}

// intersection observer for card entrance animations
function observeCards(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.card').forEach(c=> obs.observe(c));
}

// parallax effect for banner floater elements
function setupParallax(){
  const banner = document.querySelector('.banner');
  if(!banner) return;
  const f1 = document.createElement('div'); f1.className='floater f1'; banner.appendChild(f1);
  const f2 = document.createElement('div'); f2.className='floater f2'; banner.appendChild(f2);

  window.addEventListener('scroll', ()=>{
    const rect = banner.getBoundingClientRect();
    const h = window.innerHeight;
    const pct = Math.max(0, Math.min(1, 1 - (rect.top / h)));
    // translate based on pct
    f1.style.transform = `translateY(${(pct* -18).toFixed(2)}px) rotate(${(pct*6).toFixed(2)}deg) scale(${(1 + pct*0.02).toFixed(3)})`;
    f2.style.transform = `translateY(${(pct*20).toFixed(2)}px) rotate(${(pct* -4).toFixed(2)}deg) scale(${(1 - pct*0.02).toFixed(3)})`;
  }, {passive:true});
}

// helpers
function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function unescapeHtml(s){ return s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'"); }

window.initSite = init;
document.addEventListener('DOMContentLoaded', init);
