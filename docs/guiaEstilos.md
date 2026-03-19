# Guia de Estilos — Site Guia

Referência de todas as classes CSS do projeto. Organizada por arquivo/categoria para facilitar a busca e o reúso.

---

## Índice

1. [Sistema de Temas (cores.css)](#1-sistema-de-temas-corescss)
2. [Layout e Grid (layout.css)](#2-layout-e-grid-layoutcss)
3. [Utilitários Atômicos (utils.css)](#3-utilitários-atômicos-utilscss)
4. [Cards (card.css / base.css)](#4-cards-cardcss--basecss)
5. [Tipografia e Fontes (fonts.css)](#5-tipografia-e-fontes-fontscss)
6. [Seções (sections.css)](#6-seções-sectionscss)
7. [Painéis (panels.css)](#7-painéis-panelscss)
8. [Tags e Pílulas (tags.css)](#8-tags-e-pílulas-tagscss)
9. [Código e IDE (code.css)](#9-código-e-ide-codecss)
10. [Tabelas (tables.css)](#10-tabelas-tablescss)
11. [Tooltips (tooltips.css)](#11-tooltips-tooltipscss)
12. [Carrossel (carousel.css)](#12-carrossel-carouselcss)
13. [Callouts e Destaques (callouts.css)](#13-callouts-e-destaques-calloutscss)
14. [Bloco de Mensagem (message-block.css)](#14-bloco-de-mensagem-message-blockcss)
15. [Link Cards (link-cards.css)](#15-link-cards-link-cardscss)
16. [Media Cards (media-cards.css)](#16-media-cards-media-cardscss)
17. [Separadores (dividers.css / line-sep.css)](#17-separadores-dividerscss--line-sepcss)
18. [Matemática e Fórmulas (math.css)](#18-matemática-e-fórmulas-mathcss)
19. [Animações (animations.css)](#19-animações-animationscss)
20. [Micro-interações Hover (hover.css)](#20-micro-interações-hover-hovercss)
21. [Efeito Borda Animada (efeitos.css)](#21-efeito-borda-animada-efeitoscss)
22. [Navegação (nav.css)](#22-navegação-navcss)
23. [Header e Footer (header.css / footer.css)](#23-header-e-footer-headercss--footercss)
24. [Media (media.css)](#24-media-mediacss)
25. [Impressão e Visibilidade (base.css)](#25-impressão-e-visibilidade-basecss)

---

## 1. Sistema de Temas (cores.css)

O tema funciona em **3 camadas**. Nunca use variáveis `--dark-*` ou `--light-*` diretamente no CSS de componentes — use sempre os **tokens finais** abaixo.

### Tokens Finais (use estes no seu CSS)

| Token | O que representa |
|---|---|
| `--bg-primary` | Fundo principal da página |
| `--bg-secondary` | Fundo secundário (header, footer, cards) |
| `--card-bg-primary` | Fundo de cards com leve translucidez |
| `--card-bg-secondary` | Fundo de cards secundários |
| `--text-primary` | Texto principal |
| `--text-secondary` | Texto de apoio, legendas, labels |
| `--text-code` | Texto dentro de blocos de código |
| `--accent` | Cor de destaque principal (verde neon / azul royal) |
| `--accent-rgb` | Versão RGB de `--accent` para uso em `rgba()` |
| `--accent-hover` | Cor de destaque ao passar o mouse |
| `--border` | Borda sutil padrão |
| `--border-neon` | Borda brilhante (verde neon / azul vivo) |
| `--border-neon-dark` | Versão mais escura da borda neon |
| `--border-neon-dark-rgb` | Versão RGB da borda neon escura |
| `--shadow` | Sombra padrão do tema |
| `--on-accent` | Cor de texto sobre fundos `--accent` |
| `--link` | Cor padrão de links |
| `--link-hover` | Cor de links ao passar o mouse |
| `--focus-ring` | Cor do anel de foco (acessibilidade) |
| `--selection-bg` | Fundo da seleção de texto |
| `--selection-text` | Texto da seleção de texto |
| `--danger` | Cor de estado de erro/perigo |
| `--danger-rgb` | Versão RGB de `--danger` |
| `--scrollbar-track` | Fundo da barra de rolagem |
| `--scrollbar-thumb` | Polegar da barra de rolagem |
| `--scrollbar-thumb-hover` | Polegar da barra de rolagem ao passar o mouse |
| `--tooltip-bg` | Fundo dos tooltips |
| `--tooltip-text` | Texto dos tooltips |
| `--tooltip-border` | Borda dos tooltips |
| `--tooltip-shadow-color` | Sombra dos tooltips |
| `--table-bg` | Fundo de tabelas |
| `--table-border` | Borda de células de tabela |
| `--table-header-bg` | Gradiente do cabeçalho de tabela |
| `--table-header-text` | Texto do cabeçalho de tabela |
| `--table-row-hover` | Fundo de linha de tabela ao passar o mouse |
| `--table-stripe` | Listagem alternada de linhas (zebrinha) |
| `--ide-container-bg` | Fundo do container estilo IDE |
| `--ide-header-bg` | Fundo do header da IDE |
| `--code-keyword` | Cor de palavras-chave no código |
| `--code-type` | Cor de tipos no código |
| `--code-string` | Cor de strings no código |
| `--code-comment` | Cor de comentários no código |
| `--code-number` | Cor de números no código |
| `--code-terminal-bg` | Fundo de blocos de código tipo terminal |
| `--code-terminal-border` | Borda de blocos de código tipo terminal |

### Classes de Tema

| Classe | Onde aplicar | O que faz |
|---|---|---|
| `body.theme-dark` | `<body>` (via JS) | Ativa o tema escuro: verde neon + preto |
| `body.theme-light` | `<body>` (via JS) | Ativa o tema claro: azul royal + prata |
| `body.theme-transitioning` | `<body>` (adicionada via JS por ~350ms) | Habilita transição suave entre temas. Removida automaticamente após a troca para não afetar performance no uso normal |

### Variáveis Globais (em `:root`)

| Variável | Valor padrão |
|---|---|
| `--accent-gradient-1-dark` | `linear-gradient(135deg, #00ff88, #00cc6a)` |
| `--accent-gradient-2-dark` | `linear-gradient(135deg, #00cc6a, #02bf67)` |
| `--accent-gradient-1-light` | `linear-gradient(135deg, #1e40af, #3730a3)` |
| `--accent-gradient-2-light` | `linear-gradient(135deg, #3b82f6, #1e3a8a)` |
| `--card-pad` | `1.25rem` |

### Classes de Gradiente (base.css)

| Classe | O que faz |
|---|---|
| `.gradient-accent-1` | Aplica gradiente de destaque primário. Verde no dark, azul no light |
| `.gradient-accent-2` | Aplica gradiente de destaque secundário. Verde escuro no dark, azul escuro no light |

---

## 2. Layout e Grid (layout.css)

### Variáveis de Layout (`:root`)

| Variável | Valor | Uso |
|---|---|---|
| `--container-max` | `1200px` | Largura máxima padrão |
| `--container-narrow` | `900px` | Largura estreita (textos longos) |
| `--container-wide` | `1440px` | Largura larga (dashboards) |
| `--container-pad-x` | `24px` | Padding horizontal padrão |
| `--container-pad-y` | `32px` | Padding vertical padrão |
| `--grid-gap` | `1.5rem` | Espaçamento padrão de grid |
| `--grid-min` | `280px` | Largura mínima de coluna em grids auto-fit |

### Container

| Classe | O que faz |
|---|---|
| `.container` | Container centralizado com `max-width` e padding horizontal |
| `.container--narrow` | Sobrescreve `--container-max` para `900px` |
| `.container--wide` | Sobrescreve `--container-max` para `1440px` |
| `.container--full` | Remove limite de largura (100%) |
| `.center-x` | Centraliza horizontalmente via `margin: auto` |
| `.center-content` | Centraliza conteúdo com `display: grid; place-items: center` |

### `main` e `.content-area`

| Seletor | O que faz |
|---|---|
| `main` | Layout principal: `margin-top: 80px` (abaixo do header fixo), centralizado, `min-height: calc(100vh - 160px)` |
| `.content-area` | Área de conteúdo com animação `fadeInUp` na entrada. Usa `contain: layout style` para isolar recálculos |

### Grid Utilitário

| Classe | O que faz |
|---|---|
| `.grid` | `display: grid` com gap padrão (`--grid-gap`) |
| `.grid--auto` | `auto-fit` com `minmax(--grid-min, 1fr)` — colunas que se ajustam automaticamente |
| `.grid--auto-sm` | Reduz `--grid-min` para `220px` (colunas menores) |
| `.grid--auto-lg` | Aumenta `--grid-min` para `320px` (colunas maiores) |
| `.grid--2` | 2 colunas iguais |
| `.grid--3` | 3 colunas iguais |
| `.grid--4` | 4 colunas iguais (vira 2 abaixo de 900px, 1 coluna abaixo de 768px) |
| `.grid--center-items` | Centraliza itens horizontalmente (`justify-items: center`) |
| `.grid--center` | Centraliza itens horizontal e verticalmente |
| `.grid--start` | Alinha itens ao topo |
| `.grid--stretch` | Estica itens para mesma altura |
| `.grid--equal-max` | Força todos os itens à mesma altura (a do maior) |
| `.grid--equal-min` | Limita altura dos itens a `--equal-min-height` (padrão `260px`) para uniformidade |

### Grid Legado

| Classe | O que faz |
|---|---|
| `.grid-completo` | Grid `auto-fit minmax(280px, 1fr)`. Para `carta-visual` e `exemplo-completo` |
| `.grid-cards` | Idêntico, usado em listas de cards (`auto-fit minmax(280px, 1fr)`) |
| `.grid-cards--auto` | Variação com mínimo de `240px` |
| `.logic-grid` | 2 colunas fixas para comparações lado-a-lado (vira 1 coluna abaixo de 900px) |
| `.container-visual` | 2 colunas com `gap: 2rem` (vira 1 coluna abaixo de 768px) |

### Clamp de Texto

Usado dentro de cards para cortar texto após N linhas.

| Classe | O que faz |
|---|---|
| `.clamp` | Base — `display: -webkit-box; overflow: hidden` |
| `.clamp-2` | Limita a 2 linhas |
| `.clamp-3` | Limita a 3 linhas |
| `.clamp-4` | Limita a 4 linhas |
| `.clamp-6` | Limita a 6 linhas |

### Flex Utilitário

| Classe | O que faz |
|---|---|
| `.row` | `display: flex; gap: 1rem` (gap customizável via `--row-gap`) |
| `.row--wrap` | Flex com quebra de linha |
| `.row--center` | Flex centralizado horizontal e vertical |
| `.row--between` | Flex com `space-between` |
| `.stack` | Flex coluna com gap (gap customizável via `--stack-gap`) |
| `.center` | `display: flex; justify-content: center` |

---

## 3. Utilitários Atômicos (utils.css)

Classes atômicas para composição direta no HTML, evitando criar seletores novos a cada variação.

### Fundos (`bg-*`)

| Classe | O que faz |
|---|---|
| `.bg-primary` | Fundo `--bg-primary` |
| `.bg-secondary` | Fundo `--bg-secondary` |
| `.bg-card` | Fundo `--card-bg-primary` |
| `.bg-card-2` | Fundo `--card-bg-secondary` |
| `.bg-accent` | Fundo na cor de destaque |
| `.bg-accent-soft` | Fundo accent com 10% de opacidade |
| `.bg-accent-soft-2` | Fundo accent com 5% de opacidade |
| `.bg-transparent` | Fundo transparente |
| `.bg-grad-1` | Gradiente primário (verde escuro→neon no dark, azul no light) |
| `.bg-grad-2` | Gradiente secundário (variação do primário) |

### Texto (`text-*`)

| Classe | O que faz |
|---|---|
| `.text-primary` | Cor de texto principal |
| `.text-secondary` | Cor de texto secundária |
| `.text-accent` | Cor de destaque (accent) |
| `.text-code` | Cor de texto de código |
| `.text-on-accent` | Texto legível sobre fundos accent |
| `.text-danger` | Cor de erro/perigo |

### Bordas (`border-*`)

| Classe | O que faz |
|---|---|
| `.border` | Borda `1px solid --border` em todos os lados |
| `.border-2` | Borda `2px solid --border` |
| `.border-accent` | Borda `1px solid --accent` |
| `.border-neon` | Borda `1px solid --border-neon` |
| `.border-neon-2` | Borda `2px solid --border-neon` |
| `.border-danger` | Borda `1px solid --danger` |
| `.border-none` | Remove todas as bordas |
| `.border-l` | Borda esquerda sutil |
| `.border-l-accent` | Borda esquerda na cor accent |
| `.border-l-neon` | Borda esquerda neon |
| `.border-l-danger` | Borda esquerda de erro |
| `.border-l-2` / `.border-l-3` / `.border-l-4` / `.border-l-8` | Espessuras da borda esquerda |
| `.border-b` | Borda inferior sutil |
| `.border-b-2` | Borda inferior 2px |
| `.border-b-accent` | Borda inferior na cor accent |
| `.border-b-neon` | Borda inferior neon |
| `.border-t` | Borda superior sutil |
| `.border-t-accent` | Borda superior accent |
| `.border-t-4` | Borda superior 4px |

### Border-radius (`rounded-*`)

| Classe | Valor |
|---|---|
| `.rounded-sm` | `6px` |
| `.rounded` | `8px` |
| `.rounded-md` | `12px` |
| `.rounded-lg` | `16px` |
| `.rounded-xl` | `20px` |
| `.rounded-full` | `9999px` (pílula) |
| `.rounded-none` | `0` |

### Padding

| Classe | Valor |
|---|---|
| `.p-xs` | `0.5rem` (todos os lados) |
| `.p-sm` | `0.75rem` |
| `.p-md` | `1.25rem` |
| `.p-lg` | `2rem` |
| `.p-xl` | `2.5rem` |
| `.px-sm/md/lg` | Padding horizontal |
| `.py-sm/md/lg` | Padding vertical |
| `.pt-sm/md` | Padding top |
| `.pb-sm/md` | Padding bottom |
| `.pl-sm/md/lg/xl` | Padding left |

### Margin

| Classe | Valor |
|---|---|
| `.m-auto` | `margin: auto` |
| (ver utils.css para lista completa de `.m-*`, `.mt-*`, `.mb-*`, `.mx-*`) | |

### Sombras (`shadow-*`)

| Classe | O que faz |
|---|---|
| `.shadow-sm` | Sombra discreta |
| `.shadow` | Sombra padrão |
| `.shadow-md` | Sombra média |
| `.shadow-lg` | Sombra pronunciada |

### Tipografia

| Classe | O que faz |
|---|---|
| `.font-mono` | Fonte monoespaçada |
| `.fw-light` | `font-weight: 300` |
| `.fw-normal` | `font-weight: 400` |
| `.fw-medium` | `font-weight: 500` |
| `.fw-semi` | `font-weight: 600` |
| `.fw-bold` | `font-weight: 700` |
| `.fw-black` | `font-weight: 800+` |
| `.size-xs` | Tamanho pequeno |
| `.size-sm` | Tamanho menor |
| `.size-base` | Tamanho base |
| `.size-md` | Tamanho médio |
| `.size-lg` | Tamanho grande |
| `.size-xl` | Tamanho extra grande |

### Outros Utilitários

| Classe | O que faz |
|---|---|
| `.cursor-pointer` | Cursor de mão |
| `.cursor-help` | Cursor de ajuda |
| `.overflow-hidden` | `overflow: hidden` |
| `.overflow-auto` | `overflow: auto` |
| `.overflow-x` | `overflow-x: auto` |
| `.op-50` / `.op-75` | Opacidade 50% / 75% |
| `.lh-tight` / `.lh-relaxed` | Line-height compacto / espaçado |
| `.w-full` | `width: 100%` |
| `.h-full` | `height: 100%` |
| `.pos-relative` | `position: relative` |
| `.pos-absolute` | `position: absolute` |
| `.z-1` / `.z-10` | Z-index 1 / 10 |

---

## 4. Cards (card.css / base.css)

### Card Base

| Classe | O que faz |
|---|---|
| `.card` | Card padrão: fundo secundário, borda esquerda, sombra, hover com lift |
| `.card.small` | Variante menor, centralizada, com borda accent-hover |
| `.card-standard` | Card com `card-bg-primary`, borda completa e `border-radius: 12px` |
| `.card-standard--flat` | Versão sem borda/fundo/sombra — apenas espaçamento |
| `.card--danger` | Sobrescreve cor da borda para vermelho de erro |
| `.card--success` | Sobrescreve cor da borda para verde de sucesso |
| `.grid-cards` | Grid `auto-fit minmax(280px, 1fr)` para listas de cards |

### Utilitários de Texto para Cards

| Classe | O que faz |
|---|---|
| `.text--danger` | Texto na cor de erro (`#ff6b6b`) |
| `.text--success` | Texto na cor de sucesso (`#51cf66`) |
| `.text--accent` | Texto na cor accent do tema |
| `.badge` | Pílula inline com fundo accent translúcido e borda. Serve para labels/tecnologias inline em parágrafos |
| `.link-card` | Bloco clicável com borda esquerda accent (diferente do `.link-card` de link-cards.css — este é um estilo de parágrafo) |
| `.animacao-entrada` | Aplica animação `entradaEspecial` ao entrar na tela |

---

## 5. Tipografia e Fontes (fonts.css)

Classes para alinhamento, transformação e peso de texto.

| Classe | O que faz |
|---|---|
| `.text-left` | Alinhamento à esquerda |
| `.text-center` | Alinhamento centralizado |
| `.text-right` | Alinhamento à direita |
| `.text-justify` | Alinhamento justificado |
| `.text-nowrap` | Proíbe quebra de linha |
| `.text-truncate` | Corta com `…` em uma linha |
| `.text-break` | Força quebra de palavras longas |
| `.text-lowercase` | Caixa baixa |
| `.text-uppercase` | Caixa alta |
| `.text-capitalize` | Primeira letra maiúscula |
| `.font-weight-light` | `font-weight: 300` |
| `.font-weight-normal` | `font-weight: 400` |
| `.font-weight-bold` | `font-weight: 700` |
| `.font-italic` | Itálico |
| `.text-decoration-underline` | Sublinhado |
| `.text-decoration-none` | Remove sublinhado |
| `.text-hover-underline` | Sublinhado apenas no hover |

> **Nota:** `strong` por padrão recebe `color: var(--accent)` globalmente.

### Tipografia em `.content-area`

H1–H6 dentro de `.content-area` recebem automaticamente `color: var(--accent)` com margens e pesos adequados por nível.

---

## 6. Seções (sections.css)

Estrutura de seções de página reutilizáveis.

| Classe | O que faz |
|---|---|
| `section` | Margem inferior `3rem`. Usa `content-visibility: auto` para pular renderização de seções fora da viewport (ganho de performance em páginas longas) |
| `.section` | Padding vertical `40px 0` |
| `.section-header` | Cabeçalho de seção centralizado com `margin-bottom: 48px` |
| `.section-title` | Título de seção centralizado, tamanho `1.8rem`, cor accent com efeito glow de texto |
| `.intro-highlight` / `.destaque` | Parágrafo introdutório destacado, centralizado, `font-size: 1.2rem` |
| `.note` / `.skills-note` | Nota de rodapé em itálico, cor secundária, menor |
| `.page-header` | Hero/cabeçalho de página com gradiente de fundo, borda inferior accent, arredondado |
| `.page-icon` | Ícone emoji de destaque no topo de `.page-header` (`font-size: 3.5rem`) |

---

## 7. Painéis (panels.css)

Cards maiores com hover pronunciado e suporte a ícone no título.

| Classe | O que faz |
|---|---|
| `.panel` | Card com fundo secundário, sombra, padding `28px`, hover com lift de 4px e glow accent |
| `.panel-title` | Título do painel, cor accent, flex com `align-items: center` para ícone inline. SVG dentro do título rotaciona e escala no hover |

---

## 8. Tags e Pílulas (tags.css)

| Classe | O que faz |
|---|---|
| `.tag-list` / `.skills-grid` | Container flex com wrap para agrupar tags (gap `10px`, margem vertical) |
| `.tag` / `.skill-tag` | Pílula com fundo accent translúcido, borda e hover com lift. Usada para habilidades, categorias, tecnologias |
| `.spec-tag` | Variante "neon" com gradiente `--border-neon` → `--border-neon-dark`. Texto sobre fundo accent. Ideal para especificações técnicas |

---

## 9. Código e IDE (code.css)

### Blocos de Código

| Classe | O que faz |
|---|---|
| `.code-inline` | Fonte monoespaçada inline (sem fundo) |
| `.code-block` / `.example` | Bloco de código multi-linha: fundo terminal, borda esquerda accent, scroll horizontal |
| `.code-block--small` | Variante menor com padding e font-size reduzidos |
| `pre.example` | Bloco de código com borda esquerda neon e `white-space: pre-wrap` |

### Highlight Manual (Inline)

Aplique dentro de `<pre>` / `<code>` com `<span>`:

| Classe | O que faz |
|---|---|
| `.keyword` / `.kw` | Palavra-chave (azul no dark, azul intenso no light) |
| `.tp` | Tipo/classe (teal, em itálico) |
| `.str` | String literal (laranja/vermelho) |
| `.com` | Comentário (verde, em itálico) |
| `.num` | Número (verde claro) |
| `.string` | Alias de `.str` com leve opacidade |
| `.comment` | Alias de `.com` com 60% de opacidade |

### Visual IDE (Janela com Dots)

```html
<div class="ide-box">
  <div class="ide-header">
    <div class="ide-dots">
      <div class="ide-dot"></div>
      <div class="ide-dot"></div>
      <div class="ide-dot"></div>
    </div>
    arquivo.js
  </div>
  <div class="ide-content">…código…</div>
</div>
```

| Classe | O que faz |
|---|---|
| `.ide-box` / `.ide-container` / `.ide-wrapper` | Container com aparência de janela de IDE (bordas, `overflow: hidden`) |
| `.ide-header` | Barra de título da janela (fundo mais escuro, tamanho menor) |
| `.ide-dots` | Container flex para os dots decorativos |
| `.ide-dot` | Círculo decorativo colorido com accent-hover (simula botões macOS) |
| `.ide-content` | Área de código dentro da IDE (fonte mono, scroll horizontal) |

### Exemplos com Cabeçalho e Saída

```html
<div class="code-container">
  <div class="code-header">Título do exemplo</div>
  <pre class="example">…código…</pre>
  <div class="output-container">
    <strong>Saída:</strong> resultado
  </div>
</div>
```

| Classe | O que faz |
|---|---|
| `.code-container` | Wrapper para código + cabeçalho + saída (position relative, overflow hidden) |
| `.code-header` | Barra de título acima do código (fundo card secundário, borda inferior) |
| `.output-container` | Bloco de saída com borda esquerda neon escuro, fundo card secundário |

---

## 10. Tabelas (tables.css)

### Tabela Genérica

O elemento `table` já recebe estilos globais com fundo temático, cabeçalho em gradiente accent, linhas zebradas e hover com lift.

| Classe | O que faz |
|---|---|
| `.scroll-x` | Wrapper para tabelas largas: `overflow-x: auto` |

### Tabela Grande com Scroll

| Classe | O que faz |
|---|---|
| `.tabela-gigante` | Tabela densa (`min-width: 640px`) com cabeçalho sticky — ideal para dados comparativos extensos |
| `.tabela-gigante-total` | Linha de total/rodapé em negrito dentro de `.tabela-gigante` |

### Tabelas Temáticas (para páginas de Redes/Protocolos)

| Classe | O que faz |
|---|---|
| `.protocol-table` | Wrapper de tabela com backdrop-filter e animação de entrada por linha (`tableRowEnter`) |
| `.protocol-comparison` | Idêntico ao `.protocol-table`, para comparações |
| `.ip-versions-comparison` | Idem, para comparação de versões de IP |
| `.protocol-details` | Container flex para detalhes de protocolo em células |

---

## 11. Tooltips (tooltips.css)

Dois sistemas de tooltip coexistem:

### Sistema Novo (semântico por `abbr` e `.term`)

| Classe / Elemento | O que faz |
|---|---|
| `abbr[title]` | `<abbr>` recebe sublinhado pontilhado automático e cor accent no hover |
| `.abbr-tooltip` | Mesmo estilo que `abbr[title]` para `<span>` sem ser `<abbr>` |
| `.term` | Termo com tooltip contextual. O tooltip aparece ao hover/focus com transição |
| `.term .hint` | Popup de definição gerado dentro do `.term`. Fica `display:none` até hover/focus |
| `.hint-title` | Título dentro do `.hint` em negrito |

### Sistema Legado (`.tooltip` + `.tooltip-text`)

```html
<span class="tooltip">
  palavra
  <span class="tooltip-text">Explicação do termo</span>
</span>
```

| Classe | O que faz |
|---|---|
| `.tooltip` | Elemento-gatilho com sublinhado pontilhado |
| `.tooltip-text` | Balão flutuante que aparece acima do gatilho. Suporta `aria-expanded="true"` para acessibilidade por toque |
| `.tooltip-text.left-align` | Alinha o balão à esquerda do gatilho (evita corte na borda esquerda da tela) |
| `.tooltip-text.right-align` | Alinha o balão à direita do gatilho |

---

## 12. Carrossel (carousel.css)

Scroll horizontal estilo Netflix. Funciona sem JS (scroll manual) e com JS (botões de navegação).

```html
<div class="carousel-row">
  <div class="carousel-row__header">
    <h3 class="carousel-row__title">Título</h3>
  </div>
  <div class="carousel" data-carousel>
    <button class="carousel__btn carousel__btn--prev">‹</button>
    <div class="carousel__track">
      <div class="carousel__item">
        <img src="…" alt="…">
        <div class="carousel__item-body">
          <h4 class="carousel__item-title">Nome</h4>
        </div>
      </div>
    </div>
    <button class="carousel__btn carousel__btn--next">›</button>
  </div>
</div>
```

| Classe | O que faz |
|---|---|
| `.carousel-row` | Container de uma fileira do carrossel |
| `.carousel-row__header` | Header da fileira (flex, com título e espaço para link "ver mais") |
| `.carousel-row__title` | Título da fileira |
| `.carousel` | Container relativo do carrossel (âncora dos botões absolutos) |
| `.carousel__track` | Área de scroll horizontal com `scroll-snap-type: x mandatory` |
| `.carousel__item` | Item individual: `width: min(260px, 72vw)`, borda, sombra, hover com lift |
| `.carousel__item--placeholder` | Item vazio (com borda tracejada, centralizado) |
| `.carousel__item-body` | Área de texto dentro do item |
| `.carousel__item-title` | Título do item |
| `.carousel__btn` | Botão circular de navegação (esquerda/direita), posicionado absolutamente |
| `.carousel__btn--prev` | Botão anterior (esquerda) |
| `.carousel__btn--next` | Botão próximo (direita) |
| `.carousel__btn[disabled]` | Botão desativado com 35% de opacidade |

> **Nota:** Os botões são ocultados em mobile (≤768px) — o usuário usa o swipe diretamente.

---

## 13. Callouts e Destaques (callouts.css)

| Classe | O que faz |
|---|---|
| `.callout` | Área de fechamento de seção: centralizada, separador no topo, margem superior |
| `.frase-destaque` | Box com frase em destaque: fundo accent translúcido, borda, cor accent, flex com ícone SVG. Hover com lift e rotação do ícone |

---

## 14. Bloco de Mensagem (message-block.css)

| Classe | O que faz |
|---|---|
| `.message-block` | Bloco destacado com borda esquerda neon, fundo secundário, fonte monoespaçada e linha decorativa no topo. Ideal para citações, avisos e trechos de destaque |

---

## 15. Link Cards (link-cards.css)

Links estilizados como cards (ícone + texto, com efeito hover de cor invertida).

```html
<ul class="link-list">
  <li>
    <a class="link-card" href="…">
      <svg>…</svg>
      Texto do link
    </a>
  </li>
</ul>
```

| Classe | O que faz |
|---|---|
| `.link-list` | Lista sem bullet, flex coluna, centralizada à esquerda |
| `.link-card` | Link com aparência de card: ícone + texto, borda accent, sombra neon. Hover inverte: fundo vira accent, texto vira on-accent |

---

## 16. Media Cards (media-cards.css)

Cards com imagem, título, descrição e tags.

```html
<div class="media-grid">
  <div class="media-card">
    <div class="media-card__media">
      <img class="media-card__img" src="…" alt="…">
    </div>
    <h3 class="media-card__title">Nome</h3>
    <p class="media-card__desc">Descrição…</p>
    <div class="media-card__tags">…tags…</div>
  </div>
</div>
```

| Classe | O que faz |
|---|---|
| `.media-grid` | Grid `auto-fit minmax(260px, 1fr)` para os cards |
| `.media-card` | Card com animação de entrada `fadeInUp`, hover com lift e borda neon. Efeito de brilho percorre o topo no hover (`::before`) e cantos pulsam neon (`::after`) |
| `.media-card__title` | Título do card com linha decorativa que cresce no hover |
| `.media-card__media` | Área de imagem (`height: 120px`, centralizada) |
| `.media-card__img` | Imagem responsiva dentro da área de media — escala `1.05` no hover |
| `.media-card__desc` | Descrição em texto secundário menor |
| `.media-card__tags` | Container flex para `.tag` / `.spec-tag` |

---

## 17. Separadores (dividers.css / line-sep.css)

| Classe / Elemento | O que faz |
|---|---|
| `hr` | Linha horizontal discreta (gradiente transparente → border → transparente) com margem vertical `48px` |
| `.divider` | Barra curta decorativa (`80px × 3px`) com gradiente accent → transparente, centralizada |
| `.section-divider` | Barra decorativa alinhada à esquerda (mesma estética do `.divider`) |
| `.section-divider--line` | Linha horizontal leve como `border-top` com margem vertical `3rem` |

---

## 18. Matemática e Fórmulas (math.css)

### Blocos de Fórmula

| Classe | O que faz |
|---|---|
| `.formula-gigante` | Fórmula em destaque máximo: `font-size: 2.2rem`, gradiente de fundo, sombra pronunciada |
| `.formula-destaque` | Fórmula secundária destacada: `font-size: 1.6rem`, gradiente de fundo |
| `.formula-normal` | Fórmula padrão: `font-size: 1.3rem`, gradiente com neon |
| `.math-scroll` | Wrapper com `overflow-x: auto` para fórmulas MathML que excedem a largura |

### Blocos Didáticos

| Classe | O que faz |
|---|---|
| `.exemplo-completo` | Card espaçoso com borda esquerda neon de `8px` e sombra. Base para exemplos de linguagem/conceito |
| `.carta-visual` | Card secundário menor com hover lift. Usado dentro de `.grid-completo` |
| `.dado-item-destaque` | Pílula inline com gradiente accent para destacar valores ou dados |

### Variantes de Borda do `.exemplo-completo`

Adicione ao lado de `.exemplo-completo` para colorir a borda esquerda por categoria:

| Classe | Cor da borda |
|---|---|
| `.probabilidade` | `--accent` |
| `.estatistica` | `--border-neon` |
| `.distribuicao` | `--tag-purple` |
| `.inferencia` | `--tag-pink` |
| `.tabelas` | `--tag-green` |

---

## 19. Animações (animations.css)

### Tokens de Animação (`:root`)

| Variável | Valor padrão | Uso |
|---|---|---|
| `--anim-duration-fast` | `140ms` | Micro-interações |
| `--anim-duration-normal` | `240ms` | Padrão |
| `--anim-duration-slow` | `420ms` | Entradas de página |
| `--anim-delay-none` | `0ms` | Sem delay |
| `--anim-delay-short` | `60ms` | Delay leve (telas com vários elementos) |
| `--anim-ease-standard` | `cubic-bezier(0.2,0,0,1)` | Geral |
| `--anim-ease-decelerate` | `cubic-bezier(0,0,0,1)` | Elementos que chegam |
| `--anim-ease-emphasis` | `cubic-bezier(0.2,0,0,1)` | Ênfase |
| `--anim-distance-1` | `8px` | Deslocamento pequeno (`slide-up`) |
| `--anim-distance-2` | `16px` | Deslocamento médio |
| `--anim-scale-in` | `0.98` | Scale de entrada |
| `--anim-scale-out` | `1.02` | Scale de saída |

Para sobrescrever por elemento use `style="--anim-duration: 600ms; --anim-distance: 18px"`.

### Classes Base

| Classe | O que faz |
|---|---|
| `.anim` | Define `animation-duration`, `timing-function`, `delay` e `fill-mode: both` via tokens |
| `.anim-once` | Animação roda 1 vez |
| `.anim-infinite` | Animação roda em loop |
| `.anim-paused` | Pausa a animação |
| `.trans` | Transição com todas as propriedades visuais principais (transform, opacity, background-color, etc.) |

### Classes de Entrada (uso direto no HTML)

| Classe | O que faz |
|---|---|
| `.anim-fade-in` | Aparece com fade (opacidade 0 → 1) |
| `.anim-fade-out` | Desaparece com fade |
| `.anim-slide-up` | Entra de baixo para cima com fade |
| `.anim-slide-down` | Entra de cima para baixo com fade |
| `.anim-slide-left` | Entra da direita para esquerda com fade |
| `.anim-slide-right` | Entra da esquerda para direita com fade |
| `.anim-scale-in` | Entra com leve zoom de crescimento |
| `.anim-scale-out` | Sai com zoom de crescimento |
| `.anim-pop` | Entrada com efeito "pop" (elástico) |

### Hover Dinâmico

| Classe | O que faz |
|---|---|
| `.anim-hover-lift` | Levanta o elemento `translateY(-2px)` no hover |
| `.anim-hover-glow` | Adiciona sombra neon no hover |
| `.anim-hover-scale` | Escala levemente no hover |

### Controle de Motion (Acessibilidade)

| Classe | O que faz |
|---|---|
| `.motion-allow` | Força animação mesmo quando usuário ativou `prefers-reduced-motion: reduce` |
| `.motion-reduce` | Força a remoção de animação independentemente da preferência |

---

## 20. Micro-interações Hover (hover.css)

Classes reutilizáveis para efeitos hover/focus padronizados. Todas respeitam `prefers-reduced-motion` e acessibilidade (`:focus-visible`).

| Classe | O que faz |
|---|---|
| `.hover-underline` | Sublinhado aparece somente no hover/focus |
| `.hover-accent` | Cor do texto muda para `--accent` no hover/focus |
| `.hover-imagem-grow` | A `<img>`, `<svg>` ou `.header-logo` dentro do elemento escala `1.05` no hover |
| `.hover-imagem-rotate360` | O próprio elemento gira 360° no hover (bom para logos) |
| `.hover-lift` | Levanta `translateY(-2px)` com sombra neon sutil no hover |
| `.hover-glow` | Anel neon de glow no contorno no hover (sem transform) |
| `.hover-bg-accent-soft` | Fundo fica accent translúcido (12%) no hover |
| `.hover-border-accent` | Borda muda para accent no hover |

---

## 21. Efeito Borda Animada (efeitos.css)

Card decorativo com borda giratória em gradiente neon. Ideal para hero ou destaque especial.

```html
<div class="Colored_border_anim_card_box">
  <p>Conteúdo central</p>
</div>
```

| Classe | O que faz |
|---|---|
| `.Colored_border_anim_card_box` | Card com borda animada em rotação contínua via `@property --gradient-angle`. O `::before` cria a borda, o `::after` adiciona blur neon ao redor |

> **Como funciona:** dois pseudo-elementos com `conic-gradient` e `animation: rotateBorder 4s linear infinite`. O `::after` usa `filter: blur(3rem)` criando o brilho externo.  
> **Performance:** `will-change: filter` no `::after` garante camada de composição dedicada para o blur.

---

## 22. Navegação (nav.css)

### Botões Toggle (hambúrguer)

| Classe | O que faz |
|---|---|
| `.menu-toggle` | Botão fixo no canto superior esquerdo que abre a nav lateral |
| `.menu-interno-toggle` | Botão fixo no canto superior direito que abre o índice interno da página |
| `.menu-icon` | Ícone hambúrguer (ativo quando menu fechado) |
| `.close-icon` | Ícone X (ativo quando menu aberto) |
| `.nav-icon-before` | SVG inline antes do texto de um link de navegação (margem direita) |
| `.nav-icon-after` | SVG inline após o texto de um link de navegação (margem esquerda negativa) |

> **Z-index:** `.menu-toggle` e `.menu-interno-toggle` ficam em `z-index: 1002`, acima do `header` (`z-index: 1000`) e das navs abertas (`z-index: 1001`).

---

## 23. Header e Footer (header.css / footer.css)

### Header

| Seletor / Classe | O que faz |
|---|---|
| `header` | Barra fixa no topo, `height: 64px`, `z-index: 1000`, fundo secundário com borda inferior |
| `.header-content` | Conteúdo do header: flex centralizado com `max-width` da variável `--container-max` |
| `.logo-wrap` | Container do logo com `filter: drop-shadow` neon |
| `.logo` | Logo SVG recolorizado via CSS `mask-image` para a cor `--accent`. Suporte progressivo: fallback para `background-image` em browsers sem mask |
| `.header-logo` | `width/height: 44px` com hover scale `1.05` |
| `.site-title-text` | Título do site no header com truncate para telas pequenas |

### Footer

| Seletor / Classe | O que faz |
|---|---|
| `footer` | Rodapé centralizado, fundo secundário, borda superior, `font-size: clamp(0.9rem, 2vw, 1rem)` |
| `.footer-logo` | Logo no rodapé recolorizado via `background-color: var(--text-secondary)` |

---

## 24. Media (media.css)

Regras globais preventivas — aplicadas automaticamente a todos os elementos de mídia.

- `img, svg, video, canvas, table, pre, code` → `max-width: 100%`
- `img, svg, canvas, video` → `height: auto`
- `pre` → `white-space: pre-wrap; word-wrap: break-word`
- `code` → `white-space: normal`
- `table` → `table-layout: fixed; word-wrap: break-word`
- `.content-area` → `overflow-wrap: anywhere` (evita overflow em strings longas)

---

## 25. Impressão e Visibilidade (base.css)

### Ocultar em Mobile

| Classe | O que faz |
|---|---|
| `.hide-mobile` | `display: block` normalmente; `display: none` em telas ≤768px |

### Print (`@media print`)

Ao imprimir (`Ctrl+P`), automaticamente:
- Oculta: header, navs, botões toggle, overlay, `.footer-logo`
- Limpa: `body` (branco e preto), `main` (sem margem extra)
- Adiciona URL após cada link: `a[href]::after { content: " (" attr(href) ")" }`
- Exclui âncoras e e-mails do URL mostrado

---

## Referência Rápida de Composição

Exemplos de como combinar classes para casos comuns:

```html
<!-- Card de destaque com borda neon e fade de entrada -->
<div class="card-standard border-neon anim-slide-up hover-lift">…</div>

<!-- Grid de cards responsivo -->
<div class="grid grid--auto grid--auto-sm">
  <div class="card-standard">…</div>
  <div class="card-standard">…</div>
</div>

<!-- Bloco de código com título e saída -->
<div class="code-container rounded-md border overflow-hidden">
  <div class="code-header">Exemplo JavaScript</div>
  <pre class="example"><span class="keyword">const</span> x = <span class="num">42</span>;</pre>
  <div class="output-container"><strong>Saída:</strong> 42</div>
</div>

<!-- Tag inline em texto -->
<p>Tecnologias: <span class="badge">React</span> <span class="badge">TypeScript</span></p>

<!-- Frase de destaque no final de seção -->
<p class="frase-destaque">
  <svg>…ícone…</svg>
  "Mensagem motivacional ou conclusão importante."
</p>

<!-- Formulário de tooltip acessível -->
<span class="term" tabindex="0" aria-expanded="false">
  API
  <span class="hint">
    <strong class="hint-title">API</strong>
    Application Programming Interface — contrato entre sistemas.
  </span>
</span>
```
