(() => {
  const cfg = window.DX_INSFORGE_CONFIG || {};
  let client;
  async function getClient(){ if(client)return client; if(!cfg.baseUrl||!cfg.anonKey) return null; const sdk=await import('https://esm.sh/@insforge/sdk@latest'); client=sdk.createClient({baseUrl:cfg.baseUrl,anonKey:cfg.anonKey}); return client; }
  window.DXKnowledge = {
    async search({query='',status='all',kind='all',page=0,pageSize=24}={}){
      const api=await getClient(); if(!api) return {items:[],total:0,configured:false};
      let request=api.database.from('dx_modules').select('*',{count:'exact'}).range(page*pageSize,(page+1)*pageSize-1).order('updated_at',{ascending:false});
      if(query) request=request.or(`title.ilike.%${query}%,summary.ilike.%${query}%,body.ilike.%${query}%`);
      if(status!=='all') request=request.eq('status',status); if(kind!=='all') request=request.eq('kind',kind);
      const {data,error,count}=await request; if(error) throw error; return {items:data||[],total:count||0,configured:true};
    },
    async addNote({moduleId,title,body}){const api=await getClient(); if(!api) throw new Error('Sign in and configure InsForge first.'); const user=await api.auth.getCurrentUser(); if(!user?.data?.user) throw new Error('Sign in to save notes.'); return api.database.from('dx_user_notes').insert({user_id:user.data.user.id,module_id:moduleId,title,body});}
  };
})();

