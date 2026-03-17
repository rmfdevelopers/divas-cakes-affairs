'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Instagram, Mail, Phone, MapPin, 
  Leaf, Timer, ChefHat, Cake, Smile, ImageOff, CheckCheck 
} from 'lucide-react';

// --- DATA ---
const brand = {
  name: "Diva's Cakes Affairs",
  tagline: "Where Every Celebration Deserves A Masterpiece.",
  description: "Bespoke, artisanal cakes for weddings, birthdays, and all significant milestones. Hand-crafted using the finest ingredients to deliver unforgettable taste and stunning visual design.",
  industry: "Boutique Cakery",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=1600",
  about: "https://images.unsplash.com/photo-1631998878375-236a6826ce7f?q=80&w=1200",
  products: [
    "https://images.unsplash.com/photo-1609737930633-73ce90feff1a?q=80&w=1000",
    "https://images.unsplash.com/photo-1661560276847-7764d698843d?q=80&w=1000",
    "https://images.unsplash.com/photo-1605563432942-0f863d9df42e?q=80&w=1000",
    "https://images.unsplash.com/photo-1676734626918-b0663902259f?q=80&w=1000"
  ]
};

const products = [
  { name: "Velvet Dream Tier Cake", description: "A rich, deep red velvet cake layered with our signature cream cheese frosting.", price: "₦28,000" },
  { name: "Chocoholic Extravaganza", description: "Six layers of dark chocolate sponge, filled with ganache and topped with glossy drips.", price: "₦35,500" },
  { name: "Wedding Splendor", description: "Custom-designed, multi-tiered vanilla sponge with floral buttercream artistry.", price: "₦150,000" },
  { name: "Small Bites Box", description: "A box of 12 artisanal cupcakes and mini-pastries for corporate events.", price: "₦9,500" }
];

const features = [
  { title: "Fresh Ingredients", description: "We source the freshest local and imported ingredients for unmatched flavor.", icon: Leaf },
  { title: "Sharp Delivery", description: "Reliable, temperature-controlled delivery across Lagos state. No stories.", icon: Timer },
  { title: "Chef's Special", description: "Rotating monthly specialty flavors designed by our head pastry chef.", icon: ChefHat }
];

