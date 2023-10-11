import FaqsQA from "../components/FaqsQA";
import Hero from "../components/Hero";

export default function FaqsPage() {
  return (
    <>
      <Hero
        heroCta={"Perguntas frequentes"}
        heroDescription={
          "Explore nossa Central de Ajuda. Economize tempo e obtenha soluções para suas dúvidas"
        }
      />

      <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-6 mb-6">
        <FaqsQA
          question={"Como funciona o QuickSubs?"}
          answer={
            " O QuickSubs é simples de usar! Você envia seu vídeo, e nossa tecnologia de ponta gera legendas automaticamente. Você receberá o vídeo com legendas em questão de minutos."
          }
        />
        <FaqsQA
          question={"Em quais idiomas o QuickSubs oferece legendas?"}
          answer={
            "Atualmente, o QuickSubs oferece suporte para legendas em diversos idiomas, incluindo inglês, espanhol, francês, alemão, chinês e muitos outros. Estamos constantemente expandindo nosso suporte a idiomas para atender às necessidades de nossos usuários."
          }
        />
        <FaqsQA
          question={"Posso personalizar o estilo das legendas?"}
          answer={
            "Sim, você pode personalizar o estilo das legendas, escolhendo a fonte, cor, tamanho e posição das legendas no vídeo. Oferecemos opções de personalização para garantir que as legendas se ajustem perfeitamente ao seu vídeo."
          }
        />
        <FaqsQA
          question={"Como o QuickSubs garante a precisão das legendas?"}
          answer={
            "Utilizamos algoritmos avançados de reconhecimento de voz para garantir a precisão das legendas. Nossa tecnologia é constantemente aprimorada para oferecer legendas precisas e de alta qualidade em cada vídeo."
          }
        />
        <FaqsQA
          question={
            "Existe um limite de duração do vídeo para usar o QuickSubs?"
          }
          answer={
            "No momento, o QuickSubs suporta vídeos curtos com duração de até 3 minutos. Estamos trabalhando para aumentar esse limite no futuro para atender às necessidades de vídeos mais longos."
          }
        />
        <FaqsQA
          question={
            "Posso editar as legendas após serem geradas pelo QuickSubs?"
          }
          answer={
            "Sim, você tem a opção de editar as legendas geradas pelo QuickSubs. Você pode fazer ajustes, corrigir erros ou adicionar informações adicionais antes de finalizar o vídeo com legendas."
          }
        />
        <FaqsQA
          question={
            "O QuickSubs é seguro para informações sensíveis nos vídeos?"
          }
          answer={
            "Sim, valorizamos a privacidade e segurança dos seus vídeos. Todos os vídeos enviados são tratados com a máxima confidencialidade e são excluídos dos nossos servidores após o processamento para garantir a segurança dos seus dados."
          }
        />
        <FaqsQA
          question={
            "Existe suporte ao cliente disponível se eu precisar de ajuda?"
          }
          answer={
            "Sim, nosso suporte ao cliente está disponível para ajudá-lo com qualquer dúvida ou problema que você possa ter. Você pode entrar em contato conosco pela aba contato."
          }
        />
        <FaqsQA
          question={"Quais tipos de arquivos de vídeo o QuickSubs suporta?"}
          answer={
            "O QuickSubs suporta uma variedade de formatos de arquivo de vídeo, incluindo MP4, MOV, AVI, e muitos outros. Se você encontrar dificuldades com o formato do seu vídeo, entre em contato com nossa equipe de suporte para assistência personalizada."
          }
        />
      </div>
    </>
  );
}
