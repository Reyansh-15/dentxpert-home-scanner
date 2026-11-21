(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const modules = [
    {name:'VisionStand',category:'Design',state:'Open question',detail:'Positioning study: validate handling and repeatability before making claims.'},
    {name:'Compact Wand',category:'Design',state:'Open question',detail:'Form study: compare reach, balance, cleaning and safe storage.'},
    {name:'Data minimisation',category:'Privacy',state:'Evidence gate',detail:'Define retention, consent and deletion before collecting any user information.'},
    {name:'Accessible handling',category:'Accessibility',state:'Active',detail:'Test keyboard, touch, focus, zoom, contrast and reduced motion with real users.'},
    {name:'Care workflow',category:'Hygiene',state:'Open question',detail:'Document cleaning, handling and storage constraints for future review.'},
    {name:'Optical pathway',category:'Technology',state:'Evidence gate',detail:'Require independent scientific assessment before any imaging performance claim.'},
    {name:'Human oversight',category:'Ethics',state:'Active',detail:'No automated diagnosis. Qualified dental professionals remain responsible for care.'},
    {name:'Failure states',category:'Systems',state:'Open question',detail:'Make uncertainty, unavailable features and recovery options understandable.'}
  ];
  const integrations = [
    ['Perplexity Computer','Research browser'],['Claude Code','Build agent'],
    ['Hermes Agent','Automation agent'],['Manus Computer','Remote workspace'],
    ['Kimi Agent Swarm','Agent orchestration']
  ];
  const list = $('#module-list'), search = $('#cc-search'), filter = $('#cc-filter');
  const status = $('#cc-status'), narrative = $('#cc-narrative');
  const palette = $('#command'), input = $('#command-input'), trigger = $('#open-command');
  let selected = null, returnFocus = null;
  const announce = message => { if (status) status.textContent = message; };
  const select = index => {
    selected = index;
    const item = modules[index];
    if (!item) return;
    if (narrative) narrative.textContent = item.name + ': ' + item.detail + ' Status: ' + item.state + '. Research concept only.';
    list?.querySelectorAll('[data-module]').forEach(el => {
      const active = Number(el.dataset.module) === index;
      el.classList.toggle('active', active);
      el.setAttribute('aria-pressed', String(active));
    });
    announce(item.name + ' selected');
  };
  const render = () => {
    if (!list) return;
    const query = (search?.value || '').trim().toLowerCase();
    const state = filter?.value || 'all';
    list.replaceChildren();
    modules.forEach((item, index) => {
      if ((state !== 'all' && item.state !== state) || ![item.name,item.category,item.state,item.detail].join(' ').toLowerCase().includes(query)) return;
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'module'; button.dataset.module = String(index);
      button.setAttribute('aria-pressed', String(index === selected));
      const name = document.createElement('b'); name.textContent = item.name;
      const meta = document.createElement('small'); meta.textContent = item.category + ' · ' + item.state;
      button.append(name, meta);
      button.addEventListener('click', () => select(index));
      list.append(button);
    });
    if (!list.children.length) {
      const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = 'No modules match this filter.'; list.append(empty);
    }
    announce(list.querySelectorAll('[data-module]').length + ' modules visible');
  };
  search?.addEventListener('input', render);
  filter?.addEventListener('change', render);
  render();
  const commands = [
    {name:'Show all modules',run:()=>{if(search)search.value='';if(filter)filter.value='all';render();search?.focus()}},
    {name:'Show evidence gates',run:()=>{if(search)search.value='';if(filter)filter.value='Evidence gate';render();filter?.focus()}},
    {name:'Show open questions',run:()=>{if(search)search.value='';if(filter)filter.value='Open question';render();filter?.focus()}},
    {name:'Open research registry',run:()=>{location.href='discover.html'}},
    {name:'Go to home',run:()=>{location.href='home.html'}},
    {name:'Toggle light/dark theme',run:()=>$('#theme-toggle')?.click()},
    ...modules.map((item,index)=>({name:'Inspect '+item.name,run:()=>{if(search)search.value='';if(filter)filter.value='all';render();select(index);list?.querySelector('[data-module="'+index+'"]')?.focus()}}))
  ];
  const results = document.createElement('div');
  results.id = 'command-results'; results.setAttribute('role','group');
  results.setAttribute('aria-label','Available commands');
  input?.setAttribute('aria-controls','command-results');
  input?.setAttribute('aria-describedby','command-results');
  input?.setAttribute('aria-label','Search commands');
  input?.parentElement?.append(results);
  const drawCommands = () => {
    results.replaceChildren();
    const query = (input?.value || '').trim().toLowerCase();
    const matching = commands.filter(command => command.name.toLowerCase().includes(query));
    matching.forEach(command => {
      const button = document.createElement('button');
      button.type='button'; button.className='command-option'; button.textContent=command.name;
      button.addEventListener('click',()=>{close(false);command.run()});
      results.append(button);
    });
    if(!matching.length){const empty=document.createElement('p');empty.textContent='No matching commands';results.append(empty)}
  };
  const open = () => {
    if(!palette)return;
    returnFocus = document.activeElement;
    palette.hidden=false; palette.classList.add('open');
    trigger?.setAttribute('aria-expanded','true');
    if(input)input.value='';
    drawCommands();input?.focus();announce('Command palette opened');
  };
  const close = (restore=true) => {
    if(!palette || palette.hidden)return;
    palette.hidden=true;palette.classList.remove('open');
    trigger?.setAttribute('aria-expanded','false');
    if(restore)(returnFocus?.isConnected ? returnFocus : trigger)?.focus();
  };
  if(palette){palette.hidden=true;palette.setAttribute('role','dialog');palette.setAttribute('aria-modal','true');palette.setAttribute('aria-label','Command palette')}
  trigger?.setAttribute('aria-haspopup','dialog');trigger?.setAttribute('aria-expanded','false');
  trigger?.addEventListener('click',open);
  input?.addEventListener('input',drawCommands);
  input?.addEventListener('keydown',event=>{if(event.key==='Enter'){const first=results.querySelector('button');if(first){event.preventDefault();first.click()}}});
  palette?.addEventListener('click',event=>{if(event.target===palette)close()});
  palette?.addEventListener('keydown',event=>{
    if(event.key==='Tab'){
      const focusables=[...palette.querySelectorAll('input,button')].filter(el=>!el.disabled && !el.hidden && el.getClientRects().length);
      const first=focusables[0],last=focusables[focusables.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}
    }
  });
  document.addEventListener('keydown',event=>{
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();open()}
    if(event.key==='Escape'&&!palette?.hidden){event.preventDefault();close()}
  });
  const integrationsMount=$('#integration-list');
  integrations.forEach(([name,kind])=>{
    if(!integrationsMount)return;
    const item=document.createElement('div');item.className='integration';
    const info=document.createElement('span');const heading=document.createElement('b');heading.textContent=name;
    const description=document.createElement('small');description.textContent=kind;
    const state=document.createElement('em');state.textContent='Not connected';
    info.append(heading,description);item.append(info,state);integrationsMount.append(item);
  });
  const voice=$('#voice-command');
  const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(voice&&Recognition){
    voice.addEventListener('click',()=>{
      const recognition=new Recognition();recognition.lang='en-US';
      recognition.onstart=()=>announce('Listening for a command');
      recognition.onresult=event=>{open();if(input)input.value=event.results[0][0].transcript;drawCommands()};
      recognition.onerror=()=>announce('Voice recognition unavailable');
      try{recognition.start()}catch{announce('Voice recognition could not start')}
    });
  }else if(voice){voice.disabled=true;voice.title='Voice input is not supported in this browser'}
  const descriptions={
    core:'DentXpert: research concept, not a diagnostic device.',
    design:'Design: positioning and ergonomics require user testing.',
    evidence:'Evidence: clinical claims require independent review.',
    privacy:'Privacy: no medical information is collected by this demonstration.',
    access:'Accessibility: keyboard, zoom and screen reader validation remain required.'
  };
  document.querySelectorAll('.node').forEach(node=>{
    const activate=()=>{const id=node.dataset.id;narrative.textContent=descriptions[id]||'Research relationship';announce(id+' graph node selected')};
    node.setAttribute('tabindex','0');node.setAttribute('role','button');
    node.setAttribute('aria-label','Explore '+node.dataset.id+' research node');
    node.addEventListener('click',activate);
    node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate()}});
  });
})();
