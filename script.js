/* ============================================================
   VIRTUAL TOUR AROUND COLOMBIA - script.js
   All interactive functionality
   ============================================================ */

"use strict";

/* ============================================================
   NAVIGATION — mobile toggle & scroll highlight
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 6px 30px rgba(0,0,80,0.3)'
    : '0 4px 20px rgba(0,0,80,0.25)';
});

/* ============================================================
   WARM-UP — bubble toggle
   ============================================================ */
function toggleBubble(card) {
  const hint = card.querySelector('.bubble-hint');
  const tap  = card.querySelector('.bubble-tap');
  hint.classList.toggle('hidden');
  tap.textContent = hint.classList.contains('hidden')
    ? 'Tap to think! 💭'
    : 'Tap to hide! 🙈';
}

/* ============================================================
   TOUR STOPS DATA
   ============================================================ */
const tourStops = {
  1: {
    title: 'Bogotá',
    emoji: '🏙️',
    color: 'linear-gradient(135deg,#FCD116,#CE1126)',
    facts: [
      'Bogotá is the capital city of Colombia. It has about 8 million people!',
      'It is one of the highest capital cities in the world — it sits 2,600 meters above sea level!'
    ],
    question: 'What do you think it feels like to live in such a high city?',
    reaction: 'Would you like to visit Bogotá? What would you like to see there?'
  },
  2: {
    title: 'Cartagena',
    emoji: '🏖️',
    color: 'linear-gradient(135deg,#00B4D8,#FFA500)',
    facts: [
      'Cartagena is a city on the Caribbean coast with beautiful old walls and colorful buildings.',
      'It was built more than 400 years ago and is now a UNESCO World Heritage Site!'
    ],
    question: 'Why do you think old cities are important to protect?',
    reaction: 'What is new for you about Cartagena?'
  },
  3: {
    title: 'Medellín',
    emoji: '🌸',
    color: 'linear-gradient(135deg,#56ab2f,#a8e063)',
    facts: [
      'Medellín is called the "City of Eternal Spring" because the weather is always beautiful — not too hot and not too cold!',
      'Every year, Medellín has a famous Flower Festival where people carry huge flower decorations.'
    ],
    question: 'Why do you think they call it the "City of Eternal Spring"?',
    reaction: 'Would you like to visit the Flower Festival? Why or why not?'
  },
  4: {
    title: 'Coffee Region',
    emoji: '☕',
    color: 'linear-gradient(135deg,#6f4e37,#c8a96e)',
    facts: [
      'Colombia is one of the most famous countries in the world for its coffee. The coffee here is very special!',
      'The Coffee Region (called "Eje Cafetero") has green mountains, colorful towns, and friendly people.'
    ],
    question: 'Do you drink coffee? Do you know someone who does?',
    reaction: 'What surprised you about the Coffee Region?'
  },
  5: {
    title: 'Amazon Region',
    emoji: '🌿',
    color: 'linear-gradient(135deg,#11998e,#38ef7d)',
    facts: [
      'Part of the Amazon Rainforest is in Colombia! It is one of the largest forests in the world.',
      'The Amazon River starts in Peru but also flows through Colombia. It is home to thousands of animals and plants!'
    ],
    question: 'Why is it important to protect the Amazon Rainforest?',
    reaction: 'What animals do you think live in the Amazon?'
  },
  6: {
    title: 'Caribbean Coast',
    emoji: '🌊',
    color: 'linear-gradient(135deg,#2196F3,#00E5FF)',
    facts: [
      'The Caribbean Coast of Colombia has beautiful blue water, white sand beaches, and tropical islands!',
      'The Rosario Islands are a popular place to see colorful fish and coral reefs in the sea.'
    ],
    question: 'What would you do first if you visited a beautiful beach?',
    reaction: 'Would you like to swim in the Caribbean Sea?'
  },
  7: {
    title: 'Andes Mountains',
    emoji: '🏔️',
    color: 'linear-gradient(135deg,#8e9eab,#eef2f3)',
    facts: [
      'The Andes Mountains cross through Colombia from south to north. They are very tall and beautiful!',
      'Many Colombian cities like Bogotá and Medellín are built in the Andes Mountains.'
    ],
    question: 'Have you ever seen a mountain? What was it like?',
    reaction: 'What do you like about mountains?'
  },
  8: {
    title: 'Colombian Animals',
    emoji: '🦜',
    color: 'linear-gradient(135deg,#f7971e,#ffd200)',
    facts: [
      'Colombia has more species of birds than any other country in the world — over 1,900 species!',
      'You can find pink dolphins, jaguars, giant anteaters, toucans, and many colorful butterflies in Colombia.'
    ],
    question: 'Which Colombian animal would you most like to see?',
    reaction: 'What new animal did you learn about today?'
  },
  9: {
    title: 'Traditional Food',
    emoji: '🍲',
    color: 'linear-gradient(135deg,#ff6b6b,#feca57)',
    facts: [
      'Arepas are a very popular Colombian food. They are round corn cakes that you can eat at any meal!',
      'Bandeja Paisa is a big, famous dish with rice, beans, egg, meat, and plantains. It is very delicious!'
    ],
    question: 'Have you ever eaten Colombian food? What would you like to try?',
    reaction: 'Which food looks most delicious to you?'
  },
  10: {
    title: 'Festivals & Culture',
    emoji: '🎉',
    color: 'linear-gradient(135deg,#a855f7,#ec4899)',
    facts: [
      'Colombia has many colorful festivals! The Barranquilla Carnival is one of the biggest in the world — people dance, wear costumes, and celebrate for 4 days!',
      'Cumbia is a traditional Colombian music and dance. It mixes African, Indigenous, and European rhythms!'
    ],
    question: 'Do you have a special festival in your city or country?',
    reaction: 'What do you like most about Colombian culture?'
  }
};

