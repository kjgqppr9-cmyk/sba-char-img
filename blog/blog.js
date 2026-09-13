/* 스몰브랜드설계자 블로그 화면: 다크 모드(기본) + 일반 모드 토글 + 읽기 타이포 (2026-09-13)
   적용 범위: /boards/5619(블로그 목록), /posts/blog-*(블로그 글), 게시판 이름이 '블로그'인 글.
   미리보기: 아무 글 주소 뒤에 ?sbablog=1 을 붙이면 강제로 켜진다. */
(function () {
  if (window.__sbaBlog) return; window.__sbaBlog = 1;
  var KEY = 'sbaBlogTheme', ROOT = document.documentElement;

  var CSS = [
  /* 색 토큰: DESIGN-SBA-homepage.md 기준. 금색은 선에만, 글자 강조는 초록(일반)과 민트(다크) */
  'html[data-sba-blog]{--b-bg:#F2F0EB;--b-surface:#E8E5DC;--b-card:#FFFFFF;--b-text:#1F1F1B;--b-soft:#4A4845;--b-muted:#7A7774;--b-head:#1A1A17;--b-em:#006241;--b-em2:#B15E41;--b-line:rgba(26,26,23,.12);--b-gold:#D9AE4B;--b-w:400;--b-shadow:0 1px 2px rgba(26,26,23,.06),0 10px 28px rgba(26,26,23,.07)}',
  'html[data-sba-blog="dark"]{--b-bg:#10241C;--b-surface:#1A3229;--b-card:#1A3229;--b-text:#E3E0D6;--b-soft:#BCC7C0;--b-muted:#8FA098;--b-head:#F5F2EA;--b-em:#7FE0BE;--b-em2:#F2A286;--b-line:rgba(233,230,220,.13);--b-w:350;--b-shadow:0 1px 2px rgba(0,0,0,.25),0 12px 30px rgba(0,0,0,.28)}',
  'html[data-sba-blog] body,html[data-sba-blog] [class*="PageView_wrapper"]{background:var(--b-bg)!important;transition:background-color .25s ease}',
  'html[data-sba-blog] section:has([class*="Post_wrapper"]),html[data-sba-blog] section:has(.board-wrapper),html[data-sba-blog] section:has([class*="Post_wrapper"]) [class*="section-outer"],html[data-sba-blog] section:has(.board-wrapper) [class*="section-outer"]{background:transparent!important}',

  /* 토글 */
  '.sba-mode{display:flex;justify-content:flex-end;margin:0 0 22px}',
  '.sba-mode__box{display:inline-flex;gap:2px;padding:4px;border-radius:999px;background:var(--b-surface);box-shadow:inset 0 0 0 1px var(--b-line)}',
  '.sba-mode button{appearance:none;border:0;background:transparent;color:var(--b-soft);font:600 13px/1 Pretendard,"Pretendard Variable",-apple-system,sans-serif;letter-spacing:-.01em;padding:9px 15px;border-radius:999px;cursor:pointer;transition:background-color .2s,color .2s}',
  '.sba-mode button[aria-pressed="true"]{background:var(--b-em);color:var(--b-bg)}',
  '.sba-mode button:focus-visible{outline:2px solid var(--b-gold);outline-offset:2px}',

  /* 글 틀: PC 읽기 폭 700 */
  'html[data-sba-blog] [class*="Post_wrapper"]{max-width:760px!important;margin-left:auto!important;margin-right:auto!important;color:var(--b-text)}',
  'html[data-sba-blog] [class*="Post_wrapper"]>h2{color:var(--b-em)!important;font-size:14px!important;letter-spacing:.08em!important;font-weight:700!important;opacity:.9}',
  'html[data-sba-blog] [class*="Post_post-wrapper"]{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding-left:0!important;padding-right:0!important}',
  'html[data-sba-blog] [class*="Post_post-header"] h2{color:var(--b-head)!important;font-size:clamp(25px,6.2vw,34px)!important;line-height:1.38!important;letter-spacing:-.025em!important;font-weight:800!important;word-break:keep-all}',
  'html[data-sba-blog] [class*="Post_post-info"] *{color:var(--b-muted)!important}',
  'html[data-sba-blog] [class*="Post_wrapper"] [class*="divider"]{background:var(--b-line)!important;border-color:var(--b-line)!important}',
  'html[data-sba-blog] [class*="Post_wrapper"] .tc-text-40,html[data-sba-blog] [class*="Post_wrapper"] .tc-text-60{color:var(--b-muted)!important}',

  /* 본문: 행간 넓게, 덩어리 사이 빈 줄 하나만큼 */
  'html[data-sba-blog] .ck-content{font-family:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,sans-serif!important;color:var(--b-text)!important;font-size:17px!important;line-height:1.95!important;letter-spacing:-.012em!important;font-weight:var(--b-w)!important;word-break:keep-all;overflow-wrap:anywhere}',
  'html[data-sba-blog] .ck-content p{margin:0 0 1.95em!important;font-size:inherit!important;line-height:inherit!important;color:inherit!important}',
  'html[data-sba-blog] .ck-content h2{color:var(--b-head)!important;font-size:23px!important;line-height:1.5!important;letter-spacing:-.02em!important;font-weight:700!important;margin:2.5em 0 1.1em!important;word-break:keep-all}',
  /* 글 첫 문단은 인용구 자리: 코럴 인용 + 작은 출처 */
  'html[data-sba-blog] .ck-content>p:first-child{font-size:14px!important;line-height:1.85!important;color:var(--b-muted)!important;margin-bottom:2.6em!important}',
  'html[data-sba-blog] .ck-content>p:first-child i{display:inline-block;font-size:18px!important;line-height:1.75!important;margin-bottom:8px;font-weight:600!important}',
  'html[data-sba-blog] .ck-content h3{color:var(--b-head)!important;font-size:19px!important;line-height:1.55!important;font-weight:700!important;margin:2.4em 0 .8em!important}',
  'html[data-sba-blog] .ck-content strong,html[data-sba-blog] .ck-content b{color:var(--b-em)!important;font-weight:700!important}',
  'html[data-sba-blog] .ck-content i,html[data-sba-blog] .ck-content em{color:var(--b-em2)!important;font-style:normal!important;font-weight:650!important}',
  'html[data-sba-blog] .ck-content a{color:var(--b-em)!important;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}',
  'html[data-sba-blog] .ck-content ul,html[data-sba-blog] .ck-content ol{margin:0 0 1.95em!important;padding-left:1.2em!important}',
  'html[data-sba-blog] .ck-content li{margin:0 0 .35em!important;line-height:inherit!important}',
  'html[data-sba-blog] .ck-content li::marker{color:var(--b-em)}',
  /* 인용 상자: 한쪽 색 띠 없음(대표님 규칙). 면 색 대비와 금빛 가는 선만 */
  'html[data-sba-blog] .ck-content blockquote{margin:2.6em 0!important;padding:24px 24px 4px!important;border:0!important;border-radius:16px!important;background:var(--b-surface)!important;font-style:normal!important;color:var(--b-text)!important;position:relative}',
  'html[data-sba-blog] .ck-content blockquote::before{content:"";position:absolute;left:24px;right:24px;top:0;height:1px;background:linear-gradient(90deg,transparent,var(--b-gold),transparent);opacity:.7}',
  'html[data-sba-blog] .ck-content blockquote p{margin:0 0 1.3em!important}',

  /* 이미지: 휴대폰은 화면 끝까지, 위아래 넉넉하게 */
  'html[data-sba-blog] .ck-content figure.image{display:block;margin:56px calc(50% - 50vw)!important;width:100vw!important;max-width:100vw!important;float:none!important}',
  'html[data-sba-blog] .ck-content figure.image img{display:block;width:100%!important;height:auto!important;margin:0 auto;border-radius:0}',
  'html[data-sba-blog] .ck-content figcaption{display:block;background:transparent!important;color:var(--b-muted)!important;font-size:13.5px!important;line-height:1.6!important;text-align:center!important;margin:14px 20px 0!important;padding:0!important;font-weight:400!important}',
  'html[data-sba-blog] .ck-content hr{border:0!important;height:1px!important;background:var(--b-line)!important;margin:3em 0!important}',

  /* PC */
  '@media (min-width:768px){',
  'html[data-sba-blog] [class*="Post_wrapper"]{padding-left:30px!important;padding-right:30px!important}',
  'html[data-sba-blog] .ck-content{font-size:18px!important;line-height:2!important}',
  'html[data-sba-blog] .ck-content p{margin-bottom:2em!important}',
  'html[data-sba-blog] .ck-content h2{font-size:26px!important}',
  'html[data-sba-blog] .ck-content figure.image{width:100%!important;max-width:700px!important;margin:76px auto!important}',
  'html[data-sba-blog] .ck-content figure.image.sba-tall{max-width:460px!important}',
  'html[data-sba-blog] .ck-content figure.image img{border-radius:14px;box-shadow:var(--b-shadow)}',
  '}',

  /* 블로그 목록 카드(기존 크림 카드 덮어쓰기) */
  'html[data-sba-blog] .container:has(.board-wrapper){background:var(--b-card)!important;box-shadow:var(--b-shadow)!important}',
  'html[data-sba-blog] .board-wrapper,html[data-sba-blog] .board-wrapper .title{color:var(--b-head)!important}',
  'html[data-sba-blog] .board-wrapper .board-header .heading-3{color:var(--b-em)!important}',
  'html[data-sba-blog] .board-wrapper .content,html[data-sba-blog] .board-wrapper .board-post-meta,html[data-sba-blog] .board-wrapper .board-post-meta *,html[data-sba-blog] .board-wrapper .empty-contents-wrapper,html[data-sba-blog] .board-wrapper .empty-contents-wrapper *{color:var(--b-muted)!important}',
  'html[data-sba-blog="dark"] .board-wrapper .input-field{background:#132A21!important;box-shadow:inset 0 0 0 1px var(--b-line)!important}',
  'html[data-sba-blog="dark"] .board-wrapper .input-field__input{color:var(--b-text)!important}',
  'html[data-sba-blog] .board-wrapper li>.divider{background:var(--b-line)!important}',
  'html[data-sba-blog="dark"] .board-wrapper .pagination .btn-prev,html[data-sba-blog="dark"] .board-wrapper .pagination .btn-next{background:var(--b-surface)!important;box-shadow:none!important}',
  'html[data-sba-blog="dark"] .board-wrapper .pagination button{color:var(--b-soft)!important}',
  '@media (prefers-reduced-motion:reduce){html[data-sba-blog] body,.sba-mode button{transition:none}}'
  ].join('\n');

  function injectCss() {
    if (document.getElementById('sba-blog-css')) return;
    var s = document.createElement('style'); s.id = 'sba-blog-css'; s.textContent = CSS;
    (document.head || ROOT).appendChild(s);
  }
  function stored() { try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; } catch (e) { return 'dark'; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function isBlog() {
    var p = location.pathname || '';
    if (/[?&]sbablog=1/.test(location.search)) return true;
    if (/^\/boards\/5619(\/|$)/.test(p)) return true;
    if (/^\/posts\/blog-/.test(p)) return true;
    if (/^\/posts\//.test(p)) {
      var h = document.querySelector('[class*="Post_wrapper"] > h2');
      if (h && h.textContent.trim() === '블로그') return true;
    }
    return false;
  }

  function mountToggle() {
    var host = document.querySelector('[class*="Post_post-wrapper"]') || document.querySelector('.board-wrapper');
    if (!host) return;
    for (var i = 0; i < host.children.length; i++) { if (host.children[i].classList.contains('sba-mode')) return; }
    var wrap = document.createElement('div'); wrap.className = 'sba-mode';
    wrap.innerHTML = '<div class="sba-mode__box" role="group" aria-label="화면 모드">' +
      '<button type="button" data-t="dark">다크 모드</button><button type="button" data-t="light">일반 모드</button></div>';
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-t]'); if (!b) return;
      save(b.getAttribute('data-t')); apply();
    });
    host.insertBefore(wrap, host.firstChild);
  }
  function syncToggle() {
    var v = ROOT.getAttribute('data-sba-blog');
    document.querySelectorAll('.sba-mode button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-t') === v ? 'true' : 'false');
    });
  }
  function markTall() {
    document.querySelectorAll('.ck-content figure.image img').forEach(function (img) {
      var f = img.closest('figure'); if (!f || f.__sbaT) return;
      var go = function () { if (!img.naturalWidth) return; f.__sbaT = 1; if (img.naturalHeight / img.naturalWidth > 1.15) f.classList.add('sba-tall'); };
      if (img.complete) go(); else img.addEventListener('load', go, { once: true });
    });
  }

  var busy = false;
  function apply() {
    if (busy) return; busy = true;
    try {
      if (isBlog()) {
        injectCss();
        var v = stored();
        if (ROOT.getAttribute('data-sba-blog') !== v) ROOT.setAttribute('data-sba-blog', v);
        mountToggle(); syncToggle(); markTall();
      } else if (ROOT.hasAttribute('data-sba-blog')) {
        ROOT.removeAttribute('data-sba-blog');
        document.querySelectorAll('.sba-mode').forEach(function (n) { n.remove(); });
      }
    } finally { busy = false; }
  }

  var tm; function later() { clearTimeout(tm); tm = setTimeout(apply, 150); }
  ['pushState', 'replaceState'].forEach(function (m) {
    var o = history[m]; if (!o) return;
    history[m] = function () { var r = o.apply(this, arguments); later(); return r; };
  });
  window.addEventListener('popstate', later);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) { if (list[i].target.nodeType === 1 && !(list[i].target.closest && list[i].target.closest('.sba-mode'))) { later(); return; } }
  }).observe(document.body || ROOT, { childList: true, subtree: true });
})();
