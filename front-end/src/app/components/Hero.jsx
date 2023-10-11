
export default function Hero({heroCta, heroDescription}) {
  return (
    <section className="text-center mt-24 mb-12">
      <h1
        className="text-4xl"
        style={{ textShadow: "3px 3px 0 rgba(0,0,0,.2)" }}
      >
        {heroCta}
      </h1>
      <h2 className="text-white/75 my-2">
        {heroDescription}
      </h2>
    </section>
  );
}
