const footerLinks = {
  "Покупателям": ["Каталог", "Новинки", "Скидки", "Дизайнеры", "Коллекции"],
  "Продавцам": ["Как продать", "Оценка онлайн", "Условия выкупа"],
  "Компания": ["О нас", "Магазины", "Блог", "Контакты", "Вакансии"],
  "Помощь": ["Доставка", "Возвраты", "Подлинность", "FAQ"],
};

const SiteFooter = () => {
  return (
    <footer className="bg-foreground text-background/80 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="font-heading text-xl font-bold text-background">
              Luxe<span className="text-primary-foreground/70">Resale</span>
            </a>
            <p className="mt-3 text-xs leading-relaxed text-background/60 font-body">
              Крупнейший ресейл-магазин аутентичной дизайнерской моды. Покупайте и продавайте люксовые вещи с гарантией подлинности.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-xs font-bold uppercase tracking-widest text-background mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs font-body text-background/60 hover:text-background transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40 font-body">
            © 2025 LuxeResale. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-background/40 hover:text-background/70 font-body transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-xs text-background/40 hover:text-background/70 font-body transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
