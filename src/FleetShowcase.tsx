import { useState } from 'react';
import { ArrowUpRight, BedDouble, BusFront, Check, Image as ImageIcon, TrainFront } from 'lucide-react';
import { fleet } from './fleet';
import './fleet.css';

export default function FleetShowcase() {
  const [selected, setSelected] = useState(0);
  const vehicle = fleet[selected];
  const base = import.meta.env.BASE_URL;
  const enquiry = 'Hello! I would like to enquire about ' + vehicle.name + (vehicle.registration ? ' (' + vehicle.registration + ')' : '') + '. Please confirm availability, passenger seating, luggage space and fare for my trip.';
  return <section id="fleet" className="fleet-section" aria-labelledby="fleet-title">
    <div className="wrap">
      <div className="fleet-heading"><div><p className="eyebrow">THE PEOPLE. THE PLACES. THE RIDE.</p><h2 id="fleet-title">Meet your next<br /><em>travel companion.</em></h2></div><p>Real vehicles. Real journeys. Browse our fleet photos and tell us where you want to go.</p></div>
      <div className="fleet-selector" aria-label="Choose a fleet vehicle">{fleet.map((car, index) => <button type="button" key={car.id} aria-pressed={selected === index} aria-controls="fleet-vehicle" onClick={() => setSelected(index)}><span>0{index + 1}</span>{car.name.replace('Maruti Suzuki ', '')}</button>)}</div>
      <div className="fleet-layout" id="fleet-vehicle">
        <div className="fleet-visual">
          <div className="fleet-visual-heading"><div><span>YOUR RIDE</span><h3>{vehicle.name}</h3></div>{vehicle.registration && <span className="fleet-plate"><small>IND</small>{vehicle.registration}</span>}</div>
          <div className="fleet-stage"><img className={'fleet-photo ' + vehicle.id} src={base + vehicle.image} alt={vehicle.imageAlt} width="1600" height="1187" loading="lazy" /><span className="fleet-photo-label"><ImageIcon size={13} /> Actual fleet photo</span></div>
          <p className="fleet-photo-caption">{vehicle.description}</p>
        </div>
        <div className="fleet-stories">{vehicle.stories.map(item => <article key={item.label} className="fleet-story"><h3>{item.title}</h3><p>{item.text}</p><ul>{item.highlights.map(highlight => <li key={highlight}><Check size={15} />{highlight}</li>)}</ul></article>)}<a className="button" href={'https://wa.me/917018404537?text=' + encodeURIComponent(enquiry)} target="_blank" rel="noopener noreferrer">Enquire for {vehicle.name.replace('Maruti Suzuki ', '')}<ArrowUpRight size={17} /></a></div>
      </div>
      <div className="fleet-assistance"><p>More than the ride.<span>Ask our team about travel arrangements.</span></p><div>{[[BedDouble, 'Hotel booking'], [BusFront, 'Bus booking'], [TrainFront, 'Train tickets']].map(([Icon, label]) => { const ServiceIcon = Icon as typeof BedDouble; return <a key={label as string} href={`https://wa.me/917018404537?text=${encodeURIComponent(`Hello! Please help me with ${label}.`)}`} target="_blank" rel="noopener noreferrer"><ServiceIcon size={18} />{label as string}<ArrowUpRight size={14} /></a>; })}</div></div>
    </div>
  </section>;
}
