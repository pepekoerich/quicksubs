import Link from "next/link";
import LogoIcon from "./LogoIcon";

export default function Header() {
  return (
    <header className="flex justify-between my-8">
      <Link href="/" className="flex gap-1 items-center">
        <LogoIcon />
        <span className="text-xl">QuickSubs</span>
      </Link>
      <nav className="flex gap-2 md:gap-4 text-white/90 items-center sm:text-xl text-[15px]">
        <Link
          href="/"
          className="hover:scale-125 delay-0 duration-500 hover:text-white"
        >
          Home
        </Link>
        <Link
          href="/faqs"
          className="hover:scale-125 delay-0 duration-500 hover:text-white"
        >
          FAQs
        </Link>
        <a
          href="/planos"
          className="hover:scale-125 delay-0 duration-500 hover:text-white"
        >
          Planos
        </a>
        <a
          href="/contato"
          className="hover:scale-125 delay-0 duration-500 hover:text-white"
        >
          Contato
        </a>
      </nav>
    </header>
  );
}
