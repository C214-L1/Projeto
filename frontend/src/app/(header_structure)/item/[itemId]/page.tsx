"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string;
  categories: string[];
}

export default function Page({ params }: { params: { itemId: string } }) {
  const [counter, setCounter] = useState<number>(1);
  const [productInfo, setProductInfo] = useState<IProduct>();

  useEffect(() => {
    fetch(`http://localhost:7777/products/${params.itemId}`)
      .then((res) => res.json())
      .then((res) => {
        setProductInfo(res.message);
      });
  }, []);

  function addAmount() {
    if (counter < productInfo?.amount!) setCounter((prev) => prev + 1);
  }

  function removeAmount() {
    if (counter >= 2) setCounter((prev) => prev - 1);
  }

  const BRLMoney = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="text-black mt-4">
      <nav className="text-[#CECECE] text-xs flex items-center gap-2.5">
        <Link href={"/"} className="hover:underline">
          Home
        </Link>
        <span>&gt;</span>
        <Link href={`/item/${params.itemId}`} className="hover:underline">
          {params.itemId}
        </Link>
      </nav>
      <div className="flex gap-5 mt-5 h-[580px]">
        <img
          className="flex-1 h-full max-w-[500px] w-full bg-zinc-200 rounded-md object-fill"
          src={productInfo?.image}
        />
        <div className="flex-1 h-full flex flex-col">
          <span className="text-[#CDCDCD]">
            {productInfo?.amount} unidades disponíveis
          </span>
          <h1 className="text-[32px] mt-8">{productInfo?.name}</h1>
          <span>{productInfo?.description}</span>
          <span className="block text-[#CDCDCD] text-xs mt-3">
            Código {productInfo?._id}
          </span>
          <div className="mt-auto">
            <span className="text-[#E01E1E] text-4xl ml-1 inline-block max-w-52 w-full">
              {BRLMoney.format(productInfo?.price! * counter)}
            </span>
            <span className="ml-6 mr-4">Quantidade</span>
            <button
              disabled={counter <= 1}
              className="mr-2 disabled:cursor-not-allowed"
              onClick={removeAmount}
            >
              -
            </button>
            <span className="py-0.5 px-2 rounded-[4px] border border-zinc-200">
              {counter}
            </span>
            <button
              disabled={counter >= productInfo?.amount!}
              className="ml-2 disabled:cursor-not-allowed"
              onClick={addAmount}
            >
              +
            </button>

            <div className="flex items-center gap-4 mt-6">
              <button className="w-3/12 z-50 py-2 bg-gradient-to-r font-medium from-[#E21D1D] to-[#3B2D2D] rounded-[4px] text-white">
                COMPRAR
              </button>
              <button className="hover:underline">Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
