/**
 * App.js - Lógica principal de "La Nave del Saber"
 * Aplicación educativa interactiva para niños
 */

// ===== ESTADO DE LA APLICACIÓN =====
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

// ===== INICIALIZACIÓN =====

/**
 * Inicializa la aplicación al cargar la página
 */
function initializeApp() {
  createBackgroundStars();
  buildAlphabetButtons();
  buildEmotionCards();
  buildStoriesList();
}

/**
 * Crea las estrellas de fondo animadas
 */
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

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${randomX}%;
      top: ${randomY}%;
      --dur: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(star);
  }
}

// ===== NAVEGACIÓN =====

/**
 * Navega a una pantalla específica
 * @param {string} screenId - ID de la pantalla destino
 */
function goTo(screenId) {
  // Oculta todas las pantallas
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.remove('active');
  });

  // Muestra la pantalla seleccionada
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Scroll al inicio
  window.scrollTo(0, 0);

  // Si es el juego, inicializa
  if (screenId === 'screen-juego') {
    initializeGame();
  }
}

// ===== ABECEDARIO =====

/**
 * Construye los botones del abecedario
 */
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

/**
 * Selecciona y muestra una letra del abecedario
 * @param {string} letter - Letra a mostrar
 * @param {HTMLElement} button - Elemento botón clickeado
 */
function selectLetter(letter, button) {
  // Actualiza estilos de botones
  document.querySelectorAll('.abc-btn').forEach((btn) => {
    btn.classList.remove('active-letter');
  });
  button.classList.add('active-letter');

  // Obtiene datos de la letra
  const letterData = ALPHABET_DATA[letter];

  // Actualiza el panel de visualización
  document.getElementById('bigLetter').textContent = letter;
  document.getElementById('letterEmoji').textContent = letterData.emoji;
  document.getElementById('letterWord').innerHTML = `${letter} de <strong>${letterData.word}</strong>`;
  document.getElementById('letterPhrase').textContent = letterData.phrase;

  // Muestra el panel
  const panel = document.getElementById('letterPanel');
  if (panel) {
    panel.style.display = 'block';
    // Anima la entrada
    panel.style.animation = 'none';
    setTimeout(() => {
      panel.style.animation = '';
    }, 10);
  }
}

// ===== EMOCIONES =====

/**
 * Construye las tarjetas de emociones
 */
function buildEmotionCards() {
  const grid = document.getElementById('emoGrid');

  EMOTIONS_DATA.forEach((emotion) => {
    const card = document.createElement('button');
    card.className = 'emo-card';
    card.style.background = emotion.bgColor;
    card.style.borderColor = emotion.color + '80';
    card.setAttribute('aria-label', `Emoción: ${emotion.name}`);
    card.setAttribute('aria-pressed', 'false');

    card.innerHTML = `
      <span class="emo-face" aria-hidden="true">${emotion.emoji}</span>
      <div class="emo-name">${emotion.name}</div>
    `;

    card.addEventListener('click', () => selectEmotion(emotion, card));
    grid.appendChild(card);
  });
}

/**
 * Selecciona y muestra una emoción
 * @param {Object} emotion - Objeto de emoción
 * @param {HTMLElement} card - Tarjeta de emoción clickeada
 */
