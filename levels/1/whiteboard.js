  const canvas = document.getElementById('whiteboardCanvas');
  const ctx = canvas.getContext('2d');
  const colorPicker = document.getElementById('colorPicker');
  const brushSize = document.getElementById('brushSize');
  const clearBoard = document.getElementById('clearBoard');

  let painting = false;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('load', resizeCanvas);

  canvas.addEventListener('mousedown', () => painting = true);
  canvas.addEventListener('mouseup', () => painting = false);
  canvas.addEventListener('mouseleave', () => painting = false);
  canvas.addEventListener('mousemove', draw);

  function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(x, y, brushSize.value / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  clearBoard.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
function resizeCanvas() {
  const canvas = document.getElementById('whiteboardCanvas');
  const parent = canvas.parentElement;

  // Establece el tamaño visual del canvas (CSS)
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  // Establece el tamaño real del canvas en píxeles
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
}
document.getElementById('menuWhiteboard').addEventListener('click', () => {
  setTimeout(() => resizeCanvas(), 50); // Espera un poco para asegurar que el DOM ya lo muestra
});
