window.FOUNDATION_BUILDERS = (() => {
  const seeds = [
    ['B001','greetings','Bom dia.','Good morning.',['morning','Good'],1],
    ['B002','greetings','Meu nome é Tacio.','My name is Tacio.',['Tacio','is','name','My'],1],
    ['B003','greetings','Eu sou do Brasil.','I am from Brazil.',['Brazil','from','am','I'],1],
    ['B004','greetings','Eu moro em Serra.','I live in Serra.',['Serra','in','live','I'],1],
    ['B005','greetings','Prazer em conhecer você.','Nice to meet you.',['you','meet','to','Nice'],1],
    ['B006','greetings','Como você está hoje?','How are you today?',['today','you','are','How'],1],
    ['B007','greetings','Estou bem, obrigado.','I am fine, thank you.',['you','thank','fine','am','I'],1],
    ['B008','greetings','Vejo você amanhã.','See you tomorrow.',['tomorrow','you','See'],1],
    ['B009','family','Eu tenho duas filhas.','I have two daughters.',['daughters','two','have','I'],1],
    ['B010','family','Eu sou casado.','I am married.',['married','am','I'],1],
    ['B011','family','Minha família mora perto.','My family lives nearby.',['nearby','lives','family','My'],1],
    ['B012','family','Ela é minha esposa.','She is my wife.',['wife','my','is','She'],1],
    ['B013','family','Ele é meu irmão.','He is my brother.',['brother','my','is','He'],1],
    ['B014','family','Nós jantamos juntos.','We have dinner together.',['together','dinner','have','We'],1],
    ['B015','family','Minhas filhas estão na escola.','My daughters are at school.',['school','at','are','daughters','My'],1],
    ['B016','family','Eu gosto de passar tempo com minha família.','I like spending time with my family.',['family','my','with','time','spending','like','I'],1],
    ['B017','home','Eu estou em casa.','I am at home.',['home','at','am','I'],1],
    ['B018','home','As chaves estão sobre a mesa.','The keys are on the table.',['table','the','on','are','keys','The'],1],
    ['B019','home','O banheiro fica ao lado do quarto.','The bathroom is next to the bedroom.',['bedroom','the','to','next','is','bathroom','The'],1],
    ['B020','home','Eu preciso limpar a cozinha.','I need to clean the kitchen.',['kitchen','the','clean','to','need','I'],1],
    ['B021','home','Por favor, feche a porta.','Please close the door.',['door','the','close','Please'],2],
    ['B022','home','As luzes estão apagadas.','The lights are off.',['off','are','lights','The'],2],
    ['B023','home','Há uma cadeira no quarto.','There is a chair in the room.',['room','the','in','chair','a','is','There'],2],
    ['B024','home','Eu geralmente relaxo na sala.','I usually relax in the living room.',['room','living','the','in','relax','usually','I'],2],
    ['B025','routine','Eu acordo às seis.','I wake up at six.',['six','at','up','wake','I'],2],
    ['B026','routine','Eu saio da cama.','I get out of bed.',['bed','of','out','get','I'],2],
    ['B027','routine','Eu tomo banho.','I take a shower.',['shower','a','take','I'],2],
    ['B028','routine','Eu escovo os dentes.','I brush my teeth.',['teeth','my','brush','I'],2],
    ['B029','routine','Eu tomo café da manhã.','I have breakfast.',['breakfast','have','I'],2],
    ['B030','routine','Eu saio de casa às sete.','I leave home at seven.',['seven','at','home','leave','I'],2],
    ['B031','routine','Eu vou ao trabalho de carro.','I go to work by car.',['car','by','work','to','go','I'],2],
    ['B032','routine','Eu volto para casa à noite.','I come home in the evening.',['evening','the','in','home','come','I'],2],
    ['B033','work','Eu trabalho como enfermeiro.','I work as a nurse.',['nurse','a','as','work','I'],2],
    ['B034','work','Eu começo a trabalhar às oito.','I start work at eight.',['eight','at','work','start','I'],2],
    ['B035','work','Eu verifico minha escala.','I check my schedule.',['schedule','my','check','I'],2],
    ['B036','work','Eu converso com meus colegas.','I talk to my coworkers.',['coworkers','my','to','talk','I'],2],
    ['B037','work','Eu faço uma pausa ao meio-dia.','I take a break at noon.',['noon','at','break','a','take','I'],2],
    ['B038','work','Eu estudo inglês todos os dias.','I study English every day.',['day','every','English','study','I'],2],
    ['B039','work','Eu preciso de mais tempo para estudar.','I need more time to study.',['study','to','time','more','need','I'],2],
    ['B040','work','Eu termino o trabalho às cinco.','I finish work at five.',['five','at','work','finish','I'],2],
    ['B041','time','Que horas são?','What time is it?',['it','is','time','What'],3],
    ['B042','time','São oito e meia.','It is half past eight.',['eight','past','half','is','It'],3],
    ['B043','time','Hoje é segunda-feira.','Today is Monday.',['Monday','is','Today'],3],
    ['B044','time','Minha consulta é amanhã.','My appointment is tomorrow.',['tomorrow','is','appointment','My'],3],
    ['B045','time','A reunião começa às nove.','The meeting starts at nine.',['nine','at','starts','meeting','The'],3],
    ['B046','time','Eu estou atrasado.','I am running late.',['late','running','am','I'],3],
    ['B047','time','Por favor, espere cinco minutos.','Please wait for five minutes.',['minutes','five','for','wait','Please'],3],
    ['B048','time','Eu ligarei para você esta tarde.','I will call you this afternoon.',['afternoon','this','you','call','will','I'],3],
    ['B049','food','Eu gostaria de um pouco de café.','I would like some coffee.',['coffee','some','like','would','I'],3],
    ['B050','food','Eu bebo água todos os dias.','I drink water every day.',['day','every','water','drink','I'],3],
    ['B051','food','Nós precisamos comprar pão.','We need to buy bread.',['bread','buy','to','need','We'],3],
    ['B052','food','Quanto isso custa?','How much does this cost?',['cost','this','does','much','How'],3],
    ['B053','food','Eu estou procurando uma camisa azul.','I am looking for a blue shirt.',['shirt','blue','a','for','looking','am','I'],3],
    ['B054','food','Posso pagar com cartão?','Can I pay by card?',['card','by','pay','I','Can'],3],
    ['B055','food','A comida está muito boa.','The food is very good.',['good','very','is','food','The'],3],
    ['B056','food','Eu geralmente preparo o jantar em casa.','I usually cook dinner at home.',['home','at','dinner','cook','usually','I'],3],
    ['B057','transport','Onde fica o ponto de ônibus?','Where is the bus stop?',['stop','bus','the','is','Where'],3],
    ['B058','transport','Eu estou indo para o trabalho.','I am going to work.',['work','to','going','am','I'],3],
    ['B059','transport','Vire à esquerda na esquina.','Turn left at the corner.',['corner','the','at','left','Turn'],3],
    ['B060','transport','Siga reto por dois quarteirões.','Go straight for two blocks.',['blocks','two','for','straight','Go'],3],
    ['B061','transport','O hospital fica perto daqui.','The hospital is near here.',['here','near','is','hospital','The'],4],
    ['B062','transport','Eu perdi o ônibus.','I missed the bus.',['bus','the','missed','I'],4],
    ['B063','transport','Eu preciso chamar um táxi.','I need to call a taxi.',['taxi','a','call','to','need','I'],4],
    ['B064','transport','Leva vinte minutos para chegar lá.','It takes twenty minutes to get there.',['there','get','to','minutes','twenty','takes','It'],4],
    ['B065','feelings','Eu estou cansado hoje.','I am tired today.',['today','tired','am','I'],4],
    ['B066','feelings','Ela está muito feliz.','She is very happy.',['happy','very','is','She'],4],
    ['B067','feelings','Eu me sinto um pouco preocupado.','I feel a little worried.',['worried','little','a','feel','I'],4],
    ['B068','feelings','Não se preocupe.','Do not worry.',['worry','not','Do'],4],
    ['B069','feelings','Você pode me ajudar?','Can you help me?',['me','help','you','Can'],4],
    ['B070','feelings','Você poderia repetir, por favor?','Could you repeat that, please?',['please','that','repeat','you','Could'],4],
    ['B071','feelings','Eu não entendo.','I do not understand.',['understand','not','do','I'],4],
    ['B072','feelings','Obrigado pela sua ajuda.','Thank you for your help.',['help','your','for','you','Thank'],4],
    ['B073','wellbeing','Eu me sinto melhor hoje.','I feel better today.',['today','better','feel','I'],4],
    ['B074','wellbeing','Eu estou com dor de cabeça.','I have a headache.',['headache','a','have','I'],4],
    ['B075','wellbeing','Eu preciso descansar.','I need to rest.',['rest','to','need','I'],4],
    ['B076','wellbeing','Eu tomo meu remédio pela manhã.','I take my medicine in the morning.',['morning','the','in','medicine','my','take','I'],4],
    ['B077','wellbeing','Eu caminho três vezes por semana.','I walk three times a week.',['week','a','times','three','walk','I'],4],
    ['B078','wellbeing','Eu estou tentando dormir melhor.','I am trying to sleep better.',['better','sleep','to','trying','am','I'],4],
    ['B079','wellbeing','Por favor, beba mais água.','Please drink more water.',['water','more','drink','Please'],4],
    ['B080','wellbeing','Eu tenho uma consulta médica hoje.','I have a doctor’s appointment today.',['today','appointment','doctor’s','a','have','I'],4]
  ];
  const complexity=seed=>seed[4].length+(/\b(would|could|usually|trying|there|will|does|takes)\b/i.test(seed[3])?1.5:0);
  const bandById={};
  [...new Set(seeds.map(seed=>seed[1]))].forEach(topic=>{
    seeds.filter(seed=>seed[1]===topic).sort((a,b)=>complexity(a)-complexity(b)).forEach((seed,index)=>{bandById[seed[0]]=Math.floor(index/2)+1});
  });
  const builders=seeds.map(([id,topic,translation,answer,tokens])=>{
    const band=bandById[id];
    return{
    id,skill:'writing',domain:topic,level:band<=2?'A1':'A2',stage:1,band,translation,
    audio:null,text:'Construa em inglês: “'+translation+'”',prompt:'Toque nas palavras na ordem correta.',
    choices:[],answer,keywords:tokens.filter(w=>w.length>2),tokens,
    targetId:id,variant:'build',targetTime:30000
    };
  });
  window.FOUNDATION_SUPPORT=builders.flatMap((builder,index)=>{
    const peers=builders.filter(item=>item.domain===builder.domain&&item.id!==builder.id);
    const choices=[builder.translation,peers[index%peers.length].translation,peers[(index+2)%peers.length].translation];
    const shift=index%3,rotated=[...choices.slice(shift),...choices.slice(0,shift)];
    const suffix=String(index+1).padStart(3,'0');
    const shared={domain:builder.domain,level:builder.level,band:builder.band,targetId:builder.id};
    const gap=builder.answer.split(/\s+/).map(word=>word.replace(/[^A-Za-z’']/g,'')).find(word=>word.length>3)||builder.answer.split(/\s+/)[0];
    const peerGaps=peers.map(item=>item.answer.split(/\s+/).map(word=>word.replace(/[^A-Za-z’']/g,'')).find(word=>word.length>3)||item.answer.split(/\s+/)[0]);
    const rawCloze=[gap,...peerGaps.filter(word=>word.toLowerCase()!==gap.toLowerCase()),'today','please','usually'];
    const clozeBase=[...new Set(rawCloze)].slice(0,3),clozeChoices=[...clozeBase.slice(shift),...clozeBase.slice(0,shift)];
    return[
      {...shared,id:'FL'+suffix,skill:'listening',stage:1,audio:builder.answer,text:null,prompt:'Qual frase você ouviu?',choices:rotated,answer:builder.translation,keywords:[],tokens:[],variant:'listening',targetTime:20000},
      {...shared,id:'FR'+suffix,skill:'reading',stage:1,audio:null,text:builder.answer,prompt:'O que essa frase significa?',choices:rotated,answer:builder.translation,keywords:[],tokens:[],variant:'reading',targetTime:20000},
      {...shared,id:'FC'+suffix,skill:'reading',stage:1,audio:null,text:builder.answer.replace(gap,'_____'),prompt:'Complete a frase com a palavra correta.',choices:clozeChoices,answer:gap,keywords:[gap],tokens:[],variant:'cloze',targetTime:16000},
      {...shared,id:'FS'+suffix,skill:'speaking',stage:2,audio:builder.answer,text:null,prompt:'Ouça o modelo e repita em inglês: “'+builder.translation+'”',choices:[],answer:builder.answer,keywords:builder.keywords,tokens:[],variant:'guided-speaking',targetTime:25000},
      {...shared,id:'FW'+suffix,skill:'writing',stage:2,audio:null,text:'Escreva em inglês: “'+builder.translation+'”',prompt:null,choices:[],answer:builder.answer,keywords:builder.keywords,tokens:[],variant:'independent-writing',targetTime:35000},
      {...shared,id:'FQ'+suffix,skill:'speaking',stage:3,audio:null,text:null,prompt:'Responda rapidamente em inglês: “'+builder.translation+'”',choices:[],answer:builder.answer,keywords:builder.keywords,tokens:[],variant:'rapid-response',targetTime:15000}
    ];
  });
  return builders;
})();
