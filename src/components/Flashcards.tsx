import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  LinearProgress,
  Paper
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  Refresh as RefreshIcon,
  Shuffle as ShuffleIcon
} from '@mui/icons-material';

const flashcards = [
  {
    question: "What is the default administrative distance for OSPF routes in Junos OS?",
    answer: "10"
  },
  {
    question: "Which command is used to view the routing table in Junos OS?",
    answer: "show route"
  },
  {
    question: "What is the purpose of the 'commit' command in Junos OS?",
    answer: "To activate configuration changes"
  },
  {
    question: "Which protocol is used for dynamic routing in Junos OS?",
    answer: "OSPF, BGP, RIP, or IS-IS"
  },
  {
    question: "What is the default root password in Junos OS?",
    answer: "There is no default password"
  },
  {
    question: "Which command is used to view interface statistics in Junos OS?",
    answer: "show interfaces statistics"
  },
  {
    question: "What is the purpose of the 'rollback' command in Junos OS?",
    answer: "To revert to a previous configuration"
  },
  {
    question: "Which protocol is used for link-state routing in Junos OS?",
    answer: "OSPF or IS-IS"
  },
  {
    question: "What is the default administrative distance for static routes in Junos OS?",
    answer: "5"
  },
  {
    question: "Which command is used to view system information in Junos OS?",
    answer: "show system information"
  },
  {
    question: "What is the purpose of the 'load set' command in Junos OS?",
    answer: "To load configuration from a file"
  },
  {
    question: "Which protocol is used for distance-vector routing in Junos OS?",
    answer: "RIP"
  },
  {
    question: "What is the default administrative distance for RIP routes in Junos OS?",
    answer: "100"
  },
  {
    question: "Which command is used to view BGP neighbors in Junos OS?",
    answer: "show bgp neighbor"
  },
  {
    question: "What is the purpose of the 'save' command in Junos OS?",
    answer: "To save the current configuration"
  },
  {
    question: "Which protocol is used for path-vector routing in Junos OS?",
    answer: "BGP"
  },
  {
    question: "What is the default administrative distance for BGP routes in Junos OS?",
    answer: "170"
  },
  {
    question: "Which command is used to view OSPF neighbors in Junos OS?",
    answer: "show ospf neighbor"
  },
  {
    question: "What is the purpose of the 'delete' command in Junos OS?",
    answer: "To remove configuration statements"
  },
  {
    question: "Which protocol is used for multicast routing in Junos OS?",
    answer: "PIM"
  },
  {
    question: "What is the default administrative distance for IS-IS routes in Junos OS?",
    answer: "15"
  },
  {
    question: "Which command is used to view system processes in Junos OS?",
    answer: "show system processes"
  },
  {
    question: "What is the purpose of the 'rename' command in Junos OS?",
    answer: "To rename configuration objects"
  },
  {
    question: "Which protocol is used for MPLS in Junos OS?",
    answer: "RSVP or LDP"
  },
  {
    question: "What is the default administrative distance for direct routes in Junos OS?",
    answer: "0"
  },
  {
    question: "Which command is used to view system memory in Junos OS?",
    answer: "show system memory"
  },
  {
    question: "What is the purpose of the 'copy' command in Junos OS?",
    answer: "To copy configuration or files"
  },
  {
    question: "Which protocol is used for VRRP in Junos OS?",
    answer: "VRRP"
  },
  {
    question: "What is the default administrative distance for local routes in Junos OS?",
    answer: "0"
  },
  {
    question: "Which command is used to view system storage in Junos OS?",
    answer: "show system storage"
  },
  {
    question: "What is the purpose of the 'file' command in Junos OS?",
    answer: "To manage files on the system"
  },
  {
    question: "Which protocol is used for STP in Junos OS?",
    answer: "STP, RSTP, or MSTP"
  },
  {
    question: "What is the default administrative distance for OSPF external routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system logs in Junos OS?",
    answer: "show system log"
  },
  {
    question: "What is the purpose of the 'request' command in Junos OS?",
    answer: "To perform system operations"
  },
  {
    question: "Which protocol is used for LLDP in Junos OS?",
    answer: "LLDP"
  },
  {
    question: "What is the default administrative distance for OSPF internal routes in Junos OS?",
    answer: "10"
  },
  {
    question: "Which command is used to view system alarms in Junos OS?",
    answer: "show system alarms"
  },
  {
    question: "What is the purpose of the 'monitor' command in Junos OS?",
    answer: "To monitor system status"
  },
  {
    question: "Which protocol is used for IGMP in Junos OS?",
    answer: "IGMP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system buffers in Junos OS?",
    answer: "show system buffers"
  },
  {
    question: "What is the purpose of the 'ping' command in Junos OS?",
    answer: "To test network connectivity"
  },
  {
    question: "Which protocol is used for SNMP in Junos OS?",
    answer: "SNMP"
  },
  {
    question: "What is the default administrative distance for OSPF summary routes in Junos OS?",
    answer: "10"
  },
  {
    question: "Which command is used to view system queues in Junos OS?",
    answer: "show system queues"
  },
  {
    question: "What is the purpose of the 'traceroute' command in Junos OS?",
    answer: "To trace network path"
  },
  {
    question: "Which protocol is used for NTP in Junos OS?",
    answer: "NTP"
  },
  {
    question: "What is the default administrative distance for OSPF external type 2 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system interfaces in Junos OS?",
    answer: "show interfaces"
  },
  {
    question: "What is the purpose of the 'telnet' command in Junos OS?",
    answer: "To establish remote connection"
  },
  {
    question: "Which protocol is used for RADIUS in Junos OS?",
    answer: "RADIUS"
  },
  {
    question: "What is the default administrative distance for OSPF external type 1 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system routing in Junos OS?",
    answer: "show route"
  },
  {
    question: "What is the purpose of the 'ssh' command in Junos OS?",
    answer: "To establish secure remote connection"
  },
  {
    question: "Which protocol is used for TACACS+ in Junos OS?",
    answer: "TACACS+"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system protocols in Junos OS?",
    answer: "show protocols"
  },
  {
    question: "What is the purpose of the 'scp' command in Junos OS?",
    answer: "To copy files securely"
  },
  {
    question: "Which protocol is used for DHCP in Junos OS?",
    answer: "DHCP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 1 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system services in Junos OS?",
    answer: "show system services"
  },
  {
    question: "What is the purpose of the 'sftp' command in Junos OS?",
    answer: "To transfer files securely"
  },
  {
    question: "Which protocol is used for DNS in Junos OS?",
    answer: "DNS"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 2 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system security in Junos OS?",
    answer: "show security"
  },
  {
    question: "What is the purpose of the 'ftp' command in Junos OS?",
    answer: "To transfer files"
  },
  {
    question: "Which protocol is used for HTTP in Junos OS?",
    answer: "HTTP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 3 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rlogin' command in Junos OS?",
    answer: "To establish remote login"
  },
  {
    question: "Which protocol is used for HTTPS in Junos OS?",
    answer: "HTTPS"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 4 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rsh' command in Junos OS?",
    answer: "To execute remote shell commands"
  },
  {
    question: "Which protocol is used for FTP in Junos OS?",
    answer: "FTP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 5 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rsh' command in Junos OS?",
    answer: "To execute remote shell commands"
  },
  {
    question: "Which protocol is used for TFTP in Junos OS?",
    answer: "TFTP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 6 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rsh' command in Junos OS?",
    answer: "To execute remote shell commands"
  },
  {
    question: "Which protocol is used for SNMP in Junos OS?",
    answer: "SNMP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 7 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rsh' command in Junos OS?",
    answer: "To execute remote shell commands"
  },
  {
    question: "Which protocol is used for SNMP in Junos OS?",
    answer: "SNMP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 8 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rsh' command in Junos OS?",
    answer: "To execute remote shell commands"
  },
  {
    question: "Which protocol is used for SNMP in Junos OS?",
    answer: "SNMP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 9 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rsh' command in Junos OS?",
    answer: "To execute remote shell commands"
  },
  {
    question: "Which protocol is used for SNMP in Junos OS?",
    answer: "SNMP"
  },
  {
    question: "What is the default administrative distance for OSPF NSSA external type 10 routes in Junos OS?",
    answer: "150"
  },
  {
    question: "Which command is used to view system accounting in Junos OS?",
    answer: "show system accounting"
  },
  {
    question: "What is the purpose of the 'rsh' command in Junos OS?",
    answer: "To execute remote shell commands"
  },
  {
    question: "Which protocol is used for SNMP in Junos OS?",
    answer: "SNMP"
  }
];

