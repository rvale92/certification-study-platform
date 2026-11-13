import { awsSaaQuestions } from './awsQuestions';

export type CertificationId = 'aws-saa-c03' | 'jncia' | 'ccna' | 'security-plus' | 'sc-200';

export interface Question { id: string; question: string; options: string[]; correctAnswer: string; explanation: string; domain: string; distractorExplanations?: Record<string, string>; }

export type ExamQuestions = Record<CertificationId, Question[]>;

const migratedQuestions: Question[][] = [
  [
    {
      "id": "jncia-001",
      "question": "What is the default route preference for static routes in Junos OS?",
      "options": [
        "5",
        "10",
        "15",
        "20"
      ],
      "correctAnswer": "5",
      "explanation": "In Junos OS, static routes have a default route preference of 5.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-002",
      "question": "Which command shows the routing table in Junos OS?",
      "options": [
        "show route",
        "show routing-table",
        "show ip route",
        "show routes"
      ],
      "correctAnswer": "show route",
      "explanation": "The correct command to view the routing table in Junos OS is 'show route'.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-003",
      "question": "What is the purpose of a routing instance in Junos OS?",
      "options": [
        "To separate routing tables and protocols",
        "To configure static routes only",
        "To manage system users",
        "To configure interfaces"
      ],
      "correctAnswer": "To separate routing tables and protocols",
      "explanation": "Routing instances allow for separate routing domains within a single router.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-004",
      "question": "Which OSPF version is used for IPv4 routing?",
      "options": [
        "OSPFv2",
        "OSPFv3",
        "OSPFv4",
        "OSPFv5"
      ],
      "correctAnswer": "OSPFv2",
      "explanation": "OSPFv2 is the OSPF version for IPv4; OSPFv3 is used for IPv6.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-005",
      "question": "Which command is used to commit configuration changes in Junos OS?",
      "options": [
        "commit",
        "save",
        "write",
        "apply"
      ],
      "correctAnswer": "commit",
      "explanation": "The 'commit' command is used to apply configuration changes in Junos OS.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-006",
      "question": "What is the purpose of the 'rollback' command in Junos OS?",
      "options": [
        "To revert to a previous configuration",
        "To save the current configuration",
        "To delete the current configuration",
        "To create a new configuration"
      ],
      "correctAnswer": "To revert to a previous configuration",
      "explanation": "The 'rollback' command allows you to revert to a previously saved configuration.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-007",
      "question": "What is the purpose of the 'set' command in Junos OS?",
      "options": [
        "To configure system settings",
        "To display system information",
        "To delete configuration",
        "To save configuration"
      ],
      "correctAnswer": "To configure system settings",
      "explanation": "The 'set' command is used to configure system settings in Junos OS.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-008",
      "question": "Which command shows the interface status in Junos OS?",
      "options": [
        "show interfaces",
        "show interface status",
        "show ports",
        "show links"
      ],
      "correctAnswer": "show interfaces",
      "explanation": "The 'show interfaces' command displays operational interface state and statistics; use 'show configuration interfaces' to view configured statements.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-009",
      "question": "Which RIP version supports classless routing and carries subnet masks in updates?",
      "options": [
        "RIPv1",
        "RIPv2",
        "RIPv3",
        "RIPv4"
      ],
      "correctAnswer": "RIPv2",
      "explanation": "RIPv2 carries subnet masks and supports classless routing.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-010",
      "question": "Which command shows the routing protocols in Junos OS?",
      "options": [
        "show protocols",
        "show routing",
        "show routes",
        "show ospf"
      ],
      "correctAnswer": "show protocols",
      "explanation": "The 'show protocols' command displays configured routing protocols in Junos OS.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-011",
      "question": "What is the purpose of the 'delete' command in Junos OS?",
      "options": [
        "To remove configuration statements",
        "To add configuration statements",
        "To modify configuration statements",
        "To save configuration statements"
      ],
      "correctAnswer": "To remove configuration statements",
      "explanation": "The 'delete' command is used to remove configuration statements in Junos OS.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-012",
      "question": "Which command shows the system version in Junos OS?",
      "options": [
        "show version",
        "show system",
        "show os",
        "show junos"
      ],
      "correctAnswer": "show version",
      "explanation": "The 'show version' command displays the Junos OS version and system information.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-013",
      "question": "Which command shows the system uptime in Junos OS?",
      "options": [
        "show system uptime",
        "show uptime",
        "show system",
        "show time"
      ],
      "correctAnswer": "show system uptime",
      "explanation": "The 'show system uptime' command displays the system uptime in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-014",
      "question": "In Junos configuration mode, what does the edit command do?",
      "options": [
        "Move to a specified configuration hierarchy",
        "Commit the candidate configuration",
        "Enter operational mode",
        "Delete the active configuration"
      ],
      "correctAnswer": "Move to a specified configuration hierarchy",
      "explanation": "The edit command navigates to a hierarchy in configuration mode; configure is used to enter configuration mode from operational mode.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-015",
      "question": "Which command shows the system memory in Junos OS?",
      "options": [
        "show system memory",
        "show memory",
        "show system",
        "show resources"
      ],
      "correctAnswer": "show system memory",
      "explanation": "The 'show system memory' command displays system memory usage in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-016",
      "question": "What is the purpose of the 'request system reboot' command in Junos OS?",
      "options": [
        "To restart the system",
        "To save the configuration",
        "To check system status",
        "To update the system"
      ],
      "correctAnswer": "To restart the system",
      "explanation": "The 'request system reboot' command is used to restart the Junos OS system.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-017",
      "question": "Which command shows the system storage in Junos OS?",
      "options": [
        "show system storage",
        "show storage",
        "show disk",
        "show filesystem"
      ],
      "correctAnswer": "show system storage",
      "explanation": "The 'show system storage' command displays system storage usage in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-018",
      "question": "Which command shows the system processes in Junos OS?",
      "options": [
        "show system processes",
        "show processes",
        "show tasks",
        "show jobs"
      ],
      "correctAnswer": "show system processes",
      "explanation": "The 'show system processes' command displays running system processes in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-019",
      "question": "What is the purpose of the 'request system software add' command in Junos OS?",
      "options": [
        "To install new software packages",
        "To remove software packages",
        "To check software versions",
        "To backup software"
      ],
      "correctAnswer": "To install new software packages",
      "explanation": "The 'request system software add' command is used to install new software packages in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-020",
      "question": "Which command shows the system alarms in Junos OS?",
      "options": [
        "show system alarms",
        "show alarms",
        "show alerts",
        "show warnings"
      ],
      "correctAnswer": "show system alarms",
      "explanation": "The 'show system alarms' command displays system alarms in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-021",
      "question": "Which command shows the system logs in Junos OS?",
      "options": [
        "show log messages",
        "show system log",
        "show messages",
        "show events"
      ],
      "correctAnswer": "show log messages",
      "explanation": "The 'show log messages' command displays system log messages in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-022",
      "question": "What is the purpose of the 'request system zeroize' command in Junos OS?",
      "options": [
        "To erase all configuration and data",
        "To backup configuration",
        "To restore configuration",
        "To check system status"
      ],
      "correctAnswer": "To erase all configuration and data",
      "explanation": "The 'request system zeroize' command is used to erase all configuration and data in Junos OS.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-023",
      "question": "Which command shows the system users in Junos OS?",
      "options": [
        "show system users",
        "show users",
        "show login",
        "show sessions"
      ],
      "correctAnswer": "show system users",
      "explanation": "The 'show system users' command displays logged-in users in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-024",
      "question": "Which command shows the system services in Junos OS?",
      "options": [
        "show system services",
        "show services",
        "show daemons",
        "show processes"
      ],
      "correctAnswer": "show system services",
      "explanation": "The 'show system services' command displays system services in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-025",
      "question": "What is the purpose of the 'request system snapshot' command in Junos OS?",
      "options": [
        "To create a backup of the system",
        "To restore the system",
        "To check system status",
        "To update the system"
      ],
      "correctAnswer": "To create a backup of the system",
      "explanation": "The 'request system snapshot' command is used to create a backup of the Junos OS system.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-026",
      "question": "Which command shows the system security in Junos OS?",
      "options": [
        "show security",
        "show system security",
        "show firewall",
        "show protection"
      ],
      "correctAnswer": "show security",
      "explanation": "The 'show security' command displays security-related information in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-027",
      "question": "Which SNMP version adds authentication and privacy (encryption)?",
      "options": [
        "SNMPv2c",
        "SNMPv3",
        "SNMPv4",
        "SNMPv5"
      ],
      "correctAnswer": "SNMPv3",
      "explanation": "SNMPv3 supports authentication and privacy; SNMPv1 and SNMPv2c rely on community strings.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-028",
      "question": "Which command shows the system routing in Junos OS?",
      "options": [
        "show route",
        "show routing",
        "show paths",
        "show nexthop"
      ],
      "correctAnswer": "show route",
      "explanation": "The 'show route' command displays the routing table in Junos OS.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-029",
      "question": "What is the purpose of the 'request system halt' command in Junos OS?",
      "options": [
        "To shut down the system",
        "To restart the system",
        "To check system status",
        "To update the system"
      ],
      "correctAnswer": "To shut down the system",
      "explanation": "The 'request system halt' command is used to shut down the Junos OS system.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-030",
      "question": "Which command shows the system interfaces in Junos OS?",
      "options": [
        "show interfaces",
        "show interface",
        "show ports",
        "show links"
      ],
      "correctAnswer": "show interfaces",
      "explanation": "The 'show interfaces' command displays interface information in Junos OS.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-031",
      "question": "Which Junos configuration statement configures an NTP server?",
      "options": [
        "set system ntp server <address>",
        "set system time-server <address>",
        "set ntp server <address>",
        "set system clock ntp <address>"
      ],
      "correctAnswer": "set system ntp server <address>",
      "explanation": "Configure a Network Time Protocol server under the system hierarchy with 'set system ntp server <address>'. Do not assume a universal default NTP version.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-032",
      "question": "Which command shows the system configuration in Junos OS?",
      "options": [
        "show configuration",
        "show config",
        "show running",
        "show current"
      ],
      "correctAnswer": "show configuration",
      "explanation": "The 'show configuration' command displays the current configuration in Junos OS.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-033",
      "question": "What is the purpose of the Junos OS CLI?",
      "options": [
        "To provide a command-line interface for system configuration and management",
        "To display system logs only",
        "To manage user accounts only",
        "To configure interfaces only"
      ],
      "correctAnswer": "To provide a command-line interface for system configuration and management",
      "explanation": "The Junos OS CLI provides a comprehensive interface for system configuration, management, and monitoring.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-034",
      "question": "What is the default configuration mode in Junos OS?",
      "options": [
        "Operational mode",
        "Configuration mode",
        "Shell mode",
        "Monitor mode"
      ],
      "correctAnswer": "Operational mode",
      "explanation": "Operational mode is the default mode in Junos OS, indicated by the '>' prompt.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-035",
      "question": "Which command is used to enter configuration mode in Junos OS?",
      "options": [
        "configure",
        "edit",
        "config",
        "setup"
      ],
      "correctAnswer": "configure",
      "explanation": "The 'configure' command is used to enter configuration mode in Junos OS.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-036",
      "question": "What is the purpose of a routing table in Junos OS?",
      "options": [
        "To store and maintain routing information",
        "To manage system users",
        "To configure interfaces",
        "To display system logs"
      ],
      "correctAnswer": "To store and maintain routing information",
      "explanation": "The routing table stores and maintains routing information used to forward packets.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-037",
      "question": "Which routing protocol is used for internal routing in Junos OS?",
      "options": [
        "OSPF",
        "BGP",
        "RIP",
        "IS-IS"
      ],
      "correctAnswer": "OSPF",
      "explanation": "OSPF (Open Shortest Path First) is commonly used for internal routing in Junos OS.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-038",
      "question": "What is the purpose of a firewall filter in Junos OS?",
      "options": [
        "To control packet flow and provide security",
        "To configure routing protocols",
        "To manage system users",
        "To display system logs"
      ],
      "correctAnswer": "To control packet flow and provide security",
      "explanation": "Firewall filters control packet flow and provide security by filtering traffic based on defined criteria.",
      "domain": "Routing Policy and Firewall Filters"
    },
    {
      "id": "jncia-039",
      "question": "Which command displays the configured firewall filter hierarchy in Junos OS?",
      "options": [
        "show configuration firewall",
        "show firewall",
        "show filters",
        "show protection"
      ],
      "correctAnswer": "show configuration firewall",
      "explanation": "show configuration firewall displays the configured firewall hierarchy. show firewall is used for operational filter statistics.",
      "domain": "Routing Policy and Firewall Filters"
    },
    {
      "id": "jncia-040",
      "question": "What is the purpose of the Junos OS architecture?",
      "options": [
        "To separate control and forwarding planes",
        "To manage user accounts",
        "To configure interfaces",
        "To display system logs"
      ],
      "correctAnswer": "To separate control and forwarding planes",
      "explanation": "The Junos OS architecture separates the control plane (management) from the forwarding plane (data).",
      "domain": "Junos OS Fundamentals"
    },
    {
      "id": "jncia-041",
      "question": "Which command shows the routing protocol configuration in Junos OS?",
      "options": [
        "show protocols",
        "show routing",
        "show ospf",
        "show bgp"
      ],
      "correctAnswer": "show protocols",
      "explanation": "The 'show protocols' command displays routing protocol configuration in Junos OS.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-042",
      "question": "What is the purpose of a security zone in Junos OS?",
      "options": [
        "To define security boundaries",
        "To configure routing protocols",
        "To manage system users",
        "To display system logs"
      ],
      "correctAnswer": "To define security boundaries",
      "explanation": "Security zones define security boundaries and control traffic flow between different network segments.",
      "domain": "Junos OS Fundamentals"
    },
    {
      "id": "jncia-043",
      "question": "Which command shows the security zone configuration in Junos OS?",
      "options": [
        "show security zones",
        "show zones",
        "show security",
        "show protection"
      ],
      "correctAnswer": "show security zones",
      "explanation": "The 'show security zones' command displays security zone configuration in Junos OS.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-044",
      "question": "What is the purpose of the Junos OS configuration hierarchy?",
      "options": [
        "To organize configuration statements in a logical structure",
        "To manage user accounts",
        "To configure interfaces",
        "To display system logs"
      ],
      "correctAnswer": "To organize configuration statements in a logical structure",
      "explanation": "The Junos OS configuration hierarchy organizes configuration statements in a logical, tree-like structure.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-045",
      "question": "Which command displays interface configuration statements in Junos OS?",
      "options": [
        "show configuration interfaces",
        "show interfaces",
        "show ports",
        "show links"
      ],
      "correctAnswer": "show configuration interfaces",
      "explanation": "Use show configuration interfaces for configuration; show interfaces displays operational interface state and statistics.",
      "domain": "Configuration Basics"
    },
    {
      "id": "jncia-046",
      "question": "What is the purpose of a routing instance in Junos OS?",
      "options": [
        "To create separate routing tables and protocols",
        "To manage user accounts",
        "To configure interfaces",
        "To display system logs"
      ],
      "correctAnswer": "To create separate routing tables and protocols",
      "explanation": "Routing instances allow for separate routing tables and protocols within a single device.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-047",
      "question": "Which command displays routing-instance configuration statements in Junos OS?",
      "options": [
        "show configuration routing-instances",
        "show route instance",
        "show routing",
        "show tables"
      ],
      "correctAnswer": "show configuration routing-instances",
      "explanation": "show configuration routing-instances displays the configured hierarchy; show route instance displays operational route-instance information.",
      "domain": "Routing Fundamentals"
    },
    {
      "id": "jncia-048",
      "question": "What is the purpose of SD-WAN?",
      "options": [
        "To provide software-defined wide area networking",
        "To encrypt network traffic",
        "To compress network data",
        "To authenticate network devices"
      ],
      "correctAnswer": "To provide software-defined wide area networking",
      "explanation": "SD-WAN (Software-Defined Wide Area Network) provides software-defined networking for wide area networks.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-049",
      "question": "What is the primary function of NFV?",
      "options": [
        "To virtualize network functions",
        "To provide wireless connectivity",
        "To manage network security",
        "To optimize network performance"
      ],
      "correctAnswer": "To virtualize network functions",
      "explanation": "NFV (Network Functions Virtualization) virtualizes network functions that traditionally run on dedicated hardware.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-050",
      "question": "What is a man-in-the-middle attack?",
      "options": [
        "Intercepting and altering communication",
        "Stealing passwords",
        "Installing malware",
        "Creating fake websites"
      ],
      "correctAnswer": "Intercepting and altering communication",
      "explanation": "A man-in-the-middle attack occurs when an attacker intercepts and potentially alters communication between two parties.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-051",
      "question": "What is the purpose of a VPN?",
      "options": [
        "To create a secure connection over the internet",
        "To increase network speed",
        "To block websites",
        "To monitor network traffic"
      ],
      "correctAnswer": "To create a secure connection over the internet",
      "explanation": "A Virtual Private Network (VPN) creates a secure, encrypted connection over the internet to protect data transmission.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-052",
      "question": "What is a security token?",
      "options": [
        "A physical or digital device for authentication",
        "A type of malware",
        "A network protocol",
        "A security policy"
      ],
      "correctAnswer": "A physical or digital device for authentication",
      "explanation": "A security token is a physical or digital device used to authenticate a user's identity.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-053",
      "question": "What is the purpose of a security policy?",
      "options": [
        "To define security requirements and procedures",
        "To block network traffic",
        "To encrypt data",
        "To monitor user activity"
      ],
      "correctAnswer": "To define security requirements and procedures",
      "explanation": "A security policy defines the security requirements and procedures for an organization.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-054",
      "question": "What is a security incident?",
      "options": [
        "A violation of security policies",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A violation of security policies",
      "explanation": "A security incident is any violation of security policies or practices that could lead to unauthorized access or damage.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-055",
      "question": "What is a security audit?",
      "options": [
        "A systematic evaluation of security controls",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A systematic evaluation of security controls",
      "explanation": "A security audit is a systematic evaluation of security controls to ensure they are working as intended.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-056",
      "question": "What is a security control?",
      "options": [
        "A measure to reduce security risks",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A measure to reduce security risks",
      "explanation": "A security control is a measure implemented to reduce security risks and protect assets.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-057",
      "question": "What is a security assessment?",
      "options": [
        "An evaluation of security posture",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "An evaluation of security posture",
      "explanation": "A security assessment evaluates an organization's security posture and identifies areas for improvement.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-058",
      "question": "What is a security framework?",
      "options": [
        "A structured approach to security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A structured approach to security",
      "explanation": "A security framework provides a structured approach to implementing and managing security controls.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-059",
      "question": "What is a security standard?",
      "options": [
        "A documented security requirement",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A documented security requirement",
      "explanation": "A security standard is a documented requirement that specifies security controls and practices.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-060",
      "question": "What is a security risk?",
      "options": [
        "A potential threat to security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A potential threat to security",
      "explanation": "A security risk is a potential threat that could exploit a vulnerability and cause harm to an organization.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-061",
      "question": "What is a security threat?",
      "options": [
        "A potential danger to security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A potential danger to security",
      "explanation": "A security threat is any potential danger that could exploit a vulnerability and cause harm.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-062",
      "question": "What is a security vulnerability?",
      "options": [
        "A weakness in security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A weakness in security",
      "explanation": "A security vulnerability is a weakness in a system that could be exploited by a threat.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-063",
      "question": "What is a security breach?",
      "options": [
        "An unauthorized access to data",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "An unauthorized access to data",
      "explanation": "A security breach occurs when an unauthorized party gains access to sensitive data.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-064",
      "question": "What is a security incident response?",
      "options": [
        "A process to handle security incidents",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A process to handle security incidents",
      "explanation": "Security incident response is the process of handling and managing security incidents when they occur.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-065",
      "question": "What is a security policy?",
      "options": [
        "A set of security rules",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A set of security rules",
      "explanation": "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-066",
      "question": "What is a security procedure?",
      "options": [
        "A step-by-step security process",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A step-by-step security process",
      "explanation": "A security procedure is a step-by-step process that describes how to implement security controls.",
      "domain": "Operational Monitoring and Maintenance"
    },
    {
      "id": "jncia-067",
      "question": "What is a security guideline?",
      "options": [
        "A recommended security practice",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A recommended security practice",
      "explanation": "A security guideline is a recommended practice that provides guidance on how to implement security controls.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-068",
      "question": "What is a security standard?",
      "options": [
        "A mandatory security requirement",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A mandatory security requirement",
      "explanation": "A security standard is a mandatory requirement that specifies how security controls should be implemented.",
      "domain": "Networking Fundamentals"
    },
    {
      "id": "jncia-069",
      "question": "What is a security baseline?",
      "options": [
        "A minimum security configuration",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A minimum security configuration",
      "explanation": "A security baseline is a minimum security configuration that defines the basic security requirements for a system.",
      "domain": "Configuration Basics"
    }
  ],
  [
    {
      "id": "ccna-001",
      "question": "What is the default administrative distance for static routes in Cisco IOS?",
      "options": [
        "1",
        "5",
        "110",
        "120"
      ],
      "correctAnswer": "1",
      "explanation": "In Cisco IOS, static routes have a default administrative distance of 1.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-002",
      "question": "Which command shows the routing table in Cisco IOS?",
      "options": [
        "show ip route",
        "show route",
        "show routing-table",
        "show routes"
      ],
      "correctAnswer": "show ip route",
      "explanation": "The correct command to view the routing table in Cisco IOS is 'show ip route'.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-003",
      "question": "What is the purpose of a VLAN in Cisco networking?",
      "options": [
        "To separate broadcast domains",
        "To configure static routes",
        "To manage system users",
        "To configure interfaces"
      ],
      "correctAnswer": "To separate broadcast domains",
      "explanation": "VLANs allow for separate broadcast domains within a single switch.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-004",
      "question": "Which OSPF version is used for IPv4 routing?",
      "options": [
        "OSPFv2",
        "OSPFv3",
        "OSPFv4",
        "OSPFv5"
      ],
      "correctAnswer": "OSPFv2",
      "explanation": "OSPFv2 is used for IPv4; OSPFv3 is used for IPv6. The version is selected by the configured address family, not a universal IOS default.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-005",
      "question": "Which command is used to save configuration changes in Cisco IOS?",
      "options": [
        "copy running-config startup-config",
        "save",
        "write",
        "commit"
      ],
      "correctAnswer": "copy running-config startup-config",
      "explanation": "The 'copy running-config startup-config' command is used to save configuration changes in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-006",
      "question": "What is the purpose of the 'reload' command in Cisco IOS?",
      "options": [
        "To restart the device",
        "To save the current configuration",
        "To delete the current configuration",
        "To create a new configuration"
      ],
      "correctAnswer": "To restart the device",
      "explanation": "The 'reload' command is used to restart the Cisco device.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-007",
      "question": "What is the purpose of the 'configure terminal' command in Cisco IOS?",
      "options": [
        "To enter global configuration mode",
        "To display system information",
        "To delete configuration",
        "To save configuration"
      ],
      "correctAnswer": "To enter global configuration mode",
      "explanation": "The 'configure terminal' command is used to enter global configuration mode in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-008",
      "question": "Which command shows the interface status in Cisco IOS?",
      "options": [
        "show interfaces",
        "show interface status",
        "show ports",
        "show links"
      ],
      "correctAnswer": "show interfaces",
      "explanation": "The 'show interfaces' command displays operational interface state and counters. Use configuration commands or 'show running-config' to inspect configured settings.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-009",
      "question": "Which command shows the routing protocols in Cisco IOS?",
      "options": [
        "show ip protocols",
        "show routing",
        "show routes",
        "show ospf"
      ],
      "correctAnswer": "show ip protocols",
      "explanation": "The 'show ip protocols' command displays configured routing protocols in Cisco IOS.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-010",
      "question": "What is the purpose of the 'no' command in Cisco IOS?",
      "options": [
        "To remove configuration statements",
        "To add configuration statements",
        "To modify configuration statements",
        "To save configuration statements"
      ],
      "correctAnswer": "To remove configuration statements",
      "explanation": "The 'no' command is used to remove configuration statements in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-011",
      "question": "Which command shows the system version in Cisco IOS?",
      "options": [
        "show version",
        "show system",
        "show os",
        "show ios"
      ],
      "correctAnswer": "show version",
      "explanation": "The 'show version' command displays the Cisco IOS version and system information.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-012",
      "question": "Which IOS command displays device uptime in its version summary?",
      "options": [
        "show version",
        "show uptime",
        "show system",
        "show time"
      ],
      "correctAnswer": "show version",
      "explanation": "show version includes the device uptime on common Cisco IOS platforms.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-013",
      "question": "What is the purpose of the 'enable' command in Cisco IOS?",
      "options": [
        "To enter privileged EXEC mode",
        "To exit privileged EXEC mode",
        "To save configuration",
        "To delete configuration"
      ],
      "correctAnswer": "To enter privileged EXEC mode",
      "explanation": "The 'enable' command is used to enter privileged EXEC mode in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-014",
      "question": "Which command shows the system memory in Cisco IOS?",
      "options": [
        "show memory",
        "show system memory",
        "show system",
        "show resources"
      ],
      "correctAnswer": "show memory",
      "explanation": "The 'show memory' command displays system memory usage in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-015",
      "question": "Which HSRP version supports IPv6 and extended group numbers?",
      "options": [
        "HSRPv1",
        "HSRPv2",
        "VRRPv3",
        "GLBP"
      ],
      "correctAnswer": "HSRPv2",
      "explanation": "HSRP version 2 supports IPv6 and group numbers beyond the range available in HSRPv1; the configured version is not a universal IOS default.",
      "domain": "IP Services"
    },
    {
      "id": "ccna-016",
      "question": "Which command shows the system storage in Cisco IOS?",
      "options": [
        "show flash",
        "show storage",
        "show disk",
        "show filesystem"
      ],
      "correctAnswer": "show flash",
      "explanation": "The 'show flash' command displays system storage usage in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-017",
      "question": "Which command shows the system processes in Cisco IOS?",
      "options": [
        "show processes",
        "show system processes",
        "show tasks",
        "show jobs"
      ],
      "correctAnswer": "show processes",
      "explanation": "The 'show processes' command displays running system processes in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-018",
      "question": "What is the purpose of the 'copy tftp flash' command in Cisco IOS?",
      "options": [
        "To copy a file from TFTP server to flash",
        "To copy a file from flash to TFTP server",
        "To copy a file from flash to running-config",
        "To copy a file from running-config to flash"
      ],
      "correctAnswer": "To copy a file from TFTP server to flash",
      "explanation": "The 'copy tftp flash' command is used to copy a file from a TFTP server to the flash memory in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-019",
      "question": "Which command displays CPU utilization by process in Cisco IOS?",
      "options": [
        "show processes cpu",
        "show memory",
        "show version",
        "show logging"
      ],
      "correctAnswer": "show processes cpu",
      "explanation": "The 'show processes cpu' command reports CPU utilization by process on Cisco IOS platforms.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-020",
      "question": "Which VRRP version supports both IPv4 and IPv6?",
      "options": [
        "VRRPv2",
        "VRRPv3",
        "HSRPv2",
        "GLBP"
      ],
      "correctAnswer": "VRRPv3",
      "explanation": "VRRP version 3 supports IPv4 and IPv6. The version used depends on platform and configuration rather than a universal Cisco IOS default.",
      "domain": "IP Services"
    },
    {
      "id": "ccna-021",
      "question": "Which command shows the system logs in Cisco IOS?",
      "options": [
        "show logging",
        "show system log",
        "show messages",
        "show events"
      ],
      "correctAnswer": "show logging",
      "explanation": "The 'show logging' command displays system log messages in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-022",
      "question": "What is the purpose of the 'debug' command in Cisco IOS?",
      "options": [
        "To troubleshoot network issues",
        "To configure interfaces",
        "To save configuration",
        "To delete configuration"
      ],
      "correctAnswer": "To troubleshoot network issues",
      "explanation": "The 'debug' command is used to troubleshoot network issues in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-023",
      "question": "Which command shows the system configuration in Cisco IOS?",
      "options": [
        "show running-config",
        "show config",
        "show system",
        "show settings"
      ],
      "correctAnswer": "show running-config",
      "explanation": "The 'show running-config' command displays the current system configuration in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-024",
      "question": "What is the purpose of the 'ping' command in Cisco IOS?",
      "options": [
        "To test network connectivity",
        "To configure interfaces",
        "To save configuration",
        "To delete configuration"
      ],
      "correctAnswer": "To test network connectivity",
      "explanation": "The 'ping' command is used to test network connectivity in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-025",
      "question": "Which command shows the ARP table in Cisco IOS?",
      "options": [
        "show arp",
        "show ip arp",
        "show arp table",
        "show ip arp table"
      ],
      "correctAnswer": "show arp",
      "explanation": "The 'show arp' command displays the ARP table in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-026",
      "question": "Which Cisco spanning-tree mode runs a separate spanning-tree instance per VLAN?",
      "options": [
        "PVST+",
        "RSTP",
        "MSTP",
        "RPVST+"
      ],
      "correctAnswer": "PVST+",
      "explanation": "PVST+ runs a spanning-tree instance per VLAN; the actual default depends on switch platform and configuration.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-027",
      "question": "Which command shows the MAC address table in Cisco IOS?",
      "options": [
        "show mac address-table",
        "show mac table",
        "show mac-address-table",
        "show mac-address"
      ],
      "correctAnswer": "show mac address-table",
      "explanation": "The 'show mac address-table' command displays the MAC address table in Cisco IOS.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-028",
      "question": "What is the purpose of the 'traceroute' command in Cisco IOS?",
      "options": [
        "To trace the path to a destination",
        "To configure interfaces",
        "To save configuration",
        "To delete configuration"
      ],
      "correctAnswer": "To trace the path to a destination",
      "explanation": "The 'traceroute' command is used to trace the path to a destination in Cisco IOS.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-029",
      "question": "Which command shows the CDP neighbors in Cisco IOS?",
      "options": [
        "show cdp neighbors",
        "show neighbors",
        "show cdp",
        "show cdp neighbor"
      ],
      "correctAnswer": "show cdp neighbors",
      "explanation": "The 'show cdp neighbors' command displays CDP neighbor information in Cisco IOS.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-030",
      "question": "Which standards-based protocol advertises neighbor capabilities across vendors?",
      "options": [
        "LLDP",
        "CDP",
        "FDP",
        "NDP"
      ],
      "correctAnswer": "LLDP",
      "explanation": "LLDP is the IEEE standards-based neighbor discovery protocol; whether it is enabled is platform/configuration dependent.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-031",
      "question": "Which command shows the LLDP neighbors in Cisco IOS?",
      "options": [
        "show lldp neighbors",
        "show neighbors",
        "show lldp",
        "show lldp neighbor"
      ],
      "correctAnswer": "show lldp neighbors",
      "explanation": "The 'show lldp neighbors' command displays LLDP neighbor information in Cisco IOS.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-032",
      "question": "What is the purpose of the 'telnet' command in Cisco IOS?",
      "options": [
        "To establish a Telnet connection",
        "To configure interfaces",
        "To save configuration",
        "To delete configuration"
      ],
      "correctAnswer": "To establish a Telnet connection",
      "explanation": "The 'telnet' command is used to establish a Telnet connection in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-033",
      "question": "Which command shows the SSH sessions in Cisco IOS?",
      "options": [
        "show ssh",
        "show sessions",
        "show ssh sessions",
        "show ssh connections"
      ],
      "correctAnswer": "show ssh",
      "explanation": "The 'show ssh' command displays SSH session information in Cisco IOS.",
      "domain": "Security Fundamentals"
    },
    {
      "id": "ccna-034",
      "question": "Which command shows the interface status in Cisco IOS?",
      "options": [
        "show interface",
        "show interfaces",
        "show interface status",
        "show interfaces status"
      ],
      "correctAnswer": "show interface",
      "explanation": "The 'show interface' command displays interface status information in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-035",
      "question": "What is the purpose of the 'copy' command in Cisco IOS?",
      "options": [
        "To copy files",
        "To configure interfaces",
        "To save configuration",
        "To delete configuration"
      ],
      "correctAnswer": "To copy files",
      "explanation": "The 'copy' command is used to copy files in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-036",
      "question": "Which command shows the OSPF neighbors in Cisco IOS?",
      "options": [
        "show ip ospf neighbor",
        "show ospf neighbor",
        "show ip ospf",
        "show ospf"
      ],
      "correctAnswer": "show ip ospf neighbor",
      "explanation": "The 'show ip ospf neighbor' command displays OSPF neighbor information in Cisco IOS.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-037",
      "question": "What is the purpose of the 'delete' command in Cisco IOS?",
      "options": [
        "To delete files",
        "To configure interfaces",
        "To save configuration",
        "To copy files"
      ],
      "correctAnswer": "To delete files",
      "explanation": "The 'delete' command is used to delete files in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-038",
      "question": "Which command shows the VLAN information in Cisco IOS?",
      "options": [
        "show vlan",
        "show vlans",
        "show vlan brief",
        "show vlans brief"
      ],
      "correctAnswer": "show vlan",
      "explanation": "The 'show vlan' command displays VLAN information in Cisco IOS.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-039",
      "question": "What is the purpose of the 'write' command in Cisco IOS?",
      "options": [
        "To save configuration",
        "To delete configuration",
        "To copy files",
        "To restart the device"
      ],
      "correctAnswer": "To save configuration",
      "explanation": "The 'write' command is used to save configuration in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-040",
      "question": "Which command shows the spanning-tree information in Cisco IOS?",
      "options": [
        "show spanning-tree",
        "show stp",
        "show spanning-tree brief",
        "show stp brief"
      ],
      "correctAnswer": "show spanning-tree",
      "explanation": "The 'show spanning-tree' command displays spanning-tree information in Cisco IOS.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-041",
      "question": "Which command shows the HSRP status in Cisco IOS?",
      "options": [
        "show standby",
        "show hsrp",
        "show standby brief",
        "show hsrp brief"
      ],
      "correctAnswer": "show standby",
      "explanation": "The 'show standby' command displays HSRP status information in Cisco IOS.",
      "domain": "IP Services"
    },
    {
      "id": "ccna-042",
      "question": "What is the purpose of the 'erase' command in Cisco IOS?",
      "options": [
        "To delete configuration",
        "To save configuration",
        "To copy files",
        "To restart the device"
      ],
      "correctAnswer": "To delete configuration",
      "explanation": "The 'erase' command is used to delete configuration in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-043",
      "question": "On Cisco Catalyst switches that support it, which command displays a summary of interface counters?",
      "options": [
        "show interfaces counters",
        "show interfaces status",
        "show ip interface brief",
        "show controllers"
      ],
      "correctAnswer": "show interfaces counters",
      "explanation": "On supported Cisco Catalyst platforms, 'show interfaces counters' displays a summary of interface traffic counters.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-044",
      "question": "Which command shows the OSPF neighbor information in Cisco IOS?",
      "options": [
        "show ip ospf neighbor",
        "show ospf neighbor",
        "show ip ospf",
        "show ospf"
      ],
      "correctAnswer": "show ip ospf neighbor",
      "explanation": "The 'show ip ospf neighbor' command displays OSPF neighbor information in Cisco IOS.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-045",
      "question": "What is the purpose of the 'telnet' command in Cisco IOS?",
      "options": [
        "To establish a remote connection",
        "To save configuration",
        "To delete configuration",
        "To copy files"
      ],
      "correctAnswer": "To establish a remote connection",
      "explanation": "The 'telnet' command is used to establish a remote connection in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-046",
      "question": "What is the purpose of the 'ssh' command in Cisco IOS?",
      "options": [
        "To establish a secure remote connection",
        "To save configuration",
        "To delete configuration",
        "To copy files"
      ],
      "correctAnswer": "To establish a secure remote connection",
      "explanation": "The 'ssh' command is used to establish a secure remote connection in Cisco IOS.",
      "domain": "Security Fundamentals"
    },
    {
      "id": "ccna-047",
      "question": "Which command shows the VRRP status in Cisco IOS?",
      "options": [
        "show vrrp",
        "show vrrp brief",
        "show vrrp all",
        "show vrrp all brief"
      ],
      "correctAnswer": "show vrrp",
      "explanation": "The 'show vrrp' command displays VRRP status information in Cisco IOS.",
      "domain": "IP Services"
    },
    {
      "id": "ccna-048",
      "question": "Which command displays configured IPv4 access control lists in Cisco IOS?",
      "options": [
        "show ip access-lists",
        "show ip acl",
        "show access-list ipv4",
        "show acl ipv4"
      ],
      "correctAnswer": "show ip access-lists",
      "explanation": "The 'show ip access-lists' command displays configured IPv4 access lists in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-049",
      "question": "Which command shows the CDP neighbor information in Cisco IOS?",
      "options": [
        "show cdp neighbor",
        "show cdp",
        "show cdp neighbors",
        "show cdp all"
      ],
      "correctAnswer": "show cdp neighbor",
      "explanation": "The 'show cdp neighbor' command displays CDP neighbor information in Cisco IOS.",
      "domain": "Network Access"
    },
    {
      "id": "ccna-050",
      "question": "Which command shows the OSPF database in Cisco IOS?",
      "options": [
        "show ip ospf database",
        "show ospf db",
        "show ip ospf db",
        "show ospf database"
      ],
      "correctAnswer": "show ip ospf database",
      "explanation": "The 'show ip ospf database' command displays OSPF database information in Cisco IOS.",
      "domain": "IP Connectivity"
    },
    {
      "id": "ccna-051",
      "question": "Which command shows interface status on Cisco Catalyst switches?",
      "options": [
        "show interfaces status",
        "show interface status",
        "show ip interface brief",
        "show interfaces description"
      ],
      "correctAnswer": "show interfaces status",
      "explanation": "On Cisco Catalyst switches, 'show interfaces status' provides a concise per-port status summary.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-052",
      "question": "What is the purpose of the 'erase' command in Cisco IOS?",
      "options": [
        "To delete startup configuration",
        "To save configuration",
        "To copy files",
        "To restart the device"
      ],
      "correctAnswer": "To delete startup configuration",
      "explanation": "The 'erase' command is used to delete startup configuration in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-053",
      "question": "Which command provides detailed operational counters for a specific Cisco IOS interface?",
      "options": [
        "show interfaces <interface-id>",
        "show ip interface brief",
        "show interfaces status",
        "show ip protocols"
      ],
      "correctAnswer": "show interfaces <interface-id>",
      "explanation": "Detailed 'show interfaces' output for a named interface includes operational counters such as input errors and CRC errors; there is no generic 'show interface errors' command.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-054",
      "question": "Which IOS command lists interface descriptions?",
      "options": [
        "show interfaces description",
        "show interface description",
        "show interfaces",
        "show int"
      ],
      "correctAnswer": "show interfaces description",
      "explanation": "The standard IOS command uses the plural interfaces keyword: show interfaces description.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-055",
      "question": "What is the purpose of the 'end' command in Cisco IOS?",
      "options": [
        "To exit configuration mode",
        "To save configuration",
        "To delete configuration",
        "To copy files"
      ],
      "correctAnswer": "To exit configuration mode",
      "explanation": "The 'end' command is used to exit configuration mode in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-056",
      "question": "Which command shows the interface statistics in Cisco IOS?",
      "options": [
        "show interface statistics",
        "show int stats",
        "show interface",
        "show int"
      ],
      "correctAnswer": "show interface statistics",
      "explanation": "The 'show interface statistics' command displays interface statistics in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-057",
      "question": "What is the purpose of the 'exit' command in Cisco IOS?",
      "options": [
        "To exit current mode",
        "To save configuration",
        "To delete configuration",
        "To copy files"
      ],
      "correctAnswer": "To exit current mode",
      "explanation": "The 'exit' command is used to exit the current mode in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-058",
      "question": "Which command shows the interface IP information in Cisco IOS?",
      "options": [
        "show ip interface",
        "show interface ip",
        "show ip int",
        "show int ip"
      ],
      "correctAnswer": "show ip interface",
      "explanation": "The 'show ip interface' command displays interface IP information in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-059",
      "question": "Which command shows the interface bandwidth in Cisco IOS?",
      "options": [
        "show interface bandwidth",
        "show int bw",
        "show interface",
        "show int"
      ],
      "correctAnswer": "show interface bandwidth",
      "explanation": "The 'show interface bandwidth' command displays interface bandwidth in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-060",
      "question": "What is the purpose of the 'disable' command in Cisco IOS?",
      "options": [
        "To exit privileged EXEC mode",
        "To save configuration",
        "To delete configuration",
        "To copy files"
      ],
      "correctAnswer": "To exit privileged EXEC mode",
      "explanation": "The 'disable' command is used to exit privileged EXEC mode in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-061",
      "question": "Which command shows the interface MTU in Cisco IOS?",
      "options": [
        "show interface mtu",
        "show int mtu",
        "show interface",
        "show int"
      ],
      "correctAnswer": "show interface mtu",
      "explanation": "The 'show interface mtu' command displays interface MTU in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-062",
      "question": "What is the purpose of the 'clock set' command in Cisco IOS?",
      "options": [
        "To set system clock",
        "To save configuration",
        "To delete configuration",
        "To copy files"
      ],
      "correctAnswer": "To set system clock",
      "explanation": "The 'clock set' command is used to set the system clock in Cisco IOS.",
      "domain": "Network Fundamentals"
    },
    {
      "id": "ccna-063",
      "question": "Which command shows the interface queue in Cisco IOS?",
      "options": [
        "show interface queue",
        "show int queue",
        "show interface",
        "show int"
      ],
      "correctAnswer": "show interface queue",
      "explanation": "The 'show interface queue' command displays interface queue information in Cisco IOS.",
      "domain": "Network Fundamentals"
    }
  ],
  [
    {
      "id": "secplus-001",
      "question": "What is a honeypot?",
      "options": [
        "A decoy system",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A decoy system",
      "explanation": "A honeypot is a decoy system designed to attract and detect attackers, allowing security teams to study their methods.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-002",
      "question": "What is the primary purpose of a firewall?",
      "options": [
        "To control network traffic",
        "To encrypt data",
        "To authenticate users",
        "To scan for viruses"
      ],
      "correctAnswer": "To control network traffic",
      "explanation": "A firewall's primary purpose is to control and monitor network traffic based on predetermined security rules.",
      "domain": "Security Architecture"
    },
    {
      "id": "secplus-003",
      "question": "What is multi-factor authentication?",
      "options": [
        "Using two or more distinct factor categories",
        "Using multiple passwords",
        "Using multiple usernames",
        "Using multiple security questions"
      ],
      "correctAnswer": "Using two or more distinct factor categories",
      "explanation": "MFA requires evidence from at least two distinct factor categories, such as something you know and something you have; two passwords are one category.",
      "domain": "Security Operations"
    },
    {
      "id": "secplus-004",
      "question": "What is a zero-day vulnerability?",
      "options": [
        "A vulnerability for which no vendor fix is available when it is exploited",
        "A known security flaw",
        "A fixed security flaw",
        "A minor security flaw"
      ],
      "correctAnswer": "A vulnerability for which no vendor fix is available when it is exploited",
      "explanation": "A zero-day vulnerability is exploited before a patch or effective fix is available; it need not remain unknown to the vendor.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-005",
      "question": "What is the purpose of encryption?",
      "options": [
        "To protect data confidentiality",
        "To increase data speed",
        "To compress data",
        "To organize data"
      ],
      "correctAnswer": "To protect data confidentiality",
      "explanation": "Encryption is used to protect data confidentiality by converting it into a secure format that can only be read with the proper key.",
      "domain": "Security Architecture"
    },
    {
      "id": "secplus-006",
      "question": "What is a DDoS attack?",
      "options": [
        "Overwhelming a system with traffic",
        "Stealing user credentials",
        "Installing malware",
        "Encrypting files"
      ],
      "correctAnswer": "Overwhelming a system with traffic",
      "explanation": "A Distributed Denial of Service (DDoS) attack overwhelms a system with traffic from multiple sources.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-007",
      "question": "What is social engineering?",
      "options": [
        "Manipulating people to gain access",
        "Hacking computer systems",
        "Writing malicious code",
        "Breaking encryption"
      ],
      "correctAnswer": "Manipulating people to gain access",
      "explanation": "Social engineering involves manipulating people into revealing confidential information or performing actions that compromise security.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-008",
      "question": "What is a vulnerability assessment?",
      "options": [
        "Identifying security weaknesses",
        "Testing network speed",
        "Checking system performance",
        "Monitoring user activity"
      ],
      "correctAnswer": "Identifying security weaknesses",
      "explanation": "A vulnerability assessment is the process of identifying, quantifying, and prioritizing security weaknesses in a system.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-009",
      "question": "What is the principle of least privilege?",
      "options": [
        "Giving minimum necessary access",
        "Giving full access to all",
        "Giving temporary access",
        "Giving conditional access"
      ],
      "correctAnswer": "Giving minimum necessary access",
      "explanation": "The principle of least privilege means giving users only the minimum level of access necessary to perform their job functions.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-010",
      "question": "What is a security baseline?",
      "options": [
        "A minimum security standard",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A minimum security standard",
      "explanation": "A security baseline is a minimum security standard that defines the basic security requirements for a system or network.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-011",
      "question": "What is a man-in-the-middle attack?",
      "options": [
        "Intercepting and altering communication",
        "Stealing passwords",
        "Installing malware",
        "Creating fake websites"
      ],
      "correctAnswer": "Intercepting and altering communication",
      "explanation": "A man-in-the-middle attack occurs when an attacker intercepts and potentially alters communication between two parties.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-012",
      "question": "What is the purpose of a VPN?",
      "options": [
        "To create a secure connection over the internet",
        "To increase network speed",
        "To block websites",
        "To monitor network traffic"
      ],
      "correctAnswer": "To create a secure connection over the internet",
      "explanation": "A Virtual Private Network (VPN) creates a secure, encrypted connection over the internet to protect data transmission.",
      "domain": "Security Architecture"
    },
    {
      "id": "secplus-013",
      "question": "What is a security token?",
      "options": [
        "A physical or digital device for authentication",
        "A type of malware",
        "A network protocol",
        "A security policy"
      ],
      "correctAnswer": "A physical or digital device for authentication",
      "explanation": "A security token is a physical or digital device used to authenticate a user's identity.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-014",
      "question": "What is the purpose of a security policy?",
      "options": [
        "To define security requirements and procedures",
        "To block network traffic",
        "To encrypt data",
        "To monitor user activity"
      ],
      "correctAnswer": "To define security requirements and procedures",
      "explanation": "A security policy defines the security requirements and procedures for an organization.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-015",
      "question": "What is a security incident?",
      "options": [
        "An event that compromises or threatens confidentiality, integrity, or availability",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "An event that compromises or threatens confidentiality, integrity, or availability",
      "explanation": "A security incident is an event that compromises or threatens the confidentiality, integrity, or availability of information or systems; a policy violation alone is not always an incident.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-016",
      "question": "What is a security audit?",
      "options": [
        "A systematic evaluation of security controls",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A systematic evaluation of security controls",
      "explanation": "A security audit is a systematic evaluation of security controls to ensure they are working as intended.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-017",
      "question": "What is a security control?",
      "options": [
        "A measure to reduce security risks",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A measure to reduce security risks",
      "explanation": "A security control is a measure implemented to reduce security risks and protect assets.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-018",
      "question": "What is a security assessment?",
      "options": [
        "An evaluation of security posture",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "An evaluation of security posture",
      "explanation": "A security assessment evaluates an organization's security posture and identifies areas for improvement.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-019",
      "question": "What is a security framework?",
      "options": [
        "A structured approach to security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A structured approach to security",
      "explanation": "A security framework provides a structured approach to implementing and managing security controls.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-020",
      "question": "What is a security standard?",
      "options": [
        "A documented security requirement",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A documented security requirement",
      "explanation": "A security standard is a documented requirement that specifies security controls and practices.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-021",
      "question": "What is a security risk?",
      "options": [
        "The likelihood and impact of a threat exploiting a vulnerability",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "The likelihood and impact of a threat exploiting a vulnerability",
      "explanation": "Risk combines the likelihood of a threat exploiting a vulnerability with the resulting impact; a threat is a potential cause of harm, not the risk itself.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-022",
      "question": "What is a security threat?",
      "options": [
        "A potential danger to security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A potential danger to security",
      "explanation": "A security threat is any potential danger that could exploit a vulnerability and cause harm.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-023",
      "question": "What is a security vulnerability?",
      "options": [
        "A weakness in security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A weakness in security",
      "explanation": "A security vulnerability is a weakness in a system that could be exploited by a threat.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-024",
      "question": "What is a security breach?",
      "options": [
        "An unauthorized access to data",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "An unauthorized access to data",
      "explanation": "A security breach occurs when an unauthorized party gains access to sensitive data.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-025",
      "question": "What is a security incident response?",
      "options": [
        "A process to handle security incidents",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A process to handle security incidents",
      "explanation": "Security incident response is the process of handling and managing security incidents when they occur.",
      "domain": "Security Operations"
    },
    {
      "id": "secplus-026",
      "question": "What is a security policy?",
      "options": [
        "A set of security rules",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A set of security rules",
      "explanation": "A security policy is a set of rules and practices that specify how an organization manages and protects its information assets.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-027",
      "question": "What is a security procedure?",
      "options": [
        "A step-by-step security process",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A step-by-step security process",
      "explanation": "A security procedure is a step-by-step process that describes how to implement security controls.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-028",
      "question": "What is a security guideline?",
      "options": [
        "A recommended security practice",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A recommended security practice",
      "explanation": "A security guideline is a recommended practice that provides guidance on how to implement security controls.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-029",
      "question": "What is a security standard?",
      "options": [
        "A mandatory security requirement",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A mandatory security requirement",
      "explanation": "A security standard is a mandatory requirement that specifies how security controls should be implemented.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-030",
      "question": "What is a security baseline?",
      "options": [
        "A minimum security configuration",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A minimum security configuration",
      "explanation": "A security baseline is a minimum security configuration that defines the basic security requirements for a system.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-031",
      "question": "What is a security risk assessment?",
      "options": [
        "A process to identify and evaluate security risks",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A process to identify and evaluate security risks",
      "explanation": "A security risk assessment is a systematic process to identify and evaluate potential security risks to an organization.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-032",
      "question": "What is a security incident response plan?",
      "options": [
        "A documented approach to handling security incidents",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A documented approach to handling security incidents",
      "explanation": "A security incident response plan is a documented approach that outlines how an organization will detect, respond to, and recover from security incidents.",
      "domain": "Security Operations"
    },
    {
      "id": "secplus-033",
      "question": "What is a security awareness program?",
      "options": [
        "A program to educate users about security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A program to educate users about security",
      "explanation": "A security awareness program is designed to educate users about security risks and best practices.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-034",
      "question": "What is a security policy?",
      "options": [
        "A document that outlines security requirements",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A document that outlines security requirements",
      "explanation": "A security policy is a document that outlines an organization's security requirements and procedures.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-035",
      "question": "What is the purpose of a security audit?",
      "options": [
        "To evaluate security controls",
        "To implement security tools",
        "To monitor network traffic",
        "To configure firewalls"
      ],
      "correctAnswer": "To evaluate security controls",
      "explanation": "A security audit is performed to evaluate the effectiveness of security controls and ensure compliance with security policies.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "id": "secplus-036",
      "question": "What is a security assessment?",
      "options": [
        "A comprehensive security review",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A comprehensive security review",
      "explanation": "A security assessment is a comprehensive review of an organization's security posture and controls.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-037",
      "question": "What is a security control?",
      "options": [
        "A safeguard or countermeasure",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A safeguard or countermeasure",
      "explanation": "A security control is a safeguard or countermeasure designed to protect assets and ensure security objectives.",
      "domain": "General Security Concepts"
    },
    {
      "id": "secplus-038",
      "question": "What is a security threat?",
      "options": [
        "A potential cause of harm",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A potential cause of harm",
      "explanation": "A security threat is any potential cause of an unwanted incident that may result in harm to a system or organization.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-039",
      "question": "What is a security vulnerability?",
      "options": [
        "A weakness that can be exploited",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A weakness that can be exploited",
      "explanation": "A security vulnerability is a weakness that can be exploited by a threat to cause harm.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "id": "secplus-040",
      "question": "What is a security breach?",
      "options": [
        "An incident that compromises security",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "An incident that compromises security",
      "explanation": "A security breach is an incident that results in unauthorized access to or disclosure of protected assets.",
      "domain": "Security Operations"
    },
    {
      "id": "secplus-041",
      "question": "What is incident response?",
      "options": [
        "A plan to handle security incidents",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "A plan to handle security incidents",
      "explanation": "Incident response is a plan and process for detecting, responding to, and recovering from security incidents.",
      "domain": "Security Operations"
    },
    {
      "id": "secplus-042",
      "question": "What is security awareness?",
      "options": [
        "Understanding security responsibilities",
        "A security tool",
        "A monitoring service",
        "A network device"
      ],
      "correctAnswer": "Understanding security responsibilities",
      "explanation": "Security awareness is understanding security risks and responsibilities to protect organizational assets.",
      "domain": "Security Program Management and Oversight"
    }
  ],
  [
    {
      "id": "sc200-001",
      "question": "What is Microsoft Sentinel?",
      "options": [
        "A SIEM solution",
        "A SOAR solution",
        "Both SIEM and SOAR",
        "Neither"
      ],
      "correctAnswer": "Both SIEM and SOAR",
      "explanation": "Microsoft Sentinel is both a Security Information and Event Management (SIEM) and Security Orchestration, Automation, and Response (SOAR) solution.",
      "domain": "Manage Incident Response"
    },
    {
      "id": "sc200-002",
      "question": "What is Microsoft Defender for Cloud?",
      "options": [
        "A cloud security solution",
        "A network monitoring tool",
        "A data backup service",
        "A user management system"
      ],
      "correctAnswer": "A cloud security solution",
      "explanation": "Microsoft Defender for Cloud is a cloud security solution that provides threat protection across Azure resources.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-003",
      "question": "What is Microsoft Defender for Endpoint?",
      "options": [
        "An endpoint security platform",
        "A network firewall",
        "A cloud storage service",
        "A user authentication system"
      ],
      "correctAnswer": "An endpoint security platform",
      "explanation": "Microsoft Defender for Endpoint is an enterprise endpoint security platform designed to help prevent, detect, and respond to advanced threats.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-004",
      "question": "What is Microsoft Defender for Cloud?",
      "options": [
        "A unified security management system",
        "A network monitoring tool",
        "A data backup service",
        "A user management system"
      ],
      "correctAnswer": "A unified security management system",
      "explanation": "Microsoft Defender for Cloud is a unified security management system that strengthens the security posture of your data centers.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-005",
      "question": "What is Microsoft Defender for Cloud Apps?",
      "options": [
        "A cloud access security broker",
        "A network firewall",
        "A data backup service",
        "A user authentication system"
      ],
      "correctAnswer": "A cloud access security broker",
      "explanation": "Microsoft Defender for Cloud Apps is a cloud access security broker that helps you discover and control the use of cloud apps in your organization.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-006",
      "question": "What is Microsoft Entra ID?",
      "options": [
        "A cloud-based identity service",
        "A network monitoring tool",
        "A data backup service",
        "A security information system"
      ],
      "correctAnswer": "A cloud-based identity service",
      "explanation": "Microsoft Entra ID is Microsoft's cloud-based identity and access management service.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-007",
      "question": "What is Microsoft Purview Information Protection?",
      "options": [
        "A data protection solution",
        "A network firewall",
        "A cloud storage service",
        "A user authentication system"
      ],
      "correctAnswer": "A data protection solution",
      "explanation": "Microsoft Purview Information Protection helps you classify and protect your documents and emails by applying labels.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-008",
      "question": "What is Microsoft Defender for Identity?",
      "options": [
        "An identity protection solution",
        "A network monitoring tool",
        "A data backup service",
        "A cloud storage service"
      ],
      "correctAnswer": "An identity protection solution",
      "explanation": "Microsoft Defender for Identity is a cloud-based security solution that uses your on-premises Active Directory signals to identify, detect, and investigate advanced threats.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-009",
      "question": "What is Azure Monitor?",
      "options": [
        "A comprehensive monitoring solution",
        "A network security tool",
        "A data backup service",
        "A user management system"
      ],
      "correctAnswer": "A comprehensive monitoring solution",
      "explanation": "Azure Monitor is a comprehensive solution for collecting, analyzing, and acting on telemetry from your cloud and on-premises environments.",
      "domain": "Manage Security Operations Environment"
    },
    {
      "id": "sc200-010",
      "question": "What is Microsoft Defender for Cloud?",
      "options": [
        "A cloud security posture management solution",
        "A network monitoring tool",
        "A data backup service",
        "A user management system"
      ],
      "correctAnswer": "A cloud security posture management solution",
      "explanation": "Microsoft Defender for Cloud helps you strengthen your security posture and protect against threats.",
      "domain": "Configure Protections and Detections"
    },
    {
      "id": "sc200-011",
      "question": "What is Azure Log Analytics?",
      "options": [
        "A log management and analytics service",
        "A network security tool",
        "A monitoring service",
        "A firewall solution"
      ],
      "correctAnswer": "A log management and analytics service",
      "explanation": "Azure Log Analytics is a service that helps you collect and analyze data generated by resources in your cloud and on-premises environments.",
      "domain": "Manage Security Operations Environment"
    }
  ]
];

const componentQuestions: Record<Exclude<CertificationId, 'aws-saa-c03' | 'sc-200'>, Question[]> = {
  jncia: [
    { id: 'jncia-070', question: 'What is the primary function of the Routing Engine in Junos OS?', options: ['Forwarding network traffic', 'Running routing protocols and maintaining routing tables', 'Filtering packets in hardware', 'Managing physical interfaces only'], correctAnswer: 'Running routing protocols and maintaining routing tables', explanation: 'The Routing Engine runs the control plane, including routing protocols, route selection, and system management.', domain: 'Junos OS Fundamentals' },
    { id: 'jncia-071', question: 'Which command validates and activates candidate configuration changes in Junos OS?', options: ['commit', 'write memory', 'copy running-config startup-config', 'save config'], correctAnswer: 'commit', explanation: 'The commit command validates the candidate configuration and activates it as the active configuration.', domain: 'Configuration Basics' },
    { id: 'jncia-072', question: 'What is the purpose of a rescue configuration in Junos OS?', options: ['To automatically recover from hardware failures', 'To store a known-good configuration for recovery', 'To back up routing tables', 'To save interface configurations only'], correctAnswer: 'To store a known-good configuration for recovery', explanation: 'An administrator can save a known-good configuration and load it if the active configuration needs recovery.', domain: 'Configuration Basics' },
    { id: 'jncia-073', question: 'Which protocol provides encrypted remote CLI access to a Junos device when configured?', options: ['Telnet', 'SSH', 'HTTP', 'SNMP'], correctAnswer: 'SSH', explanation: 'SSH encrypts interactive remote CLI sessions. The SSH service must be configured; it is not enabled on every device by default.', domain: 'Junos OS Fundamentals' },
    { id: 'jncia-074', question: 'Which statement about OSPF areas is correct?', options: ['Area 0 is the backbone area', 'Area 1 is always the backbone area', 'Every area must be a stub area', 'OSPF does not use areas'], correctAnswer: 'Area 0 is the backbone area', explanation: 'Area 0 is the OSPF backbone. Other areas connect to it directly or through a virtual link.', domain: 'Routing Fundamentals' },
    { id: 'jncia-075', question: 'Which Junos interface prefix commonly identifies a Gigabit Ethernet physical interface?', options: ['ge-', 'xe-', 'et-', 'lo-'], correctAnswer: 'ge-', explanation: 'The ge- prefix commonly identifies Gigabit Ethernet interfaces; exact interface types depend on platform hardware.', domain: 'Networking Fundamentals' },
    { id: 'jncia-076', question: 'Which Junos command displays chassis hardware inventory?', options: ['show chassis hardware', 'show system users', 'show route', 'show configuration chassis'], correctAnswer: 'show chassis hardware', explanation: 'show chassis hardware displays hardware component and inventory information.', domain: 'Operational Monitoring and Maintenance' },
    { id: 'jncia-077', question: 'Which Junos command displays system uptime and load averages?', options: ['show system uptime', 'show chassis hardware', 'show interfaces terse', 'show route summary'], correctAnswer: 'show system uptime', explanation: 'show system uptime reports system uptime and load averages.', domain: 'Operational Monitoring and Maintenance' },
    { id: 'jncia-078', question: 'Which Junos command displays filesystem space usage?', options: ['show system storage', 'show system users', 'show chassis alarms', 'show interfaces extensive'], correctAnswer: 'show system storage', explanation: 'show system storage reports filesystem capacity and usage.', domain: 'Operational Monitoring and Maintenance' },
    { id: 'jncia-079', question: 'Which Junos command displays users currently logged in to the device?', options: ['show system users', 'show configuration system login', 'show system alarms', 'show system processes'], correctAnswer: 'show system users', explanation: 'show system users lists active user sessions and associated login information.', domain: 'Operational Monitoring and Maintenance' },
    { id: 'jncia-080', question: 'Which Junos command displays active system alarms?', options: ['show system alarms', 'show chassis hardware', 'show system uptime', 'show route'], correctAnswer: 'show system alarms', explanation: 'show system alarms reports active system alarms that may require investigation.', domain: 'Operational Monitoring and Maintenance' },
    { id: 'jncia-081', question: 'Which protocol is commonly used to synchronize time on network devices?', options: ['NTP', 'SNMP', 'DHCP', 'DNS'], correctAnswer: 'NTP', explanation: 'Network Time Protocol synchronizes clocks across networked systems.', domain: 'Networking Fundamentals' },
    { id: 'jncia-082', question: 'Which standards-based protocol advertises neighbor identity and capabilities on a directly connected link?', options: ['LLDP', 'HTTP', 'NTP', 'FTP'], correctAnswer: 'LLDP', explanation: 'LLDP is a Layer 2 neighbor discovery protocol that advertises device identity and capabilities.', domain: 'Networking Fundamentals' },
    { id: 'jncia-083', question: 'What does a Junos firewall filter do?', options: ['Matches packet fields and applies actions such as accept, discard, or count', 'Encrypts all traffic between security zones', 'Selects the best route using BGP attributes', 'Replaces interface configuration'], correctAnswer: 'Matches packet fields and applies actions such as accept, discard, or count', explanation: 'Junos firewall filters evaluate terms and apply packet actions; they are stateless filters, unlike stateful SRX security policies.', domain: 'Routing Policy and Firewall Filters' },
    { id: 'jncia-084', question: 'Which Junos command displays the installed software version?', options: ['show version', 'show system uptime', 'show chassis hardware', 'show configuration version'], correctAnswer: 'show version', explanation: 'show version displays Junos OS and package version information.', domain: 'Operational Monitoring and Maintenance' },
    { id: 'jncia-085', question: 'Which Junos command displays OSPF neighbor relationships?', options: ['show ospf neighbor', 'show route protocol ospf', 'show configuration ospf neighbors', 'show protocols ospf status'], correctAnswer: 'show ospf neighbor', explanation: 'show ospf neighbor displays operational OSPF adjacency state.', domain: 'Routing Fundamentals' },
    { id: 'jncia-086', question: 'Which command returns to operational mode from the top level of Junos configuration mode?', options: ['exit', 'commit', 'rollback', 'configure'], correctAnswer: 'exit', explanation: 'From the top level of configuration mode, exit returns the CLI to operational mode; at lower hierarchy levels it moves up one level.', domain: 'User Interfaces' },
    { id: 'jncia-087', question: 'Which Junos configuration statement sets the device hostname?', options: ['set system host-name <name>', 'set hostname <name>', 'set system name <name>', 'set device host-name <name>'], correctAnswer: 'set system host-name <name>', explanation: 'The hostname is configured in the system hierarchy with the host-name statement.', domain: 'Configuration Basics' },
    { id: 'jncia-088', question: 'What does the Junos deactivate command do to a configuration statement?', options: ['Marks it inactive without deleting it', 'Deletes it permanently', 'Commits all candidate changes', 'Copies it to the rescue configuration'], correctAnswer: 'Marks it inactive without deleting it', explanation: 'deactivate marks a statement inactive in the candidate configuration; the change takes effect after a successful commit.', domain: 'Configuration Basics' },
  ],
  ccna: [
    { id: 'ccna-064', question: 'Which protocol operates at Layer 2 and prevents switching loops?', options: ['OSPF', 'Spanning Tree Protocol', 'BGP', 'DHCP'], correctAnswer: 'Spanning Tree Protocol', explanation: 'STP prevents Layer 2 switching loops by placing redundant paths into a blocking state while retaining failover paths.', domain: 'Network Access' },
    { id: 'ccna-065', question: 'Which VLAN is the default VLAN on Cisco switches?', options: ['VLAN 1', 'VLAN 10', 'VLAN 100', 'VLAN 4095'], correctAnswer: 'VLAN 1', explanation: 'VLAN 1 is the default VLAN on Cisco switches; it is not inherently a secure management VLAN and should not be assumed to be configured for management.', domain: 'Network Access' },
    { id: 'ccna-066', question: 'What role does Area 0 have in OSPF?', options: ['It is the OSPF backbone area', 'It is reserved for external routes', 'It prevents all inter-area routing', 'It is used only for IPv6'], correctAnswer: 'It is the OSPF backbone area', explanation: 'Area 0 is the OSPF backbone. Other areas connect to it directly or through a virtual link.', domain: 'IP Connectivity' },
    { id: 'ccna-067', question: 'Which sequence represents the DHCPv4 client address assignment exchange?', options: ['Discover, Offer, Request, Acknowledgment', 'Request, Discover, Acknowledgment, Offer', 'Offer, Request, Discover, Acknowledgment', 'Discover, Request, Offer, Acknowledgment'], correctAnswer: 'Discover, Offer, Request, Acknowledgment', explanation: 'The DORA sequence is Discover, Offer, Request, and Acknowledgment.', domain: 'IP Services' },
    { id: 'ccna-068', question: 'Which protocol is the IEEE-standard option for negotiating an EtherChannel?', options: ['LACP', 'PAgP', 'HSRP', 'VRRP'], correctAnswer: 'LACP', explanation: 'Link Aggregation Control Protocol (LACP) is standardized by IEEE 802.1AX; PAgP is Cisco proprietary.', domain: 'Network Access' },
  ],
  'security-plus': [
    { id: 'secplus-043', question: 'Which statement best describes defense in depth?', options: ['Using one strong security control', 'Implementing multiple layers of security controls', 'Focusing only on perimeter security', 'Using encryption as the only data protection'], correctAnswer: 'Implementing multiple layers of security controls', explanation: 'Defense in depth uses complementary control layers so that one control can reduce risk when another fails.', domain: 'Security Architecture' },
    { id: 'secplus-044', question: 'What is the primary purpose of a SIEM system?', options: ['Encrypt network traffic', 'Collect and analyze security events from multiple sources', 'Block malicious websites', 'Manage user passwords'], correctAnswer: 'Collect and analyze security events from multiple sources', explanation: 'A SIEM collects and correlates security telemetry to support detection, investigation, and response.', domain: 'Security Operations' },
    { id: 'secplus-045', question: 'Which encryption type uses the same secret key for encryption and decryption?', options: ['Asymmetric encryption', 'Symmetric encryption', 'Hashing', 'Digital signatures'], correctAnswer: 'Symmetric encryption', explanation: 'Symmetric encryption uses the same secret key for encryption and decryption; the key must be protected and distributed securely.', domain: 'Security Architecture' },
    { id: 'secplus-046', question: 'What is the purpose of non-repudiation?', options: ['Prevent data loss', 'Provide evidence that helps establish the origin or delivery of an action or message', 'Encrypt all stored data', 'Block network attacks'], correctAnswer: 'Provide evidence that helps establish the origin or delivery of an action or message', explanation: 'Non-repudiation uses evidence such as digital signatures and audit records to help establish origin or delivery.', domain: 'General Security Concepts' },
    { id: 'secplus-047', question: 'Which attack can occur when untrusted input is incorporated into SQL commands without safe parameterization?', options: ['Social engineering', 'SQL injection', 'Shoulder surfing', 'Tailgating'], correctAnswer: 'SQL injection', explanation: 'SQL injection can result when applications build SQL commands from untrusted input instead of using safe parameterized queries.', domain: 'Threats, Vulnerabilities, and Mitigations' },
  ],
};

const deduplicateQuestions = (questions: Question[]): Question[] => {
  const seenPrompts = new Set<string>();
  return questions.filter((question) => {
    const key = question.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (seenPrompts.has(key)) return false;
    seenPrompts.add(key);
    return true;
  });
};

export const examQuestions: ExamQuestions = {
  'aws-saa-c03': deduplicateQuestions(awsSaaQuestions),
  jncia: deduplicateQuestions([
    ...migratedQuestions[0].filter(({ id }) => !/^jncia-(?:04[89]|0[5-6]\d)$/.test(id)),
    ...componentQuestions.jncia,
  ]),
  ccna: deduplicateQuestions([...migratedQuestions[1], ...componentQuestions.ccna]),
  'security-plus': deduplicateQuestions([...migratedQuestions[2], ...componentQuestions['security-plus']]),
  'sc-200': deduplicateQuestions(migratedQuestions[3]),
};

export const jnciaQuestions = examQuestions.jncia;
export const ccnaQuestions = examQuestions.ccna;
export const securityQuestions = examQuestions['security-plus'];
export const sc200Questions = examQuestions['sc-200'];
