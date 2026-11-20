import { jnciaCheatSheet as sheet } from './jncia';

const cards = () => [...sheet.domains.flatMap((d) => d.cards), ...sheet.decisionCards, ...sheet.limits, ...sheet.strategies];

describe('JNCIA-Junos JN0-106 cheat sheet data', () => {
  it('provides the seven objective areas with substantial coverage', () => {
    expect(sheet.id).toBe('jncia');
    expect(sheet.certificationId).toBe('jncia');
    expect(sheet.examCode).toBe('JN0-106');
    expect(sheet.lastReviewed).toBe('2026-11-19');
    expect(sheet.domains).toHaveLength(7);
    sheet.domains.forEach((d) => expect(d.cards.length).toBeGreaterThanOrEqual(3));
    expect(sheet.domains.flatMap((d) => d.cards).length).toBeGreaterThanOrEqual(25);
    expect(sheet.decisionCards.length).toBeGreaterThanOrEqual(7);
    expect(sheet.limits.length).toBeGreaterThanOrEqual(5);
    expect(sheet.strategies.length).toBeGreaterThanOrEqual(3);
  });

  it('has unique IDs, plain-English cards, and resolvable Juniper sources', () => {
    const ids = [...sheet.domains.map((d) => d.id), ...cards().map((c) => c.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const sources = new Set(sheet.sources.map((s) => s.id));
    expect(sources.size).toBe(sheet.sources.length);
    sheet.sources.forEach((s) => {
      expect(s.label.length).toBeGreaterThan(5);
      expect(new URL(s.url).hostname).toMatch(/(^|\.)juniper\.net$/);
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

  it('covers required Junos architecture, CLI, routing, and policy topics', () => {
    const text = JSON.stringify(sheet);
    ['Routing Engine', 'Packet Forwarding Engine', 'control plane', 'forwarding plane', 'commit check', 'commit confirmed', 'rollback', 'rescue', 'inet.0', 'inet.3', 'inet6.0', 'forwarding-table', 'route preference', 'routing instance', 'firewall filter', 'unicast RPF', 'mgd', 'rpd', 'candidate', 'active configuration'].forEach((term) => expect(text).toContain(term));
    expect(text).toContain('BGP 170');
    expect(text).toContain('Static 5');
  });

  it('keeps exam numbers accurate and honestly labels the unpublished passing score', () => {
    const text = JSON.stringify(sheet);
    expect(text).toContain('65 multiple-choice');
    expect(text).toContain('90 minutes');
    expect(text).toContain('60-70%');
    expect(text).toContain('does not publish');
    expect(text).toContain('3 years');
    expect(text).toContain('14-day');
    expect(text).not.toMatch(/guarantee.{0,15}pass/i);
  });
});
