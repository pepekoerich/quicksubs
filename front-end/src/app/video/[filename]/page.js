"use client";

import ResultVideo from "@/app/components/ResultVideo";
import TranscriptionEditor from "@/app/components/TranscriptionEditor";
import clearTranscriptionItems from "@/app/libs/awsTranscriptionHelper";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


export default function FilePage({ params }) {
  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [awsTranscription, setAwsTranscription] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetching(true);
    axios.get(`/api/transcribe?filename=${filename}`).then((res) => {
      setIsFetching(false);
      const status = res.data?.status;
      const transcription = res.data?.transcription;
      if (status === "IN_PROGRESS") {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);
        setAwsTranscription(
          clearTranscriptionItems(transcription.results.items)
        );
      }
    });
  }

  if (isTranscribing) {
    return <span className="text-center">Seu vídeo está sendo transcrito, aguarde...</span>;
  }

  if (isFetching) {
    return <span className="text-center">Buscando transcrição, aguarde...</span>;
  }


  return (
    <div>
      <div className="grid sm:grid-cols-2 md:gap-16 gap-8">
        <TranscriptionEditor awsTranscription={awsTranscription} setAwsTranscription={setAwsTranscription}/>
        <ResultVideo filename={filename} transcription={awsTranscription}/>
      </div>
    </div>
  );
}
