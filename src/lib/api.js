export const formatPrice = (amount, country) =>
  country === "FR"
    ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount)
    : `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount)} DA`;

export const IMAGES = {
  hero: "/img/bouteille.webp",
  oil_5l: "/img/cavaliere.webp",
  oil_1l: "/img/bouteille.webp",
  oil_3l: "https://images.pexels.com/photos/30545510/pexels-photo-30545510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  origin: "/img/paysage.webp",
  welcome: "/img/grand-mere.webp",
  steps: [
    { src: "/img/cueillette.webp", label: "1 · Cueillette en famille" },
    { src: "/img/moulin.webp", label: "2 · Pression à froid" },
    { src: "https://images.pexels.com/photos/8469437/pexels-photo-8469437.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", label: "3 · Embouteillage" },
    { src: "https://images.pexels.com/photos/4440800/pexels-photo-4440800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", label: "4 · Expédition" },
  ],
};

export const PAYMENT_LABEL = {
  FR: "Commande via WhatsApp · paiement convenu avec nous",
  DZ: "Commande via WhatsApp · paiement à la livraison",
};

export const BRAND = "Tafat n'Idurar";

export const formatPhone = (p) =>
  p.startsWith("+33") ? p.replace(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, "+33 $1 $2 $3 $4 $5")
    : p.replace(/^\+213(\d{3})(\d{2})(\d{2})(\d{2})$/, "+213 $1 $2 $3 $4");

export const DELIVERY_LABEL = {
  FR: "Livraison La Poste partout en France",
  DZ: "Livraison Yalidine Express dans toute l'Algérie · gratuite à Tizi Ouzou",
};

export const welcomePrice = (amount, country, percent = 20) => {
  const v = amount * (1 - percent / 100);
  return country === "FR" ? Math.round(v * 100) / 100 : Math.round(v);
};
