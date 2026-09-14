const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

global.window={};
for(const file of ['foundation.js','curriculum-a.js','curriculum-b.js','curriculum.js','content.js'])require(`../js/${file}`);

const exercises=window.EXERCISES,builders=window.FOUNDATION_BUILDERS,support=window.FOUNDATION_SUPPORT;
const targets=window.CURRICULUM_TARGETS,generated=window.CURRICULUM_EXERCISES,matrix=window.CURRICULUM_MATRIX;
const normalize=value=>String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const words=value=>normalize(value).split(' ').filter(Boolean).sort();
const countBy=(items,key)=>items.reduce((out,item)=>{out[item[key]]=(out[item[key]]||0)+1;return out},{});

assert.equal(builders.length,80,'Os 80 construtores originais devem permanecer');
assert.equal(targets.length,600,'A expansão deve adicionar 600 estruturas-base');
assert.equal(matrix.totalBaseStructures,680,'A matriz deve totalizar 680 estruturas-base');
assert.equal(generated.length,4200,'As 600 novas estruturas devem gerar sete variações cada');
assert.equal(builders.length+support.length+generated.length,4760,'O currículo deve ter 4.760 atividades');
assert.equal(exercises.length,4824,'O banco total deve incluir as 64 atividades profissionais anteriores');
assert.equal(new Set(exercises.map(ex=>ex.id)).size,exercises.length,'Todos os IDs devem ser únicos');
assert.deepEqual(matrix.distribution,{foundation:80,A1:100,A2:180,B1:160,B2:160});
assert.deepEqual(countBy(targets,'level'),{A1:100,A2:180,B1:160,B2:160});
assert.equal(matrix.units.length,30,'A matriz deve ter 30 unidades após o bloco fundamental');
assert.ok(matrix.units.every(unit=>unit.structures===20),'Cada unidade deve conter 20 estruturas');

assert.deepEqual(countBy(builders,'band'),{1:20,2:20,3:20,4:20});
assert.deepEqual(countBy(builders,'domain'),{greetings:8,family:8,home:8,routine:8,work:8,time:8,food:8,transport:8,feelings:8,wellbeing:8});
assert.equal(exercises.filter(ex=>ex.stage===1&&ex.skill==='speaking').length,0,'O primeiro bloco não pode exigir fala');
assert.ok(exercises.filter(ex=>ex.stage===2&&ex.skill==='speaking').length>=100,'A fala guiada deve começar após o bloco fundamental');

for(const ex of builders){
  assert.ok(ex.answer&&ex.tokens.length,`Construtor incompleto: ${ex.id}`);
  assert.deepEqual(words(ex.tokens.join(' ')),words(ex.answer),`Banco de palavras incompatível: ${ex.id}`);
}
for(const ex of exercises.filter(item=>item.choices?.length)){
  assert.equal(new Set(ex.choices).size,3,`Alternativas inválidas: ${ex.id}`);
  assert.ok(ex.choices.includes(ex.answer),`Resposta ausente das alternativas: ${ex.id}`);
}
for(const target of targets){
  const variants=generated.filter(ex=>ex.targetId===target.id);
  assert.equal(variants.length,7,`A estrutura ${target.id} deve ter sete variações`);
  assert.deepEqual(new Set(variants.map(ex=>ex.variant)),new Set(['build','listening','reading','cloze','guided-speaking','independent-writing','rapid-response']));
}

const app=fs.readFileSync(path.join(__dirname,'../js/app.js'),'utf8');
const sw=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');
assert.match(app,/id:'professora'.*role:'teacher'/s,'Deve existir perfil de avaliadora');
assert.doesNotMatch(app,/pin:'\d+'/i,'Um site público não deve embutir PINs');
assert.match(app,/contentReviews/,'As avaliações pedagógicas devem ser persistidas');
assert.match(app,/EXPORTAR RELATÓRIO JSON/,'O piloto deve exportar relatório');
assert.match(app,/retention\(21\)/,'O motor deve acompanhar retenção D21');
assert.match(app,/usedTargets/,'A fila deve evitar repetir a mesma estrutura na sessão');
assert.match(app,/targetTime=ex\.targetTime/,'O tempo-alvo deve variar por atividade');
assert.match(sw,/curriculum-a\.js/);assert.match(sw,/curriculum-b\.js/);assert.match(sw,/curriculum\.js/);

console.log(JSON.stringify({
  baseStructures:matrix.totalBaseStructures,
  curriculumActivities:builders.length+support.length+generated.length,
  totalExercises:exercises.length,
  uniqueIds:new Set(exercises.map(ex=>ex.id)).size,
  units:matrix.units.length,
  distribution:matrix.distribution,
  variants:countBy([...builders,...support,...generated],'variant')
},null,2));
