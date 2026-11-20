(() => {
  const mount = document.querySelector('[data-module-registry]');
  if (!mount) return;
  const modules = [
    ['design','VisionStand','A stable positioning study for calmer guidance.','Open question'],['design','Compact Wand','A lightweight form study focused on reach and balance.','Open question'],['privacy','Data minimisation','A boundary map for what a responsible prototype should never collect.','Safety gate'],['accessibility','Accessible handling','An exploration of grip, reach, contrast, and pause states.','Design study'],['hygiene','Care workflow','A scenario map for cleaning, storage, and routine.','Unresolved'],['technology','Optical pathway','A non-clinical diagram of sensing questions—not performance claims.','Technical study'],['evidence','Evidence gate','A checklist separating a promising idea from a supported conclusion.','Research gate'],['ethics','Human oversight','A model for keeping qualified professionals central to future care.','Principle'],['education','Plain-language mode','A content direction for explaining uncertainty without jargon.','Content study'],['security','Session boundary','A concept for keeping account data separate from medical information.','Security study'],['systems','Failure states','A map of what the interface should say when the system is unsure.','Systems study'],['future','Availability path','The conditions that would need to exist before any real offering.','Future question']
  ].map(([category,title,description,status])=>({category,title,description,status}));
  const render=list=>{mount.innerHTML=list.map((m,i)=>`<article class="registry-card" tabindex="0"><div class="registry-meta"><span>${String(i+1).padStart(2,'0')}</span><span>${m.category}</span></div><h3>${m.title}</h3><p>${m.description}</p><strong>${m.status} <span aria-hidden="true">↗</span></strong></article>`).join('');};
  const search=document.querySelector('[data-module-search]'),filter=document.querySelector('[data-module-filter]');
  const update=()=>{const q=(search?.value||'').toLowerCase(),c=filter?.value||'all';render(modules.filter(m=>(c==='all'||m.category===c)&&(!q||`${m.title} ${m.description} ${m.category}`.toLowerCase().includes(q))))};
  search?.addEventListener('input',update); filter?.addEventListener('change',update); render(modules);
})();

