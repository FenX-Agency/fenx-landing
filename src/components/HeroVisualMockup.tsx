import { useState } from 'react';
import { sectors, type Sector } from './sectors';

function MockupHeader({ sector }: { sector: Sector }) {
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

function MockupHero({ sector }: { sector: Sector }) {
  return (
    <div className="mockup-site-hero">
      <h2 className="mockup-site-tagline">{sector.tagline}</h2>
      <button className="mockup-site-cta" style={{ background: sector.accent }}>
        {sector.cta}
      </button>
    </div>
  );
}

function MockupSection({ section }: { section: Sector['sections'][number] }) {
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

function MockupFooter({ sector }: { sector: Sector }) {
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
    <div className="mockup-tabs" role="tablist">
      {sectors.map((s, idx) => (
        <button
          key={s.id}
          role="tab"
          aria-selected={idx === active}
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
  const [activeSector] = useState(0);
  const sector = sectors[activeSector];

  return (
    <div className="mockup-frame">
      <BrowserChrome url={sector.url} />
      <div className="mockup-content">
        <MockupHeader sector={sector} />
        <MockupHero sector={sector} />
        {sector.sections.map((section) => (
          <MockupSection key={section.type} section={section} />
        ))}
        <MockupFooter sector={sector} />
      </div>
      <SectorTabs active={activeSector} onSelect={() => {}} />
    </div>
  );
}
