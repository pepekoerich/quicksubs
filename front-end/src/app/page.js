import DemoSection from "./components/DemoSection";
import Hero from "./components/Hero";
import UploadForm from "./components/UploadForm";

export default function Home() {

  return (
    <>
      <Hero
        heroCta={"Adicione legendas com simplicidade e rapidez."}
        heroDescription={"Faça o upload do seu vídeo e nós fazemos o resto."}
      />
      <section className="text-center">
        <UploadForm/>
      </section>
      <DemoSection />
    </>
  );
}
