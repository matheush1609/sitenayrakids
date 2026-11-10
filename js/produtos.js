/*
  CATÁLOGO DE PRODUTOS
  ------------------------------------------------------------------
  Cada produto é um bloco { ... } separado por vírgula.
  Os produtos abaixo são EXEMPLOS: apague ou edite à vontade.

  Campos:
    id          texto único, sem espaço nem acento (vai no link do produto)
    nome        nome que aparece na loja
    publico     'meninas' | 'meninos' | 'bebe'
    categoria   'vestidos' | 'conjuntos' | 'bodies' | 'camisetas' |
                'shorts-saias' | 'jardineiras' | 'pijamas' | 'acessorios' |
                'calcados' | 'brinquedos'
    preco       número com ponto: 189.90
    precoAntigo (opcional) preço "de" riscado, para promoção
    tamanhos    lista: ['RN','P','M','G','GG','1','2','3','4','6','8','10','12','14','16','Único']
    novo        true para aparecer em "Chegou agora" na página inicial
    esgotado    (opcional) true para mostrar como esgotado
    descricao   texto do produto
    fotos       lista de caminhos de imagem, ex: ['img/produtos/vestido-1.jpg', 'img/produtos/vestido-2.jpg']
                A 1ª foto é a capa; a 2ª aparece quando passa o mouse.
                Enquanto estiver vazia [], a loja mostra um desenho da peça (campo "desenho").
    desenho     (opcional) { peca, cor, estampa }
                peca: 'vestido' | 'saia' | 'conjunto' | 'body' | 'camiseta' | 'short' | 'jardineira' | 'pijama' | 'laco' |
                'sapato' | 'ursinho'
                estampa: 'lisa' | 'poa' | 'listras' | 'vichy'
*/
window.PRODUTOS = [
  {
    id: 'vestido-tule-framboesa',
    nome: 'Vestido de tule Rosa Alegria',
    publico: 'meninas',
    categoria: 'vestidos',
    preco: 189.9,
    tamanhos: ['2', '4', '6', '8'],
    novo: true,
    descricao: 'Saia com três camadas de tule e corpo em algodão forrado, que não pinica. Zíper invisível nas costas e laço removível na cintura.',
    fotos: [],
    desenho: { peca: 'vestido', cor: '#FF4F8B', estampa: 'poa' },
  },
  {
    id: 'vestido-vichy-manteiga',
    nome: 'Vestido vichy Manteiga',
    publico: 'meninas',
    categoria: 'vestidos',
    preco: 149.9,
    tamanhos: ['1', '2', '3', '4', '6'],
    novo: true,
    descricao: 'Tricoline 100% algodão em xadrez vichy amarelo. Alças com botão de regular e saia rodada que gira bonito.',
    fotos: [],
    desenho: { peca: 'vestido', cor: '#FFD23F', estampa: 'vichy' },
  },
  {
    id: 'vestido-festa-lavanda',
    nome: 'Vestido de festa Lavanda',
    publico: 'meninas',
    categoria: 'vestidos',
    preco: 219.9,
    tamanhos: ['4', '6', '8', '10', '12'],
    novo: true,
    descricao: 'Para aniversário, casamento e batizado. Tecido com brilho suave, forro de algodão e saia com volume.',
    fotos: [],
    desenho: { peca: 'vestido', cor: '#9B51E0', estampa: 'poa' },
  },
  {
    id: 'conjunto-ciranda',
    nome: 'Conjunto Ciranda blusa e short',
    publico: 'meninas',
    categoria: 'conjuntos',
    preco: 129.9,
    tamanhos: ['4', '6', '8', '10'],
    novo: true,
    descricao: 'Blusa de malha listrada com short de cós elástico. Feito para passar o dia brincando.',
    fotos: [],
    desenho: { peca: 'conjunto', cor: '#FF8A34', estampa: 'listras' },
  },
  {
    id: 'saia-rodada-lavanda',
    nome: 'Saia rodada Lavanda',
    publico: 'meninas',
    categoria: 'shorts-saias',
    preco: 89.9,
    tamanhos: ['2', '4', '6', '8'],
    descricao: 'Saia de sarja com shortinho por baixo, para brincar sem preocupação.',
    fotos: [],
    desenho: { peca: 'saia', cor: '#B987EC', estampa: 'lisa' },
  },
  {
    id: 'pijama-poa-rosa',
    nome: 'Pijama de poá Rosinha',
    publico: 'meninas',
    categoria: 'pijamas',
    preco: 99.9,
    precoAntigo: 119.9,
    tamanhos: ['2', '4', '6', '8'],
    descricao: 'Manga longa e calça em malha macia de algodão. Punhos com ribana para não subir durante a noite.',
    fotos: [],
    desenho: { peca: 'pijama', cor: '#FF8DB4', estampa: 'poa' },
  },
  {
    id: 'kit-lacos-gorgurao',
    nome: 'Kit 3 laços de gorgurão',
    publico: 'meninas',
    categoria: 'acessorios',
    preco: 39.9,
    tamanhos: ['Único'],
    novo: true,
    descricao: 'Três laços com bico de pato forrado, que não puxa o cabelo. Cores rosa, amarelo e roxo.',
    fotos: [],
    desenho: { peca: 'laco', cor: '#FF4F8B', estampa: 'lisa' },
  },
  {
    id: 'body-listrado-menta',
    nome: 'Body listrado Verde-água',
    publico: 'bebe',
    categoria: 'bodies',
    preco: 59.9,
    tamanhos: ['P', 'M', 'G', 'GG'],
    novo: true,
    descricao: 'Malha suedine de algodão com abertura de pressão no entrepernas, para trocar a fralda sem tirar a roupa.',
    fotos: [],
    desenho: { peca: 'body', cor: '#00B7A8', estampa: 'listras' },
  },
  {
    id: 'body-vichy-rosa',
    nome: 'Body vichy Rosa',
    publico: 'bebe',
    categoria: 'bodies',
    preco: 64.9,
    tamanhos: ['RN', 'P', 'M', 'G'],
    descricao: 'Tricoline de algodão com gola boneca. Pressões no ombro e no entrepernas.',
    fotos: [],
    desenho: { peca: 'body', cor: '#FF8DB4', estampa: 'vichy' },
  },
  {
    id: 'jardineira-jeans',
    nome: 'Jardineira jeans Recreio',
    publico: 'meninos',
    categoria: 'jardineiras',
    preco: 139.9,
    tamanhos: ['2', '3', '4', '6'],
    novo: true,
    descricao: 'Jeans com elastano que acompanha o movimento. Alças com fivela de regular, para durar mais de uma estação.',
    fotos: [],
    desenho: { peca: 'jardineira', cor: '#5A7FB5', estampa: 'lisa' },
  },
  {
    id: 'camiseta-listrada-mar',
    nome: 'Camiseta listrada Folha',
    publico: 'meninos',
    categoria: 'camisetas',
    preco: 59.9,
    tamanhos: ['4', '6', '8', '10', '12'],
    descricao: 'Malha 100% algodão com listras verde-folha. Gola com ribana que não deforma na lavagem.',
    fotos: [],
    desenho: { peca: 'camiseta', cor: '#7ED957', estampa: 'listras' },
  },
  {
    id: 'bermuda-sarja-areia',
    nome: 'Bermuda de sarja Areia',
    publico: 'meninos',
    categoria: 'shorts-saias',
    preco: 79.9,
    tamanhos: ['4', '6', '8', '10', '12'],
    descricao: 'Sarja leve com cós de elástico e cordão. Dois bolsos na frente.',
    fotos: [],
    desenho: { peca: 'short', cor: '#C8AE85', estampa: 'lisa' },
  },
  {
    id: 'pijama-listrado-ceu',
    nome: 'Pijama listrado Céu',
    publico: 'meninos',
    categoria: 'pijamas',
    preco: 99.9,
    tamanhos: ['4', '6', '8'],
    descricao: 'Manga longa e calça em malha de algodão. Estampa de listras finas.',
    fotos: [],
    desenho: { peca: 'pijama', cor: '#4FB8E8', estampa: 'listras' },
  },
];