function selectEmotion(emotion, card) {
  // Actualiza atributos de accesibilidad
  document.querySelectorAll('.emo-card').forEach((c) => {
    c.classList.remove('selected');
    c.setAttribute('aria-pressed', 'false');
  });
  card.classList.add('selected');
  card.setAttribute('aria-pressed', 'true');

  // Actualiza el panel
  const panel = document.getElementById('emoPanel');
  document.getElementById('emoBigFace').textContent = emotion.emoji;
  document.getElementById('emoTitle').textContent = emotion.name;
  document.getElementById('emoTitle').style.color = emotion.color;
  document.getElementById('emoDesc').textContent = emotion.description;
  document.getElementById('emoTip').textContent = emotion.tip;
  panel.style.borderColor = emotion.color + '60';

  // Scroll suave al panel
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== CUENTOS =====

/**
 * Construye la lista de cuentos
 */
function buildStoriesList() {
  const list = document.getElementById('storyList');

  STORIES_DATA.forEach((story) => {
    const card = document.createElement('button');
    card.className = 'story-card';
    card.setAttribute('aria-label', `Cuento: ${story.title}`);
    card.setAttribute('role', 'listitem');

    card.innerHTML = `
      <span class="story-icon" aria-hidden="true">${story.icon}</span>
      <div class="story-info">
        <h3>${story.title}</h3>
        <p>${story.tag} · ${story.pages.length} páginas</p>
      </div>
      <span style="margin-left: auto; font-size: 1.5rem; opacity: 0.5;" aria-hidden="true">→</span>
    `;

    card.addEventListener('click', () => openStory(story));
    list.appendChild(card);
  });
}

/**
 * Abre y muestra un cuento detallado
 * @param {Object} story - Objeto del cuento
 */
function openStory(story) {
  const content = document.getElementById('storyContent');

  const storyHTML = `
    <div style="text-align: center; margin-bottom: 16px;">
      <span style="font-size: 3rem;" aria-hidden="true">${story.icon}</span>
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

// ===== JUEGO DE SÍLABAS =====

/**
 * Inicializa el juego de sílabas
 */
function initializeGame() {
  AppState.reset();
  AppState.wordOrder = shuffleArray(WORD_GAME_DATA).slice(
    0,
    CONFIG.GAME_MAX_WORDS
  );

  renderScoreBar();
  renderProgress();
  showWord();
}

/**
 * Renderiza la barra de puntuación
 */
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

/**
 * Renderiza los puntos de progreso
 */
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
 * Muestra la palabra actual del juego
 */
function showWord() {
  if (AppState.currentWordIndex >= AppState.wordOrder.length) {
    showGameFinal();
    return;
  }

  const word = AppState.wordOrder[AppState.currentWordIndex];
  AppState.answered = false;

  // Actualiza elementos visuales
  document.getElementById('syllableDisplay').textContent = word.display;
  document.getElementById('wordHint').textContent = word.hint;
  document.getElementById('resultBadge').className = 'result-badge';
  document.getElementById('nextWordBtn').style.display = 'none';

  // Genera opciones barajadas
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

/**
 * Verifica la respuesta del usuario
 * @param {string} chosen - Respuesta elegida
 * @param {Object} word - Palabra actual
 * @param {HTMLElement} btn - Botón clickeado
 */
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
  } else {
    btn.classList.add('wrong');
    badge.className = 'result-badge wrong-res show';
    badge.textContent = `¡Casi! La respuesta era: ${word.answer} → ${word.full}`;
    badge.setAttribute('aria-live', 'assertive');

    // Muestra la respuesta correcta
    document.querySelectorAll('.word-option').forEach((button) => {
      if (button.textContent === word.answer) {
        button.classList.add('correct');
      }
    });
  }

  // Muestra botón siguiente con retraso
  setTimeout(() => {
    document.getElementById('nextWordBtn').style.display = 'inline-block';
  }, CONFIG.ANIMATION_DURATION_NORMAL);
}

/**
 * Avanza a la siguiente palabra
 */
function nextWord() {
  AppState.currentWordIndex++;
  renderProgress();
  showWord();
}

/**
 * Muestra la pantalla final del juego
 */
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

// ===== EFECTOS Y CELEBRACIÓN =====

/**
 * Anima confetti en la pantalla
 */
function celebrate() {
  const celebration = document.getElementById('celebration');
  celebration.innerHTML = '';
  celebration.classList.add('show');

  const colors = [
    '#fbbf24',
    '#ec4899',
    '#a855f7',
    '#06b6d4',
    '#22c55e',
    '#f97316',
  ];

  for (let i = 0; i < CONFIG.CONFETTI_COUNT; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const randomX = Math.random() * 100;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomDelay = Math.random() * 0.5;
    const randomDuration = Math.random() * 0.8 + 1.2;
    const randomRotate = Math.random() * 360;

    piece.style.cssText = `
      left: ${randomX}%;
      top: 0;
      background: ${randomColor};
      animation-delay: ${randomDelay}s;
      animation-duration: ${randomDuration}s;
      transform: rotate(${randomRotate}deg);
    `;

    celebration.appendChild(piece);
  }

  // Limpia celebración después de cierto tiempo
  setTimeout(() => {
    celebration.classList.remove('show');
  }, CONFIG.CELEBRATION_DURATION);
}

// ===== UTILIDADES DE MEJORA DE RENDIMIENTO =====

/**
 * Debounce para funciones
 * @param {Function} func - Función a debounce
 * @param {number} delay - Retraso en ms
 * @returns {Function}
 */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttle para funciones
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite en ms
 * @returns {Function}
 */
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

// ===== INICIALIZACIÓN AL CARGAR =====

// Ejecuta la inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Manejo de eventos globales
window.addEventListener(
  'resize',
  debounce(() => {
    // Manejo de cambios de tamaño si es necesario
  }, 250)
);

// Soporte para navegación con teclado (mejora de accesibilidad)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    // Opcionalmente, ir a pantalla anterior
  }
});
