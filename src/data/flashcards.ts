import { examQuestions } from './examQuestions';

interface LegacyFlashcard {
  question: string;
  answer: string;
  exam: string;
  category?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  certification: 'aws-saa-c03' | 'jncia' | 'ccna' | 'security-plus' | 'sc-200';
  domain: string;
}

const legacyFlashcards: LegacyFlashcard[] = [
  // JNCIA Flashcards
  {
    question: 'What is the default login username for Junos OS?',
    answer: 'The default login username is "root"',
    exam: 'jncia',
    category: 'Junos OS Fundamentals'
  },
  {
    question: 'What command is used to enter configuration mode in Junos OS?',
    answer: 'The command is "configure" or "edit"',
    exam: 'jncia',
    category: 'Junos OS Fundamentals'
  },
  {
    question: 'What is the purpose of the "commit" command in Junos OS?',
    answer: 'The "commit" command activates the candidate configuration and makes it the active configuration',
    exam: 'jncia',
    category: 'Junos OS Fundamentals'
  },
  {
    question: 'What is a routing instance in Junos OS?',
    answer: 'A routing instance is a collection of routing tables, interfaces, and routing protocol parameters',
    exam: 'jncia',
    category: 'Routing Fundamentals'
  },
  {
    question: 'What is the difference between operational mode and configuration mode in Junos OS?',
    answer: 'Operational mode is for monitoring and troubleshooting, while configuration mode is for making changes to the device configuration',
    exam: 'jncia',
    category: 'Junos OS Fundamentals'
  },
  {
    question: 'What is the purpose of firewall filters in Junos OS?',
    answer: 'Firewall filters control packet flow through the device by matching packet attributes and performing actions like accept, reject, or count',
    exam: 'jncia',
    category: 'Security Features'
  },
  {
    question: 'What is the difference between static and dynamic routing in Junos OS?',
    answer: 'Static routing requires manual configuration of routes, while dynamic routing automatically learns and updates routes through routing protocols',
    exam: 'jncia',
    category: 'Routing Fundamentals'
  },
  {
    question: 'What is the purpose of routing policies in Junos OS?',
    answer: 'Routing policies control the flow of routing information and allow modification of route attributes',
    exam: 'jncia',
    category: 'Routing Fundamentals'
  },

  // CCNA Flashcards
  {
    question: 'What is the difference between a switch and a router?',
    answer: 'A switch operates at Layer 2 (Data Link) and forwards frames based on MAC addresses, while a router operates at Layer 3 (Network) and forwards packets based on IP addresses',
    exam: 'ccna',
    category: 'Network Fundamentals'
  },
  {
    question: 'What is the purpose of VLANs?',
    answer: 'VLANs (Virtual Local Area Networks) segment broadcast domains and improve network security and performance by logically separating network traffic',
    exam: 'ccna',
    category: 'LAN Switching'
  },
  {
    question: 'What is the difference between static and dynamic routing?',
    answer: 'Static routing requires manual configuration of routes, while dynamic routing automatically learns and updates routes through routing protocols',
    exam: 'ccna',
    category: 'Routing Technologies'
  },
  {
    question: 'What is the purpose of NAT?',
    answer: 'Network Address Translation (NAT) translates private IP addresses to public IP addresses, allowing multiple devices to share a single public IP',
    exam: 'ccna',
    category: 'Network Fundamentals'
  },
  {
    question: 'What is the difference between TCP and UDP?',
    answer: 'TCP provides reliable, connection-oriented delivery with error checking, while UDP provides fast, connectionless delivery without error checking',
    exam: 'ccna',
    category: 'Network Fundamentals'
  },
  {
    question: 'What is the purpose of Spanning Tree Protocol?',
    answer: 'Spanning Tree Protocol prevents network loops in switched networks by creating a loop-free logical topology',
    exam: 'ccna',
    category: 'LAN Switching'
  },
  {
    question: 'What is the purpose of EtherChannel?',
    answer: 'EtherChannel combines multiple physical links into a single logical link to increase bandwidth and provide redundancy',
    exam: 'ccna',
    category: 'LAN Switching'
  },
  {
    question: 'What is the difference between access and trunk ports?',
    answer: 'Access ports carry traffic for a single VLAN, while trunk ports carry traffic for multiple VLANs using VLAN tagging',
    exam: 'ccna',
    category: 'LAN Switching'
  },

  // Security+ Flashcards
  {
    question: 'What is the CIA triad?',
    answer: 'The CIA triad consists of Confidentiality (protecting data from unauthorized access), Integrity (ensuring data accuracy), and Availability (ensuring data is accessible when needed)',
    exam: 'security',
    category: 'General Security Concepts'
  },
  {
    question: 'What is the difference between symmetric and asymmetric encryption?',
    answer: 'Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses a public key for encryption and a private key for decryption',
    exam: 'security',
    category: 'Security Architecture'
  },
  {
    question: 'What is the purpose of a firewall?',
    answer: 'A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules',
    exam: 'security',
    category: 'Security Architecture'
  },
  {
    question: 'What is the difference between IDS and IPS?',
    answer: 'An IDS (Intrusion Detection System) monitors and alerts on suspicious activity, while an IPS (Intrusion Prevention System) actively blocks suspicious activity',
    exam: 'security',
    category: 'Security Operations'
  },
  {
    question: 'What is the purpose of a VPN?',
    answer: 'A Virtual Private Network (VPN) creates a secure, encrypted connection over a public network, allowing secure remote access to private networks',
    exam: 'security',
    category: 'Security Architecture'
  },
  {
    question: 'What is social engineering?',
    answer: 'Social engineering is the manipulation of people to gain unauthorized access to systems or information',
    exam: 'security',
    category: 'Threats, Vulnerabilities, and Mitigations'
  },
  {
    question: 'What is the purpose of penetration testing?',
    answer: 'Penetration testing simulates attacks on systems to identify vulnerabilities and assess security controls',
    exam: 'security',
    category: 'Threats, Vulnerabilities, and Mitigations'
  },
  {
    question: 'What is the difference between authentication and authorization?',
    answer: 'Authentication verifies identity, while authorization determines what resources a user can access',
    exam: 'security',
    category: 'Security Operations'
  },
  {
    question: 'What is the purpose of a DMZ?',
    answer: 'A Demilitarized Zone (DMZ) is a network segment that contains publicly accessible services, separated from the internal network by security controls',
    exam: 'security',
    category: 'Security Architecture'
  },
  {
    question: 'What is the difference between hashing and encryption?',
    answer: 'Hashing is a one-way function that creates a fixed-length output, while encryption is a two-way function that can be reversed with the correct key',
    exam: 'security',
    category: 'General Security Concepts'
  },

  // SC-200 Flashcards
  {
    question: 'What is Microsoft Sentinel?',
    answer: 'Microsoft Sentinel is a cloud-native SIEM and SOAR platform for collecting and analyzing security data and orchestrating response',
    exam: 'sc-200',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is Microsoft Defender for Cloud?',
    answer: 'Microsoft Defender for Cloud is a unified security management system that strengthens the security posture of cloud workloads and provides advanced threat protection',
    exam: 'sc-200',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is the purpose of Microsoft Entra ID?',
    answer: 'Microsoft Entra ID is Microsoft\'s cloud identity and access management service for authentication and authorization',
    exam: 'sc-200',
    category: 'Identity and Access'
  },
  {
    question: 'What is the purpose of Microsoft Defender for Identity?',
    answer: 'Microsoft Defender for Identity is a cloud-based security solution that leverages your on-premises Active Directory signals to identify, detect, and investigate advanced threats',
    exam: 'sc-200',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is the difference between Microsoft Entra ID and on-premises Active Directory?',
    answer: 'Microsoft Entra ID is a cloud identity service, while on-premises Active Directory Domain Services is a Windows Server directory service',
    exam: 'sc-200',
    category: 'Identity and Access'
  },
  {
    question: 'What is Conditional Access in Microsoft Entra ID?',
    answer: 'Conditional Access evaluates identity, device, application, and other signals to enforce access policies',
    exam: 'sc-200',
    category: 'Identity and Access'
  },
  {
    question: 'What is Microsoft Defender for Endpoint?',
    answer: 'Microsoft Defender for Endpoint is an enterprise endpoint security platform designed to help prevent, detect, investigate, and respond to advanced threats',
    exam: 'sc-200',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is the purpose of Microsoft Defender for Office 365?',
    answer: 'Microsoft Defender for Office 365 protects against malicious threats posed by email messages, links, and collaboration tools',
    exam: 'sc-200',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is Privileged Identity Management?',
    answer: 'Privileged Identity Management helps organizations manage, control, and monitor time-bound privileged access in Microsoft Entra ID and Azure',
    exam: 'sc-200',
    category: 'Identity and Access'
  },
  {
    question: 'What is the purpose of Security Information and Event Management (SIEM)?',
    answer: 'SIEM provides real-time analysis of security alerts generated by applications and network hardware, helping identify and respond to security threats',
    exam: 'sc-200',
    category: 'Security Operations'
  }
];