const testimonials = [
  { name: "Tunde M.", text: "The design was flawless and the taste? Absolute fire! Diva's nailed my husband's birthday theme.", role: "Lagos Client" },
  { name: "Seyi K.", text: "Best red velvet I've had in Nigeria, period. The packaging for delivery was top-notch.", role: "Event Planner" },
  { name: "Jasmine O.", text: "So vibrant and exactly what I asked for. Zero stress from order to delivery.", role: "Customer" }
];

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} 
      width={!fill ? (width ?? 800) : undefined} 
      height={!fill ? (height ?? 600) : undefined} 
      className={className} priority={priority} 
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-2xl font-black tracking-tighter text-accent flex items-center gap-2">
          <Cake className="animate-float" />
          DIVA&apos;S CAKES
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Menu', 'About', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white font-bold text-sm hover:text-accent transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-secondary px-6 py-2 rounded-full font-black text-sm hover:scale-105 transition-transform">
            ORDER NOW
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-primary z-50 transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="text-accent font-black text-xl">DIVA&apos;S</span>
            <button onClick={() => setOpen(false)}><X size={32} className="text-white" /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'Menu', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="text-4xl font-black text-white italic">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto flex gap-6">
            <Instagram className="text-accent" />
            <Mail className="text-accent" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Site() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  return (
    <main className="overflow-x-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-primary">
        <SafeImage src={IMAGES.hero} alt="Showcase Cake" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <div className={`transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} ref={heroReveal.ref}>
            <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter italic">
              YOUR NEXT <br /> <span className="text-accent">CRAVING</span> STARTS HERE.
            </h1>
            <p className="text-white/80 mt-8 text-lg max-w-xl leading-relaxed font-medium">
              The fun, bold, and delicious world of Diva&apos;s Cakes is now online. Browse our portfolio and let&apos;s start designing your dream cake.
            </p>
            <div className="flex gap-4 mt-12 flex-wrap">
              <a href="#products" className="bg-accent text-secondary px-10 py-5 font-black text-lg rounded-full hover:brightness-110 transition-all hover:scale-105">
                SEE THE MENU 🔥
              </a>
              <a href="#contact" className="border-2 border-white text-white px-10 py-5 font-black text-lg rounded-full hover:bg-white hover:text-primary transition-all">
                ENQUIRE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (ICON GRID) */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white italic">The Diva Difference</h2>
            <p className="text-secondary font-bold text-lg mt-2">Why Choose Us For Your Next Big Moment?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} 
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className={`p-10 rounded-3xl bg-secondary border-4 border-accent transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-8 rotate-3 shadow-xl">
                    <Icon size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">{f.title}</h3>
                  <p className="text-white/70 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (ASYMMETRIC) */}
      <section id="products" ref={productsReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <h2 className="text-6xl md:text-8xl font-black text-primary leading-none italic">OUR SWEET <br /> CREATIONS</h2>
            <p className="text-white/40 max-w-xs text-left md:text-right font-medium">From Classic Flavors to Bold New Designs. Handcrafted for you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Featured Product */}
            <div className={`md:col-span-7 group relative rounded-[3rem] overflow-hidden transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative h-[600px]">
                <SafeImage src={IMAGES.products[0]} alt={products[0].name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 p-12 w-full">
                  <span className="text-accent font-black text-2xl mb-4 block">{products[0].price}</span>
                  <h3 className="text-4xl md:text-6xl font-black text-white">{products[0].name}</h3>
                  <p className="text-white/60 mt-4 max-w-md">{products[0].description}</p>
                </div>
              </div>
            </div>

            {/* Side Column */}
            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              {products.slice(1, 3).map((p, i) => (
                <div key={i} className={`group relative rounded-[2rem] overflow-hidden bg-primary transition-all duration-1000 delay-300 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                  <div className="relative h-full min-h-[250px]">
                    <SafeImage src={IMAGES.products[i+1]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-50" />
                    <div className="absolute inset-0 bg-secondary/20" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className="text-accent font-black text-xl">{p.price}</span>
                      <h3 className="text-2xl font-black text-white mt-1">{p.name}</h3>
                      <a href="#contact" className="text-white/60 font-bold text-xs mt-2 uppercase tracking-widest hover:text-accent transition-colors">Order Detail →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (AUTO-SLIDER) */}
      <section id="testimonials" ref={testimonialsReveal.ref} className="py-28 bg-primary overflow-hidden border-y-8 border-accent">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-6xl font-black text-secondary italic">LOVED BY DIVAS</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[380px] shrink-0 bg-secondary border-4 border-white rounded-[2rem] p-10 flex flex-col">
                <div className="flex gap-2 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-3 h-3 rounded-full bg-accent" />)}
                </div>
                <p className="text-white text-lg font-medium italic mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-black text-white border-2 border-accent">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-accent">{t.name}</p>
                    <p className="text-white/40 text-xs font-bold uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-secondary relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-6xl font-black text-primary leading-none mb-8 italic">FROM INSTAGRAM <br /> TO YOUR TABLE</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Diva&apos;s Cakes Affairs started as a passion project shared exclusively on Instagram, growing through word-of-mouth based on pure quality and creativity. We are dedicated to bringing that viral energy to your real-life celebrations. This website is the next step in serving our growing community better.
            </p>
            <div className="grid grid-cols-2 gap-10">
              {[
                { n: "500+", l: "Cakes Sold", i: Cake },
                { n: "98%", l: "Happy Divas", i: Smile }
              ].map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <s.i className="text-accent mb-3" size={32} />
                  <span className="text-4xl font-black text-white">{s.n}</span>
                  <span className="text-white/40 text-sm font-bold uppercase tracking-widest">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="absolute -top-4 -left-4 w-full h-full bg-primary rounded-[3rem] -rotate-3" />
            <div className="relative w-full h-full overflow-hidden rounded-[3rem] shadow-2xl">
              <SafeImage src={IMAGES.about} alt="The Bakery" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent rounded-full flex items-center justify-center animate-float">
              <ChefHat size={60} className="text-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (C4 Variant) */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-accent min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 skew-y-0' : 'opacity-0 skew-y-3'}`}>
            <h2 className="text-[12vw] md:text-[8vw] font-black text-secondary leading-none mb-16 italic text-center md:text-left">
              READY TO ORDER YOUR SHOWSTOPPER?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start pt-12 border-t-4 border-secondary/20">
            <div className="space-y-8">
              <p className="text-secondary/80 font-bold text-xl max-w-sm italic">
                Let&apos;s make your next celebration a masterpiece. Fill the form or reach out directly.
              </p>
              <div className="space-y-4">
                <a href="https://instagram.com/divascake_affairs" className="flex items-center gap-4 text-secondary font-black text-lg hover:translate-x-2 transition-transform">
                  <Instagram size={24} /> @divascake_affairs
                </a>
                <div className="flex items-center gap-4 text-secondary font-black text-lg opacity-40 italic">
                  <Mail size={24} /> Email Coming Soon
                </div>
              </div>
            </div>

            <div className="bg-secondary p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
              
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-scaleIn">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-8 rotate-12">
                    <CheckCheck size={40} className="text-secondary" />
                  </div>
                  <h3 className="text-4xl font-black text-white italic mb-4">Message Received!</h3>
                  <p className="text-white/60 font-medium">We&apos;ll get back to you sharp sharp!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Your Name" required
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-accent transition-all" />
                    <input type="email" placeholder="Email Address" required
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-accent transition-all" />
                  </div>
                  <input type="text" placeholder="Phone (WhatsApp Preferred)" required
                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-accent transition-all" />
                  <textarea rows={4} placeholder="Tell us about your cake (Date, Theme, Flavors...)" required
                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-accent transition-all resize-none" />
                  <button type="submit" disabled={loading}
                    className="w-full bg-accent text-secondary py-6 rounded-2xl font-black text-xl hover:brightness-110 transition-all hover:scale-[1.02] disabled:opacity-50">
                    {loading ? 'SENDING...' : 'SEND INQUIRY'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary py-20 px-6 border-t-2 border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-primary italic mb-2">DIVA&apos;S CAKES</h2>
            <p className="text-white/30 text-sm font-medium tracking-widest">{brand.tagline}</p>
          </div>
          
          <div className="flex gap-10">
            {['Instagram', 'WhatsApp'].map(social => (
              <a key={social} href="#" className="text-white/40 font-bold hover:text-accent transition-colors uppercase tracking-widest text-sm">
                {social}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/20 text-xs font-bold uppercase tracking-widest mb-2">Lagos, Nigeria</p>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Diva&apos;s Cakes Affairs. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}