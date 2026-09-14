(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  function lastAttempt(state,ex){
    const key=ex.targetId||ex.id;
    return [...state.attempts].reverse().find(a=>(a.targetId||a.exerciseId)===key);
  }
  function score(state,ex){
    const sm=H.Metrics.skill(state,ex.skill);
    const last=lastAttempt(state,ex);
    let review=1.2;
    if(last){
      const age=(Date.now()-new Date(last.at).getTime())/86400000;
      if(last.accuracy<.7) review=age>=1?3.2:1.5;
      else if(age>=21) review=3;
      else if(age>=7) review=2.2;
      else if(age>=1) review=1.3;
      else review=.4;
    }
    const errorBoost=state.errors.filter(e=>e.topic===ex.topic||e.domain===ex.domain).length*.08;
    return (1-sm.mastery)*4+review+errorBoost;
  }
  function allowed(state,ex){
    if(!ex) return false;
    if(ex.stage && ex.stage>(state.stage||1)) return false;
    return true;
  }
  function choose(state,pool,n=10){
    return (pool||[]).filter(ex=>allowed(state,ex))
      .map(ex=>({ex,s:score(state,ex)}))
      .sort((a,b)=>b.s-a.s || String(a.ex.id).localeCompare(String(b.ex.id)))
      .slice(0,n).map(x=>x.ex);
  }
  H.Adaptive={score,allowed,choose};
})();