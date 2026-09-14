(() => {
  'use strict';
  const units=[...(window.CURRICULUM_UNITS_A||[]),...(window.CURRICULUM_UNITS_B||[])];
  const stageByLevel={A1:2,A2:3,B1:4,B2:5};
  const replaceSlots=(template,values)=>values.reduce((text,value)=>text.replace('{}',value),template);
  const normalizeWord=value=>String(value).replace(/[^A-Za-z’']/g,'');
  const keyWords=answer=>answer.split(/\s+/).map(normalizeWord).filter(word=>word.length>3).slice(0,4);
  const shuffled=(items,seed)=>{const result=[...items];let value=seed*9301+49297;for(let index=result.length-1;index>0;index--){value=(value*233280+49297)%1000003;const other=value%(index+1);[result[index],result[other]]=[result[other],result[index]]}return result};

  let sequence=81;
  const targets=units.flatMap(unit=>unit.patterns.flatMap((pattern,patternIndex)=>{
    const [english,portuguese,slots]=pattern,enCount=(english.match(/\{\}/g)||[]).length,ptCount=(portuguese.match(/\{\}/g)||[]).length;
    if(enCount!==ptCount||enCount<1)throw new Error(`Modelo inválido em ${unit.id}: ${english}`);
    if(slots.length!==enCount*4)throw new Error(`Cada modelo deve gerar quatro estruturas em ${unit.id}: ${english}`);
    return Array.from({length:4},(_,variationIndex)=>{
      const values=slots.slice(variationIndex*enCount,(variationIndex+1)*enCount),answer=replaceSlots(english,values.map(pair=>pair[0])),translation=replaceSlots(portuguese,values.map(pair=>pair[1]));
      const id=`C${String(sequence++).padStart(3,'0')}`;
      return{id,sequence:Number(id.slice(1)),unitId:unit.id,unitTitle:unit.title,level:unit.level,stage:stageByLevel[unit.level],domain:unit.domain,grammar:unit.grammar,goal:unit.goal,answer,translation,keywords:keyWords(answer),patternIndex:patternIndex+1};
    });
  }));

  const gapFor=target=>target.keywords[0]||normalizeWord(target.answer.split(/\s+/)[0]);
  const choiceTranslations=(target,index)=>{
    const peers=targets.filter(item=>item.unitId===target.unitId&&item.id!==target.id),choices=[target.translation,peers[index%peers.length].translation,peers[(index+5)%peers.length].translation],shift=index%3;
    return[...choices.slice(shift),...choices.slice(0,shift)];
  };
  const clozeChoices=(target,index)=>{
    const local=targets.filter(item=>item.unitId===target.unitId&&item.id!==target.id),all=[...local,...targets.filter(item=>item.unitId!==target.unitId)];
    const choices=[...new Set([gapFor(target),...all.map(gapFor)])].slice(0,3),shift=index%3;
    return[...choices.slice(shift),...choices.slice(0,shift)];
  };
  const exercises=targets.flatMap((target,index)=>{
    const shared={targetId:target.id,unitId:target.unitId,unitTitle:target.unitTitle,level:target.level,stage:target.stage,domain:target.domain,grammar:target.grammar,goal:target.goal,translation:target.translation};
    const tokens=shuffled(target.answer.split(/\s+/),target.sequence),gap=gapFor(target),cloze=target.answer.replace(gap,'_____');
    return[
      {...shared,id:`CB${target.id.slice(1)}`,skill:'writing',audio:null,text:`Construa em inglês: “${target.translation}”`,prompt:'Toque nas palavras na ordem correta.',choices:[],answer:target.answer,keywords:target.keywords,tokens,variant:'build',targetTime:35000},
      {...shared,id:`CL${target.id.slice(1)}`,skill:'listening',audio:target.answer,text:null,prompt:'Qual frase você ouviu?',choices:choiceTranslations(target,index),answer:target.translation,keywords:[],tokens:[],variant:'listening',targetTime:22000},
      {...shared,id:`CR${target.id.slice(1)}`,skill:'reading',audio:null,text:target.answer,prompt:'O que essa frase significa?',choices:choiceTranslations(target,index+1),answer:target.translation,keywords:[],tokens:[],variant:'reading',targetTime:22000},
      {...shared,id:`CC${target.id.slice(1)}`,skill:'reading',audio:null,text:cloze,prompt:`Complete a frase: ${cloze}`,choices:clozeChoices(target,index),answer:gap,keywords:[gap],tokens:[],variant:'cloze',targetTime:18000},
      {...shared,id:`CS${target.id.slice(1)}`,skill:'speaking',audio:target.answer,text:null,prompt:`Ouça e repita em inglês: “${target.translation}”`,choices:[],answer:target.answer,keywords:target.keywords,tokens:[],variant:'guided-speaking',targetTime:28000},
      {...shared,id:`CW${target.id.slice(1)}`,skill:'writing',audio:null,text:`Escreva em inglês: “${target.translation}”`,prompt:null,choices:[],answer:target.answer,keywords:target.keywords,tokens:[],variant:'independent-writing',targetTime:40000},
      {...shared,id:`CQ${target.id.slice(1)}`,skill:'speaking',audio:null,text:null,prompt:`Responda sem traduzir: “${target.translation}”`,choices:[],answer:target.answer,keywords:target.keywords,tokens:[],variant:'rapid-response',targetTime:20000}
    ];
  });

  window.CURRICULUM_MATRIX={
    version:'1.0.0',totalBaseStructures:680,totalGeneratedActivities:4760,
    distribution:{foundation:80,A1:100,A2:180,B1:160,B2:160},
    units:units.map(unit=>({id:unit.id,level:unit.level,title:unit.title,domain:unit.domain,grammar:unit.grammar,goal:unit.goal,structures:20}))
  };
  window.CURRICULUM_TARGETS=targets;
  window.CURRICULUM_EXERCISES=exercises;
})();
