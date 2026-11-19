import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/api";
import { useReveal } from "@/hooks/useReveal";

const TierPrice = ({ tier }) => {
  const { country } = useShop();
  if (!tier.price_per_litre || tier.price_per_litre[country] == null) return <p className="mt-2 font-semibold">Sur devis</p>;
  return (
    <p className="mt-2 font-semibold" data-testid={`pros-price-${tier.id}`}>
      {formatPrice(tier.price_per_litre[country], country)}/L
    </p>
  );
};

export const Pros = () => {
  const { catalog } = useShop();
  const ref = useReveal();
  return (
    <section id="pros" className="bg-sage text-ink py-24 md:py-36" data-testid="pros-section">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 min-w-0">
          <p className="lab text-clay-deep mb-4">Pros & grossistes</p>
          <h2 className="disp [text-wrap:balance] text-[clamp(36px,5vw,80px)]">Le prix baisse avec le volume.</h2>
          <p className="mt-6 text-lg leading-[1.6] max-w-md">
            Restaurants, épiceries fines, grossistes : demandez votre devis, nous répondons sous 48 h.
          </p>
        </div>
        <div className="lg:col-span-7">
          <svg viewBox="0 0 600 260" className="w-full" aria-hidden="true">
            <path d="M40 220H580M40 20V220" className="stroke-ink" strokeWidth="1" />
            <path className="draw stroke-clay" pathLength="1" d="M40 50L200 50L200 110L380 110L380 170L580 170" fill="none" strokeWidth="4" />
            <circle cx="200" cy="110" r="7" className="fill-ink" />
            <circle cx="380" cy="170" r="7" className="fill-ink" />
            <text x="200" y="244" textAnchor="middle" fontSize="16" className="fill-ink">50L</text>
            <text x="380" y="244" textAnchor="middle" fontSize="16" className="fill-ink">100L</text>
            <text x="540" y="244" textAnchor="middle" fontSize="16" className="fill-ink">Palette</text>
          </svg>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 tab">
            {catalog?.b2b_tiers.map((t) => (
              <div key={t.id} className={`rounded-2xl p-5 ${t.price_per_litre ? "bg-white" : "bg-ink text-ground"}`} data-testid={`pros-tier-${t.id}`}>
                <p className="disp text-3xl">{t.label}</p>
                <TierPrice tier={t} />
              </div>
            ))}
          </div>
          <a href="#commande" className="group mt-8 inline-block rounded-xl bg-clay text-white px-6 py-4 font-semibold hover:bg-clay-deep transition-colors" data-testid="pros-quote-button">
            Demander un devis rapide <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
