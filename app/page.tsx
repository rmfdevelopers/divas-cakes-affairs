'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  UtensilsCrossed, 
  ChefHat, 
  Gift, 
  Truck, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  CheckCheck,
  ImageOff,
  Clock,
  Heart
} from 'lucide-react';

// --- Types ---
type Product = { name: string; price: string; description: string; image: string };
type Feature = { title: string; description: string; icon: React.ReactNode };
type Testimonial = { name: string; role: string; text: string };

// --- Data ---
const BRAND = {
  name: "Diva's Cakes Affairs",
  tagline: "Exquisite Taste, Regal Designs",
  description: "Lagos' premier destination for bespoke luxury cakes. From grand weddings to intimate celebrations, we bring your sweet dreams to life with artisanal craftsmanship and premium ingredients.",
  industry: "Boutique Bakery",
  monogram: "DC"
};

const PRODUCTS: Product[] = [
  { name: "Majestic Wedding Collection", price: "From ₦250k", description: "Multi-tiered masterpieces tailored to your love story.", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800" },
  { name: "Signature Celebration Cakes", price: "From ₦45k", description: "Bespoke designs for birthdays, anniversaries, and milestones.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800" },
  { name: "Luxury Dessert Boxes", price: "From ₦15k", description: "Assorted treats including brownies, cupcakes, and macarons.", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800" },
  { name: "Diva's Cupcake Bouquets", price: "From ₦25k", description: "Floral-piped cupcakes that look as good as they taste.", image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800" }
];

const FEATURES: Feature[] = [
  { title: "Bespoke Artistry", description: "Every cake is a unique creation, designed specifically to match your theme and personality.", icon: <ChefHat size={24} /> },
  { title: "Premium Ingredients", description: "We use only the finest Belgian chocolates, organic flours, and pure vanilla bean extracts.", icon: <UtensilsCrossed size={24} /> },
  { title: "Lagos-Wide Delivery", description: "Safe and prompt delivery across the mainland and islands, ensuring your cake arrives in pristine condition.", icon: <Truck size={24} /> },
  { title: "Same-Day Wonders", description: "Last-minute celebration? Our signature 'Ready-to-Glow' cakes are available for quick pickup.", icon: <Clock size={24} /> }
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Olamide A.", role: "Bride", text: "Diva's made our wedding cake absolutely unforgettable. People are still talking about the red velvet tier!" },
  { name: "Tunde Williams", role: "Corporate Client", text: "Professional service and the taste is consistent every time. Best dessert boxes in Lagos, hands down." },
  { name: "Chioma E.", role: "Mother", text: "The attention to detail on my daughter's 1st birthday cake was incredible. Simply magical." }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) return (
    <div className={`flex items-center justify-center bg-secondary/30 ${className}`}>
      <ImageOff size={24} className="text-white/20" />
    </div>
  );
  return (
    <Image 
      src={src} alt={alt} fill={fill} width={!fill ? width : undefined} 
      height={!fill ? height : undefined} className={className} 
      priority={priority} onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Page Layout ---

export default function Website() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-black text-lg transition-transform group-hover:rotate-12">
              {BRAND.monogram}
            </div>
            <span className="font-heading text-xl font-bold tracking-tight hidden sm:block">DIVA'S CAKES</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Products', 'Features', 'Testimonials'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium hover:text-accent transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
              Order Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 flex flex-col p-8">
          <button className="self-end text-white/60 mb-12" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Home', 'Products', 'Features', 'Testimonials', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-3xl font-heading font-bold" onClick={() => setIsMenuOpen(false)}>
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto flex gap-4">
            <Instagram className="text-accent" />
            <span className="text-sm text-white/40">@divascake_affairs</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={PRODUCTS[0].image} alt={BRAND.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="relative z-10 max-w-4xl animate-slideUp">
          <h1 className="font-heading text-6xl md:text-9xl font-bold leading-[0.9] tracking-tighter">
            {BRAND.tagline}
          </h1>
          <p className="text-white/70 mt-8 text-lg md:text-xl max-w-2xl leading-relaxed">
            {BRAND.description}
          </p>
          <div className="flex gap-4 mt-12">
            <a href="#contact" className="bg-accent text-primary px-10 py-4 font-black text-lg hover:brightness-110 transition rounded-full shadow-lg shadow-accent/20">
              Start Your Order
            </a>
            <a href="#products" className="text-white border-b-2 border-accent pb-1 hover:border-white transition-all font-medium self-end mb-2">
              Explore Collection
            </a>
          </div>
        </div>
      </section>

      {/* Stats Divider */}
      <div className="bg-secondary/20 py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "2,500+", l: "Cakes Delivered" },
            { n: "500+", l: "Weddings" },
            { n: "100%", l: "Lagos Love" },
            { n: "15+", l: "Signature Flavors" }
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-heading font-bold text-accent">{s.n}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Asymmetric Grid */}
      <section id="products" className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
            <h2 className="font-heading text-5xl md:text-7xl font-bold">The Collection</h2>
            <p className="text-white/40 max-w-xs font-light italic">Hand-crafted in the heart of Lagos, designed to be the crown of your event.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px]">
              <SafeImage src={PRODUCTS[0].image} alt={PRODUCTS[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h3 className="font-heading text-4xl font-bold text-white">{PRODUCTS[0].name}</h3>
                <p className="text-white/60 mt-2 max-w-sm">{PRODUCTS[0].description}</p>
                <div className="flex items-center gap-4 mt-6">
                  <span className="text-accent font-black text-2xl">{PRODUCTS[0].price}</span>
                  <a href="#contact" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">Inquire</a>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {PRODUCTS.slice(1, 3).map((p, i) => (
                <div key={i} className="group relative rounded-3xl overflow-hidden min-h-[300px]">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                    <p className="text-accent font-bold mt-1">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Numbered List */}
      <section id="features" className="py-28 px-6 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl font-bold mb-16 text-center">The Diva Touch</h2>
          <div className="space-y-0 divide-y divide-white/5">
            {FEATURES.map((f, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref} className={`py-12 flex flex-col md:flex-row items-start gap-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <span className="font-heading text-accent/20 text-7xl font-bold leading-none shrink-0 w-24">0{i+1}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-accent">{f.icon}</div>
                      <h3 className="font-heading text-3xl font-bold text-white">{f.title}</h3>
                    </div>
                    <p className="text-white/50 text-lg leading-relaxed max-w-2xl">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Masonry */}
      <section id="testimonials" className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-bold mb-16 text-center">Sweet Stories</h2>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="break-inside-avoid bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-accent/40 transition-all duration-500">
                <Heart size={40} className="absolute -right-4 -top-4 text-accent/5 rotate-12" />
                <p className="text-white/80 text-lg leading-relaxed italic mb-8 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs tracking-wide">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <h2 className="font-heading text-6xl md:text-8xl font-bold mb-8">Let's Bake Something Beautiful</h2>
            <p className="text-white/40 text-xl leading-relaxed mb-12">Visit us in Lagos or place your order online. We recommend booking at least 7 days in advance for bespoke designs.</p>
            
            <div className="space-y-6">
              <a href="https://instagram.com/divascake_affairs" className="flex items-center gap-4 text-white/60 hover:text-accent transition-colors">
                <Instagram size={24} /> <span>@divascake_affairs</span>
              </a>
              <div className="flex items-center gap-4 text-white/60">
                <MapPin size={24} /> <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Clock size={24} /> <span>Tue – Sat: 9am – 6pm</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-2xl font-bold text-accent mb-2">Diva's Cakes Affairs</h3>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Quality wey go loud</p>
          </div>
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Diva's Cakes Affairs. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Phone size={20} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', date: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) return (
    <div className="py-20 text-center animate-scaleIn">
      <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCheck size={40} className="text-accent" />
      </div>
      <h3 className="font-heading text-3xl font-bold mb-2">Request Received</h3>
      <p className="text-white/50">Our team will contact you within 24 hours to finalize details.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input 
          type="text" placeholder="Your Name" required 
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent outline-none transition-all"
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required 
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent outline-none transition-all"
          onChange={e => setForm({...form, email: e.target.value})}
        />
      </div>
      <input 
        type="text" placeholder="Event Date (e.g. Oct 12, 2024)" required 
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent outline-none transition-all"
        onChange={e => setForm({...form, date: e.target.value})}
      />
      <textarea 
        rows={4} placeholder="Describe your dream cake (Flavors, design, etc.)" required 
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent outline-none transition-all resize-none"
        onChange={e => setForm({...form, message: e.target.value})}
      />
      <button 
        type="submit" disabled={loading}
        className="w-full bg-accent text-primary font-black py-5 rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-accent/10 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Request Consultation"}
      </button>
    </form>
  );
}