/* ---- Visited stops tracker ---- */
let visitedStops = new Set();

/* ---- Open a stop modal ---- */
function openStop(card) {
  const stopId = parseInt(card.dataset.stop);
  const stop   = tourStops[stopId];
  if (!stop) return;

  // Mark visited
  if (!visitedStops.has(stopId)) {
    visitedStops.add(stopId);
    card.classList.add('visited');
    card.querySelector('.visited-badge').classList.remove('hidden');
    updateProgress();
  }

  // Build modal content
  const modal   = document.getElementById('stopModal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-header" style="background:${stop.color};">
      <span class="modal-emoji">${stop.emoji}</span>
      <h2>${stop.title}</h2>
    </div>
    <div class="modal-body">
      ${stop.facts.map(f => `<div class="modal-fact"><p>${f}</p></div>`).join('')}
      <div class="modal-question"><p>${stop.question}</p></div>
      <div class="modal-reaction"><p>${stop.reaction}</p></div>
      <div class="modal-btn-group">
        <button class="modal-btn modal-btn-secondary" onclick="closeModalBtn()">⬅ Back to Tour</button>
        <button class="modal-btn modal-btn-primary" onclick="nextStop(${stopId})">Next Stop ➡</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/* ---- Next stop from modal ---- */
function nextStop(current) {
  closeModalBtn();
  const nextId = current < 10 ? current + 1 : 1;
  const nextCard = document.querySelector(`.tour-card[data-stop="${nextId}"]`);
  if (nextCard) {
    setTimeout(() => {
      nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => openStop(nextCard), 400);
    }, 200);
  }
}

/* ---- Close modal ---- */
function closeModal(event) {
  if (event.target.id === 'stopModal') closeModalBtn();
}
function closeModalBtn() {
  document.getElementById('stopModal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ---- Close modal on Escape key ---- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalBtn();
});

/* ---- Update progress bar ---- */
function updateProgress() {
  const total   = 10;
  const visited = visitedStops.size;
  const pct     = (visited / total) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${visited} / ${total}`;
}

/* ============================================================
   VOCABULARY
   ============================================================ */
const vocabWords = [
  { icon: '🏙️', word: 'City',       translation: 'ciudad',      color: '#3B82F6',
    sentence: 'Bogotá is the capital city of Colombia.' },
  { icon: '⛰️', word: 'Mountain',   translation: 'montaña',     color: '#8B5CF6',
    sentence: 'The Andes Mountains are very high.' },
  { icon: '🌿', word: 'Rainforest', translation: 'selva',        color: '#10B981',
    sentence: 'The Amazon is a huge rainforest.' },
  { icon: '🏖️', word: 'Beach',      translation: 'playa',        color: '#F59E0B',
    sentence: 'Cartagena has beautiful beaches.' },
  { icon: '🌊', word: 'River',      translation: 'río',           color: '#06B6D4',
    sentence: 'The Amazon River is very long.' },
  { icon: '🍲', word: 'Food',       translation: 'comida',       color: '#EF4444',
    sentence: 'Colombian food is very delicious!' },
  { icon: '🦜', word: 'Animal',     translation: 'animal',       color: '#F97316',
    sentence: 'Colombia has many wild animals.' },
  { icon: '🎭', word: 'Tradition',  translation: 'tradición',    color: '#EC4899',
    sentence: 'Cumbia is an important tradition.' },
  { icon: '🎉', word: 'Festival',   translation: 'festival',     color: '#A855F7',
    sentence: 'The Carnival is a famous festival.' },
  { icon: '☕', word: 'Coffee',     translation: 'café',          color: '#92400E',
    sentence: 'Colombian coffee is very good!' },
  { icon: '🌍', word: 'Culture',    translation: 'cultura',      color: '#059669',
    sentence: 'Colombia has a rich culture.' },
  { icon: '🗺️', word: 'Region',     translation: 'región',       color: '#0EA5E9',
    sentence: 'The Coffee Region is very beautiful.' },
];

function buildVocab() {
  const grid = document.getElementById('vocabGrid');
  vocabWords.forEach(v => {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    card.style.setProperty('--v-color', v.color);
    card.innerHTML = `
      <span class="vocab-icon">${v.icon}</span>
      <span class="vocab-word">${v.word}</span>
      <span class="vocab-translation">(${v.translation})</span>
      <div class="vocab-sentence">${v.sentence}</div>
    `;
    card.addEventListener('click', () => {
      // Toggle sentence
      const isActive = card.classList.contains('active');
      document.querySelectorAll('.vocab-card.active').forEach(c => c.classList.remove('active'));
      if (!isActive) card.classList.add('active');
    });
    grid.appendChild(card);
  });
}

/* ============================================================
   QUIZ ACTIVITY
   ============================================================ */
const quizQuestions = [
  {
    q: 'What is the capital city of Colombia?',
    options: ['Medellín', 'Bogotá', 'Cartagena', 'Cali'],
    answer: 1
  },
  {
    q: 'Medellín is called the "City of _____ Spring."',
    options: ['Early', 'Late', 'Eternal', 'Cold'],
    answer: 2
  },
  {
    q: 'Colombia is famous for producing which drink?',
    options: ['Tea', 'Juice', 'Coffee', 'Milk'],
    answer: 2
  },
  {
    q: 'Which animal can you find in the Amazon?',
    options: ['Polar bear', 'Pink dolphin', 'Tiger', 'Penguin'],
    answer: 1
  },
  {
    q: 'What is a very popular Colombian food made of corn?',
    options: ['Pizza', 'Sushi', 'Arepa', 'Burger'],
    answer: 2
  },
  {
    q: 'The Barranquilla Carnival is one of the biggest in the ___.',
    options: ['City', 'Country', 'School', 'World'],
    answer: 3
  }
];

let quizAnswers = new Array(quizQuestions.length).fill(null);
let quizSubmitted = false;

function buildQuiz() {
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';
  quizAnswers = new Array(quizQuestions.length).fill(null);
  quizSubmitted = false;

  quizQuestions.forEach((q, qi) => {
    const item = document.createElement('div');
    item.className = 'quiz-item';
    item.innerHTML = `
      <p>${qi + 1}. ${q.q}</p>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <button class="quiz-opt" data-qi="${qi}" data-oi="${oi}" onclick="selectQuizOpt(this,${qi},${oi})">
            ${String.fromCharCode(65 + oi)}) ${opt}
          </button>
        `).join('')}
      </div>
    `;
    container.appendChild(item);
  });

  document.getElementById('quizScore').classList.add('hidden');
  document.getElementById('quizSubmit').classList.remove('hidden');
  document.getElementById('quizReset').classList.add('hidden');
}

