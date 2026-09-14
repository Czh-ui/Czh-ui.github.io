document.addEventListener('DOMContentLoaded', function () {

  const codeBlocks = document.querySelectorAll('figure.highlight');

  codeBlocks.forEach(function (block) {

    /* 防止重复添加 */
    if (block.querySelector('.code-copy-btn')) {
      return;
    }

    /* 创建复制按钮 */
    const button = document.createElement('button');

    button.className = 'code-copy-btn';
    button.innerHTML = '📋 复制';

    block.appendChild(button);

    /* 点击复制 */
    button.addEventListener('click', async function () {

      const code = block.querySelector('code');

      if (!code) {
        return;
      }

      try {

        await navigator.clipboard.writeText(code.innerText);

        button.innerHTML = '✓ 已复制';

        button.classList.add('copied');

        setTimeout(function () {
          button.innerHTML = '📋 复制';
          button.classList.remove('copied');
        }, 1500);

      } catch (error) {

        button.innerHTML = '复制失败';

        setTimeout(function () {
          button.innerHTML = '📋 复制';
        }, 1500);

      }

    });

  });

});