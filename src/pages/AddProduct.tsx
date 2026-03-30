import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { useTelegram } from "@/context/TelegramContext";
import { useUserProducts } from "@/hooks/useUserProducts";

const conditions = ["Как новая", "Отличное", "Хорошее", "Удовлетворительное"];

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useTelegram();
  const { addProduct } = useUserProducts(user?.id);

  const [image, setImage] = useState<string | null>(null);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState(conditions[0]);
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const canSave = image && brand.trim() && name.trim() && price.trim();

  const handleSave = () => {
    if (!canSave || !user) return;
    addProduct({
      image: image!,
      brand: brand.trim(),
      name: name.trim(),
      price: price.trim().startsWith("€") ? price.trim() : `€${price.trim()}`,
      condition,
      material: material.trim() || "Кожа",
      description: description.trim(),
      sellerId: user.id,
      sellerName: `${user.first_name}${user.last_name ? " " + user.last_name : ""}`,
    });
    setSaved(true);
    setTimeout(() => navigate("/profile"), 800);
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft size={22} />
        </button>
        <span className="font-heading text-base font-semibold text-foreground flex-1">
          Новый товар
        </span>
        <button
          onClick={handleSave}
          disabled={!canSave || saved}
          className={`flex items-center gap-1.5 text-xs font-body uppercase tracking-wider px-3 py-2 rounded-sm transition-colors ${
            canSave && !saved
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {saved ? <Check size={14} /> : null}
          {saved ? "Сохранено" : "Опубликовать"}
        </button>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Photo */}
        <div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full aspect-square bg-muted border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center gap-2 overflow-hidden"
          >
            {image ? (
              <img src={image} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera size={32} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-body">Добавить фото</span>
              </>
            )}
          </button>
        </div>

        {/* Brand */}
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-body block mb-1.5">
            Бренд *
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Chanel, Louis Vuitton..."
            className="w-full bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-body text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Name */}
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-body block mb-1.5">
            Название *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Classic Flap Mini"
            className="w-full bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-body text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-body block mb-1.5">
            Цена * (€)
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="1 200"
            className="w-full bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-body text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-body block mb-1.5">
            Состояние
          </label>
          <div className="grid grid-cols-2 gap-2">
            {conditions.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`py-2.5 text-sm font-body rounded-sm border transition-colors ${
                  condition === c
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Material */}
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-body block mb-1.5">
            Материал
          </label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="Кожа, канвас..."
            className="w-full bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-body text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-body block mb-1.5">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Подробности о товаре, комплектность..."
            rows={4}
            className="w-full bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-body text-foreground outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
