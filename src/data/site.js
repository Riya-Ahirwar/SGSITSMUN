// Placeholder data. Shape mirrors what will eventually live in MongoDB
// collections (events, committees, secretariat, partners) with Cloudinary
// URLs standing in for `assets/*.png` image paths.

export const event = {
  name: "SGSITS MUN 2026",
  theme: "DIGIT",
  dates: "10 & 11 October 2026",
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
  { name: "Rohan Singhal", role: "Secretary General", quote: "We welcome you to SGSITS MUN 2026!", image: "/assets/placeholder-avatar.png" },
  { name: "Anya Agrawal", role: "Deputy Secretary General", quote: "Together, we will make this event a success.", image: "/assets/placeholder-avatar.png" },
  // Add remaining secretariat members here
];

export const waysIn = [
  { title: "Register as Delegate", desc: "Three committees, two days. Come ready to argue, negotiate and draft.", status: "Opening soon", href: "#register" },
  { title: "Join the Executive Board", desc: "Chair a committee, shape the agenda and hold the room to account.", status: "Applications open", href: "#" },
  { title: "Volunteer with the Team", desc: "Behind every good conference is a team that makes it invisible.", status: "Applications open", href: "#" },
  { title: "Partner or Sponsor", desc: "Brands, institutions and organisations — one conversation covers all of it.", status: "Enquire now", href: "#contact" },
];
