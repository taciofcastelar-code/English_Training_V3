(() => {
  'use strict';
  const H=window.EnglishHub=window.EnglishHub||{};
  // window.EXERCISES is produced by the original content.js and already includes
  // Foundation + Curriculum + the existing special clinical/interview/offshore bank.
  const existing = [].concat(window.EXERCISES||[]);
  const practice=(H.PracticeBank&&H.PracticeBank.exercises)||[];
  const b2=(H.B2Extended&&H.B2Extended.exercises)||[];
  H.Content={
    core: existing,
    practice,
    b2Extended:b2,
    all: existing.concat(b2),
    audit(){
      return {
        core:H.Validators.audit(existing),
        b2Extended:H.Validators.audit(b2),
        practice:H.Validators.audit(practice),
        practiceStats:H.PracticeBank?.stats||[]
      };
    }
  };
})();