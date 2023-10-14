"use client";

import UploadIcon from "./UploadIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import axios from "axios";

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function uploadFile(event) {
    let file = event.target.files; // FileList object
    try {
      file = file[0];
      setIsUploading(true);
      const response = await axios.postForm("/api/upload", { file });
      if (response.status === 200) {
        const url = response.data.uploadUrl;
        const type = response.data.fileType;
        const newName = response.data.key;

        const uploadVideo = await fetch(url, {
          method: "PUT",
          body: file,
          key: newName,
          headers: {
            "Content-Type": type,
          },
        });

        if (uploadVideo.status === 200) {
          setIsUploading(false);
          router.push(`/${newName}`);
        }
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
    setIsUploading(false);
  }

  return (
    <>
      {isUploading && (
        <div>
          <Spinner />
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
