/**
 * Conversational AI voice agent ID (Agents dashboard, starts with `agent_`).
 * The agent must be public for a keyless browser embed. Empty = voice demo
 * stays disabled and the floating pill falls back to the contact page.
 */
export const VOICE_AGENT_ID = 'agent_2701m46b263petjtzz380yqrqtzm';

/**
 * Which voice UI to render. `custom` = Pantaa-built controls over the client
 * SDK (`voice.ts`); `widget` = the official drop-in widget (`RWidget.svelte`).
 * One-line switch; the inactive path stays in the repo untouched.
 */
export const VOICE_UI: 'custom' | 'widget' = 'custom';

/**
 * Master kill-switch for the live voice feature (both UIs). `false` hides the
 * call button, text input, floating pill, and drop-in widget, leaving the hero
 * orb as a static visual. No session, script, or credit burn while off.
 */
export const VOICE_ENABLED = false;

export const LINKS = {
	contact: '/contact',
	calendly: 'https://calendly.com/carltonkarani/30min',
	home: '/',
	process: '/#process',
	terms: '/terms',
	privacy: '/privacy',
	x: 'https://x.com',
	wageRef: 'https://www.onetonline.org/link/summary/43-4171.00'
} as const;

export interface UseCase {
	title: string;
	trailer: string;
	description: string;
	image: string | null;
	alt: string;
	gradient: string;
}

const GRADIENTS = [
	'radial-gradient(circle at 15% 20%, #f8c76a 0%, transparent 30%), radial-gradient(circle at 82% 18%, #80dbed 0%, transparent 36%), radial-gradient(circle at 24% 82%, #1d6f35 0%, transparent 42%), linear-gradient(135deg, #2f8a40 0%, #ebc84d 38%, #55c4d7 72%, #102d45 100%)',
	'radial-gradient(circle at 16% 22%, #f49f6a 0%, transparent 32%), radial-gradient(circle at 78% 20%, #9ee8ef 0%, transparent 38%), radial-gradient(circle at 54% 88%, #2d8a3d 0%, transparent 44%), linear-gradient(135deg, #eaa243 0%, #75c95e 42%, #68d3e6 76%, #17304e 100%)',
	'radial-gradient(circle at 18% 18%, #a8e37a 0%, transparent 34%), radial-gradient(circle at 80% 14%, #a5eaf2 0%, transparent 38%), radial-gradient(circle at 46% 84%, #e59f3d 0%, transparent 40%), linear-gradient(135deg, #2d7740 0%, #e6c64e 38%, #74d3dd 72%, #102d3e 100%)',
	'radial-gradient(circle at 20% 22%, #efbc4f 0%, transparent 32%), radial-gradient(circle at 82% 18%, #84d7e2 0%, transparent 36%), radial-gradient(circle at 34% 84%, #174f2a 0%, transparent 44%), linear-gradient(135deg, #255d31 0%, #d89738 44%, #41abc4 78%, #0f2c44 100%)',
	'radial-gradient(circle at 14% 20%, #e9cb4d 0%, transparent 34%), radial-gradient(circle at 80% 24%, #98e7f0 0%, transparent 38%), radial-gradient(circle at 62% 84%, #236d35 0%, transparent 40%), linear-gradient(135deg, #5ea73f 0%, #efb24d 40%, #5dc8de 76%, #15324b 100%)',
	'radial-gradient(circle at 16% 18%, #f58f46 0%, transparent 32%), radial-gradient(circle at 78% 18%, #79dbe8 0%, transparent 38%), radial-gradient(circle at 32% 82%, #2f8a3f 0%, transparent 42%), linear-gradient(135deg, #2b813c 0%, #f19a3f 42%, #4bbbd4 78%, #0d2b43 100%)',
	'radial-gradient(circle at 18% 22%, #f0d45b 0%, transparent 34%), radial-gradient(circle at 82% 18%, #8ce3ef 0%, transparent 38%), radial-gradient(circle at 24% 84%, #1f7b38 0%, transparent 44%), linear-gradient(135deg, #2f7b3f 0%, #e7b449 40%, #5fc8de 76%, #132f49 100%)'
];

