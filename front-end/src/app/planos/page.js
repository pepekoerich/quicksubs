import Image from "next/image";
import Hero from "../../components/Hero";

export default function Pricing() {
  return (
    <div>
      <Hero
        heroCta={"Confira nossos preços."}
        heroDescription={"É simples e fácil."}
      />
      <section className="bg-white text-slate-800 rounded-lg max-w-xs mx-auto p-3 text-center">
        <h3 className="font-bold text-2xl">Grátis</h3>
        <h4>grátis para sempre</h4>
      </section>
      <div className="flex flex-col justify-center items-center text-center mt-8 gap-5">
        <h2>Se gostou faz um pix!</h2>
        <Image src="/qrcode-pix.png" className="w-auto h-auto" alt="pix-pic" width={250} height={250} />
        <h2>
          Pix Copia e Cola:
          00020126360014BR.GOV.BCB.PIX0114+55489911213505204000053039865802BR5913pedro
          koerich6013florianopolis62070503***630400E8
        </h2>
      </div>
    </div>
  );
}
