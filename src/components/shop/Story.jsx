import { Check } from "lucide-react";
import { IMAGES } from "@/lib/api";
import { useReveal } from "@/hooks/useReveal";

export const Origin = () => {
  const ref = useReveal();
  return (
    <section id="origine" className="bg-ink text-ground py-24 md:py-36 overflow-hidden" data-testid="origin-section">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <p className="disp text-clay-light break-words text-[clamp(80px,16vw,280px)]">Terroir</p>
        <div className="mt-12 grid md:grid-cols-12 gap-12 items-center">
          <figure className="md:col-span-7 relative aspect-[16/9] rounded-3xl overflow-hidden bg-olive">
            <img src={IMAGES.origin} alt="Oliveraies en terrasses dans les montagnes de Boghni, en Kabylie" className="absolute inset-0 h-full w-full object-cover" />
          </figure>
          <div className="md:col-span-5 min-w-0">
            <h2 className="disp [text-wrap:balance] text-[clamp(36px,5vw,80px)]">Nos arbres, notre région.</h2>
            <p className="mt-6 text-lg leading-[1.6]">
              Pas de négoce : nous récoltons nos propres olives dans notre région d'origine,{" "}
              <span className="text-clay-light font-semibold" data-testid="origin-region">les montagnes de Boghni, en Kabylie</span>. Des oliviers centenaires sur les terrasses de pierre, cueillis en famille et pressés à froid. Une fabrication 100 % naturelle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Process = () => {
  const ref = useReveal();
  return (
    <section id="recolte" className="bg-ground text-ink py-24 md:py-36" data-testid="process-section">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <h2 className="disp mb-12 text-[clamp(36px,5vw,80px)]">Du verger au colis.</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {IMAGES.steps.map((s) => (
            <figure key={s.label} className="group snap-start shrink-0 w-72 relative aspect-[3/4] rounded-3xl overflow-hidden bg-sage flex items-end p-4">
              <img src={s.src} alt={s.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <figcaption className="relative lab text-white">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Trace = () => {
  const ref = useReveal();
  return (
    <section id="tracabilite" className="bg-white text-ink py-24 md:py-36" data-testid="trace-section">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 rounded-3xl bg-ground p-8">
          <p className="lab text-olive">Fiche qualité</p>
          <p className="disp mt-4 tab text-[clamp(72px,9vw,160px)] break-words">≤0,8%</p>
          <p className="mt-2 font-semibold">Acidité maximale de l'extra vierge</p>
        </div>
        <div className="md:col-span-6 min-w-0">
          <h2 className="disp [text-wrap:balance] text-[clamp(36px,5vw,80px)]">Traçable, lot par lot.</h2>
          <ul className="mt-8 space-y-3 text-lg">
            {["Origine garantie : montagnes de Boghni, Kabylie", "Fabrication 100 % naturelle, sans additif", "Notre propre récolte, pressée à froid", "Vierge extra"].map((t) => (
              <li key={t} className="flex items-center gap-3"><Check className="h-5 w-5 text-clay" /> {t}</li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border-2 border-dashed border-ink/30 p-6" data-testid="trace-certifications-placeholder">
            <p className="disp text-2xl">Faites-la analyser.</p>
            <p className="mt-2 leading-[1.6]">Nous n'avons rien à cacher : vous pouvez faire analyser notre huile par le laboratoire de votre choix. Nos propres bulletins d'analyse seront publiés ici.</p>
            <a href="#commande" className="group mt-4 inline-block rounded-xl bg-ink text-ground px-5 py-3 font-semibold hover:bg-clay transition-colors" data-testid="trace-analysis-button">
              Demander un échantillon <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

