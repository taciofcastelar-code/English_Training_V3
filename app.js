(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  let state=null, profile=null, session=null, startedAt=0, buildTokens=[];
  const app=()=>document.getElementById('app');
  const pct=n=>Math.round((Number(n)||0)*100)+'%';

  function profiles(){
    app().innerHTML=`<section class="login card"><span class="eyebrow">ENGLISH TRAINING HUB V3 · REBUILD</span>
      <h2>Escolha o perfil</h2><p class="muted">Os dados permanecem separados neste dispositivo.</p>
      <div class="profiles">${H.Config.profiles.map(p=>`<button class="profile" data-profile="${p.id}"><span>${p.name[0]}</span>${p.name}</button>`).join('')}</div></section>`;
    document.querySelectorAll('[data-profile]').forEach(b=>b.onclick=()=>login(b.dataset.profile));
  }
  async function login(id){
    profile=H.Config.profiles.find(p=>p.id===id);
    state=await H.DB.loadProfile(id);
    if(profile.role==='teacher') state.stage=5;
    else state.stage=Math.max(state.stage||1,H.Metrics.progress(state).stage);
    await H.DB.saveProfile(state); dashboard();
  }
  function metricCard(skill){
    const m=H.Metrics.skill(state,skill);
    return `<div class="card metric"><span>${H.Config.skillLabels[skill]}</span><strong>${pct(m.mastery)}</strong>
      <small>${m.count} tentativas</small><div class="bar"><i style="width:${pct(m.mastery)}"></i></div></div>`;
  }
  function dashboard(){
    const f=H.Metrics.foundation(state), audit=H.Content.audit(), mastery=H.Mastery.b2(state);
    app().innerHTML=`<div class="profilebar"><div><b>${profile.name}</b><span class="muted small">${profile.role==='teacher'?'Professor':'Aluno'}</span></div><button class="ghost" id="logout">Trocar perfil</button></div>
      <section class="hero">
        <div class="card"><span class="eyebrow">SESSÃO ADAPTATIVA</span><h2>Treine o que mais precisa agora.</h2>
          <p class="muted">Currículo A1–B2, construção de frases, quatro competências e revisão adaptativa.</p>
          <div class="tools"><button id="trainNow">TREINAR AGORA</button><button class="ghost" id="practice">PRATICAR CONTEÚDO ESPECÍFICO</button></div></div>
        <div class="card"><span class="eyebrow">BLOCO FUNDAMENTAL</span><span class="giant">${f.unique}/80</span><p>${pct(f.accuracy)} de precisão</p></div>
      </section>
      <div class="metrics">${['listening','speaking','reading','writing'].map(metricCard).join('')}<div class="card metric"><span>B2 Mastery</span><strong>${Math.round(mastery.ratio*100)}%</strong><small>${mastery.status}</small></div></div>
      <div class="section-title"><h3>Ferramentas</h3></div>
      <div class="action-grid">
        <button class="card action-card" id="sentencePractice">Construção de frases</button>
        <button class="card action-card" id="errors">Revisar meus erros</button>
        <button class="card action-card" id="contentAudit">Auditoria do conteúdo</button>
        <button class="card action-card" id="exportData">Exportar progresso</button>
      </div>
      <div id="auditPanel"></div>`;
    document.getElementById('logout').onclick=()=>{state=null;profile=null;profiles()};
    document.getElementById('trainNow').onclick=()=>start(H.Session.main(state));
    document.getElementById('practice').onclick=practiceMenu;
    document.getElementById('sentencePractice').onclick=()=>start(H.Session.practice(state,{topic:'Sentence Building',count:20}));
    document.getElementById('errors').onclick=()=>start(H.Session.practice(state,{errorsOnly:true,count:20}));
    document.getElementById('contentAudit').onclick=()=>showAudit(audit);
    document.getElementById('exportData').onclick=exportData;
  }
  function practiceMenu(){
    const stats=H.PracticeBank.stats;
    app().innerHTML=`<button class="ghost" id="back">← Voltar</button><section class="card"><span class="eyebrow">PRÁTICA DIRECIONADA</span><h2>Escolha o conteúdo</h2>
      <div class="practice-grid">${stats.map(s=>`<button class="practice-topic" data-topic="${H.Renderer.esc(s.topic)}">${H.Renderer.esc(s.topic)} <small>${s.count} itens</small></button>`).join('')}</div>
      <h3>Quantidade</h3><div class="tools"><button class="count" data-count="10">10</button><button class="count" data-count="20">20</button><button class="count" data-count="50">50</button><button class="count" data-count="infinite">Treino contínuo</button></div>
      <p class="muted">Selecione primeiro um tema e depois a quantidade.</p></section>`;
    let topic=null;
    document.getElementById('back').onclick=dashboard;
    document.querySelectorAll('.practice-topic').forEach(b=>b.onclick=()=>{
      topic=b.dataset.topic; document.querySelectorAll('.practice-topic').forEach(x=>x.classList.remove('selected')); b.classList.add('selected');
    });
    document.querySelectorAll('.count').forEach(b=>b.onclick=()=>{
      if(!topic) return alert('Escolha um conteúdo.');
      start(H.Session.practice(state,{topic,count:b.dataset.count}));
    });
  }
  function start(s){
    if(!s.items.length){alert('Ainda não há exercícios disponíveis para esse filtro.'); return;}
    session=s; state.activeSession={id:s.id,mode:s.mode}; showExercise();
  }
  function showExercise(){
    const ex=session.items[session.index];
    buildTokens=[]; startedAt=performance.now();
    app().innerHTML=`<section class="session"><div class="session-head"><span>${session.index+1}/${session.items.length}</span><button class="ghost" id="quit">Sair</button></div>
      ${H.Renderer.render(ex)}</section>`;
    document.getElementById('quit').onclick=dashboard;
    if(document.getElementById('playAudio')) document.getElementById('playAudio').onclick=()=>H.Renderer.speak(ex.audio);
    document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{
      document.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected')); b.classList.add('selected');
    });
    document.querySelectorAll('.token').forEach(b=>b.onclick=()=>{
      buildTokens.push(b.dataset.token); b.disabled=true; document.getElementById('buildAnswer').textContent=buildTokens.join(' ');
    });
    document.getElementById('submitAnswer').onclick=submit;
    document.getElementById('reportExercise').onclick=report;
  }
  function normalized(s){return String(s||'').toLowerCase().trim().replace(/[.,!?;:'"’]/g,'').replace(/\s+/g,' ')}
  async function submit(){
    const ex=session.items[session.index];
    let answer='';
    const selected=document.querySelector('.choice.selected');
    if(selected) answer=selected.dataset.answer;
    else if(ex.variant==='build') answer=buildTokens.join(' ');
    else answer=document.getElementById('freeAnswer')?.value||'';
    const elapsed=Math.round(performance.now()-startedAt);
    const objective=Boolean(ex.answer);
    let accuracy=.5;
    if(objective) accuracy=normalized(answer)===normalized(ex.answer)?1:0;
    const attempt={
      exerciseId:ex.id,targetId:ex.targetId||ex.id,skill:ex.skill,topic:ex.topic,grammarTopic:ex.grammarTopic,
      domain:ex.domain,level:ex.level,variant:ex.variant,accuracy,responseTime:elapsed,independence:1,
      at:new Date().toISOString(),isReview:state.attempts.some(a=>a.exerciseId===ex.id)
    };
    state.attempts.push(attempt);
    if(accuracy<.7) state.errors.push({exerciseId:ex.id,topic:ex.topic,domain:ex.domain,at:attempt.at});
    const fb=document.getElementById('feedback');
    fb.className='feedback '+(accuracy>=.7?'':'bad');
    fb.innerHTML=accuracy>=.7?'<b>Correto.</b>':`<b>Revisar.</b>${ex.answer?`<div>Resposta esperada: ${H.Renderer.esc(ex.answer)}</div>`:''}${ex.explanation?`<div class="muted">${H.Renderer.esc(ex.explanation)}</div>`:''}`;
    document.getElementById('submitAnswer').disabled=true;
    const next=document.createElement('button'); next.textContent=session.index+1<session.items.length?'Próximo':'Finalizar';
    next.onclick=nextExercise; fb.appendChild(next);
    await H.DB.saveProfile(state);
  }
  async function nextExercise(){
    session.index++;
    if(session.index<session.items.length) return showExercise();
    const ended={id:session.id,mode:session.mode,completedAt:new Date().toISOString(),count:session.items.length};
    if(session.mode==='practice') state.practiceSessions.push(ended); else state.sessions.push(ended);
    state.activeSession=null; state.stage=profile.role==='teacher'?5:Math.max(state.stage,H.Metrics.progress(state).stage);
    await H.DB.saveProfile(state); dashboard();
  }
  async function report(){
    const ex=session.items[session.index];
    const reason=prompt('Problema: resposta errada, frase estranha, áudio, tradução, alternativas ou outro?');
    if(!reason) return;
    state.reports.push({exerciseId:ex.id,reason,at:new Date().toISOString()});
    await H.DB.saveProfile(state); alert('Problema registrado para revisão.');
  }
  function showAudit(a){
    const bad=a.core.invalid.length+a.b2Extended.invalid.length+a.practice.invalid.length;
    document.getElementById('auditPanel').innerHTML=`<div class="card"><h3>Auditoria local</h3>
      <p>Core: ${a.core.total} · B2 Extended: ${a.b2Extended.total} · Prática: ${a.practice.total}</p>
      <p>${bad===0?'Nenhum erro estrutural detectado nos módulos novos.':bad+' inconsistências encontradas.'}</p>
      <details><summary>Banco de prática</summary><pre>${H.Renderer.esc(JSON.stringify(a.practiceStats,null,2))}</pre></details></div>`;
  }
  async function exportData(){
    const blob=new Blob([await H.DB.exportProfile(state)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`english-hub-${profile.id}-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  }
  function sw(){ if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(console.warn); }
  document.addEventListener('DOMContentLoaded',()=>{profiles();sw()});
})();