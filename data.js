/**
 * Data.js - Datos de la aplicación educativa "La Nave del Saber"
 * Separado de la lógica de la aplicación para mejor mantenibilidad
 */

// ===== ABECEDARIO =====
const ALPHABET_DATA = {
  A: { emoji: '🌳', word: 'Árbol', phrase: '¡El árbol crece con agua y sol!' },
  B: { emoji: '😘', word: 'Beso', phrase: '¡Un beso llena de amor el corazón!' },
  C: { emoji: '🐴', word: 'Caballo', phrase: '¡El caballo corre muy rápido!' },
  D: { emoji: '🦷', word: 'Diente', phrase: '¡Cepíllate los dientes cada día!' },
  E: { emoji: '⭐', word: 'Estrella', phrase: '¡Las estrellas brillan de noche!' },
  F: { emoji: '🌸', word: 'Flor', phrase: '¡Las flores son el regalo de la naturaleza!' },
  G: { emoji: '🐱', word: 'Gato', phrase: '¡El gato ronronea cuando está feliz!' },
  H: { emoji: '🍦', word: 'Helado', phrase: '¡El helado es dulce y frío!' },
  I: { emoji: '🌈', word: 'Iglú', phrase: '¡El iglú está hecho de nieve!' },
  J: { emoji: '🦒', word: 'Jirafa', phrase: '¡La jirafa tiene el cuello muy largo!' },
  K: { emoji: '🥝', word: 'Kiwi', phrase: '¡El kiwi tiene vitaminas!' },
  L: { emoji: '🦁', word: 'León', phrase: '¡El león es el rey de la selva!' },
  M: { emoji: '🍎', word: 'Manzana', phrase: '¡La manzana es roja y deliciosa!' },
  N: { emoji: '🌙', word: 'Noche', phrase: '¡De noche dormimos y soñamos!' },
  Ñ: { emoji: '🎂', word: 'Ñoño', phrase: '¡Qué nombre tan divertido!' },
  O: { emoji: '🐻', word: 'Oso', phrase: '¡El oso come miel del panal!' },
  P: { emoji: '🐦', word: 'Pájaro', phrase: '¡El pájaro vuela con sus alas!' },
  Q: { emoji: '🧀', word: 'Queso', phrase: '¡El queso tiene muchos sabores!' },
  R: { emoji: '🐸', word: 'Rana', phrase: '¡La rana salta entre las flores!' },
  S: { emoji: '☀️', word: 'Sol', phrase: '¡El sol nos da calor y luz!' },
  T: { emoji: '🐢', word: 'Tortuga', phrase: '¡La tortuga es muy paciente!' },
  U: { emoji: '🍇', word: 'Uvas', phrase: '¡Las uvas crecen en el viñedo!' },
  V: { emoji: '🐄', word: 'Vaca', phrase: '¡La vaca nos da leche cada día!' },
  W: { emoji: '🧇', word: 'Waffle', phrase: '¡El waffle es dulce y rico!' },
  X: { emoji: '🎸', word: 'Xilófono', phrase: '¡El xilófono hace música con colores!' },
  Y: { emoji: '🌿', word: 'Yerba', phrase: '¡La yerba mate es típica de Colombia!' },
  Z: { emoji: '🦊', word: 'Zorro', phrase: '¡El zorro es muy astuto y listo!' },
};

// ===== EMOCIONES =====
const EMOTIONS_DATA = [
  {
    id: 'alegria',
    emoji: '😄',
    name: 'Alegría',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    description:
      'La alegría es cuando todo sale bien y sientes mariposas en la barriga. ¡Es una emoción maravillosa!',
    tip: '¡Baila, canta o abraza a alguien que quieras!',
  },
  {
    id: 'tristeza',
    emoji: '😢',
    name: 'Tristeza',
    color: '#60a5fa',
    bgColor: 'rgba(96, 165, 250, 0.15)',
    description:
      'La tristeza aparece cuando algo nos duele por dentro. Está bien llorar, el llanto nos ayuda a sentirnos mejor.',
    tip: 'Habla con mamá o papá, o dibuja lo que sientes.',
  },
  {
    id: 'enojo',
    emoji: '😠',
    name: 'Enojo',
    color: '#f87171',
    bgColor: 'rgba(248, 113, 113, 0.15)',
    description:
      'El enojo surge cuando algo no nos parece justo. ¡Es una emoción normal, pero hay que aprender a calmarse!',
    tip: 'Respira despacio: inhala contando hasta 4, exhala contando hasta 4.',
  },
  {
    id: 'miedo',
    emoji: '😨',
    name: 'Miedo',
    color: '#a78bfa',
    bgColor: 'rgba(167, 139, 250, 0.15)',
    description:
      'El miedo aparece cuando algo nos parece peligroso o desconocido. ¡Es una señal de que nuestro cuerpo nos cuida!',
    tip: 'Busca a un adulto de confianza y cuéntale lo que sientes.',
  },
  {
    id: 'sorpresa',
    emoji: '😲',
    name: 'Sorpresa',
    color: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.15)',
    description:
      'La sorpresa ocurre cuando algo inesperado sucede. ¡Puede ser agradable o un susto! Los ojos y la boca se abren mucho.',
    tip: '¡Respira y piensa si la sorpresa es buena o hay que pedir ayuda!',
  },
  {
    id: 'calma',
    emoji: '😌',
    name: 'Calma',
    color: '#67e8f9',
    bgColor: 'rgba(103, 232, 249, 0.15)',
    description:
      'La calma es cuando te sientes tranquilo y en paz. ¡Es como flotar en una nube suave!',
    tip: 'Cierra los ojos, respira profundo y piensa en tu lugar favorito.',
  },
];

