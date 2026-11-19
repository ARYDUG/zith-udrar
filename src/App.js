import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ShopProvider } from "@/context/ShopContext";
import { Nav } from "@/components/shop/Nav";
import { Hero, Marquee } from "@/components/shop/Hero";
import { Shop } from "@/components/shop/Shop";
import { Welcome } from "@/components/shop/Welcome";
import { Pros } from "@/components/shop/Pros";
import { Origin, Process, Trace } from "@/components/shop/Story";
import { Reviews, Faq, Contact, Footer } from "@/components/shop/Contact";
import { CartSheet } from "@/components/shop/CartSheet";

const Home = () => (
  <div className="bg-ground text-ink font-body">
    <Nav />
    <Hero />
    <Marquee />
    <Welcome />
    <Shop />
    <Pros />
    <Origin />
    <Process />
    <Trace />
    <Reviews />
    <Faq />
    <Contact />
    <Footer />
    <CartSheet />
  </div>
);

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </ShopProvider>
  );
}

export default App;
