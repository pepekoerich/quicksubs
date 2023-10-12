import React from "react";
import TranscriptionItem from "./TranscriptionItem";

export default function TranscriptionEditor({
  awsTranscription,
  setAwsTranscription,
}) {
  function updateTranscription(index, prop, ev) {
    const newItems = [...awsTranscription];
    newItems[index][prop] = ev.target.value;
    setAwsTranscription(newItems);
  }

  return (
    <>
      <section>
        <h2 className="text-2xl mb-4">Transcrição</h2>
        <div className="grid grid-cols-3 gap-1 sticky bg-violet-700/70 p-1 rounded-md">
          <div>Começo</div>
          <div>Fim</div>
          <div>Conteúdo</div>
        </div>
        <section className="max-h-[565px] h-fit sm:h-[603px] overflow-y-scroll ">
          {awsTranscription.length > 0 &&
            awsTranscription.map((item, index) => (
              <TranscriptionItem
                item={item}
                key={index}
                handleContentChange={(ev) =>
                  updateTranscription(index, "content", ev)
                }
                handleStartTimeChange={(ev) =>
                  updateTranscription(index, "start_time", ev)
                }
                handleEndTimeChange={(ev) =>
                  updateTranscription(index, "end_time", ev)
                }
              />
            ))}
        </section>
      </section>
    </>
  );
}
