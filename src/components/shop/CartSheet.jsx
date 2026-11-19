import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useShop } from "@/context/ShopContext";
import { formatPrice, PAYMENT_LABEL, DELIVERY_LABEL } from "@/lib/api";
import { isNewCustomer, rememberCustomer, orderMessage, whatsappUrl, openWhatsApp } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountryToggle } from "@/components/shop/CountryToggle";

const input = "w-full rounded-xl bg-ground p-3 text-base outline-none focus:ring-2 focus:ring-clay";

const Line = ({ l }) => {
  const { setQty, country } = useShop();
  return (
    <li className="flex items-center justify-between gap-3 py-3" data-testid={`cart-line-${l.id}`}>
      <div>
        <p className="font-semibold">{l.name}</p>
        <p className="text-sm text-olive tab">{formatPrice(l.unit, country)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setQty(l.id, l.quantity - 1)} className="h-8 w-8 grid place-items-center rounded-lg bg-ground hover:bg-sage" data-testid={`cart-minus-${l.id}`}><Minus className="h-4 w-4" /></button>
        <span className="w-6 text-center tab font-semibold" data-testid={`cart-qty-${l.id}`}>{l.quantity}</span>
        <button type="button" onClick={() => setQty(l.id, l.quantity + 1)} className="h-8 w-8 grid place-items-center rounded-lg bg-ground hover:bg-sage" data-testid={`cart-plus-${l.id}`}><Plus className="h-4 w-4" /></button>
        <button type="button" onClick={() => setQty(l.id, 0)} className="h-8 w-8 grid place-items-center rounded-lg hover:text-clay" aria-label="Retirer" data-testid={`cart-remove-${l.id}`}><Trash2 className="h-4 w-4" /></button>
      </div>
    </li>
  );
};

const CheckoutForm = ({ onDone }) => {
  const { lines, country, clear, setWelcomeEligible, wilayaInfo, deliveryMode, subtotal, discount, percent, shipping } = useShop();
  const [c, setC] = useState({ name: "", email: "", phone: "", address: "", city: "", postal_code: "" });
  const set = (k) => (e) => setC({ ...c, [k]: e.target.value });
  const checkWelcome = () => {
    if (c.phone.replace(/\D/g, "").length >= 6) setWelcomeEligible(isNewCustomer(c.phone));
  };

  const submit = (e) => {
    e.preventDefault();
    const eligible = isNewCustomer(c.phone);
    const d = eligible ? discount || (country === "FR" ? Math.round(subtotal * percent) / 100 : Math.round((subtotal * percent) / 100)) : 0;
    const { text, total } = orderMessage({ country, lines, subtotal, discount: d, percent, shipping, wilayaInfo, deliveryMode, customer: c });
    const url = whatsappUrl(country, text);
    openWhatsApp(url);
    rememberCustomer(c.phone);
    setWelcomeEligible(null);
    clear();
    onDone({ url, total, discount: d, country });
  };

  return (
    <form onSubmit={submit} className="grid gap-3 mt-4" data-testid="checkout-form">
      <input required minLength={2} placeholder="Nom complet" value={c.name} onChange={set("name")} className={input} data-testid="checkout-name-input" />
      <input required={country === "FR"} type="email" placeholder={country === "FR" ? "E-mail" : "E-mail (facultatif)"} value={c.email} onChange={set("email")} onBlur={checkWelcome} className={input} data-testid="checkout-email-input" />
      <input required minLength={6} type="tel" placeholder="Téléphone" value={c.phone} onChange={set("phone")} onBlur={checkWelcome} className={input} data-testid="checkout-phone-input" />
      <input required minLength={3} placeholder={country === "DZ" && deliveryMode === "stopdesk" ? "Adresse (pour le suivi)" : "Adresse de livraison"} value={c.address} onChange={set("address")} className={input} data-testid="checkout-address-input" />
      <div className="grid grid-cols-2 gap-3">
        <input required minLength={2} placeholder={country === "FR" ? "Ville" : `Commune${wilayaInfo ? ` (${wilayaInfo.name})` : ""}`} value={c.city} onChange={set("city")} className={input} data-testid="checkout-city-input" />
        <input placeholder="Code postal" value={c.postal_code} onChange={set("postal_code")} className={input} data-testid="checkout-postal-input" />
      </div>
      <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-clay text-white px-6 py-4 font-semibold hover:bg-clay-deep transition-colors" data-testid="checkout-submit-button">
        <MessageCircle className="h-5 w-5" /> Valider et envoyer sur WhatsApp
      </button>
      <p className="text-xs text-olive">Le récapitulatif s'ouvre dans WhatsApp : appuyez sur « Envoyer » pour confirmer votre commande.</p>
    </form>
  );
};

