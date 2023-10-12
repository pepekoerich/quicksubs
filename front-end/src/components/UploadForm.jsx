"use client";

import axios from "axios";
import UploadIcon from "./UploadIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function uploadFile(event) {
    event.preventDefault();
    const files = event.target.files;
    if (files.length > 0) {
      try {
        const file = files[0];
        setIsUploading(true);
        const res = await axios.postForm("/api/upload", { file });
        console.log(res)
        setIsUploading(false);
        router.push(`/${res.data.newName}`);
      } catch (error) {
        console.log(error);
        setIsUploading(false);
        toast.error("Erro ao fazer upload do arquivo");
      }
    }
  }

  return (
    <>
      {isUploading && (
        <div>
          <Spinner/>
        </div>
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
