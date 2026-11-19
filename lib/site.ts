// Business details shown across the public site. Change here, not in components.
export const site = {
  name: "Punny Crafts",
  tagline: "Punny gifts, proudly Kenyan",
  // International format without "+" for wa.me links. Taken from the current Odoo site.
  whatsapp: "254708675086",
  phoneDisplay: "+254 708 675 086",
  // Used for canonical and social tags once the domain is bought.
  url: "https://punnycrafts.example",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function ksh(n: number) {
  return "KSh " + n.toLocaleString("en-KE");
}
