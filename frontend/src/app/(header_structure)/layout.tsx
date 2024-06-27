"use client";
import Image from "next/image";
import logo from "./../../../public/icon.png";
import { Montserrat_Alternates } from "next/font/google";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search, ShoppingCart } from "lucide-react";
import { ReactNode, useCallback, useRef, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

const montserratAlternates = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface ICartItem {
  productId: string;
  quantity: number;
  image: string;
  price: number;
  amount: number;
  name: string;
}

export default function HeaderLayout({ children }: { children: ReactNode }) {
  const cartContentRef = useRef<HTMLDivElement>(null);
  const authContext = useAuthContext();
  const [cartContent, setCartContent] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchItemsOfCart = useCallback(() => {
    fetch("http://localhost:7777/cart/all", {
      headers: {
        Authorization: authContext!.authenticationStatus.jwt,
      },
    })
      .then((res) => res.json())
      .then((res) => setCartContent(res.message))
      .finally(() => setLoading(false));
  }, [authContext]);

  function openCartContainer() {
    if (!cartContentRef.current) return;

    const openDataset = cartContentRef.current.dataset.open;

    if (openDataset == "true") {
      cartContentRef.current.dataset.open = "false";
    } else {
      fetchItemsOfCart();
      cartContentRef.current.dataset.open = "true";
    }
  }

  return (
    <div className="min-h-screen w-screen px-[196px] bg-white pb-36">
      <header className="flex w-full items-center justify-between gap-16 py-6">
        <Link
          href={"/"}
          className="flex items-center justify-center gap-1.5 w-fit"
        >
          <Image src={logo} alt="Logo" className="w-8 h-8 object-cover" />
          <h1
            className={
              montserratAlternates.className +
              " font-semibold text-base text-black"
            }
          >
            AutoSphere
          </h1>
        </Link>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Pesquise por toda loja"
            className="border border-[#D6D6D6] rounded-md p-2 pl-8 text-sm w-full outline-none text-black"
          />
          <button>
            <Search
              strokeWidth={2}
              size={16}
              color="#D6D6D6"
              className="absolute top-1/2 -translate-y-1/2 left-2"
            />
          </button>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="relative">
            <button
              onClick={openCartContainer}
              className="flex items-center justify-center"
            >
              <ShoppingCart strokeWidth={2} color="#000000" size={24} />
              <ChevronDown color="#000000" size={16} />
            </button>
            <div
              data-open="false"
              ref={cartContentRef}
              className="data-[open='false']:hidden block absolute max-w-80 max-h-96 overflow-y-scroll z-50 left-1/2 top-[calc(100%+8px)] -translate-x-1/2 bg-white shadow-sm px-2 rounded-md border border-zinc-200"
            >
              {cartContent.length == 0 && (
                <span className="text-xs">Nenhum item no carrinho...</span>
              )}
              {cartContent.length > 0 &&
                cartContent.map((cartItem) => (
                  <>
                    <CartContentCard
                      amount={cartItem.amount}
                      image={cartItem.image}
                      name={cartItem.name}
                      key={cartItem.productId}
                    />
                    <div className="sticky bottom-0 pt-5 pb-2 bg-white">
                      <div className="flex items-center justify-between sticky">
                        <span className="text-black text-sm">Subtotal:</span>
                        <span className="text-black text-sm">
                          {new Intl.NumberFormat("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(
                            cartContent.reduce(
                              (acc, item) => acc + item.price * item.quantity,
                              0
                            )
                          )}
                        </span>
                      </div>
                      <button className="ml-auto mt-2 text-white py-1.5 px-2 text-xs flex items-center justify-center gap-2 rounded-md bg-gradient-to-tr from-[#E21D1D] to-[#3B2D2D] hover:brightness-125 transition-all duration-300">
                        Comprar
                      </button>
                    </div>
                  </>
                ))}
            </div>
          </div>
          {!authContext?.authenticationStatus.isAuthenticated && (
            <>
              <Link className="text-black underline" href={"/register"}>
                Registrar
              </Link>
              <Link
                className="text-white py-3 px-4 text-xs flex items-center justify-center gap-2 rounded-md bg-gradient-to-tr from-[#E21D1D] to-[#3B2D2D] hover:brightness-125 transition-all duration-300"
                href={"/login"}
              >
                ENTRAR
                <ArrowRight size={12} color="#ffffff" />
              </Link>
            </>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}

function CartContentCard({
  image,
  name,
  amount,
}: {
  image: string;
  name: string;
  amount: number;
}) {
  return (
    <div className="flex items-center max-w-80 border-b border-gray-200-100 py-3">
      <img src={image} className="flex-none w-16 h-16 mr-2 object-fill" />
      <div className="flex flex-col overflow-hidden">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis text-black text-xs">
          {name}
        </span>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-zinc-400 text-xs">Qtd.: {amount}</span>
          <button className="text-red-400 text-xs">Excluir</button>
        </div>
      </div>
    </div>
  );
}