const migratedComponentFlashcards: Array<Omit<Flashcard, 'id'>> = [
  {
    certification: 'jncia',
    domain: 'Junos OS Fundamentals',
    question: 'What are the two main components of a Juniper device running Junos OS?',
    answer: 'The Routing Engine handles control-plane functions, while the Packet Forwarding Engine handles packet forwarding.',
  },
  {
    certification: 'jncia',
    domain: 'Configuration Basics',
    question: 'What is a candidate configuration in Junos OS?',
    answer: 'It is the working configuration that can be changed without affecting the active configuration. Changes take effect after a successful commit.',
  },
  {
    certification: 'jncia',
    domain: 'Configuration Basics',
    question: 'What does commit confirmed do in Junos OS?',
    answer: 'It activates a configuration temporarily and automatically rolls it back unless confirmed within the configured interval (10 minutes by default).',
  },
  {
    certification: 'jncia',
    domain: 'Configuration Basics',
    question: 'What is the purpose of the Junos rescue configuration?',
    answer: 'It is a known-good configuration saved by an administrator for recovery if the active configuration becomes unusable.',
  },
  {
    certification: 'jncia',
    domain: 'Configuration Basics',
    question: 'How do load merge and load replace differ in Junos OS?',
    answer: 'load merge combines loaded statements with the candidate configuration. load replace replaces the corresponding hierarchy marked for replacement.',
  },
  {
    certification: 'jncia',
    domain: 'Routing Fundamentals',
    question: 'What is the difference between the RIB and the FIB?',
    answer: 'The Routing Information Base contains routing information used to select active routes. The Forwarding Information Base contains entries used by the forwarding plane to send packets.',
  },
  {
    certification: 'ccna',
    domain: 'Network Access',
    question: 'What are the four DHCP address-allocation messages commonly called DORA?',
    answer: 'Discover, Offer, Request, and Acknowledgment. The client broadcasts discovery, receives an offer, requests an address, and receives an acknowledgment.',
  },
  {
    certification: 'ccna',
    domain: 'Network Fundamentals',
    question: 'How does a router differ from a Layer 2 switch?',
    answer: 'A router forwards packets between IP networks using Layer 3 information. A Layer 2 switch forwards Ethernet frames within a VLAN using MAC addresses.',
  },
  {
    certification: 'ccna',
    domain: 'Network Access',
    question: 'What is the purpose of BPDU Guard on a switch access port?',
    answer: 'When enabled, BPDU Guard places a port into an error-disabled state if it receives a BPDU, helping prevent an unexpected switch from joining an edge port.',
  },
  {
    certification: 'ccna',
    domain: 'Network Access',
    question: 'What is the purpose of DHCP snooping?',
    answer: 'DHCP snooping classifies switch ports as trusted or untrusted, blocks unauthorized DHCP server messages on untrusted ports, and can build a client binding table.',
  },
  {
    certification: 'security-plus',
    domain: 'Security Operations',
    question: 'How does an IDS differ from an IPS?',
    answer: 'An IDS detects and reports suspicious activity. An IPS is positioned to inspect traffic and can block activity according to its configured policy.',
  },
  {
    certification: 'security-plus',
    domain: 'Security Operations',
    question: 'What is the difference between vulnerability scanning and penetration testing?',
    answer: 'Scanning identifies and reports potential vulnerabilities. Penetration testing safely attempts to validate exploitability and assess the impact of weaknesses.',
  },
  {
    certification: 'security-plus',
    domain: 'Security Operations',
    question: 'What is the purpose of a security incident response plan?',
    answer: 'It defines roles, communication, and procedures for preparing for, detecting, analyzing, containing, eradicating, and recovering from incidents.',
  },
  {
    certification: 'security-plus',
    domain: 'Security Architecture',
    question: 'What is the difference between encryption at rest and encryption in transit?',
    answer: 'Encryption at rest protects stored data. Encryption in transit protects data as it moves between systems over a communication channel.',
  },
  {
    certification: 'security-plus',
    domain: 'Security Program Management and Oversight',
    question: 'What is the purpose of data classification?',
    answer: 'Classification assigns sensitivity or handling labels to data so that appropriate access, storage, transmission, and retention controls can be applied.',
  },
];