const Done = ({ order }) => (
  <div className="mt-8 rounded-2xl bg-ground p-6" data-testid="checkout-whatsapp-confirmation">
    <p className="disp text-3xl">Presque fini !</p>
    <p className="mt-3 leading-[1.6]">Votre récapitulatif ({formatPrice(order.total, order.country)}) est prêt dans WhatsApp. Appuyez sur « Envoyer » pour confirmer la commande, nous vous répondons rapidement.</p>
    {order.discount > 0 && <p className="mt-3 font-semibold text-clay-deep" data-testid="checkout-discount">Offre de bienvenue incluse : -{formatPrice(order.discount, order.country)}</p>}
    <a href={order.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink text-ground px-5 py-3 font-semibold hover:bg-clay transition-colors" data-testid="checkout-reopen-whatsapp">
      <MessageCircle className="h-4 w-4" /> Rouvrir WhatsApp
    </a>
  </div>
);

const MODES = [["domicile", "À domicile"], ["stopdesk", "Bureau Yalidine"]];

const WilayaSelect = () => {
  const { catalog, wilaya, setWilaya, wilayaInfo, deliveryMode, setDeliveryMode } = useShop();
  return (
    <div className="mt-4">
      <p className="lab text-olive mb-2">Wilaya de livraison (Yalidine Express)</p>
      <Select value={wilaya ? String(wilaya) : undefined} onValueChange={(v) => setWilaya(Number(v))}>
        <SelectTrigger className="w-full rounded-xl bg-ground border-0 h-12" data-testid="cart-wilaya-select"><SelectValue placeholder="Choisir la wilaya" /></SelectTrigger>
        <SelectContent className="max-h-72">
          {catalog.wilayas.map((w) => (
            <SelectItem key={w.code} value={String(w.code)} data-testid={`cart-wilaya-${w.code}`}>
              {String(w.code).padStart(2, "0")} · {w.name} — {w.fee.domicile === 0 ? "gratuite" : `${formatPrice(w.fee.domicile, "DZ")} / ${formatPrice(w.fee.stopdesk, "DZ")}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Mode de livraison">
        {MODES.map(([m, label]) => (
          <button key={m} type="button" role="radio" aria-checked={deliveryMode === m} onClick={() => setDeliveryMode(m)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold text-left transition-colors ${deliveryMode === m ? "bg-ink text-ground" : "bg-ground hover:bg-sage"}`}
            data-testid={`cart-delivery-${m}`}>
            {label}
            {wilayaInfo && <span className="block tab font-normal opacity-80">{wilayaInfo.fee[m] === 0 ? "Gratuite" : formatPrice(wilayaInfo.fee[m], "DZ")}</span>}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-olive">Domicile / bureau Yalidine (stop desk).</p>
    </div>
  );
};

export const CartSheet = () => {
  const { cartOpen, setCartOpen, lines, subtotal, shipping, discount, percent, welcomeEligible, country } = useShop();
  const [step, setStep] = useState("cart");
  const [order, setOrder] = useState(null);
  const onOpenChange = (o) => {
    setCartOpen(o);
    if (!o) { setStep("cart"); setOrder(null); }
  };

  return (
    <Sheet open={cartOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-white text-ink w-full sm:max-w-md overflow-y-auto font-body" data-testid="cart-sheet">
        <SheetHeader className="text-left">
          <SheetTitle className="disp text-4xl">Panier.</SheetTitle>
          <SheetDescription className="text-olive">{PAYMENT_LABEL[country]} · {DELIVERY_LABEL[country]}</SheetDescription>
        </SheetHeader>
        {order ? <Done order={order} /> : (
          <>
            <div className="mt-6"><CountryToggle testId="cart-country-toggle" /></div>
            {lines.length === 0 ? (
              <p className="mt-8 text-olive" data-testid="cart-empty">Votre panier est vide.</p>
            ) : (
              <>
                <ul className="mt-4 divide-y divide-ink/10">{lines.map((l) => <Line key={l.id} l={l} />)}</ul>
                {country === "DZ" && <WilayaSelect />}
                <dl className="mt-4 space-y-1 tab text-sm">
                  <div className="flex justify-between"><dt>Sous-total</dt><dd data-testid="cart-subtotal">{formatPrice(subtotal, country)}</dd></div>
                  {discount > 0 && (
                    <div className="flex justify-between font-semibold text-clay-deep"><dt>Bienvenue -{percent} %</dt><dd data-testid="cart-discount">-{formatPrice(discount, country)}</dd></div>
                  )}
                  <div className="flex justify-between"><dt>Livraison</dt><dd data-testid="cart-shipping">{shipping === null ? "selon la wilaya" : shipping === 0 ? "Gratuite" : formatPrice(shipping, country)}</dd></div>
                  <div className="flex justify-between text-lg font-semibold pt-2"><dt>Total</dt><dd data-testid="cart-total">{formatPrice(subtotal - discount + (shipping || 0), country)}</dd></div>
                </dl>
                {welcomeEligible === null && (
                  <p className="mt-3 rounded-xl bg-clay/10 text-clay-deep p-3 text-sm font-semibold" data-testid="cart-welcome-hint">
                    1ère commande ? -{percent} % appliqués automatiquement dès votre numéro saisi.
                  </p>
                )}
                {welcomeEligible === false && (
                  <p className="mt-3 text-sm text-olive" data-testid="cart-welcome-used">Offre de bienvenue déjà utilisée avec ce numéro. Merci de votre fidélité !</p>
                )}
                {step === "cart" ? (
                  <button type="button" disabled={shipping === null} onClick={() => setStep("form")} className="mt-6 w-full rounded-xl bg-ink text-ground px-6 py-4 font-semibold hover:bg-clay transition-colors disabled:opacity-50" data-testid="cart-checkout-button">
                    {shipping === null ? "Choisissez votre wilaya" : "Commander via WhatsApp"}
                  </button>
                ) : <CheckoutForm onDone={setOrder} />}
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
