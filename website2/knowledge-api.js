(() => {
  const cfg = window.DX_INSFORGE_CONFIG || {};
  let client;
  async function getClient(){ if(client)return client; if(!cfg.baseUrl||!cfg.anonKey) return null; const sdk=await import('https://esm.sh/@insforge/sdk@latest'); client=sdk.createClient({baseUrl:cfg.baseUrl,anonKey:cfg.anonKey}); return client; }
  async function requireUser(){
    const api=await getClient();
    if(!api) throw new Error('InsForge is not configured.');
    const result=await api.auth.getCurrentUser();
    const user=result?.data?.user;
    if(!user) throw new Error('Sign in to access your private workspace.');
    return {api,user};
  }
  window.DXKnowledge = {
    async listWorkspace(){
      const {api,user}=await requireUser();
      const {data,error}=await api.database.from('dx_workspace_items').select('id,title,body,kind,stage,created_at,updated_at').eq('user_id',user.id).order('updated_at',{ascending:false}).limit(200);
      if(error) throw error;
      return data||[];
    },
    async createWorkspaceItem(item){
      const {api,user}=await requireUser();
      const title=String(item?.title||'').trim();
      const kind=item?.kind||'task',stage=item?.stage||'todo';
      if(!title||title.length>160||!['task','note'].includes(kind)||!['todo','doing','done'].includes(stage))throw new Error('Invalid item');
      const {data,error}=await api.database.from('dx_workspace_items').insert({title,kind,stage,user_id:user.id}).select('*');
      if(error)throw error;
      return data;
    },
    async updateWorkspaceStage(id,stage){
      if(!['todo','doing','done'].includes(stage))throw new Error('Invalid stage');
      const {api,user}=await requireUser();
      const {data,error}=await api.database.from('dx_workspace_items').update({stage}).eq('id',id).eq('user_id',user.id).select('*');
      if(error)throw error;
      return data;
    },
    async deleteWorkspaceItem(id){
      const {api,user}=await requireUser();
      const {error}=await api.database.from('dx_workspace_items').delete().eq('id',id).eq('user_id',user.id);
      if(error)throw error;
      return true;
    },
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

