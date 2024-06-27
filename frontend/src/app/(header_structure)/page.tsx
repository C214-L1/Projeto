"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

import backgroundPhoto from "../../../public/foto.jpg";
import Image from "next/image";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string;
  categories: string[];
}

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:7777/products/all")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.message);
      });
  }, []);

  return (
    <main className="w-full">
      <Image
        alt="background image"
        src={backgroundPhoto}
        className="object-cover w-[calc(100%-5%)] h-72 mx-auto rounded-[4px] shadow-md shadow-zinc-200"
      />
      <div className="w-full">
        <h4 className="text-black mt-8 font-semibold">Produtos populares</h4>
        <ul className="w-full flex items-center gap-1 mt-2 overflow-x-scroll overflow-y-hidden">
          {products
            .filter((product) =>
              product.categories.some((category) => category == "popular")
            )
            .map((product, i) => (
              <CardItem
                key={product._id}
                price={product.price}
                name={product.name}
                image={product.image}
                _id={product._id}
              />
            ))}
        </ul>
        <h4 className="text-black mt-10 font-semibold">
          Performance pro seu veículo
        </h4>
        <ul className="w-full flex items-center gap-1 mt-2 overflow-x-scroll overflow-y-hidden">
          {products
            .filter((product) =>
              product.categories.some((category) => category == "performance")
            )
            .map((product, i) => (
              <CardItem
                key={product._id}
                price={product.price}
                name={product.name}
                image={product.image}
                _id={product._id}
              />
            ))}
        </ul>
      </div>
    </main>
  );
}

function CardItem({
  name,
  price,
  _id,
  image,
}: Omit<IProduct, "description" | "amount" | "categories">) {
  const router = useRouter();
  const authContext = useAuthContext();

  function addToCard(id: string, e: MouseEvent<HTMLButtonElement>) {
    const { authenticationStatus } = authContext!;
    e.stopPropagation();

    if (!authenticationStatus.isAuthenticated) {
      router.push(`/login?addToCard=${id}`);
    }

    const data = {
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImZpcnN0IjoiR2FicmllbCIsImxhc3QiOiJDb3N0YSJ9LCJlbWFpbCI6ImdhYnJpZWwuY29zdDFhQGdlYy5pbmF0ZWwuYnIiLCJpYXQiOjE3MTk0MzgwNzAsImV4cCI6MTcxOTQ2Njg3MH0.Il8nS3m_-9n8x4Rzk_cZdlUMtnI2xnaBnkn9K1CcxCE",
      amount: 2,
      productId: id,
    };

    fetch("http://localhost:7777/cart/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        // setProducts(res.message);
        console.log(res.message);
      });
  }

  const BRLMoney = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <li
      onClick={() => router.push(`/item/${_id}`)}
      className="py-3 px-6 min-w-[238px] max-w-[238px] cursor-pointer hover:scale-105 transition-transform duration-300"
      title={name}
    >
      <img
        className="mx-auto h-28 bg-zinc-300 rounded-sm object-fill"
        src={image}
      />
      <h6 className="text-sm text-black mt-1 multi-lines">{name}</h6>

      <span className="text-[#E21D1D] block text-xl mt-2">
        {BRLMoney.format(price)}
      </span>
      <button
        onClick={(e) => e.stopPropagation()}
        className="w-full z-50 py-2 bg-gradient-to-r from-[#E21D1D] to-[#3B2D2D] rounded-[4px] text-white mt-16 text-xs"
      >
        COMPRAR
      </button>
      <button
        onClick={(e) => addToCard(_id, e)}
        title="Adicionar ao carrinho"
        className="w-full text-black text-center mt-2 text-xs hover:underline"
      >
        Adicinar ao carrinho
      </button>
    </li>
  );
}
