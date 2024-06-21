"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="w-full">
      <div className="w-[calc(100%-5%)] h-72 bg-[#D9D9D9] mx-auto rounded-[4px] shadow-md shadow-zinc-200"></div>
      <div className="w-full">
        <h4 className="text-black mt-8 font-semibold">Produtos populares</h4>
        <ul className="w-full flex items-center gap-1 mt-2 overflow-x-scroll overflow-y-hidden">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </ul>
        <h4 className="text-black mt-10 font-semibold">
          Performance pro seu veículo
        </h4>
        <ul className="w-full flex items-center gap-1 mt-2 overflow-x-scroll overflow-y-hidden">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </ul>
      </div>
    </main>
  );
}

function CardItem() {
  const router = useRouter();

  return (
    <li
      onClick={() =>
        router.push("/item/Protetor-Termico-para-Wastegate-45mm-Titanium")
      }
      className="py-3 px-6 min-w-[238px] max-w-[238px] cursor-pointer hover:scale-105 transition-transform duration-300"
      title="Protetor Térmico para Wastegate 45mm Titanium"
    >
      <div className="w-full h-28 bg-zinc-300 rounded-sm"></div>
      <h6 className="text-sm text-black mt-1">
        Protetor Térmico para Wastegate 45mm Titanium
      </h6>
      <span className="text-black text-sm flex items-baseline gap-0.5 mt-2">
        R$ <span className="text-[#E21D1D] text-xl">11,90</span>
      </span>
      <button
        onClick={(e) => e.stopPropagation()}
        className="w-full z-50 py-2 bg-gradient-to-r from-[#E21D1D] to-[#3B2D2D] rounded-[4px] text-white mt-16 text-xs"
      >
        COMPRAR
      </button>
      <button
        title="Adicionar ao carrinho"
        className="w-full text-black text-center mt-2 text-xs hover:underline"
      >
        Adicinar ao carrinho
      </button>
    </li>
  );
}
