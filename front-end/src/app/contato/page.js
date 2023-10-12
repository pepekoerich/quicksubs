"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Hero from "@/components/Hero";
import Icons from "@/components/Icons";
import Spinner from "@/components/Spinner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function sendForm(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Preencha todos os campos");
    } else {
      try {
        setIsLoading(true);
        const res = await axios.postForm("/api/contact", formData);
        toast.success(res.data.message);
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        toast.error("Erro ao enviar mensagem");
      }
    }
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && (
        <div>
          <Spinner text="Enviando..." />
        </div>
      )}
      <Hero
        heroCta={"Ficou com alguma dúvida?"}
        heroDescription={
          "Mande um email! Você será respondido o mais rápido possível."
        }
      />

      <Icons />
      <form onSubmit={sendForm}>
        <label htmlFor="">Nome</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-2 mb-6 shadow-lg bg-[#FE7BE5]/30 border border-[#FE7BE5]  text-white text-sm rounded-lg block w-full p-2.5 placeholder:text-white/80"
          placeholder="John Doe"
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-2 mb-6 shadow-lg bg-[#FE7BE5]/30 border border-[#FE7BE5]  text-white text-sm rounded-lg block w-full p-2.5 placeholder:text-white/80"
          placeholder="john@email.com"
        />

        <label className="text-lg">Mensagem</label>
        <textarea
          name="message"
          cols="30"
          rows="5"
          className="mt-2 mb-6 shadow-lg bg-[#FE7BE5]/30 border border-[#FE7BE5]  text-white text-sm rounded-lg block w-full p-2.5 placeholder:text-white/80"
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
