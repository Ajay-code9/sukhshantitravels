export type FleetVehicle = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  registration?: string;
  stories: { label: string; title: string; text: string; highlights: string[] }[];
};

export const fleet: FleetVehicle[] = [
  {
    id: 'ertiga', name: 'Maruti Suzuki Ertiga', category: 'For journeys together', registration: 'HP 01 H 3303',
    description: 'A family MPV for your next hill escape, airport pickup or outstation journey.',
    image: 'fleet/ertiga-traveller.webp', imageAlt: 'Our white Ertiga, registration HP 01 H 3303, beside a Force Traveller',
    stories: [
      { label: '01 / THE RIDE', title: 'More moments. Together.', text: 'Keep the journey part of the holiday. Enquire about our Ertiga for family outings, pilgrimage visits and longer Himachal trips.', highlights: ['Family travel', 'Outstation journeys', 'Himachal tours'] },
      { label: '02 / YOUR COMFORT', title: 'A little planning. A better ride.', text: 'Tell us how many people are travelling and what bags you are carrying. We will confirm the seating arrangement and luggage space for your trip.', highlights: ['Discuss your group size', 'Plan luggage space', 'Choose pickup time'] },
      { label: '03 / THE ROAD AHEAD', title: 'Your route. Your itinerary.', text: 'Starting from Bijhar, Deotsidh or arranging another pickup? Share your date and destination for a vehicle availability check and a clear fare quote.', highlights: ['Airport transfers', 'Local sightseeing', 'Fare on enquiry'] },
    ],
  },
  {
    id: 'alto-k10', name: 'Maruti Suzuki Alto K10', category: 'Small car. Plenty of possibilities.',
    description: 'A compact option for local visits, station pickups and smaller travel parties.',
    image: 'fleet/alto-k10-ertiga.webp', imageAlt: 'Our Alto K10 and Ertiga parked side by side',
    stories: [
      { label: '01 / THE RIDE', title: 'Keep it simple. Get going.', text: 'Enquire about the Alto K10 for a local outing, pickup or a trip with a smaller travel party.', highlights: ['Local journeys', 'Small travel parties', 'Pickup & drop'] },
      { label: '02 / YOUR COMFORT', title: 'The right fit for your day.', text: 'Share your passenger count and bags so we can check whether this compact car suits your plans before you confirm.', highlights: ['Confirm passenger count', 'Check bag space', 'Discuss your route'] },
      { label: '03 / THE ROAD AHEAD', title: 'A ride around your plans.', text: 'Tell us your pickup location, date and destination. We will confirm availability and the fare directly with you.', highlights: ['Flexible pickup', 'Route-based quote', 'Direct confirmation'] },
    ],
  },
  {
    id: 'alto-800', name: 'Maruti Suzuki Alto 800', category: 'Everyday journeys, made easier.',
    description: 'A familiar compact ride for everyday pickups and local travel enquiries.',
    image: 'fleet/alto-800.webp', imageAlt: 'Our white Alto 800 photographed on a journey',
    stories: [
      { label: '01 / THE RIDE', title: 'For the everyday and the getaway.', text: 'Our Alto 800 is another compact option to discuss for your local ride or pickup.', highlights: ['Local travel', 'Pickup & drop', 'Small travel parties'] },
      { label: '02 / YOUR COMFORT', title: 'Let us match the ride to you.', text: 'Passenger numbers and luggage matter. Share both with us, and we will help you check if this is the right option.', highlights: ['Passenger planning', 'Luggage check', 'Vehicle suitability'] },
      { label: '03 / THE ROAD AHEAD', title: 'A quick conversation away.', text: 'Send your journey details on WhatsApp. Our team will confirm the route, vehicle availability and fare before booking.', highlights: ['WhatsApp enquiry', 'Clear trip details', 'Booking by confirmation'] },
    ],
  },
  {
    id: 'traveller', name: 'Force Traveller', category: 'Bring your people. Share the journey.',
    description: 'Discuss a Traveller for group outings, family functions or pilgrimage travel.',
    image: 'fleet/ertiga-traveller.webp', imageAlt: 'Our white Force Traveller beside an Ertiga',
    stories: [
      { label: '01 / THE RIDE', title: 'A bigger journey, together.', text: 'Planning a group trip? Enquire about a Traveller for shared outings, pilgrimage journeys and family occasions.', highlights: ['Group travel', 'Pilgrimage visits', 'Family occasions'] },
      { label: '02 / YOUR COMFORT', title: 'Every group is different.', text: 'Tell us the exact group size and luggage needs. The team will confirm the available seating configuration and suitable vehicle.', highlights: ['Confirm seating layout', 'Discuss luggage', 'Check availability'] },
      { label: '03 / THE ROAD AHEAD', title: 'One plan for the whole group.', text: 'Share your stops, dates and pickup points for a group travel quote. Vehicle, fare and arrangements are confirmed directly.', highlights: ['Multiple stops', 'Group itinerary', 'Fare on enquiry'] },
    ],
  },
];
