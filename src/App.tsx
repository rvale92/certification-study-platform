import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link as RouterLink, Navigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Menu as MenuIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Shuffle as ShuffleIcon,
  ExpandMore as ExpandMoreIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Wifi as WifiIcon,
  Hub as HubIcon,
  Build as BuildIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { examQuestions as examQuestionsData } from './data/examQuestions';
import ExamReview from './pages/ExamReview';

const drawerWidth = 240;

// Theme configuration
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern blue
      light: '#60a5fa',
      dark: '#1e40af',
    },
    secondary: {
      main: '#db2777', // Vibrant pink
      light: '#f472b6',
      dark: '#be185d',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        contained: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e2e8f0',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '8px',
        },
      },
    },
  },
});

// Types
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category?: string;
}

interface ExamQuestions {
  jncia: Question[];
  ccna: Question[];
  security: Question[];
  sc205: Question[];
}

// Data
const certifications = [
  {
    name: 'JNCIA 105',
    description: 'Juniper Networks Certified Associate - Junos',
    color: '#84B135',
  },
  {
    name: 'CCNA',
    description: 'Cisco Certified Network Associate',
    color: '#1BA0D7',
  },
  {
    name: 'CompTIA Security+',
    description: 'Security+ Certification',
    color: '#FF0000',
  },
  {
    name: 'Microsoft SC-205',
    description: 'Microsoft Security Operations Analyst',
    color: '#00A4EF',
  },
];

const features = [
  {
    title: 'Practice Exams',
    description: 'Test your knowledge with timed practice exams that simulate the real certification experience.',
    path: '/practice-exams',
  },
  {
    title: 'Flashcards',
    description: 'Review key concepts and terms with interactive flashcards.',
    path: '/flashcards',
  },
  {
    title: 'Study Topics',
    description: 'Explore detailed study materials organized by topic.',
    path: '/study-topics',
  },
];

