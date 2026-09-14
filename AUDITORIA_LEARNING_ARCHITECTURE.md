# Auditoria — English Training Hub V3

## Resultado executivo

A V3 deixou de ser um banco curto de demonstração e passou a ter uma Matriz Curricular A1–B2 mensurável: 680 estruturas-base, sete variações por estrutura e 4.760 atividades curriculares. Com as 64 atividades profissionais anteriores, o banco possui 4.824 exercícios únicos.

**Classificação atual: apto para piloto longitudinal controlado de 12 semanas; a homologação pedagógica depende da avaliação real do aluno e da professora.**

## Evidências automatizadas

| Dimensão | Resultado |
|---|---:|
| Estruturas-base | 680 |
| Atividades curriculares | 4.760 |
| Banco total | 4.824 |
| IDs únicos | 4.824 |
| Unidades após a fundação | 30 |
| Variações por estrutura | 7 |
| Speaking no Bloco Fundamental | 0 |
| Estruturas por variação | 680 |

Distribuição: 80 fundamentais, 100 A1, 180 A2, 160 B1 e 160 B2.

## Arquitetura validada

- Os 80 construtores originais permanecem como primeiro bloco.
- A fala guiada começa somente no A1, após a fundação.
- A matriz cobre funções comunicativas, gramática e objetivos de A1 a B2.
- Cada alvo gera montagem, escuta, leitura, cloze, fala guiada, escrita independente e resposta rápida.
- A fila evita repetir o mesmo alvo dentro da sessão quando há alternativa.
- Conteúdo antigo continua retornando por dificuldade e revisão D1, D7 e D21.
- O tempo-alvo varia conforme o tipo de atividade.
- A professora tem perfil próprio, acesso integral e avaliação de conteúdo de 1 a 5 com comentário.
- Relatórios podem ser exportados em JSON e tentativas em CSV.

## Riscos que o piloto deve medir

1. A correção de Speaking ainda depende da transcrição do navegador e não substitui avaliação humana de pronúncia.
2. A expansão usa famílias de padrões com variação lexical; a professora deve apontar frases artificiais, nível inadequado ou tradução pouco natural.
3. O IndexedDB não sincroniza dispositivos. A exportação semanal é obrigatória para preservar e comparar os dados.
4. Os perfis são seleções locais e não constituem autenticação; não devem guardar dados sensíveis.
5. As metas de progressão são hipóteses iniciais e devem ser recalibradas com os dados das semanas 2, 4, 8 e 12.
6. Instalação, microfone, atualização offline e exportação precisam ser validados em celulares reais.

## Comando de auditoria

```bash
node tests/audit-content.js
```

Consulte `MATRIZ_CURRICULAR_A1_B2.md` e `PROTOCOLO_PILOTO_12_SEMANAS.md` para o desenho completo.
