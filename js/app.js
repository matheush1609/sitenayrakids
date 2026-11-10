(function () {
  'use strict';

  const LOJA = window.LOJA || {};
  const PRODUTOS = window.PRODUTOS || [];

  const PUBLICOS = {
    meninas: 'Meninas',
    meninos: 'Meninos',
    bebe: 'Bebê',
  };

  const CATEGORIAS = {
    vestidos: 'Vestidos',
    conjuntos: 'Conjuntos',
    bodies: 'Bodies',
    camisetas: 'Camisetas',
    'shorts-saias': 'Shorts e saias',
    jardineiras: 'Jardineiras',
    pijamas: 'Pijamas',
    acessorios: 'Acessórios',
    calcados: 'Calçados',
    brinquedos: 'Brinquedos',
  };

  const ORDEM_TAMANHOS = ['RN', 'P', 'M', 'G', 'GG', '1', '2', '3', '4', '6', '8', '10', '12', '14', '16', 'Único'];

  /* ---------- utilidades ---------- */

  const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  function parcelamento(preco) {
    const max = LOJA.parcelasSemJuros || 1;
    const minimo = LOJA.parcelaMinima || 0;
    let n = max;
    while (n > 1 && preco / n < minimo) n--;
    return n > 1 ? `${n}x de ${brl(preco / n)} sem juros` : '';
  }

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const porId = (id) => PRODUTOS.find((p) => p.id === id);

  /* ---------- desenhos das peças (usados até chegarem as fotos) ---------- */

  const FORMAS = {
    vestido: [
      'M44 18 Q60 30 76 18 L84 21 L81 50 Q79 56 83 60 L106 124 Q60 136 14 124 L37 60 Q41 56 39 50 L36 21 Z',
    ],
    saia: ['M38 30 L82 30 L106 112 Q60 124 14 112 Z'],
    camiseta: ['M42 20 Q60 32 78 20 L104 32 L97 54 L85 50 L85 120 L35 120 L35 50 L23 54 L16 32 Z'],
    short: ['M26 34 L94 34 L102 104 L67 108 L60 66 L53 108 L18 104 Z'],
    body: [
      'M43 18 Q60 30 77 18 L100 30 L94 50 L84 46 L84 92 Q84 108 70 116 L66 124 L54 124 L50 116 Q36 108 36 92 L36 46 L26 50 L20 30 Z',
    ],
    jardineira: ['M38 14 L46 14 L46 44 L74 44 L74 14 L82 14 L82 50 L90 122 L65 124 L60 82 L55 124 L30 122 L38 50 Z'],
    conjunto: [
      'M42 14 Q60 24 78 14 L100 24 L94 42 L84 39 L84 70 L36 70 L36 39 L26 42 L20 24 Z',
      'M34 76 L86 76 L92 126 L64 128 L60 96 L56 128 L28 126 Z',
    ],
    pijama: [
      'M42 12 Q60 22 78 12 L96 18 L108 62 L96 66 L84 36 L84 70 L36 70 L36 36 L24 66 L12 62 L24 18 Z',
      'M36 74 L84 74 L88 132 L66 132 L60 92 L54 132 L32 132 Z',
    ],
    laco: [
      'M60 66 C42 36 10 40 15 66 C10 92 42 96 60 66 C78 96 110 92 105 66 C110 40 78 36 60 66 Z',
      'M54 72 L42 112 L52 108 L58 116 L60 74 Z',
      'M66 72 L78 112 L68 108 L62 116 L60 74 Z',
    ],
    sapato: [
      'M18 72 Q18 54 32 54 L54 54 Q62 54 66 62 L76 76 Q102 80 106 94 L106 100 L16 100 Z',
      'M12 98 L108 98 Q108 110 98 110 L22 110 Q12 110 12 100 Z',
    ],
    ursinho: [
      'M22 50 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0 Z',
      'M70 50 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0 Z',
      'M26 80 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0 Z',
    ],
  };

  // Detalhes de costura/acabamento por peça
  const DETALHES = {
    vestido: '<path d="M39 52 Q60 58 81 52" class="costura"/>',
    saia: '<path d="M38 40 L82 40" class="costura"/>',
    camiseta: '<path d="M46 23 Q60 33 74 23" class="costura"/>',
    short: '<path d="M26 44 L94 44" class="costura"/>',
    body: '<path d="M47 21 Q60 31 73 21" class="costura"/><circle cx="55" cy="120" r="1.6" class="casa"/><circle cx="65" cy="120" r="1.6" class="casa"/>',
    jardineira: '<rect x="50" y="52" width="20" height="14" rx="3" class="costura"/><circle cx="42" cy="48" r="2" class="casa"/><circle cx="78" cy="48" r="2" class="casa"/>',
    conjunto: '<path d="M34 86 L86 86" class="costura"/>',
    pijama: '<path d="M60 22 L60 70" class="costura"/><circle cx="60" cy="34" r="1.6" class="casa"/><circle cx="60" cy="48" r="1.6" class="casa"/><circle cx="60" cy="62" r="1.6" class="casa"/>',
    laco: '<ellipse cx="60" cy="66" rx="8" ry="10" class="no"/>',
    sapato: '<path d="M44 58 L52 68 M36 60 L44 70 M52 56 L60 66" class="costura"/><path d="M14 100 L106 100" class="costura"/>',
    ursinho: '<ellipse cx="60" cy="92" rx="14" ry="10" class="casa"/><circle cx="47" cy="74" r="3.5" class="olho"/><circle cx="73" cy="74" r="3.5" class="olho"/><ellipse cx="60" cy="88" rx="4" ry="3" class="olho"/>',
  };

  const PECA_POR_CATEGORIA = {
    vestidos: 'vestido',
    conjuntos: 'conjunto',
    bodies: 'body',
    camisetas: 'camiseta',
    'shorts-saias': 'short',
    jardineiras: 'jardineira',
    pijamas: 'pijama',
    acessorios: 'laco',
    calcados: 'sapato',
    brinquedos: 'ursinho',
  };

  let contadorPadrao = 0;

  function padraoSVG(estampa, id) {
    switch (estampa) {
      case 'poa':
        return `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.8" fill="#fff" opacity=".85"/><circle cx="9" cy="9" r="1.8" fill="#fff" opacity=".85"/></pattern>`;
      case 'listras':
        return `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="4" fill="#fff" opacity=".7"/></pattern>`;
      case 'vichy':
        return `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="6" height="12" fill="#fff" opacity=".45"/><rect width="12" height="6" fill="#fff" opacity=".45"/></pattern>`;
      default:
        return '';
    }
  }

  function desenhoPeca(peca, cor, estampa, extraClass = '') {
    const formas = FORMAS[peca] || FORMAS.vestido;
    const id = `est-${++contadorPadrao}`;
    const padrao = padraoSVG(estampa, id);
    const corpo = formas
      .map(
        (d) =>
          `<path d="${d}" fill="${cor}" class="tecido"/>` + (padrao ? `<path d="${d}" fill="url(#${id})"/>` : '')
      )
      .join('');
    return `<svg class="desenho ${extraClass}" viewBox="0 0 120 140" aria-hidden="true" focusable="false">${
      padrao ? `<defs>${padrao}</defs>` : ''
    }${corpo}${DETALHES[peca] || ''}</svg>`;
  }

  function desenhoProduto(p, extraClass) {
    const d = p.desenho || {};
    return desenhoPeca(d.peca || PECA_POR_CATEGORIA[p.categoria] || 'vestido', d.cor || '#FF4F8B', d.estampa || 'lisa', extraClass);
  }

  function imagemProduto(p, extraClass = '') {
    const fotos = p.fotos || [];
    if (fotos.length) {
      const segunda = fotos[1]
        ? `<img src="${esc(fotos[1])}" alt="" class="foto foto-2" loading="lazy">`
        : '';
      return `<img src="${esc(fotos[0])}" alt="${esc(p.nome)}" class="foto ${extraClass}" loading="lazy">${segunda}`;
    }
    return desenhoProduto(p, extraClass);
  }

  /* ---------- card de produto ---------- */

  function cardProduto(p) {
    const selo = p.esgotado
      ? '<span class="selo selo-esgotado">Esgotado</span>'
      : p.precoAntigo
      ? '<span class="selo selo-promo">Promoção</span>'
      : p.novo
      ? '<span class="selo">Novo</span>'
      : '';
    const parc = parcelamento(p.preco);
    return `
      <article class="produto${p.esgotado ? ' is-esgotado' : ''}" data-publico="${esc(p.publico)}">
        <a class="produto-foto" href="#produto/${esc(p.id)}" data-abrir="${esc(p.id)}" tabindex="-1" aria-hidden="true">
          ${imagemProduto(p)}
          ${selo}
        </a>
        <div class="produto-info">
          <h3 class="produto-nome"><a href="#produto/${esc(p.id)}" data-abrir="${esc(p.id)}">${esc(p.nome)}</a></h3>
          <p class="produto-preco">
            ${p.precoAntigo ? `<s>${brl(p.precoAntigo)}</s>` : ''}
            <strong>${brl(p.preco)}</strong>
          </p>
          ${parc ? `<p class="produto-parcela">${parc}</p>` : ''}
          <ul class="produto-tamanhos" aria-label="Tamanhos disponíveis">
            ${p.tamanhos.map((t) => `<li>${esc(t)}</li>`).join('')}
          </ul>
        </div>
      </article>`;
  }

  /* ---------- sacola ---------- */

  const CHAVE_SACOLA = 'nayra-sacola';

  function lerSacola() {
    try {
      const itens = JSON.parse(localStorage.getItem(CHAVE_SACOLA) || '[]');
      return Array.isArray(itens) ? itens.filter((i) => porId(i.id)) : [];
    } catch (e) {
      return [];
    }
  }

  let sacola = lerSacola();

  function salvarSacola() {
    try {
      localStorage.setItem(CHAVE_SACOLA, JSON.stringify(sacola));
    } catch (e) {
      /* navegação privada: a sacola só vale nesta página */
    }
    renderSacola();
  }

  function adicionarSacola(id, tamanho, qtd = 1) {
    const item = sacola.find((i) => i.id === id && i.tamanho === tamanho);
    if (item) item.qtd += qtd;
    else sacola.push({ id, tamanho, qtd });
    salvarSacola();
  }

  const subtotal = () => sacola.reduce((s, i) => s + porId(i.id).preco * i.qtd, 0);
  const totalItens = () => sacola.reduce((s, i) => s + i.qtd, 0);

  function renderSacola() {
    $$('[data-contador-sacola]').forEach((el) => {
      const n = totalItens();
      el.textContent = n;
      el.hidden = n === 0;
    });

    const lista = $('#sacola-itens');
    if (!lista) return;

    if (!sacola.length) {
      lista.innerHTML = `
        <div class="sacola-vazia">
          ${desenhoPeca('vestido', '#FF4F8B', 'poa', 'sacola-vazia-desenho')}
          <p>Sua sacola está vazia.</p>
          <a href="produtos.html" class="botao botao-secundario">Ver o catálogo</a>
        </div>`;
      $('#sacola-rodape').hidden = true;
      return;
    }

    lista.innerHTML = sacola
      .map((i, idx) => {
        const p = porId(i.id);
        return `
        <div class="sacola-item">
          <div class="sacola-item-foto">${imagemProduto(p)}</div>
          <div class="sacola-item-info">
            <p class="sacola-item-nome">${esc(p.nome)}</p>
            <p class="sacola-item-tam">Tamanho ${esc(i.tamanho)}</p>
            <div class="qtd" role="group" aria-label="Quantidade de ${esc(p.nome)}">
              <button type="button" data-qtd="-1" data-idx="${idx}" aria-label="Diminuir">−</button>
              <span>${i.qtd}</span>
              <button type="button" data-qtd="1" data-idx="${idx}" aria-label="Aumentar">+</button>
            </div>
          </div>
          <div class="sacola-item-lado">
            <p class="sacola-item-preco">${brl(p.preco * i.qtd)}</p>
            <button type="button" class="link-remover" data-remover="${idx}">Remover</button>
          </div>
        </div>`;
      })
      .join('');

    const st = subtotal();
    $('#sacola-rodape').hidden = false;
    $('#sacola-subtotal').textContent = brl(st);

    const pix = $('#sacola-pix');
    if (LOJA.descontoPix) {
      pix.textContent = `ou ${brl(st * (1 - LOJA.descontoPix / 100))} no Pix (${LOJA.descontoPix}% de desconto)`;
      pix.hidden = false;
    } else pix.hidden = true;

    const frete = $('#sacola-frete');
    const limite = LOJA.freteGratisAcima || 0;
    if (limite) {
      const falta = limite - st;
      const pct = Math.min(100, (st / limite) * 100);
      frete.hidden = false;
      $('#sacola-frete-texto').textContent =
        falta > 0 ? `Faltam ${brl(falta)} para o frete grátis` : 'Seu pedido tem frete grátis';
      $('#sacola-frete-barra').style.width = pct + '%';
    } else frete.hidden = true;
  }

  function mensagemWhatsApp() {
    const linhas = sacola.map((i) => {
      const p = porId(i.id);
      return `- ${i.qtd}x ${p.nome} (tam. ${i.tamanho}): ${brl(p.preco * i.qtd)}`;
    });
    return [
      `Olá, ${LOJA.nome || 'Nayra Kids'}! Quero fazer este pedido:`,
      '',
      ...linhas,
      '',
      `Subtotal: ${brl(subtotal())}`,
      '',
      'Meu CEP para calcular o frete: ',
    ].join('\n');
  }

  function linkWhatsApp(texto) {
    return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;
  }

  function abrirSacola() {
    const gaveta = $('#sacola');
    if (!gaveta) return;
    gaveta.hidden = false;
    document.body.classList.add('travado');
    requestAnimationFrame(() => gaveta.classList.add('aberta'));
    $('#sacola-fechar').focus();
  }

  function fecharSacola() {
    const gaveta = $('#sacola');
    if (!gaveta || gaveta.hidden) return;
    gaveta.classList.remove('aberta');
    document.body.classList.remove('travado');
    setTimeout(() => (gaveta.hidden = true), 260);
    $('[data-abrir-sacola]')?.focus();
  }

  /* ---------- janela de produto ---------- */

  function abrirProduto(id) {
    const p = porId(id);
    const dialog = $('#janela-produto');
    if (!p || !dialog) return;

    const parc = parcelamento(p.preco);
    const pix = LOJA.descontoPix
      ? `<p class="detalhe-pix">${brl(p.preco * (1 - LOJA.descontoPix / 100))} no Pix</p>`
      : '';
    const unico = p.tamanhos.length === 1;

    $('#janela-conteudo').innerHTML = `
      <div class="detalhe-foto">${imagemProduto(p, 'detalhe-img')}</div>
      <div class="detalhe-info">
        <p class="detalhe-trilha">${esc(PUBLICOS[p.publico] || '')}, ${esc(CATEGORIAS[p.categoria] || '')}</p>
        <h2 id="janela-titulo" class="detalhe-nome">${esc(p.nome)}</h2>
        <p class="detalhe-preco">
          ${p.precoAntigo ? `<s>${brl(p.precoAntigo)}</s>` : ''}
          <strong>${brl(p.preco)}</strong>
        </p>
        ${parc ? `<p class="detalhe-parcela">${parc}</p>` : ''}
        ${pix}
        <form class="detalhe-form" id="form-comprar">
          <fieldset class="tamanhos-escolha">
            <legend>Tamanho</legend>
            <div class="tamanhos-opcoes">
              ${p.tamanhos
                .map(
                  (t, i) => `
                <label class="tamanho-opcao">
                  <input type="radio" name="tamanho" value="${esc(t)}" ${unico && i === 0 ? 'checked' : ''} ${p.esgotado ? 'disabled' : ''}>
                  <span>${esc(t)}</span>
                </label>`
                )
                .join('')}
            </div>
            <a href="index.html#tamanhos" class="link-tabela">Qual tamanho escolher?</a>
          </fieldset>
          <p class="aviso-form" id="aviso-tamanho" role="alert" hidden>Escolha um tamanho para adicionar à sacola.</p>
          <button type="submit" class="botao botao-cheio" ${p.esgotado ? 'disabled' : ''}>
            ${p.esgotado ? 'Esgotado' : 'Adicionar à sacola'}
          </button>
          <a class="link-duvida" target="_blank" rel="noopener" href="${linkWhatsApp(
            `Olá! Tenho uma dúvida sobre o produto: ${p.nome}`
          )}">Tirar dúvida pelo WhatsApp</a>
        </form>
        ${p.descricao ? `<div class="detalhe-desc"><h3>Sobre a peça</h3><p>${esc(p.descricao)}</p></div>` : ''}
      </div>`;

    $('#form-comprar').addEventListener('submit', (e) => {
      e.preventDefault();
      const escolhido = $('input[name="tamanho"]:checked', e.target);
      if (!escolhido) {
        $('#aviso-tamanho').hidden = false;
        $('.tamanhos-opcoes input', e.target)?.focus();
        return;
      }
      adicionarSacola(p.id, escolhido.value);
      dialog.close();
      abrirSacola();
    });

    $$('input[name="tamanho"]', dialog).forEach((r) =>
      r.addEventListener('change', () => ($('#aviso-tamanho').hidden = true))
    );

    if (!dialog.open) dialog.showModal();
    history.replaceState(null, '', '#produto/' + p.id);
  }

  function initJanela() {
    const dialog = $('#janela-produto');
    if (!dialog) return;
    dialog.addEventListener('close', () => {
      if (location.hash.startsWith('#produto/')) history.replaceState(null, '', location.pathname + location.search);
    });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
    $('#janela-fechar').addEventListener('click', () => dialog.close());

    document.addEventListener('click', (e) => {
      const alvo = e.target.closest('[data-abrir]');
      if (!alvo) return;
      e.preventDefault();
      abrirProduto(alvo.dataset.abrir);
    });

    const m = location.hash.match(/^#produto\/(.+)$/);
    if (m) abrirProduto(decodeURIComponent(m[1]));
  }

  /* ---------- cabeçalho / menu ---------- */

  function initCabecalho() {
    const botao = $('#menu-botao');
    const menu = $('#menu');
    if (botao && menu) {
      botao.addEventListener('click', () => {
        const aberto = botao.getAttribute('aria-expanded') === 'true';
        botao.setAttribute('aria-expanded', String(!aberto));
        menu.classList.toggle('aberto', !aberto);
      });
    }

    $$('[data-abrir-sacola]').forEach((b) => b.addEventListener('click', abrirSacola));
    $('#sacola-fechar')?.addEventListener('click', fecharSacola);
    $('#sacola-fundo')?.addEventListener('click', fecharSacola);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fecharSacola();
    });

    $('#sacola-itens')?.addEventListener('click', (e) => {
      const q = e.target.closest('[data-qtd]');
      const r = e.target.closest('[data-remover]');
      if (q) {
        const item = sacola[+q.dataset.idx];
        item.qtd += +q.dataset.qtd;
        if (item.qtd < 1) sacola.splice(+q.dataset.idx, 1);
        salvarSacola();
      } else if (r) {
        sacola.splice(+r.dataset.remover, 1);
        salvarSacola();
      }
    });

    $('#sacola-finalizar')?.addEventListener('click', () => {
      window.open(linkWhatsApp(mensagemWhatsApp()), '_blank', 'noopener');
    });

    // Textos que dependem da configuração
    $$('[data-frete-gratis]').forEach((el) => {
      if (LOJA.freteGratisAcima) el.textContent = `Frete grátis acima de ${brl(LOJA.freteGratisAcima).replace(',00', '')}`;
      else el.hidden = true;
    });
    $$('[data-parcelas]').forEach((el) => (el.textContent = `Até ${LOJA.parcelasSemJuros}x sem juros`));
    $$('[data-troca]').forEach((el) => (el.textContent = `Primeira troca grátis em ${LOJA.diasTroca} dias`));
    $$('[data-dias-troca]').forEach((el) => (el.textContent = LOJA.diasTroca));
    $$('[data-pix]').forEach((el) => (el.textContent = LOJA.descontoPix ? `${LOJA.descontoPix}%` : ''));
    $$('[data-whatsapp]').forEach((el) => {
      el.href = linkWhatsApp(el.dataset.whatsapp || 'Olá, Nayra Kids!');
    });
    $$('[data-instagram]').forEach((el) => {
      el.href = `https://instagram.com/${LOJA.instagram}`;
      if (el.dataset.instagram === 'texto') el.textContent = '@' + LOJA.instagram;
    });
    $$('[data-ano]').forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- página inicial ---------- */

  function initVaral() {
    const svg = $('#varal');
    if (!svg) return;

    // Fio do varal: curva de x=-20 a x=1420, mais baixa no meio
    const L = 1400;
    const yFio = (x) => {
      const t = (x + 20) / (L + 40);
      return 36 + 308 * t * (1 - t);
    };

    const pecas = [
      { x: 56, peca: 'body', cor: '#00B7A8', estampa: 'listras', href: 'produtos.html?para=bebe&cat=bodies', nome: 'Bodies de bebê', esc: 1.05 },
      { x: 196, peca: 'vestido', cor: '#FF4F8B', estampa: 'poa', href: 'produtos.html?para=meninas&cat=vestidos', nome: 'Vestidos', esc: 1.35 },
      { x: 336, peca: 'laco', cor: '#FFD23F', estampa: 'lisa', href: 'produtos.html?cat=acessorios', nome: 'Laços e acessórios', esc: 0.85 },
      { x: 462, peca: 'saia', cor: '#9B51E0', estampa: 'lisa', href: 'produtos.html?para=meninas&cat=shorts-saias', nome: 'Saias', esc: 1.1 },
      { x: 938, peca: 'vestido', cor: '#FFD23F', estampa: 'vichy', href: 'produtos.html?para=meninas&cat=vestidos', nome: 'Vestidos', esc: 1.4 },
      { x: 1064, peca: 'jardineira', cor: '#5A7FB5', estampa: 'lisa', href: 'produtos.html?para=meninos&cat=jardineiras', nome: 'Jardineiras', esc: 1.15 },
      { x: 1204, peca: 'conjunto', cor: '#FF8A34', estampa: 'listras', href: 'produtos.html?para=meninas&cat=conjuntos', nome: 'Conjuntos', esc: 1.15 },
      { x: 1344, peca: 'camiseta', cor: '#7ED957', estampa: 'listras', href: 'produtos.html?para=meninos&cat=camisetas', nome: 'Camisetas de menino', esc: 1.05 },
    ];

    const prendedores = (x, y) => `
      <g transform="translate(${x} ${y})">
        <rect x="-14" y="-10" width="7" height="22" rx="2" class="prendedor"/>
        <rect x="7" y="-10" width="7" height="22" rx="2" class="prendedor"/>
      </g>`;

    // Elementos da marca ao fundo: nuvens e confetes
    const nuvem = (x, y, e) => `
      <g class="nuvem" transform="translate(${x} ${y}) scale(${e})">
        <circle cx="0" cy="0" r="22"/><circle cx="28" cy="-12" r="28"/><circle cx="58" cy="0" r="20"/>
        <rect x="-22" y="0" width="100" height="22" rx="11"/>
      </g>`;
    const estrela = (x, y, r, cor) => {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const a = (Math.PI / 5) * i - Math.PI / 2;
        const rr = i % 2 ? r * 0.45 : r;
        pts.push(`${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`);
      }
      return `<polygon points="${pts.join(' ')}" fill="${cor}"/>`;
    };
    const confetes = [
      [120, 330, 7, '#FF4F8B'], [300, 300, 5, '#00B7A8'], [560, 70, 6, '#FF8A34'], [860, 60, 5, '#9B51E0'],
      [1130, 300, 7, '#00B7A8'], [1290, 280, 5, '#FF4F8B'], [600, 420, 5, '#9B51E0'], [820, 440, 6, '#FFD23F'],
    ];

    let html = `<g aria-hidden="true">
      ${nuvem(380, 400, 1.1)}${nuvem(1000, 380, 0.9)}${nuvem(60, 420, 0.8)}${nuvem(1280, 430, 1)}
      ${confetes.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')}
      ${estrela(250, 410, 13, '#FFD23F')}${estrela(1150, 420, 11, '#FFD23F')}${estrela(690, 60, 9, '#FF4F8B')}
    </g>
    <path d="M-20 36 Q${L / 2} 190 ${L + 20} 36" class="varal-fio"/>`;

    pecas.forEach((p, i) => {
      const yy = yFio(p.x);
      const s = p.esc;
      const desenho = desenhoPeca(p.peca, p.cor, p.estampa).replace(/<svg[^>]*>/, '').replace('</svg>', '');
      const topo = p.peca === 'laco' ? 40 : p.peca === 'saia' ? 30 : 16;
      html += `
        <a href="${p.href}" class="varal-link" aria-label="${p.nome}">
          <g transform="translate(${p.x - 60 * s} ${yy - topo * s + 6}) scale(${s})">
            <g class="varal-hover"><g class="varal-peca" style="--atraso:${(i * 0.09).toFixed(2)}s">${desenho}</g></g>
          </g>
          ${prendedores(p.x, yy)}
        </a>`;
    });

    // Logo oficial pendurado no meio do varal
    const lw = 300, lh = 343;
    const ly = yFio(L / 2);
    html += `
      <g class="varal-logo" role="img" aria-label="Nayra Kids">
        <g transform="translate(${L / 2 - lw / 2} ${ly - 10})">
          <g class="varal-hover"><g class="varal-peca" style="--atraso:.35s">
            <image href="img/logo-nayra-kids.png" width="${lw}" height="${lh}"/>
          </g></g>
        </g>
        ${prendedores(L / 2 - 64, yFio(L / 2 - 64))}${prendedores(L / 2 + 64, yFio(L / 2 + 64))}
      </g>`;

    svg.innerHTML = html;
  }

  function initNovidades() {
    const grade = $('#grade-novidades');
    if (!grade) return;
    // Novidades primeiro; completa com outras peças até 8 para não sobrar buraco na grade
    const novos = PRODUTOS.filter((p) => p.novo && !p.esgotado);
    const outros = PRODUTOS.filter((p) => !p.novo && !p.esgotado);
    const lista = novos.concat(outros).slice(0, 8);
    grade.innerHTML = lista.length
      ? lista.map(cardProduto).join('')
      : '<p class="vazio-texto">As primeiras peças chegam em breve.</p>';
  }

  function initEtiquetas() {
    $$('[data-desenho]').forEach((el) => {
      const [peca, cor, estampa] = el.dataset.desenho.split(',');
      el.innerHTML = desenhoPeca(peca, cor, estampa);
    });
  }

  function initTabelaTamanhos() {
    const abas = $$('[data-aba-tabela]');
    abas.forEach((aba) =>
      aba.addEventListener('click', () => {
        abas.forEach((a) => a.setAttribute('aria-selected', String(a === aba)));
        $$('[data-painel-tabela]').forEach((p) => (p.hidden = p.dataset.painelTabela !== aba.dataset.abaTabela));
      })
    );
  }

  /* ---------- catálogo ---------- */

  function initCatalogo() {
    const grade = $('#grade-catalogo');
    if (!grade) return;

    const params = new URLSearchParams(location.search);
    const estado = {
      para: params.get('para') || '',
      cat: params.get('cat') || '',
      tam: params.get('tam') || '',
      q: params.get('q') || '',
      ordem: params.get('ordem') || 'relevancia',
    };

    const selCat = $('#filtro-categoria');
    const selTam = $('#filtro-tamanho');
    const selOrdem = $('#filtro-ordem');
    const busca = $('#filtro-busca');

    selCat.innerHTML =
      '<option value="">Todas as peças</option>' +
      Object.entries(CATEGORIAS)
        .filter(([k]) => PRODUTOS.some((p) => p.categoria === k))
        .map(([k, v]) => `<option value="${k}">${v}</option>`)
        .join('');

    const tamanhosExistentes = ORDEM_TAMANHOS.filter((t) => PRODUTOS.some((p) => p.tamanhos.includes(t)));
    selTam.innerHTML =
      '<option value="">Tamanhos</option>' +
      tamanhosExistentes.map((t) => `<option value="${t}">${t === 'Único' ? 'Tamanho único' : t}</option>`).join('');

    selCat.value = estado.cat;
    selTam.value = estado.tam;
    selOrdem.value = estado.ordem;
    busca.value = estado.q;

    const normaliza = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    function aplicar() {
      $$('[data-filtro-para]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtroPara === estado.para)));

      let lista = PRODUTOS.filter(
        (p) =>
          (!estado.para || p.publico === estado.para) &&
          (!estado.cat || p.categoria === estado.cat) &&
          (!estado.tam || p.tamanhos.includes(estado.tam)) &&
          (!estado.q || normaliza(p.nome + ' ' + (p.descricao || '')).includes(normaliza(estado.q)))
      );

      if (estado.ordem === 'menor') lista = lista.slice().sort((a, b) => a.preco - b.preco);
      else if (estado.ordem === 'maior') lista = lista.slice().sort((a, b) => b.preco - a.preco);
      else if (estado.ordem === 'novos') lista = lista.slice().sort((a, b) => (b.novo ? 1 : 0) - (a.novo ? 1 : 0));

      // esgotados sempre por último
      lista = lista.slice().sort((a, b) => (a.esgotado ? 1 : 0) - (b.esgotado ? 1 : 0));

      const titulo = estado.para ? PUBLICOS[estado.para] : 'Todo o catálogo';
      $('#catalogo-titulo').textContent = estado.cat ? `${CATEGORIAS[estado.cat]} ${estado.para ? 'para ' + titulo.toLowerCase() : ''}`.trim() : titulo;
      $('#catalogo-contagem').textContent = lista.length === 1 ? '1 peça' : `${lista.length} peças`;

      const temFiltro = estado.cat || estado.tam || estado.q || estado.para;
      grade.innerHTML = lista.length
        ? lista.map(cardProduto).join('')
        : `<div class="catalogo-vazio">
            ${desenhoPeca('camiseta', '#00B7A8', 'listras', 'vazio-desenho')}
            <h2>${PRODUTOS.length ? 'Nenhuma peça com esses filtros' : 'O catálogo está sendo montado'}</h2>
            <p>${
              PRODUTOS.length
                ? 'Tente outro tamanho ou categoria, ou fale com a gente: muitas vezes a peça chega na semana seguinte.'
                : 'As peças novas entram aqui primeiro. Quer saber antes? Chama no WhatsApp.'
            }</p>
            <div class="catalogo-vazio-acoes">
              ${temFiltro ? '<button type="button" class="botao botao-cheio" id="limpar-filtros">Limpar filtros</button>' : ''}
              <a class="botao botao-secundario" target="_blank" rel="noopener" href="${linkWhatsApp('Olá! Estou procurando uma peça no catálogo da Nayra Kids.')}">Perguntar no WhatsApp</a>
            </div>
          </div>`;

      $('#limpar-filtros')?.addEventListener('click', () => {
        Object.assign(estado, { para: '', cat: '', tam: '', q: '' });
        selCat.value = selTam.value = busca.value = '';
        aplicar();
      });

      const novos = new URLSearchParams();
      ['para', 'cat', 'tam', 'q'].forEach((k) => estado[k] && novos.set(k, estado[k]));
      if (estado.ordem !== 'relevancia') novos.set('ordem', estado.ordem);
      const qs = novos.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    }

    $$('[data-filtro-para]').forEach((b) =>
      b.addEventListener('click', () => {
        estado.para = b.dataset.filtroPara;
        aplicar();
      })
    );
    selCat.addEventListener('change', () => ((estado.cat = selCat.value), aplicar()));
    selTam.addEventListener('change', () => ((estado.tam = selTam.value), aplicar()));
    selOrdem.addEventListener('change', () => ((estado.ordem = selOrdem.value), aplicar()));
    let timer;
    busca.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => ((estado.q = busca.value.trim()), aplicar()), 150);
    });
    $('#form-busca').addEventListener('submit', (e) => e.preventDefault());

    aplicar();
    if (location.hash === '#busca') busca.focus();
  }

  /* ---------- início ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    initCabecalho();
    initVaral();
    initEtiquetas();
    initNovidades();
    initTabelaTamanhos();
    initCatalogo();
    initJanela();
    renderSacola();
  });
})();
