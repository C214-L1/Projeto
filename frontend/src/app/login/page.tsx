"use client";
import Image from "next/image";
import logo from "../../../public/icon.png";
import { Montserrat_Alternates } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import axios from "axios";

const montserratAlternates = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Login() {
  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>();

  function onSubmitLoginEvent(event: FormEvent) {
    event.preventDefault();

    axios
      .post("http://localhost:7777/login", {
        email: user,
        password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="h-screen w-screen bg-zinc-100 flex items-center justify-center">
      <section className="px-24 py-8 h-full flex-1">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-1.5 mb-40">
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
                Bem vindo!
              </span>
              <p className="text-base text-center text-zinc-400 w-full">
                Digite seu e-mail ou celular e senha para acessar sua conta
              </p>
            </div>
            <form
              onSubmit={onSubmitLoginEvent}
              className="w-full flex flex-col mt-[72px]"
            >
              <label htmlFor="" className="text-black text-base">
                Email ou celular
                <span title="Obrigatório" className="text-[#E21D1D] ml-0.5">
                  *
                </span>
              </label>
              <input
                required
                className="bg-[#8696AD] mt-1.5 mb-6 bg-opacity-[0.12] rounded-lg placeholder:text-xs placeholder:text-[#A6A6A6] outline-none text-[#A6A6A6] text-xs py-3 px-4 w-full"
                type="text"
                placeholder="Digite seu e-mail ou celular"
                onChange={(e) => setUser(e.currentTarget.value)}
              />

              <label htmlFor="" className="text-black text-base">
                Senha
                <span title="Obrigatório" className="text-[#E21D1D] ml-0.5">
                  *
                </span>
              </label>
              <input
                required
                className="bg-[#8696AD] mt-1.5 bg-opacity-[0.12] rounded-lg placeholder:text-xs placeholder:text-[#A6A6A6] outline-none text-[#A6A6A6] text-xs py-3 px-4 w-full"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <Link
                href={"#"}
                className="text-[10px] underline text-black self-end mt-1"
              >
                Esqueci a senha
              </Link>

              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 w-full py-4 rounded-md bg-gradient-to-r from-[#E21D1D] to-[#3B2D2D] mt-12"
              >
                <span className="font-semibold text-xl leading-6">ENTRAR</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
          <span className="text-black flex items-center justify-center mt-auto">
            Não possui uma conta?
            <Link href={"#"} className="underline text-[#E21D1D] ml-1.5">
              Crie uma agora!
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
