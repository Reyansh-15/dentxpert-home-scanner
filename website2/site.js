(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('js');

  const live = document.createElement('div');
  live.className = 'sr-only'; live.id = 'dx-live'; live.setAttribute('aria-live', 'polite'); body.append(live);
  const announce = message => { live.textContent = ''; requestAnimationFrame(() => live.textContent = message); };

  // Add a compact, honest status signal to the hero without duplicating markup across pages.
  const heroActions = document.querySelector('.hero-copy .actions');
  if (heroActions && !document.querySelector('.hero-signal')) {
    const signal = document.createElement('div');
    signal.className = 'hero-signal';
    signal.setAttribute('aria-label', 'DentXpert research status');
    signal.innerHTML = '<div><strong>01</strong><span>research concept</span></div><div><strong>08</strong><span>story chapters</span></div><div><strong>∞</strong><span>questions open</span></div>';
    heroActions.after(signal);
  }

  const header = document.querySelector('.site-header');
  const progress = document.createElement('div');
  progress.setAttribute('aria-hidden', 'true');
  Object.assign(progress.style,{position:'fixed',inset:'0 auto auto 0',height:'2px',width:'0',background:'var(--aqua)',zIndex:'120',boxShadow:'0 0 14px var(--aqua)'});
  body.prepend(progress);
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 18);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  onScroll(); addEventListener('scroll', onScroll, {passive:true}); addEventListener('resize', onScroll);

  const menu = document.getElementById('menu-button');
  const nav = document.getElementById('primary-nav');
  const closeMenu = (focus=false) => { if(!menu || !nav) return; const wasOpen = nav.classList.contains('open'); nav.classList.remove('open'); menu.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); body.classList.remove('menu-open'); if(focus && wasOpen) menu.focus(); };
  menu?.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open',open); menu.classList.toggle('is-open',open); menu.setAttribute('aria-expanded',String(open)); body.classList.toggle('menu-open',open); });
  nav?.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
  addEventListener('resize', () => { if(innerWidth > 820) closeMenu(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') { closeMenu(true); closeInspector(); } });

  const theme = document.getElementById('theme-toggle');
  try { const saved = localStorage.getItem('dx-theme'); if(saved) root.dataset.theme = saved; } catch {}
  const syncTheme = () => { const dark = root.dataset.theme !== 'light'; theme?.setAttribute('aria-pressed',String(dark)); if(theme) theme.title = dark ? 'Use light theme' : 'Use dark theme'; };
  syncTheme();
  theme?.addEventListener('click', () => { const next = root.dataset.theme === 'light' ? 'dark' : 'light'; root.dataset.theme = next; try{localStorage.setItem('dx-theme',next)}catch{} syncTheme(); announce(`${next} theme enabled`); });

  if(!reduced.matches && matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove', e => { body.style.setProperty('--cursor-x',`${e.clientX}px`); body.style.setProperty('--cursor-y',`${e.clientY}px`); }, {passive:true});
  }

  const reveals = document.querySelectorAll('.section,.truth-bar,.status-strip,.story,.milestone,.flow-step,.faq-list details,.concept,.panel,.price-state');
  reveals.forEach(el => el.classList.add('reveal'));
  const revealStyle = document.createElement('style');
  revealStyle.textContent = '.reveal{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.8,.2,1)}.reveal.visible{opacity:1;transform:none}';
  document.head.append(revealStyle);
  if(reduced.matches || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('visible'));
  else { const io = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } }),{threshold:.08,rootMargin:'0px 0px -5%'}); reveals.forEach(el => io.observe(el)); }

  const scanner = document.querySelector('.scanner-stage');
  const inspector = scanner?.querySelector('.inspect-panel');
  const closeInspector = () => { if(!scanner) return; scanner.classList.remove('inspecting'); scanner.setAttribute('aria-expanded','false'); inspector?.setAttribute('aria-hidden','true'); };
  const toggleInspector = () => { if(!scanner) return; const open = !scanner.classList.contains('inspecting'); scanner.classList.toggle('inspecting',open); scanner.setAttribute('aria-expanded',String(open)); inspector?.setAttribute('aria-hidden',String(!open)); announce(open ? 'Concept inspection opened' : 'Concept inspection closed'); };
  scanner?.addEventListener('click', e => { if(!e.target.closest('.hotspot')) toggleInspector(); });
  scanner?.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleInspector(); } if(e.key === 'Escape') closeInspector(); });
  scanner?.querySelectorAll('.hotspot').forEach(button => button.addEventListener('click', e => { e.stopPropagation(); toggleInspector(); }));
  if(scanner && !reduced.matches && matchMedia('(pointer:fine)').matches){
    scanner.addEventListener('pointermove', e => { const r=scanner.getBoundingClientRect(); scanner.style.setProperty('--tilt-x',`${(e.clientX-r.left-r.width/2)*.025}px`); scanner.style.setProperty('--tilt-y',`${(e.clientY-r.top-r.height/2)*.025}px`); });
    scanner.addEventListener('pointerleave', () => { scanner.style.setProperty('--tilt-x','0px'); scanner.style.setProperty('--tilt-y','0px'); });
  }

  const truthButton = document.querySelector('.truth-toggle');
  const truthDetail = document.getElementById('truth-detail');
  truthButton?.addEventListener('click', () => { const open = truthButton.getAttribute('aria-expanded') !== 'true'; truthButton.setAttribute('aria-expanded',String(open)); truthDetail.hidden = !open; announce(open ? 'Research boundary explanation opened' : 'Research boundary explanation closed'); });

  const concepts = {
    vision:{code:'VS–01',name:'VisionStand',description:'A stable home base exploring more understandable positioning and calmer guidance.',question:'Could positioning feel more understandable?',focus:'Guided placement',risk:'Cleaning and alignment'},
    wand:{code:'CW–02',name:'Compact Wand',description:'A minimal handheld direction centered on reach, balance, and visual simplicity.',question:'Could a lighter form reduce handling effort?',focus:'Reach and balance',risk:'Control and durability'},
    grip:{code:'SG–03',name:'SmartGrip',description:'An ergonomics study exploring confidence, feedback, and comfortable control.',question:'What makes unfamiliar hardware feel controllable?',focus:'Ergonomic feedback',risk:'Fit across users'},
    dock:{code:'SD–04',name:'ScanDock',description:'A protected storage direction exploring readiness, cleaning, and routine.',question:'Could storage make responsible use easier?',focus:'Care and readiness',risk:'Hygiene workflow'},
    case:{code:'SC–05',name:'SmartCase',description:'A portable system study for protected organization—not a product offer.',question:'How might portability preserve clarity and care?',focus:'Portable organization',risk:'Power and protection'}
  };
  const conceptEls = {code:document.getElementById('concept-code'),name:document.getElementById('concept-name'),description:document.getElementById('concept-description'),question:document.getElementById('concept-question'),focus:document.getElementById('concept-focus'),risk:document.getElementById('concept-risk')};
  document.querySelectorAll('[data-concept]').forEach((tab,index,tabs) => tab.addEventListener('click', () => {
    const data = concepts[tab.dataset.concept]; if(!data) return;
    tabs.forEach(t => t.setAttribute('aria-selected',String(t===tab)));
    const panel = document.getElementById('concept-panel'); panel?.animate?.([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:360,easing:'ease-out'});
    Object.entries(conceptEls).forEach(([key,el]) => { if(el) el.textContent = data[key]; });
    announce(`${data.name} concept selected`);
  }));

  const screens = {
    orient:{kicker:'ORIENTATION',title:'Begin with context, not conclusions.',copy:'Explain what this experience can and cannot do before any interaction starts.',note:'No medical assessment is produced.'},
    guide:{kicker:'GUIDANCE',title:'Make every uncertain step visible.',copy:'Use calm positioning cues and let people pause, repeat, or stop without penalty.',note:'Guidance shown here is illustrative.'},
    review:{kicker:'REVIEW',title:'Show observations without pretending certainty.',copy:'Separate image quality, annotations, limitations, and questions for a professional.',note:'No diagnosis or reassurance is generated.'},
    discuss:{kicker:'DISCUSSION',title:'End with better questions for real care.',copy:'Help a person prepare a clear conversation while keeping qualified judgment central.',note:'Professional dental care remains essential.'}
  };
  const screenEls={kicker:document.getElementById('screen-kicker'),title:document.getElementById('screen-title'),copy:document.getElementById('screen-copy'),note:document.getElementById('screen-note')};
  document.querySelectorAll('.exp-nav').forEach(button => button.addEventListener('click', () => { const data=screens[button.dataset.screen]; if(!data)return; document.querySelectorAll('.exp-nav').forEach(b=>b.classList.toggle('active',b===button)); Object.entries(screenEls).forEach(([k,el])=>{if(el)el.textContent=data[k]}); document.getElementById('prototype-screen')?.animate?.([{opacity:.3,transform:'translateX(10px)'},{opacity:1,transform:'none'}],{duration:330,easing:'ease-out'}); announce(`${data.kicker.toLowerCase()} screen selected`); }));

  document.querySelectorAll('.concept').forEach(card => { card.tabIndex=0; card.setAttribute('role','button'); card.setAttribute('aria-pressed','false'); const activate=()=>{const on=card.getAttribute('aria-pressed')!=='true'; document.querySelectorAll('.concept').forEach(c=>c.setAttribute('aria-pressed','false')); card.setAttribute('aria-pressed',String(on));}; card.addEventListener('click',activate); card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}}); });

  // Interactive concept laboratory: drag the render, inspect depth, and reset safely.
  if (scanner && !reduced.matches) {
    const controls = document.createElement('div');
    controls.className = 'scanner-controls';
    controls.innerHTML = '<span>LAB CONTROLS</span><button type="button" data-scanner-action="reset">Reset view</button><button type="button" data-scanner-action="explode">Explode layers</button>';
    scanner.append(controls);
    let dragging = false, startX = 0, startY = 0, rx = 0, ry = 0;
    const setRotation = () => scanner.style.setProperty('--lab-rotation', `rotateX(${rx}deg) rotateY(${ry}deg)`);
    scanner.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; dragging = true; startX=e.clientX; startY=e.clientY; scanner.setPointerCapture?.(e.pointerId); scanner.classList.add('is-dragging'); });
    scanner.addEventListener('pointermove', e => { if(!dragging) return; ry=Math.max(-22,Math.min(22,ry+(e.clientX-startX)*.18)); rx=Math.max(-14,Math.min(14,rx-(e.clientY-startY)*.12)); startX=e.clientX; startY=e.clientY; setRotation(); });
    const stop = () => { dragging=false; scanner.classList.remove('is-dragging'); };
    scanner.addEventListener('pointerup',stop); scanner.addEventListener('pointercancel',stop); scanner.addEventListener('pointerleave',stop);
    controls.querySelector('[data-scanner-action="reset"]').onclick=()=>{rx=0;ry=0;scanner.classList.remove('is-exploded');setRotation();announce('Concept view reset')};
    controls.querySelector('[data-scanner-action="explode"]').onclick=()=>{scanner.classList.toggle('is-exploded');announce(scanner.classList.contains('is-exploded')?'Layer view opened':'Layer view closed')};
  }

  document.querySelectorAll("a[href$='.html']").forEach(link => link.addEventListener('click', e => { if(e.metaKey||e.ctrlKey||e.shiftKey||reduced.matches)return; const target=new URL(link.href,location.href); if(target.origin!==location.origin)return; e.preventDefault(); body.classList.add('page-leaving'); setTimeout(()=>location.href=target.href,210); }));
})();
