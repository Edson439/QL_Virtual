// Lista de rutas de video
const videos = [

];

let currentIndex = 0;

const videoElement = document.querySelector('.video');
const arrowUp = document.querySelector('.arrow.up');
const arrowDown = document.querySelector('.arrow.down');
const playBtn = document.getElementById('customPlayBtn');
const video = document.getElementById('mainVideo');

// Función para cambiar el video con transición estilo Shorts

function changeVideo(index, direction = 'down') {
  if (index >= 0 && index < videos.length) {
    currentIndex = index;

    // Elimina clases anteriores
    video.classList.remove('slide-in-up', 'slide-out-up', 'slide-in-down', 'slide-out-down');

  }
}

// Flechas para videos
arrowUp.addEventListener('click', () => {
  const section = getActiveSection();

  if (section === 'film') {
    if (currentIndex > 0) {
      changeVideo(currentIndex - 1, 'up'); // ? cambio aquí
    }
  } else if (sectionCards[section]) {
    const sec = sectionCards[section];
    if (['practice', 'cuatro', 'tres'].includes(section)) {
      if (sec.index > 0) {
        sec.index--;
        showCard(section);
        generateDotsFor(section);
      }
    } else {
      sec.index = (sec.index - 1 + sec.cards.length) % sec.cards.length;
      showCard(section);
      generateDotsFor(section);
    }
  }
});

arrowDown.addEventListener('click', () => {
  const section = getActiveSection();

  if (section === 'film') {
    if (currentIndex < videos.length - 1) {
      changeVideo(currentIndex + 1, 'down');
    }
  } else if (sectionCards[section]) {
    const sec = sectionCards[section];
    if (['practice', 'cuatro', 'tres'].includes(section)) {
      if (sec.index < sec.cards.length - 1) {
        sec.index++;
        showCard(section);
        generateDotsFor(section);
      }
    } else {
      sec.index = (sec.index + 1) % sec.cards.length;
      showCard(section);
      generateDotsFor(section);
    }
  }
});


// Boton de play personalizado
playBtn.addEventListener('click', () => {
  video.play();
  playBtn.style.display = 'none';
});
video.addEventListener('pause', () => playBtn.style.display = 'flex');
video.addEventListener('play', () => playBtn.style.display = 'none');

// Hover: cambia iconos a version _2.png
document.querySelectorAll('.menu-item').forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;

  const originalSrc = img.getAttribute('src');
  const hoverSrc = originalSrc.replace('.png', '_2.png');

  item.addEventListener('mouseenter', () => img.setAttribute('src', hoverSrc));
  item.addEventListener('mouseleave', () => {
    if (!item.classList.contains('active')) img.setAttribute('src', originalSrc);
  });
});

// Botones del menu
const menuFilm = document.getElementById('menuFilm');
const menuPractice = document.getElementById('menuPractice');
const menuColorChart = document.getElementById('menuColorChart');
const menuCuatro = document.getElementById('menuCuatro');
const menuTres = document.getElementById('menuTres');

// Navegacion por secciones
menuFilm.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('film');
});
menuPractice.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('practice');
});
menuColorChart.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('colorChart');
});
menuCuatro.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('cuatro');
});
menuTres.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('tres');
});

function showSection(sectionToShow) {
  const sections = ['filmContent', 'practiceContent', 'colorChartContent', 'cuatroContent', 'tresContent'];

  // Oculta todos los contenidos
  sections.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  const arrows = document.querySelector('.arrows');
  if (sectionToShow === 'colorChart') {
    arrows.style.display = 'none'; // oculta
  } else {
    arrows.style.display = 'flex'; // muestra
  }
  // Muestra solo el contenido activo
  document.getElementById(sectionToShow + 'Content').style.display = 'block';

  // Actualizar el menu principal
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
    const img = item.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('_2.png', '.png'));
    }
  });

  const activeMenu = document.getElementById('menu' + capitalize(sectionToShow));
  if (activeMenu) {
    activeMenu.classList.add('active');
    const img = activeMenu.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('.png', '_2.png'));
    }
  }

  // ACTUALIZAR el menu lateral tambien
  document.querySelectorAll('.mobile-item').forEach(item => {
    item.classList.remove('active');
    const img = item.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('_2.png', '.png'));
    }
  });

  // Actualizar los dots
  generateDotsFor(sectionToShow);
}