const exams = [
  {
    id: 'jncia',
    name: 'JNCIA 105',
    description: 'Juniper Networks Certified Associate - Junos',
    color: '#84B135',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
  {
    id: 'ccna',
    name: 'CCNA',
    description: 'Cisco Certified Network Associate',
    color: '#1BA0D7',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
  {
    id: 'security',
    name: 'CompTIA Security+',
    description: 'Security+ Certification',
    color: '#FF0000',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
  {
    id: 'sc205',
    name: 'Microsoft SC-205',
    description: 'Microsoft Security Operations Analyst',
    color: '#00A4EF',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
];

// Types for the flashcards
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category?: string;
  exam: string;
}

interface FlashcardsData {
  jncia: Flashcard[];
  ccna: Flashcard[];
  security: Flashcard[];
  sc205: Flashcard[];
}

// Types for study topics
interface StudyTopic {
  title: string;
  description: string;
  topics: string[];
}

interface StudyTopicsData {
  jncia: StudyTopic[];
  ccna: StudyTopic[];
  security: StudyTopic[];
  sc205: StudyTopic[];
}

// Update the Topic interface
interface Topic {
  title: string;
  icon: React.ElementType;
  items: string[];
  exam: string;
  description: string;
}

// Update the topics data with descriptions
const topics: Topic[] = [
  // JNCIA Topics
  {
    title: 'Junos OS Fundamentals',
    icon: StorageIcon,
    items: [
      'Junos OS Architecture',
      'CLI Navigation',
      'Configuration Management',
      'System Management',
      'Interface Configuration'
    ],
    exam: 'jncia',
    description: 'Master the fundamentals of Junos OS, including its architecture, command-line interface, configuration management, system administration, and interface setup. Learn essential commands and best practices for managing Juniper devices.'
  },
  {
    title: 'Routing Fundamentals',
    icon: HubIcon,
    items: [
      'Static Routing',
      'Dynamic Routing',
      'Routing Policies',
      'Route Preferences',
      'Routing Instances'
    ],
    exam: 'jncia',
    description: 'Understand routing concepts in Junos OS, from basic static routing to advanced dynamic routing protocols. Learn about routing policies, route preferences, and how to implement routing instances for complex network scenarios.'
  },
  {
    title: 'Security Features',
    icon: SecurityIcon,
    items: [
      'Firewall Filters',
      'Security Zones',
      'NAT Configuration',
      'IPsec VPNs',
      'Security Policies'
    ],
    exam: 'jncia',
    description: 'Explore Junos OS security features including firewall filters, security zones, NAT, IPsec VPNs, and security policies. Learn how to implement and manage security controls to protect your network infrastructure.'
  },
  // CCNA Topics
  {
    title: 'Network Fundamentals',
    icon: WifiIcon,
    items: [
      'OSI Model',
      'TCP/IP Protocol Suite',
      'Network Topologies',
      'IP Addressing',
      'Subnetting'
    ],
    exam: 'ccna',
    description: 'Build a strong foundation in networking concepts, including the OSI model, TCP/IP protocols, network topologies, IP addressing, and subnetting. Essential knowledge for network design and troubleshooting.'
  },
  {
    title: 'LAN Switching',
    icon: HubIcon,
    items: [
      'VLANs',
      'Trunking',
      'Spanning Tree',
      'EtherChannel',
      'Switch Security'
    ],
    exam: 'ccna',
    description: 'Master LAN switching technologies including VLANs, trunking, spanning tree protocol, EtherChannel, and switch security features. Learn to design and implement efficient switched networks.'
  },
  {
    title: 'Routing Technologies',
    icon: HubIcon,
    items: [
      'Static Routing',
      'OSPF',
      'EIGRP',
      'BGP',
      'Route Redistribution'
    ],
    exam: 'ccna',
    description: 'Learn routing protocols and technologies including static routing, OSPF, EIGRP, BGP, and route redistribution. Understand how to implement and troubleshoot routing in complex networks.'
  },
  // Security+ Topics
  {
    title: 'Threats, Attacks, and Vulnerabilities',
    icon: SecurityIcon,
    items: [
      'Malware Types',
      'Attack Vectors',
      'Social Engineering',
      'Vulnerability Assessment',
      'Penetration Testing'
    ],
    exam: 'security',
    description: 'Understand various types of threats, attack vectors, and vulnerabilities in modern networks. Learn about malware, social engineering, and how to assess and test security controls.'
  },
  {
    title: 'Architecture and Design',
    icon: BuildIcon,
    items: [
      'Security Frameworks',
      'Network Security',
      'Cloud Security',
      'Zero Trust',
      'Secure Protocols'
    ],
    exam: 'security',
    description: 'Master security architecture and design principles, including security frameworks, network and cloud security, zero trust architecture, and secure protocol implementation.'
  },
  {
    title: 'Implementation',
    icon: BuildIcon,
    items: [
      'Identity and Access Management',
      'Secure Protocols',
      'Host Security',
      'Mobile Security',
      'Embedded Systems'
    ],
    exam: 'security',
    description: 'Implement security controls across various platforms and environments. Learn about identity management, secure protocols, and security for mobile and embedded systems.'
  },
  // SC-205 Topics
  {
    title: 'Microsoft Security Solutions',
    icon: SecurityIcon,
    items: [
      'Microsoft Defender for Cloud',
      'Microsoft Sentinel',
      'Microsoft Defender for Identity',
      'Microsoft Defender for Endpoint',
      'Microsoft Defender for Office 365'
    ],
    exam: 'sc205',
    description: 'Master Microsoft\'s comprehensive security solutions for cloud, identity, endpoint, and Office 365 environments. Learn to implement and manage these security tools effectively.'
  },
  {
    title: 'Security Operations',
    icon: SecurityIcon,
    items: [
      'Security Monitoring',
      'Incident Response',
      'Threat Hunting',
      'Security Automation',
      'Compliance Management'
    ],
    exam: 'sc205',
    description: 'Learn to manage security operations using Microsoft tools. Master security monitoring, incident response, threat hunting, and compliance management in a Microsoft environment.'
  },
  {
    title: 'Identity and Access',
    icon: PersonIcon,
    items: [
      'Azure Active Directory',
      'Conditional Access',
      'Privileged Identity Management',
      'Identity Protection',
      'Access Reviews'
    ],
    exam: 'sc205',
    description: 'Implement and manage identity and access solutions using Microsoft Azure AD. Learn about conditional access, privileged identity management, and identity protection features.'
  }
];

// Create flashcards directly from exam questions to ensure consistency
const createFlashcardsFromExamQuestions = () => {
  const flashcardsData: FlashcardsData = {
    jncia: [],
    ccna: [],
    security: [],
    sc205: []
  };
  
  // Iterate through all exam questions and create corresponding flashcards
  Object.entries(examQuestionsData).forEach(([examKey, questions]) => {
    const examId = examKey as keyof ExamQuestions;
    
    questions.forEach((question: Question) => {
      // Create a flashcard from the question
      flashcardsData[examId].push({
        id: `${examId}-${question.id}`,
        question: question.question,
        answer: question.explanation || question.correctAnswer,
        category: question.category || 'General',
        exam: examId
      });
    });
  });
  
  return flashcardsData;
};

// Create the flashcards from exam questions
const flashcardsData = createFlashcardsFromExamQuestions();

// Transform the flashcardsData structure to a flat array for the Flashcards component
const flashcards: Flashcard[] = [
  ...flashcardsData.jncia.map(card => ({ ...card, exam: 'jncia' })),
  ...flashcardsData.ccna.map(card => ({ ...card, exam: 'ccna' })),
  ...flashcardsData.security.map(card => ({ ...card, exam: 'security' })),
  ...flashcardsData.sc205.map(card => ({ ...card, exam: 'sc205' }))
];

// Study topics with detailed descriptions
const studyTopics: StudyTopicsData = {
  jncia: [
    {
      title: 'CLI Navigation',
      description: 'Learn how to efficiently navigate the Junos CLI, including operational and configuration modes, command completion, and help commands.',
      topics: [
        'Operational Mode vs. Configuration Mode',
        'Command completion (Tab, space)',
        'Help commands and context-sensitive help',
        'Moving between configuration hierarchies',
        'Viewing and managing CLI history'
      ]
    },
    {
      title: 'System Management',
      description: 'Master the essential system management functions including user management, system services, and file operations.',
      topics: [
        'User management and authentication',
        'System services configuration',
        'File operations and storage',
        'Software upgrades and rollbacks',
        'Logging and system alerts'
      ]
    },
    {
      title: 'Routing Fundamentals',
      description: 'Understand core routing concepts in Junos including static routes, dynamic routing protocols, and route preferences.',
      topics: [
        'Static routing configuration',
        'Dynamic routing protocols overview',
        'Route preferences and administrative distances',
        'Route tables and forwarding tables',
        'Routing policy basics'
      ]
    },
    {
      title: 'Interfaces',
      description: 'Configure and troubleshoot various network interfaces in Junos OS, including physical and logical configurations.',
      topics: [
        'Physical interface configuration',
        'Logical interface units',
        'Interface addressing options',
        'Ethernet interfaces and options',
        'Interface monitoring and troubleshooting'
      ]
    },
    {
      title: 'Switching Concepts',
      description: 'Explore Layer 2 switching concepts in Junos, including VLANs, spanning tree, and link aggregation.',
      topics: [
        'VLAN configuration and management',
        'Spanning Tree Protocol (STP)',
        'Link Aggregation (LAG)',
        'Layer 2 security features',
        'Q-in-Q and VLAN manipulation'
      ]
    }
  ],
  ccna: [
    {
      title: 'Network Fundamentals',
      description: 'Comprehensive overview of networking concepts, models, protocols, and addressing systems.',
      topics: [
        'OSI and TCP/IP models',
        'IPv4 and IPv6 addressing',
        'Network topologies',
        'Physical media types',
        'Network segmentation principles'
      ]
    },
    {
      title: 'Network Access',
      description: 'Understanding how devices connect to networks and how networks connect to other networks.',
      topics: [
        'Ethernet switching',
        'VLANs and trunking',
        'Access and distribution layers',
        'Wireless principles',
        'Layer 2 discovery protocols'
      ]
    },
    {
      title: 'IP Connectivity',
      description: 'Explore IP routing concepts, configuration, and troubleshooting methodologies.',
      topics: [
        'Static routing',
        'OSPF fundamentals',
        'EIGRP fundamentals',
        'Path selection and route tables',
        'IPv4 and IPv6 routing differences'
      ]
    },
    {
      title: 'IP Services',
      description: 'Learn about the various services that support IP networks, including DHCP, NAT, and first-hop redundancy.',
      topics: [
        'DHCP and DNS operation',
        'NAT and PAT',
        'First-hop redundancy (HSRP, VRRP)',
        'NTP and SNMP',
        'QoS concepts'
      ]
    },
    {
      title: 'Security Fundamentals',
      description: 'Understand the principles of network security, including access control and threat defense.',
      topics: [
        'Access control concepts',
        'Wireless security',
        'Layer 2 security threats',
        'Device security hardening',
        'Password management and encryption'
      ]
    }
  ],
  security: [
    {
      title: 'Security Fundamentals',
      description: 'Core security principles and concepts that form the foundation of cybersecurity practices.',
      topics: [
        'CIA Triad (Confidentiality, Integrity, Availability)',
        'Authentication, Authorization, and Accounting',
        'Risk management frameworks',
        'Security controls',
        'Defense in depth'
      ]
    },
    {
      title: 'Network Security',
      description: 'Protection mechanisms for networks, including firewalls, IDS/IPS, and secure network design.',
      topics: [
        'Firewall technologies and configurations',
        'IDS/IPS deployment',
        'Network segmentation',
        'VPN technologies',
        'Secure network architecture'
      ]
    },
    {
      title: 'Cryptography',
      description: 'Understanding cryptographic principles, algorithms, and implementations for data protection.',
      topics: [
        'Symmetric and asymmetric encryption',
        'Hash functions and digital signatures',
        'PKI and certificate management',
        'TLS/SSL protocols',
        'Cryptographic attacks'
      ]
    },
    {
      title: 'Identity and Access Management',
      description: 'Systems and processes to manage digital identities and control resource access.',
      topics: [
        'Identity management systems',
        'Multi-factor authentication',
        'Single sign-on (SSO)',
        'Privileged access management',
        'Access control models'
      ]
    },
    {
      title: 'Security Operations',
      description: 'Day-to-day processes and tools used to monitor, maintain, and respond to security incidents.',
      topics: [
        'Security monitoring',
        'SIEM implementation',
        'Incident response',
        'Digital forensics',
        'Vulnerability management'
      ]
    }
  ],
  sc205: [
    {
      title: 'Identity and Access Management',
      description: 'Microsoft Azure authentication and authorization services, including Azure AD and conditional access.',
      topics: [
        'Azure Active Directory',
        'Conditional Access policies',
        'Multi-factor authentication',
        'Identity Protection',
        'Privileged Identity Management'
      ]
    },
    {
      title: 'Platform Protection',
      description: 'Securing Azure infrastructure and platform services through multiple security layers.',
      topics: [
        'Network security groups',
        'Azure Firewall',
        'Just-in-time VM access',
        'Azure DDoS protection',
        'Azure security baselines'
      ]
    },
    {
      title: 'Security Operations',
      description: 'Tools and services for monitoring, assessing, and maintaining security posture in Azure.',
      topics: [
        'Azure Security Center',
        'Azure Sentinel',
        'Security alerts and incidents',
        'Azure Monitor',
        'Log Analytics'
      ]
    },
    {
      title: 'Data and Applications',
      description: 'Protecting data and applications in Azure through encryption and secure development practices.',
      topics: [
        'Azure Key Vault',
        'Storage service encryption',
        'SQL data security',
        'Azure Information Protection',
        'Application security in Azure'
      ]
    },
    {
      title: 'Governance and Compliance',
      description: 'Implementing governance and ensuring compliance in Azure environments.',
      topics: [
        'Azure Policy',
        'Azure Blueprints',
        'Resource Locks',
        'Compliance in Azure',
        'Azure Security Center compliance'
      ]
    }
  ]
};

// Home Component
const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 8,
          mt: 4,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            height: '300px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(219,39,119,0.1) 100%)',
            borderRadius: '0 0 50% 50%',
            zIndex: -1,
          }
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #2563eb 0%, #db2777 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          Welcome to Certification Study Platform
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Your comprehensive resource for IT certification preparation
        </Typography>
      </Box>

      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          mb: 4,
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        Available Certifications
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {certifications.map((cert) => (
          <Grid item xs={12} sm={6} md={3} key={cert.name}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${cert.color}`,
                position: 'relative',
                overflow: 'visible',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${cert.color}20 0%, transparent 100%)`,
                  borderRadius: 'inherit',
                  zIndex: 0,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: cert.color,
                  }}
                >
                  {cert.name}
                </Typography>
                <Typography 
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {cert.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, position: 'relative', zIndex: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={async () => {
                    try {
                      // Open the window first (this should work as it's directly triggered by the click)
                      const newWindow = window.open('about:blank', '_blank');
                      if (!newWindow) {
                        alert('Please allow popups for this site to access the study materials.');
                        return;
                      }

                      const apiKey = 'AIzaSyAhpDiYKRwN2vXFc-CwbbpjY2qMzfoygMw';
                      const searchQuery = `${cert.name} certification tutorial`;
                      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(searchQuery)}&key=${apiKey}&type=video`;
                      
                      newWindow.document.write('Loading study materials...');
                      
                      const response = await fetch(apiUrl);
                      const data = await response.json();
                      
                      if (data.items && data.items.length > 0) {
                        const videoId = data.items[0].id.videoId;
                        newWindow.location.href = `https://www.youtube.com/watch?v=${videoId}`;
                      } else {
                        newWindow.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                      }
                    } catch (error) {
                      console.error('Error fetching YouTube data:', error);
                      // Open a new window with the search results as fallback
                      const searchQuery = `${cert.name} certification tutorial`;
                      const fallbackWindow = window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
                      if (!fallbackWindow) {
                        alert('Please allow popups for this site to access the study materials.');
                      }
                    }
                  }}
                  sx={{
                    bgcolor: cert.color,
                    '&:hover': {
                      bgcolor: cert.color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  Start Studying
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          mb: 4,
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(219,39,119,0.1) 100%)`,
                  borderRadius: 'inherit',
                  opacity: index % 2 === 0 ? 1 : 0.5,
                  zIndex: 0,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #2563eb 0%, #db2777 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, position: 'relative', zIndex: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(feature.path)}
                >
                  Get Started
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// PracticeExams Component
const PracticeExams: React.FC = () => {
  const navigate = useNavigate();
  const { certId } = useParams<{ certId?: string }>();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [filteredExams, setFilteredExams] = useState(exams);

  useEffect(() => {
    if (certId) {
      const filtered = exams.filter(exam => 
        exam.id === certId || 
        exam.name.toLowerCase().replace(/\s+/g, '-') === certId
      );
      setFilteredExams(filtered);
    } else {
      setFilteredExams(exams);
    }
  }, [certId]);

  const handleStartExam = (examId: string) => {
    setSelectedExam(examId);
    setShowStartDialog(true);
  };

  const handleConfirmStart = () => {
    if (selectedExam) {
      navigate(`/exam/${selectedExam}`);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 8,
          mt: 4,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            height: '300px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(219,39,119,0.1) 100%)',
            borderRadius: '0 0 50% 50%',
            zIndex: -1,
          }
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #2563eb 0%, #db2777 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          Practice Exams
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Choose an exam to begin your practice session
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {filteredExams.map((exam) => (
          <Grid item xs={12} sm={6} md={3} key={exam.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${exam.color}`,
                position: 'relative',
                overflow: 'visible',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${exam.color}20 0%, transparent 100%)`,
                  borderRadius: 'inherit',
                  zIndex: 0,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: exam.color,
                  }}
                >
                  {exam.name}
                </Typography>
                <Typography 
                  color="text.secondary" 
                  paragraph
                  sx={{ mb: 3 }}
                >
                  {exam.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1,
                  mb: 2,
                  '& > div': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }
                }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Duration:
                    </Typography>
                    <Typography variant="body2" fontWeight="500">
                      {exam.duration} minutes
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Questions:
                    </Typography>
                    <Typography variant="body2" fontWeight="500">
                      {exam.totalQuestions}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Passing Score:
                    </Typography>
                    <Typography variant="body2" fontWeight="500">
                      {exam.passingScore}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, position: 'relative', zIndex: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleStartExam(exam.id)}
                  sx={{
                    bgcolor: exam.color,
                    '&:hover': {
                      bgcolor: exam.color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  Start Exam
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={showStartDialog} 
        onClose={() => setShowStartDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 2,
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center',
            fontWeight: 600,
            pb: 1,
          }}
        >
          Start Practice Exam
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: 'center', mb: 2 }}>
            Are you ready to begin the practice exam? You will have {exams.find(e => e.id === selectedExam)?.duration} minutes to complete it.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button 
            onClick={() => setShowStartDialog(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmStart} 
            color="primary" 
            variant="contained"
            sx={{
              minWidth: '120px',
            }}
          >
            Start Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// Exam Component
const Exam: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleFinish = useCallback(() => {
    const finalScore = answers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(finalScore);
    setShowScore(true);
  }, [answers, questions]);

  useEffect(() => {
    if (examId && examQuestionsData[examId as keyof typeof examQuestionsData]) {
      // Get all questions for the exam
      const allQuestions = examQuestionsData[examId as keyof typeof examQuestionsData];
      // Randomly select 65 questions
      const shuffled = [...allQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 65);
      setQuestions(shuffled);
      setAnswers(new Array(65).fill(''));
    }
  }, [examId]);

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore) {
      handleFinish();
    }
  }, [timeLeft, showScore, handleFinish]);

  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleConfirmFinish = () => {
    setShowConfirmDialog(true);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showScore) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          align="center"
          sx={{
            fontWeight: 700,
            mb: 4,
          }}
        >
          Exam Results
        </Typography>
        <Card sx={{ 
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: passed 
              ? 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(16,185,129,0.1) 100%)'
              : 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(220,38,38,0.1) 100%)',
            borderRadius: 'inherit',
            zIndex: 0,
          }
        }}>
          <CardContent sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ fontWeight: 600 }}
              >
                Your Score: {score} out of {questions.length}
              </Typography>
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  color: passed ? 'success.main' : 'error.main',
                }}
              >
                {percentage.toFixed(1)}%
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: passed ? 'success.main' : 'error.main',
                  fontWeight: 600,
                }}
              >
                {passed ? 'Passed' : 'Failed'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/exam-review/' + examId)}
                sx={{
                  minWidth: '160px',
                  py: 1.5,
                }}
              >
                Review Answers
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/practice-exams')}
                sx={{
                  minWidth: '160px',
                  py: 1.5,
                }}
              >
                Back to Exams
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box 
        sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h4" 
          align="center"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Loading exam...
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        align="center"
        sx={{
          fontWeight: 700,
          mb: 4,
          background: 'linear-gradient(135deg, #2563eb 0%, #db2777 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {examId?.toUpperCase()} Practice Exam
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Time Remaining: {formatTime(timeLeft)}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(timeLeft / 5400) * 100} 
          sx={{ 
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(37,99,235,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              background: 'linear-gradient(90deg, #2563eb 0%, #db2777 100%)',
            }
          }}
        />
      </Box>

      <Card sx={{ 
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(219,39,119,0.1) 100%)',
          borderRadius: 'inherit',
          zIndex: 0,
        }
      }}>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={((currentQuestion + 1) / questions.length) * 100} 
              sx={{ 
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(37,99,235,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #2563eb 0%, #db2777 100%)',
                }
              }}
            />
          </Box>

          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              mb: 3,
            }}
          >
            {questions[currentQuestion].question}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={
                    <Radio 
                      sx={{
                        '&.Mui-checked': {
                          color: '#2563eb',
                        }
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ py: 0.5 }}>
                      {option}
                    </Typography>
                  }
                  sx={{
                    width: '100%',
                    mx: 0,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'rgba(37,99,235,0.05)',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mt: 4,
        gap: 2,
      }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          sx={{
            minWidth: '120px',
            py: 1.5,
          }}
        >
          Previous
        </Button>
        {currentQuestion < questions.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              minWidth: '120px',
              py: 1.5,
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmFinish}
            sx={{
              minWidth: '120px',
              py: 1.5,
            }}
          >
            Finish Exam
          </Button>
        )}
      </Box>

      <Dialog 
        open={showConfirmDialog} 
        onClose={() => setShowConfirmDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 2,
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center',
            fontWeight: 600,
            pb: 1,
          }}
        >
          Finish Exam
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: 'center', mb: 2 }}>
            Are you sure you want to finish the exam? You will not be able to return to it.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button 
            onClick={() => setShowConfirmDialog(false)}
            variant="outlined"
            sx={{ minWidth: '100px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleFinish} 
            color="primary" 
            variant="contained"
            sx={{ minWidth: '100px' }}
          >
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Flashcards Component
const Flashcards: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [shuffledCards, setShuffledCards] = useState([...flashcards]);

  const filteredCards = selectedExam === 'all' 
    ? shuffledCards 
    : shuffledCards.filter(card => card.exam === selectedExam);

  const handleNext = () => {
    if (currentCard < filteredCards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    const newShuffled = [...filteredCards]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setShuffledCards(newShuffled);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const handleExamChange = (exam: string) => {
    setSelectedExam(exam);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{
          fontWeight: 700,
          mb: 4,
          background: 'linear-gradient(135deg, #2563eb 0%, #db2777 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Flashcards
      </Typography>
      <Typography 
        variant="body1" 
        paragraph 
        align="center" 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Review key concepts and terms with interactive flashcards
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
        <Button
          variant={selectedExam === 'all' ? 'contained' : 'outlined'}
          onClick={() => handleExamChange('all')}
        >
          All Exams
        </Button>
        <Button
          variant={selectedExam === 'jncia' ? 'contained' : 'outlined'}
          onClick={() => handleExamChange('jncia')}
        >
          JNCIA
        </Button>
        <Button
          variant={selectedExam === 'ccna' ? 'contained' : 'outlined'}
          onClick={() => handleExamChange('ccna')}
        >
          CCNA
        </Button>
        <Button
          variant={selectedExam === 'security' ? 'contained' : 'outlined'}
          onClick={() => handleExamChange('security')}
        >
          Security+
        </Button>
        <Button
          variant={selectedExam === 'sc205' ? 'contained' : 'outlined'}
          onClick={() => handleExamChange('sc205')}
        >
          SC-205
        </Button>
      </Box>

      {filteredCards.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card 
              sx={{ 
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: 6,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(219,39,119,0.1) 100%)',
                  zIndex: 0,
                },
              }}
              onClick={handleFlip}
            >
              <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {isFlipped ? filteredCards[currentCard].question : filteredCards[currentCard].answer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isFlipped ? 'Answer' : 'Question'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<PrevIcon />}
                onClick={handlePrevious}
                disabled={currentCard === 0}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShuffleIcon />}
                onClick={handleShuffle}
              >
                Shuffle
              </Button>
              <Button
                variant="outlined"
                endIcon={<NextIcon />}
                onClick={handleNext}
                disabled={currentCard === filteredCards.length - 1}
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" align="center" color="text.secondary">
          No flashcards available for this exam
        </Typography>
      )}
    </Box>
  );
};

// Study Topics Component
const StudyTopics: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredTopics = selectedExam === 'all' 
    ? topics 
    : topics.filter(topic => topic.exam === selectedExam);
    
  // Helper function to get description for each subtopic
  const getSubtopicDescription = (examId: string, subtopicName: string): string => {
    // Try to find an exact match in studyTopics
    const examTopics = studyTopics[examId as keyof StudyTopicsData] || [];
    const exactMatch = examTopics.find(t => t.title === subtopicName);
    
    if (exactMatch) return exactMatch.description;
    
    // Descriptions for subtopics that don't have an exact match
    const descriptions: {[key: string]: string} = {
      // JNCIA topic descriptions
      'Junos OS Architecture': 'Understanding the modular architecture of Junos OS, including the separation between control and forwarding planes, process daemons, and kernel features.',
      'Configuration Management': 'Learn about configuration modes, commit model, rollbacks, and file management in Junos OS for reliable configuration changes.',
      'Interface Configuration': 'Master the configuration of physical and logical interfaces in Junos OS, including addressing, encapsulation, and monitoring options.',
      'Static Routing': 'Configure and verify static routes in Junos OS, including default routes and static route preferences.',
      'Dynamic Routing': 'Introduction to dynamic routing protocols supported in Junos OS, including OSPF, BGP, IS-IS, and RIP.',
      'Routing Policies': 'Learn how to filter and manipulate routes using Junos routing policies, terms, and actions.',
      'Route Preferences': 'Understand administrative distances in Junos OS and how they affect route selection between protocols.',
      'Routing Instances': 'Configure separate routing tables for network isolation with routing instances in Junos.',
      'Firewall Filters': 'Implement stateless packet filtering on Juniper devices for access control and traffic management.',
      'Security Zones': 'Configure security zones to segment and secure your network traffic with proper policies.',
      'NAT Configuration': 'Implement source and destination NAT configurations for address translation in Junos.',
      'IPsec VPNs': 'Configure secure site-to-site and remote access VPN tunnels using IPsec in Junos.',
      'Security Policies': 'Create and manage security policies that control traffic flow between zones in Junos SRX devices.',
      
      // CCNA topic descriptions
      'OSI Model': 'Understanding the seven-layer OSI reference model and how networking protocols map to different layers.',
      'TCP/IP Protocol Suite': 'Deep dive into the TCP/IP protocol stack, including key protocols at each layer and their functions.',
      'Network Topologies': 'Learn various physical and logical network topologies and their implications for network design.',
      'IP Addressing': 'Master IPv4 and IPv6 addressing schemes, including subnetting and address assignment methods.',
      'Subnetting': 'Techniques for dividing IP networks into subnets to optimize addressing and improve network efficiency.',
      'VLANs': 'Configure Virtual LANs to segment broadcast domains and improve network security and performance.',
      'Trunking': 'Implement VLAN trunking to carry multiple VLANs across network links between switches.',
      'Spanning Tree': 'Configure and troubleshoot Spanning Tree Protocol to prevent Layer 2 loops while maintaining redundancy.',
      'EtherChannel': 'Bundle multiple physical interfaces into a logical link for increased bandwidth and redundancy.',
      'Switch Security': 'Implement port security, DHCP snooping, dynamic ARP inspection, and other switch security features.',
      'OSPF': 'Configure and troubleshoot Open Shortest Path First routing protocol for efficient internal routing.',
      'EIGRP': 'Implement Enhanced Interior Gateway Routing Protocol for flexible and scalable routing in Cisco environments.',
      'BGP': 'Introduction to Border Gateway Protocol for internet routing and multi-homed enterprise networks.',
      'Route Redistribution': 'Learn how to share routes between different routing protocols and routing domains.',
      
      // Security+ topic descriptions
      'Malware Types': 'Understanding various types of malware including viruses, worms, trojans, ransomware, and their infection vectors.',
      'Attack Vectors': 'Explore common pathways attackers use to breach systems, including social engineering, network-based, and physical attacks.',
      'Social Engineering': 'Study psychological manipulation techniques used to trick users into breaking security procedures.',
      'Vulnerability Assessment': 'Methods and tools for identifying and quantifying security vulnerabilities in systems and networks.',
      'Penetration Testing': 'Techniques for authorized simulated attacks to evaluate the security of IT systems and identify weaknesses.',
      'Security Frameworks': 'Overview of established security frameworks like NIST, ISO, CIS, and COBIT that guide security implementations.',
      'Network Security': 'Technologies and practices for protecting network infrastructure, including firewalls, IDS/IPS, and segmentation.',
      'Cloud Security': 'Security considerations and controls specific to cloud computing environments and service models.',
      'Zero Trust': 'Understanding the zero trust security model that assumes no implicit trust for any entity inside or outside the network.',
      'Secure Protocols': 'Analysis of secure communication protocols for authentication, encryption, and secure data transfer.',
      'Identity and Access Management': 'Technologies and processes for managing digital identities and user access to systems and resources.',
      'Host Security': 'Methods for securing endpoint devices, including hardening, patch management, and host-based security tools.',
      'Mobile Security': 'Approaches to securing mobile devices, applications, and data in enterprise environments.',
      'Embedded Systems': 'Security considerations for IoT devices, industrial control systems, and other embedded technologies.',
      
      // SC-205 topic descriptions
      'Microsoft Defender for Cloud': 'Cloud-native security management service providing protection across Azure, hybrid, and multi-cloud environments.',
      'Microsoft Sentinel': 'Cloud-native SIEM and SOAR solution for intelligent security analytics and threat intelligence across enterprise.',
      'Microsoft Defender for Identity': 'Cloud-based security solution that identifies, detects, and investigates advanced threats against your identity infrastructure.',
      'Microsoft Defender for Endpoint': 'Endpoint security platform that helps prevent, detect, investigate, and respond to advanced threats.',
      'Microsoft Defender for Office 365': 'Protection against sophisticated attacks targeting email, links, and collaboration tools.',
      'Security Monitoring': 'Continuous surveillance of systems, networks, and cloud services to detect security threats and anomalies.',
      'Incident Response': 'Structured approach to handling security breaches, including preparation, detection, containment, and recovery phases.',
      'Threat Hunting': 'Proactive search for threats that have evaded existing security solutions using advanced detection techniques.',
      'Security Automation': 'Implementing automated workflows for security alerts triage, investigation, and remediation actions.',
      'Compliance Management': 'Tools and processes to assess, monitor, and maintain compliance with regulatory standards and security policies.',
      'Azure Active Directory': 'Microsoft\'s cloud-based identity and access management service for secure authentication and authorization.',
      'Conditional Access': 'Microsoft\'s policy-based access control that grants or denies access based on identity signals and conditions.',
      'Privileged Identity Management': 'Service for managing, controlling, and monitoring privileged access to resources in Azure AD and Azure.',
      'Identity Protection': 'Microsoft tool that detects and prevents identity-based risks using machine learning and heuristics.',
      'Access Reviews': 'Process for regular review and certification of user access to ensure least privilege principle is maintained.'
    };
    
    return descriptions[subtopicName] || 'Learn about key concepts and best practices for this topic.';
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{
          fontWeight: 700,
          mb: 4,
          background: 'linear-gradient(135deg, #2563eb 0%, #db2777 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Study Topics
      </Typography>
      <Typography 
        variant="body1" 
        paragraph 
        align="center" 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Master these topics to prepare for your certification
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
        <Button
          variant={selectedExam === 'all' ? 'contained' : 'outlined'}
          onClick={() => setSelectedExam('all')}
        >
          All Exams
        </Button>
        <Button
          variant={selectedExam === 'jncia' ? 'contained' : 'outlined'}
          onClick={() => setSelectedExam('jncia')}
        >
          JNCIA
        </Button>
        <Button
          variant={selectedExam === 'ccna' ? 'contained' : 'outlined'}
          onClick={() => setSelectedExam('ccna')}
        >
          CCNA
        </Button>
        <Button
          variant={selectedExam === 'security' ? 'contained' : 'outlined'}
          onClick={() => setSelectedExam('security')}
        >
          Security+
        </Button>
        <Button
          variant={selectedExam === 'sc205' ? 'contained' : 'outlined'}
          onClick={() => setSelectedExam('sc205')}
        >
          SC-205
        </Button>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2,
          borderRadius: 2,
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        {filteredTopics.map((topic, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{ 
              mb: 1,
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center'
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <topic.icon color="primary" />
                <Typography variant="h6">{topic.title}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 2 }}
              >
                {topic.description}
              </Typography>
              <List>
                {topic.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ListItemText primary={item} />
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 2, pb: 1 }}>
                      {getSubtopicDescription(topic.exam, item)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Box>
  );
};

// Main App Component
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={RouterLink} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/practice-exams" onClick={handleDrawerToggle}>
          <ListItemText primary="Practice Exams" />
        </ListItem>
        <ListItem button component={RouterLink} to="/flashcards" onClick={handleDrawerToggle}>
          <ListItemText primary="Flashcards" />
        </ListItem>
        <ListItem button component={RouterLink} to="/study-topics" onClick={handleDrawerToggle}>
          <ListItemText primary="Study Topics" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/certification-study-platform">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                JNCIA Study App
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              minHeight: '100vh',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(219,39,119,0.05) 100%)',
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/practice-exams" element={<PracticeExams />} />
              <Route path="/exam/:examId" element={<Exam />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/study-topics" element={<StudyTopics />} />
              <Route path="/exam-review/:examId" element={<ExamReview />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
