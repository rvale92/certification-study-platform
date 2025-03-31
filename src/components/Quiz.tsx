import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Button,
  Paper,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
  Collapse
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

// Extended quiz questions
const fullQuestions = [
  {
    question: 'Which protocol is used for dynamic routing in JUNOS?',
    options: ['OSPF', 'HTTP', 'FTP', 'SMTP'],
    correctAnswer: 'OSPF',
    explanation: 'OSPF is a dynamic routing protocol, while HTTP, FTP, and SMTP are application layer protocols.'
  },
  {
    question: 'What is the default administrative distance for static routes in Junos OS?',
    options: ['5', '10', '15', '20'],
    correctAnswer: '5',
    explanation: 'Static routes in Junos OS have a default administrative distance of 5.'
  },
  {
    question: 'Which command shows the routing table in Junos OS?',
    options: ['show route', 'show ip route', 'display route', 'get route'],
    correctAnswer: 'show route',
    explanation: 'The "show route" command is used to display the routing table in Junos OS.'
  },
  {
    question: 'What is the purpose of a routing instance in Junos OS?',
    options: [
      'To separate routing tables and protocols',
      'To configure static routes only',
      'To manage system users',
      'To configure interfaces'
    ],
    correctAnswer: 'To separate routing tables and protocols',
    explanation: 'Routing instances allow for separate routing domains within a single router.'
  },
  {
    question: 'Which statement about the Junos OS CLI is correct?',
    options: [
      'Commands are case-sensitive',
      'Commands can be abbreviated',
      'Spaces are not allowed in commands',
      'Commands must be typed in full'
    ],
    correctAnswer: 'Commands can be abbreviated',
    explanation: 'Junos OS CLI supports command completion and abbreviation.'
  },
  {
    question: 'What is the purpose of the "commit confirmed" command?',
    options: [
      'Automatically rolls back changes if not confirmed',
      'Permanently saves configuration',
      'Checks syntax only',
      'Deletes previous configuration'
    ],
    correctAnswer: 'Automatically rolls back changes if not confirmed',
    explanation: 'Commit confirmed provides a safety net by automatically rolling back changes if not confirmed within the specified time.'
  },
  {
    question: 'Which protocol is used for device management in Junos OS?',
    options: ['SNMP', 'HTTP', 'FTP', 'DHCP'],
    correctAnswer: 'SNMP',
    explanation: 'SNMP (Simple Network Management Protocol) is used for network device management.'
  },
  {
    question: 'What is the function of the Packet Forwarding Engine (PFE)?',
    options: [
      'Process and forward packets',
      'Store configuration',
      'Run routing protocols',
      'Manage user accounts'
    ],
    correctAnswer: 'Process and forward packets',
    explanation: 'The PFE handles packet processing and forwarding in hardware.'
  },
  {
    question: 'Which command is used to save the current configuration?',
    options: [
      'save configuration',
      'write memory',
      'save config',
      'request system configuration save'
    ],
    correctAnswer: 'request system configuration save',
    explanation: 'The "request system configuration save" command saves the current configuration to the file system.'
  },
  {
    question: 'What is the purpose of configuration groups?',
    options: [
      'Apply common configuration to multiple devices',
      'Group users together',
      'Configure VLANs',
      'Manage routing protocols'
    ],
    correctAnswer: 'Apply common configuration to multiple devices',
    explanation: 'Configuration groups allow reuse of common configuration statements across multiple devices.'
  },
  {
    question: 'What is the purpose of a routing policy in Junos OS?',
    options: [
      'To control route advertisement and selection',
      'To configure static routes',
      'To enable dynamic routing protocols',
      'To manage user accounts'
    ],
    correctAnswer: 'To control route advertisement and selection',
    explanation: 'Routing policies control how routes are advertised and selected between routing protocols.'
  },
  {
    question: 'Which command is used to verify interface status?',
    options: [
      'show interfaces',
      'get interfaces',
      'display interfaces',
      'list interfaces'
    ],
    correctAnswer: 'show interfaces',
    explanation: 'The "show interfaces" command displays interface status and statistics.'
  },
  {
    question: 'What is the purpose of the "rollback" command?',
    options: [
      'Revert to a previous configuration',
      'Delete the current configuration',
      'Save the current configuration',
      'Check configuration syntax'
    ],
    correctAnswer: 'Revert to a previous configuration',
    explanation: 'The rollback command allows you to revert to a previously saved configuration.'
  },
  {
    question: 'Which protocol is used for secure remote access to Junos devices?',
    options: ['SSH', 'Telnet', 'HTTP', 'FTP'],
    correctAnswer: 'SSH',
    explanation: 'SSH (Secure Shell) provides encrypted remote access to Junos devices.'
  },
  {
    question: 'What is the function of the "show system processes" command?',
    options: [
      'Display running processes',
      'Show interface status',
      'View routing table',
      'Check system users'
    ],
    correctAnswer: 'Display running processes',
    explanation: 'This command shows the current running processes on the Junos device.'
  },
  {
    question: 'Which statement about OSPF areas is correct?',
    options: [
      'Area 0 must be the backbone area',
      'All areas must be numbered sequentially',
      'Areas cannot be connected directly',
      'Maximum of 10 areas allowed'
    ],
    correctAnswer: 'Area 0 must be the backbone area',
    explanation: 'In OSPF, Area 0 (backbone area) is required and all other areas must connect to it.'
  },
  {
    question: 'What is the purpose of the "request system reboot" command?',
    options: [
      'Restart the entire system',
      'Restart only routing processes',
      'Reload configuration',
      'Reset interfaces'
    ],
    correctAnswer: 'Restart the entire system',
    explanation: 'This command performs a full system restart of the Junos device.'
  },
  {
    question: 'Which BGP attribute determines the best path selection?',
    options: [
      'Local Preference',
      'Community',
      'Origin',
      'MED'
    ],
    correctAnswer: 'Local Preference',
    explanation: 'Local Preference is the first BGP attribute checked in the path selection process.'
  },
  {
    question: 'What is the purpose of the "show chassis hardware" command?',
    options: [
      'Display hardware inventory',
      'Show software versions',
      'View memory usage',
      'Check interface status'
    ],
    correctAnswer: 'Display hardware inventory',
    explanation: 'This command shows detailed information about the system hardware components.'
  },
  {
    question: 'Which protocol is used for time synchronization in Junos OS?',
    options: ['NTP', 'SNMP', 'DHCP', 'DNS'],
    correctAnswer: 'NTP',
    explanation: 'NTP (Network Time Protocol) is used to synchronize time across network devices.'
  },
  {
    question: 'What is the purpose of a bridge domain?',
    options: [
      'Connect Layer 2 segments',
      'Route between networks',
      'Filter traffic',
      'Manage users'
    ],
    correctAnswer: 'Connect Layer 2 segments',
    explanation: 'Bridge domains are used to connect Layer 2 segments in a Layer 2 network.'
  },
  {
    question: 'Which command shows the system uptime and load averages?',
    options: [
      'show system uptime',
      'show uptime',
      'display system status',
      'get system info'
    ],
    correctAnswer: 'show system uptime',
    explanation: 'The "show system uptime" command displays system uptime and load information.'
  },
  {
    question: 'What is the purpose of the "load merge" command?',
    options: [
      'Combine configurations',
      'Delete configuration',
      'Save configuration',
      'Check syntax'
    ],
    correctAnswer: 'Combine configurations',
    explanation: 'Load merge combines the current configuration with a new configuration.'
  },
  {
    question: 'Which interface naming convention is correct for a gigabit Ethernet port?',
    options: [
      'ge-0/0/0',
      'gig-0/0/0',
      'ethernet-0/0/0',
      'g0/0/0'
    ],
    correctAnswer: 'ge-0/0/0',
    explanation: 'Junos OS uses "ge-" prefix for gigabit Ethernet interfaces.'
  },
  {
    question: 'What is the purpose of a loopback interface?',
    options: [
      'Provide a stable router ID',
      'Connect to other devices',
      'Filter traffic',
      'Enable routing'
    ],
    correctAnswer: 'Provide a stable router ID',
    explanation: 'Loopback interfaces provide a stable address for router identification.'
  },
  {
    question: 'Which command displays the current configuration?',
    options: [
      'show configuration',
      'display config',
      'get configuration',
      'list config'
    ],
    correctAnswer: 'show configuration',
    explanation: 'The "show configuration" command displays the current device configuration.'
  },
  {
    question: 'What is the purpose of VRRP?',
    options: [
      'Provide gateway redundancy',
      'Filter traffic',
      'Route packets',
      'Manage VLANs'
    ],
    correctAnswer: 'Provide gateway redundancy',
    explanation: 'VRRP provides redundancy for the default gateway in a network.'
  },
  {
    question: 'Which statement about commit scripts is correct?',
    options: [
      'They automate configuration tasks',
      'They only work in operational mode',
      'They cannot modify configuration',
      'They require external servers'
    ],
    correctAnswer: 'They automate configuration tasks',
    explanation: 'Commit scripts automate configuration tasks and enforce policies.'
  },
  {
    question: 'What is the purpose of the "request support information" command?',
    options: [
      'Collect troubleshooting data',
      'Contact Juniper support',
      'Show support contract',
      'Display system status'
    ],
    correctAnswer: 'Collect troubleshooting data',
    explanation: 'This command collects comprehensive system information for troubleshooting.'
  },
  {
    question: 'Which protocol is used for link-state advertisements in OSPF?',
    options: [
      'LSA',
      'BGP',
      'RIP',
      'EIGRP'
    ],
    correctAnswer: 'LSA',
    explanation: 'Link-State Advertisements (LSAs) are used to share routing information in OSPF.'
  },
  {
    question: 'What is the purpose of the "show system storage" command?',
    options: [
      'Display disk usage',
      'Show memory usage',
      'View CPU utilization',
      'Check network storage'
    ],
    correctAnswer: 'Display disk usage',
    explanation: 'This command shows disk space usage on the Junos device.'
  },
  {
    question: 'Which feature provides traffic engineering capabilities?',
    options: [
      'MPLS',
      'BGP',
      'OSPF',
      'RIP'
    ],
    correctAnswer: 'MPLS',
    explanation: 'MPLS enables traffic engineering and VPN services.'
  },
  {
    question: 'What is the purpose of the "show version" command?',
    options: [
      'Display software version',
      'Show hardware version',
      'View configuration version',
      'Check protocol versions'
    ],
    correctAnswer: 'Display software version',
    explanation: 'The "show version" command displays the Junos OS software version.'
  },
  {
    question: 'Which statement about configuration mode is correct?',
    options: [
      'Changes are not active until committed',
      'Changes take effect immediately',
      'Only one user can view the configuration',
      'Configuration cannot be rolled back'
    ],
    correctAnswer: 'Changes are not active until committed',
    explanation: 'In configuration mode, changes must be committed to become active.'
  },
  {
    question: 'What is the purpose of a firewall filter?',
    options: [
      'Control traffic flow',
      'Route packets',
      'Configure interfaces',
      'Manage users'
    ],
    correctAnswer: 'Control traffic flow',
    explanation: 'Firewall filters control traffic flow based on specified criteria.'
  },
  {
    question: 'Which command shows the routing protocol status?',
    options: [
      'show protocols',
      'display protocols',
      'get protocols',
      'list protocols'
    ],
    correctAnswer: 'show protocols',
    explanation: 'The "show protocols" command displays routing protocol status.'
  },
  {
    question: 'What is the purpose of the "request system snapshot" command?',
    options: [
      'Create system backup',
      'Take screenshot',
      'Show system status',
      'Display system info'
    ],
    correctAnswer: 'Create system backup',
    explanation: 'This command creates a backup copy of the system software.'
  },
  {
    question: 'Which protocol is used for device discovery?',
    options: [
      'LLDP',
      'HTTP',
      'FTP',
      'SMTP'
    ],
    correctAnswer: 'LLDP',
    explanation: 'LLDP (Link Layer Discovery Protocol) is used for network device discovery.'
  },
  {
    question: 'What is the purpose of the "show interfaces diagnostics" command?',
    options: [
      'Display interface health',
      'Show traffic statistics',
      'View routing info',
      'Check system status'
    ],
    correctAnswer: 'Display interface health',
    explanation: 'This command shows detailed diagnostic information for interfaces.'
  },
  {
    question: 'Which feature provides Layer 2 loop prevention?',
    options: [
      'Spanning Tree Protocol',
      'OSPF',
      'BGP',
      'MPLS'
    ],
    correctAnswer: 'Spanning Tree Protocol',
    explanation: 'STP prevents loops in Layer 2 networks.'
  },
  {
    question: 'What is the purpose of the "show system users" command?',
    options: [
      'Display logged-in users',
      'Show user accounts',
      'View system processes',
      'Check user permissions'
    ],
    correctAnswer: 'Display logged-in users',
    explanation: 'This command shows currently logged-in users on the system.'
  },
  {
    question: 'Which command verifies BGP neighbor connections?',
    options: [
      'show bgp neighbor',
      'display bgp peers',
      'get bgp status',
      'list bgp connections'
    ],
    correctAnswer: 'show bgp neighbor',
    explanation: 'The "show bgp neighbor" command displays BGP peer connection status.'
  },
  {
    question: 'What is the purpose of the "show system alarms" command?',
    options: [
      'Display system warnings',
      'Show interface errors',
      'View routing problems',
      'Check configuration issues'
    ],
    correctAnswer: 'Display system warnings',
    explanation: 'This command shows active system alarms and warnings.'
  },
  {
    question: 'Which protocol provides dynamic IP address assignment?',
    options: [
      'DHCP',
      'DNS',
      'NTP',
      'SNMP'
    ],
    correctAnswer: 'DHCP',
    explanation: 'DHCP (Dynamic Host Configuration Protocol) assigns IP addresses dynamically.'
  },
  {
    question: 'What is the purpose of the "show system statistics" command?',
    options: [
      'Display protocol statistics',
      'Show user statistics',
      'View interface stats',
      'Check memory usage'
    ],
    correctAnswer: 'Display protocol statistics',
    explanation: 'This command shows protocol-level statistics for the system.'
  },
  {
    question: 'Which feature provides traffic prioritization?',
    options: [
      'Class of Service',
      'Firewall Filter',
      'Route Policy',
      'Security Policy'
    ],
    correctAnswer: 'Class of Service',
    explanation: 'Class of Service (CoS) enables traffic prioritization and QoS.'
  },
  {
    question: 'What is the purpose of the "show system cores" command?',
    options: [
      'Display crash information',
      'Show CPU cores',
      'View memory cores',
      'Check core routing'
    ],
    correctAnswer: 'Display crash information',
    explanation: 'This command shows system core dumps from crashes.'
  },
  {
    question: 'Which command shows the chassis environment information?',
    options: [
      'show chassis environment',
      'display environment',
      'get chassis status',
      'list environment'
    ],
    correctAnswer: 'show chassis environment',
    explanation: 'The "show chassis environment" command displays environmental status.'
  },
  {
    question: 'What is the purpose of the "show security policies" command?',
    options: [
      'Display security rules',
      'Show user policies',
      'View routing policies',
      'Check access policies'
    ],
    correctAnswer: 'Display security rules',
    explanation: 'This command shows configured security policies.'
  },
  {
    question: 'Which protocol is used for routing between AS domains?',
    options: [
      'BGP',
      'OSPF',
      'RIP',
      'IS-IS'
    ],
    correctAnswer: 'BGP',
    explanation: 'BGP (Border Gateway Protocol) is used for inter-AS routing.'
  },
  {
    question: 'What is the purpose of the "show system services" command?',
    options: [
      'Display enabled services',
      'Show service statistics',
      'View service status',
      'Check service config'
    ],
    correctAnswer: 'Display enabled services',
    explanation: 'This command shows system services and their status.'
  },
  {
    question: 'Which feature provides virtual routing separation?',
    options: [
      'Routing Instances',
      'VLANs',
      'Zones',
      'Interfaces'
    ],
    correctAnswer: 'Routing Instances',
    explanation: 'Routing instances provide virtual routing and forwarding separation.'
  },
  {
    question: 'What is the purpose of the "show system license" command?',
    options: [
      'Display license status',
      'Show feature licenses',
      'View license keys',
      'Check expiration'
    ],
    correctAnswer: 'Display license status',
    explanation: 'This command shows installed licenses and their status.'
  },
  {
    question: 'Which command verifies OSPF neighbor relationships?',
    options: [
      'show ospf neighbor',
      'display ospf peers',
      'get ospf status',
      'list ospf connections'
    ],
    correctAnswer: 'show ospf neighbor',
    explanation: 'The "show ospf neighbor" command displays OSPF neighbor status.'
  },
  {
    question: 'What is the purpose of the "show system memory" command?',
    options: [
      'Display memory usage',
      'Show memory errors',
      'View memory config',
      'Check memory type'
    ],
    correctAnswer: 'Display memory usage',
    explanation: 'This command shows system memory utilization.'
  },
  {
    question: 'Which feature provides traffic filtering at Layer 7?',
    options: [
      'Application Security',
      'Firewall Filter',
      'Security Policy',
      'CoS'
    ],
    correctAnswer: 'Application Security',
    explanation: 'Application Security provides Layer 7 application-level filtering.'
  },
  {
    question: 'What is the purpose of the "show system processes extensive" command?',
    options: [
      'Display detailed process info',
      'Show process errors',
      'View process config',
      'Check process status'
    ],
    correctAnswer: 'Display detailed process info',
    explanation: 'This command shows detailed information about system processes.'
  },
  {
    question: 'Which command shows interface queue statistics?',
    options: [
      'show interfaces queue',
      'display queues',
      'get interface stats',
      'list queue info'
    ],
    correctAnswer: 'show interfaces queue',
    explanation: 'The "show interfaces queue" command displays interface queuing statistics.'
  },
  {
    question: 'What is the purpose of the "show security flow" command?',
    options: [
      'Display traffic flows',
      'Show security rules',
      'View flow errors',
      'Check flow status'
    ],
    correctAnswer: 'Display traffic flows',
    explanation: 'This command shows active security flow information.'
  },
  {
    question: 'Which protocol provides link-state routing within an AS?',
    options: [
      'OSPF',
      'BGP',
      'RIP',
      'EIGRP'
    ],
    correctAnswer: 'OSPF',
    explanation: 'OSPF is a link-state routing protocol used within an AS.'
  },
  {
    question: 'What is the purpose of the "show system connections" command?',
    options: [
      'Display network connections',
      'Show system links',
      'View connection errors',
      'Check connection status'
    ],
    correctAnswer: 'Display network connections',
    explanation: 'This command shows active network connections on the system.'
  },
  {
    question: 'Which feature provides packet capture capabilities?',
    options: [
      'Packet Capture',
      'Traffic Monitor',
      'Flow Monitor',
      'Port Mirror'
    ],
    correctAnswer: 'Packet Capture',
    explanation: 'Packet Capture allows capturing and analyzing network traffic.'
  },
  {
    question: 'What is the purpose of the "show system buffers" command?',
    options: [
      'Display buffer usage',
      'Show buffer errors',
      'View buffer config',
      'Check buffer status'
    ],
    correctAnswer: 'Display buffer usage',
    explanation: 'This command shows system buffer utilization.'
  },
  {
    question: 'Which command verifies interface MTU settings?',
    options: [
      'show interfaces detail',
      'display mtu',
      'get interface mtu',
      'list mtu settings'
    ],
    correctAnswer: 'show interfaces detail',
    explanation: 'The "show interfaces detail" command displays detailed interface information including MTU.'
  }
];

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<typeof fullQuestions>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [showingReview, setShowingReview] = useState(false);

  useEffect(() => {
    // Randomly select 65 questions
    const shuffled = [...fullQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(65, fullQuestions.length));
    setQuestions(shuffled);
  }, []);

  const handleFinish = useCallback(() => {
    const finalScore = answers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(finalScore);
    setShowResult(true);
  }, [answers, questions]);

  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      handleFinish();
    }
  }, [timeLeft, showResult, handleFinish]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || '');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleQuestionExpansion = (index: number) => {
    setExpandedQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleShowReview = () => {
    setShowingReview(true);
  };

  const handleRetakeQuiz = () => {
    window.location.reload();
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 65;

    if (!showingReview) {
      return (
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Quiz Complete!
            </Typography>
            
            <Box sx={{ my: 4 }}>
              <Typography variant="h5" gutterBottom align="center">
                Your Score: {score} out of {questions.length} ({percentage.toFixed(1)}%)
              </Typography>
              <Typography variant="h6" align="center" color={passed ? 'success.main' : 'error.main'}>
                {passed ? 'PASSED!' : 'Not Passed - Keep Studying!'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowReview}
              >
                Review Answers
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleRetakeQuiz}
              >
                Take Another Quiz
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return (
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Quiz Review
          </Typography>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom align="center">
              Final Score: {score} out of {questions.length} ({percentage.toFixed(1)}%)
            </Typography>
            <Typography variant="h6" align="center" color={passed ? 'success.main' : 'error.main'} gutterBottom>
              {passed ? 'PASSED!' : 'Not Passed - Keep Studying!'}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              Click on each question to see the explanation.
            </Typography>
          </Box>

          {questions.map((question, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" gutterBottom>
                    Question {index + 1}
                  </Typography>
                  <IconButton onClick={() => toggleQuestionExpansion(index)}>
                    {expandedQuestions.includes(index) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Typography variant="body1" gutterBottom>
                  {question.question}
                </Typography>

                <Collapse in={expandedQuestions.includes(index)}>
                  <Box sx={{ mt: 2 }}>
                    <Typography color={answers[index] === question.correctAnswer ? 'success.main' : 'error.main'}>
                      Your Answer: {answers[index] || 'Not answered'}
                    </Typography>
                    <Typography color="success.main">
                      Correct Answer: {question.correctAnswer}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      Explanation: {question.explanation}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRetakeQuiz}
            >
              Take Another Quiz
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        JNCIA Practice Quiz
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" align="center" color="text.secondary">
          Time Remaining: {formatTime(timeLeft)}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(timeLeft / 3600) * 100} 
          sx={{ mt: 1 }}
        />
      </Box>

      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(currentQuestion / questions.length) * 100} 
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          {questions[currentQuestion]?.question}
        </Typography>

        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            {questions[currentQuestion]?.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                disabled={!selectedAnswer}
              >
                Finish Quiz
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                Next
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Quiz; 