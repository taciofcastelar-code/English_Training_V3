# English Training Hub V3 — Functional Preview

Pacote estático para publicar dentro de `/v3/` no GitHub Pages.

## Publicação

Substitua o conteúdo atual da pasta `v3` pelos arquivos deste pacote, mantendo a estrutura. Faça commit e aguarde a atualização do GitHub Pages. Se o navegador mostrar a versão antiga, feche o app instalado, abra a URL no navegador, recarregue uma vez e reabra o app.

## Teste de aceite

1. Abra `v3/` e confirme os cinco indicadores no dashboard.
2. Toque em **TREINAR AGORA**.
3. Complete Listening, Speaking, Reading e Writing.
4. Em Listening, teste o áudio e a repetição.
5. Em Speaking, permita o microfone. Se o recurso não existir, digite a resposta.
6. Erre deliberadamente uma resposta e confirme a mensagem de revisão adaptativa.
7. Conclua a sessão e confira precisão, tempo e automaticidade.
8. Feche e reabra: o histórico e uma sessão incompleta devem continuar disponíveis.

## Limites desta preview

- O áudio usa a voz inglesa do navegador (`SpeechSynthesis`), portanto timbre e disponibilidade variam.
- A fala usa Web Speech API quando disponível e requer HTTPS/permissão de microfone.
- Writing e Speaking usam correspondência por palavras-chave e sobreposição de vocabulário; a nota é parcial, não uma avaliação semântica por IA.
- Os dados ficam somente no IndexedDB do navegador/dispositivo e não são sincronizados.