export const USE_CASES: UseCase[] = [
	{
		title: 'Customer Support',
		trailer: ', ',
		description:
			'Resolve the questions customers ask all day, hours, pricing, availability, in seconds. Cut hold times and free your team for the work that actually grows the business.',
		image: null,
		alt: 'AI receptionist resolving a customer question over chat',
		gradient: GRADIENTS[0]
	},
	{
		title: 'An AI receptionist that books appointments',
		trailer: '',
		description:
			'Turn calls into booked appointments while the caller is still on the line. Pantaa Receptionist checks availability, coordinates calendars, and writes the booking straight into your schedule.',
		image: '/receptionist/images/Calendar.png',
		alt: 'Calendar grid with appointments booked by the AI receptionist',
		gradient: GRADIENTS[1]
	},
	{
		title: '24/7 call answering on your terms',
		trailer: '',
		description:
			'Never send a caller to voicemail again. Pantaa Receptionist answers nights, weekends, and holidays, captures the details, and flags anything urgent so no lead waits until morning.',
		image: '/receptionist/images/24_7.png',
		alt: '24/7 call coverage dashboard for after-hours calls',
		gradient: GRADIENTS[2]
	},
	{
		title: 'A virtual receptionist in 70+ languages',
		trailer: '',
		description:
			'Greet every caller in a voice that sounds genuinely human, in English, Spanish, and 70+ more. Serve customers in the language they speak and win the ones your competitors can\u2019t.',
		image: '/receptionist/images/Languages_2.png',
		alt: 'Human-like voices in 70+ languages for the AI receptionist',
		gradient: GRADIENTS[3]
	},
	{
		title: 'Online Booking',
		trailer: ', ',
		description:
			'Give customers a booking page tied to the same receptionist. They can call, text, or book online, and every channel stays in sync so nothing gets double-booked.',
		image: '/receptionist/images/Online_booking.png',
		alt: 'Online booking confirmation screen for a service business',
		gradient: GRADIENTS[4]
	},
	{
		title: 'Team-First Routing',
		trailer: ', ',
		description:
			'Set call handling around your team\u2019s hours and availability. Pantaa Receptionist can answer, route, or step in as backup so calls get handled instead of lost.',
		image: '/receptionist/images/Booking.png',
		alt: 'Phone, chat, and booking page interface for routing customer requests',
		gradient: GRADIENTS[5]
	},
	{
		title: 'Multi-Location Coverage',
		trailer: ', ',
		description:
			'Run one receptionist across every location. Route calls by branch, share calendars, and keep the same brand voice whether you have one office or fifty.',
		image: '/receptionist/images/Location.png',
		alt: 'Multi-location call coverage for the AI receptionist',
		gradient: GRADIENTS[6]
	}
];

export interface TranscriptMsg {
	from: 'caller' | 'agent';
	text: string;
}

export interface Industry {
	name: string;
	slug: string;
	panelName: string;
	description: string;
	transcript: TranscriptMsg[];
	booking?: { title: string; detail: string };
}

