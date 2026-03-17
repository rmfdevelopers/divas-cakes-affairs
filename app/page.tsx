'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Cake, 
  Award, 
  Heart, 
  Truck, 
  Star, 
  Palette, 
  ArrowRight, 
  Instagram, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Phone,
  ImageOff,
  Quote,
  Send
} from 'lucide-react';

// --- Types ---
interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

// --- Components ---

const SafeImage = ({ src, alt, fill, className, priority }: SafeImageProps) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/10 ${className}`}>
        <ImageOff size={32} className="text-primary/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? 800 : undefined}
      height={!fill ? 600 : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
};

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

// --- Data ---
const BRAND = {
  name: "Diva's Cakes Affairs",
  tagline: "Where Every Slice Tells a Sweet Story.",
  description: "Artisan cakes and confections meticulously crafted for every celebration in Lagos. From wedding extravaganzas to intimate birthday moments, Diva's Cakes Affairs brings your sweetest dreams to life with exquisite flavour and stunning design.",
  region: "Nigeria",
  currency: "₦"
};

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Our Cakes", href: "#products" },
  { name: "About Us", href: "#about" },
  { name: "Order Now", href: "#contact" }
];

const PRODUCTS = [
  {
    name: "Signature Chocolate Decadence",
    description: "A rich, multi-layered dark chocolate cake with ganache filling and edible gold dust.",
    price: "₦18,500",
    icon: <Cake className="text-accent" size={40} />
  },
  {
    name: "Velvet Celebration Tier",
    description: "Classic red velvet cake with a signature cream cheese frosting, perfect for birthdays.",
    price: "₦14,000",
    icon: <Cake className="text-accent" size={40} />
  },
  {
    name: "Tropical Mango Mousse",
    description: "Light, airy mousse cake infused with fresh Nigerian mangoes, ideal for warm weather.",
    price: "₦12,800",
    icon: <Cake className="text-accent" size={40} />
  },
  {
    name: "Bespoke Wedding Package",
    description: "Custom consultation, tasting session, and design mock-up for your dream wedding cake.",
    price: "₦35,000 (Deposit)",
    icon: <Award className="text-accent" size={40} />
  }
];

const FEATURES = [
  {
    title: "Lagos-Wide Delivery",
    description: "Reliable and temperature-controlled delivery service across all major areas in Lagos. Sharp delivery guaranteed.",
    icon: <Truck size={24} />
  },
  {
    title: "Artisan Ingredients",
    description: "We use only premium, locally-sourced ingredients for unmatched freshness and taste.",
    icon: <Star size={24} />
  },
  {
    title: "Custom Design Service",
    description: "Bring your vision to life with our expert cake artistry tailored to your event theme.",
    icon: <Palette size={24} />
  }
];

const STATS = [
  { number: "300+", label: "Cakes Sold Monthly", icon: <Cake size={20} /> },
  { number: "5+", label: "Years of Experience", icon: <Award size={20} /> },
  { number: "98%", label: "Customer Satisfaction", icon: <Heart size={20} /> }
];

const TESTIMONIALS = [
  {
    name: "Chioma N.",
    text: "The wedding cake was breathtaking! It tasted even better than it looked. Absolutely stunning work.",
    role: "Bride"
  },
  {
    name: "Femi O.",
    text: "Ordered a last-minute birthday cake and the service was seamless. They saved the day!",
    role: "Customer"
  },
  {
    name: "Aisha K.",
    text: "The best chocolate cake I have ever tasted in Nigeria. Rich, moist, and perfect.",
    role: "Food Blogger"
  }
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [menuOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: featureRef, isVisible: featureVisible } = useScrollReveal();
  const { ref: productRef, isVisible: productVisible } = useScrollReveal();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { ref: testRef, isVisible: testVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  return (
    <main className="relative bg-secondary overflow-x-hidden">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-secondary/90 backdrop-blur-xl shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg">
              <span className="text-secondary font-black text-xl leading-none">D</span>
            </div>
            <span className="font-heading font-black text-primary text-xl tracking-tight hidden sm:block">
              {BRAND.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-primary font-medium hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-primary text-secondary px-6 py-2.5 rounded-full font-bold hover:brightness-110 transition shadow-lg"
            >
              Order Now
            </a>
          </div>

          <button className="md:hidden text-primary" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 transition-transform duration-500 flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-heading font-black text-secondary text-xl">DIVA'S</span>
            <button onClick={() => setMenuOpen(false)} className="text-secondary">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMenuOpen(false)}
                className="text-secondary text-2xl font-heading font-bold"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-secondary/20">
            <p className="text-secondary/60 text-sm">Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center px-6 pt-20 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
        
        <div className={`relative z-10 text-center max-w-4xl transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="font-heading text-5xl md:text-8xl font-black text-primary leading-tight md:leading-none">
            Exquisite Cakes for Your <span className="text-accent">Grandest</span> Moments
          </h1>
          <p className="text-primary/70 mt-8 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
            The taste of true craftsmanship, delivered to your celebration in Lagos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#products" className="bg-primary text-secondary px-10 py-4 rounded-full font-bold text-lg hover:brightness-110 hover:scale-105 transition-all shadow-xl">
              View Our Creations
            </a>
            <a href="#contact" className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-secondary transition-all">
              Consult a Designer
            </a>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section 
        ref={featureRef}
        className={`py-20 px-6 bg-primary transition-all duration-1000 ${
          featureVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-accent transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-secondary font-heading text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-secondary/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section 
        id="products" 
        ref={productRef}
        className={`py-32 px-6 transition-all duration-1000 ${
          productVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-primary">Our Signature Confections</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
            <p className="text-primary/60 mt-6 text-lg">Explore our best-selling creations ready for your next event.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-primary/5 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="h-64 relative bg-primary/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
                  <div className="relative z-10 scale-125 group-hover:scale-150 transition-transform duration-500">
                    {item.icon}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">{item.name}</h3>
                  <p className="text-primary/60 text-sm mb-6 line-clamp-3 leading-relaxed">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-accent font-black text-xl">{item.price}</span>
                    <a href="#contact" className="p-3 bg-secondary rounded-full text-primary hover:bg-primary hover:text-secondary transition-colors">
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-16 flex items-center gap-6 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase whitespace-nowrap">
          The Diva Difference
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef}
        className={`py-32 px-6 overflow-hidden transition-all duration-1000 ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square">
            <div className="absolute -inset-4 border-2 border-accent/20 rounded-3xl translate-x-8 translate-y-8 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl overflow-hidden flex items-center justify-center">
               <Cake size={180} className="text-secondary/20" />
               <div className="absolute inset-0 bg-black/20" />
               <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                 <p className="text-secondary font-heading text-xl italic leading-tight">
                   "We believe every milestone deserves a masterpiece."
                 </p>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight mb-8">
              The Diva's Story
            </h2>
            <p className="text-primary/80 text-lg leading-relaxed mb-10">
              Founded on a passion for turning simple batter into edible art, Diva's Cakes Affairs has quickly become Lagos's premier destination for bespoke celebratory cakes. From the heart of Lagos to your special event, we bring unmatched flavor and creativity.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-2xl bg-primary/5">
                  <div className="text-accent flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black text-primary">{stat.number}</div>
                  <div className="text-xs text-primary/60 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-3 mt-12 bg-primary text-secondary px-8 py-4 rounded-full font-bold hover:brightness-110 transition shadow-lg">
              Start Your Design <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        ref={testRef}
        className={`py-32 bg-primary/5 transition-all duration-1000 ${
          testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-primary">Hear From Our Happy Clients</h2>
            <p className="text-primary/60 mt-4 text-lg">Trusted by cake lovers across Nigeria.</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="break-inside-avoid bg-white p-8 rounded-3xl border border-primary/5 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
                <Quote size={80} className="absolute -top-4 -right-4 text-primary/5 group-hover:text-accent/10 transition-colors duration-500" />
                <p className="text-primary/90 text-lg leading-relaxed relative z-10 mb-8 italic">"{t.text}"</p>
                <div className="flex items-center justify-between border-t border-primary/5 pt-6 relative z-10">
                  <div>
                    <h4 className="font-bold text-primary font-heading text-lg">{t.name}</h4>
                    <p className="text-accent/80 text-sm font-medium">{t.role}</p>
                  </div>
                  <div className="flex text-accent gap-1">
                    {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={12} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className={`py-32 px-6 transition-all duration-1000 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-accent p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-heading font-black text-secondary leading-tight mb-8">
                Place Your Order Today!
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-secondary shrink-0" size={24} />
                  <div>
                    <p className="text-secondary font-bold">WhatsApp</p>
                    <p className="text-secondary/70">+234-XXX-XXXX-XXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-secondary shrink-0" size={24} />
                  <div>
                    <p className="text-secondary font-bold">Email</p>
                    <p className="text-secondary/70">orders@divascakesaffairs.ng</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-secondary shrink-0" size={24} />
                  <div>
                    <p className="text-secondary font-bold">Location</p>
                    <p className="text-secondary/70">Lagos, Nigeria (Delivery Only)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-secondary/20">
              <p className="text-secondary/60 text-sm">Follow the sugar trail</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-accent transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 p-12 lg:p-16 bg-secondary">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary font-bold text-sm uppercase tracking-widest">Your Name</label>
                  <input required type="text" className="w-full bg-primary/5 border border-primary/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-primary font-bold text-sm uppercase tracking-widest">Email Address</label>
                  <input required type="email" className="w-full bg-primary/5 border border-primary/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-primary font-bold text-sm uppercase tracking-widest">Cake Type / Event Date</label>
                  <input required type="text" className="w-full bg-primary/5 border border-primary/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-primary font-bold text-sm uppercase tracking-widest">Tell us about your celebration</label>
                  <textarea required rows={4} className="w-full bg-primary/5 border border-primary/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
                </div>
                <div className="md:col-span-2 mt-4">
                  <button type="submit" className="w-full bg-primary text-secondary font-black py-5 rounded-2xl hover:brightness-110 transition shadow-lg flex items-center justify-center gap-3 text-lg">
                    Send Inquiry <Send size={20} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-secondary mb-8">
                  <Heart size={40} />
                </div>
                <h3 className="text-4xl font-heading font-black text-primary mb-4">Message Received!</h3>
                <p className="text-primary/60 text-lg max-w-sm">We'll be in touch soon to discuss your sweet requirements.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-accent font-bold underline">Send another message</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <a href="#home" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-secondary font-black text-lg">D</span>
                </div>
                <span className="font-heading font-black text-secondary text-xl tracking-tight">
                  {BRAND.name}
                </span>
              </a>
              <p className="text-secondary/60 leading-relaxed mb-8">
                Lagos's favorite destination for bespoke cakes. Quality wey go loud for your celebration.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-secondary hover:text-accent transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-secondary uppercase tracking-widest text-sm mb-6">Explore</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-secondary/60 hover:text-secondary transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary uppercase tracking-widest text-sm mb-6">Order Info</h4>
              <ul className="space-y-4">
                <li className="text-secondary/60">Mon - Sat: 9am - 6pm</li>
                <li className="text-secondary/60">Sun: Delivery Only</li>
                <li className="text-secondary/60">Minimum 48h notice for signature cakes</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary uppercase tracking-widest text-sm mb-6">Newsletter</h4>
              <p className="text-secondary/60 text-sm mb-4">Join our list for exclusive seasonal flavors.</p>
              <div className="relative">
                <input type="email" placeholder="Your email" className="w-full bg-secondary/10 border border-secondary/20 rounded-full px-6 py-3 text-secondary focus:outline-none focus:border-accent text-sm" />
                <button className="absolute right-1 top-1 bg-accent text-secondary p-2 rounded-full hover:brightness-110 transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-secondary/40 text-xs font-medium uppercase tracking-[0.2em]">
            <p>&copy; {new Date().getFullYear()} Diva's Cakes Affairs. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}