import sellBanner from "@/assets/sell-banner.jpg";

const SellBanner = () => {
  return (
    <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
      <img
        src={sellBanner}
        alt="Sell your designer items"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width={1920}
        height={600}
      />
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="relative h-full container flex items-center justify-center">
        <div className="text-center animate-slide-up">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-background">
            Продайте свои вещи
          </h2>
          <p className="font-body text-background/80 mt-3 text-sm md:text-base max-w-md mx-auto">
            Получите мгновенную оценку ваших дизайнерских вещей онлайн или в магазине
          </p>
          <button className="mt-6 px-10 py-3 bg-background text-foreground font-body text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            Получить оценку
          </button>
        </div>
      </div>
    </section>
  );
};

export default SellBanner;
