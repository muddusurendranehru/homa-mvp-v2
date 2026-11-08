/** One line per doctor photo — `image`, `name`, `caption`, optional `badge` and `imageFocus`. */
export type DoctorPeer = {
  image: string;
  name: string;
  caption: string;
  badge?: string;
  imageFocus?: "top" | "center";
};

export const DOCTOR_PEERS: DoctorPeer[] = [
  {
    image: "/images/celebrities/celebrity-kurnool-medical-college-friend.webp",
    name: "Dr. Murali Angirekula, MD",
    caption: "Florida, USA · HOMA subscriber",
    badge: "🌍 International",
  },
  {
    image: "/images/celebrities/celebrity-evening-gathering-trio.webp",
    name: "Dr. Rajendra Kumar, MD, DM (Cardiology)",
    caption: "KIMS Hospital, Hyderabad · with his wife",
    badge: "❤️ Cardiology",
  },
  {
    image: "/images/celebrities/celebrity-dr-bhandari-srinivas-adoni.webp",
    name: "Dr. Bhandari Srinivas, MD",
    caption: "Physician, Adoni",
    badge: "🩺 Physician",
  },
  {
    image: "/images/celebrities/celebrity-dr-bharath-patodia-oncologist.webp",
    name: "Dr. Bharath Patodia",
    caption: "Oncologist · T-Hub, Hyderabad",
    badge: "🔬 Oncology",
  },
  {
    image: "/images/celebrities/celebrity-mamatha-medical-college-faculty.webp",
    name: "Mamatha Medical College Faculty",
    caption: "Teaching session with faculty and residents",
    badge: "🏥 Medical College",
    imageFocus: "center",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786810254/IMG20250319132952_zvvpfg.jpg",
    name: "Medical College Colleagues",
    caption: "Teaching hospitals across Telangana",
    badge: "🏥 Medical College",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786810309/IMG20250328192515_okaory.jpg",
    name: "International Physician Network",
    caption: "Colleagues abroad who follow HOMA protocols",
    badge: "🌍 International",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786810647/IMG20250222194655_msfeeh.jpg",
    name: "Medical Peers",
    caption: "Specialists in metabolic medicine",
    badge: "🤝 Medical Peers",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786809817/tsapicon1_y7f5fw.jpg",
    name: "Clinical Book Launch",
    caption: "Peer review at book inauguration",
    badge: "📖 Book Inauguration",
  },
  {
    image:
      "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786844904/IMG_20230612_132006_t6s4sm.jpg",
    name: "Women Physicians",
    caption: "Lady doctors advancing metabolic care",
    badge: "👩‍⚕️ Lady Doctors",
  },
];
