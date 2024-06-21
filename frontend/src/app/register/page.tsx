"use client";
import Image from "next/image";
import logo from "../../../public/icon.png";
import { Montserrat_Alternates } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent } from "react";

const montserratAlternates = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Login() {
  function onSubmitLoginEvent(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="h-screen w-screen bg-zinc-100 flex items-center justify-center">
      <section className="px-24 py-8 h-full flex-1">
        <div className="max-w-md mx-auto h-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-1.5 mb-32">
            <Image src={logo} alt="Logo" className="w-8 h-8 object-cover" />
            <h1
              className={
                montserratAlternates.className +
                " font-semibold text-base text-black"
              }
            >
              AutoSphere
            </h1>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col items-center">
              <span className="text-black font-semibold text-[32px]">
                É sua primeira vez por aqui?
              </span>
              <p className="text-base text-center text-zinc-400 w-full">
                Bora criar uma conta para receber descontos e promoções!
              </p>
            </div>
            <form
              onSubmit={onSubmitLoginEvent}
              className="w-full flex flex-col mt-8"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="flex-1">
                  <label htmlFor="" className="text-black text-base">
                    Nome
                    <span title="Obrigatório" className="text-[#E21D1D] ml-0.5">
                      *
                    </span>
                  </label>
                  <input
                    required
                    className="bg-[#8696AD] mt-1.5 mb-6 bg-opacity-[0.12] rounded-lg placeholder:text-xs placeholder:text-[#A6A6A6] outline-none text-[#A6A6A6] text-xs py-3 px-4 w-full"
                    type="text"
                    placeholder="Digite seu primeiro nome"
                    // onChange={(e) => setUser(e.currentTarget.value)}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <label htmlFor="" className="text-black text-base">
                    Sobrenome
                    <span
                      title="Opcional"
                      className="text-[#A2A2A2] text-xs ml-0.5"
                    >
                      (opcional)
                    </span>
                  </label>
                  <input
                    required
                    className="bg-[#8696AD] mt-1.5 mb-6 bg-opacity-[0.12] rounded-lg placeholder:text-xs placeholder:text-[#A6A6A6] outline-none text-[#A6A6A6] text-xs py-3 px-4 w-full"
                    type="text"
                    placeholder="Digite seu último nome"
                    // onChange={(e) => setUser(e.currentTarget.value)}
                  />
                </div>
              </div>
              <label htmlFor="" className="text-black text-base">
                Email
                <span title="Obrigatório" className="text-[#E21D1D] ml-0.5">
                  *
                </span>
              </label>
              <input
                required
                className="bg-[#8696AD] mt-1.5 mb-4 bg-opacity-[0.12] rounded-lg placeholder:text-xs placeholder:text-[#A6A6A6] outline-none text-[#A6A6A6] text-xs py-3 px-4 w-full"
                type="text"
                placeholder="Digite seu email"
              />

              <label htmlFor="" className="text-black text-base">
                Senha
                <span title="Obrigatório" className="text-[#E21D1D] ml-0.5">
                  *
                </span>
              </label>
              <input
                required
                className="bg-[#8696AD] mt-1.5 mb-4 bg-opacity-[0.12] rounded-lg placeholder:text-xs placeholder:text-[#A6A6A6] outline-none text-[#A6A6A6] text-xs py-3 px-4 w-full"
                type="password"
                placeholder="Digite sua senha"
              />
              <label htmlFor="" className="text-black text-base">
                Confirme sua senha
                <span title="Obrigatório" className="text-[#E21D1D] ml-0.5">
                  *
                </span>
              </label>
              <input
                required
                className="bg-[#8696AD] mt-1.5 bg-opacity-[0.12] rounded-lg placeholder:text-xs placeholder:text-[#A6A6A6] outline-none text-[#A6A6A6] text-xs py-3 px-4 w-full"
                type="password"
                placeholder="Digite sua senha novamente"
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 w-full py-4 rounded-md bg-gradient-to-r from-[#E21D1D] to-[#3B2D2D] mt-12"
              >
                <span className="font-semibold text-xl leading-6">
                  Continuar
                </span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
          <span className="text-black flex items-center justify-center mt-auto">
            Já possui uma conta
            <Link href={"/login"} className="underline text-[#E21D1D] ml-1.5">
              Faça o login agora!
            </Link>
          </span>
        </div>
      </section>
      <section className="w-full flex-[2] h-full py-8 pr-8">
        {/* TODO: Change to background image */}
        <div className="relative w-full h-full bg-gradient-to-tr from-[#E21D1D] to-[#3B2D2D] rounded-3xl">
          <p
            className={
              montserratAlternates.className +
              " font-extrabold text-white text-[64px] max-w-[458px] absolute bottom-11 left-11 leading-tight"
            }
          >
            Seu <br />
            mundo de peças automotivas!
          </p>
        </div>
      </section>
    </div>
  );
}
