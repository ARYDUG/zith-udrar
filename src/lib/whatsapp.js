import { CATALOG } from "@/data/catalog";
import { BRAND, formatPrice } from "@/lib/api";

const ORDERED_KEY = "az-ordered-phones";

export const phoneKey = (phone) => phone.replace(/\D/g, "").slice(-9);

const orderedPhones = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERED_KEY) || "[]");
  } catch {
    return [];
  }
};

export const isNewCustomer = (phone) => !orderedPhones().includes(phoneKey(phone));

export const rememberCustomer = (phone) =>
  localStorage.setItem(ORDERED_KEY, JSON.stringify([...new Set([...orderedPhones(), phoneKey(phone)])]));

export const whatsappUrl = (country, text) =>
  `https://wa.me/${CATALOG.phones[country].replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export const openWhatsApp = (url) => {
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
};

export const orderMessage = ({ country, lines, subtotal, discount, percent, shipping, wilayaInfo, deliveryMode, customer }) => {
  const f = (v) => formatPrice(v, country);
  const total = subtotal - discount + shipping;
  const shipLabel = country === "FR"
    ? "Livraison La Poste"
    : `Livraison Yalidine Express (${deliveryMode === "stopdesk" ? "bureau / stop desk" : "à domicile"}) — ${String(wilayaInfo.code).padStart(2, "0")} ${wilayaInfo.name}`;
  const rows = [
    `*Nouvelle commande — ${BRAND}*`,
    "Huile d'Olive de Montagne (Zith Udrar)",
    "",
    "*Articles*",
    ...lines.map((l) => `• ${l.quantity} × ${l.name} (${f(l.unit)}) = ${f(l.unit * l.quantity)}`),
    "",
    `Sous-total : ${f(subtotal)}`,
    ...(discount > 0 ? [`Offre de bienvenue -${percent} % (1ère commande) : -${f(discount)}`] : []),
    `${shipLabel} : ${shipping === 0 ? "gratuite" : f(shipping)}`,
    `*Total : ${f(total)}*`,
    country === "DZ" ? "Paiement : à la livraison" : "Paiement : à convenir sur WhatsApp",
    "",
    "*Client*",
    `Nom : ${customer.name}`,
    `Téléphone : ${customer.phone}`,
    ...(customer.email ? [`E-mail : ${customer.email}`] : []),
    `Adresse : ${customer.address}`,
    `${country === "DZ" ? "Commune" : "Ville"} : ${customer.city}`,
    ...(customer.postal_code ? [`Code postal : ${customer.postal_code}`] : []),
    `Pays : ${country === "DZ" ? "Algérie" : "France"}`,
  ];
  return { text: rows.join("\n"), total };
};

export const requestMessage = (f) => [
  `*Nouvelle demande de ${f.profile === "Particulier" ? "commande" : "devis"} — ${BRAND}*`,
  "",
  `Profil : ${f.profile}`,
  `Pays : ${f.country === "DZ" ? "Algérie" : "France"}`,
  `Volume : ${f.volume}`,
  `Nom : ${f.name}`,
  `Téléphone : ${f.phone}`,
  ...(f.email ? [`E-mail : ${f.email}`] : []),
  ...(f.message ? ["", f.message] : []),
].join("\n");
