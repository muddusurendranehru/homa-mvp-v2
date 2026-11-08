/** One line per photo — add `image`, `name`, and `caption` for new entries. */
export type CelebrityRecognition = {
  image: string;
  name: string;
  caption: string;
  /** Default `top` (portraits). Use `center` for landscape photos. */
  imageFocus?: "top" | "center";
};

export const CELEBRITY_RECOGNITION: CelebrityRecognition[] = [
  {
    image: "/images/dr-muddu-chiranjeevi-new.jpg",
    name: "Megastar Chiranjeevi",
    caption: "Actor · Philanthropist · Padma Vibhushan · 150M fans",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_700,h_500,c_fill,g_face/v1786844071/IMG20241027085019_mh5w0m.jpg",
    name: "Chiranjeevi Blood Bank",
    caption:
      "Dr. Muddu invited to Chiranjeevi Blood Bank initiative — recognition of trust and shared service mission",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_400,h_560,c_fill,g_face/v1773572168/snhc9z3jadq0ex3empoq.jpg",
    name: "Rajendra Prasad",
    caption: "National Award Winning Telugu Actor · Padma Shri",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_400,h_560,c_fill,g_face/v1786811555/IMG20250620132710_nuprlk.jpg",
    name: "V6 Ravi Sir",
    caption: "Senior Media Celebrity · V6 News Channel",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_450,c_fill,g_face/v1786783988/minsridharsirbook4_y4zoov.jpg",
    name: "Hon. Minister Sridhar Babu",
    caption: "IT, Electronics & Commerce — Govt. of Telangana",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_450,c_fill,g_face/v1786810654/IMG20250315083245_np6k3n.jpg",
    name: "Appreciation Ceremony",
    caption: "Recognition by Telangana IT Ministry",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_450,c_fill,g_face/v1786810449/IMG20250313090259_01_jpiynp.jpg",
    name: "Sri Gandhi MLA",
    caption: "Sherlingampally — Appreciation for Community Service",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_450,c_fill,g_face/v1786810865/IMG20240712181743_kyfph4.jpg",
    name: "State Leadership Meeting",
    caption: "With MLA Sri Raj Thakur Makkan Singh & IT Minister",
  },
  {
    image: "/images/celebrities/celebrity-doctors-excellence-awards-2024.webp",
    name: "JD Lakshmi Narayana, IPS (Retd.)",
    caption: "With Dr. Muddu · Navanaami Doctors Excellence Awards 2024",
  },
  {
    image: "/images/celebrities/celebrity-evening-gathering-trio.webp",
    name: "Dr. Rajendra Kumar, MD, DM (Cardiology)",
    caption: "KIMS Hospital, Hyderabad · with his wife",
  },
  {
    image: "/images/celebrities/celebrity-dr-muddu-evening.webp",
    name: "Dr. Muddu Surendra Nehru, MD",
    caption: "",
  },
  {
    image: "/images/celebrities/celebrity-community-event-police.webp",
    name: "",
    caption: "Community event with Telangana Police",
  },
  {
    image: "/images/celebrities/celebrity-kurnool-medical-college-friend.webp",
    name: "Dr. Murali Angirekula, MD",
    caption: "Florida, USA · HOMA subscriber",
  },
  {
    image: "/images/celebrities/awareness-children-republic-day.webp",
    name: "Childhood Obesity Awareness",
    caption: "Republic Day programme — teaching children healthy habits early",
    imageFocus: "center",
  },
  {
    image: "/images/celebrities/celebrity-dr-bhandari-srinivas-adoni.webp",
    name: "Dr. Bhandari Srinivas, MD",
    caption: "Physician, Adoni",
  },
  {
    image: "/images/celebrities/celebrity-mla-sri-gandhi-glycemic-guardians.webp",
    name: "Sri Gandhi, MLA Serilingampally",
    caption: "Receiving the Glycemic Guardians Conclave book",
  },
  {
    image: "/images/celebrities/celebrity-mamatha-medical-college-faculty.webp",
    name: "Mamatha Medical College Faculty",
    caption: "Teaching session with faculty and residents",
    imageFocus: "center",
  },
  {
    image: "/images/celebrities/celebrity-dr-bharath-patodia-oncologist.webp",
    name: "Dr. Bharath Patodia",
    caption: "Oncologist · T-Hub, Hyderabad",
  },
];
