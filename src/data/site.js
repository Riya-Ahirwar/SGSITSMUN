// Placeholder data. Shape mirrors what will eventually live in MongoDB
// collections (events, committees, secretariat, partners) with Cloudinary
// URLs standing in for `assets/*.png` image paths.

export const event = {
  name: "SGSITS MUN 2026",
  theme: "DIGIT",
  dates: "10 & 11 October 2026",
  targetDate: "2026-10-10T09:00:00+05:30",
  venue: "SGSITS, Indore",
  city: "Indore, Madhya Pradesh",
  email: "sgsitsmun@gmail.com",
  instagram: "https://www.instagram.com/sgsits_mun",
};

export const themePillars = [
  { letter: "D", title: "Democracy", desc: "Representation, consent, and what it means for institutions to actually serve people." },
  { letter: "I", title: "Innovation", desc: "New tools, new problems, new responsibilities — and who gets to decide." },
  { letter: "G", title: "Global", desc: "No challenge that matters stops at a border. Neither should the debate." },
  { letter: "I", title: "Inclusion", desc: "Policy without equity is incomplete. Who sits at the table, and who should." },
  { letter: "T", title: "Technology", desc: "Governing what we build before it governs us — the defining challenge of this decade." },
];

export const committees = [
  {
    name: "Lok Sabha",
    tag: "House of the People",
    type: "Parliamentary",
    desc: "India's lower house of Parliament — where legislation is contested, amended and passed.",
  },
  {
    name: "SOCHUM",
    tag: "Social, Cultural & Humanitarian",
    type: "United Nations",
    desc: "The UN's Third Committee takes on the hardest questions — rights, identity, displacement.",
  },
  {
    name: "DISEC",
    tag: "Disarmament & International Security",
    type: "United Nations",
    desc: "From nuclear arsenals to autonomous weapons systems, DISEC holds the debates that matter most.",
  },
];

export const secretariat = [
  { name: "Surya Pratap Singh", role: "MUN-Coordinator", quote: "Leading the organization with vision and dedication", image: "/assets/placeholder-avatar.png" },
  { name: "Rohan Singhal", role: "Secretary General", quote: "We welcome you to SGSITS MUN 2026!", image: "/assets/placeholder-avatar.png" },
  { name: "Alkesh Rajput", role: "USG-Logistics", quote: "Ensuring everything runs smoothly behind the scenes", image: "/assets/placeholder-avatar.png" },
  { name: "Yashvardhan Patel", role: "USG-Tech Affairs", quote: "The only way to win is to fight!", image: "/assets/placeholder-avatar.png" },
  // Add remaining secretariat members here
];

export const story = {
  intro:
    "SGSITS MUN began as an idea in a classroom — a handful of students who thought Indore deserved a conference that took debate as seriously as the best circuits in the country.",
  paragraphs: [
    "SGSITS — Shri Govindram Seksaria Institute of Technology and Science — has long been home to students who argue for a living outside the classroom. MUN gave that instinct a stage.",
    "DIGIT, this edition's theme, grew out of a simple observation: the biggest fights of this decade — over data, representation, rights and power — don't fit inside old categories. So neither should our committees.",
    "We are not trying to be the biggest conference in the country in year one. We are trying to be the one delegates talk about for the right reasons — sharp chairing, fair judging, and debates that actually go somewhere.",
  ],
};

export const feePackages = [
  {
    name: "Individual Delegate",
    price: "₹1,499",
    features: ["Committee placement", "Delegate kit", "Both conference days", "Certificate of participation"],
  },
  {
    name: "School / College Delegation",
    price: "Contact us",
    features: ["Bulk delegate placements", "Dedicated coordinator", "Group certificate", "Faculty advisor pass"],
  },
  {
    name: "Executive Board",
    price: "Applications only",
    features: ["Chair or Rapporteur role", "EB briefing sessions", "Certificate + letter of recommendation"],
  },
];

export const awardsList = [
  { title: "Best Delegate", desc: "Awarded per committee to the delegate who combined argument, strategy and diplomacy best." },
  { title: "High Commendation", desc: "For delegates who consistently pushed the debate forward across both days." },
  { title: "Special Mention", desc: "Recognising a standout moment, position paper, or piece of crisis resolution." },
  { title: "Best Delegation", desc: "For school/college delegations whose delegates performed strongest as a group." },
];

export const conductPoints = [
  { title: "Respect the chair, respect the room", desc: "Points of order exist for a reason. Personal attacks never do." },
  { title: "Position papers are non-negotiable", desc: "Submitted on time, in your own words, reflecting your country's actual stance." },
  { title: "No plagiarism, no pre-written resolutions", desc: "Draft in committee. We will check." },
  { title: "Formal dress code", desc: "Western formals or Indian formal wear for all committee sessions." },
  { title: "Zero tolerance for harassment", desc: "Any form of harassment — verbal, physical or otherwise — results in immediate disqualification." },
];

export const waysIn = [
  { title: "Register as Delegate", desc: "Three committees, two days. Come ready to argue, negotiate and draft.", status: "Opening soon", href: "#register" },
  { title: "Join the Executive Board", desc: "Chair a committee, shape the agenda and hold the room to account.", status: "Applications open", href: "#" },
  { title: "Volunteer with the Team", desc: "Behind every good conference is a team that makes it invisible.", status: "Applications open", href: "#" },
  { title: "Partner or Sponsor", desc: "Brands, institutions and organisations — one conversation covers all of it.", status: "Enquire now", href: "#contact" },
];
