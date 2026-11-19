import { Phone, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { CallButton } from "@/components/shop/CallButton";
import { BRAND } from "@/lib/api";

export const Logo = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
    <rect x="2" y="2" width="28" height="28" rx="8" className="fill-ink" />
    <circle cx="16" cy="18" r="7" className="fill-clay" />
    <path d="M16 11c2-4 6-5 8-5" className="stroke-ground" strokeWidth="2" fill="none" />
  </svg>
);

const LINKS = [["#boutique", "Boutique"], ["#pros", "Pros"], ["#tracabilite", "Origine"], ["#faq", "FAQ"]];

export const Nav = () => {
  const { count, setCartOpen } = useShop();
  return (
    <nav className="sticky top-0 z-40 bg-ground/90 backdrop-blur-md text-ink" data-testid="main-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2" data-testid="nav-logo-link">
          <Logo />
          <span className="disp text-xl sm:text-2xl whitespace-nowrap">{BRAND}</span>
        </a>
        <div className="hidden md:flex gap-8 text-sm font-semibold">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-clay transition-colors" data-testid={`nav-link-${label.toLowerCase()}`}>{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-xl border-2 border-ink px-4 py-[10px] text-sm font-semibold hover:bg-ink hover:text-ground transition-colors"
            data-testid="nav-cart-button"
          >
            <ShoppingBag className="h-4 w-4 inline -mt-0.5" /> <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 h-6 min-w-6 px-1 grid place-items-center rounded-full bg-clay text-white text-xs tab" data-testid="nav-cart-count">{count}</span>
            )}
          </button>
          <CallButton className="rounded-xl bg-ink text-ground px-5 py-3 text-sm font-semibold hover:bg-clay transition-colors" testId="nav-call-button">
            <Phone className="h-4 w-4 inline -mt-0.5" /> <span className="hidden sm:inline">Appeler</span>
          </CallButton>
        </div>
      </div>
    </nav>
  );
};
