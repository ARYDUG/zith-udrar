import { useShop } from "@/context/ShopContext";
import { formatPrice, IMAGES, PAYMENT_LABEL, BRAND, welcomePrice, DELIVERY_LABEL } from "@/lib/api";
import { CountryToggle } from "@/components/shop/CountryToggle";

export const Hero = () => {
  const { catalog, country, add } = useShop();
  return (
    <header id="top" className="min-h-[92svh] bg-ground text-ink py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 min-w-0">
          <p className="lab fu f1 mb-6 text-olive">Huile d'Olive de Montagne · Zith Udrar</p>
          <h1 className="disp break-words text-[clamp(56px,8vw,140px)]" data-testid="hero-title">
            <span className="ln"><span>L'huile de</span></span>
            <span className="ln"><span>nos oliviers.</span></span>
          </h1>
          <p className="fu f1 mt-8 text-lg leading-[1.6] max-w-md" data-testid="hero-differentiator">
            Notre propre récolte, de l'arbre à la bouteille, directement de notre région d'origine.
          </p>
          <div className="fu f2 mt-8 flex flex-wrap gap-4">
            <a href="#pros" className="rounded-xl border-2 border-ink px-6 py-3 font-semibold hover:bg-ink hover:text-ground transition-colors" data-testid="hero-pro-link">
              Je suis professionnel
            </a>
          </div>
        </div>
        <div className="lg:col-span-6 stage">
          <div className="tilt wipe rounded-3xl bg-white text-ink shadow-[0_40px_80px_-30px_rgba(29,42,36,.45)] p-6 md:p-8" data-testid="hero-panel">
            <div className="fu f3 flex flex-wrap items-center justify-between gap-4">
              <span className="lab text-olive">Je commande depuis</span>
              <CountryToggle testId="hero-country-toggle" />
            </div>
            <figure className="fu f3 mt-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-sage">
              <img src={IMAGES.hero} alt={`Bouteille d'huile d'olive ${BRAND}`} className="absolute inset-0 h-full w-full object-cover" />
            </figure>
            <ul className="mt-6 divide-y divide-ink/10">
              {catalog?.products.map((p, i) => (
                <li key={p.id} className={`fu ${i ? "f5" : "f4"} flex items-center justify-between gap-3 py-3`}>
                  <span className="font-semibold">{p.name}</span>
                  <span className="flex items-center gap-3">
                    <span className="tab font-semibold" data-testid={`hero-price-${p.id}`}>{formatPrice(p.price[country], country)}</span>
                    <button
                      type="button"
                      onClick={() => add(p.id)}
                      className="rounded-lg bg-ground px-3 py-1 text-sm font-semibold hover:bg-ink hover:text-ground transition-colors"
                      data-testid={`hero-add-${p.id}`}
                    >
                      + Ajouter
                    </button>
                  </span>
                </li>
              ))}
              {catalog && (
                <li className="pt-4 flex items-center justify-between gap-3 text-sm" data-testid="hero-welcome-line">
                  <span className="rounded-full bg-clay/10 text-clay-deep px-3 py-1 font-semibold">1ère commande -{catalog.welcome.percent} %</span>
                  <span className="tab font-semibold text-clay-deep">{formatPrice(welcomePrice(catalog.products[0].price[country], country, catalog.welcome.percent), country)} le litre</span>
                </li>
              )}
              <li className="pt-3 text-sm text-olive" data-testid="hero-payment-methods">{PAYMENT_LABEL[country]} · {DELIVERY_LABEL[country]}</li>
            </ul>
            <a href="#boutique" className="group mt-6 block text-center rounded-xl bg-clay text-white px-6 py-4 font-semibold hover:bg-clay-deep transition-colors" data-testid="hero-order-button">
              Commander <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const MQ = ["Notre propre récolte", "100 % naturelle", "Pressée à froid", "Montagnes de Boghni", "-20 % sur la 1ère commande", "Livraison gratuite à Tizi Ouzou", "La Poste & Yalidine", "Devis pros sous 48 h"];

export const Marquee = () => (
  <section className="bg-ink text-ground py-5 overflow-hidden" aria-label="Bandeau">
    <div className="mq disp text-2xl">
      {[...MQ, ...MQ].map((t, i) => (
        <span key={i} className="flex">
          <span className="px-8 whitespace-nowrap">{t}</span>
          <span className="px-8 text-clay-light">●</span>
        </span>
      ))}
    </div>
  </section>
);
