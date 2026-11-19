import { Plus } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice, IMAGES, welcomePrice } from "@/lib/api";
import { useReveal } from "@/hooks/useReveal";
import { CountryToggle } from "@/components/shop/CountryToggle";

const TAGS = { oil_5l: "La réserve de l'année", oil_1l: "Pressée à froid", oil_3l: "Pour la cuisine" };

const WelcomeTag = ({ p }) => {
  const { country, percent } = useShop();
  return (
    <p className="tab text-xs font-semibold text-clay-deep" data-testid={`shop-welcome-price-${p.id}`}>
      {formatPrice(welcomePrice(p.price[country], country, percent), country)} à la 1ère commande
    </p>
  );
};

const AddButton = ({ id, dark }) => {
  const { add } = useShop();
  return (
    <button
      type="button"
      onClick={() => add(id)}
      className={`mt-3 inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${dark ? "bg-clay text-white hover:bg-clay-deep" : "bg-ink text-ground hover:bg-clay"}`}
      data-testid={`shop-add-${id}`}
    >
      <Plus className="h-4 w-4" /> Ajouter<span className="hidden sm:inline">au panier</span>
    </button>
  );
};

const BigCard = ({ p }) => {
  const { country } = useShop();
  return (
    <article className="group col-span-2 row-span-2 rounded-3xl bg-ground p-6 flex flex-col" data-testid={`shop-card-${p.id}`}>
      <figure className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden bg-sage">
        <img src={IMAGES[p.id]} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </figure>
      <div className="mt-4 flex justify-between items-end gap-4">
        <div>
          <p className="disp text-3xl">{p.name}</p>
          <p className="text-sm text-olive">{TAGS[p.id]}</p>
          <AddButton id={p.id} dark />
        </div>
        <div className="text-right"><p className="tab text-xl font-semibold" data-testid={`shop-price-${p.id}`}>{formatPrice(p.price[country], country)}</p><WelcomeTag p={p} /></div>
      </div>
    </article>
  );
};

const SmallCard = ({ p }) => {
  const { country } = useShop();
  return (
    <article className="group rounded-3xl bg-ground p-4" data-testid={`shop-card-${p.id}`}>
      <figure className="relative aspect-square rounded-2xl overflow-hidden bg-sage">
        <img src={IMAGES[p.id]} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </figure>
      <p className="disp text-xl mt-3">{p.name}</p>
      <p className="tab text-sm font-semibold" data-testid={`shop-price-${p.id}`}>{formatPrice(p.price[country], country)}</p>
      <WelcomeTag p={p} />
      <AddButton id={p.id} />
    </article>
  );
};

export const Shop = () => {
  const { catalog } = useShop();
  const ref = useReveal();
  const byId = Object.fromEntries((catalog?.products || []).map((p) => [p.id, p]));
  return (
    <section id="boutique" className="bg-white text-ink py-24 md:py-36" data-testid="shop-section">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
          <div><p className="lab text-olive mb-3">Huile d'Olive de Montagne (Zith Udrar)</p><h2 className="disp text-[clamp(36px,5vw,80px)]">La boutique.</h2></div>
          <div className="max-w-sm">
            <p className="leading-[1.6] mb-4">Prix France en euros, Algérie en dinars. Commande envoyée sur WhatsApp. Livraison La Poste en France ; Yalidine Express en Algérie avec paiement à la livraison, gratuite à Tizi Ouzou.</p>
            <CountryToggle testId="shop-country-toggle" />
          </div>
        </div>
        {catalog && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <BigCard p={byId.oil_5l} />
            <SmallCard p={byId.oil_1l} />
            <SmallCard p={byId.oil_3l} />
            <article className="col-span-2 rounded-3xl bg-ink text-ground p-6 flex flex-col justify-between gap-6">
              <p className="disp text-[clamp(40px,5vw,72px)]">Plus de 5L ?</p>
              <a href="#pros" className="group self-start rounded-xl bg-ground text-ink px-5 py-3 font-semibold hover:bg-clay hover:text-white transition-colors" data-testid="shop-pro-link">
                Voir les tarifs pros <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};
