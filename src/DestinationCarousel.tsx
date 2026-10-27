import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, MapPin, Mountain, Pause, Play, Route, Sun } from 'lucide-react';
import { destinations } from './destinations';
import images from './destinationImages.json';
import './destinations.css';

const imageFor = (id: string) => images[id as keyof typeof images];

export default function DestinationCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const section = useRef<HTMLElement>(null);
  const shortcuts = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const destination = destinations[active];
  const photo = imageFor(destination.id);
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReducedMotion(media.matches); if (media.matches) setPlaying(false); };
    update();
    media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (section.current) observer.observe(section.current);
    return () => { media.removeEventListener('change', update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || !visible || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % destinations.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, visible, reducedMotion]);

  useEffect(() => {
    const selected = shortcuts.current?.querySelector<HTMLElement>('[aria-current="true"]');
    const container = shortcuts.current;
    if (container && selected) {
      const left = selected.offsetLeft - container.offsetLeft - (container.clientWidth - selected.clientWidth) / 2;
      container.scrollTo({ left, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
    if (visible) {
      const nextImage = new Image();
      nextImage.src = `${base}${imageFor(destinations[(active + 1) % destinations.length].id).src}`;
    }
  }, [active, base, reducedMotion, visible]);

  const select = (index: number) => {
    setActive((index + destinations.length) % destinations.length);
    setPlaying(false);
  };
  const enquiry = `Hello! I am interested in a ${destination.name} trip. Please help me plan the itinerary, vehicle and fare. Suggested round trip: ${destination.daysChandigarh} from Chandigarh / ${destination.daysDelhi} from Delhi.`;

  return (
    <section id="destinations" className="destination-section" ref={section} aria-labelledby="destinations-title">
      <div className="wrap">
        <div className="destination-heading">
          <div><p className="eyebrow">ONE STATE. A WORLD OF JOURNEYS.</p><h2 id="destinations-title">Find your kind of <em>Himachal.</em></h2></div>
          <div className="destination-intro"><p>Snowy peaks or riverside mornings? Explore 12 places worth the journey, with a little help planning the road there and back.</p><span><Mountain size={16} /> Handpicked escapes · Your pace, your route</span></div>
        </div>

        <div className="destination-shortcuts" ref={shortcuts} aria-label="Choose a destination">
          {destinations.map((place, index) => <button key={place.id} type="button" aria-current={active === index ? 'true' : undefined} aria-controls="destination-slide" onClick={() => select(index)}><span>{String(index + 1).padStart(2, '0')}</span>{place.name}</button>)}
        </div>

        <div className="destination-carousel" role="region" aria-roledescription="carousel" aria-label="Himachal travel ideas" tabIndex={0}
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={event => setFocused(!(event.target as HTMLElement).closest('.slideshow-toggle'))} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
          onKeyDown={event => { if (event.altKey || event.ctrlKey || event.metaKey) return; if (event.key === 'ArrowRight') { event.preventDefault(); select(active + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); select(active - 1); } }}>
          <article id="destination-slide" className="destination-slide" role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${destinations.length}: ${destination.name}`}>
              <div className="destination-photo-navigation" aria-label="Change destination"><button className="carousel-arrow" type="button" aria-label="Previous destination" onClick={() => select(active - 1)}><ArrowLeft size={20} /></button><button className="carousel-arrow next" type="button" aria-label="Next destination" onClick={() => select(active + 1)}><ArrowRight size={20} /></button></div>
            <div className="destination-photo"
              onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }}
              onTouchEnd={event => { const point = event.changedTouches[0]; const start = touch.current; touch.current = null; if (!start) return; const dx = point.clientX - start.x, dy = point.clientY - start.y; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) select(active + (dx < 0 ? 1 : -1)); }}
              onTouchCancel={() => { touch.current = null; }}>
              {failedImage !== destination.id ? <img key={destination.id} className="destination-photo-image" src={`${base}${photo.src}`} alt={`${destination.name}: ${photo.title.replace(/\.(jpg|jpeg)$/i, '')}`} width="1280" height="900" loading="lazy" decoding="async" onError={() => setFailedImage(destination.id)} /> : <div className="destination-photo-fallback"><Mountain size={70} /><span>{destination.name}</span></div>}
              <div className="destination-photo-gradient" />

              <span className="destination-category"><MapPin size={14} /> {destination.category}</span>
              <span className="destination-serial">HIMACHAL DIARIES <b>{String(active + 1).padStart(2, '0')} / 12</b></span>
              <div className="destination-photo-title"><p>{destination.subtitle}</p><h3>{destination.name}</h3></div>
              <div className="destination-photo-credit"><a href={photo.source} target="_blank" rel="noopener noreferrer">Photo: {photo.author}</a><span> · </span><a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></div>
            </div>

            <div className="destination-details" key={destination.id}><div className="destination-detail-content">
              <p className="eyebrow">A LITTLE INSPIRATION. A REAL PLAN.</p>
              <h4>{destination.subtitle}</h4><p className="destination-description">{destination.description}</p>
              <div className="destination-distances" aria-label="Approximate one-way road distances"><div><Route size={18} /><span>From Chandigarh<strong>~{destination.chandigarh}<small> km</small></strong></span></div><div><Route size={18} /><span>From Delhi<strong>~{destination.delhi}<small> km</small></strong></span></div></div>
              <p className="distance-caption">Approx. one way by road{destination.distanceNote ? ` · ${destination.distanceNote}` : ''}</p>
              <div className="destination-days"><CalendarDays size={20} /><div><span>SUGGESTED ROUND TRIP</span><div className="trip-days"><p><strong>{destination.daysChandigarh}</strong>from Chandigarh</p><p><strong>{destination.daysDelhi}</strong>from Delhi</p></div><small>Includes travel out, sightseeing & return.</small></div></div>
              <div className="destination-highlights">{destination.highlights.map(highlight => <span key={highlight}><Check size={12} />{highlight}</span>)}</div>
              <div className="destination-season"><Sun size={16} /><span>Best travel window<strong>{destination.season}</strong></span></div>
              <details className="destination-plan"><summary>How your trip could look</summary><p>{destination.plan}</p><p>{destination.note}</p></details>
              </div><a className="button destination-enquire" href={`https://wa.me/917018404537?text=${encodeURIComponent(enquiry)}`} target="_blank" rel="noopener noreferrer">Plan this trip with us <ArrowUpRight size={19} /></a>
            </div>
          </article>
          <div className="destination-controls"><div className="destination-counter" aria-live={playing ? 'off' : 'polite'} aria-atomic="true"><b>{String(active + 1).padStart(2, '0')}</b><span>/ {destinations.length} destinations</span><span className="current-destination">{destination.name}</span></div><div className="destination-control-buttons">{!reducedMotion && <button className="slideshow-toggle" type="button" aria-label={playing ? 'Pause destination slideshow' : 'Play destination slideshow'} aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={15} /> : <Play size={15} />}<span>{playing ? 'Pause' : 'Slideshow'}</span></button>}</div></div>
        </div>
        <details className="destination-credits"><summary>Travel notes & photo credits</summary><div className="destination-credits-panel"><div className="destination-footnote"><p>Distances are approximate and vary by starting point and route. Trip lengths are suggestions; leave extra time for traffic, weather and road conditions.</p><a href={destination.source} target="_blank" rel="noopener noreferrer">Distance reference <ArrowUpRight size={13} /></a></div><p>Photos are from Wikimedia Commons under the licences linked below, resized, converted to WebP and displayed with responsive cropping. Travel durations are our suggested itineraries, not guaranteed schedules. Seasonal access, activities and route availability must be confirmed before travel.</p><div>{destinations.map(place => { const credit = imageFor(place.id); return <p key={place.id}><strong>{place.name}:</strong> <a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.title}</a> by {credit.author} · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a> · <a href={place.source} target="_blank" rel="noopener noreferrer">Travel reference</a></p>; })}</div></div></details>
      </div>
    </section>
  );
}
