# Site Nayra Kids

Site estático: abra o `index.html` no navegador. Para publicar, envie a pasta inteira para qualquer hospedagem de site estático (Netlify, Vercel, GitHub Pages, Hostinger etc.).

## Antes de publicar

Abra `js/config.js` e troque:

- `whatsapp`: número que recebe os pedidos (DDI + DDD + número, só dígitos, ex.: `5511987654321`)
- `instagram`: usuário, sem @
- `freteGratisAcima`, `parcelasSemJuros`, `descontoPix`, `diasTroca`: regras da loja

Confira também os textos das "Dúvidas frequentes" no final do `index.html` (prazo de envio, formas de pagamento, embrulho para presente).

## Identidade visual

O site segue o Manual de Identidade Visual 2026 da Nayra Kids:

- Cores oficiais em `css/style.css`, no bloco `:root` (rosa alegria #FF4F8B, verde água, laranja, amarelo, roxo, rosa claro, azul céu, verde folha).
- Para botões e textos pequenos usamos `--rosa-forte` (#D92B6B), uma versão mais escura do rosa principal. O #FF4F8B com texto branco não tem contraste suficiente para leitura em letras pequenas.
- Fontes: Baloo 2 (títulos e logo) e Nunito (textos). Para trocar, mude `--fonte-titulo` e `--fonte` no `:root` e o link do Google Fonts no topo dos dois HTML.
- Logo oficial: `img/logo-nayra-kids.png`, recortado do PDF do manual. Quando tiverem o arquivo vetorial final, é só substituir este arquivo mantendo o nome.

## Cadastrar produtos

Tudo fica em `js/produtos.js`. Os 13 produtos que estão lá são exemplos: apague e coloque os seus.

1. Salve as fotos em `img/produtos/`. Use JPG de até 1200px no lado maior, na proporção vertical 4:5 (ex.: 960x1200).
2. Copie um bloco `{ ... },` e mude os campos. O próprio arquivo explica cada campo.
3. Em `fotos`, coloque os caminhos: `fotos: ['img/produtos/vestido-tule-1.jpg', 'img/produtos/vestido-tule-2.jpg']`. A segunda foto aparece quando a pessoa passa o mouse.
4. Sem foto ainda? Deixe `fotos: []` e o site mostra um desenho da peça na cor e estampa do campo `desenho`.

O catálogo (`produtos.html`) monta os filtros sozinho: só aparecem as categorias e os tamanhos que existem nos produtos cadastrados.

## Como o pedido funciona

A cliente escolhe tamanho, coloca na sacola e clica em "Enviar pedido pelo WhatsApp". O site abre o WhatsApp com a lista das peças, os tamanhos e o subtotal já escritos. Frete e pagamento são combinados na conversa.

Quando quiserem pagamento automático (cartão/Pix no próprio site), dá para levar este visual para Nuvemshop, Shopify ou Tray, ou integrar um checkout como Mercado Pago.