export const INDUSTRIES: Industry[] = [
	{
		name: 'Home services',
		slug: 'home-services',
		panelName: 'Plumbing Receptionist',
		description:
			'Book jobs and answer questions while your team is in the field. Pantaa Receptionist handles everything from emergency plumbing calls to routine maintenance appointments.',
		transcript: [
			{ from: 'caller', text: 'Hi, our kitchen sink is leaking everywhere. Can someone come out today?' },
			{ from: 'agent', text: 'I can help with that. Is the leak steady or getting worse?' },
			{ from: 'caller', text: 'Steady drip, but the cabinet underneath is soaked.' },
			{ from: 'agent', text: 'I have Mike available between 2 and 4 PM today. What\u2019s the address?' },
			{ from: 'caller', text: '48 Maple Ave. And how much is the visit?' },
			{ from: 'agent', text: 'Service calls are $89, applied to any repair. You\u2019re booked for today, 2\u20134 PM.' }
		],
		booking: { title: 'Emergency visit booked', detail: 'Today · 2:00\u20134:00 PM · Mike R.' }
	},
	{
		name: 'Legal',
		slug: 'legal',
		panelName: 'Legal Receptionist',
		description:
			'Screen inbound inquiries, route calls to the right attorney or advisor, capture case details, and schedule consultations.',
		transcript: [
			{ from: 'caller', text: 'I need to speak with someone about a contract dispute.' },
			{ from: 'agent', text: 'Of course. Is this for you personally or for a business?' },
			{ from: 'caller', text: 'For my business. A vendor missed every deadline.' },
			{ from: 'agent', text: 'I\u2019ll connect you with our commercial team. Can I book a 30-minute consultation?' },
			{ from: 'caller', text: 'Thursday morning works.' },
			{ from: 'agent', text: 'Done \u2014 Thursday at 9:30 AM with Dana Cole. I\u2019ve noted the case details.' }
		],
		booking: { title: 'Consultation booked', detail: 'Thu · 9:30 AM · Dana Cole' }
	},
	{
		name: 'Professional and IT services',
		slug: 'professional-it',
		panelName: 'IT Services Receptionist',
		description:
			'Qualify inbound project inquiries on scope, timeline, and budget, then book discovery calls with the right person instead of interrupting billable work.',
		transcript: [
			{ from: 'caller', text: 'We\u2019re looking for help migrating our servers to the cloud.' },
			{ from: 'agent', text: 'Great \u2014 roughly how many machines, and what\u2019s your timeline?' },
			{ from: 'caller', text: 'About forty servers. We\u2019d like it done this quarter.' },
			{ from: 'agent', text: 'That fits our infrastructure team. Shall I book a discovery call?' },
			{ from: 'caller', text: 'Yes, next Tuesday if possible.' },
			{ from: 'agent', text: 'Booked \u2014 Tuesday at 11 AM with Priya from our cloud team.' }
		],
		booking: { title: 'Discovery call booked', detail: 'Tue · 11:00 AM · Priya S.' }
	},
	{
		name: 'Clinics',
		slug: 'clinics',
		panelName: 'Clinic Receptionist',
		description:
			'Handle patient calls, intake, scheduling, rescheduling, directions, and routine questions while staff focus on people in the clinic.',
		transcript: [
			{ from: 'caller', text: 'Hi, I need to move my appointment to sometime next week.' },
			{ from: 'agent', text: 'No problem. Can I have your name and date of birth?' },
			{ from: 'caller', text: 'Sarah Kim, March 4th, 1990.' },
			{ from: 'agent', text: 'Found it. I have Wednesday at 10:15 AM or Friday at 2:40 PM.' },
			{ from: 'caller', text: 'Wednesday works. Do I need to bring anything?' },
			{ from: 'agent', text: 'Just your insurance card. You\u2019re rescheduled for Wednesday at 10:15 AM.' }
		],
		booking: { title: 'Appointment rescheduled', detail: 'Wed · 10:15 AM · Dr. Patel' }
	},
	{
		name: 'Automotive',
		slug: 'automotive',
		panelName: 'Auto Service Receptionist',
		description:
			'Take service and breakdown calls while every bay is full. Pantaa Receptionist gets the vehicle details and the symptom, then books the drop-off.',
		transcript: [
			{ from: 'caller', text: 'My car started shaking on the highway. Can I bring it in?' },
			{ from: 'agent', text: 'Let\u2019s get you in quickly. What\u2019s the year, make, and model?' },
			{ from: 'caller', text: '2019 Honda Civic. The check engine light is on too.' },
			{ from: 'agent', text: 'I can take it tomorrow at 8 AM for diagnostics. Does that work?' },
			{ from: 'caller', text: 'Yes, I\u2019ll drop it off tonight.' },
			{ from: 'agent', text: 'You\u2019re set \u2014 drop-off tonight, diagnostics first thing tomorrow.' }
		],
		booking: { title: 'Drop-off booked', detail: 'Tomorrow · 8:00 AM · Diagnostics' }
	},
	{
		name: 'Personal care and wellness',
		slug: 'personal-care',
		panelName: 'Salon Receptionist',
		description:
			'Book cuts, colors, massages, and more without interrupting your team mid-appointment. Pantaa Receptionist handles scheduling and rescheduling around the clock.',
		transcript: [
			{ from: 'caller', text: 'Do you have any openings for a balayage this Saturday?' },
			{ from: 'agent', text: 'Let me check \u2014 I have 11:30 AM with Jess or 3 PM with Marco.' },
			{ from: 'caller', text: 'I\u2019ll take Jess at 11:30. How long does it take?' },
			{ from: 'agent', text: 'About two and a half hours. What\u2019s the name for the booking?' },
			{ from: 'caller', text: 'Emily Rodriguez.' },
			{ from: 'agent', text: 'Booked, Emily \u2014 Saturday at 11:30 AM with Jess. See you then!' }
		],
		booking: { title: 'Balayage booked', detail: 'Sat · 11:30 AM · Jess' }
	},
	{
		name: 'Real estate and property management',
		slug: 'real-estate',
		panelName: 'Property Receptionist',
		description:
			'Pantaa Receptionist qualifies prospective buyers and books showings directly on your team\u2019s calendar. Schedule property viewings and answer listing questions while your staff is busy.',
		transcript: [
			{ from: 'caller', text: 'I saw the listing on Oak Street. Is it still available?' },
			{ from: 'agent', text: 'Yes, the 3-bed on Oak Street is still available at $485,000.' },
			{ from: 'caller', text: 'Great. Can I see it this weekend?' },
			{ from: 'agent', text: 'I have Sunday at 1 PM or 4 PM with our agent Tom.' },
			{ from: 'caller', text: 'Sunday at 1, please.' },
			{ from: 'agent', text: 'Showing booked \u2014 Sunday at 1 PM. Tom will meet you at the property.' }
		],
		booking: { title: 'Showing booked', detail: 'Sun · 1:00 PM · 12 Oak St' }
	},
	{
		name: 'Hospitality',
		slug: 'hospitality',
		panelName: 'Hotel Receptionist',
		description:
			'Answer guest questions about your hours, directions, menu, and amenities \u2014 even when your front desk or host stand is too busy to pick up.',
		transcript: [
			{ from: 'caller', text: 'Hi, what time is checkout, and do you have parking?' },
			{ from: 'agent', text: 'Checkout is at 11 AM, and yes \u2014 free on-site parking for guests.' },
			{ from: 'caller', text: 'Perfect. Can I book a table for four tonight at 7?' },
			{ from: 'agent', text: 'For the restaurant? I have 7 PM available. Name for the reservation?' },
			{ from: 'caller', text: 'Daniel Park.' },
			{ from: 'agent', text: 'Table for four booked tonight at 7 PM under Daniel Park.' }
		],
		booking: { title: 'Table booked', detail: 'Tonight · 7:00 PM · Party of 4' }
	}
];

