export type PartnerType = "doctor" | "lab" | "pharmacy";

export type Partner = {
  id: string;
  type: PartnerType;
  name: string;
  clinic?: string;
  area: string;
  state: string;
  phone: string;
  mapsUrl: string;
  photoSrc?: string;
};

// Add real, CONSENTED partners here (no DB). Only list people who agreed to public name+phone+map.
// Ask each partner for their Google Maps business link, not a raw pin.
export const PARTNERS: Partner[] = [
  {
    id: "kokila",
    type: "doctor",
    name: "Dr. Kokila",
    area: "Bargur",
    state: "Tamil Nadu",
    phone: "9345422147",
    mapsUrl: "https://www.google.com/maps?q=12.5401944,78.3558333",
  },
];
