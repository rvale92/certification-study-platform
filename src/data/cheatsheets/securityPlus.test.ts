import { securityPlusCheatSheet as sheet } from './securityPlus';

const cards = () => [...sheet.domains.flatMap((d) => d.cards), ...sheet.decisionCards, ...sheet.limits, ...sheet.strategies];

describe('CompTIA Security+ SY0-701 cheat sheet data', () => {
  it('provides the five official domains with CompTIA weights and substantial coverage', () => {
    expect(sheet.id).toBe('security-plus');
    expect(sheet.certificationId).toBe('security-plus');
    expect(sheet.examCode).toBe('SY0-701');
    expect(sheet.lastReviewed).toBe('2026-11-19');
    expect(sheet.domains.map((d) => d.weight)).toEqual([12, 22, 18, 28, 20]);
    expect(sheet.domains.reduce((n: number, d) => n + (d.weight ?? 0), 0)).toBe(100);
    sheet.domains.forEach((d) => expect(d.cards.length).toBeGreaterThanOrEqual(5));
    expect(sheet.decisionCards.length).toBeGreaterThanOrEqual(6);
    expect(sheet.limits.length).toBeGreaterThanOrEqual(6);
    expect(sheet.strategies.length).toBeGreaterThanOrEqual(3);
  });

  it('has unique IDs, plain-English cards, and resolvable CompTIA sources', () => {
    const ids = [...sheet.domains.map((d) => d.id), ...cards().map((c) => c.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const sources = new Set(sheet.sources.map((s) => s.id));
    expect(sources.size).toBe(sheet.sources.length);
    sheet.sources.forEach((s) => {
      expect(s.label.length).toBeGreaterThan(5);
      expect(new URL(s.url).hostname).toMatch(/(^|\.)comptia\.org$/);
    });
    cards().forEach((c) => {
      expect(c.summary.length).toBeGreaterThan(20);
      expect(c.analogy).toBeTruthy();
      expect(c.bullets.length).toBeGreaterThanOrEqual(c.comparisons?.length ? 1 : 2);
      expect(c.examTip).toBeTruthy();
      expect(c.tags.length).toBeGreaterThan(0);
      expect(c.sourceIds.length).toBeGreaterThan(0);
      c.sourceIds.forEach((id) => expect(sources.has(id)).toBe(true));
    });
  });

  it('covers required security domains, controls, threats, and operations topics', () => {
    const text = JSON.stringify(sheet);
    ['zero trust', 'CIA', 'AAA', 'non-repudiation', 'preventive', 'detective', 'corrective', 'compensating', 'nation-state', 'hacktivist', 'Insider threat', 'ransomware', 'SQL', 'XSS', 'DoS', 'MITM', 'ICS', 'SCADA', 'shared responsibility', 'DLP', 'IDS', 'IPS', 'SIEM', 'SOAR', 'EDR', 'XDR', 'MFA', 'SSO', 'PAM', 'incident response', 'containment', 'eradication', 'forensics', 'governance', 'risk register', 'third-party', 'GDPR', 'HIPAA', 'PCI DSS', 'penetration', 'phishing'].forEach((term) => expect(text).toContain(term));
  });

  it('keeps exam numbers accurate and states the official passing score', () => {
    const text = JSON.stringify(sheet);
    expect(text).toContain('750');
    expect(text).toContain('100-900');
    expect(text).toContain('90 minutes');
    expect(text).toContain('3 years');
    expect(text).toContain('50 CEUs');
    expect(text).toContain('0.0-10.0');
    expect(text).not.toMatch(/guarantee.{0,15}pass/i);
  });
});
