"use client";
import Image from "next/image";
import logo from "./../../../public/icon.png";
import { Montserrat_Alternates } from "next/font/google";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search, ShoppingCart } from "lucide-react";
import { ReactNode } from "react";

const montserratAlternates = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function HeaderLayout({ children }: { children: ReactNode }) {
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
          <button className="flex items-center justify-center">
            <ShoppingCart strokeWidth={2} color="#000000" size={24} />
            <ChevronDown color="#000000" size={16} />
          </button>
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
        </div>
      </header>
      {children}
    </div>
  );
}
