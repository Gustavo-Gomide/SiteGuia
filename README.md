# Knowledge Dragon — Site Guia

Site em desenvolvimento eterno sobre TI, sugestões e melhorias fiquem a vontade. 

(Atualmente páginas base, conteúdo será adicionado no futuro)

🌐Link: [Site Guia](https://gustavo-gomide.github.io/SiteGuia/html/index.html)


---

## Lógica do site

1. Carrega a pagina, procura o base.css e main.js
2. Renderiza a página (devido a questões de caminho, versão online tem um delay de renderização de algumas partes)
3. Busca os partials com include.js: [header.html](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/html/Site/partials/header.html) e [footer.html](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/html/Site/partials/footer.html)
4. Busca os links no [nav_data.json](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/js/nav_data.json) e alimenta o nav entre páginas do site com o [nav_builder.js](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/js/nav_builder.js)
5. O [nav_interno_builder.js](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/js/nav_interno_builder.js) percorre a página e transforma os títulos (<h?>) com id em caminho interno e adiciona ao nav interno
6. O [svg_registry.js](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/js/svg_registry.js) coloca os svgs na pagina buscando em [svg_registry.json](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/js/svg_registry.json)
7. Por fim um pequeno mecanismo de busca [search.js](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/js/search.js) para facilitar achar a página
8. Devido ao Github Pages buscar um index.html na raiz do projeto, adicionei um index.html na raiz que serve apenas para redirecionar ao real.

---

## Como criar uma nova página

1. Copie `html/Site/guia_estilos.html`, template base + regras.
2. Altere o `<title>` e o texto dentro do `.Colored_border_anim_card_box`.
3. Adicione o link da página no `js/nav_data.json` para aparecer no menu lateral.
4. Remova as seções de exemplo que não for usar e/ou crie novas que precisar.
5. Não é obrigatorio seguir esse caminho de copia, mas ali tem o padrão do site para tudo funcionar, mudando apenas o main.
6. Para melhores informações veja: [template_pagina.md](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/docs/template_pagina.md)

---

## Sistema de CSS

Um único `<link rel="stylesheet" href="/css/base.css">` carrega tudo. O [`base.css`](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/css/base.css) é um entry point de `@import`s.

- Foi criado varios arquivos css com o objetivo de separar e facilitar encontrar e modificar. O base serve para ter liberdade de criação e modificação dos css ajustando em 1 só local.

**Tokens de tema**:
- Veja o [guia_estilos.md](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/docs/guiaEstilos.md) na pasta docs (pode estar um pouco desatualizado).

---

## Sistema de JS

Páginas incluem apenas [`main.js`](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/js/main.js). Ele detecta o base path automaticamente (funciona em `/` e em subpath do GitHub Pages) e carrega os módulos em ordem sequencial:

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
- Não usar `style=""` exceto para SVGs desenhados na página.
- Não usar `<img>` para o logo do dragão — use `<div class="logo …">`

---

## [Estrutura do projeto](https://github.com/Gustavo-Gomide/SiteGuia/blob/main/docs/estrutura.md)

```
────────────────────────────────────────────────────────────────────────────────

├── 📁 .github/
│   └── 📁 workflows/
│       └── ⚙️ deploy-pages.yml
├── 📁 MySelf/
│   └── 🌐 me.html
├── 📁 css/
│   ├── 📁 animations/
│   │   └── 🎨 animations.css
│   ├── 📁 base/
│   │   ├── 🎨 callouts.css
│   │   ├── 🎨 carousel.css
│   │   ├── 🎨 code.css
│   │   ├── 🎨 cores.css
│   │   ├── 🎨 dividers.css
│   │   ├── 🎨 fonts.css
│   │   ├── 🎨 footer.css
│   │   ├── 🎨 header.css
│   │   ├── 🎨 hover.css
│   │   ├── 🎨 layout.css
│   │   ├── 🎨 line-sep.css
│   │   ├── 🎨 link-cards.css
│   │   ├── 🎨 math.css
│   │   ├── 🎨 media-cards.css
│   │   ├── 🎨 media.css
│   │   ├── 🎨 message-block.css
│   │   ├── 🎨 panels.css
│   │   ├── 🎨 sections.css
│   │   ├── 🎨 tables.css
│   │   ├── 🎨 tags.css
│   │   ├── 🎨 tooltips.css
│   │   └── 🎨 utils.css
│   ├── 📁 draw/
│   │   └── 🎨 forms.css
│   ├── 📁 effects/
│   │   ├── 🎨 colored_border_anim.css
│   │   └── 🎨 flip_card.css
│   ├── 📁 media-query/
│   │   └── 🎨 media-query.css
│   ├── 📁 nav/
│   │   ├── 🎨 nav.css
│   │   ├── 🎨 navbar_interno.css
│   │   └── 🎨 navbar_lateral.css
│   ├── 📁 pages/
│   │   └── 🎨 rede.css
│   ├── 🎨 base.css
│   ├── 🎨 card.css
│   └── 🎨 pong.css
├── 📁 docs/
│   ├── 📝 estrutura.md
│   ├── 📝 guiaEstilos.md
│   └── 📝 template_pagina.md
├── 📁 html/
│   ├── 📁 Desenvolvimento_Jogos/
│   │   ├── 📁 assets/
│   │   │   ├── 📁 2d/
│   │   │   │   ├── 🌐 assets_animacao_2d.html
│   │   │   │   ├── 🌐 assets_design_grafico.html
│   │   │   │   ├── 🌐 assets_sprites.html
│   │   │   │   └── 🌐 assets_tilesets.html
│   │   │   ├── 📁 3d/
│   │   │   │   ├── 🌐 assets_3d_blender.html
│   │   │   │   ├── 🌐 assets_animacao.html
│   │   │   │   ├── 🌐 assets_modelagem.html
│   │   │   │   ├── 🌐 assets_rigging.html
│   │   │   │   ├── 🌐 assets_shaders.html
│   │   │   │   ├── 🌐 assets_texturizacao.html
│   │   │   │   └── 🌐 assets_uv_mapping.html
│   │   │   └── 📁 vfx_sfx/
│   │   │       ├── 🌐 assets_audio.html
│   │   │       └── 🌐 assets_efeitos_visuais.html
│   │   ├── 📁 engines/
│   │   │   ├── 📁 godot/
│   │   │   │   ├── 🌐 godot_animacoes.html
│   │   │   │   ├── 🌐 godot_csharp.html
│   │   │   │   ├── 🌐 godot_gdscript.html
│   │   │   │   └── 🌐 godot_introducao.html
│   │   │   ├── 📁 unity/
│   │   │   │   ├── 🌐 unity_animacoes.html
│   │   │   │   ├── 🌐 unity_csharp.html
│   │   │   │   ├── 🌐 unity_fisica.html
│   │   │   │   └── 🌐 unity_introducao.html
│   │   │   ├── 📁 unreal/
│   │   │   │   ├── 🌐 unreal_animacoes.html
│   │   │   │   ├── 🌐 unreal_blueprints.html
│   │   │   │   ├── 🌐 unreal_cpp.html
│   │   │   │   └── 🌐 unreal_introducao.html
│   │   │   ├── 🌐 engines_escolha.html
│   │   │   └── 🌐 engines_o_que_e.html
│   │   ├── 📁 fundamentos/
│   │   │   └── 🌐 conceitos_desenvolvimento.html
│   │   ├── 📁 publicacao/
│   │   │   ├── 🌐 publicacao_monetizacao.html
│   │   │   └── 🌐 publicacao_plataformas.html
│   │   ├── 📁 recursos/
│   │   │   ├── 🌐 comunidades_desenvolvedores.html
│   │   │   └── 🌐 recursos_online.html
│   │   └── 🌐 introducao.html
│   ├── 📁 Site/
│   │   ├── 📁 partials/
│   │   │   ├── 🌐 footer.html
│   │   │   └── 🌐 header.html
│   │   ├── 🌐 em_construcao.html
│   │   └── 🌐 guia_estilos.html
│   ├── 📁 computacao_teorica/
│   │   ├── 📁 compiladores/
│   │   │   ├── 🌐 analise_lexica.html
│   │   │   ├── 🌐 analise_semantica.html
│   │   │   ├── 🌐 analise_sintatica.html
│   │   │   ├── 🌐 geracao_codigo.html
│   │   │   ├── 🌐 interpretadores.html
│   │   │   ├── 🌐 introducao_compiladores.html
│   │   │   ├── 🌐 otimizacao.html
│   │   │   └── 🌐 representacao_intermediaria.html
│   │   ├── 📁 teoria_computacao/
│   │   │   ├── 🌐 automatos_finitos.html
│   │   │   ├── 🌐 automatos_pilha.html
│   │   │   ├── 🌐 complexidade_classes.html
│   │   │   ├── 🌐 computabilidade.html
│   │   │   ├── 🌐 decidibilidade.html
│   │   │   ├── 🌐 gramaticas.html
│   │   │   ├── 🌐 linguagens_formais.html
│   │   │   ├── 🌐 maquinas_turing.html
│   │   │   ├── 🌐 p_np.html
│   │   │   └── 🌐 reducoes.html
│   │   ├── 🌐 introducao.html
│   │   └── 🌐 paradigmas.html
│   ├── 📁 dados_e_ia/
│   │   ├── 📁 big_data/
│   │   │   ├── 🌐 data_lake.html
│   │   │   ├── 🌐 data_warehouse.html
│   │   │   ├── 🌐 hadoop.html
│   │   │   ├── 🌐 introducao_big_data.html
│   │   │   ├── 🌐 kafka.html
│   │   │   └── 🌐 spark.html
│   │   ├── 📁 ciencia_dados/
│   │   │   ├── 🌐 ciclo_dados.html
│   │   │   ├── 🌐 coleta_dados.html
│   │   │   ├── 🌐 exploracao_dados.html
│   │   │   ├── 🌐 introducao_ds.html
│   │   │   ├── 🌐 limpeza_dados.html
│   │   │   └── 🌐 visualizacao.html
│   │   ├── 📁 deep_learning/
│   │   │   ├── 🌐 attention.html
│   │   │   ├── 🌐 autoencoders.html
│   │   │   ├── 🌐 backpropagation.html
│   │   │   ├── 🌐 cnn.html
│   │   │   ├── 🌐 gans.html
│   │   │   ├── 🌐 introducao_dl.html
│   │   │   ├── 🌐 lstm.html
│   │   │   ├── 🌐 redes_neurais.html
│   │   │   ├── 🌐 rnn.html
│   │   │   └── 🌐 transformers.html
│   │   ├── 📁 ferramentas/
│   │   │   ├── 🌐 jupyter.html
│   │   │   ├── 🌐 keras.html
│   │   │   ├── 🌐 matplotlib.html
│   │   │   ├── 🌐 numpy.html
│   │   │   ├── 🌐 pandas.html
│   │   │   ├── 🌐 python_ds.html
│   │   │   ├── 🌐 pytorch.html
│   │   │   ├── 🌐 scikit_learn.html
│   │   │   ├── 🌐 seaborn.html
│   │   │   └── 🌐 tensorflow.html
│   │   ├── 📁 machine_learning/
│   │   │   ├── 📁 avaliacao/
│   │   │   │   ├── 🌐 hyperparametros.html
│   │   │   │   ├── 🌐 metricas.html
│   │   │   │   ├── 🌐 overfitting.html
│   │   │   │   └── 🌐 validacao_cruzada.html
│   │   │   ├── 📁 ensemble/
│   │   │   │   ├── 🌐 bagging.html
│   │   │   │   ├── 🌐 boosting.html
│   │   │   │   └── 🌐 xgboost.html
│   │   │   ├── 📁 nao_supervisionado/
│   │   │   │   ├── 🌐 clustering.html
│   │   │   │   ├── 🌐 dbscan.html
│   │   │   │   ├── 🌐 kmeans.html
│   │   │   │   ├── 🌐 pca.html
│   │   │   │   └── 🌐 reducao_dimensionalidade.html
│   │   │   ├── 📁 supervisionado/
│   │   │   │   ├── 🌐 arvores_decisao.html
│   │   │   │   ├── 🌐 knn.html
│   │   │   │   ├── 🌐 naive_bayes.html
│   │   │   │   ├── 🌐 random_forest.html
│   │   │   │   ├── 🌐 regressao_linear.html
│   │   │   │   ├── 🌐 regressao_logistica.html
│   │   │   │   └── 🌐 svm.html
│   │   │   ├── 🌐 introducao_ml.html
│   │   │   └── 🌐 tipos_aprendizado.html
│   │   ├── 📁 nlp/
│   │   │   ├── 🌐 analise_sentimento.html
│   │   │   ├── 🌐 embeddings.html
│   │   │   ├── 🌐 introducao_nlp.html
│   │   │   ├── 🌐 llms.html
│   │   │   ├── 🌐 ner.html
│   │   │   ├── 🌐 preprocessamento_texto.html
│   │   │   ├── 🌐 tokenizacao.html
│   │   │   └── 🌐 word2vec.html
│   │   └── 🌐 introducao.html
│   ├── 📁 embedded_iot/
│   │   ├── 📁 atuadores/
│   │   │   ├── 🌐 displays.html
│   │   │   ├── 🌐 motores.html
│   │   │   ├── 🌐 reles.html
│   │   │   └── 🌐 servos.html
│   │   ├── 📁 comunicacao/
│   │   │   ├── 🌐 bluetooth.html
│   │   │   ├── 🌐 bluetooth_le.html
│   │   │   ├── 🌐 i2c.html
│   │   │   ├── 🌐 lorawan.html
│   │   │   ├── 🌐 mqtt.html
│   │   │   ├── 🌐 pwm.html
│   │   │   ├── 🌐 spi.html
│   │   │   ├── 🌐 uart.html
│   │   │   ├── 🌐 wifi_iot.html
│   │   │   └── 🌐 zigbee.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 arquitetura_embarcada.html
│   │   │   ├── 🌐 sistemas_embarcados.html
│   │   │   └── 🌐 tempo_real.html
│   │   ├── 📁 microcontroladores/
│   │   │   ├── 📁 arduino/
│   │   │   │   ├── 🌐 arduino_ide.html
│   │   │   │   ├── 🌐 arduino_intro.html
│   │   │   │   ├── 🌐 arduino_programacao.html
│   │   │   │   └── 🌐 arduino_projetos.html
│   │   │   ├── 📁 esp/
│   │   │   │   ├── 🌐 esp32_intro.html
│   │   │   │   ├── 🌐 esp8266.html
│   │   │   │   └── 🌐 esp_wifi.html
│   │   │   ├── 📁 pic/
│   │   │   │   ├── 🌐 pic_intro.html
│   │   │   │   └── 🌐 pic_programacao.html
│   │   │   ├── 📁 raspberry_pi/
│   │   │   │   ├── 🌐 rpi_gpio.html
│   │   │   │   ├── 🌐 rpi_intro.html
│   │   │   │   └── 🌐 rpi_projetos.html
│   │   │   └── 🌐 introducao_ucs.html
│   │   ├── 📁 projetos/
│   │   │   ├── 🌐 automacao_residencial.html
│   │   │   ├── 🌐 monitoramento_ambiental.html
│   │   │   └── 🌐 wearables.html
│   │   ├── 📁 rtos/
│   │   │   ├── 🌐 freertos.html
│   │   │   ├── 🌐 introducao_rtos.html
│   │   │   └── 🌐 tarefas_tempo_real.html
│   │   ├── 📁 sensores/
│   │   │   ├── 🌐 acelerometro.html
│   │   │   ├── 🌐 distancia.html
│   │   │   ├── 🌐 luz.html
│   │   │   ├── 🌐 movimento.html
│   │   │   ├── 🌐 temperatura.html
│   │   │   ├── 🌐 tipos_sensores.html
│   │   │   └── 🌐 umidade.html
│   │   └── 🌐 introducao.html
│   ├── 📁 engenharia_software/
│   │   ├── 📁 design/
│   │   │   ├── 📁 arquitetura/
│   │   │   │   ├── 🌐 ddd.html
│   │   │   │   ├── 🌐 event_driven.html
│   │   │   │   ├── 🌐 hwexagonal.html
│   │   │   │   ├── 🌐 microservicos.html
│   │   │   │   ├── 🌐 monolito.html
│   │   │   │   ├── 🌐 mvc.html
│   │   │   │   └── 🌐 mvvm.html
│   │   │   ├── 📁 design_patterns/
│   │   │   │   ├── 📁 behavioral/
│   │   │   │   │   ├── 🌐 chain_of_responsibility.html
│   │   │   │   │   ├── 🌐 command.html
│   │   │   │   │   ├── 🌐 interpreter.html
│   │   │   │   │   ├── 🌐 iterator.html
│   │   │   │   │   ├── 🌐 mediator.html
│   │   │   │   │   ├── 🌐 memento.html
│   │   │   │   │   ├── 🌐 observer.html
│   │   │   │   │   ├── 🌐 state.html
│   │   │   │   │   ├── 🌐 strategy.html
│   │   │   │   │   ├── 🌐 template_method.html
│   │   │   │   │   └── 🌐 visitor.html
│   │   │   │   ├── 📁 creational/
│   │   │   │   │   ├── 🌐 abstract_factory.html
│   │   │   │   │   ├── 🌐 builder.html
│   │   │   │   │   ├── 🌐 factory.html
│   │   │   │   │   ├── 🌐 prototype.html
│   │   │   │   │   └── 🌐 singleton.html
│   │   │   │   ├── 📁 structural/
│   │   │   │   │   ├── 🌐 adapter.html
│   │   │   │   │   ├── 🌐 bridge.html
│   │   │   │   │   ├── 🌐 composite.html
│   │   │   │   │   ├── 🌐 decorator.html
│   │   │   │   │   ├── 🌐 facade.html
│   │   │   │   │   ├── 🌐 flyweight.html
│   │   │   │   │   └── 🌐 proxy.html
│   │   │   │   └── 🌐 introducao_patterns.html
│   │   │   ├── 🌐 clean_architecture.html
│   │   │   ├── 🌐 clean_code.html
│   │   │   ├── 🌐 dry_kiss_yagni.html
│   │   │   ├── 🌐 grasp.html
│   │   │   ├── 🌐 principios_design.html
│   │   │   └── 🌐 solid.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 ciclo_vida.html
│   │   │   ├── 🌐 conceitos.html
│   │   │   ├── 🌐 documentacao.html
│   │   │   ├── 🌐 elicitacao.html
│   │   │   ├── 🌐 especificacao.html
│   │   │   └── 🌐 requisitos.html
│   │   ├── 📁 metodologias/
│   │   │   ├── 🌐 agile.html
│   │   │   ├── 🌐 cascata.html
│   │   │   ├── 🌐 espiral.html
│   │   │   ├── 🌐 introducao_metodologias.html
│   │   │   ├── 🌐 iterativo.html
│   │   │   ├── 🌐 kanban.html
│   │   │   ├── 🌐 lean.html
│   │   │   ├── 🌐 safe.html
│   │   │   ├── 🌐 scrum.html
│   │   │   └── 🌐 xp.html
│   │   ├── 📁 qualidade/
│   │   │   ├── 🌐 code_review.html
│   │   │   ├── 🌐 debito_tecnico.html
│   │   │   ├── 🌐 documentacao_tecnica.html
│   │   │   ├── 🌐 metricas_software.html
│   │   │   └── 🌐 refatoracao.html
│   │   ├── 📁 testes/
│   │   │   ├── 🌐 bdd.html
│   │   │   ├── 🌐 cobertura.html
│   │   │   ├── 🌐 introducao_testes.html
│   │   │   ├── 🌐 mocks_stubs.html
│   │   │   ├── 🌐 tdd.html
│   │   │   ├── 🌐 testes_aceitacao.html
│   │   │   ├── 🌐 testes_integracao.html
│   │   │   ├── 🌐 testes_performance.html
│   │   │   ├── 🌐 testes_regressao.html
│   │   │   ├── 🌐 testes_sistema.html
│   │   │   ├── 🌐 testes_unitarios.html
│   │   │   └── 🌐 tipos_testes.html
│   │   ├── 📁 uml/
│   │   │   ├── 🌐 diagrama_atividades.html
│   │   │   ├── 🌐 diagrama_casos_uso.html
│   │   │   ├── 🌐 diagrama_classes.html
│   │   │   ├── 🌐 diagrama_componentes.html
│   │   │   ├── 🌐 diagrama_estados.html
│   │   │   ├── 🌐 diagrama_implantacao.html
│   │   │   ├── 🌐 diagrama_objetos.html
│   │   │   ├── 🌐 diagrama_sequencia.html
│   │   │   └── 🌐 introducao_uml.html
│   │   └── 🌐 introducao.html
│   ├── 📁 ferramentas_e_praticas/
│   │   ├── 📁 ferramentas_build/
│   │   │   ├── 🌐 cmake.html
│   │   │   ├── 🌐 gradle.html
│   │   │   ├── 🌐 make.html
│   │   │   └── 🌐 maven.html
│   │   ├── 📁 gerenciadores_pacotes/
│   │   │   ├── 🌐 cargo.html
│   │   │   ├── 🌐 composer.html
│   │   │   ├── 🌐 npm.html
│   │   │   └── 🌐 pip.html
│   │   ├── 📁 produtividade/
│   │   │   ├── 🌐 atalhos_teclado.html
│   │   │   ├── 🌐 automatizacao.html
│   │   │   ├── 🌐 snippets.html
│   │   │   └── 🌐 templates.html
│   │   ├── 🌐 debug.html
│   │   ├── 🌐 introducao.html
│   │   └── 🌐 terminal.html
│   ├── 📁 hardware_arquitetura/
│   │   ├── 📁 arquitetura_cpu/
│   │   │   ├── 🌐 cache.html
│   │   │   ├── 🌐 ciclo_instrucao.html
│   │   │   ├── 🌐 harvard.html
│   │   │   ├── 🌐 hierarquia_memoria.html
│   │   │   ├── 🌐 multicore.html
│   │   │   ├── 🌐 pipeline.html
│   │   │   ├── 🌐 risc.html
│   │   │   ├── 🌐 superscalar.html
│   │   │   └── 🌐 von_neumann.html
│   │   ├── 📁 assembly/
│   │   │   ├── 🌐 arm.html
│   │   │   ├── 🌐 enderecamento.html
│   │   │   ├── 🌐 instrucoes.html
│   │   │   ├── 🌐 introducao_assembly.html
│   │   │   ├── 🌐 registradores.html
│   │   │   ├── 🌐 x86.html
│   │   │   └── 🌐 x86_64.html
│   │   ├── 📁 circuitos/
│   │   │   ├── 🌐 algebra_booleana.html
│   │   │   ├── 🌐 circuitos_combinacionais.html
│   │   │   ├── 🌐 circuitos_sequenciais.html
│   │   │   ├── 🌐 flip_flops.html
│   │   │   ├── 🌐 portas_logicas.html
│   │   │   └── 🌐 registradores.html
│   │   ├── 📁 componentes/
│   │   │   ├── 🌐 armazenamento.html
│   │   │   ├── 🌐 barramentos.html
│   │   │   ├── 🌐 cpu.html
│   │   │   ├── 🌐 fonte.html
│   │   │   ├── 🌐 gpu.html
│   │   │   ├── 🌐 hdd_ssd.html
│   │   │   ├── 🌐 memoria_ram.html
│   │   │   ├── 🌐 perifericos.html
│   │   │   ├── 🌐 placa_mae.html
│   │   │   └── 🌐 visao_geral.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 binario.html
│   │   │   ├── 🌐 geracoes.html
│   │   │   ├── 🌐 hexadecimal.html
│   │   │   ├── 🌐 historia_computadores.html
│   │   │   ├── 🌐 ponto_flutuante.html
│   │   │   ├── 🌐 representacao_dados.html
│   │   │   └── 🌐 sistemas_numericos.html
│   │   └── 🌐 introducao.html
│   ├── 📁 matematica/
│   │   ├── 📁 algebra_linear/
│   │   │   ├── 🌐 autovalores.html
│   │   │   ├── 🌐 decomposicoes.html
│   │   │   ├── 🌐 determinantes.html
│   │   │   ├── 🌐 espacos_vetoriais.html
│   │   │   ├── 🌐 introducao_al.html
│   │   │   ├── 🌐 matrizes.html
│   │   │   ├── 🌐 operacoes_matrizes.html
│   │   │   ├── 🌐 operacoes_vetores.html
│   │   │   ├── 🌐 sistemas_lineares.html
│   │   │   ├── 🌐 transformacoes_lineares.html
│   │   │   └── 🌐 vetores.html
│   │   ├── 📁 calculo/
│   │   │   ├── 🌐 derivadas.html
│   │   │   ├── 🌐 equacoes_diferenciais.html
│   │   │   ├── 🌐 integras.html
│   │   │   ├── 🌐 introducao_calculo.html
│   │   │   ├── 🌐 limites.html
│   │   │   ├── 🌐 regras_derivacao.html
│   │   │   ├── 🌐 series.html
│   │   │   └── 🌐 tecnicas_integracao.html
│   │   ├── 📁 discreta/
│   │   │   ├── 🌐 combinacoes.html
│   │   │   ├── 🌐 combinatoria.html
│   │   │   ├── 🌐 funcoes.html
│   │   │   ├── 🌐 grafos_matematicos.html
│   │   │   ├── 🌐 inducao_matematica.html
│   │   │   ├── 🌐 introducao_discreta.html
│   │   │   ├── 🌐 logica_predicados.html
│   │   │   ├── 🌐 logica_proposicional.html
│   │   │   ├── 🌐 permutacoes.html
│   │   │   ├── 🌐 relacoes.html
│   │   │   ├── 🌐 teoria_conjuntos.html
│   │   │   └── 🌐 teoria_numeros.html
│   │   ├── 📁 estatistica/
│   │   │   ├── 🌐 descritiva.html
│   │   │   ├── 🌐 distribuicao_normal.html
│   │   │   ├── 🌐 distribuicoes.html
│   │   │   ├── 🌐 inferencia.html
│   │   │   ├── 🌐 medidas_centrais.html
│   │   │   ├── 🌐 medidas_dispersao.html
│   │   │   ├── 🌐 regressao_estatistica.html
│   │   │   └── 🌐 testes_hipotese.html
│   │   ├── 📁 probabilidade/
│   │   │   ├── 🌐 bayes.html
│   │   │   ├── 🌐 distribuicoes_probabilidade.html
│   │   │   ├── 🌐 probabilidade.html
│   │   │   ├── 🌐 probabilidade_condicional.html
│   │   │   └── 🌐 variaveis_aleatorias.html
│   │   ├── 🌐 introducao.html
│   │   └── 🌐 probabilidade.html
│   ├── 📁 mobile/
│   │   ├── 📁 android/
│   │   │   ├── 🌐 activities.html
│   │   │   ├── 🌐 ambiente.html
│   │   │   ├── 🌐 android_studio.html
│   │   │   ├── 🌐 componentes.html
│   │   │   ├── 🌐 fragments.html
│   │   │   ├── 🌐 intents.html
│   │   │   ├── 🌐 introducao_android.html
│   │   │   ├── 🌐 jetpack_compose.html
│   │   │   ├── 🌐 kotlin_android.html
│   │   │   ├── 🌐 layouts.html
│   │   │   ├── 🌐 publicacao_play.html
│   │   │   ├── 🌐 retrofit.html
│   │   │   ├── 🌐 room.html
│   │   │   └── 🌐 viewmodel.html
│   │   ├── 📁 cross_platform/
│   │   │   ├── 📁 flutter/
│   │   │   │   ├── 🌐 dart_basico.html
│   │   │   │   ├── 🌐 estado_flutter.html
│   │   │   │   ├── 🌐 flutter_firebase.html
│   │   │   │   ├── 🌐 flutter_intro.html
│   │   │   │   └── 🌐 widgets.html
│   │   │   ├── 📁 react_native/
│   │   │   │   ├── 🌐 rn_componentes.html
│   │   │   │   ├── 🌐 rn_estado.html
│   │   │   │   ├── 🌐 rn_intro.html
│   │   │   │   └── 🌐 rn_navegacao.html
│   │   │   ├── 🌐 introducao_cross.html
│   │   │   ├── 🌐 ionic.html
│   │   │   └── 🌐 maui.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 design_responsivo.html
│   │   │   ├── 🌐 guidelines.html
│   │   │   ├── 🌐 plataformas.html
│   │   │   └── 🌐 ux_mobile.html
│   │   ├── 📁 ios/
│   │   │   ├── 🌐 ambiente_ios.html
│   │   │   ├── 🌐 core_data.html
│   │   │   ├── 🌐 introducao_ios.html
│   │   │   ├── 🌐 networking_ios.html
│   │   │   ├── 🌐 publicacao_appstore.html
│   │   │   ├── 🌐 swift_mobile.html
│   │   │   ├── 🌐 swiftui.html
│   │   │   ├── 🌐 uikit.html
│   │   │   └── 🌐 xcode.html
│   │   ├── 📁 recursos/
│   │   │   ├── 🌐 armazenamento_local.html
│   │   │   ├── 🌐 banco_local.html
│   │   │   ├── 🌐 camera.html
│   │   │   ├── 🌐 geolocation.html
│   │   │   ├── 🌐 notificacoes_push.html
│   │   │   ├── 🌐 offline_first.html
│   │   │   └── 🌐 sensores.html
│   │   └── 🌐 introducao.html
│   ├── 📁 nuvem/
│   │   ├── 📁 ci_cd/
│   │   │   ├── 🌐 argocd.html
│   │   │   ├── 🌐 azure_pipelines.html
│   │   │   ├── 🌐 circleci.html
│   │   │   ├── 🌐 github_actions.html
│   │   │   ├── 🌐 gitlab_ci_cd.html
│   │   │   ├── 🌐 jenkins.html
│   │   │   └── 🌐 travis_ci.html
│   │   ├── 📁 cloud/
│   │   │   ├── 🌐 aws.html
│   │   │   ├── 🌐 azure.html
│   │   │   ├── 🌐 google_cloud.html
│   │   │   ├── 🌐 introducao_cloud.html
│   │   │   └── 🌐 modelos_servico.html
│   │   ├── 📁 containers/
│   │   │   ├── 🌐 docker.html
│   │   │   ├── 🌐 kubernetes.html
│   │   │   └── 🌐 virtualizacao_vs_containers.html
│   │   ├── 📁 controle_de_versao/
│   │   │   ├── 🌐 bitbucket.html
│   │   │   ├── 🌐 git.html
│   │   │   ├── 🌐 github.html
│   │   │   ├── 🌐 gitlab.html
│   │   │   ├── 🌐 introducao.html
│   │   │   ├── 🌐 perforce.html
│   │   │   ├── 🌐 pull_requests.html
│   │   │   └── 🌐 svn.html
│   │   ├── 📁 iac/
│   │   │   ├── 🌐 ansible.html
│   │   │   ├── 🌐 cloudformation.html
│   │   │   ├── 🌐 introducao_iac.html
│   │   │   ├── 🌐 pulumi.html
│   │   │   └── 🌐 terraform.html
│   │   ├── 📁 monitoramento/
│   │   │   ├── 🌐 alertas.html
│   │   │   ├── 🌐 elk_stack.html
│   │   │   ├── 🌐 grafana.html
│   │   │   ├── 🌐 introducao_observabilidade.html
│   │   │   ├── 🌐 jaeger.html
│   │   │   └── 🌐 prometheus.html
│   │   ├── 🌐 dev_ops.html
│   │   └── 🌐 introducao_a_nuvem.html
│   ├── 📁 programacao/
│   │   ├── 📁 Concorrente_Paralela/
│   │   │   ├── 🌐 concorrente.html
│   │   │   └── 🌐 paralela.html
│   │   ├── 📁 Interfaces_Graficas/
│   │   │   ├── 📁 c/
│   │   │   │   ├── 🌐 c_gtk.html
│   │   │   │   └── 🌐 c_ncurses.html
│   │   │   ├── 📁 cpp/
│   │   │   │   ├── 🌐 cpp_qt.html
│   │   │   │   └── 🌐 cpp_wxwidgets.html
│   │   │   ├── 📁 csharp/
│   │   │   │   ├── 🌐 csharp_windows_forms.html
│   │   │   │   └── 🌐 csharp_wpf.html
│   │   │   ├── 📁 dart/
│   │   │   │   └── 🌐 dart_flutter.html
│   │   │   ├── 📁 go/
│   │   │   │   ├── 🌐 go_fyne.html
│   │   │   │   └── 🌐 go_walk.html
│   │   │   ├── 📁 haxe/
│   │   │   │   ├── 🌐 haxe_heaps.html
│   │   │   │   ├── 🌐 haxe_kha.html
│   │   │   │   └── 🌐 haxe_openfl.html
│   │   │   ├── 📁 java/
│   │   │   │   ├── 🌐 java_javafx.html
│   │   │   │   └── 🌐 java_swing.html
│   │   │   ├── 📁 js/
│   │   │   │   ├── 🌐 js_electron.html
│   │   │   │   ├── 🌐 js_nwjs.html
│   │   │   │   └── 🌐 js_react_native.html
│   │   │   ├── 📁 kotlin/
│   │   │   │   ├── 🌐 kotlin_javafx.html
│   │   │   │   └── 🌐 kotlin_tornadofx.html
│   │   │   ├── 📁 lua/
│   │   │   │   ├── 🌐 lua_iup.html
│   │   │   │   └── 🌐 lua_love.html
│   │   │   ├── 📁 php/
│   │   │   │   ├── 🌐 php_livewire.html
│   │   │   │   └── 🌐 php_phpgtk.html
│   │   │   ├── 📁 python/
│   │   │   │   ├── 🌐 python_kivy.html
│   │   │   │   ├── 🌐 python_pyqt.html
│   │   │   │   └── 🌐 python_tkinter.html
│   │   │   ├── 📁 ruby/
│   │   │   │   ├── 🌐 ruby_fxruby.html
│   │   │   │   └── 🌐 ruby_shoes.html
│   │   │   ├── 📁 rust/
│   │   │   │   ├── 🌐 rust_druid.html
│   │   │   │   ├── 🌐 rust_gtk.html
│   │   │   │   ├── 🌐 rust_iced.html
│   │   │   │   └── 🌐 rust_tauri.html
│   │   │   └── 🌐 introducao.html
│   │   ├── 📁 POO/
│   │   │   ├── 🌐 classes.html
│   │   │   ├── 🌐 heranca.html
│   │   │   ├── 🌐 interfaces.html
│   │   │   ├── 🌐 introducao.html
│   │   │   └── 🌐 polimorfismo.html
│   │   ├── 📁 banco_de_dados/
│   │   │   ├── 📁 avancado/
│   │   │   │   ├── 🌐 backup_e_recuperacao.html
│   │   │   │   ├── 🌐 otimizacao_de_consultas.html
│   │   │   │   ├── 🌐 particionamento.html
│   │   │   │   ├── 🌐 plano_de_execucao.html
│   │   │   │   ├── 🌐 replicacao.html
│   │   │   │   ├── 🌐 seguranca_em_banco_de_dados.html
│   │   │   │   └── 🌐 sharding.html
│   │   │   ├── 📁 nosql/
│   │   │   │   ├── 🌐 arangodb.html
│   │   │   │   ├── 🌐 cassandra.html
│   │   │   │   ├── 🌐 couchdb.html
│   │   │   │   ├── 🌐 dynamodb.html
│   │   │   │   ├── 🌐 elasticsearch.html
│   │   │   │   ├── 🌐 firebase.html
│   │   │   │   ├── 🌐 hbase.html
│   │   │   │   ├── 🌐 introducao_ao_nosql.html
│   │   │   │   ├── 🌐 mongodb.html
│   │   │   │   ├── 🌐 neo4j.html
│   │   │   │   ├── 🌐 orientdb.html
│   │   │   │   ├── 🌐 ravendb.html
│   │   │   │   ├── 🌐 redis.html
│   │   │   │   └── 🌐 tipos_de_bancos_nosql.html
│   │   │   ├── 📁 sgbds/
│   │   │   │   ├── 🌐 mariadb.html
│   │   │   │   ├── 🌐 mysql.html
│   │   │   │   ├── 🌐 oracle_db.html
│   │   │   │   ├── 🌐 postgresql.html
│   │   │   │   ├── 🌐 sql_server.html
│   │   │   │   └── 🌐 sqlite.html
│   │   │   ├── 🌐 fundamentos.html
│   │   │   ├── 🌐 introducao.html
│   │   │   └── 🌐 sql.html
│   │   ├── 📁 estruturas_controle/
│   │   │   ├── 🌐 condicionais.html
│   │   │   ├── 🌐 conjuntos.html
│   │   │   └── 🌐 repeticao.html
│   │   ├── 📁 estruturas_dados/
│   │   │   ├── 📁 busca/
│   │   │   │   ├── 📁 algoritmos_de_busca_em_grafos/
│   │   │   │   │   ├── 🌐 a_estrela.html
│   │   │   │   │   ├── 🌐 bfs.html
│   │   │   │   │   ├── 🌐 dfs.html
│   │   │   │   │   └── 🌐 dijkstra.html
│   │   │   │   ├── 🌐 busca_binaria.html
│   │   │   │   ├── 🌐 busca_em_arvores.html
│   │   │   │   ├── 🌐 busca_em_grafos.html
│   │   │   │   ├── 🌐 busca_largura.html
│   │   │   │   ├── 🌐 busca_linear.html
│   │   │   │   ├── 🌐 busca_profundidade.html
│   │   │   │   └── 🌐 introducao.html
│   │   │   ├── 📁 grafos/
│   │   │   │   ├── 📁 algoritmos_em_grafos/
│   │   │   │   │   ├── 📁 aplica_model/
│   │   │   │   │   │   ├── 🌐 clarke_wright.html
│   │   │   │   │   │   ├── 🌐 gale_shapley.html
│   │   │   │   │   │   ├── 🌐 hopfield.html
│   │   │   │   │   │   └── 🌐 viterbi.html
│   │   │   │   │   ├── 📁 avger/
│   │   │   │   │   │   ├── 🌐 boruvka.html
│   │   │   │   │   │   ├── 🌐 chu_liu_edmonds.html
│   │   │   │   │   │   ├── 🌐 kruskal.html
│   │   │   │   │   │   └── 🌐 prim.html
│   │   │   │   │   ├── 📁 bases/
│   │   │   │   │   │   ├── 🌐 componentes_conexos.html
│   │   │   │   │   │   └── 🌐 ordenacao_topologica.html
│   │   │   │   │   ├── 📁 classico_avancado/
│   │   │   │   │   │   ├── 🌐 hierholzer.html
│   │   │   │   │   │   └── 🌐 vizing.html
│   │   │   │   │   ├── 📁 conectividade/
│   │   │   │   │   │   ├── 🌐 kosaraju.html
│   │   │   │   │   │   └── 🌐 tarjan.html
│   │   │   │   │   ├── 📁 fluxo_matching/
│   │   │   │   │   │   ├── 🌐 dinic.html
│   │   │   │   │   │   ├── 🌐 edmonds.html
│   │   │   │   │   │   ├── 🌐 edmonds_karp.html
│   │   │   │   │   │   ├── 🌐 ford_fulkerson.html
│   │   │   │   │   │   └── 🌐 hopcroft_karp.html
│   │   │   │   │   ├── 📁 minimos/
│   │   │   │   │   │   ├── 🌐 a_estrela.html
│   │   │   │   │   │   ├── 🌐 bellman_ford.html
│   │   │   │   │   │   ├── 🌐 dijkstra.html
│   │   │   │   │   │   ├── 🌐 floyd_warshall.html
│   │   │   │   │   │   └── 🌐 johnson.html
│   │   │   │   │   └── 📁 otimizacao/
│   │   │   │   │       ├── 🌐 ant_colony.html
│   │   │   │   │       ├── 🌐 bee_colony.html
│   │   │   │   │       ├── 🌐 cuckoo_search.html
│   │   │   │   │       ├── 🌐 dragonfly.html
│   │   │   │   │       ├── 🌐 firefly.html
│   │   │   │   │       ├── 🌐 genetic.html
│   │   │   │   │       ├── 🌐 grey_wolf_optimizer.html
│   │   │   │   │       ├── 🌐 harris_hawks.html
│   │   │   │   │       ├── 🌐 moth_flame.html
│   │   │   │   │       ├── 🌐 particle_swarm_optimization.html
│   │   │   │   │       ├── 🌐 salp_swarm.html
│   │   │   │   │       ├── 🌐 simulated_annealing.html
│   │   │   │   │       ├── 🌐 slime_mould.html
│   │   │   │   │       ├── 🌐 tabu_search.html
│   │   │   │   │       ├── 🌐 tunicate_swarm.html
│   │   │   │   │       └── 🌐 whale_optimization.html
│   │   │   │   ├── 🌐 introducao.html
│   │   │   │   └── 🌐 representacao.html
│   │   │   ├── 📁 lineares/
│   │   │   │   ├── 🌐 arrays.html
│   │   │   │   ├── 🌐 conjuntos.html
│   │   │   │   ├── 🌐 deques.html
│   │   │   │   ├── 🌐 dicionarios.html
│   │   │   │   ├── 🌐 filas.html
│   │   │   │   ├── 🌐 listas_encadeadas.html
│   │   │   │   └── 🌐 pilhas.html
│   │   │   ├── 📁 nao_lineares/
│   │   │   │   ├── 🌐 arvores.html
│   │   │   │   ├── 🌐 arvores_avl.html
│   │   │   │   ├── 🌐 arvores_b+.html
│   │   │   │   ├── 🌐 arvores_b.html
│   │   │   │   ├── 🌐 arvores_binarias.html
│   │   │   │   ├── 🌐 arvores_de_busca.html
│   │   │   │   ├── 🌐 arvores_rb.html
│   │   │   │   ├── 🌐 grafos.html
│   │   │   │   ├── 🌐 heaps.html
│   │   │   │   ├── 🌐 tabelas_hash.html
│   │   │   │   └── 🌐 tries.html
│   │   │   ├── 📁 ordenacao/
│   │   │   │   ├── 🌐 bitonic_sort.html
│   │   │   │   ├── 🌐 bogo_sort.html
│   │   │   │   ├── 🌐 bubble_sort.html
│   │   │   │   ├── 🌐 bucket_sort.html
│   │   │   │   ├── 🌐 cocktail_sort.html
│   │   │   │   ├── 🌐 comb_sort.html
│   │   │   │   ├── 🌐 comparativo.html
│   │   │   │   ├── 🌐 counting_sort.html
│   │   │   │   ├── 🌐 cycle_sort.html
│   │   │   │   ├── 🌐 gnome_sort.html
│   │   │   │   ├── 🌐 heap_sort.html
│   │   │   │   ├── 🌐 insertion_sort.html
│   │   │   │   ├── 🌐 introducao.html
│   │   │   │   ├── 🌐 merge_sort.html
│   │   │   │   ├── 🌐 odd_even_sort.html
│   │   │   │   ├── 🌐 pancake_sort.html
│   │   │   │   ├── 🌐 pigeonhole_sort.html
│   │   │   │   ├── 🌐 quick_sort.html
│   │   │   │   ├── 🌐 radix_sort.html
│   │   │   │   ├── 🌐 selection_sort.html
│   │   │   │   ├── 🌐 shell_sort.html
│   │   │   │   ├── 🌐 sleep_sort.html
│   │   │   │   ├── 🌐 stooge_sort.html
│   │   │   │   └── 🌐 tim_sort.html
│   │   │   ├── 📁 tecnicas/
│   │   │   │   ├── 🌐 algoritmos_gulosos.html
│   │   │   │   ├── 🌐 backtracking.html
│   │   │   │   ├── 🌐 branch_and_bound.html
│   │   │   │   ├── 🌐 divisao_e_conquista.html
│   │   │   │   ├── 🌐 forca_bruta.html
│   │   │   │   └── 🌐 programacao_dinamica.html
│   │   │   ├── 🌐 complexidade.html
│   │   │   └── 🌐 introducao.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 excecoes.html
│   │   │   ├── 🌐 introducao.html
│   │   │   ├── 🌐 logica_programacao.html
│   │   │   ├── 🌐 modularizacao.html
│   │   │   ├── 🌐 pensamento_computacional.html
│   │   │   └── 🌐 pseudo_codigo_fluxogramas.html
│   │   └── 📁 linguagens/
│   │       ├── 📁 ada/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 concorrencia.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 sistemas_criticos.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 assembly/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 basic/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 c/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 clojure/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 cobol/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 batch_mainframe.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 sistemas_corporativos.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 cpp/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 csharp/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 dart/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 delphi_object_pascal/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 elixir/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 erlang/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 alta_disponibilidade.html
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 sistemas_distribuidos.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 atores_concorrencia.html
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 fortran/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 computacao_cientifica.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 hpc.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 fsharp/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 go/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 haskell/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 java/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 javascript/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 julia/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 kotlin/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 lisp/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       ├── 🌐 macros.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 lua/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 scripting_extensoes.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 luajit/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 compatibilidade.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 ffi.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       ├── 🌐 performance.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 ocaml/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 pascal/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 perl/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 automacao.html
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 php/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 prolog/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 regras_inferencia.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 python/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 r/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 ruby/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 rust/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 scala/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 scheme/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       ├── 🌐 macros.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 solidity/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 swift/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 terraform_hcl/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 iac.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 nuvem.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 typescript/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       ├── 📁 visual_basic/
│   │       │   ├── 📁 aplicacoes/
│   │       │   │   ├── 🌐 automacao_office.html
│   │       │   │   ├── 🌐 banco_dados.html
│   │       │   │   ├── 🌐 dados_ia.html
│   │       │   │   ├── 🌐 embedded_iot.html
│   │       │   │   ├── 🌐 gui_desktop.html
│   │       │   │   ├── 🌐 jogos.html
│   │       │   │   ├── 🌐 mobile.html
│   │       │   │   ├── 🌐 terminal_cli.html
│   │       │   │   └── 🌐 web.html
│   │       │   └── 📁 guia/
│   │       │       ├── 🌐 avancado.html
│   │       │       ├── 🌐 bibliotecas_frameworks.html
│   │       │       ├── 🌐 ecossistema_tooling.html
│   │       │       ├── 🌐 fundamentos.html
│   │       │       ├── 🌐 introducao.html
│   │       │       └── 🌐 projetos_boas_praticas.html
│   │       └── 📁 zig/
│   │           ├── 📁 aplicacoes/
│   │           │   ├── 🌐 banco_dados.html
│   │           │   ├── 🌐 dados_ia.html
│   │           │   ├── 🌐 embedded_iot.html
│   │           │   ├── 🌐 gui_desktop.html
│   │           │   ├── 🌐 jogos.html
│   │           │   ├── 🌐 mobile.html
│   │           │   ├── 🌐 terminal_cli.html
│   │           │   └── 🌐 web.html
│   │           └── 📁 guia/
│   │               ├── 🌐 avancado.html
│   │               ├── 🌐 bibliotecas_frameworks.html
│   │               ├── 🌐 ecossistema_tooling.html
│   │               ├── 🌐 fundamentos.html
│   │               ├── 🌐 introducao.html
│   │               └── 🌐 projetos_boas_praticas.html
│   ├── 📁 rede_e_comunicacao/
│   │   ├── 📁 administracao/
│   │   │   ├── 🌐 configuracao_redes.html
│   │   │   ├── 🌐 ferramentas_rede.html
│   │   │   ├── 🌐 monitoramento.html
│   │   │   ├── 🌐 seguranca_redes.html
│   │   │   └── 🌐 troubleshooting.html
│   │   ├── 📁 camada_aplicacao/
│   │   │   ├── 🌐 dhcp.html
│   │   │   ├── 🌐 dns.html
│   │   │   ├── 🌐 ftp.html
│   │   │   ├── 🌐 http.html
│   │   │   ├── 🌐 https.html
│   │   │   ├── 🌐 pop_imap.html
│   │   │   ├── 🌐 smtp.html
│   │   │   └── 🌐 ssh.html
│   │   ├── 📁 camada_enlace/
│   │   │   ├── 🌐 arp.html
│   │   │   ├── 🌐 ethernet.html
│   │   │   ├── 🌐 mac_address.html
│   │   │   ├── 🌐 switches.html
│   │   │   └── 🌐 vlans.html
│   │   ├── 📁 camada_fisica/
│   │   │   ├── 🌐 cabeamento.html
│   │   │   ├── 🌐 fibra_otica.html
│   │   │   ├── 🌐 meios_transmissao.html
│   │   │   └── 🌐 wireless.html
│   │   ├── 📁 camada_rede/
│   │   │   ├── 🌐 cidr.html
│   │   │   ├── 🌐 enderecamento.html
│   │   │   ├── 🌐 icmp.html
│   │   │   ├── 🌐 ip_v4.html
│   │   │   ├── 🌐 ip_v6.html
│   │   │   ├── 🌐 nat.html
│   │   │   ├── 🌐 protocolos_roteamento.html
│   │   │   ├── 🌐 roteamento.html
│   │   │   └── 🌐 subredes.html
│   │   ├── 📁 camada_transporte/
│   │   │   ├── 🌐 portas.html
│   │   │   ├── 🌐 sockets.html
│   │   │   ├── 🌐 tcp.html
│   │   │   └── 🌐 udp.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 conceitos_basicos.html
│   │   │   ├── 🌐 equipamentos.html
│   │   │   ├── 🌐 modelo_osi.html
│   │   │   ├── 🌐 modelo_tcp_ip.html
│   │   │   └── 🌐 topologias.html
│   │   ├── 📁 servidores/
│   │   │   ├── 🌐 apache.html
│   │   │   ├── 🌐 introducao.html
│   │   │   ├── 🌐 load_balancer.html
│   │   │   ├── 🌐 nginx.html
│   │   │   ├── 🌐 proxy_reverso.html
│   │   │   └── 🌐 web_servers.html
│   │   └── 🌐 introducao.html
│   ├── 📁 seguranca/
│   │   ├── 📁 criptografia/
│   │   │   ├── 🌐 aes.html
│   │   │   ├── 🌐 assimetrica.html
│   │   │   ├── 🌐 assinatura_digital.html
│   │   │   ├── 🌐 certificados.html
│   │   │   ├── 🌐 hash.html
│   │   │   ├── 🌐 historia.html
│   │   │   ├── 🌐 introducao_cripto.html
│   │   │   ├── 🌐 md5_sha.html
│   │   │   ├── 🌐 pki.html
│   │   │   ├── 🌐 rsa.html
│   │   │   └── 🌐 simetrica.html
│   │   ├── 📁 defensive/
│   │   │   ├── 🌐 backup_recovery.html
│   │   │   ├── 🌐 blue_team.html
│   │   │   ├── 🌐 forense.html
│   │   │   ├── 🌐 logs_auditoria.html
│   │   │   ├── 🌐 resposta_incidentes.html
│   │   │   ├── 🌐 siem.html
│   │   │   └── 🌐 soc.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 ameacas_vulnerabilidades.html
│   │   │   ├── 🌐 compliance.html
│   │   │   ├── 🌐 gestao_riscos.html
│   │   │   ├── 🌐 pilares_cia.html
│   │   │   └── 🌐 politicas_seguranca.html
│   │   ├── 📁 malware/
│   │   │   ├── 🌐 analise_malware.html
│   │   │   ├── 🌐 protecao.html
│   │   │   └── 🌐 tipos_malware.html
│   │   ├── 📁 offensive/
│   │   │   ├── 📁 ferramentas/
│   │   │   │   ├── 🌐 burp_suite.html
│   │   │   │   ├── 🌐 metasploit.html
│   │   │   │   ├── 🌐 nmap.html
│   │   │   │   └── 🌐 wireshark.html
│   │   │   ├── 🌐 ctf.html
│   │   │   ├── 🌐 enumeracao.html
│   │   │   ├── 🌐 exploracao.html
│   │   │   ├── 🌐 introducao_pentest.html
│   │   │   ├── 🌐 metodologias.html
│   │   │   ├── 🌐 pos_exploracao.html
│   │   │   └── 🌐 reconhecimento.html
│   │   ├── 📁 rede/
│   │   │   ├── 🌐 firewall.html
│   │   │   ├── 🌐 ids_ips.html
│   │   │   ├── 🌐 seguranca_rede.html
│   │   │   ├── 🌐 seguranca_wifi.html
│   │   │   ├── 🌐 vpn.html
│   │   │   └── 🌐 waf.html
│   │   ├── 📁 sistemas/
│   │   │   ├── 🌐 hardening.html
│   │   │   ├── 🌐 hardening_linux.html
│   │   │   ├── 🌐 hardening_windows.html
│   │   │   └── 🌐 privilegios.html
│   │   ├── 📁 web/
│   │   │   ├── 🌐 autenticacao.html
│   │   │   ├── 🌐 broken_auth.html
│   │   │   ├── 🌐 cors.html
│   │   │   ├── 🌐 csrf.html
│   │   │   ├── 🌐 headers_seguranca.html
│   │   │   ├── 🌐 https_ssl_tls.html
│   │   │   ├── 🌐 injection.html
│   │   │   ├── 🌐 jwt.html
│   │   │   ├── 🌐 oauth.html
│   │   │   ├── 🌐 owasp_top10.html
│   │   │   ├── 🌐 saml.html
│   │   │   └── 🌐 xss.html
│   │   └── 🌐 introducao.html
│   ├── 📁 sistemas/
│   │   ├── 📁 arquivos/
│   │   │   ├── 🌐 alocacao_arquivos.html
│   │   │   ├── 🌐 estrutura_diretorios.html
│   │   │   ├── 🌐 ext4.html
│   │   │   ├── 🌐 fat.html
│   │   │   ├── 🌐 ntfs.html
│   │   │   ├── 🌐 permissoes.html
│   │   │   └── 🌐 sistema_arquivos.html
│   │   ├── 📁 entrada_saida/
│   │   │   ├── 🌐 drivers.html
│   │   │   ├── 🌐 io_hardware.html
│   │   │   ├── 🌐 io_software.html
│   │   │   └── 🌐 spooling.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 chamadas_sistema.html
│   │   │   ├── 🌐 conceitos_so.html
│   │   │   ├── 🌐 estrutura_so.html
│   │   │   ├── 🌐 historia_so.html
│   │   │   └── 🌐 tipos_so.html
│   │   ├── 📁 linux/
│   │   │   ├── 🌐 apt.html
│   │   │   ├── 🌐 comandos_avancados.html
│   │   │   ├── 🌐 comandos_basicos.html
│   │   │   ├── 🌐 cron.html
│   │   │   ├── 🌐 distribuicoes.html
│   │   │   ├── 🌐 estrutura_diretorios.html
│   │   │   ├── 🌐 gerenciadores_pacotes.html
│   │   │   ├── 🌐 historia_linux.html
│   │   │   ├── 🌐 instalacao.html
│   │   │   ├── 🌐 introducao_linux.html
│   │   │   ├── 🌐 logs_linux.html
│   │   │   ├── 🌐 permissoes_linux.html
│   │   │   ├── 🌐 processos_linux.html
│   │   │   ├── 🌐 servicos_systemd.html
│   │   │   ├── 🌐 usuarios_grupos.html
│   │   │   └── 🌐 yum_dnf.html
│   │   ├── 📁 memoria/
│   │   │   ├── 🌐 algoritmos_substituicao.html
│   │   │   ├── 🌐 alocacao.html
│   │   │   ├── 🌐 fragmentacao.html
│   │   │   ├── 🌐 gerenciamento_memoria.html
│   │   │   ├── 🌐 memoria_virtual.html
│   │   │   ├── 🌐 page_fault.html
│   │   │   ├── 🌐 paginacao.html
│   │   │   └── 🌐 segmentacao.html
│   │   ├── 📁 processos/
│   │   │   ├── 🌐 algoritmos_escalonamento.html
│   │   │   ├── 🌐 deadlocks.html
│   │   │   ├── 🌐 escalonamento.html
│   │   │   ├── 🌐 estados_processo.html
│   │   │   ├── 🌐 mutex_semaforos.html
│   │   │   ├── 🌐 pcb.html
│   │   │   ├── 🌐 prevencao_deadlock.html
│   │   │   ├── 🌐 processos.html
│   │   │   ├── 🌐 sincronizacao.html
│   │   │   └── 🌐 threads.html
│   │   ├── 📁 windows/
│   │   │   ├── 🌐 active_directory.html
│   │   │   ├── 🌐 administracao.html
│   │   │   ├── 🌐 arquitetura_windows.html
│   │   │   ├── 🌐 introducao_windows.html
│   │   │   ├── 🌐 powershell.html
│   │   │   ├── 🌐 registro.html
│   │   │   └── 🌐 servicos_windows.html
│   │   └── 🌐 introducao.html
│   ├── 📁 tecnologia/
│   │   ├── 📁 tendencias/
│   │   │   ├── 🌐 5g.html
│   │   │   ├── 🌐 blockchain.html
│   │   │   ├── 🌐 computacao_quantica.html
│   │   │   ├── 🌐 edge_computing.html
│   │   │   ├── 🌐 ia_generativa.html
│   │   │   ├── 🌐 metaverso.html
│   │   │   ├── 🌐 sustentabilidade_ti.html
│   │   │   └── 🌐 web3.html
│   │   ├── 🌐 carreiras.html
│   │   ├── 🌐 historia.html
│   │   └── 🌐 introducao.html
│   ├── 📁 web/
│   │   ├── 📁 acessibilidade/
│   │   │   ├── 🌐 aria.html
│   │   │   ├── 🌐 introducao_a11y.html
│   │   │   ├── 🌐 navegacao_teclado.html
│   │   │   ├── 🌐 testes_a11y.html
│   │   │   └── 🌐 wcag.html
│   │   ├── 📁 arquiteturas/
│   │   │   ├── 🌐 jamstack.html
│   │   │   ├── 🌐 microservicos.html
│   │   │   ├── 🌐 monolito.html
│   │   │   ├── 🌐 mpa.html
│   │   │   ├── 🌐 pwa.html
│   │   │   ├── 🌐 spa.html
│   │   │   ├── 🌐 ssg.html
│   │   │   └── 🌐 ssr.html
│   │   ├── 📁 backend/
│   │   │   ├── 📁 arquitetura/
│   │   │   │   ├── 🌐 graphql.html
│   │   │   │   ├── 🌐 grpc.html
│   │   │   │   ├── 🌐 rest.html
│   │   │   │   ├── 🌐 rest_best_practices.html
│   │   │   │   └── 🌐 websockets.html
│   │   │   ├── 📁 autenticacao/
│   │   │   │   ├── 🌐 cookies.html
│   │   │   │   ├── 🌐 jwt.html
│   │   │   │   ├── 🌐 oauth.html
│   │   │   │   ├── 🌐 sessoes.html
│   │   │   │   └── 🌐 tokens.html
│   │   │   ├── 🌐 introducao_backend.html
│   │   │   └── 🌐 seguranca_backend.html
│   │   ├── 📁 frameworks_frontend/
│   │   │   ├── 📁 angular/
│   │   │   │   ├── 🌐 angular_cli.html
│   │   │   │   ├── 🌐 angular_intro.html
│   │   │   │   ├── 🌐 components.html
│   │   │   │   └── 🌐 services.html
│   │   │   ├── 📁 react/
│   │   │   │   ├── 🌐 componentes.html
│   │   │   │   ├── 🌐 context.html
│   │   │   │   ├── 🌐 hooks.html
│   │   │   │   ├── 🌐 jsx.html
│   │   │   │   ├── 🌐 props_state.html
│   │   │   │   ├── 🌐 react_intro.html
│   │   │   │   ├── 🌐 react_router.html
│   │   │   │   └── 🌐 redux.html
│   │   │   ├── 📁 vue/
│   │   │   │   ├── 🌐 vue_componentes.html
│   │   │   │   ├── 🌐 vue_intro.html
│   │   │   │   ├── 🌐 vue_router.html
│   │   │   │   └── 🌐 vuex.html
│   │   │   ├── 🌐 introducao_frameworks.html
│   │   │   ├── 🌐 nextjs.html
│   │   │   └── 🌐 svelte.html
│   │   ├── 📁 frontend/
│   │   │   ├── 📁 css/
│   │   │   │   ├── 🌐 animacoes.html
│   │   │   │   ├── 🌐 box_model.html
│   │   │   │   ├── 🌐 css_basico.html
│   │   │   │   ├── 🌐 flexbox.html
│   │   │   │   ├── 🌐 grid.html
│   │   │   │   ├── 🌐 media_queries.html
│   │   │   │   ├── 🌐 responsive.html
│   │   │   │   ├── 🌐 sass.html
│   │   │   │   ├── 🌐 seletores.html
│   │   │   │   └── 🌐 tailwind.html
│   │   │   ├── 📁 html/
│   │   │   │   ├── 🌐 formularios.html
│   │   │   │   ├── 🌐 html5_apis.html
│   │   │   │   ├── 🌐 html_basico.html
│   │   │   │   └── 🌐 html_semantico.html
│   │   │   ├── 📁 javascript/
│   │   │   │   ├── 🌐 ajax.html
│   │   │   │   ├── 🌐 async_await.html
│   │   │   │   ├── 🌐 dom.html
│   │   │   │   ├── 🌐 es6_features.html
│   │   │   │   ├── 🌐 eventos.html
│   │   │   │   ├── 🌐 fetch_api.html
│   │   │   │   ├── 🌐 js_basico.html
│   │   │   │   ├── 🌐 promises.html
│   │   │   │   └── 🌐 typescript.html
│   │   │   └── 🌐 introducao_frontend.html
│   │   ├── 📁 fundamentos/
│   │   │   ├── 🌐 cliente_servidor.html
│   │   │   ├── 🌐 como_funciona_web.html
│   │   │   ├── 🌐 navegadores.html
│   │   │   └── 🌐 url_uri.html
│   │   ├── 📁 performance/
│   │   │   ├── 🌐 caching.html
│   │   │   ├── 🌐 cdn.html
│   │   │   ├── 🌐 code_splitting.html
│   │   │   ├── 🌐 core_web_vitals.html
│   │   │   ├── 🌐 lazy_loading.html
│   │   │   ├── 🌐 lighthouse.html
│   │   │   ├── 🌐 minificacao.html
│   │   │   └── 🌐 otimizacao.html
│   │   ├── 📁 seo/
│   │   │   ├── 🌐 introducao_seo.html
│   │   │   ├── 🌐 meta_tags.html
│   │   │   ├── 🌐 robots.html
│   │   │   ├── 🌐 schema.html
│   │   │   └── 🌐 sitemap.html
│   │   └── 🌐 introducao.html
│   └── 🌐 index.html
├── 📁 imagens/
│   ├── 📁 favicon/
│   │   └── 🖼️ favicon.png
│   └── 📁 logo/
│       └── 🖼️ logo.svg
├── 📁 js/
│   ├── 📄 base.js
│   ├── 📄 carousel.js
│   ├── 📄 efeitos.js
│   ├── 📄 include.js
│   ├── 📄 main.js
│   ├── 📄 nav_builder.js
│   ├── ⚙️ nav_data.json
│   ├── 📄 nav_interno_builder.js
│   ├── 📄 navbar_interno.js
│   ├── 📄 navbar_lateral.js
│   ├── 📄 scroll-reveal.js
│   ├── 📄 search.js
│   ├── 📄 svg_registry.js
│   └── ⚙️ svg_registry.json
├── ⚙️ .nojekyll
├── 📄 LICENSE
├── 📝 README.md
└── 🌐 index.html

────────────────────────────────────────────────────────────────────────────────
Generated by FileTree Pro Extension
```
