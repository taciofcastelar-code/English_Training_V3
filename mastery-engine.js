(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  function b2(state){
    const T=H.Config.masteryThresholds;
    const s={};
    ['listening','speaking','reading','writing'].forEach(k=>s[k]=H.Metrics.skill(state,k));
    const automaticity=(s.listening.automaticity+s.speaking.automaticity+s.reading.automaticity+s.writing.automaticity)/4;
    const retention7=H.Metrics.retention(state,7), retention21=H.Metrics.retention(state,21);
    const pass={
      listening:s.listening.mastery>=T.listening,
      speaking:s.speaking.mastery>=T.speaking,
      reading:s.reading.mastery>=T.reading,
      writing:s.writing.mastery>=T.writing,
      automaticity:automaticity>=T.automaticity,
      retention7:retention7>=T.retention7,
      retention21:retention21>=T.retention21
    };
    const ratio=Object.values(pass).filter(Boolean).length/Object.keys(pass).length;
    const status=ratio===1?'consolidado':ratio>=.75?'funcional':ratio>=.4?'em desenvolvimento':'iniciado';
    return {status,ratio,pass,skills:s,automaticity,retention7,retention21};
  }
  H.Mastery={b2};
})();