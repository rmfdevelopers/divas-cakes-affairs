'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCheck, 
  ImageOff, 
  Cake, 
  Users, 
  Timer, 
  Award, 
  Leaf, 
  ChefHat, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1685029965146-f6feff153a71?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1772985199408-01f6cb7e2c42?q=80&w=1080",
    "https://images.unsplash.com/photo-1772986565105-a3b7833d19bf?q=80&w=1080",
    "https://images.unsplash.com/photo-1772985430801-01b17dbdf1f5?q=80&w=1080",
    "https://images.unsplash.com/photo-1772986511163-58d3eef073b1?q=80&w=1080"
  ],
  decor: "https://images.unsplash.com/photo-1772985199460-d2a118f48341?q=80&w=1080"
};

const brand = {
  name: "Diva's Cakes Affairs",
  tagline: "Exquisite Cakes for Your Most Precious Moments",
  description: "Lagos' premier destination for bespoke luxury cakes. We specialize in handcrafted masterpieces that combine artisanal flavors with breathtaking designs.",
  industry: "Boutique Bakery",
  currency: "₦"
};

const contact = {
  instagram: "divascake_affairs",
  address: "Lagos, Nigeria",
  whatsapp: ""
};

const products = [
  { name: "Signature Red Velvet", price: "₦15,500", description: "Moist, velvety layers paired with our secret recipe cream cheese frosting." },
  { name: "Chocolate Overload", price: "₦18,000", description: "Rich Belgian chocolate sponge layered with decadent dark chocolate ganache." },
  { name: "Gourmet Cupcake Box", price: "₦12,000", description: "A dozen assorted cupcakes featuring our most popular seasonal flavors." },
  { name: "Bespoke Celebration Cake", price: "₦45,000", description: "Custom-designed multi-tier cakes tailored to your specific event theme." }
];

const features = [
  { title: "Fresh Ingredients", description: "We use only the finest butter, cream, and organic flavors in every batch.", icon: Leaf },
  { title: "Lagos Delivery on Lock", description: "Swift and safe delivery to your doorstep across the Mainland and Island.", icon: Timer },
  { title: "Custom Artistry", description: "Every cake is a unique piece of art designed specifically for your story.", icon: ChefHat }
];

