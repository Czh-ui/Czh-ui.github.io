/* =========================
   文章阅读进度条
   ========================= */

(function () {

  function initReadingProgress() {

    /* 只在文章页面显示 */
    if (!document.querySelector('#post')) {
      return;
    }

    /* 防止重复创建 */
    if (document.getElementById('reading-progress')) {
      return;
    }

    /* 创建进度条 */
    const progress = document.createElement('div');

    progress.id = 'reading-progress';

    document.body.appendChild(progress);

    /* 更新进度 */
    function updateProgress() {

      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      let percent = 0;

      if (scrollHeight > 0) {
        percent =
          (scrollTop / scrollHeight) * 100;
      }

      percent =
        Math.min(100, Math.max(0, percent));

      progress.style.width =
        percent + '%';
    }

    window.addEventListener(
      'scroll',
      updateProgress,
      { passive: true }
    );

    updateProgress();
  }

  /* 确保网页加载完成后执行 */
  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initReadingProgress
    );

  } else {

    initReadingProgress();

  }

})();