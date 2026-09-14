# English Training Hub V3 — Matriz Curricular A1–B2

PWA de treino adaptativo de inglês com uma matriz de 680 estruturas-base e 4.760 atividades curriculares. O banco total contém 4.824 exercícios ao incluir as 64 atividades profissionais originais.

## Jornada pedagógica

1. Bloco Fundamental: os 80 construtores cotidianos originais, sem fala livre.
2. A1 — Destravar a fala: construção, escuta, leitura, cloze, fala guiada, escrita e resposta rápida.
3. A2 — Comunicação cotidiana integrada.
4. B1 — Fluência funcional e início do inglês profissional.
5. B2 — Independência, argumentação, negociação e automaticidade.

Cada uma das 680 estruturas aparece em sete formas: `build`, `listening`, `reading`, `cloze`, `guided-speaking`, `independent-writing` e `rapid-response`.

## Matriz

- Fundação: 80 estruturas.
- A1: 100 estruturas em 5 unidades.
- A2: 180 estruturas em 9 unidades.
- B1: 160 estruturas em 8 unidades.
- B2: 160 estruturas em 8 unidades.

Consulte [MATRIZ_CURRICULAR_A1_B2.md](./MATRIZ_CURRICULAR_A1_B2.md) para a arquitetura completa e [PROTOCOLO_PILOTO_12_SEMANAS.md](./PROTOCOLO_PILOTO_12_SEMANAS.md) para o teste longitudinal.

## Perfis do piloto

Tacio, Marlene, Anny, Teste 1, Teste 2 e Professora possuem históricos locais separados. O perfil Professora tem acesso às cinco etapas para auditoria. Como o site é público e estático, não usa PIN nem apresenta essa separação como autenticação.

O progresso fica no IndexedDB do navegador e pode ser exportado em JSON e CSV. A professora pode atribuir nota de 1 a 5 e registrar comentário após cada atividade.

## Progressão

- Etapa 2: 6 sessões, 24 estruturas fundamentais e 65% de precisão.
- Etapa 3: 18 sessões, 60 estruturas A1 e 65% de precisão.
- Etapa 4: 36 sessões, 90 estruturas A2 e 68% de precisão.
- Etapa 5: 60 sessões, 80 estruturas B1 e 70% de precisão.

O seletor combina conteúdo novo, dificuldades recorrentes e revisões após 1, 7 e 21 dias. O tempo-alvo varia por tipo de atividade.

## Auditoria

Execute:

```bash
node tests/audit-content.js
```

O teste valida contagens, distribuição CEFR, unicidade dos IDs, sete variações por estrutura, ausência de Speaking no Bloco Fundamental, integridade das alternativas, exportações e cache offline.

## Limites atuais

- Áudio e reconhecimento de fala dependem das APIs do navegador, HTTPS e permissão de microfone.
- Speaking e Writing usam palavras-chave e sobreposição lexical, sem avaliação semântica por IA.
- Os dados não sincronizam automaticamente entre dispositivos; durante o piloto, devem ser exportados semanalmente.
