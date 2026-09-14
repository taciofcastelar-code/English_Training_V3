(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  const scenarios=[
    ['work','Your team disagrees about implementing a new system.','Explain your position, acknowledge the opposing view, and propose a compromise.'],
    ['daily','A friend wants to make a major life change but is uncertain.','Give a nuanced opinion, mention risks, and suggest a reasonable next step.'],
    ['travel','Your flight was canceled and the airline offers an inconvenient alternative.','Negotiate politely and propose an acceptable solution.'],
    ['health','A workplace wants to improve employee well-being.','Discuss causes, possible interventions, and likely outcomes.'],
    ['media','Two news reports describe the same event differently.','Compare the sources, identify possible bias, and state which is more convincing.'],
    ['education','A school is considering replacing some classroom lessons with online learning.','Present advantages, limitations, and a balanced conclusion.'],
    ['technology','A company wants to use AI for routine decisions.','Discuss benefits, risks, safeguards, and your final position.'],
    ['community','Your neighborhood is debating a new public project.','Summarize both sides and propose a compromise.']
  ];
  const list=[];
  let i=1;
  scenarios.forEach(([domain,scenario,prompt])=>{
    list.push({
      id:'B2X-S'+String(i).padStart(3,'0'),source:'b2-extended',level:'B2',stage:5,
      skill:'speaking',domain,topic:'B2 Extended',variant:'extended-speaking',
      scenario,prompt,requirements:['state a position','give reasons','acknowledge another perspective','conclude or propose a solution'],
      targetTime:60000
    });
    list.push({
      id:'B2X-W'+String(i).padStart(3,'0'),source:'b2-extended',level:'B2',stage:5,
      skill:'writing',domain,topic:'B2 Extended',variant:'extended-writing',
      scenario,prompt:'Write 100–180 words. '+prompt,
      requirements:['clear structure','appropriate connectors','nuanced language','conclusion'],
      targetTime:480000
    });
    i++;
  });

  const texts=[
    {
      title:'Remote work and productivity',
      text:'Remote work can increase flexibility and reduce commuting time, yet its impact on productivity varies. Some employees benefit from fewer interruptions, while others struggle with isolation or unclear boundaries. Effective remote policies therefore depend less on location itself and more on communication, expectations, autonomy, and the nature of the task.',
      q:'Which conclusion is best supported by the text?',
      choices:['Remote work is always more productive.','Productivity depends on several conditions, not only location.','Office work should be eliminated.','Commuting is the main cause of low productivity.'],
      answer:'Productivity depends on several conditions, not only location.'
    },
    {
      title:'Information and credibility',
      text:'A confident tone does not necessarily make a source reliable. Credibility should be judged by evidence, transparency, expertise, and whether claims can be independently verified. Readers should also distinguish between factual reporting, interpretation, and opinion before drawing conclusions.',
      q:'What is the main message?',
      choices:['Confident writers are usually correct.','All opinions are unreliable.','Credibility requires evaluation beyond tone.','Expertise is the only criterion that matters.'],
      answer:'Credibility requires evaluation beyond tone.'
    }
  ];
  texts.forEach((t,idx)=>{
    list.push({
      id:'B2X-R'+String(idx+1).padStart(3,'0'),source:'b2-extended',level:'B2',stage:5,
      skill:'reading',domain:'critical-reading',topic:'B2 Extended',variant:'long-reading',
      prompt:t.q,text:t.text,choices:t.choices,answer:t.answer,targetTime:90000
    });
    list.push({
      id:'B2X-L'+String(idx+1).padStart(3,'0'),source:'b2-extended',level:'B2',stage:5,
      skill:'listening',domain:'real-listening',topic:'B2 Extended',variant:'long-listening',
      prompt:t.q,audio:t.text,choices:t.choices,answer:t.answer,targetTime:90000
    });
  });
  H.B2Extended={exercises:list};
})();