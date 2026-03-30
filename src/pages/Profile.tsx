import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, CreditCard, Plus, Edit2, Check } from "lucide-react";
import { useTelegram } from "@/context/TelegramContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserProducts } from "@/hooks/useUserProducts";
import ProductCard from "@/components/ProductCard";

const Profile = () => {
  const { user } = useTelegram();
  const { profile, saveProfile } = useUserProfile();
  const { myProducts } = useUserProducts(user?.id);

  const [editCity, setEditCity] = useState(false);
  const [editPayment, setEditPayment] = useState(false);
  const [cityVal, setCityVal] = useState(profile.city);
  const [paymentVal, setPaymentVal] = useState(profile.paymentInfo);

  const displayName = user ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}` : "—";
  const username = user?.username ? `@${user.username}` : "";

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-14 flex items-center">
        <span className="font-heading text-base font-semibold text-foreground">Профиль</span>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
            {user?.photo_url ? (
              <img src={user.photo_url} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-heading font-bold text-primary">
                {displayName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">{displayName}</p>
            {username && (
              <p className="text-sm text-muted-foreground font-body">{username}</p>
            )}
          </div>
        </div>

        {/* City */}
        <div className="bg-card border border-border rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-body">
              <MapPin size={13} /> Город
            </span>
            {editCity ? (
              <button
                onClick={() => { saveProfile({ city: cityVal }); setEditCity(false); }}
                className="text-primary"
              >
                <Check size={16} />
              </button>
            ) : (
              <button onClick={() => setEditCity(true)} className="text-muted-foreground">
                <Edit2 size={14} />
              </button>
            )}
          </div>
          {editCity ? (
            <input
              autoFocus
              type="text"
              value={cityVal}
              onChange={(e) => setCityVal(e.target.value)}
              placeholder="Введите город"
              className="w-full bg-transparent text-sm font-body text-foreground outline-none border-b border-primary pb-1"
            />
          ) : (
            <p className="text-sm font-body text-foreground">
              {profile.city || <span className="text-muted-foreground italic">Не указан</span>}
            </p>
          )}
        </div>

        {/* Payment */}
        <div className="bg-card border border-border rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-body">
              <CreditCard size={13} /> Реквизиты
            </span>
            {editPayment ? (
              <button
                onClick={() => { saveProfile({ paymentInfo: paymentVal }); setEditPayment(false); }}
                className="text-primary"
              >
                <Check size={16} />
              </button>
            ) : (
              <button onClick={() => setEditPayment(true)} className="text-muted-foreground">
                <Edit2 size={14} />
              </button>
            )}
          </div>
          {editPayment ? (
            <input
              autoFocus
              type="text"
              value={paymentVal}
              onChange={(e) => setPaymentVal(e.target.value)}
              placeholder="Банк • Номер карты"
              className="w-full bg-transparent text-sm font-body text-foreground outline-none border-b border-primary pb-1"
            />
          ) : (
            <p className="text-sm font-body text-foreground">
              {profile.paymentInfo || <span className="text-muted-foreground italic">Не указаны</span>}
            </p>
          )}
        </div>

        {/* My listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-body">
              Мои товары {myProducts.length > 0 && `(${myProducts.length})`}
            </h3>
            <Link
              to="/profile/add-product"
              className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-body uppercase tracking-wider px-3 py-2 rounded-sm"
            >
              <Plus size={14} /> Добавить
            </Link>
          </div>

          {myProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground font-body text-center py-8">
              У вас пока нет товаров
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {myProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  brand={p.brand}
                  name={p.name}
                  price={p.price}
                  condition={p.condition}
                  likes={p.likes}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
