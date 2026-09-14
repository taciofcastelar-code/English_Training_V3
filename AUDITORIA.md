# AUDITORIA DE COMPATIBILIDADE — English Training Hub V3 Rebuild 3.1

## Resultado
**APROVADO COM AJUSTES CONTROLADOS.**

A base atual é compatível com a reconstrução proposta porque:
1. O projeto usa JavaScript clássico e GitHub Pages, sem bundler obrigatório.
2. `foundation.js`, `curriculum-a.js`, `curriculum-b.js` e `curriculum.js` podem continuar como camada de dados.
3. A nova arquitetura usa `window.EnglishHub` como namespace e pode coexistir com os globais atuais.
4. IndexedDB pode ser migrado mantendo o mesmo nome do banco e perfis locais.
5. O PWA aceita novos arquivos, desde que `sw.js` tenha cache novo e a lista de assets seja atualizada.

## Riscos encontrados e tratamento
- **Cache antigo do Service Worker:** tratado com novo nome de cache `english-hub-v3-rebuild-3-1-0`.
- **Bug cloze/prompt:** tratado em `exercise-renderer.js`, que renderiza `prompt` e `text` separadamente.
- **App.js monolítico:** dividido em módulos.
- **80 construtores liberados cedo demais:** novo gate exige 80 únicos + precisão + sessões.
- **Múltipla escolha não deve inflar domínio das 4 competências:** sessões de prática ficam em `practiceSessions`.
- **Conteúdo inválido silencioso:** `validators.js` audita IDs duplicados, cloze, respostas e alternativas.
- **B2 superficial em produção estendida:** `b2-extended.js` adiciona Speaking/Writing/Reading/Listening estendidos.
- **Grande volume:** `practice-bank.js` gera um banco amplo por combinações controladas.

## Compatibilidade
### Deve permanecer no repositório
- `js/foundation.js`
- `js/curriculum-a.js`
- `js/curriculum-b.js`
- `js/curriculum.js`
- `js/content.js`
- `css/styles.css`
- `css/builder.css`
- `css/pilot.css`
- `manifest.webmanifest`
- `icons/`

### Deve ser substituído
- `index.html`
- `sw.js`
- `js/app.js`

### Deve ser adicionado
- `css/rebuild.css`
- `js/config.js`
- `js/database.js`
- `js/validators.js`
- `js/metrics.js`
- `js/adaptive-engine.js`
- `js/practice-bank.js`
- `js/b2-extended.js`
- `js/mastery-engine.js`
- `js/session-engine.js`
- `js/exercise-renderer.js`
- `js/content-rebuild.js`

## Validação obrigatória depois do upload
1. Abrir GitHub Pages em janela anônima.
2. Atualizar duas vezes.
3. Em caso de versão antiga no celular, fechar PWA e reabrir; se necessário limpar dados do site.
4. Escolher perfil `teste 1`.
5. Abrir **Praticar conteúdo específico**.
6. Testar Simple Present, Simple Past, Prepositions e Sentence Building.
7. Confirmar que exercícios de completar mostram instrução E frase.
8. Fechar e reabrir; confirmar persistência.
9. Executar **Auditoria do conteúdo** no dashboard.
10. Só depois iniciar teste longitudinal com Tacio/professora.

## Observação
Este ZIP é um **pacote de atualização/overlay**. Ele preserva os quatro arquivos curriculares e também o `js/content.js` original, evitando perda do banco clínico/entrevista/offshore já existente. Não remova esses arquivos antes do teste.
