import { toast } from "sonner";
import { useShop } from "@/context/ShopContext";
import { formatPhone } from "@/lib/api";

export const CallButton = ({ className, children, testId }) => {
  const { catalog, country } = useShop();
  const phone = catalog?.phones?.[country];
  if (phone) {
    return (
      <a href={`tel:${phone}`} title={phone} className={className} data-testid={testId}>
        {children}
      </a>
    );
  }
  const onClick = () => {
    toast("Numéro de téléphone bientôt disponible", { description: "Laissez-nous vos coordonnées, nous vous rappelons." });
    document.getElementById("commande")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button type="button" onClick={onClick} className={className} data-testid={testId}>
      {children}
    </button>
  );
};

export const PhoneList = () => {
  const { catalog } = useShop();
  if (!catalog?.phones) return null;
  return (
    <ul className="mt-6 space-y-2 text-lg" data-testid="contact-phone-list">
      {[["FR", "France"], ["DZ", "Algérie"]].map(([code, label]) => catalog.phones[code] && (
        <li key={code}>
          <span className="text-ground/60 mr-2">{label}</span>
          <a href={`tel:${catalog.phones[code]}`} className="tab font-semibold hover:text-clay-light transition-colors" data-testid={`contact-phone-${code.toLowerCase()}`}>{formatPhone(catalog.phones[code])}</a>
        </li>
      ))}
    </ul>
  );
};
