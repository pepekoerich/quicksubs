import LogoIcon from "./LogoIcon";

export default function DemoSection() {
  return (
    <section className="flex justify-around mt-8 items-center">
      <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl hidden sm:block">
        <video autoPlay muted className="w-full h-full">
          <source src="/videotiktok.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hidden sm:block">
        <LogoIcon classname="w-10 h-10" />
      </div>
      <div className="bg-gray-800/50 rounded-xl sm:h-[480px] sm:w-[240px] w-[240px] h-[480px]">
        <video autoPlay  muted className="rounded-xl w-full h-full">
          <source src="/tiktoklegenda.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
