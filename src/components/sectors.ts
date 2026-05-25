export interface MockupSection {
  type: 'menu' | 'services' | 'horaires' | 'gallery' | 'avis' | 'contact' | 'planning' | 'tarifs' | 'realisations' | 'process' | 'praticiens';
  title: string;
  items: string[];
}

export interface Sector {
  id: 'restauration' | 'studio' | 'atelier' | 'cabinet';
  businessName: string;
  url: string;
  accent: string;
  tagline: string;
  cta: string;
  heroImage: string;
  sections: [MockupSection, MockupSection, MockupSection];
}

export const sectors: Sector[] = [
  {
    id: 'restauration',
    businessName: "Table d'Hugo",
    url: 'tabledhugo.fr',
    accent: '#dc2626',
    tagline: 'Cuisine de saison, à l\'ardoise',
    cta: 'Réserver une table',
    heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=320&fit=crop&q=70',
    sections: [
      {
        type: 'menu',
        title: 'Menu de la semaine',
        items: ['Velouté de potimarron', 'Magret de canard au miel', 'Risotto crémeux aux cèpes', 'Tarte tatin maison'],
      },
      {
        type: 'horaires',
        title: 'Horaires',
        items: ['Mardi - Vendredi : 12h - 14h, 19h - 22h', 'Samedi : 19h - 23h', 'Dimanche : 12h - 15h', 'Fermé le lundi'],
      },
      {
        type: 'avis',
        title: 'Avis clients',
        items: ['"Une cuisine fine et inventive." — Marie L.', '"Cadre intime, service attentif." — Paul B.', '"Le risotto, une tuerie !" — Léa M.'],
      },
    ],
  },
  {
    id: 'studio',
    businessName: 'Studio Lumen',
    url: 'studio-lumen.fr',
    accent: '#10b981',
    tagline: 'Yoga, pilates, méditation',
    cta: 'Réserver un cours',
    heroImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=320&fit=crop&q=70',
    sections: [
      {
        type: 'services',
        title: 'Disciplines proposées',
        items: ['Hatha Yoga · doux et accessible', 'Vinyasa · dynamique et fluide', 'Pilates · gainage et posture', 'Méditation pleine conscience'],
      },
      {
        type: 'planning',
        title: 'Planning hebdo',
        items: ['Lundi 18h30 : Hatha débutant', 'Mercredi 12h15 : Pilates express', 'Vendredi 19h : Vinyasa avancé', 'Samedi 10h : Méditation guidée'],
      },
      {
        type: 'tarifs',
        title: 'Formules',
        items: ['Cours unique : 18 €', 'Carte 10 cours : 150 €', 'Abonnement mensuel : 75 €'],
      },
    ],
  },
  {
    id: 'atelier',
    businessName: 'Atelier Voltige',
    url: 'atelier-voltige.fr',
    accent: '#ea580c',
    tagline: 'Menuiserie sur-mesure',
    cta: 'Demander un devis',
    heroImage: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&h=320&fit=crop&q=70',
    sections: [
      {
        type: 'realisations',
        title: 'Nos réalisations',
        items: ['Cuisines équipées sur-mesure', 'Bibliothèques intégrées', 'Escaliers bois massif', 'Mobilier signature artisan'],
      },
      {
        type: 'process',
        title: 'Notre approche',
        items: ['1 · Rendez-vous chez vous, écoute', '2 · Plans 3D + devis détaillé', '3 · Fabrication atelier + pose'],
      },
      {
        type: 'contact',
        title: 'Atelier & contact',
        items: ['12 rue des Artisans, 95110 Sannois', '01 39 80 XX XX', 'contact@atelier-voltige.fr'],
      },
    ],
  },
  {
    id: 'cabinet',
    businessName: 'Cabinet Solane',
    url: 'cabinet-solane.fr',
    accent: '#1e3a8a',
    tagline: 'Kiné & ostéopathie',
    cta: 'Prendre rendez-vous',
    heroImage: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=320&fit=crop&q=70',
    sections: [
      {
        type: 'services',
        title: 'Prestations',
        items: ['Kinésithérapie post-opératoire', 'Ostéopathie adulte et enfant', 'Rééducation sportive', 'Drainage lymphatique'],
      },
      {
        type: 'horaires',
        title: 'Horaires cabinet',
        items: ['Lundi - Vendredi : 8h - 19h', 'Samedi : 9h - 13h', 'Dimanche : fermé', 'Urgences : ligne directe'],
      },
      {
        type: 'praticiens',
        title: 'Équipe',
        items: ['Dr. Élise Solane · Kiné DE', 'Marc Pellegrin · Ostéopathe DO', 'Anaïs Voinet · Kiné sportif'],
      },
    ],
  },
];
