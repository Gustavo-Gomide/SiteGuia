# Template de Página — Site Guia

Referência completa para criar ou revisar páginas do Site Guia. Leia do início ao fim antes de produzir qualquer `.html`.

---

## Índice

1. [Filosofia do Site](#1-filosofia-do-site)
2. [Estrutura de Arquivos](#2-estrutura-de-arquivos)
3. [Boilerplate — `<head>`](#3-boilerplate--head)
4. [Boilerplate — `<body>` (overlays + includes)](#4-boilerplate--body-overlays--includes)
5. [Bloco de Título — `.Colored_border_anim_card_box`](#5-bloco-de-título--colored_border_anim_card_box)
6. [Hero da Página — `.page-header`](#6-hero-da-página--page-header)
7. [Estrutura de Seções e Títulos](#7-estrutura-de-seções-e-títulos)
8. [Progressão do Conteúdo — do Básico ao Avançado](#8-progressão-do-conteúdo--do-básico-ao-avançado)
9. [Referências Acadêmicas](#9-referências-acadêmicas)
10. [Links e Navegação Interna](#10-links-e-navegação-interna)
11. [Callout de Encerramento](#11-callout-de-encerramento)
12. [Includes de Partials](#12-includes-de-partials)
13. [Regras Gerais e Proibições](#13-regras-gerais-e-proibições)
14. [Checklist Final](#14-checklist-final)

---

## 1. Filosofia do Site

O Site Guia é um recurso educacional técnico que cobre tópicos de programação, ciência da computação e tecnologia. Cada página deve:

- Ser **autossuficiente**: o leitor não precisa sair da página para entender o conceito básico.
- Ter **profundidade progressiva**: começa pelo conceito mais fundamental e avança até detalhes práticos e avançados.
- Ser **academicamente embasada**: citações de livros e pesquisas validam as afirmações.
- Usar **somente o sistema de design do site**: zero estilos inline arbitrários, zero bibliotecas externas de UI.

---

## 2. Estrutura de Arquivos

Cada página é um arquivo `.html` dentro de `html/<categoria>/`. O caminho reflete a hierarquia do tema:

```
html/
  ferramentas_e_praticas/
    introducao.html          ← página de visão geral da categoria
    terminal.html
    gerenciadores_pacotes/
      npm.html
      pip.html
  programacao/
    paradigmas.html
    ...
```

**Regra:** copie o arquivo `html/Site/guia_estilos.html` como ponto de partida. Ele contém todos os exemplos de componentes disponíveis. Apague o que não usar e preencha com o conteúdo real.

---

## 3. Boilerplate — `<head>`

Copie exatamente. Altere apenas `<meta name="description">` e `<title>`.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="color-scheme" content="dark light" />
  <meta name="description" content="Descrição concisa da página — Site Guia." />
  <link rel="preload" href="/css/base.css" as="style" fetchpriority="high" />
  <link rel="stylesheet" href="/css/base.css" />
  <link rel="icon" href="/imagens/favicon/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/imagens/favicon/favicon.png">
  <link rel="preload" href="/js/main.js" as="script">
  <script src="/js/main.js" defer></script>
  <title>Nome do Tópico | Site Guia</title>
</head>
```

### Regras do `<head>`

| Item | Regra |
|---|---|
| `<title>` | Formato: `Tópico \| Site Guia` — Ex: `Paradigmas \| Site Guia` |
| `main.js` | `defer` **somente no `<head>`**. Nunca repetir no final do `<body>` |
| CSS extra | Não adicione `<link>` para CSS externo. Todo o CSS está em `base.css` |
| JS extra | Não adicione scripts de terceiros sem aprovação explícita |
| `color-scheme` | Sempre `dark light` — o JS aplica a classe de tema no `<body>` |

---

## 4. Boilerplate — `<body>` (overlays + includes)

Logo após `<body>`, antes de qualquer conteúdo visível, coloque os overlays de navegação, os botões de menu e o header via include:

```html
<body>
  <div class="nav-overlay"></div>
  <div class="nav-interno-overlay"></div>
  <button class="menu-toggle" title="Abrir/fechar navegação">
    <span class="menu-icon">☰</span><span class="close-icon">&ltimes;</span>
  </button>
  <button class="menu-interno-toggle" title="Abrir/fechar menu interno">
    <span class="menu-icon">☰</span><span class="close-icon">&rtimes;</span>
  </button>
  <div data-include="/html/Site/partials/header.html"></div>

  <main class="main-content">
    <div class="content-area">

      <!-- CONTEÚDO DA PÁGINA AQUI -->

    </div><!-- /content-area -->
  </main>

  <div data-include="/html/Site/partials/footer.html"></div>
</body>
```

### Por que esses elementos?

| Elemento | Função |
|---|---|
| `.nav-overlay` | Escurece o fundo quando o menu lateral está aberto |
| `.nav-interno-overlay` | Escurece o fundo quando o menu interno está aberto |
| `.menu-toggle` | Botão hambúrguer que controla o navbar lateral global |
| `.menu-interno-toggle` | Botão que controla o navbar interno da página |
| `data-include="...header"` | Injeta o header global (logo, navbar, toggle de tema) |
| `main.main-content` | Container principal; `margin-top: 80px` compensa o header fixo |
| `.content-area` | Área de conteúdo com animação `fadeInUp` na entrada |
| `data-include="...footer"` | Injeta o rodapé global |

> **Nunca omita** os overlays e os botões de menu. Sem eles, o JS não consegue controlar o estado dos menus.

---

## 5. Bloco de Título — `.Colored_border_anim_card_box`

**Obrigatório. Primeiro elemento dentro de `.content-area`.**

```html
<div class="Colored_border_anim_card_box">
  <p><strong>Nome do Tópico</strong></p>
</div>
```

- É o cartão com borda animada neon que identifica visualmente a página.
- O texto dentro de `<strong>` é o nome exato do tópico (igual ao `<title>`).
- Não adicione subtítulo, ícone nem outros elementos dentro deste `<div>`. Ele é minimalista por design.

---

## 6. Hero da Página — `.page-header`

**Obrigatório. Primeira `<section>` após o card de título.**

```html
<section>
  <h2 id="hero" class="section-title">Nome do Tópico</h2>

  <div class="page-header">
    <div class="logo logo--lg page-icon" role="img" aria-label="Dragão do Site Guia"></div>
    <h1>Título Principal Descritivo</h1>
    <p>Subtítulo: uma frase curta que resume o escopo da página.</p>
  </div>

  <p class="intro-highlight">
    Frase de introdução em destaque. Deve ser a síntese mais importante do tópico — o que o leitor vai aprender e por que isso importa.
  </p>

  <div class="section-divider"></div>
</section>
```

### Regras do Hero

| Item | Regra |
|---|---|
| Logo | Use `<div class="logo logo--lg page-icon">`. **Nunca use `<img>` para o dragão.** |
| `<h1>` | Um por página. Vai no hero. Todas as demais seções usam `<h2>` com `.section-title` |
| `intro-highlight` | Parágrafo curto (1–3 frases). Deve capturar o conceito central sem tecnicidades |
| `section-divider` | Separa visualmente o hero do corpo do conteúdo. Use sempre ao final do hero |
| Emoji | Proibido como ícone. Use `<span data-svg="nome">` para ícones inline |

---

## 7. Estrutura de Seções e Títulos

Cada bloco temático é uma `<section>`. O JS le as seções e os `<h2>` com `id` para montar o navbar interno automaticamente.

```html
<section>
  <h2 id="slug-unico" class="section-title">Título da Seção</h2>

  <p>Parágrafo de texto...</p>

  <!-- cards, tabelas, callouts, código, etc. -->

  <div class="section-divider"></div>
</section>
```

### Hierarquia de Títulos

| Tag | Onde usar |
|---|---|
| `<h1>` | Apenas no hero. Um por página |
| `<h2 id="..." class="section-title">` | Título de cada seção principal. O `id` é obrigatório para o navbar interno |
| `<h3>` | Subseção dentro de uma seção. Pode usar `.panel-title` para h3 dentro de painéis |
| `<h4>` | Detalhe profundo. Use com parcimônia |

### `id` dos Títulos

- Use kebab-case minúsculo: `id="o-que-e"`, `id="como-funciona"`, `id="casos-de-uso"`.
- O id deve refletir o conteúdo: o navbar interno exibirá esse texto como link.
- Nunca duplique ids na mesma página.

---

## 8. Progressão do Conteúdo — do Básico ao Avançado

Esta é a regra mais importante de conteúdo. Toda página deve seguir uma progressão pedagógica clara.

### Ordem Recomendada de Seções

```
1.  hero           — o que é, por que importa (1 section)
2.  conceitos      — definição formal, origem, contexto histórico
3.  como-funciona  — mecanismo interno, passo a passo
4.  tipos / variações — categorias, subtipos, comparações
5.  sintaxe / uso  — exemplos práticos com código
6.  casos-de-uso   — quando usar, quando não usar
7.  avancado       — otimizações, edge cases, padrões complexos
8.  ecossistema    — ferramentas, libs, runtimes relacionados
9.  comparacao     — lado a lado com tecnologias similares
10. referencias    — lista de fontes acadêmicas e oficiais
[callout final]    — frase de impacto + links relacionados
```

> Nem toda página precisa de todas as seções. Adapte ao tópico. Mas **nunca pule da definição direto para o avançado**.

### Escrita das Seções

**Seção básica (conceitos, o que é):**
- Defina com linguagem acessível, como se o leitor não conhecesse o tema.
- Use uma analogia do mundo real antes de qualquer jargão técnico.
- Cite uma fonte canônica (livro, RFC, especificação oficial).

```html
<section>
  <h2 id="o-que-e" class="section-title">O que é X?</h2>
  <p>
    X é um mecanismo que... [definição simples]. Pense como... [analogia].
  </p>
  <p>
    Segundo <strong>Autor (Ano)</strong>, <em>"citação direta"</em>.
  </p>
  <div class="callout">
    <p>
      <span data-svg="info" aria-hidden="true"></span>
      Destaque de informação importante para o leitor iniciante.
    </p>
  </div>
  <div class="section-divider"></div>
</section>
```

**Seção intermediária (como funciona, syntax):**
- Apresente diagramas com `<canvas>` ou `<svg>` inline. Nunca use `<img>` para diagramas conceituais.
- Blocos de código usam `<pre class="example">` com highlighting de sintaxe via classes.
- Explique o código linha a linha após o bloco, não dentro dos comentários do código.

```html
<section>
  <h2 id="como-funciona" class="section-title">Como Funciona</h2>
  <p>Explicação do mecanismo...</p>

  <div class="code-container rounded-md border overflow-hidden">
    <div class="code-header">exemplo.linguagem</div>
    <pre class="example"><span class="kw">function</span> <span class="tp">nome</span>() {
  <span class="kw">return</span> <span class="num">42</span>; <span class="com">// valor de retorno</span>
}</pre>
  </div>

  <p>No exemplo acima, <code class="code-inline">nome()</code> retorna...</p>
  <div class="section-divider"></div>
</section>
```

**Seção prática (passo a passo real / troubleshooting):**
- Mostre de onde cada informação vem (comando/tela/campo exato), não apenas o resultado final.
- Inclua uma validação curta do resultado (o que deve acontecer se estiver correto).
- Use blocos copiáveis (`.code-container` + `.code-block`) e explique fora do `<pre>` usando `.note`.
- Evite explicações do tipo “imagine que…”. Prefira demonstrações reproduzíveis; quando não der, explicite a suposição.

Exemplo de estrutura para procedimento:

```html
<div class="code-container rounded-md border overflow-hidden">
  <div class="code-header">Comando / saída</div>
  <pre class="code-block">$ comando --exemplo
campo_A: valor
campo_B: valor</pre>
</div>

<p class="note"><strong>Extraia:</strong> campo_A (o que significa), campo_B (o que significa).</p>
<p class="note"><strong>Valide:</strong> qual resultado/erro esperado confirma que está certo.</p>
```

**Seção avançada:**
- Assuma que o leitor já passou pelas seções anteriores.
- Pode referenciar conceitos das seções básicas sem reexplicar.
- Use `<div class="panel">` para isolar detalhes técnicos densos.
- Inclua um `callout` de aviso se o conteúdo tiver armadilhas comuns.

```html
<section>
  <h2 id="avancado" class="section-title">Tópicos Avançados</h2>
  <p>Para quem já domina o básico...</p>

  <div class="panel">
    <h3 class="panel-title">Otimização X</h3>
    <p>Detalhe técnico denso...</p>
  </div>

  <div class="callout callout--warning">
    <p>
      <span data-svg="alerta" aria-hidden="true"></span>
      Atenção: este padrão pode causar X em cenários Y.
    </p>
  </div>
  <div class="section-divider"></div>
</section>
```

### Classes de Código e Highlighting

Use dentro de `<pre class="example">` ou `<div class="ide-content">`:

| Classe | O que destaca |
|---|---|
| `.kw` / `.keyword` | Palavras-chave da linguagem (`function`, `class`, `return`) |
| `.tp` | Tipos, identificadores, nomes de função |
| `.str` / `.string` | Strings e valores literais de texto |
| `.num` | Números |
| `.com` / `.comment` | Comentários |

Para código inline em prosa: `<code class="code-inline">nome</code>`.

---

## 9. Referências Acadêmicas

**Obrigatório em toda página.** Fica na penúltima seção, logo antes do callout final.

```html
<section>
  <h2 id="referencias" class="section-title">Referências</h2>

  <div class="panel">
    <ul>
      <li>
        SOBRENOME, Nome. <strong>Título do Livro</strong>. Edição. Editora, Ano.
      </li>
      <li>
        AUTOR, Nome. <strong>Título do Artigo</strong>. Conferência/Periódico, Ano.
        Disponível em: <a href="https://url.exemplo" target="_blank" rel="noopener">url.exemplo</a>
      </li>
    </ul>
  </div>
</section>
```

### Regras de Referências

- Use formatação **ABNT** simplificada (Sobrenome, Nome. **Título**. Editora, Ano).
- Pelo menos **3 referências** por página. Páginas avançadas devem ter mais.
- Fontes primárias têm prioridade: especificações oficiais, RFCs, papers originais, livros canônicos.
- Links externos: sempre `target="_blank" rel="noopener"`.
- Não cite Wikipédia como referência primária — use as fontes que a Wikipedia cita.

---

## 10. Links e Navegação Interna

### Links para Outras Páginas do Site

Use `<ul class="link-list">` com `<a class="link-card">` para listas de links relacionados:

```html
<ul class="link-list">
  <li>
    <a href="/html/categoria/topico.html" class="link-card">
      <span data-svg="seta-direita" aria-hidden="true"></span>
      Nome do Tópico
    </a>
  </li>
  <li>
    <a href="/html/categoria/outro.html" class="link-card">
      <span data-svg="seta-direita" aria-hidden="true"></span>
      Outro Tópico
    </a>
  </li>
</ul>
```

### Media Cards (recursos externos)

Para indicar livros, cursos, vídeos, documentações:

```html
<div class="media-grid">
  <div class="media-card">
    <div class="media-card-body">
      <span class="tag tag--accent">Livro</span>
      <h3>Título do Recurso</h3>
      <p>Breve descrição do recurso.</p>
    </div>
    <div class="media-card-footer">
      <a href="https://url" target="_blank" rel="noopener" class="btn">Acessar</a>
    </div>
  </div>
</div>
```

---

## 11. Callout de Encerramento

**Obrigatório. Último elemento dentro de `.content-area`, após todas as `<section>`.**

Diferente das seções, o callout final é uma `<div>` direta (não `<section>`):

```html
<div class="callout">
  <p>Continue explorando os tópicos relacionados abaixo.</p>
  <p class="frase-destaque">
    <span data-svg="estrela" aria-hidden="true"></span>
    "Citação técnica ou frase de impacto relevante para o tema desta página."
    — Autor, Obra
  </p>
</div>
```

### Regras do Callout Final

| Item | Regra |
|---|---|
| Posição | Último elemento dentro de `.content-area`. Depois dele só fecha `</div>` e `</main>` |
| `frase-destaque` | Use uma citação real de um autor canônico do tema, ou uma síntese impactante do conteúdo |
| SVG `estrela` | Use `data-svg="estrela"` no ícone. Nunca use emoji ⭐ |
| Links | Pode incluir `<ul class="link-list">` antes da `frase-destaque` para indicar próximas páginas |

---

## 12. Includes de Partials

O sistema de includes é controlado pelo atributo `data-include` interpretado pelo `include.js` (carregado via `main.js`).

### Partials Disponíveis

| Partial | Caminho | O que injeta |
|---|---|---|
| Header global | `/html/Site/partials/header.html` | Logo, navbar lateral, toggle de tema |
| Footer global | `/html/Site/partials/footer.html` | Rodapé com links e créditos |

### Uso

```html
<!-- Header — logo após os botões de menu -->
<div data-include="/html/Site/partials/header.html"></div>

<!-- Footer — logo antes de </body> -->
<div data-include="/html/Site/partials/footer.html"></div>
```

**Regras:**
- Sempre use caminhos absolutos a partir da raiz do site (`/html/...`).
- Não crie partials novos sem avaliar se o conteúdo realmente pertence ao header/footer global.
- O header já inclui toda a lógica de tema, navbar e SVG registry. Não duplique esses scripts.

---

## 13. Regras Gerais e Proibições

### Proibido

| O que | Por quê |
|---|---|
| `style="..."` inline arbitrário | Quebra a consistência do sistema de design. Use classes CSS |
| `<img>` para o logo dragão | O logo é um `<div class="logo ...">` controlado por `mask-image` para suporte a tema |
| `body class="theme-dark"` no HTML | O tema é aplicado pelo JS na carga. Forçar no HTML causa flash indesejado |
| Emoji como ícone (`⭐`, `✅`, `🔧`) | Use `<span data-svg="nome" aria-hidden="true">` para ícones do sistema |
| `<img>` para diagramas conceituais | Use `<canvas>` ou `<svg>` inline para diagrams que devem herdar cores do tema |
| `<span>` para componentes de bloco | `.card`, `.panel`, `.callout`, `.message-block` são elementos de bloco — use `<div>` |
| `<script src="main.js">` no `</body>` | O `main.js` vai **somente no `<head>`** com `defer`. Nunca repita |
| IDs duplicados | Cada `id` deve ser único na página |
| Links sem `rel="noopener"` | Todo `target="_blank"` externo precisa de `rel="noopener"` por segurança |

### Permitido e Recomendado

| O que | Quando usar |
|---|---|
| `style="--token: valor"` | Para sobrescrever CSS custom properties (tokens) por elemento. Ex: `style="--reveal-delay: 200ms"` |
| `data-reveal="tipo"` | Para ativar animação de scroll reveal no elemento |
| `data-reveal-once` | Para animar apenas uma vez (não reverter ao sair da viewport) |
| `aria-label`, `aria-hidden` | Sempre em SVGs e elementos decorativos |
| `<abbr title="...">` | Para siglas, acrônimos e termos pouco óbvios na primeira ocorrência (use `title` curto). **Não use dentro de `<pre>`/`<code>`** (preserve copiar/colar) |
| `<strong>` e `<em>` | Para ênfase semântica. Não use apenas para estilo visual |

---

## 14. Checklist Final

Antes de considerar a página pronta, verifique:

### Estrutura

- [ ] `<head>` completo com `charset`, `viewport`, `color-scheme`, `description`, `base.css`, `favicon`, `main.js defer`
- [ ] `<title>` no formato `Tópico | Site Guia`
- [ ] Overlays (`.nav-overlay`, `.nav-interno-overlay`) presentes
- [ ] Botões `.menu-toggle` e `.menu-interno-toggle` presentes
- [ ] `data-include` do header presente
- [ ] `data-include` do footer presente (antes de `</body>`)
- [ ] `.content-area` contém todo o conteúdo da página

### Conteúdo

- [ ] `.Colored_border_anim_card_box` é o primeiro elemento dentro de `.content-area`
- [ ] Hero com `.page-header`, `<h1>`, subtítulo, `.intro-highlight` e `.section-divider`
- [ ] Progressão básico → intermediário → avançado respeitada
- [ ] Pelo menos uma seção explicando "o que é" antes de "como usar"
- [ ] Todos os `<h2>` de seção têm `id` único e `class="section-title"`
- [ ] Seção `#referencias` com `<div class="panel"><ul>` com mínimo 3 fontes
- [ ] Callout final com `.frase-destaque` e ícone `data-svg="estrela"`

### Qualidade

- [ ] Zero `style=""` inline (exceto tokens CSS com `--`)
- [ ] Zero emoji como ícone
- [ ] Zero `<img>` para diagramas de conceito (use `<svg>` ou `<canvas>`)
- [ ] Zero `<span>` para componentes de bloco
- [ ] Logo do dragão usa `<div class="logo ...">` e não `<img>`
- [ ] Links externos têm `target="_blank" rel="noopener"`
- [ ] SVGs decorativos têm `aria-hidden="true"`
- [ ] SVGs informativos têm `aria-label="..."`
- [ ] Exemplos/saídas de terminal são copiáveis e evitam caracteres problemáticos (prefira `->` ou entidades HTML como `&rarr;` em vez de setas Unicode)

---

## Esqueleto Mínimo Completo

Copie e preencha. Apague as seções que não usar.

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="color-scheme" content="dark light" />
  <meta name="description" content="Descrição da página — Site Guia." />
  <link rel="preload" href="/css/base.css" as="style" fetchpriority="high" />
  <link rel="stylesheet" href="/css/base.css" />
  <link rel="icon" href="/imagens/favicon/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/imagens/favicon/favicon.png">
  <link rel="preload" href="/js/main.js" as="script">
  <script src="/js/main.js" defer></script>
  <title>Tópico | Site Guia</title>
</head>
<body>
  <div class="nav-overlay"></div>
  <div class="nav-interno-overlay"></div>
  <button class="menu-toggle" title="Abrir/fechar navegação">
    <span class="menu-icon">☰</span><span class="close-icon">&ltimes;</span>
  </button>
  <button class="menu-interno-toggle" title="Abrir/fechar menu interno">
    <span class="menu-icon">☰</span><span class="close-icon">&rtimes;</span>
  </button>
  <div data-include="/html/Site/partials/header.html"></div>

  <main class="main-content">
    <div class="content-area">

      <!-- 1. TÍTULO -->
      <div class="Colored_border_anim_card_box">
        <p><strong>Tópico</strong></p>
      </div>

      <!-- 2. HERO -->
      <section>
        <h2 id="hero" class="section-title">Tópico</h2>
        <div class="page-header">
          <div class="logo logo--lg page-icon" role="img" aria-label="Dragão do Site Guia"></div>
          <h1>Título Descritivo do Tópico</h1>
          <p>Subtítulo: frase curta sobre o escopo.</p>
        </div>
        <p class="intro-highlight">Síntese do que o leitor vai aprender e por que importa.</p>
        <div class="section-divider"></div>
      </section>

      <!-- 3. CONCEITO BÁSICO -->
      <section>
        <h2 id="o-que-e" class="section-title">O que é?</h2>
        <p>Definição simples. Analogia. Contexto.</p>
        <div class="callout">
          <p><span data-svg="info" aria-hidden="true"></span> Informação chave para o leitor iniciante.</p>
        </div>
        <div class="section-divider"></div>
      </section>

      <!-- 4. COMO FUNCIONA -->
      <section>
        <h2 id="como-funciona" class="section-title">Como Funciona</h2>
        <p>Mecanismo interno, passo a passo.</p>
        <div class="code-container rounded-md border overflow-hidden">
          <div class="code-header">exemplo.ext</div>
          <pre class="example"><span class="com">// código de exemplo</span></pre>
        </div>
        <div class="section-divider"></div>
      </section>

      <!-- 5. CASOS DE USO (intermediário) -->
      <section>
        <h2 id="casos-de-uso" class="section-title">Casos de Uso</h2>
        <p>Quando usar. Exemplos reais.</p>
        <div class="grid-cards">
          <div class="card">
            <h3>Caso A</h3>
            <p>Descrição.</p>
          </div>
          <div class="card">
            <h3>Caso B</h3>
            <p>Descrição.</p>
          </div>
        </div>
        <div class="section-divider"></div>
      </section>

      <!-- 6. AVANÇADO -->
      <section>
        <h2 id="avancado" class="section-title">Tópicos Avançados</h2>
        <p>Para quem já domina o básico.</p>
        <div class="panel">
          <h3 class="panel-title">Detalhe Avançado</h3>
          <p>Conteúdo técnico denso.</p>
        </div>
        <div class="section-divider"></div>
      </section>

      <!-- 7. REFERÊNCIAS -->
      <section>
        <h2 id="referencias" class="section-title">Referências</h2>
        <div class="panel">
          <ul>
            <li>SOBRENOME, Nome. <strong>Título</strong>. Editora, Ano.</li>
            <li>SOBRENOME, Nome. <strong>Título</strong>. Editora, Ano.</li>
            <li>SOBRENOME, Nome. <strong>Título</strong>. Editora, Ano.</li>
          </ul>
        </div>
      </section>

      <!-- 8. CALLOUT FINAL (obrigatório) -->
      <div class="callout">
        <p>Continue explorando os tópicos relacionados.</p>
        <p class="frase-destaque">
          <span data-svg="estrela" aria-hidden="true"></span>
          "Citação de impacto." — Autor, Obra
        </p>
      </div>

    </div><!-- /content-area -->
  </main>

  <div data-include="/html/Site/partials/footer.html"></div>
</body>
</html>
```
