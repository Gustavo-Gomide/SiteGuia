# Knowledge Dragon — Site Guia

Site de referência técnica pessoal sobre programação, algoritmos, ciência de dados, redes, sistemas e muito mais. Construído com HTML, CSS e JS puros — sem frameworks ou dependências externas.

---

## Estrutura do projeto

```
SiteGuia/
├── css/
│   ├── base.css              # Entry point — importa todos os módulos via @import
│   ├── card.css              # Cards e variantes
│   ├── pong.css              # Easter egg
│   ├── base/                 # Módulos CSS por componente
│   │   ├── utils.css         # Utilitários atômicos (bg-*, text-*, border-*, p-*, etc.)
│   │   ├── layout.css        # Stack, Row, Grid e containers
│   │   ├── fonts.css         # Tipografia e tamanhos
│   │   ├── cores.css         # Tokens de cor (light/dark)
│   │   ├── header.css        # Navbar lateral e header
│   │   ├── nav.css           # Nav interno (índice da página)
│   │   ├── panels.css        # .panel
│   │   ├── cards.css         # .card, .card-standard, .badge
│   │   ├── code.css          # .code-block, .ide-box, .code-container
│   │   ├── tables.css        # table, .tabela-gigante
│   │   ├── math.css          # .formula-*, .exemplo-completo, .dado-item-destaque
│   │   ├── carousel.css      # .carousel-row, .carousel__track
│   │   ├── hover.css         # .hover-glow, .hover-lift, etc.
│   │   └── ...               # demais módulos
│   └── animations/
│       └── animations.css    # .anim-*, [data-reveal] (scroll reveal)
├── js/
│   ├── main.js               # Orquestrador — carrega todos os scripts em ordem
│   ├── base.js               # Tema dark/light (toggle + persistência)
│   ├── include.js            # Injeta partials HTML via data-include
│   ├── nav_builder.js        # Constrói nav lateral a partir do nav_data.json
│   ├── nav_interno_builder.js# Constrói índice "Nesta Página" via headings com id
│   ├── navbar_lateral.js     # Comportamento do menu lateral (abrir/fechar)
│   ├── navbar_interno.js     # Comportamento do índice interno
│   ├── scroll-reveal.js      # Animações por scroll (IntersectionObserver)
│   ├── carousel.js           # Carrossel horizontal estilo Netflix
│   ├── search.js             # Busca client-side via nav_data.json
│   ├── svg_registry.js       # Injeta SVGs por data-svg="nome"
│   ├── nav_data.json         # Árvore de navegação do site
│   └── svg_registry.json     # Mapa nome → SVG string
├── html/
│   ├── index.html            # Página inicial
│   ├── Site/
│   │   ├── template_conteudo.html  # Template base para novas páginas
│   │   └── partials/
│   │       ├── header.html   # Header compartilhado (injetado via include.js)
│   │       └── footer.html   # Footer compartilhado
│   └── [categoria]/          # Páginas de conteúdo organizadas por tema
└── imagens/
    ├── favicon/
    └── logo/
```

---

## Como criar uma nova página

1. Copie `html/Site/template_conteudo.html` para a pasta da categoria correta.
2. Altere o `<title>` e o texto dentro do `.Colored_border_anim_card_box`.
3. Adicione o link da página no `js/nav_data.json` para aparecer no menu lateral.
4. Remova as seções de exemplo que não for usar.

---

## Sistema de CSS

Um único `<link rel="stylesheet" href="/css/base.css">` carrega tudo. O `base.css` é um entry point de `@import`s.

**Tokens de tema** (variáveis CSS em `:root` e `body.theme-light`):
- `--accent` — cor de destaque principal
- `--bg-primary` / `--bg-secondary` — fundos
- `--text-primary` / `--text-secondary` — textos
- `--border` / `--border-neon` — bordas
- `--card-bg-primary` / `--card-bg-secondary` — fundos de card

**Utilitários atômicos** (`utils.css`) — componha classes no HTML:
```html
<!-- card sem CSS custom -->
<div class="bg-secondary border-l-accent border-l-4 rounded-md p-md shadow-md">
```

**Scroll reveal** — adicione `data-reveal="tipo"` a qualquer elemento:
```html
<div data-reveal="slide-up">…</div>
<div data-reveal="fade" data-reveal-once>…</div>
```
Tipos: `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `scale`, `pop`.

---

## Sistema de JS

Páginas incluem apenas `main.js`. Ele detecta o base path automaticamente (funciona em `/` e em subpath do GitHub Pages) e carrega os módulos em ordem sequencial:

```
svg_registry → base → scroll-reveal → carousel → navbar_lateral →
navbar_interno → nav_interno_builder → nav_builder → search → include
```

`include.js` é sempre o último — módulos que escutam o evento `includes:loaded` já estão registrados quando ele dispara.

**Partials** — use `data-include` para injetar HTML compartilhado:
```html
<div data-include="/html/Site/partials/header.html"></div>
```

**SVGs temáticos** — use `data-svg` para injetar do registry:
```html
<span data-svg="github" aria-hidden="true"></span>
```

**Navbar interno** — `nav_interno_builder.js` indexa automaticamente todos os `<h*>` com `id` dentro de `<section>`s. Seções com múltiplos headings viram dropdowns.

---

## Regras gerais para novas páginas

- `<body>` sem `class` — o JS aplica `theme-dark` ou `theme-light` automaticamente
- Comentários HTML não devem conter tags HTML (ex: `<title>`, `</body>`) — browsers mobile podem sair do comentário prematuramente
- Não repetir `<script src="/js/main.js">` no `</body>` — vai apenas no `<head>`
- Não usar `<span>` para elementos de bloco (`.card`, `.panel`, `.callout`, `.message-block`)
- SVG inline: `fill="currentColor"` para herdar cor do tema
- Não usar `style=""` exceto para CSS variables (`style="--anim-delay: 200ms"`)
- Não usar `<img>` para o logo do dragão — use `<div class="logo …">`

---

## Deploy

O site usa caminhos absolutos (`/css/base.css`, `/js/main.js`). Para GitHub Pages:

**Opção A (recomendada)** — renomeie o repositório para `<usuario>.github.io`. O Pages servirá da raiz e todos os caminhos funcionam sem configuração.

**Opção B** — subpath (`usuario.github.io/SiteGuia`). Os scripts JS detectam o base path automaticamente via `window.__siteGuiaBase`.

O arquivo `.nojekyll` na raiz evita que o GitHub Pages filtre arquivos com prefixo `_`.