const domainFor = (certification: Flashcard['certification'], question: string, answer: string): string => {
  const content = `${question} ${answer}`.toLowerCase();
  if (certification === 'jncia') {
    if (/firewall filter|routing polic/.test(content)) return 'Routing Policy and Firewall Filters';
    if (/route|routing|ospf|bgp|rip/.test(content)) return 'Routing Fundamentals';
    if (/configure|configuration|commit|rollback|load |candidate|rescue/.test(content)) return 'Configuration Basics';
    if (/show |system |alarms|storage|memory|process|uptime|log/.test(content)) return 'Operational Monitoring and Maintenance';
    if (/junos os|routing engine|packet forwarding|pfe|architecture/.test(content)) return 'Junos OS Fundamentals';
    return 'Networking Fundamentals';
  }
  if (certification === 'ccna') {
    if (/automation|programmability|api|python|controller|sdn/.test(content)) return 'Automation and Programmability';
    if (/vlan|switch|etherchannel|stp|spanning|trunk|access port|mac address|cdp|lldp|dhcp snooping/.test(content)) return 'Network Access';
    if (/ospf|routing|route|subnet|ipv4|ipv6/.test(content)) return 'IP Connectivity';
    if (/dhcp|dns|nat|pat|ntp|snmp|qos|hsrp|vrrp/.test(content)) return 'IP Services';
    if (/acl|security|firewall|attack|authentication|encryption|ssh/.test(content)) return 'Security Fundamentals';
    return 'Network Fundamentals';
  }
  if (certification === 'security-plus') {
    if (/attack|threat|vulnerab|malware|zero.day|social engineering|ddos/.test(content)) return 'Threats, Vulnerabilities, and Mitigations';
    if (/architecture|network segmentation|firewall|cloud|zero trust|encryption|vpn|cryptograph/.test(content)) return 'Security Architecture';
    if (/incident|siem|soar|monitor|response|mfa|authentication|authorization|operations|hunt|ids|ips/.test(content)) return 'Security Operations';
    if (/policy|audit|risk|compliance|governance|awareness|procedure/.test(content)) return 'Security Program Management and Oversight';
    return 'General Security Concepts';
  }
  if (/kql|hunt|threat actor|threat intelligence|hunting query/.test(content)) return 'Perform threat hunting';
  if (/incident|alert|response|containment|eradication|compromised|investigat|remediat|defender for cloud|defender for identity|entra id|purview/.test(content)) {
    return 'Respond to security incidents';
  }
  return 'Manage a security operations environment';
};

