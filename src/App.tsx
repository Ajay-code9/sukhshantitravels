/** @license SPDX-License-Identifier: Apache-2.0 */
import { useEffect, useRef, useState } from 'react';
import DestinationCarousel from './DestinationCarousel';
import FleetShowcase from './FleetShowcase';
import { Car, Plane, ShieldCheck, Phone, MapPin, Menu, X, ArrowUpRight, Clock, Mountain, MessageCircle, Check } from 'lucide-react';

const PHONE = '917018404537';
const greeting = 'Hello! I would like to enquire about a ride with Sukh Shanti Tour & Travels.';
const whatsapp = (message: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const services = [
  { icon: Mountain, title: 'Himachal tours', text: 'Plan a journey to Shimla, Manali, Dharamshala or the sacred shrine of Baba Balak Nath Ji.' },
  { icon: Plane, title: 'Airport transfers', text: 'Arrange pickup and drop for Chandigarh, Amritsar and other regional airports.' },
  { icon: Car, title: 'Local & outstation', text: 'From a local visit to a longer family trip, discuss your route and get a fare quote.' },
  { icon: ShieldCheck, title: 'Pilgrimage travel', text: 'Travel to Deotsidh and nearby religious destinations with your family or group.' },
];
const routes = ['Bijhar / Deotsidh to Chandigarh', 'Bijhar / Deotsidh to Amritsar', 'Shimla & Manali tours', 'Dharamshala & nearby destinations'];
const links = ['Home', 'Destinations', 'Fleet', 'Services', 'About', 'Contact'];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.borderBoxSize?.[0]?.inlineSize > 960 || element.getBoundingClientRect().width > 960) {
        setMenuOpen(false);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [menuOpen]);
  useEffect(() => {
    let frame = 0;
    const navigate = (hash: string, smooth: boolean) => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      setMenuOpen(false);
      requestAnimationFrame(() => {
        const offset = (header.current?.getBoundingClientRect().height ?? 88) + 12;
        window.scrollTo({ top: hash === '#home' ? 0 : Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset), behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || !document.getElementById(hash.slice(1))) return;
      event.preventDefault();
      if (location.hash !== hash) history.pushState(null, '', hash);
      navigate(hash, true);
    };
    const syncActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = (header.current?.getBoundingClientRect().height ?? 88) + 40;
        const current = links.map(name => document.getElementById(name.toLowerCase())).filter((element): element is HTMLElement => !!element).filter(element => element.getBoundingClientRect().top <= line).at(-1);
        setActiveSection(current?.id ?? 'home');
      });
    };
    const hashChange = () => navigate(location.hash || '#home', false);
    document.addEventListener('click', click);
    window.addEventListener('hashchange', hashChange);
    window.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', syncActive);
    if (location.hash) navigate(location.hash, false);
    syncActive();
    return () => { cancelAnimationFrame(frame); document.removeEventListener('click', click); window.removeEventListener('hashchange', hashChange); window.removeEventListener('scroll', syncActive); window.removeEventListener('resize', syncActive); };
  }, []);
  const [form, setForm] = useState({ name: '', phone: '', pickup: '', destination: '', date: '' });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const [year, month, day] = form.date.split('-');
  const message = [greeting, '', `Name: ${form.name.trim() || 'Not entered'}`, `Pickup: ${form.pickup.trim() || 'Not entered'}`, `Destination: ${form.destination.trim() || 'Not entered'}`, `Travel date: ${form.date ? `${day}/${month}/${year}` : 'Not selected'}`, ...(form.phone.trim() ? [`Callback number: ${form.phone.trim()}`] : []), '', 'Please share the fare, available vehicle options and seating capacity.'].join('\n');
  const field = (key: keyof typeof form, label: string, placeholder: string, type = 'text', required = true) => <div className="field"><label htmlFor={key}>{label}{!required && <span> (optional)</span>}</label><input id={key} name={key} type={type} placeholder={placeholder} value={form[key]} required={required} min={type === 'date' ? today : undefined} maxLength={type === 'date' ? undefined : 120} autoComplete={key === 'name' ? 'name' : key === 'phone' ? 'tel' : undefined} pattern={key === 'phone' ? '[+0-9 ()-]{7,20}' : undefined} onChange={e => setForm({ ...form, [key]: e.target.value })} onBlur={e => { if (type !== 'date') setForm(current => ({ ...current, [key]: e.target.value.trim() })); }} /></div>;
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header" ref={header}><a className="brand" href="#home"><img src={`${import.meta.env.BASE_URL}brand-mark.png`} alt="" width="42" height="42" /><span>Sukh Shanti<small>TOUR & TRAVELS</small></span></a><button type="button" ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><nav aria-label="Main navigation" id="navigation" className={menuOpen ? 'navigation open' : 'navigation'}>{links.map(link => <a key={link} href={`#${link.toLowerCase()}`} aria-current={activeSection === link.toLowerCase() ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{link}</a>)}<a className="button small" href={`tel:+${PHONE}`}><Phone size={16} /> Call now</a></nav></header>
    <main id="main-content">
      <section id="home" className="hero"><img className="hero-image" src={`${import.meta.env.BASE_URL}hero-himachal.webp`} alt="Baba Balak Nath shrine in Deotsidh, Himachal Pradesh" width="1600" height="900" fetchPriority="high" /><div className="hero-shade" /><div className="hero-content wrap"><p className="devotion">JAI BABA BALAK NATH JI</p><p className="eyebrow light">BIJHAR & DEOTSIDH · HIMACHAL PRADESH</p><h1>Taxi service in Hamirpur.<br /><em>Your Himachal journey.</em></h1><p className="hero-description">Local and outstation taxis from Bijhar & Deotsidh, Hamirpur.<br className="desktop-break" /> Airport transfers, Baba Balak Nath visits and Himachal tours.</p><div className="actions"><a className="button" href="#contact">Plan your ride <ArrowUpRight size={20} /></a><a className="button outline" href={`tel:+${PHONE}`}><Phone size={18} /> +91 70184 04537</a></div><div className="hero-note"><Clock size={16} /> Call or WhatsApp for travel enquiries, 24/7</div></div><div className="hero-bottom wrap"><span>Rooted in Himachal. Ready for your journey.</span><a href="#services">Explore our services ↓</a></div></section>
      <DestinationCarousel />
      <FleetShowcase />
      <section id="services" className="section wrap"><div className="section-heading"><div><p className="eyebrow">THE WAY YOU WANT TO TRAVEL</p><h2>Local taxis & tours<br />across Himachal.</h2></div><p>Heading home, catching a flight or exploring the hills? Tell us where you want to go. We will help you plan the ride.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="service-card" key={title}><div className="service-top"><Icon size={28} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p><a href={whatsapp(`Hello! I would like to enquire about ${title.toLowerCase()}. Please share the options and fare.`)} target="_blank" rel="noopener noreferrer">Enquire now <ArrowUpRight size={17} /></a></article>)}</div><div className="routes"><div><p className="eyebrow">PLAN YOUR ROUTE</p><h3>Popular journeys</h3><p>Fare depends on your route, date and vehicle. Ask us for a quote.</p></div><div className="route-list">{routes.map(route => <a key={route} href={whatsapp(`Hello! Please share the fare and available vehicle options for ${route}.`)} target="_blank" rel="noopener noreferrer"><span>{route}</span><ArrowUpRight size={19} /></a>)}</div></div></section>
      <section id="about" className="about"><div className="wrap about-grid"><div><p className="eyebrow light">OUR HOME. YOUR NEXT DESTINATION.</p><h2>From the heart<br />of Himachal.</h2><p>Sukh Shanti Tour & Travels operates from <strong>Bijhar and Deotsidh in Hamirpur, Himachal Pradesh</strong>. We help families, pilgrims and travellers arrange local rides, airport transfers and journeys across the region.</p><p>Whether you are visiting Baba Balak Nath Ji or planning a trip to the hills, contact us to discuss your itinerary, vehicle needs and fare before you travel.</p><a className="text-link" href="#contact">Let’s plan your journey <ArrowUpRight size={20} /></a></div><div className="journey-card"><Mountain size={44} strokeWidth={1.2} /><p className="eyebrow">SUKH · SHANTI</p><h3>Travel with<br />peace of mind.</h3><ul><li><Check size={18} /> Two operating locations: Bijhar & Deotsidh</li><li><Check size={18} /> Local, outstation & pilgrimage enquiries</li><li><Check size={18} /> Discuss vehicle size and seating before booking</li><li><Check size={18} /> Confirm your fare directly with our team</li></ul></div></div></section>
      <section id="contact" className="section wrap contact-grid"><div><p className="eyebrow">LET’S GET YOU ON THE ROAD</p><h2>Where are<br />you heading?</h2><p className="contact-intro">Share your travel details on WhatsApp. We will discuss availability and the fare with you. Your booking is final only after confirmation from our team.</p><a className="contact-phone" href={`tel:+${PHONE}`}><Phone size={23} /><span><small>CALL FOR ENQUIRIES</small>+91 70184 04537</span></a><h3 className="locations-title">Our operating locations</h3><div className="location-grid">{['Bijhar', 'Deotsidh'].map(location => <article className="location" key={location}><MapPin size={22} /><h4>{location}</h4><p>Hamirpur, Himachal Pradesh</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location}, Hamirpur, Himachal Pradesh`)}`} target="_blank" rel="noopener noreferrer">View area on Maps <ArrowUpRight size={15} /></a></article>)}</div><p className="location-note">Call us for the exact meeting point or office directions before visiting.</p></div><div className="enquiry-card"><h3>Enquire about a ride</h3><p>Share your trip details to get availability and a fare quote.</p><form onSubmit={e => { e.preventDefault(); if (form.date < today) { document.getElementById('date')?.focus(); return; } window.open(whatsapp(message), '_blank', 'noopener,noreferrer'); }}><div className="form-grid">{field('name', 'Full name', 'Your name')}{field('phone', 'Callback number', '+91', 'tel', false)}{field('pickup', 'Pickup location', 'e.g. Bijhar')}{field('destination', 'Destination', 'Where are you going?')}{field('date', 'Travel date', '', 'date')}</div><details className="message-preview"><summary>Preview your WhatsApp message</summary><p>{message}</p></details><button className="button submit" type="submit"><MessageCircle size={20} /> Enquire on WhatsApp <ArrowUpRight size={18} /></button><p className="form-note">WhatsApp opens with your details. Tap Send there to share your enquiry. This website does not save your form entries.</p></form></div></section>
      <section className="faq-section"><div className="wrap faq-grid"><div><p className="eyebrow">BEFORE YOU TRAVEL</p><h2>A little clarity<br />for the road.</h2></div><div>{[['Can I arrange a taxi pickup in Hamirpur?', 'We operate from Bijhar and Deotsidh in Hamirpur district. Call +91 70184 04537 or send your pickup point, date and destination on WhatsApp so our team can confirm availability and fare.'], ['Do you offer Chandigarh airport transfers and Himachal tours?', 'Enquire about Chandigarh and Amritsar airport transfers, local and outstation rides, Deotsidh pilgrimage visits, and tours to Shimla, Manali and Dharamshala. Routes and travel time are confirmed for your dates.'], ['How is my booking confirmed?', 'Sending an enquiry does not confirm a booking. Our team will confirm the vehicle, fare, pickup details and availability directly by call or WhatsApp.'], ['Which vehicles and seating options are available?', 'Our fleet includes Ertiga, Alto and Traveller options. Tell us your group size and luggage needs; our team will confirm the suitable vehicle, seating capacity and availability.'], ['What is included in the fare?', 'Ask for the total fare and clarify tolls, parking, waiting charges, driver allowances and any advance payment or cancellation terms before confirming.'], ['Where do you operate from?', 'We operate from both Bijhar and Deotsidh in Hamirpur, Himachal Pradesh. Contact us for the exact pickup or meeting point.']].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    </main><footer><div className="wrap footer-top"><div><a className="footer-brand" href="#home">Sukh Shanti<span>Tour & Travels</span></a><p>Jai Baba Balak Nath Ji.<br />Bijhar & Deotsidh · Hamirpur, Himachal Pradesh</p></div><nav aria-label="Footer">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</nav><div><a href={`tel:+${PHONE}`}>+91 70184 04537</a><a href={whatsapp(greeting)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a></div></div><div className="wrap footer-bottom"><span>© {now.getFullYear()} Sukh Shanti Tour & Travels</span><span>Enquiries by call & WhatsApp · Booking subject to confirmation</span></div></footer>
    <a className="floating-whatsapp" aria-label="Enquire on WhatsApp (opens in a new tab)" href={whatsapp(greeting)} target="_blank" rel="noopener noreferrer"><MessageCircle size={28} /></a><div className="mobile-contact"><a href={`tel:+${PHONE}`}><Phone size={19} /> Call now</a><a href={whatsapp(greeting)} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> WhatsApp</a></div>
  </div>;
}
