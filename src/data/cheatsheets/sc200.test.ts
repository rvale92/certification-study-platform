import { sc200CheatSheet as sheet } from './sc200';

const cards = () => [...sheet.domains.flatMap((d) => d.cards), ...sheet.decisionCards, ...sheet.limits, ...sheet.strategies];

describe('Microsoft SC-200 cheat sheet data', () => {
  it('provides the three skill areas with Microsoft range weights and substantial coverage', () => {
    expect(sheet.id).toBe('sc-200');
    expect(sheet.certificationId).toBe('sc-200');
    expect(sheet.examCode).toBe('SC-200');
    expect(sheet.lastReviewed).toBe('2026-11-19');
    expect(sheet.domains.map((d) => d.weightLabel)).toEqual(['40–45%', '35–40%', '20–25%']);
    expect(sheet.domains.every((d) => d.weight === undefined)).toBe(true);
    sheet.domains.forEach((d) => expect(d.cards.length).toBeGreaterThanOrEqual(6));
    expect(sheet.decisionCards.length).toBeGreaterThanOrEqual(6);
    expect(sheet.limits.length).toBeGreaterThanOrEqual(5);
    expect(sheet.strategies.length).toBeGreaterThanOrEqual(3);
  });

  it('has unique IDs, plain-English cards, and resolvable Microsoft sources', () => {
    const ids = [...sheet.domains.map((d) => d.id), ...cards().map((c) => c.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const sources = new Set(sheet.sources.map((s) => s.id));
    expect(sources.size).toBe(sheet.sources.length);
    sheet.sources.forEach((s) => {
      expect(s.label.length).toBeGreaterThan(5);
      expect(new URL(s.url).hostname).toMatch(/(^|\.)microsoft\.com$/);
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

  it('covers Sentinel, Defender XDR/Endpoint, and hunting topics', () => {
    const text = JSON.stringify(sheet);
    ['Sentinel', 'connectors', 'analytics rule', 'automation rule', 'playbook', 'Logic Apps', 'retention', 'Data lake', 'SOC optimization', 'ASR', 'attack disruption', 'live response', 'device timeline', 'Entra', 'Purview', 'Security Copilot', 'agentic', 'lateral movement', 'KQL', 'Advanced Hunting', 'threat analytics', 'blast radius', 'Notebooks', 'MCP Server', 'MITRE ATT&CK', 'custom detection rule', 'summary rule'].forEach((term) => expect(text).toContain(term));
  });

  it('keeps exam numbers accurate and labels unofficial question count', () => {
    const text = JSON.stringify(sheet);
    expect(text).toContain('700');
    expect(text).toContain('1-1000');
    expect(text).toContain('100 minutes');
    expect(text).toContain('40–45%');
    expect(text).toContain('20–25%');
    expect(text).toContain('14 days');
    expect(text).toContain('scaled');
    expect(text).not.toMatch(/guarantee.{0,15}pass/i);
  });
});
