"use client";

import axios from "axios";
import UploadIcon from "./UploadIcon";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function uploadFile(event) {
    event.preventDefault();
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      const res = await axios.postForm("/api/upload", { file });
      console.log(res.data);
      setIsUploading(false);
      router.push(`/video/${res.data.newName}`);
    }
  }

  return (
    <>
      {isUploading && (
        <>
          <div className=" fixed bg-slate-800/80 inset-0 items-center flex justify-center">
            <div className=" rounded-full shadow p-4 flex flex-col items-center gap-4">
              <Spinner className="h-20 w-20 text-[#FE7BE5]/60 rounded-full outline-offset-1 outline outline-[#ff00eeab] " />
              <span className="">Carregando...</span>
            </div>
          </div>
        </>
      )}
      <label className="border-2 shadow shadow-white hover:shadow-md hover:shadow-white ease-in-out rounded px-3 py-1 hover:bg-[#FE7BE5]/30 hover:scale-105 delay-0 duration-300 font-semibold inline-flex items-center gap-1 cursor-pointer">
        <UploadIcon />
        <span>Escolher arquivo</span>
        <input
          onChange={uploadFile}
          type="file"
          className="hidden"
          accept="video/mp4,video/x-m4v,video/*"
        />
      </label>
    </>
  );
}
