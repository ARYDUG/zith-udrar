import { useShop } from "@/context/ShopContext";
import { formatPrice, IMAGES, welcomePrice } from "@/lib/api";
import { useReveal } from "@/hooks/useReveal";

export const Welcome = () => {
  const { catalog, country, percent } = useShop();
  const ref = useReveal();
  const litre = catalog ? catalog.products[0].price[country] : 0;
  return (
    <section id="bienvenue" className="bg-white text-ink py-24 md:py-32" data-testid="welcome-section">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 items-stretch">
        <figure className="lg:col-span-7 relative min-h-[360px] rounded-3xl overflow-hidden bg-sage">
          <img src={IMAGES.welcome} alt="Une grand-mère verse l'huile de la récolte dans une bouteille" className="absolute inset-0 h-full w-full object-cover" />
        </figure>
        <div className="lg:col-span-5 rounded-3xl bg-clay text-white p-8 md:p-10 flex flex-col justify-between gap-8">
          <div>
            <p className="lab text-white/80">Offre de bienvenue</p>
            <p className="disp mt-4 tab text-[clamp(88px,10vw,160px)]" data-testid="welcome-percent">-{percent}%</p>
            <p className="mt-2 text-lg leading-[1.6]">Sur votre toute première commande. Appliquée automatiquement, sans code.</p>
          </div>
          <div className="rounded-2xl bg-white text-ink p-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-olive">Le litre</p>
              <p className="tab text-olive line-through" data-testid="welcome-regular-price">{formatPrice(litre, country)}</p>
            </div>
            <p className="disp text-4xl tab text-clay-deep" data-testid="welcome-litre-price">{formatPrice(welcomePrice(litre, country, percent), country)}</p>
          </div>
          <a href="#boutique" className="group rounded-xl bg-ink text-ground px-6 py-4 text-center font-semibold hover:bg-clay-deep transition-colors" data-testid="welcome-shop-button">
            J'en profite <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
