import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, CreditCard, Plus, Edit2, Check, Heart } from "lucide-react";
import { useTelegram } from "@/context/TelegramContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useProducts } from "@/hooks/useProducts";
import PageHeader from "@/components/PageHeader";

const Profile = () => {
  const { user } = useTelegram();
  const { profile, saveProfile } = useUserProfile();
  const { products } = useProducts();

  const [editCity, setEditCity] = useState(false);
  const [editPayment, setEditPayment] = useState(false);
  const [cityVal, setCityVal] = useState("");
  const [paymentVal, setPaymentVal] = useState("");

  const myProducts = products.filter((p) => p.seller_id === user?.id);
  const displayName = user ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}` : "—";

  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <span className="font-heading text-base font-semibold text-foreground">Профиль</span>
      </PageHeader>

      <div className="px-4 pt-6 space-y-5">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
            {user?.photo_url ? (
              <img src={user.photo_url} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-heading font-bold text-primary">{displayName.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">{displayName}</p>
            {user?.username && <p className="text-sm text-muted-foreground font-body">@{user.username}</p>}
          </div>
        </div>

        {/* City */}
        <div className="bg-card border border-border rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-body">
              <MapPin size={13} /> Город
            </span>
            {editCity ? (
              <button onClick={() => { saveProfile({ city: cityVal }); setEditCity(false); }} className="text-primary">
                <Check size={16} />
              </button>
            ) : (
              <button onClick={() => { setCityVal(profile.city); setEditCity(true); }} className="text-muted-foreground">
                <Edit2 size={14} />
              </button>
            )}
          </div>
          {editCity ? (
            <input autoFocus type="text" value={cityVal} onChange={(e) => setCityVal(e.target.value)}
              placeholder="Введите город"
              className="w-full bg-transparent text-sm font-body text-foreground outline-none border-b border-primary pb-1" />
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
              <button onClick={() => { saveProfile({ payment_info: paymentVal }); setEditPayment(false); }} className="text-primary">
                <Check size={16} />
              </button>
            ) : (
              <button onClick={() => { setPaymentVal(profile.paymentInfo); setEditPayment(true); }} className="text-muted-foreground">
                <Edit2 size={14} />
              </button>
            )}
          </div>
          {editPayment ? (
            <input autoFocus type="text" value={paymentVal} onChange={(e) => setPaymentVal(e.target.value)}
              placeholder="Банк • Номер карты"
              className="w-full bg-transparent text-sm font-body text-foreground outline-none border-b border-primary pb-1" />
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
            <Link to="/profile/add-product"
              className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-body uppercase tracking-wider px-3 py-2 rounded-sm">
              <Plus size={14} /> Добавить
            </Link>
          </div>
          {myProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground font-body text-center py-8">У вас пока нет товаров</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {myProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="aspect-square bg-card overflow-hidden rounded-sm">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-body">{p.brand}</p>
                    <p className="text-sm font-body text-foreground">{p.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-body font-semibold">{p.price}</p>
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Heart size={12} /> {p.likes_count}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
