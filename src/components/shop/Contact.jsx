import { useState } from "react";
import { Phone } from "lucide-react";
import { toast } from "sonner";
import { BRAND } from "@/lib/api";
import { requestMessage, whatsappUrl, openWhatsApp } from "@/lib/whatsapp";
import { useShop } from "@/context/ShopContext";
import { useReveal } from "@/hooks/useReveal";
import { CallButton, PhoneList } from "@/components/shop/CallButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FAQ = [
  ["Offre de bienvenue ?", "-20 % automatique sur votre toute première commande, reconnue grâce à votre numéro de téléphone."],
  ["Livraison ?", "En France par La Poste. En Algérie par Yalidine Express, à domicile ou au bureau Yalidine, tarif selon votre wilaya, et gratuite à Tizi Ouzou."],
  ["Comment je paie ?", "En Algérie : à la livraison. En France : nous convenons du paiement avec vous sur WhatsApp après votre commande."],
  ["Puis-je faire analyser l'huile ?", "Oui. Notre fabrication est 100 % naturelle : vous pouvez faire analyser notre huile par le laboratoire de votre choix."],
  ["Facture pro ?", "Oui, jointe à chaque commande professionnelle."],
];

export const Reviews = () => (
  <section id="avis" className="bg-clay text-white py-24 md:py-36" data-testid="reviews-section">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <h2 className="disp text-[clamp(48px,7vw,120px)]">Vos avis.</h2>
      <div className="rounded-3xl border-2 border-dashed border-white/60 p-8" data-testid="reviews-placeholder">
        <p className="text-lg leading-[1.6]">Les avis de nos premiers clients apparaîtront ici.</p>
      </div>
    </div>
  </section>
);

export const Faq = () => (
  <section id="faq" className="bg-ground text-ink py-24 md:py-36" data-testid="faq-section">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-4">
      <h2 className="disp md:col-span-2 mb-8 text-[clamp(36px,5vw,80px)]">FAQ.</h2>
      {FAQ.map(([q, a]) => (
        <div key={q} className="rounded-3xl bg-white p-6 hover:-translate-y-1 transition-transform">
          <p className="disp text-xl">{q}</p>
          <p className="mt-2 leading-[1.6]">{a}</p>
        </div>
      ))}
    </div>
  </section>
);

const field = "mt-2 w-full rounded-xl bg-ground p-3 normal-case tracking-normal text-base text-ink outline-none focus:ring-2 focus:ring-clay";
const PROFILES = ["Particulier", "Restaurant / épicerie", "Grossiste"];

const ContactForm = () => {
  const { country } = useShop();
  const [f, setF] = useState({ profile: "Restaurant / épicerie", country, volume: "", name: "", phone: "", email: "", message: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e?.target ? e.target.value : e });

  const submit = (e) => {
    e.preventDefault();
    openWhatsApp(whatsappUrl(f.country, requestMessage(f)));
    toast.success("Demande prête dans WhatsApp", { description: "Appuyez sur « Envoyer » pour nous la transmettre." });
    setF({ ...f, volume: "", name: "", phone: "", email: "", message: "" });
  };

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white text-ink p-8 grid gap-4" data-testid="contact-form">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="lab">Profil
          <Select value={f.profile} onValueChange={set("profile")}>
            <SelectTrigger className={`${field} h-auto border-0`} data-testid="contact-profile-select"><SelectValue /></SelectTrigger>
            <SelectContent>{PROFILES.map((p) => <SelectItem key={p} value={p} data-testid={`contact-profile-${p.length}`}>{p}</SelectItem>)}</SelectContent>
          </Select>
        </label>
        <label className="lab">Pays
          <Select value={f.country} onValueChange={set("country")}>
            <SelectTrigger className={`${field} h-auto border-0`} data-testid="contact-country-select"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="FR" data-testid="contact-country-fr">France (€)</SelectItem>
              <SelectItem value="DZ" data-testid="contact-country-dz">Algérie (DZD)</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>
      <label className="lab">Volume<input required value={f.volume} onChange={set("volume")} className={field} placeholder="ex. 5L, 50L, 1 palette" data-testid="contact-volume-input" /></label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="lab">Nom<input required minLength={2} value={f.name} onChange={set("name")} className={field} data-testid="contact-name-input" /></label>
        <label className="lab">Téléphone<input required minLength={6} type="tel" value={f.phone} onChange={set("phone")} className={field} data-testid="contact-phone-input" /></label>
      </div>
      <label className="lab">E-mail (facultatif)<input type="email" value={f.email} onChange={set("email")} className={field} data-testid="contact-email-input" /></label>
      <label className="lab">Message (facultatif)<textarea rows={3} value={f.message} onChange={set("message")} className={field} data-testid="contact-message-input" /></label>
      <button type="submit" className="rounded-xl bg-ink text-ground px-6 py-4 font-semibold hover:bg-clay transition-colors" data-testid="contact-submit-button">
        Envoyer ma demande sur WhatsApp
      </button>
    </form>
  );
};

export const Contact = () => {
  const ref = useReveal();
  return (
    <section id="commande" className="bg-ink text-ground py-24 md:py-36" data-testid="contact-section">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div className="min-w-0">
          <h2 className="disp [text-wrap:balance] text-[clamp(48px,7vw,120px)]">Une commande, un devis ?</h2>
          <p className="mt-6 text-lg leading-[1.6] max-w-md">Remplissez le formulaire ou appelez-nous, on s'occupe du reste.</p>
          <PhoneList />
          <CallButton className="mt-8 inline-block rounded-xl bg-clay text-white px-6 py-4 font-semibold hover:bg-clay-deep transition-colors" testId="contact-call-button">
            <Phone className="h-4 w-4 inline -mt-0.5" /> Appeler maintenant
          </CallButton>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="bg-ground text-ink py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-6 text-sm font-semibold">
      <span className="disp text-2xl">{BRAND}</span>
      <span>Huile d'Olive de Montagne (Zith Udrar) · 100 % naturelle · Boghni, Kabylie · France & Algérie</span>
      <a href="#top" data-testid="footer-top-link">Haut ↑</a>
    </div>
  </footer>
);
