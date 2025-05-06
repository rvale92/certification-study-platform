export interface Flashcard {
  question: string;
  answer: string;
  exam: string;
  category?: string;
}

export const flashcards: Flashcard[] = [
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
    question: 'What is a security zone in Junos OS?',
    answer: 'A security zone is a collection of interfaces that share common security requirements and policies',
    exam: 'jncia',
    category: 'Security Features'
  },
  {
    question: 'What is the purpose of NAT in Junos OS?',
    answer: 'Network Address Translation (NAT) translates private IP addresses to public IP addresses, allowing multiple devices to share a single public IP',
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
    question: 'What is the difference between OSPF and EIGRP?',
    answer: 'OSPF is a link-state protocol that uses Dijkstra\'s algorithm, while EIGRP is a hybrid protocol that uses DUAL algorithm and maintains neighbor relationships',
    exam: 'ccna',
    category: 'Routing Technologies'
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
  {
    question: 'What is the purpose of BGP?',
    answer: 'Border Gateway Protocol (BGP) is an exterior gateway protocol used to exchange routing information between autonomous systems',
    exam: 'ccna',
    category: 'Routing Technologies'
  },

  // Security+ Flashcards
  {
    question: 'What is the CIA triad?',
    answer: 'The CIA triad consists of Confidentiality (protecting data from unauthorized access), Integrity (ensuring data accuracy), and Availability (ensuring data is accessible when needed)',
    exam: 'security',
    category: 'Threats, Attacks, and Vulnerabilities'
  },
  {
    question: 'What is the difference between symmetric and asymmetric encryption?',
    answer: 'Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses a public key for encryption and a private key for decryption',
    exam: 'security',
    category: 'Architecture and Design'
  },
  {
    question: 'What is the purpose of a firewall?',
    answer: 'A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules',
    exam: 'security',
    category: 'Implementation'
  },
  {
    question: 'What is the difference between IDS and IPS?',
    answer: 'An IDS (Intrusion Detection System) monitors and alerts on suspicious activity, while an IPS (Intrusion Prevention System) actively blocks suspicious activity',
    exam: 'security',
    category: 'Implementation'
  },
  {
    question: 'What is the purpose of a VPN?',
    answer: 'A Virtual Private Network (VPN) creates a secure, encrypted connection over a public network, allowing secure remote access to private networks',
    exam: 'security',
    category: 'Implementation'
  },
  {
    question: 'What is social engineering?',
    answer: 'Social engineering is the manipulation of people to gain unauthorized access to systems or information',
    exam: 'security',
    category: 'Threats, Attacks, and Vulnerabilities'
  },
  {
    question: 'What is the purpose of penetration testing?',
    answer: 'Penetration testing simulates attacks on systems to identify vulnerabilities and assess security controls',
    exam: 'security',
    category: 'Threats, Attacks, and Vulnerabilities'
  },
  {
    question: 'What is the difference between authentication and authorization?',
    answer: 'Authentication verifies identity, while authorization determines what resources a user can access',
    exam: 'security',
    category: 'Implementation'
  },
  {
    question: 'What is the purpose of a DMZ?',
    answer: 'A Demilitarized Zone (DMZ) is a network segment that contains publicly accessible services, separated from the internal network by security controls',
    exam: 'security',
    category: 'Architecture and Design'
  },
  {
    question: 'What is the difference between hashing and encryption?',
    answer: 'Hashing is a one-way function that creates a fixed-length output, while encryption is a two-way function that can be reversed with the correct key',
    exam: 'security',
    category: 'Architecture and Design'
  },

  // SC-205 Flashcards
  {
    question: 'What is Azure Sentinel?',
    answer: 'Azure Sentinel is a cloud-native SIEM and SOAR solution that provides intelligent security analytics and threat intelligence across the enterprise',
    exam: 'sc205',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is Microsoft Defender for Cloud?',
    answer: 'Microsoft Defender for Cloud is a unified security management system that strengthens the security posture of cloud workloads and provides advanced threat protection',
    exam: 'sc205',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is the purpose of Azure Active Directory?',
    answer: 'Azure Active Directory is Microsoft\'s cloud-based identity and access management service that helps users sign in and access resources',
    exam: 'sc205',
    category: 'Identity and Access'
  },
  {
    question: 'What is the purpose of Microsoft Defender for Identity?',
    answer: 'Microsoft Defender for Identity is a cloud-based security solution that leverages your on-premises Active Directory signals to identify, detect, and investigate advanced threats',
    exam: 'sc205',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is the difference between Azure AD and on-premises Active Directory?',
    answer: 'Azure AD is a cloud-based identity and access management service, while on-premises AD is a directory service that runs on Windows Server',
    exam: 'sc205',
    category: 'Identity and Access'
  },
  {
    question: 'What is Conditional Access in Azure AD?',
    answer: 'Conditional Access is a tool used by Azure AD to bring signals together, make decisions, and enforce organizational policies',
    exam: 'sc205',
    category: 'Identity and Access'
  },
  {
    question: 'What is Microsoft Defender for Endpoint?',
    answer: 'Microsoft Defender for Endpoint is an enterprise endpoint security platform designed to help prevent, detect, investigate, and respond to advanced threats',
    exam: 'sc205',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is the purpose of Microsoft Defender for Office 365?',
    answer: 'Microsoft Defender for Office 365 protects against malicious threats posed by email messages, links, and collaboration tools',
    exam: 'sc205',
    category: 'Microsoft Security Solutions'
  },
  {
    question: 'What is Privileged Identity Management?',
    answer: 'Privileged Identity Management helps organizations manage, control, and monitor access to important resources in Azure AD',
    exam: 'sc205',
    category: 'Identity and Access'
  },
  {
    question: 'What is the purpose of Security Information and Event Management (SIEM)?',
    answer: 'SIEM provides real-time analysis of security alerts generated by applications and network hardware, helping identify and respond to security threats',
    exam: 'sc205',
    category: 'Security Operations'
  }
]; 