import type { CertificationId } from './examQuestions';

export interface Certification {
  id: CertificationId;
  name: string;
  description: string;
  color: string;
  examCode: string;
  examDurationMinutes: number;
  officialQuestionCount: number | null;
  maxQuestionCount: number | null;
  practiceQuestionCount: number;
  domains: string[];
}

export const certifications: Certification[] = [
  {
    id: 'aws-saa-c03',
    name: 'AWS Certified Solutions Architect – Associate',
    description: 'Design secure, resilient, high-performing, and cost-optimized AWS architectures.',
    color: '#f59e0b',
    examCode: 'SAA-C03',
    examDurationMinutes: 130,
    officialQuestionCount: 65,
    maxQuestionCount: 65,
    practiceQuestionCount: 65,
    domains: [
      'Design Secure Architectures',
      'Design Resilient Architectures',
      'Design High-Performing Architectures',
      'Design Cost-Optimized Architectures',
    ],
  },
  {
    id: 'jncia',
    name: 'JNCIA-Junos',
    description: 'Juniper Networks Certified Associate, Junos (JN0-106).',
    color: '#84B135',
    examCode: 'JN0-106',
    examDurationMinutes: 90,
    officialQuestionCount: 65,
    maxQuestionCount: 65,
    practiceQuestionCount: 65,
    domains: [
      'Networking Fundamentals',
      'Junos OS Fundamentals',
      'User Interfaces',
      'Configuration Basics',
      'Operational Monitoring and Maintenance',
      'Routing Fundamentals',
      'Routing Policy and Firewall Filters',
    ],
  },
  {
    id: 'ccna',
    name: 'Cisco CCNA',
    description: 'Cisco Certified Network Associate (200-301).',
    color: '#1BA0D7',
    examCode: '200-301',
    examDurationMinutes: 120,
    officialQuestionCount: null,
    maxQuestionCount: null,
    practiceQuestionCount: 65,
    domains: [
      'Network Fundamentals',
      'Network Access',
      'IP Connectivity',
      'IP Services',
      'Security Fundamentals',
      'Automation and Programmability',
    ],
  },
  {
    id: 'security-plus',
    name: 'CompTIA Security+',
    description: 'CompTIA Security+ (SY0-701).',
    color: '#dc2626',
    examCode: 'SY0-701',
    examDurationMinutes: 90,
    officialQuestionCount: null,
    maxQuestionCount: 90,
    practiceQuestionCount: 39,
    domains: [
      'General Security Concepts',
      'Threats, Vulnerabilities, and Mitigations',
      'Security Architecture',
      'Security Operations',
      'Security Program Management and Oversight',
    ],
  },
  {
    id: 'sc-200',
    name: 'Microsoft Security Operations Analyst',
    description: 'Microsoft Certified: Security Operations Analyst Associate (SC-200).',
    color: '#00A4EF',
    examCode: 'SC-200',
    examDurationMinutes: 100,
    officialQuestionCount: null,
    maxQuestionCount: null,
    practiceQuestionCount: 9,
    domains: [
      'Manage Security Operations Environment',
      'Configure Protections and Detections',
      'Manage Incident Response',
      'Perform Threat Hunting',
    ],
  },
];
