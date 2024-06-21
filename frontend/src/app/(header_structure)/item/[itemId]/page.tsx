"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page({ params }: { params: { itemId: string } }) {
  const [counter, setCounter] = useState<number>(1);

  function addAmount() {
    setCounter((prev) => prev + 1);
  }

  function removeAmount() {
    setCounter((prev) => prev - 1);
  }

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
        <div className="flex-1 h-full max-w-[500px] w-full bg-zinc-200 rounded-md"></div>
        <div className="flex-1 h-full flex flex-col">
          <span className="text-[#CDCDCD]">32 unidades disponíveis</span>
          <h1 className="text-[32px] mt-8">
            Protetor Térmico para Wastegate 45mm Titanium
          </h1>
          <span>
            O Protetor Térmico para Wastegate funciona de maneira muito
            semelhante a uma Capa de Turbina. Afinal, as Wastegates experimentam
            condições muito semelhantes as Turbinas. Ambos têm gases de escape
            através deles e ambos emitem altas temperaturas.
          </span>
          <span className="block text-[#CDCDCD] text-xs mt-3">
            Código 9u7hnw2-g8yedwqa-yg8eq
          </span>
          <div className="mt-auto">
            <div className="inline-block max-w-40 w-full">
              <span>R$</span>
              <span className="text-[#E01E1E] text-4xl ml-1">
                {269 * counter}
              </span>
              <span className="text-[#E01E1E] text-base">,90</span>
            </div>
            <span className="ml-6 mr-4">Quantidade</span>
            <button className="mr-2" onClick={removeAmount}>
              -
            </button>
            <span className="py-0.5 px-2 rounded-[4px] border border-zinc-200">
              {counter}
            </span>
            <button className="ml-2" onClick={addAmount}>
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
