(() => {
  'use strict';
  const H = window.EnglishHub = window.EnglishHub || {};
  const C = H.Config;

  const freshState = profileId => ({
    schemaVersion: 2,
    profileId: profileId || null,
    attempts: [],
    errors: [],
    sessions: [],
    practiceSessions: [],
    reports: [],
    reviews: [],
    activeSession: null,
    stage: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  function open(){
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open(C.dbName,C.dbVersion);
      req.onupgradeneeded=()=>{
        const db=req.result;
        if(!db.objectStoreNames.contains(C.stateStore)) db.createObjectStore(C.stateStore);
      };
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error);
    });
  }
  async function get(key){
    const db=await open();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(C.stateStore,'readonly');
      const req=tx.objectStore(C.stateStore).get(key);
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error);
    });
  }
  async function put(key,value){
    const db=await open();
    value.updatedAt=new Date().toISOString();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(C.stateStore,'readwrite');
      tx.objectStore(C.stateStore).put(value,key);
      tx.oncomplete=()=>resolve(value);
      tx.onerror=()=>reject(tx.error);
    });
  }
  function migrate(state, profileId){
    if(!state) return freshState(profileId);
    const s={...freshState(profileId),...state};
    s.schemaVersion=2;
    s.profileId=profileId || s.profileId;
    ['attempts','errors','sessions','practiceSessions','reports','reviews'].forEach(k=>{
      if(!Array.isArray(s[k])) s[k]=[];
    });
    return s;
  }
  async function loadProfile(profileId){
    return migrate(await get('profile:'+profileId),profileId);
  }
  async function saveProfile(state){
    if(!state?.profileId) throw new Error('Perfil não definido.');
    return put('profile:'+state.profileId,state);
  }
  async function exportProfile(state){
    return JSON.stringify(state,null,2);
  }
  H.DB={freshState,loadProfile,saveProfile,exportProfile};
})();