export type Formation = {
  slug: string;
  title: string;
  short: string;
  duration: string;
  icon: string;
};

export const formations: Formation[] = [
  { slug: "secretariat-bureautique", title: "Secrétariat & Bureautique", short: "Maîtrisez Word, Excel, PowerPoint et les techniques de secrétariat moderne.", duration: "3 mois", icon: "📋" },
  { slug: "developpement-web-mobile", title: "Développement Web & Mobile", short: "Devenez développeur full-stack : HTML, CSS, JavaScript, React, Node.js.", duration: "9 mois", icon: "💻" },
  { slug: "maintenance-informatique", title: "Maintenance Informatique", short: "Diagnostiquez, réparez et entretenez ordinateurs et périphériques.", duration: "6 mois", icon: "🔧" },
  { slug: "reseau-informatique", title: "Réseau Informatique", short: "Configuration, administration et sécurité des réseaux d'entreprise.", duration: "6 mois", icon: "🌐" },
  { slug: "community-manager", title: "Community Manager", short: "Stratégie social media, création de contenu et gestion de communauté.", duration: "4 mois", icon: "📱" },
  { slug: "graphisme-video", title: "Graphisme & Vidéo", short: "Photoshop, Illustrator, Premiere Pro — créez des visuels qui marquent.", duration: "5 mois", icon: "🎨" },
  { slug: "prise-de-parole", title: "Prise de Parole en Public", short: "Confiance, éloquence et leadership pour convaincre votre audience.", duration: "1 mois", icon: "🎤" },
];
