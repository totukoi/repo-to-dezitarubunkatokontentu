// 簡単なインタラクションを追加
document.addEventListener('DOMContentLoaded', function () {
  // 年を自動で入れる
  document.getElementById('year').textContent = new Date().getFullYear();

  // 「年を」クリックでスムーズスクロール
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault(); // ページリロード防止
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // スムーズにスクロール
      });
    });
  }

  // モバイル用のナビ開閉
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      mainNav.style.display = 'block';
    } else {
      mainNav.style.display = '';
    }
  });

  // スムーススクロール（アンカーリンク）
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // モバイル時にナビを閉じる
        if (window.innerWidth <= 800 && mainNav.style.display === 'block') {
          mainNav.style.display = '';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});