function selectQuizOpt(btn, qi, oi) {
  if (quizSubmitted) return;
  document.querySelectorAll(`.quiz-opt[data-qi="${qi}"]`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  quizAnswers[qi] = oi;
}

function submitQuiz() {
  if (quizAnswers.some(a => a === null)) {
    alert('Please answer all questions first! 😊');
    return;
  }
  quizSubmitted = true;
  let score = 0;
  quizQuestions.forEach((q, qi) => {
    const opts = document.querySelectorAll(`.quiz-opt[data-qi="${qi}"]`);
    opts.forEach((btn, oi) => {
      if (oi === q.answer) btn.classList.add('correct');
      else if (quizAnswers[qi] === oi) btn.classList.add('wrong');
    });
    if (quizAnswers[qi] === q.answer) score++;
  });
  const scoreEl = document.getElementById('quizScore');
  scoreEl.classList.remove('hidden');
  scoreEl.innerHTML = `${getScoreEmoji(score, quizQuestions.length)} You got <strong>${score} / ${quizQuestions.length}</strong> correct! ${getScoreMsg(score, quizQuestions.length)}`;
  document.getElementById('quizSubmit').classList.add('hidden');
  document.getElementById('quizReset').classList.remove('hidden');
}

function resetQuiz() { buildQuiz(); }

/* ============================================================
   TRUE OR FALSE ACTIVITY
   ============================================================ */
const tfStatements = [
  { text: 'Bogotá is the capital city of Colombia.', answer: true },
  { text: 'Colombia is in Europe.', answer: false },
  { text: 'The Amazon Rainforest is in Colombia.', answer: true },
  { text: 'Cartagena is a city in the mountains.', answer: false },
  { text: 'Colombia has more bird species than any other country.', answer: true },
  { text: 'Arepa is made from wheat.', answer: false },
  { text: 'The Barranquilla Carnival lasts 4 days.', answer: true },
];

let tfAnswers = new Array(tfStatements.length).fill(null);
let tfSubmitted = false;

function buildTF() {
  const container = document.getElementById('tfContainer');
  container.innerHTML = '';
  tfAnswers = new Array(tfStatements.length).fill(null);
  tfSubmitted = false;

  tfStatements.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'tf-item';
    item.innerHTML = `
      <p>${i + 1}. ${s.text}</p>
      <div class="tf-buttons">
        <button class="tf-btn true" data-i="${i}" data-v="true" onclick="selectTF(this,${i},true)">✅ True</button>
        <button class="tf-btn false" data-i="${i}" data-v="false" onclick="selectTF(this,${i},false)">❌ False</button>
      </div>
    `;
    container.appendChild(item);
  });

  document.getElementById('tfScore').classList.add('hidden');
  document.getElementById('tfSubmit').classList.remove('hidden');
  document.getElementById('tfReset').classList.add('hidden');
}

