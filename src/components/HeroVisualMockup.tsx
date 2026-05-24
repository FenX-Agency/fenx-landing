import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { sectors, type Sector } from './sectors';

const SECTOR_DURATION_MS = 7500;

const STAGGER = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.35, delayChildren: 0.1 },
  },
};

const HEADER_VARIANT = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const HERO_VARIANT = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const SECTION_VARIANT = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

const FOOTER_VARIANT = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
};

function MockupHeader({ sector }: { sector: Sector }) {
  return (
    <motion.div className="mockup-site-header" variants={HEADER_VARIANT}>
      <span className="mockup-site-logo" style={{ color: sector.accent }}>
        {sector.businessName}
      </span>
      <nav className="mockup-site-nav">
        <span>Accueil</span>
        <span>Services</span>
        <span>Contact</span>
      </nav>
    </motion.div>
  );
}

function MockupHero({ sector }: { sector: Sector }) {
  return (
    <motion.div className="mockup-site-hero" variants={HERO_VARIANT}>
      <h2 className="mockup-site-tagline">{sector.tagline}</h2>
      <button className="mockup-site-cta" style={{ background: sector.accent }} type="button">
        {sector.cta}
      </button>
    </motion.div>
  );
}

function MockupSection({ section }: { section: Sector['sections'][number] }) {
  return (
    <motion.div className="mockup-site-section" variants={SECTION_VARIANT}>
      <h3 className="mockup-site-section-title">{section.title}</h3>
      <ul className="mockup-site-section-items">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

function MockupFooter({ sector }: { sector: Sector }) {
  return (
    <motion.div className="mockup-site-footer" variants={FOOTER_VARIANT}>
      <span>© 2026 {sector.businessName}</span>
      <span>Mentions légales</span>
    </motion.div>
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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion || !hasMounted) return;
    const timer = setTimeout(() => {
      setActiveSector((prev) => (prev + 1) % sectors.length);
    }, SECTOR_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeSector, isPaused, reducedMotion, hasMounted]);

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
        {reducedMotion || !hasMounted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
            <div className="mockup-site-hero">
              <h2 className="mockup-site-tagline">{sector.tagline}</h2>
              <button className="mockup-site-cta" style={{ background: sector.accent }} type="button">
                {sector.cta}
              </button>
            </div>
            {sector.sections.map((section) => (
              <div key={section.type} className="mockup-site-section">
                <h3 className="mockup-site-section-title">{section.title}</h3>
                <ul className="mockup-site-section-items">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mockup-site-footer">
              <span>© 2026 {sector.businessName}</span>
              <span>Mentions légales</span>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={sector.id}
              variants={STAGGER}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <MockupHeader sector={sector} />
              <MockupHero sector={sector} />
              {sector.sections.map((section) => (
                <MockupSection key={section.type} section={section} />
              ))}
              <MockupFooter sector={sector} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <SectorTabs active={activeSector} onSelect={setActiveSector} />
    </div>
  );
}
