const AppState = {
  currentWordIndex: 0,
  score: 0,
  answered: false,
  wordOrder: [],
  reset() {
    this.currentWordIndex = 0;
    this.score = 0;
    this.answered = false;
    this.wordOrder = [];
  },
};

function initializeApp() {
  createBackgroundStars();
  buildAlphabetButtons();
  buildEmotionCards();
  buildStoriesList();
}

function createBackgroundStars() {
  const container = document.getElementById('starsContainer');
  const starsCount = CONFIG.STARS_COUNT;
  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 3;
    star.style.cssText = `width: ${size}px; height: ${size}px; left: ${randomX}%; top: ${randomY}%; --dur: ${duration}s; animation-delay: ${delay}s;`;
    container.appendChild(star);
  }
}

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.remove('active');
  });
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
  window.scrollTo(0, 0);
  if (screenId === 'screen-juego') {
    initializeGame();
  }
}

function buildAlphabetButtons() {
  const grid = document.getElementById('abcGrid');
  const letters = Object.keys(ALPHABET_DATA);
  letters.forEach((letter) => {
    const button = document.createElement('button');
    button.className = 'abc-btn';
    button.textContent = letter;
    button.setAttribute('aria-label', `Letra ${letter}`);
    button.addEventListener('click', () => selectLetter(letter, button));
    grid.appendChild(button);
  });
}

function selectLetter(letter, button) {
  document.querySelectorAll('.abc-btn').forEach((btn) => {
    btn.classList.remove('active-letter');
  });
  button.classList.add('active-letter');
  const letterData = ALPHABET_DATA[letter];
  document.getElementById('bigLetter').textContent = letter;
  document.getElementById('letterEmoji').textContent = letterData.emoji;
  document.getElementById('letterWord').innerHTML = `${letter} de <strong>${letterData.word}</strong>`;
  document.getElementById('letterPhrase').textContent = letterData.phrase;
  const panel = document.getElementById('letterPanel');
  if (panel) {
    panel.style.display = 'block';
    panel.style.animation = 'none';
    setTimeout(() => { panel.style.animation = ''; }, 10);
  }
}

function buildEmotionCards() {
  const grid = document.getElementById('emoGrid');
  EMOTIONS_DATA.forEach((emotion) => {
    const card = document.createElement('button');
    card.className = 'emo-card';
    card.style.background = emotion.bgColor;
    card.style.borderColor = emotion.color + '80';
    card.setAttribute('aria-label', `Emoción: ${emotion.name}`);
    card.setAttribute('aria-pressed', 'false');
    card.innerHTML = `<span class="emo-face" aria-hidden="true">${emotion.emoji}</span><div class="emo-name">${emotion.name}</div>`;
    card.addEventListener('click', () => selectEmotion(emotion, card));
    grid.appendChild(card);
  });
}