export interface ProofCard {
	logo: 'elise' | 'klarna' | 'telekom' | 'eldra';
	logoLabel: string;
	stat: string;
	gradient: string;
}

export const PROOF_CARDS: ProofCard[] = [
	{
		logo: 'elise',
		logoLabel: 'EliseAI logo',
		stat: 'Managing 88% of inbound patient calls with AI, while lowering call costs by 66%.',
		gradient: GRADIENTS[0]
	},
	{
		logo: 'klarna',
		logoLabel: 'Klarna logo',
		stat: 'First-line phone support for 35 million US customers, resolving questions up to 10x faster.',
		gradient: GRADIENTS[1]
	},
	{
		logo: 'telekom',
		logoLabel: 'Deutsche Telekom logo',
		stat: 'Voice AI across the contact center and embedded in the network itself, for Europe\u2019s largest telecoms operator.',
		gradient: GRADIENTS[2]
	},
	{
		logo: 'eldra',
		logoLabel: 'Eldra logo',
		stat: 'Resolving around 90% of home-care calls end-to-end for schedules and plan changes.',
		gradient: GRADIENTS[3]
	}
];

export interface Plan {
	name: string;
	tagline: string;
	monthly: number | null;
	annual: number | null;
	overage: string | null;
	features: string[];
	cta: string;
	badge: string | null;
	featured: 'dark' | 'gradient' | null;
}

