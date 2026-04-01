import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

const Contacts = () => {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <span className="text-sm font-medium tracking-widest uppercase text-foreground">Контакты</span>
      </PageHeader>

      <div className="px-4 py-8 max-w-lg mx-auto">
        <h1 className="text-xl font-light tracking-tight text-foreground mb-6">
          Свяжитесь с нами
        </h1>

        <div className="space-y-6">
          <div className="border-b border-border pb-5">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Telegram</p>
            <a
              href="https://t.me/ernestresale"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
            >
              @ernestresale
            </a>
          </div>

          <div className="border-b border-border pb-5">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">По вопросам продажи</p>
            <p className="text-sm text-foreground">
              Напишите нам в Telegram — ответим в течение дня.
            </p>
          </div>

          <div className="border-b border-border pb-5">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Для сотрудничества</p>
            <p className="text-sm text-foreground">
              Если вы хотите разместить архивную коллекцию или предложить партнёрство — пишите напрямую.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Часы работы</p>
            <p className="text-sm text-foreground">Пн — Вс, 10:00 — 22:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