function selectEmotion(emotion, card) {
  document.querySelectorAll('.emo-card').forEach((c) => {
    c.classList.remove('selected', 'pop');
    c.setAttribute('aria-pressed', 'false');
  });
  card.classList.add('selected');
  card.setAttribute('aria-pressed', 'true');

  // Pequeño rebote llamativo al elegir la emoción
  card.classList.remove('pop');
  void card.offsetWidth; // fuerza el reinicio de la animación
  card.classList.add('pop');

  playEmotionSound(emotion.id);

  const panel = document.getElementById('emoPanel');
  document.getElementById('emoBigFace').textContent = emotion.emoji;
  document.getElementById('emoTitle').textContent = emotion.name;
  document.getElementById('emoTitle').style.color = emotion.color;
  document.getElementById('emoDesc').textContent = emotion.description;
  document.getElementById('emoTip').textContent = emotion.tip;
  panel.style.borderColor = emotion.color + '60';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function buildStoriesList() {
  const list = document.getElementById('storyList');
  STORIES_DATA.forEach((story) => {
    const card = document.createElement('button');
    card.className = 'story-card';
    card.setAttribute('aria-label', `Cuento: ${story.title}`);
    card.setAttribute('role', 'listitem');
    card.innerHTML = `<span class="story-icon" aria-hidden="true">${story.icon}</span><div class="story-info"><h3>${story.title}</h3><p>${story.tag} · ${story.pages.length} páginas</p></div><span style="margin-left: auto; font-size: 1.5rem; opacity: 0.5;" aria-hidden="true">→</span>`;
    card.addEventListener('click', () => openStory(story));
    list.appendChild(card);
  });
}

function openStory(story) {
  playStoryOpenSound();
  const content = document.getElementById('storyContent');

  const storyHTML = `
    <div style="text-align: center; margin-bottom: 16px;">
      <span class="story-icon-open" style="font-size: 3rem;" aria-hidden="true">${story.icon}</span>
      <h2 style="font-family: var(--font-display); font-size: 1.6rem; margin-top: 10px; font-weight: 800;">
        ${story.title}
      </h2>
      <span style="background: rgba(255, 255, 255, 0.1); border-radius: 50px; padding: 4px 14px; font-size: 0.8rem; color: var(--color-text-muted); display: inline-block;">
        ${story.tag}
      </span>
    </div>

    <div class="story-body">
      ${story.pages.map((page) => `<p>${page}</p>`).join('')}
    </div>

    <div style="margin-top: 20px; padding: 14px; background: rgba(255, 255, 255, 0.07); border-radius: 14px; font-size: 0.95rem; font-weight: 700; color: #fbbf24; text-align: center;">
      ${story.moral}
    </div>

    <div style="margin-top: 12px; text-align: center; font-size: 0.85rem; color: var(--color-text-muted);">
      Emoción trabajada: <strong>${story.emotion}</strong>
    </div>
  `;

  content.innerHTML = storyHTML;
  goTo('screen-cuento-detalle');
}

function initializeGame() {
  AppState.reset();
  AppState.wordOrder = shuffleArray(WORD_GAME_DATA).slice(0, CONFIG.GAME_MAX_WORDS);
  renderScoreBar();
  renderProgress();
  showWord();
}

function renderScoreBar() {
  const starsRow = document.getElementById('starsRow');
  const scoreCount = document.getElementById('scoreCount');
  starsRow.innerHTML = '';
  for (let i = 0; i < CONFIG.GAME_MAX_SCORE; i++) {
    const star = document.createElement('span');
    star.className = 'star-icon';
    star.textContent = i < AppState.score ? '⭐' : '☆';
    starsRow.appendChild(star);
  }
  scoreCount.textContent = `${AppState.score} / ${CONFIG.GAME_MAX_SCORE}`;
}

function renderProgress() {
  const progressRow = document.getElementById('progressRow');
  progressRow.innerHTML = '';
  for (let i = 0; i < CONFIG.GAME_MAX_WORDS; i++) {
    const dot = document.createElement('div');
    dot.className = 'prog-dot';
    if (i < AppState.currentWordIndex) {
      dot.classList.add('done');
    } else if (i === AppState.currentWordIndex) {
      dot.classList.add('active');
    }
    progressRow.appendChild(dot);
  }
}

/**
 * Dibuja la palabra incompleta como una serie de casillas:
 * cada letra visible es un span, y cada letra faltante ("_")
 * se dibuja como una casilla/raya individual, en vez de un
 * bloque continuo de guiones bajos.
 * @param {string} displayText - ej. "ES___LLA"
 */
function renderSyllableDisplay(displayText) {
  const container = document.getElementById('syllableDisplay');
  const blankCount = (displayText.match(/_/g) || []).length;

  container.innerHTML = displayText
    .split('')
    .map((char) => {
      if (char === '_') {
        return '<span class="syl-blank" aria-hidden="true"></span>';
      }
      return `<span class="syl-letter" aria-hidden="true">${char}</span>`;
    })
    .join('');

  container.setAttribute(
    'aria-label',
    `Palabra incompleta, faltan ${blankCount} letras: ${displayText}`
  );
}

function showWord() {
  if (AppState.currentWordIndex >= AppState.wordOrder.length) {
    showGameFinal();
    return;
  }
  const word = AppState.wordOrder[AppState.currentWordIndex];
  AppState.answered = false;
  renderSyllableDisplay(word.display);
  document.getElementById('wordHint').textContent = word.hint;
  document.getElementById('resultBadge').className = 'result-badge';
  document.getElementById('nextWordBtn').style.display = 'none';
  const options = document.getElementById('wordOptions');
  options.innerHTML = '';
  const shuffledOptions = shuffleArray(word.options);
  shuffledOptions.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'word-option';
    button.textContent = option;
    button.setAttribute('aria-label', `Opción: ${option}`);
    button.addEventListener('click', () => checkAnswer(option, word, button));
    options.appendChild(button);
  });
}

// ===== SONIDOS =====
// Se generan con Web Audio API (sin archivos externos que subir al repo).
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const startTime = ctx.currentTime + delay;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, startTime);
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.18, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
  } catch (e) {
    // Si el audio está bloqueado por el navegador, seguimos sin sonido.
  }
}

/**
 * Sonido alegre y ascendente para respuesta correcta.
 */
function playCorrectSound() {
  playTone(523.25, 0.16, 'sine', 0); // Do5
  playTone(659.25, 0.16, 'sine', 0.1); // Mi5
  playTone(783.99, 0.28, 'sine', 0.2); // Sol5
}

/**
 * Sonido corto y suave (no punitivo) para respuesta incorrecta.
 */
function playWrongSound() {
  playTone(349.23, 0.18, 'triangle', 0); // Fa4
  playTone(293.66, 0.28, 'triangle', 0.12); // Re4
}

/**
 * Reproduce varias notas en secuencia rápida (arpegio).
 * @param {number[]} freqs - Frecuencias en Hz, en orden.
 */
