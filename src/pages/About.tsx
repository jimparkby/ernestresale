import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

const About = () => {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <span className="text-sm font-medium tracking-widest uppercase text-foreground">О нас</span>
      </PageHeader>

      <div className="px-4 py-8 max-w-lg mx-auto">
        <h1 className="text-xl font-light tracking-tight text-foreground mb-6">
          О ernestresale
        </h1>

        <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
          <p>
            ernestresale — это маркетплейс дизайнерских вещей для тех, кто ценит уникальный стиль и осознанное потребление. Мы создали пространство, где архивные и редкие предметы одежды находят новых владельцев.
          </p>
          <p>
            Наша миссия — сделать моду более устойчивой. Каждая вещь на платформе прошла через руки своего первого владельца и несёт в себе историю. Мы верим, что хорошая одежда должна жить долго.
          </p>
          <p>
            В ernestresale вы можете найти изделия таких брендов, как Prada, Diesel, Armani, Y-3, Alexander McQueen и многих других — по справедливым ценам, напрямую от продавца.
          </p>
          <p>
            Продавайте то, что больше не носите. Покупайте то, что вас вдохновляет. Это просто.
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="text-sm font-medium text-foreground mb-4 uppercase tracking-widest">Как это работает</h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "Регистрация", desc: "Войдите через Telegram — никаких лишних данных." },
              { step: "02", title: "Добавьте товар", desc: "Сфотографируйте вещь, укажите бренд, цену и состояние." },
              { step: "03", title: "Продавайте", desc: "Договоритесь с покупателем напрямую через мессенджер." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <span className="text-xs text-muted-foreground font-light mt-0.5 shrink-0">{step}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