function selectTF(btn, i, val) {
  if (tfSubmitted) return;
  document.querySelectorAll(`.tf-btn[data-i="${i}"]`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  tfAnswers[i] = val;
}

function submitTF() {
  if (tfAnswers.some(a => a === null)) {
    alert('Please answer all statements! 😊');
    return;
  }
  tfSubmitted = true;
  let score = 0;
  tfStatements.forEach((s, i) => {
    const buttons = document.querySelectorAll(`.tf-btn[data-i="${i}"]`);
    buttons.forEach(btn => {
      const val = btn.dataset.v === 'true';
      if (val === s.answer) btn.classList.add('correct');
      else if (tfAnswers[i] === val) btn.classList.add('wrong');
    });
    if (tfAnswers[i] === s.answer) score++;
  });
  const scoreEl = document.getElementById('tfScore');
  scoreEl.classList.remove('hidden');
  scoreEl.innerHTML = `${getScoreEmoji(score, tfStatements.length)} You got <strong>${score} / ${tfStatements.length}</strong> correct! ${getScoreMsg(score, tfStatements.length)}`;
  document.getElementById('tfSubmit').classList.add('hidden');
  document.getElementById('tfReset').classList.remove('hidden');
}

function resetTF() { buildTF(); }

/* ============================================================
   MATCH ACTIVITY
   ============================================================ */
const matchPairs = [
  { word: '🏙️ Bogotá',    key: 'bogota' },
  { word: '☕ Coffee',     key: 'coffee' },
  { word: '🌿 Rainforest', key: 'rainforest' },
  { word: '🏖️ Beach',     key: 'beach' },
  { word: '🦜 Toucan',    key: 'toucan' },
  { word: '🎉 Festival',  key: 'festival' },
];
const matchEmojis = [
  { emoji: '☕ A hot drink', key: 'coffee' },
  { emoji: '🌿 Green trees', key: 'rainforest' },
  { emoji: '🏙️ Capital city', key: 'bogota' },
  { emoji: '🏖️ Sand & water', key: 'beach' },
  { emoji: '🎉 Music & dance', key: 'festival' },
  { emoji: '🦜 Colorful bird', key: 'toucan' },
];

let matchSelected = null;
let matchMatched  = new Set();

function buildMatch() {
  matchSelected = null;
  matchMatched  = new Set();

  const words   = shuffle([...matchPairs]);
  const emojis  = shuffle([...matchEmojis]);

  const wCol = document.getElementById('matchWords');
  const eCol = document.getElementById('matchEmojis');
  wCol.innerHTML = '';
  eCol.innerHTML = '';

  words.forEach(p => {
    const btn = document.createElement('div');
    btn.className = 'match-item';
    btn.dataset.key = p.key;
    btn.dataset.side = 'word';
    btn.textContent = p.word;
    btn.addEventListener('click', () => handleMatch(btn));
    wCol.appendChild(btn);
  });

  emojis.forEach(p => {
    const btn = document.createElement('div');
    btn.className = 'match-item';
    btn.dataset.key = p.key;
    btn.dataset.side = 'emoji';
    btn.textContent = p.emoji;
    btn.addEventListener('click', () => handleMatch(btn));
    eCol.appendChild(btn);
  });

  document.getElementById('matchScore').classList.add('hidden');
  document.getElementById('matchReset').classList.add('hidden');
}

function handleMatch(btn) {
  if (btn.classList.contains('matched')) return;

  if (!matchSelected) {
    // Select first item
    document.querySelectorAll('.match-item.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    matchSelected = btn;
    return;
  }

  // Check if same side — just re-select
  if (matchSelected.dataset.side === btn.dataset.side) {
    document.querySelectorAll('.match-item.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    matchSelected = btn;
    return;
  }

  // Check match
  if (matchSelected.dataset.key === btn.dataset.key) {
    // Correct!
    matchSelected.classList.remove('selected');
    matchSelected.classList.add('matched');
    btn.classList.add('matched');
    matchMatched.add(btn.dataset.key);
    matchSelected = null;

    if (matchMatched.size === matchPairs.length) {
      const scoreEl = document.getElementById('matchScore');
      scoreEl.classList.remove('hidden');
      scoreEl.innerHTML = '🎉 Excellent! You matched everything! Perfect score! ⭐';
      document.getElementById('matchReset').classList.remove('hidden');
    }
  } else {
    // Wrong
    matchSelected.classList.remove('selected');
    matchSelected.classList.add('wrong');
    btn.classList.add('wrong');
    const prev = matchSelected;
    matchSelected = null;
    setTimeout(() => {
      prev.classList.remove('wrong');
      btn.classList.remove('wrong');
    }, 700);
  }
}

function resetMatch() { buildMatch(); }

/* ============================================================
   ACTIVITY TABS
   ============================================================ */
function showActivity(name) {
  document.querySelectorAll('.activity-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.act-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('act-' + name).classList.add('active');
  document.querySelectorAll('.act-tab').forEach(t => {
    if (t.getAttribute('onclick').includes(name)) t.classList.add('active');
  });
}

/* ============================================================
   REFLECTION — save
   ============================================================ */
function saveReflections() {
  const inputs = document.querySelectorAll('.reflect-input');
  const hasContent = Array.from(inputs).some(i => i.value.trim().length > 0);
  if (!hasContent) {
    alert('Please write at least one answer! 😊');
    return;
  }
  const success = document.getElementById('reflectSuccess');
  success.classList.remove('hidden');
  setTimeout(() => success.classList.add('hidden'), 3500);
  // Scroll to final section
  setTimeout(() => {
    document.getElementById('final').scrollIntoView({ behavior: 'smooth' });
  }, 1000);
}

/* ============================================================
   CONFETTI on final section
   ============================================================ */
function buildConfetti() {
  const area   = document.getElementById('confettiArea');
  const colors = ['#FCD116','#CE1126','#003087','#3CB371','#EC4899','#F97316','#A855F7'];
  for (let i = 0; i < 20; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * -20}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${2 + Math.random() * 2}s;
      width:  ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    area.appendChild(piece);
  }
}

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */
function getScoreEmoji(score, total) {
  const pct = score / total;
  if (pct === 1)   return '🏆';
  if (pct >= 0.7)  return '🌟';
  if (pct >= 0.5)  return '👍';
  return '📚';
}
function getScoreMsg(score, total) {
  const pct = score / total;
  if (pct === 1)   return 'Perfect! You are a Colombia expert! 🇨🇴';
  if (pct >= 0.7)  return 'Great job! Keep learning! 😊';
  if (pct >= 0.5)  return 'Good try! Review the tour and try again!';
  return 'Keep exploring the tour and try again!';
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================
   INTERSECTION OBSERVER — animate sections on scroll
   ============================================================ */
function setupScrollAnimations() {
  const targets = document.querySelectorAll(
    '.warmup-grid .bubble-card, .tour-card, .vocab-card, .reflect-card'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.08}s, transform 0.5s ease ${(i % 6) * 0.08}s`;
    observer.observe(el);
  });
}

/* ============================================================
   INIT — run everything on page load
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildVocab();
  buildQuiz();
  buildTF();
  buildMatch();
  buildConfetti();
  updateProgress();
  setupScrollAnimations();

  console.log('🇨🇴 Virtual Tour Around Colombia loaded successfully!');
});
