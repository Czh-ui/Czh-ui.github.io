/* =========================
   鼠标点击光圈特效
   ========================= */

document.addEventListener('click', function (event) {
  const circle = document.createElement('span');

  circle.className = 'click-effect';

  circle.style.left = event.clientX + 'px';
  circle.style.top = event.clientY + 'px';

  document.body.appendChild(circle);

  setTimeout(function () {
    circle.remove();
  }, 700);
});