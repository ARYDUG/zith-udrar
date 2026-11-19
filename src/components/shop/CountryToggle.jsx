import { useShop } from "@/context/ShopContext";

export const CountryToggle = ({ testId = "country-toggle" }) => {
  const { country, setCountry } = useShop();
  return (
    <div className="relative grid grid-cols-2 rounded-xl bg-ground text-sm font-semibold w-56 p-1" role="radiogroup" aria-label="Pays de commande" data-testid={testId}>
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-ink transition-transform duration-500 ${country === "DZ" ? "translate-x-full" : ""}`}
      />
      {[["FR", "France €"], ["DZ", "Algérie DA"]].map(([code, label]) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={country === code}
          onClick={() => setCountry(code)}
          className={`relative py-2 text-center transition-colors duration-500 ${country === code ? "text-ground" : "text-ink"}`}
          data-testid={`${testId}-${code.toLowerCase()}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
