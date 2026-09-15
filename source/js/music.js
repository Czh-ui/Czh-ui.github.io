document.addEventListener('DOMContentLoaded', function () {

  /* =========================
     音乐列表
     ========================= */

  const musicList = [
    {
      name: '独角戏',
      url: '/music/music1.mp3'
    },
    {
      name: '戏剧性反风',
      url: '/music/music2.mp3'
    },
    {
      name: '开往春天的地铁',
      url: '/music/music3.mp3'
    },
    {
      name: 'Mr. Broken Heart',
      url: '/music/music4.mp3'
    },
    {
      name: 'refrain',
      url: '/music/music5.mp3'
    },
  ];

  let currentIndex = 0;

  /* =========================
     创建播放器
     ========================= */

  const player = document.createElement('div');

  player.id = 'czh-music-player';

  player.innerHTML = `
    <div class="music-cover">♪</div>

    <div class="music-info">
      <div class="music-title">音乐播放器</div>
      <div class="music-status">点击播放</div>
    </div>

    <div class="music-controls">
  <button class="music-prev">‹</button>
  <button class="music-play">▶</button>
  <button class="music-next">›</button>
</div>

<div class="music-volume">
  <span class="volume-icon">🔊</span>
  <input
    type="range"
    class="volume-slider"
    min="0"
    max="1"
    step="0.01"
    value="0.7"
  >
</div>

    <audio id="czh-audio"></audio>
  `;

  document.body.appendChild(player);

  const audio = document.getElementById('czh-audio');
  const title = player.querySelector('.music-title');
  const status = player.querySelector('.music-status');
  const playButton = player.querySelector('.music-play');
  const prevButton = player.querySelector('.music-prev');
  const nextButton = player.querySelector('.music-next');
  const volumeSlider = player.querySelector('.volume-slider');
  const volumeIcon = player.querySelector('.volume-icon');
  const cover = player.querySelector('.music-cover');

/* =========================
   点击唱片展开 / 收起播放器
   ========================= */

cover.addEventListener('click', function (event) {
  event.stopPropagation();

  player.classList.toggle('expanded');
});

  /* =========================
   播放状态同步
   ========================= */

audio.addEventListener('play', function () {
  player.classList.add('playing');
});

audio.addEventListener('pause', function () {
  player.classList.remove('playing');
});

audio.addEventListener('ended', function () {
  player.classList.remove('playing');
});

  /* =========================
     加载音乐
     ========================= */

  function loadMusic(index) {

    currentIndex = index;

    audio.src = musicList[currentIndex].url;

    title.textContent = musicList[currentIndex].name;

    status.textContent =
      `${currentIndex + 1} / ${musicList.length}`;
  }

  /* =========================
     播放 / 暂停
     ========================= */

  playButton.addEventListener('click', function () {

    if (audio.paused) {

      audio.play()
        .then(function () {
          playButton.textContent = 'Ⅱ';
          status.textContent = '正在播放';
        })
        .catch(function (error) {
          console.log('播放失败：', error);
          status.textContent = '点击再次播放';
        });

    } else {

      audio.pause();

      playButton.textContent = '▶';
      status.textContent = '已暂停';
    }
  });

  /* =========================
     上一首
     ========================= */

  prevButton.addEventListener('click', function () {

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = musicList.length - 1;
    }

    loadMusic(currentIndex);

    audio.play()
      .then(function () {
        playButton.textContent = 'Ⅱ';
        status.textContent = '正在播放';
      })
      .catch(function () {});
  });

  /* =========================
     下一首
     ========================= */

  nextButton.addEventListener('click', function () {

    currentIndex++;

    if (currentIndex >= musicList.length) {
      currentIndex = 0;
    }

    loadMusic(currentIndex);

    audio.play()
      .then(function () {
        playButton.textContent = 'Ⅱ';
        status.textContent = '正在播放';
      })
      .catch(function () {});
  });

  /* =========================
     播放结束自动下一首
     ========================= */

  audio.addEventListener('ended', function () {

    currentIndex++;

    if (currentIndex >= musicList.length) {
      currentIndex = 0;
    }

    loadMusic(currentIndex);

    audio.play()
      .then(function () {
        playButton.textContent = 'Ⅱ';
        status.textContent = '正在播放';
      })
      .catch(function () {});
  });

  /* =========================
     初始歌曲
     ========================= */
/* =========================
   音量控制
   ========================= */

audio.volume = 0.7;

volumeSlider.addEventListener('input', function () {

  const volume = parseFloat(volumeSlider.value);

  audio.volume = volume;

  if (volume === 0) {
    volumeIcon.textContent = '🔇';
  } else if (volume < 0.5) {
    volumeIcon.textContent = '🔉';
  } else {
    volumeIcon.textContent = '🔊';
  }

});

  loadMusic(0);

});