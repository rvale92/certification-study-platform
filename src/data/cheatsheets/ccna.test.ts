import { ccnaCheatSheet as sheet } from './ccna';

const cards = () => [...sheet.domains.flatMap((d) => d.cards), ...sheet.decisionCards, ...sheet.limits, ...sheet.strategies];

describe('CCNA 200-301 cheat sheet data', () => {
  it('provides the five-domain v2.0 outline with Cisco weights and substantial coverage', () => {
    expect(sheet.id).toBe('ccna');
    expect(sheet.certificationId).toBe('ccna');
    expect(sheet.examCode).toBe('200-301');
    expect(sheet.lastReviewed).toBe('2026-11-19');
    expect(sheet.domains.map((d) => d.weight)).toEqual([25, 25, 20, 20, 10]);
    expect(sheet.domains.reduce((n: number, d) => n + (d.weight ?? 0), 0)).toBe(100);
    sheet.domains.forEach((d) => expect(d.cards.length).toBeGreaterThanOrEqual(5));
    expect(sheet.decisionCards.length).toBeGreaterThanOrEqual(7);
    expect(sheet.limits.length).toBeGreaterThanOrEqual(7);
    expect(sheet.strategies.length).toBeGreaterThanOrEqual(3);
  });

  it('has unique IDs, plain-English cards, and resolvable Cisco sources', () => {
    const ids = [...sheet.domains.map((d) => d.id), ...cards().map((c) => c.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const sources = new Set(sheet.sources.map((s) => s.id));
    expect(sources.size).toBe(sheet.sources.length);
    sheet.sources.forEach((s) => {
      expect(s.label.length).toBeGreaterThan(5);
      expect(new URL(s.url).hostname).toMatch(/(^|\.)cisco\.com$/);
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

  it('covers required switching, routing, services, security, and automation topics', () => {
    const text = JSON.stringify(sheet);
    ['VLAN', '802.1Q', 'LACP', 'EtherChannel', 'Rapid PVST+', 'PortFast', 'BPDU guard', 'root guard', 'loop guard', 'longest prefix match', 'administrative distance', 'floating static', 'OSPFv2', 'DR', 'BDR', 'NAT', 'PAT', 'DHCP snooping', 'DAI', 'port security', 'TACACS+', 'RADIUS', 'IPsec', 'Ansible', 'Terraform', 'REST', 'JSON', 'SDN', 'northbound', 'southbound', 'AI'].forEach((term) => expect(text).toContain(term));
  });

  it('keeps exam numbers accurate and labels unofficial figures', () => {
    const text = JSON.stringify(sheet);
    expect(text).toContain('120 minutes');
    expect(text).toContain('825/1000');
    expect(text).toContain('does not publish');
    expect(text).toContain('1006-4094');
    expect(text).toContain('10.0.0.0/8');
    expect(text).toContain('172.16.0.0/12');
    expect(text).toContain('192.168.0.0/16');
    expect(text).toContain('severity 0');
    expect(text).not.toMatch(/guarantee.{0,15}pass/i);
  });
});
