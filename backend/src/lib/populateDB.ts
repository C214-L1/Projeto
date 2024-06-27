import mongoose from "mongoose";
import { connectToMongo } from "./db";
import { Product } from "../schemas/ProductSchema";

connectToMongo();

const products = [
  {
    name: `Produto 1Conduíte Termo Retrátil Adesivo 3:1 1/2" (12,7mm) 1 metro - Incolor`,
    description:
      "Os Conduítes Termo Retráteis (Com Cola) fornecem a isolação mecânica e elétrica, protegendo contra abrasão e umidade chicotes e mangueiras.",
    price: 11.9,
    amount: 50,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/m/h/mhtra-3_1-12-in-c_foto_2.png",
    categories: ["popular"],
  },
  {
    name: "Protetor Térmico para Wastegate 45mm Titanium",
    description:
      "O Protetor Térmico para Wastegate funciona de maneira muito semelhante a uma Capa de Turbina. Afinal, as Wastegates experimentam condições muito semelhantes as Turbinas. Ambos têm gases de escape através deles e ambos emitem altas temperaturas.",
    price: 229.9,
    amount: 30,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/3/_/3_4_1.jpg",
    categories: ["popular"],
  },
  {
    name: "Protetor Térmico para Wastegate 38mm Carbon",
    description:
      "O Protetor Térmico para Wastegate funciona de maneira muito semelhante a uma Capa de Turbina. Afinal, as Wastegates experimentam condições muito semelhantes as Turbinas. Ambos têm gases de escape através deles e ambos emitem altas temperaturas.",
    price: 259.89,
    amount: 20,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/3/_/3_3_4.jpg",
    categories: ["popular"],
  },
  {
    name: `Silencioso Reflexivo Inox 304 4" x 9" com entrada e saída de 2-1/2" (Comprimento 450mm) - Polido`,
    description: `Silencioso Reflexivo Inox 304 4" x 9" com entrada e saída de 2-1/2" (Comprimento 450mm) - Polido
    Os Silenciosos Reflexivos Metal Horse se utilizam de câmara de ressonância para quebrar as ondas sonoras, reduzindo e alterando a frequência do som. Sua alta vazão permite a exaustão dos gases com baixa restrição.
    Este silencioso possui som mais alto e metalizado, com baixa ressonância, típicos de Muscle Cars, são recomendados para Motores V8 que precisam de alto fluxo de exaustão.`,
    price: 500,
    amount: 120,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/M/H/MHEP-ORMP-450-2-12-2-12_1.jpg",
    categories: ["popular"],
  },
  {
    name: "Conjunto de Arruelas em Alumínio Aerodinâmica com Parafusos M6 (10 Conjuntos) - Vermelho",
    description: `Conjunto de Arruelas em Alumínio Aerodinâmica com Parafusos M6 (10 Conjuntos) - Vermelho

O Conjunto de Arruelas Aerodinâmicas Metal Horse é composto por 10 arruelas fabricadas em 100% Alumínio para garantir o máximo de durabilidade e resistência, além de possuir acabamento anodizado para proteção contra oxidação e outros fatores climáticos.`,
    price: 40.19,
    amount: 12,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/m/h/mhbl-4-v.jpg",
    categories: ["popular"],
  },
  {
    name: `Silencioso Absorsivo Inox 304 4" x 9" com entrada e saída de 3" (Comprimento 350mm) - Polido`,
    description: `Silencioso Absorsivo Inox 304 4" x 9" com entrada e saída de 3" (Comprimento 350mm) - Polido
    Os Silenciosos Absorsivos Metal Horse, utilizam uma câmara de lã acústica sintética para e um tubo perfurado para dividir as ondas sonoras, reduzindo e alterando a frequência do som.
    O tubo perfurado é cercado por uma dupla camada de malhas, que protegem a lã acústica impedindo que essa seja queimada e expelida, aumentando a vida útil do silencioso.
    Sua alta vazão permite a exaustão dos gases com baixa restrição.
    Este silencioso possui som mais grave e encorpado, com baixa ressonância, sendo bastante discreto até 3000rpm, com giros maiores o som tende a ficar mais alto e metalizado.`,
    price: 478.88,
    amount: 2,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/M/H/MHEP-ORMP-350-3-3.jpg",
    categories: ["popular"],
  },
  {
    name: "Watercooler Upgrade para BMW M3 M4 2015+ Preto",
    description: `O Watercooler Upgrade para BMW M3 M4 2015-2020 - Metal Horse foi projetado para ser Plug & Play, construído em alumínio fundido possui um núcleo 95% maior que o original de fábrica, com fluxo de refrigeração de passagem dupla para ajudar a reduzir as temperaturas do coletor de admissão em uma média de 15°C.
    O ganho de cavalaria é de até 15 HP e 2kgfm de torque em comparação ao veículo original.`,
    price: 4599.99,
    amount: 10,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/m/h/mhwc-m3-p_foto_1.jpg",
    categories: ["popular", "performance"],
  },
  {
    name: `Adaptador Flange Eliminador Trocador de Calor Câmbio TF72 para Fiat / Jeep / Mini / BMW`,
    description: `O Adaptador Flange Eliminador Trocador de Calor Câmbio TF-72 Metal Horse é compatível com veículos Fiat, Jeep, Mini e BMW, produzido em Alumínio 6061 T6 para garantir maior durabilidade e leveza ao projeto. Essa peça permite a instalação de radiadores de óleo nos câmbios TF-72, promovendo uma troca de calor eficiente para otimizar o desempenho da transmissão. Como resultado, proporciona vida útil estendida da transmissão e uma direção mais suave e responsiva, contribuindo para um funcionamento ideal do veículo.`,
    price: 299.9,
    amount: 250,
    image:
      "https://metalhorse.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/m/h/mhes-19-s_foto_1.jpg",
    categories: ["popular"],
  },
];

// Insira os produtos no banco de dados
const populateProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log("Produtos inseridos com sucesso");
  } catch (error) {
    console.error("Erro ao inserir produtos:", error);
  } finally {
    mongoose.connection.close();
  }
};

populateProducts();
