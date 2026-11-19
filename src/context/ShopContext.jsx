import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CATALOG } from "@/data/catalog";

const ShopContext = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export const ShopProvider = ({ children }) => {
  const catalog = CATALOG;
  const [country, setCountry] = useState(() => load("az-country", "FR"));
  const [cart, setCart] = useState(() => load("az-cart", {}));
  const [cartOpen, setCartOpen] = useState(false);
  const [welcomeEligible, setWelcomeEligible] = useState(null);
  const [wilaya, setWilaya] = useState(() => load("az-wilaya", null));
  const [deliveryMode, setDeliveryMode] = useState("domicile");

  useEffect(() => localStorage.setItem("az-country", JSON.stringify(country)), [country]);
  useEffect(() => localStorage.setItem("az-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("az-wilaya", JSON.stringify(wilaya)), [wilaya]);

  const add = useCallback((id, qty = 1) => {
    setCart((c) => ({ ...c, [id]: Math.min((c[id] || 0) + qty, 50) }));
    setCartOpen(true);
  }, []);
  const setQty = useCallback((id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 50);
      return next;
    });
  }, []);
  const clear = useCallback(() => setCart({}), []);

  const lines = useMemo(() => {
    if (!catalog) return [];
    return catalog.products
      .filter((p) => cart[p.id])
      .map((p) => ({ ...p, quantity: cart[p.id], unit: p.price[country] }));
  }, [cart, country]);

  const count = lines.reduce((s, l) => s + l.quantity, 0);
  const subtotal = lines.reduce((s, l) => s + l.unit * l.quantity, 0);
  const wilayaInfo = catalog && wilaya ? catalog.wilayas.find((w) => w.code === wilaya) : null;
  const shipping = !catalog ? 0 : country === "FR" ? catalog.shipping.FR.fee : wilayaInfo ? wilayaInfo.fee[deliveryMode] : null;
  const percent = catalog?.welcome?.percent || 0;
  const rawDiscount = welcomeEligible ? (subtotal * percent) / 100 : 0;
  const discount = country === "FR" ? Math.round(rawDiscount * 100) / 100 : Math.round(rawDiscount);

  const value = { catalog, country, setCountry, cart, add, setQty, clear, lines, count, subtotal, shipping, discount, percent, welcomeEligible, wilaya, setWilaya, wilayaInfo, deliveryMode, setDeliveryMode, setWelcomeEligible, cartOpen, setCartOpen };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);
