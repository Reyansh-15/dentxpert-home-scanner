(()=>{
  const root=document.documentElement;
  try{if(localStorage.getItem('dx-theme')==='dark')root.dataset.theme='dark'}catch{}
  const toggle=document.getElementById('theme-toggle');
  function syncTheme(){const dark=root.dataset.theme==='dark';if(toggle){toggle.setAttribute('aria-pressed',String(dark));toggle.textContent=dark?'Switch to light theme':'Switch to dark theme'}}
  syncTheme();
  toggle?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';syncTheme();try{localStorage.setItem('dx-theme',root.dataset.theme)}catch{}});
  const menu=document.getElementById('menu-button'),nav=document.getElementById('primary-nav');
  function closeMenu(restoreFocus=false){if(!menu||!nav)return;const wasOpen=nav.classList.contains('open');nav.classList.remove('open');menu.setAttribute('aria-expanded','false');if(restoreFocus&&wasOpen)menu.focus()}
  menu?.addEventListener('click',()=>{if(!nav)return;const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu(true)});
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
  document.addEventListener('click',e=>{if(nav&&menu&&!nav.contains(e.target)&&!menu.contains(e.target))closeMenu()});
  window.addEventListener('resize',()=>{if(window.innerWidth>720)closeMenu()});
})();