const Flashcards: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([...flashcards]);

  const handleNext = () => {
    if (currentCard < shuffledCards.length - 1) {
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
    const newShuffled = [...shuffledCards]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setShuffledCards(newShuffled);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        JNCIA Flashcards
      </Typography>
      <Typography variant="body1" paragraph align="center" color="text.secondary">
        Click on the card to reveal the answer
      </Typography>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ perspective: '1000px' }}>
            <Box
              sx={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                minHeight: 300,
              }}
            >
              {/* Front of card */}
              <Card
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={handleFlip}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6">
                    {shuffledCards[currentCard].question}
                  </Typography>
                </CardContent>
              </Card>

              {/* Back of card */}
              <Card
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  cursor: 'pointer',
                  bgcolor: 'action.selected',
                }}
                onClick={handleFlip}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6">
                    {shuffledCards[currentCard].answer}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
        <IconButton 
          onClick={handlePrevious} 
          disabled={currentCard === 0}
          color="primary"
        >
          <PrevIcon />
        </IconButton>
        
        <Typography variant="body1" sx={{ alignSelf: 'center' }}>
          {currentCard + 1} / {shuffledCards.length}
        </Typography>
        
        <IconButton 
          onClick={handleNext} 
          disabled={currentCard === shuffledCards.length - 1}
          color="primary"
        >
          <NextIcon />
        </IconButton>

        <IconButton 
          onClick={handleShuffle}
          color="secondary"
          sx={{ ml: 2 }}
        >
          <ShuffleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Flashcards; 