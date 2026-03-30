import { Star } from "lucide-react";

const reviews = [
  { name: "Анна К.", text: "Отличный сервис! Купила сумку Chanel, всё оригинальное, доставка быстрая.", rating: 5 },
  { name: "Мария С.", text: "Продала свою коллекцию Louis Vuitton — оценка была справедливой. Рекомендую!", rating: 5 },
  { name: "Елена В.", text: "Прекрасный магазин с огромным выбором. Персонал очень внимательный.", rating: 5 },
  { name: "Дарья Н.", text: "Всегда покупаю здесь подарки. Качество и подлинность гарантированы.", rating: 4 },
];

const ReviewsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl text-primary font-medium">
            Отзывы
          </h2>
          <p className="mt-2 text-muted-foreground font-body text-sm">
            ★ 4.8 из 5 · Более 5 000 отзывов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-card p-6 border border-border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground font-body leading-relaxed">
                "{review.text}"
              </p>
              <p className="mt-4 text-xs text-muted-foreground font-body font-medium uppercase tracking-wider">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