function playArpeggio(freqs, type = 'sine', noteDuration = 0.16, gap = 0.09) {
  freqs.forEach((freq, i) => playTone(freq, noteDuration, type, i * gap));
}

/**
 * Reproduce un tono que sube o baja de frecuencia (efecto "boing"/deslizante).
 */
function playSweep(startFreq, endFreq, duration, type = 'sine', delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const startTime = ctx.currentTime + delay;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(startFreq, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.16, startTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
  } catch (e) {
    // Si el audio está bloqueado por el navegador, seguimos sin sonido.
  }
}

/**
 * Un sonido distinto por cada emoción, pensado para niños:
 * ninguno es brusco ni asustador, solo le da personalidad a cada una.
 */
const EMOTION_SOUNDS = {
  alegria: () => playArpeggio([659.25, 830.61, 987.77], 'sine', 0.14, 0.08),
  tristeza: () => playArpeggio([392.0, 329.63], 'sine', 0.35, 0.18),
  enojo: () => playTone(196.0, 0.22, 'triangle'),
  miedo: () => playArpeggio([311.13, 293.66], 'sine', 0.3, 0.2),
  sorpresa: () => playSweep(320, 720, 0.22, 'sine'),
  calma: () => playTone(392.0, 0.6, 'sine'),
};

function playEmotionSound(emotionId) {
  const player = EMOTION_SOUNDS[emotionId];
  if (player) player();
}

/**
 * Sonido "mágico" ascendente al abrir un cuento.
 */
function playStoryOpenSound() {
  playArpeggio([523.25, 659.25, 783.99, 1046.5], 'triangle', 0.12, 0.07);
}

function checkAnswer(chosen, word, btn) {
  if (AppState.answered) return;
  AppState.answered = true;
  const badge = document.getElementById('resultBadge');
  const isCorrect = chosen === word.answer;
  if (isCorrect) {
    btn.classList.add('correct');
    AppState.score++;
    badge.className = 'result-badge correct-res show';
    badge.textContent = `¡Excelente! 🎉 La palabra era: ${word.full}`;
    badge.setAttribute('aria-live', 'assertive');
    renderScoreBar();
    celebrate();
    playCorrectSound();
  } else {
    btn.classList.add('wrong');
    badge.className = 'result-badge wrong-res show';
    badge.textContent = `¡Casi! La respuesta era: ${word.answer} → ${word.full}`;
    badge.setAttribute('aria-live', 'assertive');
    document.querySelectorAll('.word-option').forEach((button) => {
      if (button.textContent === word.answer) {
        button.classList.add('correct');
      }
    });
    playWrongSound();
  }
  setTimeout(() => {
    document.getElementById('nextWordBtn').style.display = 'inline-block';
  }, CONFIG.ANIMATION_DURATION_NORMAL);
}

function nextWord() {
  AppState.currentWordIndex++;
  renderProgress();
  showWord();
}

function showGameFinal() {
  const isUndefeated = AppState.score === CONFIG.GAME_MAX_SCORE;
  const isGood = AppState.score >= 3;
  const emoji = isUndefeated ? '🏆' : isGood ? '🌟' : '🚀';
  const message = isUndefeated
    ? '¡PERFECTO! 🏆 ¡Eres una superestrella!'
    : isGood
      ? '¡MUY BIEN! 🌟 ¡Sigue practicando!'
      : '¡Buen intento! 💪 ¡Inténtalo de nuevo!';
  document.getElementById('syllableDisplay').innerHTML = `<span style="font-size: 3rem;">${emoji}</span>`;
  document.getElementById('wordHint').textContent = '';
  document.getElementById('wordOptions').innerHTML = '';
  const badge = document.getElementById('resultBadge');
  badge.className = 'result-badge correct-res show';
  badge.textContent = message;
  const nextBtn = document.getElementById('nextWordBtn');
  nextBtn.textContent = '🔄 Jugar de nuevo';
  nextBtn.style.display = 'inline-block';
  nextBtn.onclick = () => initializeGame();
  if (isUndefeated) {
    celebrate();
  }
}

function celebrate() {
  const celebration = document.getElementById('celebration');
  celebration.innerHTML = '';
  celebration.classList.add('show');
  const colors = ['#fbbf24', '#ec4899', '#a855f7', '#06b6d4', '#22c55e', '#f97316'];
  for (let i = 0; i < CONFIG.CONFETTI_COUNT; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const randomX = Math.random() * 100;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomDelay = Math.random() * 0.5;
    const randomDuration = Math.random() * 0.8 + 1.2;
    const randomRotate = Math.random() * 360;
    piece.style.cssText = `left: ${randomX}%; top: 0; background: ${randomColor}; animation-delay: ${randomDelay}s; animation-duration: ${randomDuration}s; transform: rotate(${randomRotate}deg);`;
    celebration.appendChild(piece);
  }
  setTimeout(() => {
    celebration.classList.remove('show');
  }, CONFIG.CELEBRATION_DURATION);
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

window.addEventListener('resize', debounce(() => {}, 250));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {}
});
