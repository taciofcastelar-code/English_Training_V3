(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  const bank=[]; let seq=1;
  const id=p=>'P'+p+String(seq++).padStart(5,'0');
  const add=(topic,level,prompt,choices,answer,explanation,subtopic='general',extra={})=>{
    bank.push({id:id('Q'),source:'practice',mode:'specific-practice',skill:'grammar',
      topic,grammarTopic:topic,subtopic,level,stage:1,variant:'multiple-choice',
      prompt,text:null,choices:[...new Set(choices)],answer,explanation,targetTime:18000,...extra});
  };
  const addBuild=(level,topic,tokens,answer,subtopic='word-order')=>{
    bank.push({id:id('B'),source:'practice',mode:'specific-practice',skill:'sentence-building',
      topic:'Sentence Building',grammarTopic:topic,subtopic,level,stage:1,variant:'build',
      prompt:'Organize as palavras para formar uma frase correta.',tokens,choices:[],answer,targetTime:22000});
  };

  // ---------- SIMPLE PRESENT ----------
  const presentSubjects=[
    ['I','base','do','do not'],['You','base','do','do not'],['We','base','do','do not'],['They','base','do','do not'],
    ['He','third','does','does not'],['She','third','does','does not'],['My brother','third','does','does not'],
    ['My sister','third','does','does not'],['The nurse','third','does','does not'],['Our teacher','third','does','does not']
  ];
  const presentVerbs=[
    ['work','works'],['study','studies'],['live','lives'],['need','needs'],['like','likes'],['practice','practices'],
    ['start','starts'],['finish','finishes'],['drive','drives'],['cook','cooks'],['read','reads'],['exercise','exercises'],
    ['watch','watches'],['go','goes'],['have','has']
  ];
  const presentContexts=['every day','in the morning','after work','on weekdays','at home','with the team','before lunch','on weekends','every evening','twice a week'];
  presentSubjects.forEach(([s,form,aux,neg])=>presentVerbs.forEach(([base,third])=>{
    const v=form==='third'?third:base;
    presentContexts.slice(0,5).forEach(ctx=>{
      add('Simple Present','A1',`${s} ___ ${ctx}.`,[v,base,third,'worked'],v,'Hábitos e rotinas usam Simple Present.','affirmative');
      add('Simple Present','A1',`${aux[0].toUpperCase()+aux.slice(1)} ${s.toLowerCase()} ___ ${ctx}?`,[base,third,'worked','working'],base,'Depois de do/does, use o verbo na forma base.','questions');
      add('Simple Present','A1',`${s} ${neg} ___ ${ctx}.`,[base,third,'worked','working'],base,'Depois de do not/does not, use o verbo base.','negative');
    });
  }));

  // ---------- PRESENT CONTINUOUS ----------
  const beSubjects=[['I','am'],['You','are'],['He','is'],['She','is'],['We','are'],['They','are']];
  const ingActions=['working','studying','waiting','driving','cooking','reading','speaking','writing','walking','listening','cleaning','shopping','talking','resting','preparing'];
  const nowContexts=['now','right now','at the moment','today'];
  beSubjects.forEach(([s,be])=>ingActions.forEach(ing=>nowContexts.forEach(ctx=>{
    add('Present Continuous','A1',`${s} ___ ${ing} ${ctx}.`,[be,'do','have','will'],be,'Present Continuous = am/is/are + verbo-ing.','form');
  })));

  // ---------- SIMPLE PAST ----------
  const pastVerbs=[['go','went'],['see','saw'],['eat','ate'],['take','took'],['call','called'],['finish','finished'],['arrive','arrived'],['study','studied'],['work','worked'],['buy','bought'],['make','made'],['leave','left'],['meet','met'],['write','wrote'],['drive','drove']];
  const pastCtx=['yesterday','last night','last weekend','two days ago','last Monday','after work','this morning','last month'];
  pastVerbs.forEach(([base,past])=>pastCtx.forEach(ctx=>{
    add('Simple Past','A2',`I ___ ${ctx}.`,[past,base,'have '+past,'am '+base],past,'Tempo passado definido pede Simple Past.','affirmative');
    add('Simple Past','A2',`Did you ___ ${ctx}?`,[base,past,'gone','going'],base,'Depois de did, use o verbo base.','questions');
    add('Simple Past','A2',`I did not ___ ${ctx}.`,[base,past,'going','have '+past],base,'Depois de did not, use o verbo base.','negative');
  }));

  // ---------- PAST CONTINUOUS ----------
  const pastBe=[['I','was'],['He','was'],['She','was'],['You','were'],['We','were'],['They','were']];
  pastBe.forEach(([s,be])=>ingActions.slice(0,10).forEach(ing=>{
    add('Past Continuous','A2',`${s} ___ ${ing} when the phone rang.`,[be,'am','did','have'],be,'Past Continuous = was/were + verbo-ing.','form');
  }));

  // ---------- PRESENT PERFECT ----------
  const ppVerbs=[['finish','finished'],['see','seen'],['go','gone'],['eat','eaten'],['write','written'],['take','taken'],['do','done'],['make','made'],['visit','visited'],['start','started'],['read','read'],['speak','spoken']];
  const ppObjects=['this task','that movie','the report','this place','the course','the book'];
  ppVerbs.forEach(([base,pp])=>ppObjects.slice(0,4).forEach(obj=>{
    add('Present Perfect','B1',`I have ___ ${obj} already.`,[pp,base,base+'ing','did '+base],pp,'Present Perfect usa have/has + particípio passado.','form');
    add('Present Perfect','B1',`Have you ever ___ ${obj}?`,[pp,base,'did '+base,base+'ing'],pp,'Experiências sem tempo definido usam Present Perfect.','experience');
  }));

  // ---------- PRESENT PERFECT CONTINUOUS ----------
  ['working','studying','waiting','living','practicing','learning','reading','training'].forEach(ing=>{
    ['for two hours','since morning','for three months','since 2025'].forEach(time=>{
      add('Present Perfect Continuous','B1',`I have been ___ ${time}.`,[ing,ing.replace('ing','ed'),'to '+ing,'have '+ing],ing,'Ação contínua iniciada no passado e ainda relevante: have/has been + -ing.','duration');
    });
  });

  // ---------- PAST PERFECT ----------
  ppVerbs.slice(0,10).forEach(([base,pp])=>{
    add('Past Perfect','B1',`By the time I arrived, they had ___ the task.`,[pp,base,base+'ing','did '+base],pp,'Past Perfect = had + particípio para ação anterior a outra ação passada.','sequence');
  });

  // ---------- FUTURE FORMS ----------
  const futureActions=['call you','finish the report','travel','study tonight','help the team','arrive early','cook dinner','take the course','visit my family','check the schedule'];
  futureActions.forEach(a=>{
    add('Future Forms','A2',`I think I ___ ${a}.`,['will '+a,a,'did '+a,'have '+a],'will '+a,'Will é comum para previsões/decisões espontâneas.','will');
    add('Future Forms','A2',`I have already planned it. I ___ ${a}.`,['am going to '+a,'will '+a,'did '+a,'have '+a],'am going to '+a,'Going to expressa intenção/plano.','going-to');
  });
  ['working','traveling','studying','waiting','driving','sleeping','meeting the team','having lunch'].forEach(a=>{
    add('Future Forms','B1',`This time tomorrow, I ___ ${a}.`,['will be '+a,'will have '+a,'am '+a,'did '+a],'will be '+a,'Future Continuous = will be + -ing.','future-continuous');
  });
  ppVerbs.slice(0,8).forEach(([base,pp])=>{
    add('Future Forms','B1',`By Friday, I will have ___ the task.`,[pp,base,base+'ing','did '+base],pp,'Future Perfect = will have + particípio.','future-perfect');
  });

  // ---------- TENSE CONTRAST ----------
  const contrasts=[
    ['I ___ here since 2024.','have worked',['worked','work','am working'],'Present Perfect'],
    ['I ___ him yesterday.','saw',['have seen','see','am seeing'],'Simple Past'],
    ['Look! She ___ now.','is running',['runs','ran','has run'],'Present Continuous'],
    ['She usually ___ at seven.','starts',['is starting','started','has started'],'Simple Present'],
    ['When I called, they ___.','were eating',['ate','have eaten','eat'],'Past Continuous'],
    ['By the time we arrived, the meeting ___.','had started',['started','has started','starts'],'Past Perfect']
  ];
  for(let r=0;r<30;r++) contrasts.forEach(([p,a,d,t])=>add('Tense Contrast',t==='Past Perfect'?'B1':'A2',p,[a,...d],a,'Compare o marcador temporal e o significado antes de escolher o tempo verbal.',t));

  // ---------- PREPOSITIONS ----------
  const preps=[
    ['Monday','on'],['Tuesday','on'],['September','in'],['2026','in'],['8 o’clock','at'],['noon','at'],
    ['the morning','in'],['the afternoon','in'],['the evening','in'],['night','at'],['the weekend','on'],
    ['the table','on'],['the room','in'],['the hospital','at'],['home','at'],['the bus','on'],['the car','in'],
    ['the wall','on'],['the office','in'],['the door','at']
  ];
  for(let r=0;r<5;r++) preps.forEach(([obj,a])=>add('Prepositions','A1',`Choose the correct preposition for “${obj}”:`,['in','on','at','to'],a,'Treino de preposições de tempo/lugar.','time-place'));

  // ---------- CONNECTORS ----------
  const connectors=[
    ['I was tired, ___ I finished the task.','but','contrast'],['I stayed home ___ it was raining.','because','cause'],
    ['He studied hard; ___, he passed.','therefore','result'],['___ it was late, we continued.','Although','concession'],
    ['This option is cheaper, ___ the other is faster.','whereas','contrast'],
    ['She prepared carefully. ___, the meeting was canceled.','However','contrast'],
    ['We left early ___ avoid traffic.','to','purpose'],['He was tired, ___ he went to bed.','so','result']
  ];
  for(let r=0;r<12;r++) connectors.forEach(([p,a,sub])=>add('Connectors',a==='whereas'||a==='However'?'B2':'A2',p,[a,'because','and','so'],a,'O conector precisa refletir a relação lógica entre as ideias.',sub));

  // ---------- MODALS ----------
  const modals=[
    ['You ___ wear a seat belt.','must','obligation'],['You ___ drink more water.','should','advice'],
    ['___ you help me, please?','Could','request'],['It ___ rain later.','might','possibility'],
    ['I ___ swim when I was five.','could','past-ability'],['You ___ smoke here.','must not','prohibition'],
    ['We ___ leave now if we want to arrive on time.','should','advice'],['She ___ be at work; her car is outside.','must','deduction']
  ];
  for(let r=0;r<12;r++) modals.forEach(([p,a,sub])=>add('Modal Verbs',sub==='deduction'?'B2':'A2',p,[a,'did','has','is'],a,'Escolha o modal pela função comunicativa.',sub));

  // ---------- CONDITIONALS ----------
  const conditionals=[
    ['If you heat ice, it ___.','melts','zero','A2'],['If it rains, I ___ home.','will stay','first','A2'],
    ['If I had more time, I ___ more.','would study','second','B1'],['If I had known, I ___ you.','would have called','third','B1'],
    ['If I had studied medicine, I ___ a doctor now.','would be','mixed','B2']
  ];
  for(let r=0;r<20;r++) conditionals.forEach(([p,a,sub,l])=>add('Conditionals',l,p,[a,'will','did','have'],a,'Identifique a relação temporal do condicional.',sub));

  // ---------- SENTENCE BUILDING ----------
  const sbSubjects=['I','You','We','They','He','She','My brother','The teacher'];
  const sbVerbs=presentVerbs.slice(0,12);
  const sbEnds=presentContexts;
  sbSubjects.forEach(s=>sbVerbs.forEach(([base,third])=>sbEnds.forEach(end=>{
    const thirdPerson=['He','She','My brother','The teacher'].includes(s);
    const verb=thirdPerson?third:base;
    addBuild('A1','Simple Present',[end,verb,s],`${s} ${verb} ${end}.`,'affirmative');
  })));
  pastVerbs.slice(0,12).forEach(([base,past])=>pastCtx.forEach(ctx=>{
    addBuild('A2','Simple Past',[ctx,past,'I'],`I ${past} ${ctx}.`,'past');
  }));
  ingActions.slice(0,12).forEach(ing=>{
    addBuild('A1','Present Continuous',['now',ing,'am','I'],`I am ${ing} now.`,'continuous');
  });

  const wrongSentences=[
    ['He go to work every day.','He goes to work every day.','Simple Present'],
    ["She don't like coffee.","She doesn't like coffee.",'Simple Present'],
    ['Did you went yesterday?','Did you go yesterday?','Simple Past'],
    ['I am work now.','I am working now.','Present Continuous'],
    ['I have saw this movie.','I have seen this movie.','Present Perfect'],
    ['I arrived in Monday.','I arrived on Monday.','Prepositions'],
    ['If I will have time, I will call you.','If I have time, I will call you.','Conditionals'],
    ['She has went home.','She has gone home.','Present Perfect'],
    ['He were studying.','He was studying.','Past Continuous'],
    ['I will to call you.','I will call you.','Future Forms']
  ];
  for(let r=0;r<12;r++) wrongSentences.forEach(([wrong,correct,topic])=>{
    bank.push({id:id('C'),source:'practice',mode:'specific-practice',skill:'sentence-building',
      topic:'Sentence Building',grammarTopic:topic,subtopic:'correction',level:'A2',stage:1,variant:'writing',
      prompt:'Corrija a frase:',text:wrong,choices:[],answer:correct,
      keywords:correct.replace(/[.]/g,'').toLowerCase().split(/\s+/),targetTime:30000});
  });

  // ---------- VOCABULARY / PHRASAL / COLLOCATIONS ----------
  const vocab=[
    ['appointment','consulta/compromisso'],['groceries','mantimentos'],['commute','deslocamento'],['schedule','horário/agenda'],
    ['improve','melhorar'],['available','disponível'],['reliable','confiável'],['decision','decisão'],['environment','ambiente'],
    ['although','embora'],['instead','em vez disso'],['likely','provável'],['issue','questão/problema'],['support','apoio/ajudar'],
    ['manage','gerenciar/conseguir'],['avoid','evitar'],['require','exigir'],['provide','fornecer'],['increase','aumentar'],['reduce','reduzir']
  ];
  for(let r=0;r<8;r++) vocab.forEach(([en,pt])=>add('Vocabulary','A2',`Qual é o melhor significado de “${en}”?`,[pt,'sempre','longe','começar'],pt,'Vocabulário cotidiano e funcional.','general'));

  const phrasal=[
    ['wake up','acordar'],['find out','descobrir'],['look for','procurar'],['give up','desistir'],['carry on','continuar'],
    ['set up','configurar/preparar'],['pick up','buscar/pegar'],['turn down','recusar/diminuir'],['look after','cuidar de'],
    ['work out','resolver/funcionar/exercitar-se'],['run out of','ficar sem'],['deal with','lidar com']
  ];
  for(let r=0;r<10;r++) phrasal.forEach(([p,a])=>add('Phrasal Verbs','B1',`“${p}” significa principalmente:`,[a,'esquecer','emprestar','atrasar'],a,'Treino de phrasal verbs frequentes.','general'));

  const collocations=[
    ['make a decision','tomar uma decisão'],['take a break','fazer uma pausa'],['have breakfast','tomar café da manhã'],
    ['do homework','fazer tarefa'],['pay attention','prestar atenção'],['make progress','progredir'],['take responsibility','assumir responsabilidade'],
    ['make an appointment','marcar uma consulta'],['have a conversation','ter uma conversa'],['take notes','fazer anotações']
  ];
  for(let r=0;r<10;r++) collocations.forEach(([p,a])=>add('Collocations','A2',`Qual é a tradução natural de “${p}”?`,[a,'errar','voltar','descansar'],a,'Treino de combinações naturais de palavras.','general'));

  const topics=[...new Set(bank.map(x=>x.topic))];
  const stats=topics.map(topic=>({topic,count:bank.filter(x=>x.topic===topic).length}));
  H.PracticeBank={exercises:bank,topics,stats};
})();