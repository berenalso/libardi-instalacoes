// Catálogo preservado do projeto original. Os preços são inteiros em centavos.
const produtos = [
  {
    "id": "cabo15",
    "name": "Cabo flexível SIL 1,5 mm² preto — 100 m",
    "priceCents": 11990,
    "rating": 4.8,
    "category": "Fios e cabos",
    "description": "Cabo flexível de cobre com isolamento em PVC, em rolo de 100 metros. Escolha a seção conforme o projeto elétrico.",
    "specs": [
      "Seção: 1,5 mm²",
      "Comprimento: 100 m",
      "Tensão: 750 V",
      "Cor: preto"
    ],
    "image": "/imagens/cabo15.webp",
    "sourceNode": "93:17691",
    "brand": "SIL",
    "available": true
  },
  {
    "id": "cabo25",
    "name": "Cabo flexível 2,5 mm² azul — 100 m",
    "priceCents": 18990,
    "rating": 4.9,
    "category": "Fios e cabos",
    "description": "Cabo flexível de cobre com isolação em PVC antichama. Rolo de 100 metros para instalações fixas, conforme dimensionamento do projeto.",
    "specs": [
      "Seção: 2,5 mm²",
      "Comprimento: 100 m",
      "Tensão: 750 V",
      "Cor: azul"
    ],
    "image": "/imagens/cabo25.png",
    "sourceNode": "93:17970",
    "brand": "Libardi",
    "available": true
  },
  {
    "id": "cabo4",
    "name": "Cabo flexível SIL 4 mm² vermelho — 100 m",
    "priceCents": 31990,
    "rating": 4.6,
    "category": "Fios e cabos",
    "description": "Condutor flexível de cobre com isolação em PVC. A aplicação e a proteção devem seguir o dimensionamento do circuito.",
    "specs": [
      "Seção: 4 mm²",
      "Comprimento: 100 m",
      "Tensão: 750 V",
      "Cor: vermelho"
    ],
    "image": "/imagens/cabo4.webp",
    "sourceNode": "93:18249",
    "brand": "SIL",
    "available": true
  },
  {
    "id": "cabopp",
    "name": "Cabo PP Cobrecom 3 × 2,5 mm² preto — 50 m",
    "priceCents": 39990,
    "rating": 4.7,
    "category": "Fios e cabos",
    "description": "Cabo multipolar flexível com cobertura externa preta. Produto em rolo de 50 metros; confira a aplicação no projeto.",
    "specs": [
      "Condutores: 3",
      "Seção: 2,5 mm²",
      "Comprimento: 50 m",
      "Cor: preto"
    ],
    "image": "/imagens/cabopp.webp",
    "sourceNode": "93:18528",
    "brand": "Cobrecom",
    "available": true
  },
  {
    "id": "paralelo",
    "name": "Fio paralelo Megatron 2 × 1,5 mm² branco — 100 m",
    "priceCents": 24990,
    "rating": 5.0,
    "category": "Fios e cabos",
    "description": "Fio paralelo branco com dois condutores de cobre, indicado para aplicações internas compatíveis com sua especificação.",
    "specs": [
      "Condutores: 2",
      "Seção: 1,5 mm²",
      "Comprimento: 100 m",
      "Tensão: 300 V"
    ],
    "image": "/imagens/paralelo.webp",
    "sourceNode": "93:18807",
    "brand": "Megatron",
    "available": true
  },
  {
    "id": "tomada10",
    "name": "Tomada 2P+T 10 A branca — módulo",
    "priceCents": 990,
    "rating": 4.8,
    "category": "Tomadas e interruptores",
    "description": "Módulo de tomada 2P+T branco. Confira a compatibilidade com a linha de suporte e placa; acabamento completo vendido separadamente.",
    "specs": [
      "Corrente: 10 A",
      "Tensão: 250 V",
      "Padrão: 2P+T",
      "Acabamento: branco"
    ],
    "image": "/imagens/tomada10.png",
    "sourceNode": "93:19086",
    "brand": "Libardi",
    "available": true
  },
  {
    "id": "tomada20",
    "name": "Tomada Tramontina Liz 2P+T 20 A branca",
    "priceCents": 1490,
    "rating": 4.9,
    "category": "Tomadas e interruptores",
    "description": "Tomada branca com placa e suporte. Os terminais e o circuito devem ser compatíveis com a corrente nominal do produto.",
    "specs": [
      "Corrente: 20 A",
      "Tensão: 250 V",
      "Padrão: 2P+T",
      "Linha: Liz"
    ],
    "image": "/imagens/tomada20.webp",
    "sourceNode": "93:19365",
    "brand": "Tramontina",
    "available": true
  },
  {
    "id": "simples",
    "name": "Interruptor simples Pial Plus+ 10 A branco",
    "priceCents": 1290,
    "rating": 4.6,
    "category": "Tomadas e interruptores",
    "description": "Conjunto de interruptor simples branco para comando de iluminação. Inclui módulo e placa da linha Pial Plus+.",
    "specs": [
      "Teclas: 1 simples",
      "Corrente: 10 A",
      "Tensão: 250 V",
      "Linha: Pial Plus+"
    ],
    "image": "/imagens/simples.webp",
    "sourceNode": "93:19644",
    "brand": "Pial",
    "available": true
  },
  {
    "id": "duplo",
    "name": "Interruptor duplo Tramontina Liz 10 A branco",
    "priceCents": 1990,
    "rating": 4.7,
    "category": "Tomadas e interruptores",
    "description": "Duas teclas simples independentes em uma placa branca, para comando de dois pontos de iluminação.",
    "specs": [
      "Teclas: 2 simples",
      "Corrente: 10 A",
      "Linha: Liz",
      "Cor: branco"
    ],
    "image": "/imagens/duplo.webp",
    "sourceNode": "93:19923",
    "brand": "Tramontina",
    "available": true
  },
  {
    "id": "conjunto",
    "name": "Conjunto Soprano Revitá interruptor + tomada 10 A",
    "priceCents": 2490,
    "rating": 5.0,
    "category": "Tomadas e interruptores",
    "description": "Conjunto montado com interruptor simples e tomada em uma única placa branca da linha Revitá.",
    "specs": [
      "Interruptor: simples 10 A",
      "Tomada: 2P+T 10 A",
      "Placa: 4 × 2",
      "Cor: branco"
    ],
    "image": "/imagens/conjunto.webp",
    "sourceNode": "93:20202",
    "brand": "Soprano",
    "available": true
  },
  {
    "id": "lampada",
    "name": "Lâmpada LED Taschibra TKL 60 9 W 6500 K",
    "priceCents": 690,
    "rating": 4.8,
    "category": "Iluminação",
    "description": "Lâmpada LED de luz branca fria, com base E27. Indicada para luminárias compatíveis com o formato e a potência.",
    "specs": [
      "Potência: 9 W",
      "Temperatura: 6500 K",
      "Base: E27",
      "Alimentação: autovolt"
    ],
    "image": "/imagens/lampada.webp",
    "sourceNode": "93:20481",
    "brand": "Taschibra",
    "available": true
  },
  {
    "id": "painel",
    "name": "Painel LED de embutir 18 W 6500 K",
    "priceCents": 4490,
    "rating": 4.9,
    "category": "Iluminação",
    "description": "Painel LED quadrado com presilhas para embutir. Confirme as medidas do recorte antes de instalar.",
    "specs": [
      "Potência: 18 W",
      "Temperatura: 6500 K",
      "Instalação: embutir",
      "Formato: quadrado"
    ],
    "image": "/imagens/painel.png",
    "sourceNode": "93:20760",
    "brand": "Libardi",
    "available": true
  },
  {
    "id": "spot",
    "name": "Spot LED Avant de embutir redondo 7 W 6500 K",
    "priceCents": 1490,
    "rating": 4.6,
    "category": "Iluminação",
    "description": "Spot LED redondo para iluminação direcionada. Corpo branco e instalação de embutir, conforme recorte especificado.",
    "specs": [
      "Potência: 7 W",
      "Temperatura: 6500 K",
      "Formato: redondo",
      "Recorte: 115 mm"
    ],
    "image": "/imagens/spot.webp",
    "sourceNode": "93:21039",
    "brand": "Avant",
    "available": true
  },
  {
    "id": "refletor",
    "name": "Refletor Blumenau LED Tech Pro 50 W preto",
    "priceCents": 5990,
    "rating": 4.7,
    "category": "Iluminação",
    "description": "Refletor LED com suporte ajustável. Corpo em alumínio e frente em vidro; instalação conforme orientação do fabricante.",
    "specs": [
      "Potência: 50 W",
      "Alimentação: bivolt",
      "Proteção: IP66",
      "Cor: preto"
    ],
    "image": "/imagens/refletor.webp",
    "sourceNode": "93:21318",
    "brand": "Blumenau",
    "available": true
  },
  {
    "id": "luminaria",
    "name": "Luminária Avant Slim de sobrepor 18 W — 50 cm",
    "priceCents": 2990,
    "rating": 5.0,
    "category": "Iluminação",
    "description": "Luminária linear slim para ambientes internos. Difusor plástico e base metálica, com montagem de sobrepor.",
    "specs": [
      "Potência: 18 W",
      "Comprimento: 50 cm",
      "Temperatura: 6500 K",
      "Instalação: sobrepor"
    ],
    "image": "/imagens/luminaria.webp",
    "sourceNode": "93:21597",
    "brand": "Avant",
    "available": true
  },
  {
    "id": "mono",
    "name": "Disjuntor Eletromar monopolar DIN C16 — 16 A",
    "priceCents": 1290,
    "rating": 4.8,
    "category": "Disjuntores e quadros",
    "description": "Disjuntor termomagnético monopolar para proteção de circuito. O dimensionamento deve seguir o projeto elétrico.",
    "specs": [
      "Polos: 1",
      "Corrente: 16 A",
      "Curva: C",
      "Montagem: trilho DIN"
    ],
    "image": "/imagens/mono.webp",
    "sourceNode": "93:21876",
    "brand": "Eletromar",
    "available": true
  },
  {
    "id": "bipolar",
    "name": "Disjuntor bipolar DIN C32 — 32 A",
    "priceCents": 3290,
    "rating": 4.9,
    "category": "Disjuntores e quadros",
    "description": "Disjuntor bipolar termomagnético para proteção contra sobrecarga e curto-circuito, conforme dimensionamento do circuito.",
    "specs": [
      "Polos: 2",
      "Corrente: 32 A",
      "Curva: C",
      "Montagem: trilho DIN"
    ],
    "image": "/imagens/bipolar.png",
    "sourceNode": "93:22155",
    "brand": "Libardi",
    "available": true
  },
  {
    "id": "quadro",
    "name": "Quadro Steck Ouro Box 12 módulos DIN — embutir",
    "priceCents": 7990,
    "rating": 4.6,
    "category": "Disjuntores e quadros",
    "description": "Quadro de distribuição com porta para organização de dispositivos modulares. Disjuntores vendidos separadamente.",
    "specs": [
      "Capacidade: 12 módulos DIN",
      "Instalação: embutir",
      "Porta: opaca",
      "Modelo: SCM12OBR"
    ],
    "image": "/imagens/quadro.webp",
    "sourceNode": "93:22434",
    "brand": "Steck",
    "available": true
  },
  {
    "id": "dr",
    "name": "Dispositivo DR Soprano DRS-L bipolar 63 A 30 mA",
    "priceCents": 11990,
    "rating": 4.7,
    "category": "Disjuntores e quadros",
    "description": "Interruptor diferencial residual com botão de teste. Detecta corrente de fuga; a proteção contra sobrecorrente é dimensionada separadamente.",
    "specs": [
      "Polos: 2",
      "Corrente nominal: 63 A",
      "Sensibilidade: 30 mA",
      "Montagem: trilho DIN"
    ],
    "image": "/imagens/dr.webp",
    "sourceNode": "93:22713",
    "brand": "Soprano",
    "available": true
  },
  {
    "id": "dps",
    "name": "DPS Tekle classe II 20 kA 275 V — 1 polo",
    "priceCents": 2990,
    "rating": 5.0,
    "category": "Disjuntores e quadros",
    "description": "Dispositivo de proteção contra surtos para montagem em trilho DIN. Seleção e instalação conforme projeto e fabricante.",
    "specs": [
      "Classe: II",
      "Corrente máxima: 20 kA",
      "Tensão contínua: 275 V",
      "Polos: 1"
    ],
    "image": "/imagens/dps.svg",
    "sourceNode": "93:22992",
    "brand": "Tekle",
    "available": true,
    "imageNote": "Ilustração genérica de DPS; não representa o modelo exato."
  },
  {
    "id": "alicate",
    "name": "Alicate universal Tramontina 8″ isolado 1000 V",
    "priceCents": 4990,
    "rating": 4.8,
    "category": "Ferramentas e acessórios",
    "description": "Alicate universal com cabo isolado e bordas de corte temperadas. Ferramenta para uso conforme instruções do fabricante.",
    "specs": [
      "Comprimento: 8 polegadas",
      "Isolação: 1000 V",
      "Modelo: 41001/108",
      "Material: aço especial"
    ],
    "image": "/imagens/alicate.webp",
    "sourceNode": "93:23271",
    "brand": "Tramontina",
    "available": true
  },
  {
    "id": "chave",
    "name": "Chave de fenda Tramontina VDE 6 × 100 mm",
    "priceCents": 3990,
    "rating": 4.9,
    "category": "Ferramentas e acessórios",
    "description": "Chave de fenda isolada com empunhadura ergonômica. Ponta e haste compatíveis com parafusos da medida indicada.",
    "specs": [
      "Ponta: fenda 6 mm",
      "Haste: 100 mm",
      "Linha: VDE",
      "Modelo: 44315030"
    ],
    "image": "/imagens/chave.webp",
    "sourceNode": "93:23550",
    "brand": "Tramontina",
    "available": true
  },
  {
    "id": "multimetro",
    "name": "Multímetro digital Minipa ET-1002 portátil",
    "priceCents": 9990,
    "rating": 4.6,
    "category": "Ferramentas e acessórios",
    "description": "Multímetro digital portátil para medições compatíveis com suas faixas. Consulte o manual para limites de uso e categoria de medição.",
    "specs": [
      "Modelo: ET-1002",
      "Tipo: digital portátil",
      "Funções: tensão e resistência",
      "Acessórios: pontas de prova"
    ],
    "image": "/imagens/multimetro.webp",
    "sourceNode": "93:23829",
    "brand": "Minipa",
    "available": true
  },
  {
    "id": "fita",
    "name": "Fita isolante 3M Highland preta — 19 mm × 20 m",
    "priceCents": 890,
    "rating": 4.7,
    "category": "Ferramentas e acessórios",
    "description": "Fita isolante preta em rolo para aplicações compatíveis com sua classificação. Aplicar em superfície limpa conforme fabricante.",
    "specs": [
      "Largura: 19 mm",
      "Comprimento: 20 m",
      "Cor: preto",
      "Linha: Highland"
    ],
    "image": "/imagens/fita.webp",
    "sourceNode": "93:24108",
    "brand": "3M",
    "available": true
  },
  {
    "id": "caixa",
    "name": "Caixa de passagem Mondiale PVC — 10 × 10 cm",
    "priceCents": 1290,
    "rating": 5.0,
    "category": "Ferramentas e acessórios",
    "description": "Caixa para organização de conexões e passagem de condutores. Verifique a compatibilidade com o tipo de instalação.",
    "specs": [
      "Dimensões: 10 × 10 cm",
      "Material: PVC",
      "Cor: branco",
      "Unidade: 1 peça"
    ],
    "image": "/imagens/caixa.webp",
    "sourceNode": "93:24387",
    "brand": "Mondiale",
    "available": true
  },
  {
    "id": "conector",
    "name": "Conector WAGO 221-413 de alavanca — 3 vias",
    "priceCents": 790,
    "rating": 4.8,
    "category": "Ferramentas e acessórios",
    "description": "Conector compacto de três vias com alavancas. Corpo transparente permite visualizar o posicionamento dos condutores.",
    "specs": [
      "Modelo: 221-413",
      "Vias: 3",
      "Seções: 0,2 a 4 mm²",
      "Conexão: alavanca"
    ],
    "image": "/imagens/conector.webp",
    "sourceNode": "93:24666",
    "brand": "WAGO",
    "available": true
  }
];
const categorias = ["Fios e cabos", "Tomadas e interruptores", "Iluminação", "Disjuntores e quadros", "Ferramentas e acessórios"];

const servicos = [
  {
    "name": "Instalação elétrica residencial",
    "description": "Projeto, passagem de fios, quadros e acabamento para sua casa.",
    "price": "R$ 150,00 / ponto · exemplo"
  },
  {
    "name": "Instalação elétrica comercial",
    "description": "Instalações para lojas, escritórios e galpões, conforme avaliação técnica.",
    "price": "Sob orçamento"
  },
  {
    "name": "Manutenção e reparos",
    "description": "Diagnóstico de falhas em tomadas, circuitos e disjuntores.",
    "price": "R$ 120,00 / visita · exemplo"
  },
  {
    "name": "Quadros e disjuntores",
    "description": "Montagem, troca e adequação de quadros de distribuição e proteção.",
    "price": "Sob orçamento"
  },
  {
    "name": "Iluminação e LED",
    "description": "Instalação de lustres, spots, painéis LED e iluminação externa.",
    "price": "R$ 90,00 / ponto · exemplo"
  },
  {
    "name": "Aterramento e SPDA",
    "description": "Avaliação e execução de aterramento e proteção contra descargas atmosféricas.",
    "price": "Sob orçamento"
  }
];