const testimonials = [
  { name: "Tolu Adebayo", text: "The Red Velvet was absolutely divine! Best cake I've ordered in Lagos so far.", role: "Birthday Client" },
  { name: "Chinelo Okechukwu", text: "Diva's made our wedding cake exactly how we pictured it. It was the star of the night!", role: "Bride" },
  { name: "Funke Johnson", text: "Incredibly moist and not too sweet. Perfect balance of flavors every single time.", role: "Repeat Customer" }
];

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/20 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined} 
      className={className} priority={priority} onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Site() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const revealHero = useScrollReveal();
  const revealFeatures = useScrollReveal();
  const revealProducts = useScrollReveal();
  const revealAbout = useScrollReveal();
  const revealTestimonials = useScrollReveal();
  const revealContact = useScrollReveal();

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-lg shadow-xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center rounded-lg font-black text-xl group-hover:rotate-12 transition-transform">D</div>
            <span className="font-heading text-2xl font-black tracking-tighter text-white uppercase">Diva&apos;s</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Menu', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/80 hover:text-accent font-medium text-sm tracking-widest uppercase transition-colors">{link}</a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">Order Now</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] bg-primary shadow-2xl p-8 flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
          <div className="flex flex-col gap-8">
            {['Home', 'Menu', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-heading font-black text-white uppercase">{link}</a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-accent font-bold mb-4">Follow the sweetness</p>
            <a href={`https://instagram.com/${contact.instagram}`} className="flex items-center gap-3 text-white/60">
              <Instagram size={20} /> @{contact.instagram}
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section - Pattern HR-B */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="Luxury Cake Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        
        <div ref={revealHero.ref} className={`relative z-10 max-w-4xl transition-all duration-1000 ${revealHero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase">
            Cakes That <br />Tell <span className="text-accent">Your Story</span>
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-xl leading-relaxed font-light">
            {brand.description} Handcrafted luxury delivered fresh across Lagos.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-12">
            <a href="#contact" className="bg-accent text-primary px-10 py-5 font-black text-lg rounded-full flex items-center justify-center gap-3 hover:brightness-110 transition-all">
              Order on Instagram <Instagram size={20} />
            </a>
            <a href="#menu" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 font-bold text-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
              Explore Menu
            </a>
          </div>
        </div>
      </section>

      {/* Divider - D-GRID */}
      <div className="py-12 border-y border-white/5 bg-secondary/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 opacity-40">
          {['Bespoke', 'Artisanal', 'Lagos Premier', 'Luxury', 'Handcrafted'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-heading tracking-[0.3em] uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section - F-BENTO */}
      <section id="features" ref={revealFeatures.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-16 transition-all duration-700 ${revealFeatures.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-none">The Diva&apos;s <br /><span className="text-accent">Touch</span></h2>
            <p className="text-white/50 mt-4 text-lg">Why our clients keep coming back for more.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-accent/10 rounded-3xl p-10 border border-accent/20 flex flex-col justify-between group min-h-[340px] transition-all duration-700 delay-100 ${revealFeatures.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center group-hover:rotate-6 transition-transform">
                <ChefHat size={32} />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-white uppercase">{features[2].title}</h3>
                <p className="text-white/60 mt-3 text-lg leading-relaxed max-w-md">{features[2].description}</p>
              </div>
            </div>

            {features.slice(0, 2).map((f, i) => (
              <div key={i} className={`bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-between min-h-[340px] hover:bg-white/10 transition-all duration-500 transition-all duration-700 ${revealFeatures.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200 + 300}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                  <f.icon size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-white uppercase">{f.title}</h3>
                  <p className="text-white/40 mt-2 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - P-STAGGER */}
      <section id="menu" ref={revealProducts.ref} className="py-32 px-6 bg-secondary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-24 text-center">
          <h2 className={`font-heading text-6xl md:text-8xl font-black text-white uppercase leading-tight transition-all duration-700 ${revealProducts.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>Our <span className="text-accent">Best Sellers</span></h2>
        </div>

        <div className="max-w-7xl mx-auto space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
              <div className={`w-full md:w-1/2 relative transition-all duration-1000 ${revealProducts.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'}`}>
                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-accent/10 rounded-[2.5rem] -z-10 blur-3xl`} />
              </div>

              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'} transition-all duration-1000 delay-300 ${revealProducts.isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <span className="font-heading text-accent text-lg font-bold tracking-[0.3em] uppercase mb-4 block">Flavor 0{i + 1}</span>
                <h3 className="font-heading text-5xl md:text-7xl font-black text-white leading-none uppercase">{p.name}</h3>
                <p className="text-white/60 mt-6 text-xl leading-relaxed">{p.description}</p>
                <div className="mt-10 flex flex-col gap-6 items-start md:items-inherit">
                  <span className="text-5xl font-black text-white font-heading">{p.price}</span>
                  <a href="#contact" className="bg-accent text-primary px-10 py-4 rounded-full font-black text-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all flex items-center gap-3">
                    Place Order <ShoppingBag size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section - Asymmetric Split */}
      <section id="about" ref={revealAbout.ref} className="py-32 bg-primary overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${revealAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase leading-none mb-10">Inside <br />The <span className="text-accent">Bakery</span></h2>
            <p className="text-white/70 text-xl leading-relaxed mb-8">
              Diva&apos;s Cakes Affairs began with a simple mission: to bring joy to Lagos through the art of baking. 
              What started in a home kitchen has grown into a trusted name for weddings, birthdays, and corporate events.
            </p>
            <p className="text-white/50 text-lg italic mb-12">
              Lagos delivery on lock—from Ikeja to Lekki, we ensure your centerpiece arrives in pristine condition.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div>
                <p className="font-heading text-5xl font-black text-accent leading-none">2,000+</p>
                <p className="text-white/40 text-xs uppercase tracking-[0.3em] mt-3">Cakes Delivered</p>
              </div>
              <div>
                <p className="font-heading text-5xl font-black text-accent leading-none">1,500+</p>
                <p className="text-white/40 text-xs uppercase tracking-[0.3em] mt-3">Happy Clients</p>
              </div>
            </div>
          </div>

          <div className={`relative h-[600px] rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${revealAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src={IMAGES.decor} alt="Bakery Interior Decor" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <p className="text-white font-medium text-lg">&ldquo;We don&apos;t just bake cakes; we create edible memories that last a lifetime.&rdquo;</p>
              <p className="text-accent font-heading text-sm uppercase tracking-widest mt-4">— The Diva Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - T-SLIDER */}
      <section ref={revealTestimonials.ref} className="py-32 bg-secondary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase text-center">Sweet <span className="text-accent">Words</span></h2>
        </div>
        
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused] px-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 border border-white/10 rounded-[2rem] p-10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-accent" />)}
                  </div>
                  <p className="text-white/80 text-xl leading-relaxed font-light italic">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider">{t.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - C4 */}
      <section id="contact" ref={revealContact.ref} className="py-32 px-6 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-primary leading-none mb-12 uppercase tracking-tighter">
            Ready to <br />Celebrate?
          </h2>
          
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start border-t-4 border-primary/20 pt-16">
            <div className="space-y-10">
              <div>
                <h4 className="font-heading text-primary text-2xl font-black uppercase mb-4">Visit Us</h4>
                <div className="flex items-center gap-4 text-primary/80 font-medium">
                  <MapPin size={24} /> <span>{contact.address}</span>
                </div>
              </div>
              <div>
                <h4 className="font-heading text-primary text-2xl font-black uppercase mb-4">Say Hello</h4>
                <a href={`https://instagram.com/${contact.instagram}`} className="flex items-center gap-4 text-primary hover:translate-x-2 transition-transform font-bold text-xl">
                  <Instagram size={24} /> @{contact.instagram}
                </a>
              </div>
              <div className="pt-8">
                <div className="w-20 h-2 bg-primary/20" />
                <p className="text-primary/60 mt-4 text-sm font-medium uppercase tracking-[0.2em]">Crafting Joy Daily</p>
              </div>
            </div>

            <div className="bg-primary rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              {sent ? (
                <div className="py-16 text-center animate-scaleIn">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8 border border-accent/30">
                    <CheckCheck size={40} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-4xl font-black text-white uppercase">Sweet!</h3>
                  <p className="text-white/50 mt-4 text-lg">Your request is received. We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {(['name', 'email'] as const).map(field => (
                      <div key={field}>
                        <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-bold">{field}</label>
                        <input 
                          type={field === 'email' ? 'email' : 'text'}
                          value={form[field]}
                          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-bold">Your Celebration Details</label>
                    <textarea 
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      placeholder="Event type, date, and your dream cake details..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent transition-all resize-none"
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-accent text-primary py-5 rounded-xl font-black text-xl uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Sending Request...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-primary border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 bg-accent text-primary flex items-center justify-center rounded font-black">D</div>
              <span className="font-heading text-xl font-black uppercase tracking-tighter">Diva&apos;s Cakes</span>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Exquisite cakes for your most precious moments. Lagos premier bespoke bakery.
            </p>
          </div>

          <div className="flex gap-8">
            <a href={`https://instagram.com/${contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
              <Instagram size={20} />
            </a>
            {contact.whatsapp && (
              <a href={`https://wa.me/${contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                <Phone size={20} />
              </a>
            )}
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">© {new Date().getFullYear()} Diva&apos;s Cakes Affairs</p>
            <p className="text-white/20 text-[10px] mt-2 uppercase tracking-widest">Handcrafted in Lagos, Nigeria</p>
          </div>
        </div>
      </footer>
    </main>
  );
}