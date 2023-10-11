"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import Icons from "../components/Icons";
import InputCustom from "../components/InputCustom";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@material-tailwind/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const sendForm = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Preencha todos os campos");
    } else {
      try {
        setLoading(true);
        const res = await axios.postForm("/api/contact", formData);
        toast.success(res.data.message);
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        toast.error("Erro ao enviar mensagem");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && (
        <>
          <div className=" fixed bg-slate-800/80 inset-0 items-center flex justify-center">
            <div className=" rounded-full shadow p-4 flex flex-col items-center gap-4">
              <Spinner className="h-20 w-20 text-[#FE7BE5]/60 rounded-full outline-offset-1 outline outline-[#ff00eeab] " />
              <span className="">Carregando...</span>
            </div>
          </div>
        </>
      )}
      <Hero
        heroCta={"Ficou com alguma dúvida?"}
        heroDescription={
          "Mande um email! Você será respondido o mais rápido possível."
        }
      />

      <Icons />
      <form onSubmit={sendForm}>
        <InputCustom
          type="text"
          labelName="Nome"
          name="name"
          value={formData.name}
          placeholder="John Doe"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="shadow-lg"
        />
        <InputCustom
          type="email"
          labelName="E-Mail"
          name="email"
          value={formData.email}
          placeholder="johndoe@email.com"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label className="text-lg">Mensagem</label>
        <textarea
          name="message"
          cols="30"
          rows="5"
          className="mt-2 mb-6 shadow-lg bg-[#FE7BE5]/30 border border-[#FE7BE5]  text-white text-sm rounded-lg block w-full p-2.5 placeholder:text-white/70"
          placeholder="Gostei muito do seu trabalho..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>
        <div>
          <button className="border-2 shadow shadow-white hover:shadow-md hover:shadow-white ease-in-out rounded px-3 py-1 hover:bg-[#FE7BE5]/30 hover:scale-105 delay-0 duration-300 font-semibold inline-flex items-center gap-1 cursor-pointer w-full justify-center">
            Enviar Mensagem
          </button>
        </div>
      </form>
    </div>
  );
}