// Funcion para capitalizar primera letra
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Tarjetas por seccion
const sectionCards = {
  practice: {
    container: document.getElementById('practiceContent'),
    get cards() {
      return document.querySelectorAll('#practiceContent .vocab-card');
    },
    index: 0
  },
  colorChart: {
    container: document.getElementById('colorChartContent'),
    get cards() {
      return document.querySelectorAll('#colorChartContent .vocab-card');
    },
    index: 0
  },
  cuatro: {
    container: document.getElementById('cuatroContent'),
    get cards() {
      return document.querySelectorAll('#cuatroContent .vocab-card');
    },
    index: 0
  },
  tres: {
    container: document.getElementById('tresContent'),
    get cards() {
      return document.querySelectorAll('#tresContent .vocab-card');
    },
    index: 0
  }
};


// Mostrar tarjeta activa
function showCard(section) {
  const s = sectionCards[section];
  s.cards.forEach((card, i) => {
    card.classList.toggle('active', i === s.index);
  });
}

// dots
const dotsContainer = document.getElementById('dotsContainer');

function generateDots() {
  dotsContainer.innerHTML = ''; // limpia
  videos.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => changeVideo(index));
    dotsContainer.appendChild(dot);
  });
}
generateDots();

function generateDotsFor(section) {
  dotsContainer.innerHTML = '';

  if (['seis'].includes(section)) {
    dotsContainer.style.display = 'none';
    return;
  } else {
    dotsContainer.style.display = 'flex';
  }

  let items = [];

  if (section === 'film') {
    items = videos;
  } else if (sectionCards[section]) {
    items = sectionCards[section].cards;
  }

  items.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');

     if (sectionCards[section] && index === sectionCards[section].index) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      if (section === 'film') {
        changeVideo(index);
      } else {
        sectionCards[section].index = index;
        showCard(section);
        generateDotsFor(section);
      }
    });

    dotsContainer.appendChild(dot);
  });
}

function getActiveSection() {
  const sections = {
    film: 'filmContent',
    practice: 'practiceContent',
    colorChart: 'colorChartContent',
    cuatro: 'cuatroContent',
    tres: 'tresContent'
  };

  for (let key in sections) {
    const el = document.getElementById(sections[key]);
    if (el && el.style.display === 'block') return key;
  }
  return 'practice'; // Por defecto
}

let isSoundActive = false; // Estado inicial: apagado

const toggleSoundBtn = document.getElementById('toggleSoundBtn');
toggleSoundBtn.classList.remove('sound-active');
toggleSoundBtn.querySelector('i').textContent = 'volume_off';

toggleSoundBtn.addEventListener('click', () => {
  isSoundActive = !isSoundActive;

  toggleSoundBtn.classList.toggle('sound-active', isSoundActive);
  const icon = toggleSoundBtn.querySelector('i');
  icon.textContent = isSoundActive ? 'volume_up' : 'volume_off';
});

// Escucha solo los íconos en el Color Chart
document.querySelectorAll('#colorChartContent .chart-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const colorChart = document.getElementById('colorChartContent');
    if (colorChart.style.display !== 'none') {
      if (!isSoundActive) return; // No hace nada si el sonido está apagado

      const soundNumber = icon.getAttribute('data-sound').padStart(2, '0');
      const audio = new Audio(`CC/sounds/CC${soundNumber}.mp3`);
      audio.play();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  showSection('practice');
});