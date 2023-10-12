import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Icons() {
  return (
    <div className="flex gap-6 justify-center mb-6">
      <div className="rounded instagram flex items-center justify-center h-9 w-9">
        <Link href={"https://www.instagram.com/pepekoerich/"} target="_blank">
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-2xl flex items-center justify-center"
          />
        </Link>
      </div>
      <div className="rounded bg-[#00a0dc] flex items-center justify-center h-9 w-9">
        <Link href={"https://www.linkedin.com/in/pedrokoerichc"} target="_blank">
          <FontAwesomeIcon icon={faLinkedin} className="text-2xl flex items-center justify-center" />
        </Link>
      </div>
      <div className="rounded bg-[#333333] flex items-center justify-center h-9 w-9">
        <Link href={"https://github.com/pepekoerich"} target="_blank">
            <FontAwesomeIcon icon={faGithub} className="text-2xl flex items-center justify-center" />
        </Link>
      </div>
    </div>
  );
}
