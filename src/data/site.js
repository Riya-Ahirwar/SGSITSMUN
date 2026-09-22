// Placeholder data. Shape mirrors what will eventually live in MongoDB
// collections (events, committees, secretariat, partners) with Cloudinary
// URLs standing in for `assets/*.png` image paths.

export const event = {
  name: "SGSITS MUN 2026",
  theme: "PRISM",
  dates: "10 & 11 October 2026",
  targetDate: "2026-10-10T09:00:00+05:30",
  venue: "SGSITS, Indore",
  city: "Indore, Madhya Pradesh",
  email: "sgsitsmun@gmail.com",
  instagram: "https://www.instagram.com/sgsits_mun",
};

export const themePillars = [
  {
    letter: "P",
    title: "PEACE",
    desc: "The pursuit of stability in a world shaped by competing interests, uncertainty and conflict.",
  },
  {
    letter: "R",
    title: "RIGHTS",
    desc: "The principles that define dignity, equality and the freedoms every society must confront.",
  },
  {
    letter: "I",
    title: "INTEGRITY",
    desc: "The responsibility to uphold justice, accountability and institutions when they are tested.",
  },
  {
    letter: "S",
    title: "STATECRAFT",
    desc: "The art of turning competing interests, public voices and difficult choices into collective decisions.",
  },
  {
    letter: "M",
    title: "MORALITY",
    desc: "The questions that emerge when duty, loyalty, ambition and consequence stand on opposite sides.",
  },
];

export const committees = [
  {
    num: "01",
    name: "LOK SABHA",
    tag: "The House of the People",
    desc: "A forum where competing visions of governance meet. Debate, negotiate and legislate as elected representatives navigating the complexities of a living democracy.",
    question: "What should a democracy demand of those who govern it?",
  },
  {
    num: "02",
    name: "MAHABHARATA",
    tag: "An Epic of Power, Duty & Consequence",
    desc: "Step into an age where alliances shift, loyalties are tested and every decision carries a consequence. Navigate the politics, dilemmas and conflicts that precede the great war of Kurukshetra.",
    question: "When duty and morality collide, which path do you choose?",
  },
  {
    num: "03",
    name: "UNHRC",
    tag: "United Nations Human Rights Council",
    desc: "A forum dedicated to the protection of human dignity and fundamental freedoms, where nations confront violations, negotiate solutions and debate the responsibilities of the international community.",
    question: "Who protects rights when the world disagrees on what justice requires?",
  },
  {
    num: "04",
    name: "DISEC",
    tag: "Disarmament & International Security Committee",
    desc: "The arena of international security, where nations confront questions of disarmament, military technology, weapons proliferation and the delicate pursuit of peace.",
    question: "How do nations pursue security without making conflict inevitable?",
  },
  {
    num: "05",
    name: "UNODC",
    tag: "United Nations Office on Drugs & Crime",
    desc: "A forum confronting the challenges that cross borders—from organized crime and illicit trafficking to corruption and international criminal justice.",
    question: "How does the world fight problems that know no borders?",
  },
];

export const secretariat = [
  { name: "Surya Pratap Singh", role: "MUN-Coordinator", quote: "Leading the organization with vision and dedication", image: "/assets/Surya.jpg" },
  { name: "Alkesh Rajput", role: "USG-Logistics", quote: "Ensuring everything runs smoothly behind the scenes", image: "/assets/Alkesh.jpg" },
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
