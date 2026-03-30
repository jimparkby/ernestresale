import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      <img
        src={heroBanner}
        alt="Luxury designer fashion"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.4) 60%)" }} />
      <div className="relative h-full container flex items-center justify-end">
        <div className="text-right max-w-lg animate-slide-up">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-background leading-tight">
            Продайте нам
          </h1>
          <p className="font-heading text-lg md:text-2xl lg:text-3xl font-medium text-background/90 mt-2 uppercase tracking-wider">
            В магазине и онлайн
          </p>
          <button className="mt-6 md:mt-8 px-10 py-3 border-2 border-background text-background font-body text-sm uppercase tracking-widest hover:bg-background hover:text-foreground transition-all duration-300">
            Сегодня
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
