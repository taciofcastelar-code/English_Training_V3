(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  const allowedSkills=new Set(['listening','speaking','reading','writing','grammar','vocabulary','pronunciation','sentence-building']);
  function validateExercise(ex){
    const errors=[];
    if(!ex||typeof ex!=='object') return ['Exercício inválido'];
    if(!ex.id) errors.push('id ausente');
    if(!ex.skill) errors.push('skill ausente');
    if(ex.skill&&!allowedSkills.has(ex.skill)) errors.push('skill desconhecida: '+ex.skill);
    if(!ex.answer&&ex.variant!=='extended-speaking'&&ex.variant!=='extended-writing') errors.push('answer ausente');
    if(ex.variant==='cloze' && !String(ex.text||'').includes('_____')) errors.push('cloze sem lacuna');
    if(Array.isArray(ex.choices)&&ex.choices.length && ex.answer && !ex.choices.includes(ex.answer)) errors.push('resposta não está nas alternativas');
    if(ex.choices && !Array.isArray(ex.choices)) errors.push('choices não é array');
    return errors;
  }
  function audit(list){
    const seen=new Set(), duplicateIds=[], invalid=[];
    (list||[]).forEach(ex=>{
      if(seen.has(ex.id)) duplicateIds.push(ex.id); else seen.add(ex.id);
      const issues=validateExercise(ex);
      if(issues.length) invalid.push({id:ex.id||'(sem id)',issues});
    });
    return {total:(list||[]).length,duplicates:[...new Set(duplicateIds)],invalid};
  }
  H.Validators={validateExercise,audit};
})();