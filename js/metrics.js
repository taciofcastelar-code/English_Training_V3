(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  const avg=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:0;
  const attempts=(state,filter)=>state.attempts.filter(filter||(()=>true));
  function skill(state,skill){
    const a=attempts(state,x=>x.skill===skill);
    const accuracy=avg(a.map(x=>Number(x.accuracy||0)));
    const responseTime=avg(a.map(x=>Number(x.responseTime||0)));
    const independence=avg(a.map(x=>Number(x.independence??1)));
    const mastery=Math.max(0,Math.min(1,accuracy*.55+independence*.25+(responseTime?Math.max(0,1-responseTime/45000):.5)*.20));
    const confidence=avg(a.map(x=>Number(x.confidence??.5)));
    const automaticity=Math.max(0,Math.min(1,accuracy*.6+(responseTime?Math.max(0,1-responseTime/25000):.4)*.4));
    return {count:a.length,accuracy,responseTime,independence,mastery,confidence,automaticity};
  }
  function foundation(state){
    const a=attempts(state,x=>String(x.targetId||x.exerciseId||'').startsWith('B'));
    const unique=new Set(a.map(x=>x.targetId||x.exerciseId)).size;
    return {unique,accuracy:avg(a.map(x=>Number(x.accuracy||0)))};
  }
  function topic(state,topic){
    const a=attempts(state,x=>x.topic===topic || x.grammarTopic===topic);
    return {count:a.length,accuracy:avg(a.map(x=>Number(x.accuracy||0)))};
  }
  function retention(state,days){
    const cutoff=Date.now()-days*86400000;
    const a=attempts(state,x=>new Date(x.at||0).getTime()<=cutoff && x.isReview);
    return a.length?avg(a.map(x=>Number(x.accuracy||0))):0;
  }
  function progress(state){
    const C=H.Config, f=foundation(state);
    let stage=1;
    if(state.sessions.length>=C.foundationGate.sessions && f.unique>=C.foundationGate.unique && f.accuracy>=C.foundationGate.accuracy) stage=2;
    const levelUnique=level=>new Set(attempts(state,x=>x.level===level).map(x=>x.targetId||x.exerciseId)).size;
    const levelAcc=level=>avg(attempts(state,x=>x.level===level).map(x=>Number(x.accuracy||0)));
    if(stage>=2 && state.sessions.length>=22 && levelUnique('A1')>=80 && levelAcc('A1')>=.68) stage=3;
    if(stage>=3 && state.sessions.length>=42 && levelUnique('A2')>=120 && levelAcc('A2')>=.70) stage=4;
    if(stage>=4 && state.sessions.length>=70 && levelUnique('B1')>=120 && levelAcc('B1')>=.72) stage=5;
    return {stage,foundation:f};
  }
  H.Metrics={avg,skill,foundation,topic,retention,progress};
})();