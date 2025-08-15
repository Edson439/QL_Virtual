// Lista de rutas de video
const videos = [
  'videos/video1.mp4',
  'videos/video2.mp4',
  'videos/video3.mp4',
  'videos/video4.mp4',
  'videos/video5.mp4',
  'videos/video6.mp4',
  'videos/video7.mp4'
];

let currentIndex = 0;

const videoElement = document.querySelector('.video');
const arrowUp = document.querySelector('.arrow.up');
const arrowDown = document.querySelector('.arrow.down');
const playBtn = document.getElementById('customPlayBtn');
const loadingOverlay = document.getElementById('videoLoading');
const video = document.getElementById('mainVideo');

// Función para cambiar el video con transición estilo Shorts

function changeVideo(index, direction = 'down') {
  if (index >= 0 && index < videos.length) {
    currentIndex = index;

    // Elimina clases anteriores
    video.classList.remove('slide-in-up', 'slide-out-up', 'slide-in-down', 'slide-out-down');

    // Agrega animación de salida según dirección
    if (direction === 'up') {
      video.classList.add('slide-out-down'); // Sale hacia abajo
    } else {
      video.classList.add('slide-out-up'); // Sale hacia arriba
    }

    setTimeout(() => {
      video.classList.remove('slide-out-down', 'slide-out-up');

      if (direction === 'up') {
        video.classList.add('slide-in-up'); // Entra desde arriba
      } else {
        video.classList.add('slide-in-down'); // Entra desde abajo
      }

      // ? Eliminar esto para que no se muestre el overlay
      // loadingOverlay.style.display = 'flex';

      video.style.opacity = '0';
      video.setAttribute('src', videos[currentIndex]);
      video.load();

      video.onloadedmetadata = () => {
        seekBar.value = 0;
        currentTimeEl.textContent = '0:00';
        durationEl.textContent = formatTime(video.duration);
      };

      video.oncanplay = () => {
        // ? Eliminar esto para que no desaparezca un overlay que ya no existe
        // loadingOverlay.style.display = 'none';

        video.style.opacity = '1';

        setTimeout(() => {
          video.classList.remove('slide-in-up', 'slide-in-down');
        }, 300);
      };

      playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
      generateDotsFor('film');
    }, 300);
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
    if (['vocabulary', 'practice'].includes(section)) {
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
    if (['vocabulary', 'practice'].includes(section)) {
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
const menuVocabulary = document.getElementById('menuVocabulary');
const menuPractice = document.getElementById('menuPractice');
const menuColorChart = document.getElementById('menuColorChart');
const menuWhiteboard = document.getElementById('menuWhiteboard');
const menuStudent = document.getElementById('menuStudent');


// Navegacion por secciones
menuFilm.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('film');
});
menuVocabulary.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('vocabulary');
});
menuPractice.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('practice');
});
menuColorChart.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('colorChart');
});
menuWhiteboard.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('whiteboard');
});
menuStudent.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('student');
});

function showSection(sectionToShow) {
  const sections = ['filmContent', 'vocabularyContent', 'practiceContent', 'colorChartContent', 'whiteboardContent', 'studentContent'];

  // Oculta todos los contenidos
  sections.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
	
	
	
	
	
	
	
  const arrows = document.querySelector('.arrows');
  if (sectionToShow === 'colorChart' || sectionToShow === 'whiteboard' || sectionToShow === 'student') {
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

  const activeMobile = document.getElementById('mobile' + capitalize(sectionToShow));
  if (activeMobile) {
    activeMobile.classList.add('active');
    const img = activeMobile.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('.png', '_2.png'));
    }
  }

  // Actualizar los dots
  generateDotsFor(sectionToShow);
}


// Funcion para capitalizar primera letra
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Tarjetas por seccion
const sectionCards = {
  vocabulary: {
    container: document.getElementById('vocabularyContent'),
    get cards() {
      return document.querySelectorAll('#vocabularyContent .vocab-card');
    },
    index: 0
  },
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
  student: {
    container: document.getElementById('studentContent'),
    get cards() {
      return document.querySelectorAll('#studentContent .vocab-card');
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

	
	
	
	
	
	
	
  if (section === 'student') {
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

    if (section === 'film' && index === currentIndex) {
      dot.classList.add('active');
    } else if (sectionCards[section] && index === sectionCards[section].index) {
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
    vocabulary: 'vocabularyContent',
    practice: 'practiceContent',
    colorChart: 'colorChartContent',
    whiteboard: 'whiteboardContent',
    student: 'studentContent'
  };

  for (let key in sections) {
    const el = document.getElementById(sections[key]);
    if (el && el.style.display === 'block') return key;
  }

  return 'film'; // Por defecto
}

// control video
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');


// Actualiza tiempo
video.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
  const percentage = (video.currentTime / video.duration) * 100 || 0;

  // Mueve la bolita
  seekBar.value = percentage;

  // Cambia el fondo de la barra
  seekBar.style.background = `linear-gradient(to right, #2196f3 0%, #2196f3 ${percentage}%, #ccc ${percentage}%, #ccc 100%)`;

  // Actualiza el tiempo actual
  currentTimeEl.textContent = formatTime(video.currentTime);
});




seekBar.addEventListener('input', () => {
  video.currentTime = (seekBar.value / 100) * video.duration;
});

playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="material-icons">pause</i>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
  }
});

muteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  muteBtn.innerHTML = `<i class="material-icons">${video.muted ? 'volume_off' : 'volume_up'}</i>`;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
video.addEventListener('ended', () => {
  playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
});

video.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="material-icons">pause</i>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
  }
});

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

function desactivarSidebar() {
  const botones = document.querySelectorAll('.menu-item');
  botones.forEach(boton => {
    boton.classList.add('disabled');
    boton.style.pointerEvents = 'none';
    boton.style.opacity = '0.5';
  });
}

function activarSidebar() {
  const botones = document.querySelectorAll('.menu-item');
  botones.forEach(boton => {
    boton.classList.remove('disabled');
    boton.style.pointerEvents = 'auto';
    boton.style.opacity = '1';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  showSection('student');
	desactivarSidebar();
});
