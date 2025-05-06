export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ExamQuestions {
  jncia: Question[];
  ccna: Question[];
  security: Question[];
  sc205: Question[];
}

// JNCIA Questions (120 total)
export const jnciaQuestions: Question[] = [
  {
    id: 1,
    question: "What is the default administrative distance for static routes in Junos OS?",
    options: ["5", "10", "15", "20"],
    correctAnswer: "5",
    explanation: "In Junos OS, static routes have a default administrative distance of 5."
  },
  {
    id: 2,
    question: "Which command shows the routing table in Junos OS?",
    options: ["show route", "show routing-table", "show ip route", "show routes"],
    correctAnswer: "show route",
    explanation: "The correct command to view the routing table in Junos OS is 'show route'."
  },
  {
    id: 3,
    question: "What is the purpose of a routing instance in Junos OS?",
    options: [
      "To separate routing tables and protocols",
      "To configure static routes only",
      "To manage system users",
      "To configure interfaces"
    ],
    correctAnswer: "To separate routing tables and protocols",
    explanation: "Routing instances allow for separate routing domains within a single router."
  },
  {
    id: 4,
    question: "What is the default protocol used for OSPF in Junos OS?",
    options: ["OSPFv2", "OSPFv3", "OSPFv4", "OSPFv5"],
    correctAnswer: "OSPFv2",
    explanation: "OSPFv2 is the default protocol used for OSPF in Junos OS."
  },
  {
    id: 5,
    question: "Which command is used to commit configuration changes in Junos OS?",
    options: ["commit", "save", "write", "apply"],
    correctAnswer: "commit",
    explanation: "The 'commit' command is used to apply configuration changes in Junos OS."
  },
  {
    id: 6,
    question: "What is the purpose of the 'rollback' command in Junos OS?",
    options: [
      "To revert to a previous configuration",
      "To save the current configuration",
      "To delete the current configuration",
      "To create a new configuration"
    ],
    correctAnswer: "To revert to a previous configuration",
    explanation: "The 'rollback' command allows you to revert to a previously saved configuration."
  },
  {
    id: 7,
    question: "Which protocol is used for BGP in Junos OS?",
    options: ["TCP", "UDP", "ICMP", "IP"],
    correctAnswer: "TCP",
    explanation: "BGP uses TCP as its transport protocol in Junos OS."
  },
  {
    id: 8,
    question: "What is the default hold time for BGP in Junos OS?",
    options: ["90 seconds", "120 seconds", "180 seconds", "240 seconds"],
    correctAnswer: "90 seconds",
    explanation: "The default hold time for BGP in Junos OS is 90 seconds."
  },
  {
    id: 9,
    question: "Which command shows the BGP neighbors in Junos OS?",
    options: ["show bgp neighbor", "show bgp peers", "show bgp summary", "show bgp status"],
    correctAnswer: "show bgp neighbor",
    explanation: "The 'show bgp neighbor' command displays BGP neighbor information in Junos OS."
  },
  {
    id: 10,
    question: "What is the purpose of the 'set' command in Junos OS?",
    options: [
      "To configure system settings",
      "To display system information",
      "To delete configuration",
      "To save configuration"
    ],
    correctAnswer: "To configure system settings",
    explanation: "The 'set' command is used to configure system settings in Junos OS."
  },
  {
    id: 11,
    question: "Which command shows the interface status in Junos OS?",
    options: ["show interfaces", "show interface status", "show ports", "show links"],
    correctAnswer: "show interfaces",
    explanation: "The 'show interfaces' command displays interface status and configuration in Junos OS."
  },
  {
    id: 12,
    question: "What is the default protocol used for RIP in Junos OS?",
    options: ["RIPv1", "RIPv2", "RIPv3", "RIPv4"],
    correctAnswer: "RIPv2",
    explanation: "RIPv2 is the default protocol used for RIP in Junos OS."
  },
  {
    id: 13,
    question: "Which command shows the routing protocols in Junos OS?",
    options: ["show protocols", "show routing", "show routes", "show ospf"],
    correctAnswer: "show protocols",
    explanation: "The 'show protocols' command displays configured routing protocols in Junos OS."
  },
  {
    id: 14,
    question: "What is the purpose of the 'delete' command in Junos OS?",
    options: [
      "To remove configuration statements",
      "To add configuration statements",
      "To modify configuration statements",
      "To save configuration statements"
    ],
    correctAnswer: "To remove configuration statements",
    explanation: "The 'delete' command is used to remove configuration statements in Junos OS."
  },
  {
    id: 15,
    question: "Which command shows the system version in Junos OS?",
    options: ["show version", "show system", "show os", "show junos"],
    correctAnswer: "show version",
    explanation: "The 'show version' command displays the Junos OS version and system information."
  },
  {
    id: 16,
    question: "What is the default protocol used for IS-IS in Junos OS?",
    options: ["IS-IS Level 1", "IS-IS Level 2", "IS-IS Level 1-2", "IS-IS Level 3"],
    correctAnswer: "IS-IS Level 1-2",
    explanation: "IS-IS Level 1-2 is the default protocol used for IS-IS in Junos OS."
  },
  {
    id: 17,
    question: "Which command shows the system uptime in Junos OS?",
    options: ["show system uptime", "show uptime", "show system", "show time"],
    correctAnswer: "show system uptime",
    explanation: "The 'show system uptime' command displays the system uptime in Junos OS."
  },
  {
    id: 18,
    question: "What is the purpose of the 'edit' command in Junos OS?",
    options: [
      "To enter configuration mode",
      "To exit configuration mode",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To enter configuration mode",
    explanation: "The 'edit' command is used to enter configuration mode in Junos OS."
  },
  {
    id: 19,
    question: "Which command shows the system memory in Junos OS?",
    options: ["show system memory", "show memory", "show system", "show resources"],
    correctAnswer: "show system memory",
    explanation: "The 'show system memory' command displays system memory usage in Junos OS."
  },
  {
    id: 20,
    question: "What is the default protocol used for PIM in Junos OS?",
    options: ["PIM-SM", "PIM-DM", "PIM-SSM", "PIM-BIDIR"],
    correctAnswer: "PIM-SM",
    explanation: "PIM-SM (Protocol Independent Multicast - Sparse Mode) is the default protocol used for PIM in Junos OS."
  },
  {
    id: 21,
    question: "What is the purpose of the 'request system reboot' command in Junos OS?",
    options: [
      "To restart the system",
      "To save the configuration",
      "To check system status",
      "To update the system"
    ],
    correctAnswer: "To restart the system",
    explanation: "The 'request system reboot' command is used to restart the Junos OS system."
  },
  {
    id: 22,
    question: "Which command shows the system storage in Junos OS?",
    options: ["show system storage", "show storage", "show disk", "show filesystem"],
    correctAnswer: "show system storage",
    explanation: "The 'show system storage' command displays system storage usage in Junos OS."
  },
  {
    id: 23,
    question: "What is the default protocol used for LDP in Junos OS?",
    options: ["LDP", "RSVP", "MPLS", "BGP"],
    correctAnswer: "LDP",
    explanation: "LDP (Label Distribution Protocol) is the default protocol used for MPLS label distribution in Junos OS."
  },
  {
    id: 24,
    question: "Which command shows the system processes in Junos OS?",
    options: ["show system processes", "show processes", "show tasks", "show jobs"],
    correctAnswer: "show system processes",
    explanation: "The 'show system processes' command displays running system processes in Junos OS."
  },
  {
    id: 25,
    question: "What is the purpose of the 'request system software add' command in Junos OS?",
    options: [
      "To install new software packages",
      "To remove software packages",
      "To check software versions",
      "To backup software"
    ],
    correctAnswer: "To install new software packages",
    explanation: "The 'request system software add' command is used to install new software packages in Junos OS."
  },
  {
    id: 26,
    question: "Which command shows the system alarms in Junos OS?",
    options: ["show system alarms", "show alarms", "show alerts", "show warnings"],
    correctAnswer: "show system alarms",
    explanation: "The 'show system alarms' command displays system alarms in Junos OS."
  },
  {
    id: 27,
    question: "What is the default protocol used for VRRP in Junos OS?",
    options: ["VRRPv2", "VRRPv3", "VRRPv4", "VRRPv5"],
    correctAnswer: "VRRPv2",
    explanation: "VRRPv2 is the default protocol used for VRRP in Junos OS."
  },
  {
    id: 28,
    question: "Which command shows the system logs in Junos OS?",
    options: ["show log messages", "show system log", "show messages", "show events"],
    correctAnswer: "show log messages",
    explanation: "The 'show log messages' command displays system log messages in Junos OS."
  },
  {
    id: 29,
    question: "What is the purpose of the 'request system zeroize' command in Junos OS?",
    options: [
      "To erase all configuration and data",
      "To backup configuration",
      "To restore configuration",
      "To check system status"
    ],
    correctAnswer: "To erase all configuration and data",
    explanation: "The 'request system zeroize' command is used to erase all configuration and data in Junos OS."
  },
  {
    id: 30,
    question: "Which command shows the system users in Junos OS?",
    options: ["show system users", "show users", "show login", "show sessions"],
    correctAnswer: "show system users",
    explanation: "The 'show system users' command displays logged-in users in Junos OS."
  },
  {
    id: 31,
    question: "What is the default protocol used for IGMP in Junos OS?",
    options: ["IGMPv2", "IGMPv3", "IGMPv4", "IGMPv5"],
    correctAnswer: "IGMPv2",
    explanation: "IGMPv2 is the default protocol used for IGMP in Junos OS."
  },
  {
    id: 32,
    question: "Which command shows the system services in Junos OS?",
    options: ["show system services", "show services", "show daemons", "show processes"],
    correctAnswer: "show system services",
    explanation: "The 'show system services' command displays system services in Junos OS."
  },
  {
    id: 33,
    question: "What is the purpose of the 'request system snapshot' command in Junos OS?",
    options: [
      "To create a backup of the system",
      "To restore the system",
      "To check system status",
      "To update the system"
    ],
    correctAnswer: "To create a backup of the system",
    explanation: "The 'request system snapshot' command is used to create a backup of the Junos OS system."
  },
  {
    id: 34,
    question: "Which command shows the system security in Junos OS?",
    options: ["show security", "show system security", "show firewall", "show protection"],
    correctAnswer: "show security",
    explanation: "The 'show security' command displays security-related information in Junos OS."
  },
  {
    id: 35,
    question: "What is the default protocol used for SNMP in Junos OS?",
    options: ["SNMPv2c", "SNMPv3", "SNMPv4", "SNMPv5"],
    correctAnswer: "SNMPv2c",
    explanation: "SNMPv2c is the default protocol used for SNMP in Junos OS."
  },
  {
    id: 36,
    question: "Which command shows the system routing in Junos OS?",
    options: ["show route", "show routing", "show paths", "show nexthop"],
    correctAnswer: "show route",
    explanation: "The 'show route' command displays the routing table in Junos OS."
  },
  {
    id: 37,
    question: "What is the purpose of the 'request system halt' command in Junos OS?",
    options: [
      "To shut down the system",
      "To restart the system",
      "To check system status",
      "To update the system"
    ],
    correctAnswer: "To shut down the system",
    explanation: "The 'request system halt' command is used to shut down the Junos OS system."
  },
  {
    id: 38,
    question: "Which command shows the system interfaces in Junos OS?",
    options: ["show interfaces", "show interface", "show ports", "show links"],
    correctAnswer: "show interfaces",
    explanation: "The 'show interfaces' command displays interface information in Junos OS."
  },
  {
    id: 39,
    question: "What is the default protocol used for NTP in Junos OS?",
    options: ["NTPv3", "NTPv4", "NTPv5", "NTPv6"],
    correctAnswer: "NTPv4",
    explanation: "NTPv4 is the default protocol used for NTP in Junos OS."
  },
  {
    id: 40,
    question: "Which command shows the system configuration in Junos OS?",
    options: ["show configuration", "show config", "show running", "show current"],
    correctAnswer: "show configuration",
    explanation: "The 'show configuration' command displays the current configuration in Junos OS."
  },
  {
    id: 41,
    question: "What is the purpose of the Junos OS CLI?",
    options: [
      "To provide a command-line interface for system configuration and management",
      "To display system logs only",
      "To manage user accounts only",
      "To configure interfaces only"
    ],
    correctAnswer: "To provide a command-line interface for system configuration and management",
    explanation: "The Junos OS CLI provides a comprehensive interface for system configuration, management, and monitoring."
  },
  {
    id: 42,
    question: "What is the default configuration mode in Junos OS?",
    options: ["Operational mode", "Configuration mode", "Shell mode", "Monitor mode"],
    correctAnswer: "Operational mode",
    explanation: "Operational mode is the default mode in Junos OS, indicated by the '>' prompt."
  },
  {
    id: 43,
    question: "Which command is used to enter configuration mode in Junos OS?",
    options: ["configure", "edit", "config", "setup"],
    correctAnswer: "configure",
    explanation: "The 'configure' command is used to enter configuration mode in Junos OS."
  },
  {
    id: 44,
    question: "What is the purpose of a routing table in Junos OS?",
    options: [
      "To store and maintain routing information",
      "To manage system users",
      "To configure interfaces",
      "To display system logs"
    ],
    correctAnswer: "To store and maintain routing information",
    explanation: "The routing table stores and maintains routing information used to forward packets."
  },
  {
    id: 45,
    question: "Which routing protocol is used for internal routing in Junos OS?",
    options: ["OSPF", "BGP", "RIP", "IS-IS"],
    correctAnswer: "OSPF",
    explanation: "OSPF (Open Shortest Path First) is commonly used for internal routing in Junos OS."
  },
  {
    id: 46,
    question: "What is the purpose of a firewall filter in Junos OS?",
    options: [
      "To control packet flow and provide security",
      "To configure routing protocols",
      "To manage system users",
      "To display system logs"
    ],
    correctAnswer: "To control packet flow and provide security",
    explanation: "Firewall filters control packet flow and provide security by filtering traffic based on defined criteria."
  },
  {
    id: 47,
    question: "Which command shows the firewall filter configuration in Junos OS?",
    options: ["show firewall", "show filters", "show security", "show protection"],
    correctAnswer: "show firewall",
    explanation: "The 'show firewall' command displays firewall filter configuration in Junos OS."
  },
  {
    id: 48,
    question: "What is the purpose of the Junos OS architecture?",
    options: [
      "To separate control and forwarding planes",
      "To manage user accounts",
      "To configure interfaces",
      "To display system logs"
    ],
    correctAnswer: "To separate control and forwarding planes",
    explanation: "The Junos OS architecture separates the control plane (management) from the forwarding plane (data)."
  },
  {
    id: 49,
    question: "Which command shows the routing protocol configuration in Junos OS?",
    options: ["show protocols", "show routing", "show ospf", "show bgp"],
    correctAnswer: "show protocols",
    explanation: "The 'show protocols' command displays routing protocol configuration in Junos OS."
  },
  {
    id: 50,
    question: "What is the purpose of a security zone in Junos OS?",
    options: [
      "To define security boundaries",
      "To configure routing protocols",
      "To manage system users",
      "To display system logs"
    ],
    correctAnswer: "To define security boundaries",
    explanation: "Security zones define security boundaries and control traffic flow between different network segments."
  },
  {
    id: 51,
    question: "Which command shows the security zone configuration in Junos OS?",
    options: ["show security zones", "show zones", "show security", "show protection"],
    correctAnswer: "show security zones",
    explanation: "The 'show security zones' command displays security zone configuration in Junos OS."
  },
  {
    id: 52,
    question: "What is the purpose of the Junos OS configuration hierarchy?",
    options: [
      "To organize configuration statements in a logical structure",
      "To manage user accounts",
      "To configure interfaces",
      "To display system logs"
    ],
    correctAnswer: "To organize configuration statements in a logical structure",
    explanation: "The Junos OS configuration hierarchy organizes configuration statements in a logical, tree-like structure."
  },
  {
    id: 53,
    question: "Which command shows the interface configuration in Junos OS?",
    options: ["show interfaces", "show interface", "show ports", "show links"],
    correctAnswer: "show interfaces",
    explanation: "The 'show interfaces' command displays interface configuration in Junos OS."
  },
  {
    id: 54,
    question: "What is the purpose of a routing instance in Junos OS?",
    options: [
      "To create separate routing tables and protocols",
      "To manage user accounts",
      "To configure interfaces",
      "To display system logs"
    ],
    correctAnswer: "To create separate routing tables and protocols",
    explanation: "Routing instances allow for separate routing tables and protocols within a single device."
  },
  {
    id: 55,
    question: "Which command shows the routing instance configuration in Junos OS?",
    options: ["show routing-instances", "show instances", "show routing", "show tables"],
    correctAnswer: "show routing-instances",
    explanation: "The 'show routing-instances' command displays routing instance configuration in Junos OS."
  },
  {
    id: 56,
    question: "What is the purpose of a firewall filter in Junos OS?",
    options: [
      "To control packet flow and provide security",
      "To configure routing protocols",
      "To manage system users",
      "To display system logs"
    ],
    correctAnswer: "To control packet flow and provide security",
    explanation: "Firewall filters control packet flow and provide security by filtering traffic based on defined criteria."
  },
  {
    id: 57,
    question: "Which command shows the firewall filter configuration in Junos OS?",
    options: ["show firewall", "show filters", "show security", "show protection"],
    correctAnswer: "show firewall",
    explanation: "The 'show firewall' command displays firewall filter configuration in Junos OS."
  },
  {
    id: 58,
    question: "What is the purpose of the Junos OS CLI?",
    options: [
      "To provide a command-line interface for system configuration and management",
      "To display system logs only",
      "To manage user accounts only",
      "To configure interfaces only"
    ],
    correctAnswer: "To provide a command-line interface for system configuration and management",
    explanation: "The Junos OS CLI provides a comprehensive interface for system configuration, management, and monitoring."
  },
  {
    id: 59,
    question: "Which command shows the system configuration in Junos OS?",
    options: ["show configuration", "show config", "show running", "show current"],
    correctAnswer: "show configuration",
    explanation: "The 'show configuration' command displays the current configuration in Junos OS."
  },
  {
    id: 60,
    question: "What is the purpose of SD-WAN?",
    options: [
      "To provide software-defined wide area networking",
      "To encrypt network traffic",
      "To compress network data",
      "To authenticate network devices"
    ],
    correctAnswer: "To provide software-defined wide area networking",
    explanation: "SD-WAN (Software-Defined Wide Area Network) provides software-defined networking for wide area networks."
  },
  {
    id: 61,
    question: "What is the primary function of NFV?",
    options: [
      "To virtualize network functions",
      "To provide wireless connectivity",
      "To manage network security",
      "To optimize network performance"
    ],
    correctAnswer: "To virtualize network functions",
    explanation: "NFV (Network Functions Virtualization) virtualizes network functions that traditionally run on dedicated hardware."
  },
  {
    id: 62,
    question: "What is a man-in-the-middle attack?",
    options: [
      "Intercepting and altering communication",
      "Stealing passwords",
      "Installing malware",
      "Creating fake websites"
    ],
    correctAnswer: "Intercepting and altering communication",
    explanation: "A man-in-the-middle attack occurs when an attacker intercepts and potentially alters communication between two parties."
  },
  {
    id: 63,
    question: "What is the purpose of a VPN?",
    options: [
      "To create a secure connection over the internet",
      "To increase network speed",
      "To block websites",
      "To monitor network traffic"
    ],
    correctAnswer: "To create a secure connection over the internet",
    explanation: "A Virtual Private Network (VPN) creates a secure, encrypted connection over the internet to protect data transmission."
  },
  {
    id: 64,
    question: "What is a security token?",
    options: [
      "A physical or digital device for authentication",
      "A type of malware",
      "A network protocol",
      "A security policy"
    ],
    correctAnswer: "A physical or digital device for authentication",
    explanation: "A security token is a physical or digital device used to authenticate a user's identity."
  },
  {
    id: 65,
    question: "What is the purpose of a security policy?",
    options: [
      "To define security requirements and procedures",
      "To block network traffic",
      "To encrypt data",
      "To monitor user activity"
    ],
    correctAnswer: "To define security requirements and procedures",
    explanation: "A security policy defines the security requirements and procedures for an organization."
  },
  {
    id: 66,
    question: "What is a security incident?",
    options: [
      "A violation of security policies",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A violation of security policies",
    explanation: "A security incident is any violation of security policies or practices that could lead to unauthorized access or damage."
  },
  {
    id: 67,
    question: "What is a security audit?",
    options: [
      "A systematic evaluation of security controls",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A systematic evaluation of security controls",
    explanation: "A security audit is a systematic evaluation of security controls to ensure they are working as intended."
  },
  {
    id: 68,
    question: "What is a security control?",
    options: [
      "A measure to reduce security risks",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A measure to reduce security risks",
    explanation: "A security control is a measure implemented to reduce security risks and protect assets."
  },
  {
    id: 69,
    question: "What is a security assessment?",
    options: [
      "An evaluation of security posture",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "An evaluation of security posture",
    explanation: "A security assessment evaluates an organization's security posture and identifies areas for improvement."
  },
  {
    id: 70,
    question: "What is a security framework?",
    options: [
      "A structured approach to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A structured approach to security",
    explanation: "A security framework provides a structured approach to implementing and managing security controls."
  },
  {
    id: 71,
    question: "What is a security standard?",
    options: [
      "A documented security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A documented security requirement",
    explanation: "A security standard is a documented requirement that specifies security controls and practices."
  },
  {
    id: 72,
    question: "What is a security risk?",
    options: [
      "A potential threat to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential threat to security",
    explanation: "A security risk is a potential threat that could exploit a vulnerability and cause harm to an organization."
  },
  {
    id: 73,
    question: "What is a security threat?",
    options: [
      "A potential danger to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential danger to security",
    explanation: "A security threat is any potential danger that could exploit a vulnerability and cause harm."
  },
  {
    id: 74,
    question: "What is a security vulnerability?",
    options: [
      "A weakness in security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A weakness in security",
    explanation: "A security vulnerability is a weakness in a system that could be exploited by a threat."
  },
  {
    id: 75,
    question: "What is a security breach?",
    options: [
      "An unauthorized access to data",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "An unauthorized access to data",
    explanation: "A security breach occurs when an unauthorized party gains access to sensitive data."
  },
  {
    id: 76,
    question: "What is a security incident response?",
    options: [
      "A process to handle security incidents",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A process to handle security incidents",
    explanation: "Security incident response is the process of handling and managing security incidents when they occur."
  },
  {
    id: 77,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 78,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 79,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 80,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 81,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 82,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 83,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 84,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 85,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 86,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 87,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 88,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 89,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 90,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 91,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 92,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 93,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 94,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 95,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 96,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 97,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 98,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 99,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 100,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 101,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 102,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 103,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 104,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 105,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 106,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 107,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 108,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 109,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 110,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 111,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 112,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 113,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 114,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 115,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 116,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 117,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 118,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 119,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 120,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 121,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  }
];

// CCNA Questions (120 total)
export const ccnaQuestions: Question[] = [
  {
    id: 1,
    question: "What is the default administrative distance for static routes in Cisco IOS?",
    options: ["1", "5", "110", "120"],
    correctAnswer: "1",
    explanation: "In Cisco IOS, static routes have a default administrative distance of 1."
  },
  {
    id: 2,
    question: "Which command shows the routing table in Cisco IOS?",
    options: ["show ip route", "show route", "show routing-table", "show routes"],
    correctAnswer: "show ip route",
    explanation: "The correct command to view the routing table in Cisco IOS is 'show ip route'."
  },
  {
    id: 3,
    question: "What is the purpose of a VLAN in Cisco networking?",
    options: [
      "To separate broadcast domains",
      "To configure static routes",
      "To manage system users",
      "To configure interfaces"
    ],
    correctAnswer: "To separate broadcast domains",
    explanation: "VLANs allow for separate broadcast domains within a single switch."
  },
  {
    id: 4,
    question: "What is the default protocol used for OSPF in Cisco IOS?",
    options: ["OSPFv2", "OSPFv3", "OSPFv4", "OSPFv5"],
    correctAnswer: "OSPFv2",
    explanation: "OSPFv2 is the default protocol used for OSPF in Cisco IOS."
  },
  {
    id: 5,
    question: "Which command is used to save configuration changes in Cisco IOS?",
    options: ["copy running-config startup-config", "save", "write", "commit"],
    correctAnswer: "copy running-config startup-config",
    explanation: "The 'copy running-config startup-config' command is used to save configuration changes in Cisco IOS."
  },
  {
    id: 6,
    question: "What is the purpose of the 'reload' command in Cisco IOS?",
    options: [
      "To restart the device",
      "To save the current configuration",
      "To delete the current configuration",
      "To create a new configuration"
    ],
    correctAnswer: "To restart the device",
    explanation: "The 'reload' command is used to restart the Cisco device."
  },
  {
    id: 7,
    question: "Which protocol is used for BGP in Cisco IOS?",
    options: ["TCP", "UDP", "ICMP", "IP"],
    correctAnswer: "TCP",
    explanation: "BGP uses TCP as its transport protocol in Cisco IOS."
  },
  {
    id: 8,
    question: "What is the default hold time for BGP in Cisco IOS?",
    options: ["90 seconds", "120 seconds", "180 seconds", "240 seconds"],
    correctAnswer: "180 seconds",
    explanation: "The default hold time for BGP in Cisco IOS is 180 seconds."
  },
  {
    id: 9,
    question: "Which command shows the BGP neighbors in Cisco IOS?",
    options: ["show bgp neighbors", "show bgp peers", "show bgp summary", "show bgp status"],
    correctAnswer: "show bgp neighbors",
    explanation: "The 'show bgp neighbors' command displays BGP neighbor information in Cisco IOS."
  },
  {
    id: 10,
    question: "What is the purpose of the 'configure terminal' command in Cisco IOS?",
    options: [
      "To enter global configuration mode",
      "To display system information",
      "To delete configuration",
      "To save configuration"
    ],
    correctAnswer: "To enter global configuration mode",
    explanation: "The 'configure terminal' command is used to enter global configuration mode in Cisco IOS."
  },
  {
    id: 11,
    question: "Which command shows the interface status in Cisco IOS?",
    options: ["show interfaces", "show interface status", "show ports", "show links"],
    correctAnswer: "show interfaces",
    explanation: "The 'show interfaces' command displays interface status and configuration in Cisco IOS."
  },
  {
    id: 12,
    question: "What is the default protocol used for RIP in Cisco IOS?",
    options: ["RIPv1", "RIPv2", "RIPv3", "RIPv4"],
    correctAnswer: "RIPv2",
    explanation: "RIPv2 is the default protocol used for RIP in Cisco IOS."
  },
  {
    id: 13,
    question: "Which command shows the routing protocols in Cisco IOS?",
    options: ["show ip protocols", "show routing", "show routes", "show ospf"],
    correctAnswer: "show ip protocols",
    explanation: "The 'show ip protocols' command displays configured routing protocols in Cisco IOS."
  },
  {
    id: 14,
    question: "What is the purpose of the 'no' command in Cisco IOS?",
    options: [
      "To remove configuration statements",
      "To add configuration statements",
      "To modify configuration statements",
      "To save configuration statements"
    ],
    correctAnswer: "To remove configuration statements",
    explanation: "The 'no' command is used to remove configuration statements in Cisco IOS."
  },
  {
    id: 15,
    question: "Which command shows the system version in Cisco IOS?",
    options: ["show version", "show system", "show os", "show ios"],
    correctAnswer: "show version",
    explanation: "The 'show version' command displays the Cisco IOS version and system information."
  },
  {
    id: 16,
    question: "What is the default protocol used for EIGRP in Cisco IOS?",
    options: ["EIGRP", "OSPF", "RIP", "BGP"],
    correctAnswer: "EIGRP",
    explanation: "EIGRP is the default protocol used for EIGRP in Cisco IOS."
  },
  {
    id: 17,
    question: "Which command shows the system uptime in Cisco IOS?",
    options: ["show uptime", "show system uptime", "show system", "show time"],
    correctAnswer: "show uptime",
    explanation: "The 'show uptime' command displays the system uptime in Cisco IOS."
  },
  {
    id: 18,
    question: "What is the purpose of the 'enable' command in Cisco IOS?",
    options: [
      "To enter privileged EXEC mode",
      "To exit privileged EXEC mode",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To enter privileged EXEC mode",
    explanation: "The 'enable' command is used to enter privileged EXEC mode in Cisco IOS."
  },
  {
    id: 19,
    question: "Which command shows the system memory in Cisco IOS?",
    options: ["show memory", "show system memory", "show system", "show resources"],
    correctAnswer: "show memory",
    explanation: "The 'show memory' command displays system memory usage in Cisco IOS."
  },
  {
    id: 20,
    question: "What is the default protocol used for HSRP in Cisco IOS?",
    options: ["HSRPv1", "HSRPv2", "HSRPv3", "HSRPv4"],
    correctAnswer: "HSRPv1",
    explanation: "HSRPv1 is the default protocol used for HSRP in Cisco IOS."
  },
  {
    id: 21,
    question: "What is the purpose of the 'reload' command in Cisco IOS?",
    options: [
      "To restart the device",
      "To save the current configuration",
      "To delete the current configuration",
      "To create a new configuration"
    ],
    correctAnswer: "To restart the device",
    explanation: "The 'reload' command is used to restart the Cisco device."
  },
  {
    id: 22,
    question: "Which command shows the system storage in Cisco IOS?",
    options: ["show flash", "show storage", "show disk", "show filesystem"],
    correctAnswer: "show flash",
    explanation: "The 'show flash' command displays system storage usage in Cisco IOS."
  },
  {
    id: 23,
    question: "What is the default protocol used for LDP in Cisco IOS?",
    options: ["LDP", "RSVP", "MPLS", "BGP"],
    correctAnswer: "LDP",
    explanation: "LDP (Label Distribution Protocol) is the default protocol used for MPLS label distribution in Cisco IOS."
  },
  {
    id: 24,
    question: "Which command shows the system processes in Cisco IOS?",
    options: ["show processes", "show system processes", "show tasks", "show jobs"],
    correctAnswer: "show processes",
    explanation: "The 'show processes' command displays running system processes in Cisco IOS."
  },
  {
    id: 25,
    question: "What is the purpose of the 'copy tftp flash' command in Cisco IOS?",
    options: [
      "To copy a file from TFTP server to flash",
      "To copy a file from flash to TFTP server",
      "To copy a file from flash to running-config",
      "To copy a file from running-config to flash"
    ],
    correctAnswer: "To copy a file from TFTP server to flash",
    explanation: "The 'copy tftp flash' command is used to copy a file from a TFTP server to the flash memory in Cisco IOS."
  },
  {
    id: 26,
    question: "Which command shows the system alarms in Cisco IOS?",
    options: ["show alarms", "show system alarms", "show alerts", "show warnings"],
    correctAnswer: "show alarms",
    explanation: "The 'show alarms' command displays system alarms in Cisco IOS."
  },
  {
    id: 27,
    question: "What is the default protocol used for VRRP in Cisco IOS?",
    options: ["VRRPv2", "VRRPv3", "VRRPv4", "VRRPv5"],
    correctAnswer: "VRRPv2",
    explanation: "VRRPv2 is the default protocol used for VRRP in Cisco IOS."
  },
  {
    id: 28,
    question: "Which command shows the system logs in Cisco IOS?",
    options: ["show logging", "show system log", "show messages", "show events"],
    correctAnswer: "show logging",
    explanation: "The 'show logging' command displays system log messages in Cisco IOS."
  },
  {
    id: 29,
    question: "What is the purpose of the 'debug' command in Cisco IOS?",
    options: [
      "To troubleshoot network issues",
      "To configure interfaces",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To troubleshoot network issues",
    explanation: "The 'debug' command is used to troubleshoot network issues in Cisco IOS."
  },
  {
    id: 30,
    question: "Which command shows the system configuration in Cisco IOS?",
    options: ["show running-config", "show config", "show system", "show settings"],
    correctAnswer: "show running-config",
    explanation: "The 'show running-config' command displays the current system configuration in Cisco IOS."
  },
  {
    id: 31,
    question: "What is the purpose of the 'ping' command in Cisco IOS?",
    options: [
      "To test network connectivity",
      "To configure interfaces",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To test network connectivity",
    explanation: "The 'ping' command is used to test network connectivity in Cisco IOS."
  },
  {
    id: 32,
    question: "Which command shows the ARP table in Cisco IOS?",
    options: ["show arp", "show ip arp", "show arp table", "show ip arp table"],
    correctAnswer: "show arp",
    explanation: "The 'show arp' command displays the ARP table in Cisco IOS."
  },
  {
    id: 33,
    question: "What is the default protocol used for STP in Cisco IOS?",
    options: ["PVST+", "RSTP", "MSTP", "RPVST+"],
    correctAnswer: "PVST+",
    explanation: "PVST+ (Per-VLAN Spanning Tree Plus) is the default protocol used for STP in Cisco IOS."
  },
  {
    id: 34,
    question: "Which command shows the MAC address table in Cisco IOS?",
    options: ["show mac address-table", "show mac table", "show mac-address-table", "show mac-address"],
    correctAnswer: "show mac address-table",
    explanation: "The 'show mac address-table' command displays the MAC address table in Cisco IOS."
  },
  {
    id: 35,
    question: "What is the purpose of the 'traceroute' command in Cisco IOS?",
    options: [
      "To trace the path to a destination",
      "To configure interfaces",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To trace the path to a destination",
    explanation: "The 'traceroute' command is used to trace the path to a destination in Cisco IOS."
  },
  {
    id: 36,
    question: "Which command shows the CDP neighbors in Cisco IOS?",
    options: ["show cdp neighbors", "show neighbors", "show cdp", "show cdp neighbor"],
    correctAnswer: "show cdp neighbors",
    explanation: "The 'show cdp neighbors' command displays CDP neighbor information in Cisco IOS."
  },
  {
    id: 37,
    question: "What is the default protocol used for LLDP in Cisco IOS?",
    options: ["LLDP", "CDP", "FDP", "NDP"],
    correctAnswer: "LLDP",
    explanation: "LLDP (Link Layer Discovery Protocol) is the default protocol used for LLDP in Cisco IOS."
  },
  {
    id: 38,
    question: "Which command shows the LLDP neighbors in Cisco IOS?",
    options: ["show lldp neighbors", "show neighbors", "show lldp", "show lldp neighbor"],
    correctAnswer: "show lldp neighbors",
    explanation: "The 'show lldp neighbors' command displays LLDP neighbor information in Cisco IOS."
  },
  {
    id: 39,
    question: "What is the purpose of the 'telnet' command in Cisco IOS?",
    options: [
      "To establish a Telnet connection",
      "To configure interfaces",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To establish a Telnet connection",
    explanation: "The 'telnet' command is used to establish a Telnet connection in Cisco IOS."
  },
  {
    id: 40,
    question: "Which command shows the SSH sessions in Cisco IOS?",
    options: ["show ssh", "show sessions", "show ssh sessions", "show ssh connections"],
    correctAnswer: "show ssh",
    explanation: "The 'show ssh' command displays SSH session information in Cisco IOS."
  },
  {
    id: 41,
    question: "What is the purpose of the 'debug' command in Cisco IOS?",
    options: [
      "To troubleshoot network issues",
      "To configure interfaces",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To troubleshoot network issues",
    explanation: "The 'debug' command is used to troubleshoot network issues in Cisco IOS."
  },
  {
    id: 42,
    question: "Which command shows the interface status in Cisco IOS?",
    options: ["show interface", "show interfaces", "show interface status", "show interfaces status"],
    correctAnswer: "show interface",
    explanation: "The 'show interface' command displays interface status information in Cisco IOS."
  },
  {
    id: 43,
    question: "What is the default protocol used for EIGRP in Cisco IOS?",
    options: ["EIGRP", "OSPF", "RIP", "BGP"],
    correctAnswer: "EIGRP",
    explanation: "EIGRP (Enhanced Interior Gateway Routing Protocol) is the default protocol used for EIGRP in Cisco IOS."
  },
  {
    id: 44,
    question: "Which command shows the EIGRP neighbors in Cisco IOS?",
    options: ["show ip eigrp neighbors", "show eigrp neighbors", "show ip eigrp", "show eigrp"],
    correctAnswer: "show ip eigrp neighbors",
    explanation: "The 'show ip eigrp neighbors' command displays EIGRP neighbor information in Cisco IOS."
  },
  {
    id: 45,
    question: "What is the purpose of the 'copy' command in Cisco IOS?",
    options: [
      "To copy files",
      "To configure interfaces",
      "To save configuration",
      "To delete configuration"
    ],
    correctAnswer: "To copy files",
    explanation: "The 'copy' command is used to copy files in Cisco IOS."
  },
  {
    id: 46,
    question: "Which command shows the OSPF neighbors in Cisco IOS?",
    options: ["show ip ospf neighbor", "show ospf neighbor", "show ip ospf", "show ospf"],
    correctAnswer: "show ip ospf neighbor",
    explanation: "The 'show ip ospf neighbor' command displays OSPF neighbor information in Cisco IOS."
  },
  {
    id: 47,
    question: "What is the default protocol used for OSPF in Cisco IOS?",
    options: ["OSPFv2", "OSPFv3", "RIP", "BGP"],
    correctAnswer: "OSPFv2",
    explanation: "OSPFv2 is the default protocol used for OSPF in Cisco IOS."
  },
  {
    id: 48,
    question: "Which command shows the BGP neighbors in Cisco IOS?",
    options: ["show ip bgp neighbors", "show bgp neighbors", "show ip bgp", "show bgp"],
    correctAnswer: "show ip bgp neighbors",
    explanation: "The 'show ip bgp neighbors' command displays BGP neighbor information in Cisco IOS."
  },
  {
    id: 49,
    question: "What is the purpose of the 'delete' command in Cisco IOS?",
    options: [
      "To delete files",
      "To configure interfaces",
      "To save configuration",
      "To copy files"
    ],
    correctAnswer: "To delete files",
    explanation: "The 'delete' command is used to delete files in Cisco IOS."
  },
  {
    id: 50,
    question: "Which command shows the RIP neighbors in Cisco IOS?",
    options: ["show ip rip", "show rip", "show ip rip neighbors", "show rip neighbors"],
    correctAnswer: "show ip rip",
    explanation: "The 'show ip rip' command displays RIP information in Cisco IOS."
  },
  {
    id: 51,
    question: "What is the purpose of the 'reload' command in Cisco IOS?",
    options: [
      "To restart the device",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To restart the device",
    explanation: "The 'reload' command is used to restart the device in Cisco IOS."
  },
  {
    id: 52,
    question: "Which command shows the VLAN information in Cisco IOS?",
    options: ["show vlan", "show vlans", "show vlan brief", "show vlans brief"],
    correctAnswer: "show vlan",
    explanation: "The 'show vlan' command displays VLAN information in Cisco IOS."
  },
  {
    id: 53,
    question: "What is the default protocol used for VTP in Cisco IOS?",
    options: ["VTPv2", "VTPv3", "VTPv1", "VTPv4"],
    correctAnswer: "VTPv2",
    explanation: "VTPv2 is the default protocol used for VTP in Cisco IOS."
  },
  {
    id: 54,
    question: "Which command shows the VTP status in Cisco IOS?",
    options: ["show vtp status", "show vtp", "show vtp brief", "show vtp info"],
    correctAnswer: "show vtp status",
    explanation: "The 'show vtp status' command displays VTP status information in Cisco IOS."
  },
  {
    id: 55,
    question: "What is the purpose of the 'write' command in Cisco IOS?",
    options: [
      "To save configuration",
      "To delete configuration",
      "To copy files",
      "To restart the device"
    ],
    correctAnswer: "To save configuration",
    explanation: "The 'write' command is used to save configuration in Cisco IOS."
  },
  {
    id: 56,
    question: "Which command shows the spanning-tree information in Cisco IOS?",
    options: ["show spanning-tree", "show stp", "show spanning-tree brief", "show stp brief"],
    correctAnswer: "show spanning-tree",
    explanation: "The 'show spanning-tree' command displays spanning-tree information in Cisco IOS."
  },
  {
    id: 57,
    question: "What is the default protocol used for HSRP in Cisco IOS?",
    options: ["HSRPv1", "HSRPv2", "HSRPv3", "HSRPv4"],
    correctAnswer: "HSRPv1",
    explanation: "HSRPv1 is the default protocol used for HSRP in Cisco IOS."
  },
  {
    id: 58,
    question: "Which command shows the HSRP status in Cisco IOS?",
    options: ["show standby", "show hsrp", "show standby brief", "show hsrp brief"],
    correctAnswer: "show standby",
    explanation: "The 'show standby' command displays HSRP status information in Cisco IOS."
  },
  {
    id: 59,
    question: "What is the purpose of the 'erase' command in Cisco IOS?",
    options: [
      "To delete configuration",
      "To save configuration",
      "To copy files",
      "To restart the device"
    ],
    correctAnswer: "To delete configuration",
    explanation: "The 'erase' command is used to delete configuration in Cisco IOS."
  },
  {
    id: 60,
    question: "Which command shows the interface counters in Cisco IOS?",
    options: ["show interface counters", "show counters", "show interface", "show interfaces"],
    correctAnswer: "show interface counters",
    explanation: "The 'show interface counters' command displays interface counter information in Cisco IOS."
  },
  {
    id: 61,
    question: "What is the purpose of the 'debug' command in Cisco IOS?",
    options: [
      "To troubleshoot network issues",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To troubleshoot network issues",
    explanation: "The 'debug' command is used to troubleshoot network issues in Cisco IOS."
  },
  {
    id: 62,
    question: "Which command shows the EIGRP neighbor information in Cisco IOS?",
    options: ["show ip eigrp neighbors", "show eigrp neighbors", "show ip eigrp", "show eigrp"],
    correctAnswer: "show ip eigrp neighbors",
    explanation: "The 'show ip eigrp neighbors' command displays EIGRP neighbor information in Cisco IOS."
  },
  {
    id: 63,
    question: "What is the default protocol used for OSPF in Cisco IOS?",
    options: ["OSPFv2", "OSPFv3", "OSPFv1", "OSPFv4"],
    correctAnswer: "OSPFv2",
    explanation: "OSPFv2 is the default protocol used for OSPF in Cisco IOS."
  },
  {
    id: 64,
    question: "Which command shows the OSPF neighbor information in Cisco IOS?",
    options: ["show ip ospf neighbor", "show ospf neighbor", "show ip ospf", "show ospf"],
    correctAnswer: "show ip ospf neighbor",
    explanation: "The 'show ip ospf neighbor' command displays OSPF neighbor information in Cisco IOS."
  },
  {
    id: 65,
    question: "What is the purpose of the 'copy' command in Cisco IOS?",
    options: [
      "To copy files",
      "To save configuration",
      "To delete configuration",
      "To restart the device"
    ],
    correctAnswer: "To copy files",
    explanation: "The 'copy' command is used to copy files in Cisco IOS."
  },
  {
    id: 66,
    question: "Which command shows the BGP neighbor information in Cisco IOS?",
    options: ["show ip bgp neighbors", "show bgp neighbors", "show ip bgp", "show bgp"],
    correctAnswer: "show ip bgp neighbors",
    explanation: "The 'show ip bgp neighbors' command displays BGP neighbor information in Cisco IOS."
  },
  {
    id: 67,
    question: "What is the default protocol used for BGP in Cisco IOS?",
    options: ["BGPv4", "BGPv3", "BGPv2", "BGPv1"],
    correctAnswer: "BGPv4",
    explanation: "BGPv4 is the default protocol used for BGP in Cisco IOS."
  },
  {
    id: 68,
    question: "Which command shows the interface status in Cisco IOS?",
    options: ["show interface", "show interfaces", "show interface brief", "show interfaces brief"],
    correctAnswer: "show interface",
    explanation: "The 'show interface' command displays interface status information in Cisco IOS."
  },
  {
    id: 69,
    question: "What is the purpose of the 'delete' command in Cisco IOS?",
    options: [
      "To delete files",
      "To save configuration",
      "To copy files",
      "To restart the device"
    ],
    correctAnswer: "To delete files",
    explanation: "The 'delete' command is used to delete files in Cisco IOS."
  },
  {
    id: 70,
    question: "Which command shows the routing table in Cisco IOS?",
    options: ["show ip route", "show route", "show ip routes", "show routes"],
    correctAnswer: "show ip route",
    explanation: "The 'show ip route' command displays the routing table in Cisco IOS."
  },
  {
    id: 71,
    question: "What is the purpose of the 'ping' command in Cisco IOS?",
    options: [
      "To test network connectivity",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To test network connectivity",
    explanation: "The 'ping' command is used to test network connectivity in Cisco IOS."
  },
  {
    id: 72,
    question: "Which command shows the ARP table in Cisco IOS?",
    options: ["show arp", "show ip arp", "show arp table", "show ip arp table"],
    correctAnswer: "show arp",
    explanation: "The 'show arp' command displays the ARP table in Cisco IOS."
  },
  {
    id: 73,
    question: "What is the default protocol used for RIP in Cisco IOS?",
    options: ["RIPv2", "RIPv1", "RIPv3", "RIPv4"],
    correctAnswer: "RIPv2",
    explanation: "RIPv2 is the default protocol used for RIP in Cisco IOS."
  },
  {
    id: 74,
    question: "Which command shows the RIP neighbor information in Cisco IOS?",
    options: ["show ip rip neighbor", "show rip neighbor", "show ip rip", "show rip"],
    correctAnswer: "show ip rip neighbor",
    explanation: "The 'show ip rip neighbor' command displays RIP neighbor information in Cisco IOS."
  },
  {
    id: 75,
    question: "What is the purpose of the 'traceroute' command in Cisco IOS?",
    options: [
      "To trace the path to a destination",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To trace the path to a destination",
    explanation: "The 'traceroute' command is used to trace the path to a destination in Cisco IOS."
  },
  {
    id: 76,
    question: "Which command shows the MAC address table in Cisco IOS?",
    options: ["show mac address-table", "show mac table", "show mac-address table", "show mac-address-table"],
    correctAnswer: "show mac address-table",
    explanation: "The 'show mac address-table' command displays the MAC address table in Cisco IOS."
  },
  {
    id: 77,
    question: "What is the default protocol used for HSRP in Cisco IOS?",
    options: ["HSRPv1", "HSRPv2", "HSRPv3", "HSRPv4"],
    correctAnswer: "HSRPv1",
    explanation: "HSRPv1 is the default protocol used for HSRP in Cisco IOS."
  },
  {
    id: 78,
    question: "Which command shows the HSRP status in Cisco IOS?",
    options: ["show standby", "show hsrp", "show standby brief", "show hsrp brief"],
    correctAnswer: "show standby",
    explanation: "The 'show standby' command displays HSRP status information in Cisco IOS."
  },
  {
    id: 79,
    question: "What is the purpose of the 'telnet' command in Cisco IOS?",
    options: [
      "To establish a remote connection",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To establish a remote connection",
    explanation: "The 'telnet' command is used to establish a remote connection in Cisco IOS."
  },
  {
    id: 80,
    question: "Which command shows the VLAN information in Cisco IOS?",
    options: ["show vlan", "show vlans", "show vlan brief", "show vlans brief"],
    correctAnswer: "show vlan",
    explanation: "The 'show vlan' command displays VLAN information in Cisco IOS."
  },
  {
    id: 81,
    question: "What is the purpose of the 'ssh' command in Cisco IOS?",
    options: [
      "To establish a secure remote connection",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To establish a secure remote connection",
    explanation: "The 'ssh' command is used to establish a secure remote connection in Cisco IOS."
  },
  {
    id: 82,
    question: "Which command shows the spanning-tree information in Cisco IOS?",
    options: ["show spanning-tree", "show stp", "show spanning-tree brief", "show stp brief"],
    correctAnswer: "show spanning-tree",
    explanation: "The 'show spanning-tree' command displays spanning-tree information in Cisco IOS."
  },
  {
    id: 83,
    question: "What is the default protocol used for VRRP in Cisco IOS?",
    options: ["VRRPv2", "VRRPv1", "VRRPv3", "VRRPv4"],
    correctAnswer: "VRRPv2",
    explanation: "VRRPv2 is the default protocol used for VRRP in Cisco IOS."
  },
  {
    id: 84,
    question: "Which command shows the VRRP status in Cisco IOS?",
    options: ["show vrrp", "show vrrp brief", "show vrrp all", "show vrrp all brief"],
    correctAnswer: "show vrrp",
    explanation: "The 'show vrrp' command displays VRRP status information in Cisco IOS."
  },
  {
    id: 85,
    question: "What is the purpose of the 'copy' command in Cisco IOS?",
    options: [
      "To copy files",
      "To save configuration",
      "To delete configuration",
      "To establish a remote connection"
    ],
    correctAnswer: "To copy files",
    explanation: "The 'copy' command is used to copy files in Cisco IOS."
  },
  {
    id: 86,
    question: "Which command shows the interface counters in Cisco IOS?",
    options: ["show interface counters", "show counters", "show interface", "show interface stats"],
    correctAnswer: "show interface counters",
    explanation: "The 'show interface counters' command displays interface counters in Cisco IOS."
  },
  {
    id: 87,
    question: "What is the default protocol used for GLBP in Cisco IOS?",
    options: ["GLBPv1", "GLBPv2", "GLBPv3", "GLBPv4"],
    correctAnswer: "GLBPv1",
    explanation: "GLBPv1 is the default protocol used for GLBP in Cisco IOS."
  },
  {
    id: 88,
    question: "Which command shows the GLBP status in Cisco IOS?",
    options: ["show glbp", "show glbp brief", "show glbp all", "show glbp all brief"],
    correctAnswer: "show glbp",
    explanation: "The 'show glbp' command displays GLBP status information in Cisco IOS."
  },
  {
    id: 89,
    question: "What is the purpose of the 'delete' command in Cisco IOS?",
    options: [
      "To delete files",
      "To save configuration",
      "To copy files",
      "To establish a remote connection"
    ],
    correctAnswer: "To delete files",
    explanation: "The 'delete' command is used to delete files in Cisco IOS."
  },
  {
    id: 90,
    question: "Which command shows the access-list information in Cisco IOS?",
    options: ["show access-list", "show acl", "show access-lists", "show acls"],
    correctAnswer: "show access-list",
    explanation: "The 'show access-list' command displays access-list information in Cisco IOS."
  },
  {
    id: 91,
    question: "What is the purpose of the 'reload' command in Cisco IOS?",
    options: [
      "To restart the device",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To restart the device",
    explanation: "The 'reload' command is used to restart the device in Cisco IOS."
  },
  {
    id: 92,
    question: "Which command shows the CDP neighbor information in Cisco IOS?",
    options: ["show cdp neighbor", "show cdp", "show cdp neighbors", "show cdp all"],
    correctAnswer: "show cdp neighbor",
    explanation: "The 'show cdp neighbor' command displays CDP neighbor information in Cisco IOS."
  },
  {
    id: 93,
    question: "What is the default protocol used for OSPF in Cisco IOS?",
    options: ["OSPFv2", "OSPFv1", "OSPFv3", "OSPFv4"],
    correctAnswer: "OSPFv2",
    explanation: "OSPFv2 is the default protocol used for OSPF in Cisco IOS."
  },
  {
    id: 94,
    question: "Which command shows the OSPF database in Cisco IOS?",
    options: ["show ip ospf database", "show ospf db", "show ip ospf db", "show ospf database"],
    correctAnswer: "show ip ospf database",
    explanation: "The 'show ip ospf database' command displays OSPF database information in Cisco IOS."
  },
  {
    id: 95,
    question: "What is the purpose of the 'write' command in Cisco IOS?",
    options: [
      "To save configuration",
      "To restart the device",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To save configuration",
    explanation: "The 'write' command is used to save configuration in Cisco IOS."
  },
  {
    id: 96,
    question: "Which command shows the interface status in Cisco IOS?",
    options: ["show interface status", "show int status", "show interface", "show int"],
    correctAnswer: "show interface status",
    explanation: "The 'show interface status' command displays interface status in Cisco IOS."
  },
  {
    id: 97,
    question: "What is the default protocol used for BGP in Cisco IOS?",
    options: ["BGPv4", "BGPv3", "BGPv2", "BGPv1"],
    correctAnswer: "BGPv4",
    explanation: "BGPv4 is the default protocol used for BGP in Cisco IOS."
  },
  {
    id: 98,
    question: "Which command shows the BGP summary in Cisco IOS?",
    options: ["show ip bgp summary", "show bgp sum", "show ip bgp sum", "show bgp summary"],
    correctAnswer: "show ip bgp summary",
    explanation: "The 'show ip bgp summary' command displays BGP summary information in Cisco IOS."
  },
  {
    id: 99,
    question: "What is the purpose of the 'erase' command in Cisco IOS?",
    options: [
      "To delete startup configuration",
      "To save configuration",
      "To copy files",
      "To restart the device"
    ],
    correctAnswer: "To delete startup configuration",
    explanation: "The 'erase' command is used to delete startup configuration in Cisco IOS."
  },
  {
    id: 100,
    question: "Which command shows the interface errors in Cisco IOS?",
    options: ["show interface errors", "show errors", "show interface", "show int errors"],
    correctAnswer: "show interface errors",
    explanation: "The 'show interface errors' command displays interface errors in Cisco IOS."
  },
  {
    id: 101,
    question: "What is the purpose of the 'configure terminal' command in Cisco IOS?",
    options: [
      "To enter global configuration mode",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To enter global configuration mode",
    explanation: "The 'configure terminal' command is used to enter global configuration mode in Cisco IOS."
  },
  {
    id: 102,
    question: "Which command shows the interface description in Cisco IOS?",
    options: ["show interface description", "show int desc", "show interface", "show int"],
    correctAnswer: "show interface description",
    explanation: "The 'show interface description' command displays interface descriptions in Cisco IOS."
  },
  {
    id: 103,
    question: "What is the default protocol used for IS-IS in Cisco IOS?",
    options: ["IS-IS Level 1-2", "IS-IS Level 1", "IS-IS Level 2", "IS-IS Level 3"],
    correctAnswer: "IS-IS Level 1-2",
    explanation: "IS-IS Level 1-2 is the default protocol used for IS-IS in Cisco IOS."
  },
  {
    id: 104,
    question: "Which command shows the IS-IS database in Cisco IOS?",
    options: ["show isis database", "show isis db", "show ip isis database", "show ip isis db"],
    correctAnswer: "show isis database",
    explanation: "The 'show isis database' command displays IS-IS database information in Cisco IOS."
  },
  {
    id: 105,
    question: "What is the purpose of the 'end' command in Cisco IOS?",
    options: [
      "To exit configuration mode",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To exit configuration mode",
    explanation: "The 'end' command is used to exit configuration mode in Cisco IOS."
  },
  {
    id: 106,
    question: "Which command shows the interface statistics in Cisco IOS?",
    options: ["show interface statistics", "show int stats", "show interface", "show int"],
    correctAnswer: "show interface statistics",
    explanation: "The 'show interface statistics' command displays interface statistics in Cisco IOS."
  },
  {
    id: 107,
    question: "What is the default protocol used for EIGRP in Cisco IOS?",
    options: ["EIGRPv1", "EIGRPv2", "EIGRPv3", "EIGRPv4"],
    correctAnswer: "EIGRPv1",
    explanation: "EIGRPv1 is the default protocol used for EIGRP in Cisco IOS."
  },
  {
    id: 108,
    question: "Which command shows the EIGRP topology in Cisco IOS?",
    options: ["show ip eigrp topology", "show eigrp top", "show ip eigrp top", "show eigrp topology"],
    correctAnswer: "show ip eigrp topology",
    explanation: "The 'show ip eigrp topology' command displays EIGRP topology information in Cisco IOS."
  },
  {
    id: 109,
    question: "What is the purpose of the 'exit' command in Cisco IOS?",
    options: [
      "To exit current mode",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To exit current mode",
    explanation: "The 'exit' command is used to exit the current mode in Cisco IOS."
  },
  {
    id: 110,
    question: "Which command shows the interface IP information in Cisco IOS?",
    options: ["show ip interface", "show interface ip", "show ip int", "show int ip"],
    correctAnswer: "show ip interface",
    explanation: "The 'show ip interface' command displays interface IP information in Cisco IOS."
  },
  {
    id: 111,
    question: "What is the purpose of the 'enable' command in Cisco IOS?",
    options: [
      "To enter privileged EXEC mode",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To enter privileged EXEC mode",
    explanation: "The 'enable' command is used to enter privileged EXEC mode in Cisco IOS."
  },
  {
    id: 112,
    question: "Which command shows the interface bandwidth in Cisco IOS?",
    options: ["show interface bandwidth", "show int bw", "show interface", "show int"],
    correctAnswer: "show interface bandwidth",
    explanation: "The 'show interface bandwidth' command displays interface bandwidth in Cisco IOS."
  },
  {
    id: 113,
    question: "What is the default protocol used for PIM in Cisco IOS?",
    options: ["PIM-SM", "PIM-DM", "PIM-SSM", "PIM-BiDir"],
    correctAnswer: "PIM-SM",
    explanation: "PIM-SM (Sparse Mode) is the default protocol used for PIM in Cisco IOS."
  },
  {
    id: 114,
    question: "Which command shows the PIM neighbors in Cisco IOS?",
    options: ["show ip pim neighbor", "show pim nei", "show ip pim nei", "show pim neighbor"],
    correctAnswer: "show ip pim neighbor",
    explanation: "The 'show ip pim neighbor' command displays PIM neighbor information in Cisco IOS."
  },
  {
    id: 115,
    question: "What is the purpose of the 'disable' command in Cisco IOS?",
    options: [
      "To exit privileged EXEC mode",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To exit privileged EXEC mode",
    explanation: "The 'disable' command is used to exit privileged EXEC mode in Cisco IOS."
  },
  {
    id: 116,
    question: "Which command shows the interface MTU in Cisco IOS?",
    options: ["show interface mtu", "show int mtu", "show interface", "show int"],
    correctAnswer: "show interface mtu",
    explanation: "The 'show interface mtu' command displays interface MTU in Cisco IOS."
  },
  {
    id: 117,
    question: "What is the default protocol used for MPLS in Cisco IOS?",
    options: ["LDP", "TDP", "RSVP", "CR-LDP"],
    correctAnswer: "LDP",
    explanation: "LDP (Label Distribution Protocol) is the default protocol used for MPLS in Cisco IOS."
  },
  {
    id: 118,
    question: "Which command shows the MPLS forwarding table in Cisco IOS?",
    options: ["show mpls forwarding-table", "show mpls fwd", "show mpls ft", "show mpls forward"],
    correctAnswer: "show mpls forwarding-table",
    explanation: "The 'show mpls forwarding-table' command displays MPLS forwarding table in Cisco IOS."
  },
  {
    id: 119,
    question: "What is the purpose of the 'clock set' command in Cisco IOS?",
    options: [
      "To set system clock",
      "To save configuration",
      "To delete configuration",
      "To copy files"
    ],
    correctAnswer: "To set system clock",
    explanation: "The 'clock set' command is used to set the system clock in Cisco IOS."
  },
  {
    id: 120,
    question: "Which command shows the interface queue in Cisco IOS?",
    options: ["show interface queue", "show int queue", "show interface", "show int"],
    correctAnswer: "show interface queue",
    explanation: "The 'show interface queue' command displays interface queue information in Cisco IOS."
  }
];

// Security+ Questions (120 total)
export const securityQuestions: Question[] = [
  {
    id: 1,
    question: "What is a honeypot?",
    options: [
      "A decoy system",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A decoy system",
    explanation: "A honeypot is a decoy system designed to attract and detect attackers, allowing security teams to study their methods."
  },
  {
    id: 2,
    question: "What is the primary purpose of a firewall?",
    options: [
      "To control network traffic",
      "To encrypt data",
      "To authenticate users",
      "To scan for viruses"
    ],
    correctAnswer: "To control network traffic",
    explanation: "A firewall's primary purpose is to control and monitor network traffic based on predetermined security rules."
  },
  {
    id: 3,
    question: "What is multi-factor authentication?",
    options: [
      "Using multiple methods to verify identity",
      "Using multiple passwords",
      "Using multiple usernames",
      "Using multiple security questions"
    ],
    correctAnswer: "Using multiple methods to verify identity",
    explanation: "Multi-factor authentication requires users to provide multiple forms of verification to prove their identity."
  },
  {
    id: 4,
    question: "What is a zero-day vulnerability?",
    options: [
      "A previously unknown security flaw",
      "A known security flaw",
      "A fixed security flaw",
      "A minor security flaw"
    ],
    correctAnswer: "A previously unknown security flaw",
    explanation: "A zero-day vulnerability is a security flaw that is unknown to the software vendor and has no available patch."
  },
  {
    id: 5,
    question: "What is the purpose of encryption?",
    options: [
      "To protect data confidentiality",
      "To increase data speed",
      "To compress data",
      "To organize data"
    ],
    correctAnswer: "To protect data confidentiality",
    explanation: "Encryption is used to protect data confidentiality by converting it into a secure format that can only be read with the proper key."
  },
  {
    id: 6,
    question: "What is a DDoS attack?",
    options: [
      "Overwhelming a system with traffic",
      "Stealing user credentials",
      "Installing malware",
      "Encrypting files"
    ],
    correctAnswer: "Overwhelming a system with traffic",
    explanation: "A Distributed Denial of Service (DDoS) attack overwhelms a system with traffic from multiple sources."
  },
  {
    id: 7,
    question: "What is social engineering?",
    options: [
      "Manipulating people to gain access",
      "Hacking computer systems",
      "Writing malicious code",
      "Breaking encryption"
    ],
    correctAnswer: "Manipulating people to gain access",
    explanation: "Social engineering involves manipulating people into revealing confidential information or performing actions that compromise security."
  },
  {
    id: 8,
    question: "What is a vulnerability assessment?",
    options: [
      "Identifying security weaknesses",
      "Testing network speed",
      "Checking system performance",
      "Monitoring user activity"
    ],
    correctAnswer: "Identifying security weaknesses",
    explanation: "A vulnerability assessment is the process of identifying, quantifying, and prioritizing security weaknesses in a system."
  },
  {
    id: 9,
    question: "What is the principle of least privilege?",
    options: [
      "Giving minimum necessary access",
      "Giving full access to all",
      "Giving temporary access",
      "Giving conditional access"
    ],
    correctAnswer: "Giving minimum necessary access",
    explanation: "The principle of least privilege means giving users only the minimum level of access necessary to perform their job functions."
  },
  {
    id: 10,
    question: "What is a security baseline?",
    options: [
      "A minimum security standard",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security standard",
    explanation: "A security baseline is a minimum security standard that defines the basic security requirements for a system or network."
  },
  {
    id: 11,
    question: "What is a man-in-the-middle attack?",
    options: [
      "Intercepting and altering communication",
      "Stealing passwords",
      "Installing malware",
      "Creating fake websites"
    ],
    correctAnswer: "Intercepting and altering communication",
    explanation: "A man-in-the-middle attack occurs when an attacker intercepts and potentially alters communication between two parties."
  },
  {
    id: 12,
    question: "What is the purpose of a VPN?",
    options: [
      "To create a secure connection over the internet",
      "To increase network speed",
      "To block websites",
      "To monitor network traffic"
    ],
    correctAnswer: "To create a secure connection over the internet",
    explanation: "A Virtual Private Network (VPN) creates a secure, encrypted connection over the internet to protect data transmission."
  },
  {
    id: 13,
    question: "What is a security token?",
    options: [
      "A physical or digital device for authentication",
      "A type of malware",
      "A network protocol",
      "A security policy"
    ],
    correctAnswer: "A physical or digital device for authentication",
    explanation: "A security token is a physical or digital device used to authenticate a user's identity."
  },
  {
    id: 14,
    question: "What is the purpose of a security policy?",
    options: [
      "To define security requirements and procedures",
      "To block network traffic",
      "To encrypt data",
      "To monitor user activity"
    ],
    correctAnswer: "To define security requirements and procedures",
    explanation: "A security policy defines the security requirements and procedures for an organization."
  },
  {
    id: 15,
    question: "What is a security incident?",
    options: [
      "A violation of security policies",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A violation of security policies",
    explanation: "A security incident is any violation of security policies or practices that could lead to unauthorized access or damage."
  },
  {
    id: 16,
    question: "What is a security audit?",
    options: [
      "A systematic evaluation of security controls",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A systematic evaluation of security controls",
    explanation: "A security audit is a systematic evaluation of security controls to ensure they are working as intended."
  },
  {
    id: 17,
    question: "What is a security control?",
    options: [
      "A measure to reduce security risks",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A measure to reduce security risks",
    explanation: "A security control is a measure implemented to reduce security risks and protect assets."
  },
  {
    id: 18,
    question: "What is a security assessment?",
    options: [
      "An evaluation of security posture",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "An evaluation of security posture",
    explanation: "A security assessment evaluates an organization's security posture and identifies areas for improvement."
  },
  {
    id: 19,
    question: "What is a security framework?",
    options: [
      "A structured approach to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A structured approach to security",
    explanation: "A security framework provides a structured approach to implementing and managing security controls."
  },
  {
    id: 20,
    question: "What is a security standard?",
    options: [
      "A documented security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A documented security requirement",
    explanation: "A security standard is a documented requirement that specifies security controls and practices."
  },
  {
    id: 21,
    question: "What is a security risk?",
    options: [
      "A potential threat to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential threat to security",
    explanation: "A security risk is a potential threat that could exploit a vulnerability and cause harm to an organization."
  },
  {
    id: 22,
    question: "What is a security threat?",
    options: [
      "A potential danger to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential danger to security",
    explanation: "A security threat is any potential danger that could exploit a vulnerability and cause harm."
  },
  {
    id: 23,
    question: "What is a security vulnerability?",
    options: [
      "A weakness in security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A weakness in security",
    explanation: "A security vulnerability is a weakness in a system that could be exploited by a threat."
  },
  {
    id: 24,
    question: "What is a security breach?",
    options: [
      "An unauthorized access to data",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "An unauthorized access to data",
    explanation: "A security breach occurs when an unauthorized party gains access to sensitive data."
  },
  {
    id: 25,
    question: "What is a security incident response?",
    options: [
      "A process to handle security incidents",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A process to handle security incidents",
    explanation: "Security incident response is the process of handling and managing security incidents when they occur."
  },
  {
    id: 26,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 27,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 28,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 29,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 30,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 31,
    question: "What is a security risk assessment?",
    options: [
      "A process to identify and evaluate security risks",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A process to identify and evaluate security risks",
    explanation: "A security risk assessment is a systematic process to identify and evaluate potential security risks to an organization."
  },
  {
    id: 32,
    question: "What is a security audit?",
    options: [
      "A systematic evaluation of security controls",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A systematic evaluation of security controls",
    explanation: "A security audit is a systematic evaluation of security controls to ensure they are working as intended."
  },
  {
    id: 33,
    question: "What is a security incident response plan?",
    options: [
      "A documented approach to handling security incidents",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A documented approach to handling security incidents",
    explanation: "A security incident response plan is a documented approach that outlines how an organization will detect, respond to, and recover from security incidents."
  },
  {
    id: 34,
    question: "What is a security awareness program?",
    options: [
      "A program to educate users about security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A program to educate users about security",
    explanation: "A security awareness program is designed to educate users about security risks and best practices."
  },
  {
    id: 35,
    question: "What is a security policy?",
    options: [
      "A document that outlines security requirements",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A document that outlines security requirements",
    explanation: "A security policy is a document that outlines an organization's security requirements and procedures."
  },
  {
    id: 36,
    question: "What is a security control?",
    options: [
      "A measure to reduce security risks",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A measure to reduce security risks",
    explanation: "A security control is a measure implemented to reduce security risks and protect assets."
  },
  {
    id: 37,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 38,
    question: "What is a security framework?",
    options: [
      "A structured approach to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A structured approach to security",
    explanation: "A security framework provides a structured approach to implementing and managing security controls."
  },
  {
    id: 39,
    question: "What is a security standard?",
    options: [
      "A documented security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A documented security requirement",
    explanation: "A security standard is a documented requirement that specifies security controls and practices."
  },
  {
    id: 40,
    question: "What is a security risk?",
    options: [
      "A potential threat to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential threat to security",
    explanation: "A security risk is a potential threat that could exploit a vulnerability and cause harm to an organization."
  },
  {
    id: 41,
    question: "What is a security threat?",
    options: [
      "A potential danger to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential danger to security",
    explanation: "A security threat is any potential danger that could exploit a vulnerability and cause harm."
  },
  {
    id: 42,
    question: "What is a security vulnerability?",
    options: [
      "A weakness in security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A weakness in security",
    explanation: "A security vulnerability is a weakness in a system that could be exploited by a threat."
  },
  {
    id: 43,
    question: "What is a security breach?",
    options: [
      "An unauthorized access to data",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "An unauthorized access to data",
    explanation: "A security breach occurs when an unauthorized party gains access to sensitive data."
  },
  {
    id: 44,
    question: "What is a security incident response?",
    options: [
      "A process to handle security incidents",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A process to handle security incidents",
    explanation: "Security incident response is the process of handling and managing security incidents when they occur."
  },
  {
    id: 45,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 46,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 47,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 48,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 49,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 50,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 51,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 52,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 53,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 54,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 55,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 56,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 57,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 58,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 59,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 60,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 61,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 62,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 63,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 64,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 65,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 66,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 67,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 68,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 69,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 70,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 71,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 72,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 73,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 74,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 75,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 76,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 77,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 78,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 79,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 80,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 81,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 82,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 83,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 84,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 85,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 86,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 87,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 88,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 89,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 90,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 91,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 92,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 93,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 94,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 95,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 96,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 97,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 98,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 99,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 100,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 101,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 102,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 103,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 104,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 105,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 106,
    question: "What is a security procedure?",
    options: [
      "A step-by-step security process",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A step-by-step security process",
    explanation: "A security procedure is a step-by-step process that describes how to implement security controls."
  },
  {
    id: 107,
    question: "What is a security guideline?",
    options: [
      "A recommended security practice",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A recommended security practice",
    explanation: "A security guideline is a recommended practice that provides guidance on how to implement security controls."
  },
  {
    id: 108,
    question: "What is a security standard?",
    options: [
      "A mandatory security requirement",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A mandatory security requirement",
    explanation: "A security standard is a mandatory requirement that specifies how security controls should be implemented."
  },
  {
    id: 109,
    question: "What is a security baseline?",
    options: [
      "A minimum security configuration",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A minimum security configuration",
    explanation: "A security baseline is a minimum security configuration that defines the basic security requirements for a system."
  },
  {
    id: 110,
    question: "What is a security policy?",
    options: [
      "A set of security rules",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A set of security rules",
    explanation: "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets."
  },
  {
    id: 111,
    question: "What is the purpose of a security audit?",
    options: [
      "To evaluate security controls",
      "To implement security tools",
      "To monitor network traffic",
      "To configure firewalls"
    ],
    correctAnswer: "To evaluate security controls",
    explanation: "A security audit is performed to evaluate the effectiveness of security controls and ensure compliance with security policies."
  },
  {
    id: 112,
    question: "What is a security assessment?",
    options: [
      "A comprehensive security review",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A comprehensive security review",
    explanation: "A security assessment is a comprehensive review of an organization's security posture and controls."
  },
  {
    id: 113,
    question: "What is a security framework?",
    options: [
      "A structured approach to security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A structured approach to security",
    explanation: "A security framework is a structured approach to implementing and managing security controls."
  },
  {
    id: 114,
    question: "What is a security control?",
    options: [
      "A safeguard or countermeasure",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A safeguard or countermeasure",
    explanation: "A security control is a safeguard or countermeasure designed to protect assets and ensure security objectives."
  },
  {
    id: 115,
    question: "What is a security risk?",
    options: [
      "A potential for loss or harm",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential for loss or harm",
    explanation: "A security risk is the potential for loss or harm resulting from a threat exploiting a vulnerability."
  },
  {
    id: 116,
    question: "What is a security threat?",
    options: [
      "A potential cause of harm",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A potential cause of harm",
    explanation: "A security threat is any potential cause of an unwanted incident that may result in harm to a system or organization."
  },
  {
    id: 117,
    question: "What is a security vulnerability?",
    options: [
      "A weakness that can be exploited",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A weakness that can be exploited",
    explanation: "A security vulnerability is a weakness that can be exploited by a threat to cause harm."
  },
  {
    id: 118,
    question: "What is a security breach?",
    options: [
      "An incident that compromises security",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "An incident that compromises security",
    explanation: "A security breach is an incident that results in unauthorized access to or disclosure of protected assets."
  },
  {
    id: 119,
    question: "What is incident response?",
    options: [
      "A plan to handle security incidents",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "A plan to handle security incidents",
    explanation: "Incident response is a plan and process for detecting, responding to, and recovering from security incidents."
  },
  {
    id: 120,
    question: "What is security awareness?",
    options: [
      "Understanding security responsibilities",
      "A security tool",
      "A monitoring service",
      "A network device"
    ],
    correctAnswer: "Understanding security responsibilities",
    explanation: "Security awareness is understanding security risks and responsibilities to protect organizational assets."
  }
];

// SC-205 Questions (120 total)
export const sc205Questions: Question[] = [
  {
    id: 1,
    question: "What is Azure Sentinel?",
    options: [
      "A SIEM solution",
      "A SOAR solution",
      "Both SIEM and SOAR",
      "Neither"
    ],
    correctAnswer: "Both SIEM and SOAR",
    explanation: "Azure Sentinel is both a Security Information and Event Management (SIEM) and Security Orchestration, Automation, and Response (SOAR) solution."
  },
  {
    id: 2,
    question: "What is Azure Defender?",
    options: [
      "A cloud security solution",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A cloud security solution",
    explanation: "Azure Defender is a cloud security solution that provides threat protection across Azure resources."
  },
  {
    id: 3,
    question: "What is Microsoft Defender for Endpoint?",
    options: [
      "An endpoint security platform",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "An endpoint security platform",
    explanation: "Microsoft Defender for Endpoint is an enterprise endpoint security platform designed to help prevent, detect, and respond to advanced threats."
  },
  {
    id: 4,
    question: "What is Azure Security Center?",
    options: [
      "A unified security management system",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A unified security management system",
    explanation: "Azure Security Center is a unified security management system that strengthens the security posture of your data centers."
  },
  {
    id: 5,
    question: "What is Microsoft Cloud App Security?",
    options: [
      "A cloud access security broker",
      "A network firewall",
      "A data backup service",
      "A user authentication system"
    ],
    correctAnswer: "A cloud access security broker",
    explanation: "Microsoft Cloud App Security is a cloud access security broker that helps you discover and control the use of cloud apps in your organization."
  },
  {
    id: 6,
    question: "What is Azure Active Directory?",
    options: [
      "A cloud-based identity service",
      "A network monitoring tool",
      "A data backup service",
      "A security information system"
    ],
    correctAnswer: "A cloud-based identity service",
    explanation: "Azure Active Directory is Microsoft's cloud-based identity and access management service."
  },
  {
    id: 7,
    question: "What is Azure Information Protection?",
    options: [
      "A data protection solution",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A data protection solution",
    explanation: "Azure Information Protection helps you classify and protect your documents and emails by applying labels."
  },
  {
    id: 8,
    question: "What is Microsoft Defender for Identity?",
    options: [
      "An identity protection solution",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "An identity protection solution",
    explanation: "Microsoft Defender for Identity is a cloud-based security solution that uses your on-premises Active Directory signals to identify, detect, and investigate advanced threats."
  },
  {
    id: 9,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 10,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 11,
    question: "What is Azure Monitor?",
    options: [
      "A comprehensive monitoring solution",
      "A network security tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A comprehensive monitoring solution",
    explanation: "Azure Monitor is a comprehensive solution for collecting, analyzing, and acting on telemetry from your cloud and on-premises environments."
  },
  {
    id: 12,
    question: "What is Azure Policy?",
    options: [
      "A service for creating and managing policies",
      "A network monitoring tool",
      "A data backup service",
      "A security information system"
    ],
    correctAnswer: "A service for creating and managing policies",
    explanation: "Azure Policy helps you enforce organizational standards and assess compliance at scale."
  },
  {
    id: 13,
    question: "What is Azure Blueprints?",
    options: [
      "A service for orchestrating the deployment of resources",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for orchestrating the deployment of resources",
    explanation: "Azure Blueprints enables cloud architects to define a repeatable set of Azure resources that implements and adheres to an organization's standards, patterns, and requirements."
  },
  {
    id: 14,
    question: "What is Azure Key Vault?",
    options: [
      "A service for managing cryptographic keys and secrets",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for managing cryptographic keys and secrets",
    explanation: "Azure Key Vault helps safeguard cryptographic keys and secrets used by cloud applications and services."
  },
  {
    id: 15,
    question: "What is Azure Private Link?",
    options: [
      "A service for private connectivity to Azure services",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private connectivity to Azure services",
    explanation: "Azure Private Link provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 16,
    question: "What is Azure Security Benchmark?",
    options: [
      "A set of security best practices",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A set of security best practices",
    explanation: "Azure Security Benchmark provides security best practices and recommendations for Azure services."
  },
  {
    id: 17,
    question: "What is Azure Defender for Cloud?",
    options: [
      "A cloud security posture management solution",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A cloud security posture management solution",
    explanation: "Azure Defender for Cloud helps you strengthen your security posture and protect against threats."
  },
  {
    id: 18,
    question: "What is Azure DDoS Protection?",
    options: [
      "A service to protect against DDoS attacks",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service to protect against DDoS attacks",
    explanation: "Azure DDoS Protection helps protect your Azure resources from distributed denial of service (DDoS) attacks."
  },
  {
    id: 19,
    question: "What is Azure Firewall?",
    options: [
      "A managed cloud-based network security service",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A managed cloud-based network security service",
    explanation: "Azure Firewall is a managed, cloud-based network security service that protects your Azure Virtual Network resources."
  },
  {
    id: 20,
    question: "What is Azure Network Security Groups?",
    options: [
      "A service to filter network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service to filter network traffic",
    explanation: "Azure Network Security Groups (NSGs) filter network traffic to and from Azure resources in an Azure virtual network."
  },
  {
    id: 21,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 22,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 23,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 24,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 25,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 26,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 27,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 28,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 29,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 30,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 31,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 32,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 33,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 34,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 35,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 36,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 37,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 38,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 39,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 40,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 41,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 42,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 43,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 44,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 45,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 46,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 47,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 48,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 49,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 50,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 51,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 52,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 53,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 54,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 55,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 56,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 57,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 58,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 59,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 60,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 61,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 62,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 63,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 64,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 65,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 66,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 67,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 68,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 69,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 70,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 71,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 72,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 73,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 74,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 75,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 76,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 77,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 78,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 79,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 80,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 81,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 82,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 83,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 84,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 85,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 86,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 87,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 88,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 89,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 90,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 91,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 92,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 93,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 94,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 95,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 96,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 97,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 98,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 99,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 100,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 101,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 102,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 103,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 104,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 105,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 106,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 107,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 108,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 109,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 110,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 111,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 112,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 113,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 114,
    question: "What is Azure Load Balancer?",
    options: [
      "A service for distributing network traffic",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for distributing network traffic",
    explanation: "Azure Load Balancer distributes incoming network traffic across multiple backend resources."
  },
  {
    id: 115,
    question: "What is Azure Traffic Manager?",
    options: [
      "A DNS-based traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A user management system"
    ],
    correctAnswer: "A DNS-based traffic load balancer",
    explanation: "Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic optimally across global Azure regions."
  },
  {
    id: 116,
    question: "What is Azure Front Door?",
    options: [
      "A global, scalable entry-point for web applications",
      "A network security tool",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A global, scalable entry-point for web applications",
    explanation: "Azure Front Door is a global, scalable entry-point for web applications that provides fast, secure, and highly available access."
  },
  {
    id: 117,
    question: "What is Azure Application Gateway?",
    options: [
      "A web traffic load balancer",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A web traffic load balancer",
    explanation: "Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications."
  },
  {
    id: 118,
    question: "What is Azure Bastion?",
    options: [
      "A service for secure RDP and SSH access",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for secure RDP and SSH access",
    explanation: "Azure Bastion provides secure and seamless RDP and SSH connectivity to your virtual machines directly in the Azure portal."
  },
  {
    id: 119,
    question: "What is Azure Private Endpoint?",
    options: [
      "A service for private connectivity",
      "A network firewall",
      "A cloud storage service",
      "A user authentication system"
    ],
    correctAnswer: "A service for private connectivity",
    explanation: "Azure Private Endpoint provides private connectivity to Azure services, keeping your data on the Microsoft network."
  },
  {
    id: 120,
    question: "What is Azure Virtual Network?",
    options: [
      "A service for creating private networks",
      "A network monitoring tool",
      "A data backup service",
      "A cloud storage service"
    ],
    correctAnswer: "A service for creating private networks",
    explanation: "Azure Virtual Network enables you to create private networks in the cloud and connect them to your on-premises network."
  },
  {
    id: 121,
    question: "What is Azure ExpressRoute?",
    options: [
      "A service for private network connections",
      "A network security tool",
      "A monitoring service",
      "A cost management tool"
    ],
    correctAnswer: "A service for private network connections",
    explanation: "Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection."
  },
  {
    id: 111,
    question: "What is Azure Security Center?",
    options: [
      "A unified security management system",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A unified security management system",
    explanation: "Azure Security Center is a unified security management system that strengthens the security posture of your data centers and provides advanced threat protection across your hybrid workloads in the cloud."
  },
  {
    id: 112,
    question: "What is Azure Key Vault?",
    options: [
      "A secrets management service",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A secrets management service",
    explanation: "Azure Key Vault is a cloud service for securely storing and accessing secrets, such as API keys, passwords, certificates, and cryptographic keys."
  },
  {
    id: 113,
    question: "What is Azure Information Protection?",
    options: [
      "A data protection solution",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A data protection solution",
    explanation: "Azure Information Protection helps organizations classify and protect documents and emails by applying labels that can be configured to encrypt content and restrict access."
  },
  {
    id: 114,
    question: "What is Azure Active Directory?",
    options: [
      "A cloud-based identity service",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A cloud-based identity service",
    explanation: "Azure Active Directory is Microsoft's cloud-based identity and access management service that helps employees sign in and access resources."
  },
  {
    id: 115,
    question: "What is Azure Policy?",
    options: [
      "A service for creating and managing policies",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A service for creating and managing policies",
    explanation: "Azure Policy helps to enforce organizational standards and assess compliance at scale through policy definitions and assignments."
  },
  {
    id: 116,
    question: "What is Azure Blueprints?",
    options: [
      "A service for creating and managing blueprints",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A service for creating and managing blueprints",
    explanation: "Azure Blueprints enables cloud architects and central information technology groups to define a repeatable set of Azure resources that implements and adheres to an organization's standards, patterns, and requirements."
  },
  {
    id: 117,
    question: "What is Azure Monitor?",
    options: [
      "A comprehensive monitoring solution",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A comprehensive monitoring solution",
    explanation: "Azure Monitor provides comprehensive monitoring of your Azure resources, applications, and networks, collecting and analyzing telemetry from cloud and on-premises environments."
  },
  {
    id: 118,
    question: "What is Azure Log Analytics?",
    options: [
      "A log management and analytics service",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A log management and analytics service",
    explanation: "Azure Log Analytics is a service that helps you collect and analyze data generated by resources in your cloud and on-premises environments."
  },
  {
    id: 119,
    question: "What is Azure Application Insights?",
    options: [
      "An application performance monitoring service",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "An application performance monitoring service",
    explanation: "Azure Application Insights is an extensible Application Performance Management (APM) service for web developers on multiple platforms."
  },
  {
    id: 120,
    question: "What is Azure Network Watcher?",
    options: [
      "A network monitoring and diagnostic service",
      "A network security tool",
      "A monitoring service",
      "A firewall solution"
    ],
    correctAnswer: "A network monitoring and diagnostic service",
    explanation: "Azure Network Watcher provides tools to monitor, diagnose, view metrics, and enable or disable logs for resources in an Azure virtual network."
  }
];

export const examQuestions: ExamQuestions = {
  jncia: jnciaQuestions,
  ccna: ccnaQuestions,
  security: securityQuestions,
  sc205: sc205Questions
}; 