export const PLANS: Plan[] = [
	{
		name: 'Free trial',
		tagline: 'Full access for 14 days',
		monthly: null,
		annual: null,
		overage: null,
		features: [
			'30 min by phone/month',
			'1 phone number',
			'Zapier, Webhook, and MCP integrations',
			'3 knowledge sources'
		],
		cta: 'Start 14-day free trial',
		badge: 'No credit card',
		featured: 'dark'
	},
	{
		name: 'Basic',
		tagline: 'For solo practitioners',
		monthly: 29,
		annual: 24,
		overage: '$0.45/min overage',
		features: [
			'75 min by phone/month',
			'1 phone number',
			'1 call at a time',
			'Zapier, Webhook, and MCP integrations'
		],
		cta: 'Subscribe',
		badge: null,
		featured: null
	},
	{
		name: 'Plus',
		tagline: 'For growing businesses',
		monthly: 79,
		annual: 66,
		overage: '$0.38/min overage',
		features: [
			'275 min by phone/month',
			'3 phone numbers',
			'Up to 3 calls at once',
			'Zapier, Webhook, and MCP integrations'
		],
		cta: 'Subscribe',
		badge: 'Most popular',
		featured: 'gradient'
	},
	{
		name: 'Premium',
		tagline: 'For busy offices',
		monthly: 199,
		annual: 166,
		overage: '$0.30/min overage',
		features: [
			'1,000 min by phone/month',
			'5 phone numbers',
			'Up to 10 calls at once',
			'Zapier, Webhook, and MCP integrations',
			'Multi-location support'
		],
		cta: 'Subscribe',
		badge: null,
		featured: null
	}
];

export interface Faq {
	q: string;
	a: string;
}

export const FAQS: Faq[] = [
	{
		q: 'What is Pantaa Receptionist?',
		a: 'It\u2019s an AI receptionist that answers your business calls, books appointments, and handles customer questions 24/7. AI receptionists that answer every call \u2014 that\u2019s Pantaa Receptionist, built on Pantaa\u2019s voice AI. It works in English, Spanish, and 70+ more languages.'
	},
	{
		q: 'How long does it take to set up?',
		a: 'Paste your website URL, and Pantaa Receptionist pulls in your services, staff, and hours. You get a phone number, and your agent can start taking calls. The whole thing takes about 5 minutes.'
	},
	{
		q: 'What can it actually do on a call?',
		a: 'Pantaa Receptionist can answer questions about your business, book appointments based on staff availability, reserve spaces or equipment, take messages, and provide info about your services and products.'
	},
	{
		q: 'What countries does it support?',
		a: 'Pantaa Receptionist is now available for businesses globally.'
	},
	{
		q: 'What does it sound like?',
		a: 'It sounds like a real person. Pantaa Receptionist uses natural, human-like voices, so most callers can\u2019t tell they\u2019re speaking with an AI.'
	},
	{
		q: 'How much does it cost?',
		a: 'Plans are tailored to your call volume, locations, and workflow. Talk to sales and we\u2019ll build a plan that fits \u2014 most businesses start with a pilot to see it handle real calls.'
	},
	{
		q: 'Do I get a phone number?',
		a: 'Yes. Pantaa Receptionist assigns you a US phone number during setup. You can forward your existing line to it or give it to customers directly. If you\u2019re based outside the US, there\u2019s some brief additional setup required to connect your phone number.'
	},
	{
		q: 'Is Pantaa Receptionist HIPAA compliant?',
		a: 'Not yet \u2014 HIPAA compliance is on our roadmap. If you handle protected health information, contact us and we\u2019ll advise on the right setup for your practice.'
	},
	{
		q: 'Is Pantaa Receptionist secure?',
		a: 'Pantaa Receptionist is built on the Pantaa platform with enterprise-grade security practices. We comply with applicable data privacy regulations, including CCPA.'
	},
	{
		q: 'Is Pantaa Receptionist a virtual receptionist?',
		a: 'Yes. Pantaa Receptionist works like a virtual receptionist service, but powered by AI instead of a call center. It answers every call instantly, 24/7, with no hold times, no per-minute operator fees, and no monthly receptionist plans that cap out. It books appointments directly into your calendar instead of just taking a message.'
	},
	{
		q: 'Can Pantaa Receptionist replace my answering service?',
		a: 'For most small businesses, yes. Traditional answering services take messages and pass them along. Pantaa Receptionist answers questions, checks your availability, books the appointment, and flags anything urgent, all during the call. You can start with a pilot, running it alongside your current service before switching.'
	}
];
