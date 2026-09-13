# English Training Hub V3 — Learning Architecture

Versão funcional com cinco perfis locais independentes: Tacio, Marlene, Anny, Teste 1 e Teste 2. O PIN provisório de teste é `1234`.

## Arquitetura pedagógica

1. Inglês cotidiano
2. Destravar a fala
3. Listening, Speaking, Reading e Writing integrados
4. Inglês profissional: entrevista, enfermagem, emergência/APH e offshore
5. Independência, velocidade e automaticidade

O motor cria sessões de oito atividades com duas tarefas por competência, registra precisão, tempo, independência, domínio, confiança e automaticidade e reinsere revisões relacionadas aos erros. Todo o progresso permanece no IndexedDB do dispositivo, separado por perfil.

## Teste de aceite

1. Entre com cada perfil usando o PIN `1234` e confirme o isolamento dos dados.
2. Complete uma sessão com as quatro competências.
3. Erre uma resposta e confirme a inserção da revisão adaptativa.
4. Feche e reabra o app para validar a persistência.
5. Confirme áudio, reconhecimento de fala ou a alternativa digitada.

## Limites

- O áudio usa a voz inglesa do navegador.
- A fala depende da Web Speech API, HTTPS e permissão de microfone.
- Writing e Speaking usam palavras-chave e sobreposição de vocabulário, sem IA externa.
- Os dados não são sincronizados entre dispositivos.
