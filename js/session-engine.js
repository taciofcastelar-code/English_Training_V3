(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  function main(state){
    const pool=H.Content.all;
    const items=H.Adaptive.choose(state,pool,H.Config.sessionSize);
    return {id:'S-'+Date.now(),mode:'main',startedAt:new Date().toISOString(),index:0,items};
  }
  function practice(state,opts={}){
    let pool=H.Content.practice;
    if(opts.topic) pool=pool.filter(x=>x.topic===opts.topic);
    if(opts.subtopic) pool=pool.filter(x=>x.subtopic===opts.subtopic);
    if(opts.level) pool=pool.filter(x=>x.level===opts.level);
    if(opts.variant) pool=pool.filter(x=>x.variant===opts.variant);
    if(opts.errorsOnly){
      const ids=new Set(state.errors.map(e=>e.exerciseId));
      pool=pool.filter(x=>ids.has(x.id));
    }
    const n=opts.count==='infinite'?Math.min(pool.length,1000):Number(opts.count||20);
    const shuffled=[...pool].sort(()=>Math.random()-.5).slice(0,n);
    return {id:'P-'+Date.now(),mode:'practice',startedAt:new Date().toISOString(),index:0,items:shuffled,options:opts};
  }
  H.Session={main,practice};
})();