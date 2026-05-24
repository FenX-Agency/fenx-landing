import { useEffect, useState } from 'react';
import { sectors, type Sector } from './sectors';

const SECTOR_DURATION_MS = 7500;

function MockupSiteHeader({ sector }: { sector: Sector }) {
  return (
    <div className="mockup-site-header">
      <span className="mockup-site-logo" style={{ color: sector.accent }}>
        {sector.businessName}
      </span>
      <nav className="mockup-site-nav">
        <span>Accueil</span>
        <span>Services</span>
        <span>Contact</span>
      </nav>
    </div>
  );
}

function MockupSiteHero({ sector }: { sector: Sector }) {
  return (
    <div
      className="mockup-site-hero"
      style={{ backgroundImage: `url(${sector.heroImage})` }}
    >
      <div className="mockup-site-hero-overlay" />
      <div className="mockup-site-hero-inner">
        <h2 className="mockup-site-tagline">{sector.tagline}</h2>
        <button className="mockup-site-cta" style={{ background: sector.accent }} type="button">
          {sector.cta}
        </button>
      </div>
    </div>
  );
}

function MockupSiteSection({ section }: { section: Sector['sections'][number] }) {
  return (
    <div className="mockup-site-section">
      <h3 className="mockup-site-section-title">{section.title}</h3>
      <ul className="mockup-site-section-items">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MockupSiteFooter({ sector }: { sector: Sector }) {
  return (
    <div className="mockup-site-footer">
      <span>© 2026 {sector.businessName}</span>
      <span>Mentions légales</span>
    </div>
  );
}

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="mockup-chrome">
      <div className="mockup-dots">
        <span className="mockup-dot mockup-dot-red" />
        <span className="mockup-dot mockup-dot-yellow" />
        <span className="mockup-dot mockup-dot-green" />
      </div>
      <div className="mockup-url-bar">
        <span className="mockup-url-protocol">https://</span>
        <span className="mockup-url-host">{url}</span>
      </div>
    </div>
  );
}

function SectorTabs({ active, onSelect }: { active: number; onSelect: (idx: number) => void }) {
  return (
    <div className="mockup-tabs">
      {sectors.map((s, idx) => (
        <button
          key={s.id}
          aria-pressed={idx === active}
          className={`mockup-tab ${idx === active ? 'is-active' : ''}`}
          onClick={() => onSelect(idx)}
          type="button"
        >
          {s.id}
        </button>
      ))}
    </div>
  );
}

export default function HeroVisualMockup() {
  const [activeSector, setActiveSector] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setTimeout(() => {
      setActiveSector((prev) => (prev + 1) % sectors.length);
    }, SECTOR_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeSector, isPaused, reducedMotion]);

  const sector = sectors[activeSector];

  return (
    <div
      className="mockup-frame"
      aria-hidden="true"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <BrowserChrome url={sector.url} />
      <div className="mockup-content">
        <div key={sector.id} className="mockup-site mockup-site-fade-in">
          <MockupSiteHeader sector={sector} />
          <MockupSiteHero sector={sector} />
          {sector.sections.map((section) => (
            <MockupSiteSection key={section.type} section={section} />
          ))}
          <MockupSiteFooter sector={sector} />
        </div>
      </div>
      <SectorTabs active={activeSector} onSelect={setActiveSector} />
    </div>
  );
}
