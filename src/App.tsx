/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Plane, 
  ShieldCheck, 
  Camera, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  Clock,
  Map,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  MessageSquare,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const assetBase = import.meta.env.BASE_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    details: ''
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    const message = `*New Booking Request - Sukh Shanti Tour & Travels*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Travel Details:* ${formData.details}`;
    const whatsappUrl = `https://wa.me/917018404537?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    {
      title: "Himachal Tour Packages",
      description: "Explore the scenic beauty of Shimla, Manali, Dharamshala, and the holy Deotsidh with our curated packages.",
      icon: <Map className="w-8 h-8" />,
    },
    {
      title: "Airport Pick & Drop",
      description: "Timely and comfortable transfers to and from all major airports in the region, including Chandigarh & Amritsar.",
      icon: <Plane className="w-8 h-8" />,
    },
    {
      title: "Local & Outstation",
      description: "Whether it's a quick local trip or a long outstation journey, we've got you covered with reliable rides.",
      icon: <Car className="w-8 h-8" />,
    },
    {
      title: "Safe & Reliable Rides",
      description: "Your safety is our priority. Professional drivers and well-maintained vehicles for a peaceful journey.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-orange-50 font-body text-slate-900 selection:bg-bhagwa-200">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className={`flex items-center gap-3 text-2xl font-display font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-bhagwa-700' : 'text-white'
            }`}
          >
            <img src={`${assetBase}favicon.svg`} alt="Sukh Shanti logo" className="h-9 w-9 rounded-md bg-white/10 p-1" />
            Sukh Shanti<span className="text-bhagwa-500">.</span>
          </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-bhagwa-500 ${
                    isScrolled ? 'text-slate-600' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:7018404537"
                className="bg-bhagwa-600 hover:bg-bhagwa-700 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-bhagwa-600/20"
              >
                Call Now
              </a>
            </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-lg font-bold text-slate-600 hover:text-bhagwa-600 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                  <a
                    href="tel:7018404537"
                    className="bg-bhagwa-600 text-white text-center py-3 rounded-xl font-bold shadow-lg"
                  >
                    Book Ride: 7018404537
                  </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Subtle Overlay & Animation */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "linear" 
            }}
            src={`${assetBase}homebg.svg`} 
            alt="Baba Balak Nath Temple Deotsidh" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-5 py-3 mb-10 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.4em] text-bhagwa-300 uppercase bg-white/5 backdrop-blur-md border border-white/20 rounded-full shadow-xl">
              Jai Baba Balak Nath Ji
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 tracking-tight leading-tight drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bhagwa-600 via-bhagwa-400 to-bhagwa-500">
                Sukh Shanti
              </span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bhagwa-400 to-yellow-300">
                Tour & Travels
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto font-medium leading-relaxed italic drop-shadow-lg">
              "Book Your Ride Anytime – We Are Always Ready to Serve You!" <br />
              <span className="text-white/80 not-italic">Experience the divine and scenic beauty of Himachal.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:7018404537"
                className="group relative px-10 py-4 bg-bhagwa-600 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-bhagwa-600/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Book Your Ride Now
                </span>
                <div className="absolute inset-0 bg-bhagwa-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a 
                href="#services"
                onClick={(e) => scrollToSection(e, '#services')}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-bhagwa-600 uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] mb-4">Our Offerings</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">Premium Travel Services</h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-bhagwa-500 to-yellow-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-orange-50/50 border border-orange-100 hover:border-bhagwa-200 hover:bg-white hover:shadow-2xl hover:shadow-bhagwa-900/10 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-bhagwa-100 text-bhagwa-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-bhagwa-600 group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl font-display font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-bhagwa-900 text-white overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-bhagwa-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-bhagwa-700/50">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop" 
                  alt="Baba Balak Nath Temple" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-bhagwa-600 p-8 rounded-3xl shadow-2xl border-2 border-bhagwa-500 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-bhagwa-100 text-xs font-bold uppercase tracking-widest">Always Ready</p>
                    <p className="text-2xl font-display font-bold">24/7 Service</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-bhagwa-300 uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] mb-4">About Sukh Shanti</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight leading-tight">Spiritual & Scenic Journeys from Himachal Pradesh</h3>
              <p className="text-lg text-bhagwa-100/80 leading-relaxed mb-8">
                Located in the holy town of **Deotsidh, Distt Hamirpur**, Sukh Shanti Tour & Travels is your premier partner for exploring the divine and natural wonders of Himachal Pradesh. We are blessed to serve pilgrims and travelers visiting the sacred shrine of Baba Balak Nath Ji.
              </p>
              <p className="text-lg text-bhagwa-100/80 leading-relaxed mb-10">
                Our mission is to provide a "Sukh Shanti" (Peaceful & Happy) travel experience. With professional drivers who know every mountain curve and a fleet that prioritizes your comfort, we ensure your pilgrimage or vacation is memorable.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-bhagwa-500/30 p-3 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-bhagwa-300" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-lg mb-1">Safe Pilgrimage</h5>
                    <p className="text-sm text-bhagwa-200/60">Reliable transport for devotees and families.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-bhagwa-500/30 p-3 rounded-xl">
                    <Heart className="w-6 h-6 text-bhagwa-300" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-lg mb-1">Devotional Service</h5>
                    <p className="text-sm text-bhagwa-200/60">Serving with respect and dedication since years.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-bold text-bhagwa-600 uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] mb-4">Get In Touch</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 tracking-tight">Visit Our Office</h3>
              <p className="text-lg text-slate-600 mb-12 italic">
                "Jai Baba Balak Nath Ji" - We are located right in the heart of Deotsidh. Reach out for bookings or inquiries.
              </p>

              <div className="space-y-8 mb-12">
                <a href="tel:7018404537" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-bhagwa-50 text-bhagwa-600 rounded-2xl flex items-center justify-center group-hover:bg-bhagwa-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Call 24/7</p>
                    <p className="text-2xl font-display font-bold text-slate-900">+91 7018404537</p>
                  </div>
                </a>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-bhagwa-50 text-bhagwa-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Our Office</p>
                    <p className="text-xl font-display font-bold text-slate-900 leading-tight">
                      Bijhar, Distt Hamirpur, <br />
                      Himachal Pradesh, 176040
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Iframe */}
              <div className="rounded-3xl overflow-hidden border-4 border-bhagwa-100 shadow-2xl h-[300px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12975.767957333224!2d76.53078315758708!3d31.455976337892714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39053206bd285a9d%3A0xdbe6f669d1273fc5!2sDeotsidh%2C%20Himachal%20Pradesh%20176039!5e1!3m2!1sen!2sin!4v1775026019630!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="bg-bhagwa-50/50 p-8 md:p-12 rounded-[3rem] border border-bhagwa-100 shadow-2xl shadow-bhagwa-900/5">
              <h4 className="text-2xl font-display font-bold text-bhagwa-900 mb-8">Send a Booking Request</h4>
              <form className="space-y-6" onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-bhagwa-800 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-white border border-bhagwa-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-bhagwa-500/10 focus:border-bhagwa-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-bhagwa-800 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 bg-white border border-bhagwa-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-bhagwa-500/10 focus:border-bhagwa-500 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-bhagwa-800 ml-1">Travel Details</label>
                  <textarea 
                    rows={4}
                    placeholder="E.g. Deotsidh to Chandigarh, 4 Passengers..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-6 py-4 bg-white border border-bhagwa-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-bhagwa-500/10 focus:border-bhagwa-500 transition-all resize-none font-medium"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-bhagwa-600 to-bhagwa-700 hover:from-bhagwa-700 hover:to-bhagwa-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-bhagwa-600/30 transition-all active:scale-[0.98] uppercase tracking-widest"
                >
                  Confirm Booking
                </button>
              </form>
              <p className="text-center mt-6 text-sm text-bhagwa-600 font-medium">
                We'll call you back within 15 minutes!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <a href="#home" className="mb-6 flex items-center gap-3 text-2xl font-display font-bold">
                <img src={`${assetBase}favicon.svg`} alt="Sukh Shanti logo" className="h-9 w-9 rounded-md bg-white/10 p-1" />
                Sukh Shanti<span className="text-bhagwa-500">.</span>
              </a>
              <p className="text-slate-400 leading-relaxed mb-6 italic">
                "Jai Baba Balak Nath Ji" <br />
                Serving pilgrims and travelers with peace and comfort in the heart of Himachal.
              </p>
            </div>

            <div>
              <h5 className="text-lg font-display font-bold mb-6 text-bhagwa-400">Navigation</h5>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-slate-400 hover:text-bhagwa-400 transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-display font-bold mb-6 text-bhagwa-400">Our Services</h5>
              <ul className="space-y-4">
                <li className="text-slate-400 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-bhagwa-600" /> Tour Packages</li>
                <li className="text-slate-400 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-bhagwa-600" /> Airport Transfers</li>
                <li className="text-slate-400 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-bhagwa-600" /> Outstation Trips</li>
                <li className="text-slate-400 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-bhagwa-600" /> 24/7 Taxi Service</li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-display font-bold mb-6 text-bhagwa-400">Office Address</h5>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Sukh Shanti Tour & Travels <br />
                Near Baba Balak Nath Temple, <br />
                Bijhar, Distt Hamirpur, <br />
                Himachal Pradesh - 176040
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 text-slate-400 rounded-full flex items-center justify-center hover:bg-bhagwa-600 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 text-slate-400 rounded-full flex items-center justify-center hover:bg-bhagwa-600 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Sukh Shanti Tour & Travels. Jai Baba Balak Nath Ji.
            </p>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-bhagwa-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-bhagwa-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/917018404537"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-10 h-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </motion.a>
        <a 
          href="tel:7018404537"
          className="md:hidden w-16 h-16 bg-bhagwa-600 text-white rounded-full shadow-2xl flex items-center justify-center animate-bounce border-2 border-bhagwa-400"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}
