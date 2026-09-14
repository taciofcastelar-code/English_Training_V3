(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function choices(ex){
    if(!ex.choices?.length) return '';
    return `<div class="choice-list">${ex.choices.map(c=>`<button class="choice" data-answer="${esc(c)}">${esc(c)}</button>`).join('')}</div>`;
  }
  function build(ex){
    const t=[...(ex.tokens||[])].sort(()=>Math.random()-.5);
    return `<div class="token-bank">${t.map(x=>`<button class="token" data-token="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="build-answer" id="buildAnswer"></div>`;
  }
  function render(ex){
    if(!ex) return '<div class="card">Sem exercício disponível.</div>';
    const scenario=ex.scenario?`<div class="scenario">${esc(ex.scenario)}</div>`:'';
    const prompt=ex.prompt?`<div class="prompt">${esc(ex.prompt)}</div>`:'';
    const text=ex.text?`<div class="exercise-text">${esc(ex.text)}</div>`:'';
    const req=ex.requirements?.length?`<ul class="requirements">${ex.requirements.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
    const audio=ex.audio?`<button class="audio-btn" id="playAudio">Ouvir</button>`:'';
    let input='';
    if(ex.variant==='build') input=build(ex);
    else if(ex.choices?.length) input=choices(ex);
    else input=`<textarea id="freeAnswer" class="answer" placeholder="Digite sua resposta..."></textarea>`;
    return `<article class="card exercise-card">
      <div class="skill-tag">${esc(ex.skill||'practice')} · ${esc(ex.level||'')}</div>
      ${scenario}${prompt}${text}${req}${audio}${input}
      <div class="tools"><button id="submitAnswer">Responder</button><button class="ghost" id="reportExercise">Reportar problema</button></div>
      <div id="feedback"></div>
    </article>`;
  }
  function speak(text){
    if(!('speechSynthesis' in window)) return;
    const u=new SpeechSynthesisUtterance(text); u.lang='en-US'; speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
  H.Renderer={render,esc,speak};
})();