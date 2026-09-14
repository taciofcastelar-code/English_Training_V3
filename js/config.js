(() => {
  'use strict';
  const H = window.EnglishHub = window.EnglishHub || {};
  H.Config = Object.freeze({
    version: '3.1.0-rebuild',
    dbName: 'english-hub-v3',
    dbVersion: 2,
    stateStore: 'state',
    sessionSize: 10,
    profiles: [
      {id:'tacio',name:'Tacio',role:'student'},
      {id:'marlene',name:'Marlene',role:'student'},
      {id:'anny',name:'Anny',role:'student'},
      {id:'teste-1',name:'Teste 1',role:'student'},
      {id:'teste-2',name:'Teste 2',role:'student'},
      {id:'professora',name:'Professora',role:'teacher'}
    ],
    stages: [
      {id:1,name:'Bloco Fundamental',hint:'80 construtores essenciais antes do desbloqueio amplo da fala'},
      {id:2,name:'A1 · Destravar a fala',hint:'Construção de frases, respostas curtas e fala guiada'},
      {id:3,name:'A2 · Comunicação cotidiana',hint:'Quatro competências em situações reais'},
      {id:4,name:'B1 · Fluência funcional',hint:'Narrativas, opinião, vida e trabalho'},
      {id:5,name:'B2 · Independência',hint:'Nuance, argumentação, negociação e produção estendida'}
    ],
    foundationGate: {unique:80, accuracy:.70, sessions:10},
    masteryThresholds: {
      listening:.75, speaking:.70, reading:.80, writing:.70,
      automaticity:.65, retention7:.70, retention21:.65
    },
    reviewIntervalsDays: [1,7,21],
    skillLabels: {
      listening:'Listening', speaking:'Speaking', reading:'Reading', writing:'Writing'
    }
  });
})();