const certificationFor = (exam: string): Flashcard['certification'] => {
  if (exam === 'jncia' || exam === 'ccna') return exam;
  if (exam === 'security') return 'security-plus';
  if (exam === 'sc-200') return 'sc-200';
  throw new Error(`Unknown flashcard certification: ${exam}`);
};

const normalizedLegacy = legacyFlashcards
  .map((card) => {
    const certification = certificationFor(card.exam);
    const question = card.question;
    let answer = card.answer;
    if (card.exam === 'jncia' && /enter configuration mode/i.test(question)) {
      answer = 'Use configure to enter configuration mode from operational mode. Use edit to navigate to a hierarchy after entering configuration mode.';
    }
    return { certification, question, answer, domain: domainFor(certification, question, answer) };
  });

const questionFlashcards: Array<Omit<Flashcard, 'id'>> = Object.values(examQuestions).flatMap((questions) =>
  questions.map((item) => ({
    certification: item.id.startsWith('aws-saa-') ? 'aws-saa-c03' as const
      : item.id.startsWith('jncia-') ? 'jncia' as const
      : item.id.startsWith('ccna-') ? 'ccna' as const
      : item.id.startsWith('secplus-') ? 'security-plus' as const
      : 'sc-200' as const,
    question: item.question,
    answer: `Correct answer: ${item.correctAnswer}\n\nWhy this is right: ${item.explanation}${item.distractorExplanations ? `\n\nWhy the other options are wrong:\n${Object.values(item.distractorExplanations).map((reason) => `- ${reason}`).join('\n')}` : ''}`,
    domain: item.domain,
  })),
);

const candidates: Array<Omit<Flashcard, 'id'>> = [
  ...normalizedLegacy,
  ...migratedComponentFlashcards,
  ...questionFlashcards,
];
const seenPrompts = new Set<string>();
const uniqueCards = candidates.filter((card) => {
  const key = `${card.certification}:${card.question.trim().toLowerCase()}`;
  if (seenPrompts.has(key)) return false;
  seenPrompts.add(key);
  return true;
});
const idCounts: Partial<Record<Flashcard['certification'], number>> = {};

export const flashcards: Flashcard[] = uniqueCards.map((card) => {
  const count = (idCounts[card.certification] || 0) + 1;
  idCounts[card.certification] = count;
  return {
    ...card,
    id: `${card.certification}-${String(count).padStart(3, '0')}`,
  };
});