// ===== CUENTOS =====
const STORIES_DATA = [
  {
    id: 1,
    icon: '🦁',
    title: 'El León que Aprendió a Pedir Ayuda',
    tag: 'Valor & Amigos',
    emotion: 'Valor y Humildad',
    pages: [
      '🦁 Simón era un leoncito que vivía en la selva. Era valiente y fuerte, pero nunca pedía ayuda.',
      '🌿 Un día, su patita quedó atrapada entre dos piedras. Simón intentó soltarse solo... pero no podía.',
      '🐘 Su amiga la elefanta Ella pasó por allí. "¿Necesitas ayuda, Simón?" — preguntó con cariño.',
      '💛 Simón dudó... pero finalmente dijo: "Sí, Ella. Por favor, ¡necesito tu ayuda!" La elefanta lo liberó fácilmente.',
      '⭐ Desde ese día, Simón aprendió que pedir ayuda no es de cobardes. ¡Es de personas valientes y sabias!',
    ],
    moral: '💡 Moraleja: Pedir ayuda cuando la necesitas es un acto de valentía.',
  },
  {
    id: 2,
    icon: '🌈',
    title: 'Luna y el Arcoíris de Sentimientos',
    tag: 'Emociones',
    emotion: 'Autoconocimiento',
    pages: [
      '☁️ Luna era una niña que no sabía qué hacer con sus emociones. A veces reía, a veces lloraba sin entender por qué.',
      '🧙 Un día, la Hada del Bosque le regaló un cuaderno especial: "Dibuja aquí lo que sientes."',
      '😠 Luna dibujó llamas rojas cuando estaba enojada, gotas azules cuando estaba triste, y soles amarillos cuando estaba feliz.',
      '🌈 Al mirar su cuaderno, Luna vio un arcoíris de colores. "¡Todas mis emociones juntas son como un arcoíris!" — exclamó.',
      '💛 El Hada sonrió: "Todas las emociones son importantes, Luna. No hay emociones malas, solo mensajes de tu corazón."',
    ],
    moral: '💡 Moraleja: Todas nuestras emociones son válidas. ¡Expresarlas nos ayuda a conocernos!',
  },
  {
    id: 3,
    icon: '🐝',
    title: 'La Abejita que No Quería Compartir',
    tag: 'Generosidad',
    emotion: 'Generosidad',
    pages: [
      '🐝 Bea la abejita trabajaba todo el día recolectando néctar. Tenía mucha miel, pero no quería compartirla.',
      '❄️ Un invierno muy frío llegó al bosque. Las flores se helaron y ya no había néctar para nadie.',
      '🦋 Las mariposas, los pájaros y las hormigas estaban con hambre. Bea los miraba desde su colmena llena de miel.',
      '💛 Bea sintió algo raro en el pecho... ¡Era culpa! Abrió su colmena y compartió la miel con todos.',
      '🌟 Al ver las sonrisas de sus amigos, Bea sintió una alegría mucho más grande que la de tener toda la miel sola.',
    ],
    moral:
      '💡 Moraleja: Compartir multiplica la alegría. Lo que das con amor siempre regresa.',
  },
];

// ===== JUEGO DE SÍLABAS =====
const WORD_GAME_DATA = [
  {
    display: 'MA___OSA',
    answer: 'RIP',
    options: ['RIP', 'SOL', 'TIN'],
    hint: '🦋',
    full: 'MARIPOSA',
  },
  {
    display: '___A',
    answer: 'LUN',
    options: ['LUN', 'PEZ', 'SOL'],
    hint: '🌙',
    full: 'LUNA',
  },
  {
    display: 'CA__LLO',
    answer: 'BA',
    options: ['BA', 'TA', 'LA'],
    hint: '🐴',
    full: 'CABALLO',
  },
  {
    display: 'ES___LLA',
    answer: 'TRE',
    options: ['TRE', 'CAS', 'MAR'],
    hint: '⭐',
    full: 'ESTRELLA',
  },
  {
    display: 'CO__ZÓN',
    answer: 'RA',
    options: ['RA', 'MA', 'LA'],
    hint: '❤️',
    full: 'CORAZÓN',
  },
  {
    display: 'NU___',
    answer: 'BES',
    options: ['BES', 'CAR', 'MAN'],
    hint: '☁️',
    full: 'NUBES',
  },
  {
    display: 'PÁ__RO',
    answer: 'JA',
    options: ['JA', 'SA', 'TA'],
    hint: '🐦',
    full: 'PÁJARO',
  },
];

// ===== CONSTANTES DE CONFIGURACIÓN =====
const CONFIG = {
  GAME_MAX_WORDS: 5,
  GAME_MAX_SCORE: 5,
  ANIMATION_DURATION_FAST: 200,
  ANIMATION_DURATION_NORMAL: 300,
  ANIMATION_DURATION_SLOW: 400,
  CELEBRATION_DURATION: 2500,
  STARS_COUNT: 60,
  CONFETTI_COUNT: 40,
};

// ===== UTILIDADES =====

/**
 * Baraja un array usando Fisher-Yates shuffle
 * @param {Array} array - Array a barajar
 * @returns {Array} Array barajado
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Obtiene un color aleatorio de una paleta
 * @returns {string} Color hexadecimal
 */
function getRandomColor() {
  const colors = [
    '#fbbf24',
    '#ec4899',
    '#a855f7',
    '#06b6d4',
    '#22c55e',
    '#f97316',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Calcula un número aleatorio entre min y max
 * @param {number} min - Valor mínimo (inclusive)
 * @param {number} max - Valor máximo (inclusive)
 * @returns {number}
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
