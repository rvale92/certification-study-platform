import { awsSaaCheatSheet as sheet } from './awsSaa';

const cards = () => [...sheet.domains.flatMap(d => d.cards), ...sheet.decisionCards, ...sheet.limits, ...sheet.strategies];

describe('AWS SAA-C03 cheat sheet data', () => {
  it('provides the reviewed four-domain exam blueprint and substantial coverage', () => {
    expect(sheet.id).toBe('aws-saa');
    expect(sheet.certificationId).toBe('aws-saa-c03');
    expect(sheet.examCode).toBe('SAA-C03');
    expect(sheet.lastReviewed).toBe('2026-11-19');
    expect(sheet.domains.map(d => d.weight)).toEqual([30, 26, 24, 20]);
    expect(sheet.domains.reduce((n, d) => n + d.weight, 0)).toBe(100);
    sheet.domains.forEach(d => expect(d.cards.length).toBeGreaterThanOrEqual(6));
    expect(sheet.domains.flatMap(d => d.cards).length).toBeGreaterThanOrEqual(35);
    expect(sheet.decisionCards.length).toBeGreaterThanOrEqual(7);
    expect(sheet.limits.length).toBeGreaterThanOrEqual(6);
    expect(sheet.strategies.length).toBeGreaterThanOrEqual(4);
  });

  it('has unique IDs, usable plain-English cards, and resolvable AWS sources', () => {
    const ids = [...sheet.domains.map(d => d.id), ...cards().map(c => c.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const sources = new Set(sheet.sources.map(s => s.id));
    expect(sources.size).toBe(sheet.sources.length);
    sheet.sources.forEach(s => {
      expect(s.label.length).toBeGreaterThan(5);
      expect(new URL(s.url).hostname).toMatch(/(^|\.)aws\.amazon\.com$/);
    });
    cards().forEach(c => {
      expect(c.summary.length).toBeGreaterThan(20);
      expect(c.analogy).toBeTruthy();
      expect(c.bullets.length).toBeGreaterThanOrEqual(2);
      expect(c.examTip).toBeTruthy();
      expect(c.tags.length).toBeGreaterThan(0);
      expect(c.sourceIds.length).toBeGreaterThan(0);
      c.sourceIds.forEach(id => expect(sources.has(id)).toBe(true));
      c.comparisons?.forEach(option => {
        expect(option.pickWhen).toBeTruthy();
        expect(option.watchOut).toBeTruthy();
      });
    });
  });

  it('covers required services, architectural patterns, and scenario comparisons', () => {
    const text = JSON.stringify(sheet);
    ['IAM', 'STS', 'CloudHSM', 'Parameter Store', 'GuardDuty', 'Inspector', 'Macie', 'WAF', 'Shield', 'CloudTrail', 'Config', 'NACL', 'PrivateLink', 'Transit Gateway', 'Direct Connect', 'Route 53', 'Global Accelerator', 'Fargate', 'EKS', 'cold start', 'SSE-C', 'gp3', 'io2', 'st1', 'sc1', 'FSx', 'DataSync', 'Storage Gateway', 'Snowball', 'Aurora', 'DAX', 'GSI', 'LSI', 'Memcached', 'Redshift', 'Athena', 'Glue', 'Kinesis', 'EventBridge', 'Step Functions', 'RTO', 'RPO', 'pilot light', 'warm standby', 'active/active', 'Savings Plans', 'Spot'].forEach(term => expect(text).toContain(term));
    ['security-groups-vs-nacls', 'database-availability', 'vpc-endpoints', 'load-balancers', 'storage-models', 'messaging-patterns', 'disaster-recovery'].forEach(id => expect(sheet.decisionCards.find(c => c.id === id)?.comparisons?.length).toBeGreaterThanOrEqual(2));
  });

  it('keeps current numerical corrections with the applicable service, units, and exceptions', () => {
    const limit = (id: string) => JSON.stringify(sheet.limits.find(c => c.id === id));
    expect(limit('limit-lambda')).toContain('900 seconds');
    expect(limit('limit-lambda')).toContain('10,240 MB');
    expect(limit('limit-lambda')).toContain('5,400 seconds');
    expect(limit('limit-lambda')).toContain('Managed Instances');
    expect(limit('limit-s3-size')).toContain('48.8 TiB');
    expect(limit('limit-s3-size')).toContain('single PUT');
    expect(limit('limit-sqs')).toContain('1,048,576 bytes (1 MiB)');
    expect(limit('limit-sqs')).toContain('256 KiB');
    expect(limit('limit-sqs')).toContain('14 days');
    expect(limit('limit-ddb')).toContain('400 KB');
    expect(limit('limit-ddb')).toContain('10 GB');
    expect(limit('limit-gp3')).toContain('80,000 IOPS');
    expect(limit('limit-gp3')).toContain('2,000 MiB/s');
    expect(limit('limit-gp3')).toContain('Outposts');
  });

  it('guards current corrections and conditional exam advice against legacy traps', () => {
    const text = JSON.stringify(sheet);
    ['50 TB', '48.8 TiB', '5 TB', 'legacy', '1 MiB', '256 KB', '10,240 MB', '900 seconds', '720', 'not 72%', 'MRSC', 'MREC', 'readable standbys', 'April 2026', 'November 7, 2025', 'us-east-1', '/16', '/28', 'idempotent'].forEach(term => expect(text).toContain(term));
    expect(text).not.toMatch(/guarantee.{0,15}pass/i);
  });
});
