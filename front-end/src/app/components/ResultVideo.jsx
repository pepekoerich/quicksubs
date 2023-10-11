import { useRef } from "react";
import LogoIcon from "./LogoIcon";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { formatTranscriptionItems } from "../libs/awsTranscriptionHelper";
import roboto from "./../fonts/Roboto-Regular.ttf";
import { useEffect } from "react";
import { useState } from "react";

export default function ResultVideo({ filename, transcription }) {
  const videoURL = `https://quiksubs.s3.amazonaws.com/${filename}`;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#FE7BE5");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [progress, setProgress] = useState(1);
  const ffmpegRef = useRef(new FFmpeg({ log: true }));
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src = videoURL;
    load();
  }, []);

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    await ffmpeg.writeFile("/tmp/roboto.ttf", await fetchFile(roboto));
    setLoaded(true);
  };

  function colourReverse(rgb) {
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    return "&H" + bgr + "&";
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = formatTranscriptionItems(transcription);
    await ffmpeg.writeFile(filename, await fetchFile(videoURL));
    await ffmpeg.writeFile("subs.srt", srt);
    videoRef.current.src = videoURL;
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration;
    ffmpeg.on("log", ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult && regexResult?.[1]) {
        const timeDone = regexResult?.[1];
        const [hours, minutes, seconds] = timeDone.split(":");
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const videoProgress = totalSeconds / duration;
        setProgress(videoProgress);
      }
    });
    await ffmpeg.exec([
      "-i",
      filename,
      "-preset",
      "ultrafast",
      "-vf",
      `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto,FontSize=30,MarginV=50,PrimaryColour=${colourReverse(
        primaryColor
      )},OutlineColour=${colourReverse(outlineColor)}`,
      "output.mp4",
    ]);
    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setProgress(1);
  };

  return (
    <>
      <section>
        <h2 className="text-2xl mb-4">Resultado</h2>
        <div className="mb-4">
          <button
            className="border-2 shadow shadow-white hover:shadow-md hover:shadow-white ease-in-out rounded px-3 py-1 hover:bg-[#FE7BE5]/30 hover:scale-105 delay-0 duration-300 font-semibold inline-flex items-center gap-1 cursor-pointer w-full justify-center"
            onClick={transcode}
          >
            <LogoIcon />
            <span>Legende seu vídeo.</span>
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="primary-color" className="w-full">
              Cor principal:
            </label>
            <input
              type="color"
              id="primary-color"
              value={primaryColor}
              className="md:bg-[#504099] bg-transparent hover:scale-110 duration-500 border-0 rounded-xl cursor-pointer w-full"
              onChange={(ev) => setPrimaryColor(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="outline-color" className="w-full">
              Cor da borda:
            </label>
            <input
              type="color"
              id="outline-color"
              value={outlineColor}
              className="md:bg-[#504099] bg-transparent w-full hover:scale-110 duration-500 rounded-xl cursor-pointer"
              onChange={(ev) => setOutlineColor(ev.target.value)}
            />
          </div>
        </div>
        <div className="rounded overflow-hidden relative">
          {progress && progress < 1 && (
            <div className="bg-slate-800/80 rounded absolute inset-0 flex items-center justify-center">
              <div className="bg-[#504099]/90 text-lg text-white text-center rounded-full w-20 h-20 items-center flex justify-center">
                {parseInt(progress * 100)}%
              </div>
            </div>
          )}
          <video ref={videoRef} controls></video>
        </div>
      </section>
    </>
  );
}
