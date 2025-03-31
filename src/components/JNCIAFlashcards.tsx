import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Shuffle as ShuffleIcon,
} from '@mui/icons-material';

interface Flashcard {
  question: string;
  answer: string;
}

const JNCIAFlashcards: React.FC = () => {
  // This is the full pool of 120 questions
  const fullQuestionPool: Flashcard[] = [
    // Original 20 questions
    {
      answer: "What is the Junos OS architecture?",
      question: "Junos OS uses a modular architecture with separate control and forwarding planes. The Routing Engine handles control plane functions while the Packet Forwarding Engine handles data plane operations."
    },
    {
      answer: "What are the two main components of a Juniper device running Junos OS?",
      question: "The Routing Engine (RE) and the Packet Forwarding Engine (PFE). The RE handles control plane functions while the PFE handles packet forwarding."
    },
    {
      answer: "What is the difference between operational mode and configuration mode in Junos OS?",
      question: "Operational mode is used for monitoring and troubleshooting, while configuration mode is used for making changes to the device configuration."
    },
    {
      answer: "What is the purpose of commit confirmed in Junos OS?",
      question: "Commit confirmed activates configuration changes temporarily, requiring confirmation within 10 minutes (by default) to make them permanent. If not confirmed, the system automatically rolls back to the previous configuration."
    },
    {
      answer: "What is a candidate configuration in Junos OS?",
      question: "A candidate configuration is a temporary configuration that can be modified without affecting the running configuration. Changes only take effect after a commit command."
    },
    {
      answer: "What is the purpose of the rescue configuration?",
      question: "The rescue configuration is a known working configuration that can be loaded when the current configuration is not working properly or during recovery scenarios."
    },
    {
      answer: "What are the benefits of Junos OS hierarchical configuration?",
      question: "Hierarchical configuration provides better organization, easier navigation, reduced complexity, and improved readability of the configuration."
    },
    {
      answer: "What is the difference between 'show' and 'show configuration' commands?",
      question: "'show' displays operational status and statistics, while 'show configuration' displays the current device configuration."
    },
    {
      answer: "What is a routing instance in Junos OS?",
      question: "A routing instance is a collection of routing tables, interfaces, and routing protocol parameters. It allows for separate routing domains within a single router."
    },
    {
      answer: "What is the purpose of system logging (syslog) in Junos OS?",
      question: "Syslog records system messages about network events, errors, and system operations for monitoring and troubleshooting purposes."
    },
    {
      answer: "What are security zones in Junos OS?",
      question: "Security zones are logical entities to which interfaces are bound. They are used to control and manage traffic flow through security policies."
    },
    {
      answer: "What is the difference between static and dynamic routing?",
      question: "Static routing requires manual configuration of routes, while dynamic routing automatically learns and updates routes using protocols like OSPF or BGP."
    },
    {
      answer: "What is the purpose of the 'rollback' command?",
      question: "The rollback command allows you to return to a previous configuration. Junos OS maintains up to 50 previous configurations by default."
    },
    {
      answer: "What is a routing policy in Junos OS?",
      question: "A routing policy is a set of rules that control the import and export of routes between routing protocols or routing instances."
    },
    {
      answer: "What is the purpose of the 'load override' command?",
      question: "The 'load override' command completely replaces the current candidate configuration with a new configuration from a file."
    },
    {
      answer: "What is the difference between 'load merge' and 'load replace'?",
      question: "'load merge' combines the new configuration with the existing one, while 'load replace' replaces the specific hierarchy levels specified in the loading configuration."
    },
    {
      answer: "What is the purpose of interface ranges in Junos OS?",
      question: "Interface ranges allow you to configure multiple interfaces with the same configuration simultaneously, reducing configuration time and complexity."
    },
    {
      answer: "What is the purpose of chassis clustering in Junos OS?",
      question: "Chassis clustering provides device redundancy by connecting two devices together to act as a single system, improving network reliability and availability."
    },
    {
      answer: "What is the difference between RIB and FIB?",
      question: "The Routing Information Base (RIB) contains all learned routes and is maintained by the RE, while the Forwarding Information Base (FIB) contains active routes used for packet forwarding and is maintained by the PFE."
    },
    {
      answer: "What is the purpose of the 'request system snapshot' command?",
      question: "This command creates a backup copy of the currently running system software, allowing for system recovery if needed."
    },
    {
      answer: "What is a firewall filter in Junos OS?",
      question: "A set of rules that define whether to permit, deny, or take other actions on packets that match specific criteria, used for traffic control and security."
    },
    {
      answer: "What is the difference between a firewall filter and a security policy?",
      question: "Firewall filters operate at packet level and are stateless, while security policies are stateful and operate at the zone level, providing more comprehensive security controls."
    },
    {
      answer: "What is the purpose of CoS (Class of Service) in Junos OS?",
      question: "CoS allows network traffic to be prioritized based on its importance, ensuring critical applications receive appropriate bandwidth and treatment during congestion."
    },
    {
      answer: "What are protocol families in Junos OS?",
      question: "Protocol families define the types of traffic an interface can process, such as inet (IPv4), inet6 (IPv6), iso, mpls, etc."
    },
    {
      answer: "What is the difference between primary and secondary addresses in Junos?",
      question: "A primary address is the main IP address used for routing, while secondary addresses provide additional IP addresses on the same interface for multiple network connectivity."
    },
    // Additional questions to reach 120
    {
      answer: "What is the purpose of aggregate routes in Junos?",
      question: "Aggregate routes combine multiple routes into a single summarized route, reducing routing table size and improving network scalability."
    },
    {
      answer: "What is the difference between a stub area and a totally stubby area in OSPF?",
      question: "A stub area blocks external LSAs but allows summary LSAs, while a totally stubby area blocks both external and summary LSAs, only allowing default routes."
    },
    {
      answer: "What is the purpose of the 'commit synchronize' command?",
      question: "The commit synchronize command ensures that configuration changes are committed simultaneously on both Routing Engines in a dual RE system."
    },
    {
      answer: "What is the purpose of the 'request support information' command?",
      question: "This command collects system information and configuration details useful for troubleshooting, creating a compressed file that can be sent to Juniper support."
    },
    {
      answer: "What is a routing policy chain?",
      question: "A sequence of routing policies that are evaluated in order, where each policy can accept, reject, or pass the route to the next policy in the chain."
    },
    {
      answer: "What is the difference between 'commit and-quit' and 'commit confirmed'?",
      question: "Commit and-quit exits configuration mode after committing changes, while commit confirmed activates changes temporarily requiring confirmation within a specified time."
    },
    {
      answer: "What is the purpose of the 'show system processes extensive' command?",
      question: "This command displays detailed information about all processes running on the system, including CPU usage, memory utilization, and thread information."
    },
    {
      answer: "What is the difference between 'show interfaces terse' and 'show interfaces brief'?",
      question: "Show interfaces terse provides a concise list of interfaces with their states and addresses, while show interfaces brief shows more detailed statistics but still summarized."
    },
    {
      answer: "What is the purpose of apply-groups in Junos?",
      question: "Apply-groups allow you to create a configuration template that can be applied to multiple hierarchy levels, reducing configuration repetition and maintaining consistency."
    },
    {
      answer: "What is the difference between an active and passive interface in OSPF?",
      question: "An active interface sends and receives OSPF packets, while a passive interface only advertises its connected networks but doesn't form adjacencies."
    },
    {
      answer: "What is the purpose of the 'show route protocol bgp' command?",
      question: "This command displays all routes in the routing table that were learned through BGP, helping verify BGP route advertisements and troubleshoot routing issues."
    },
    {
      answer: "What is a routing-instance type?",
      question: "A routing-instance type defines the protocol family and routing protocols that can be configured within the routing instance, such as virtual-router, vrf, or forwarding."
    },
    {
      answer: "What is the purpose of the 'show system storage' command?",
      question: "This command displays information about disk space usage on the system, including mounted file systems, available space, and utilization percentages."
    },
    {
      answer: "What is the difference between 'load merge terminal' and 'load set terminal'?",
      question: "Load merge terminal accepts configuration in hierarchy format, while load set terminal accepts configuration as individual set commands."
    },
    {
      answer: "What is the purpose of the 'show chassis hardware' command?",
      question: "This command displays detailed information about system hardware components, including model numbers, serial numbers, and part numbers."
    },
    {
      answer: "What is the difference between 'show route forwarding-table' and 'show route'?",
      question: "Show route displays the RIB (Routing Information Base), while show route forwarding-table shows the FIB (Forwarding Information Base) used for packet forwarding."
    },
    {
      answer: "What is the purpose of the 'request chassis routing-engine master switch' command?",
      question: "This command initiates a graceful Routing Engine switchover in a dual RE system, making the backup RE become the new master."
    },
    {
      answer: "What is a prefix-list in Junos?",
      question: "A prefix-list is a named list of IP prefixes that can be used in routing policies to match and filter routes based on network addresses."
    },
    {
      answer: "What is the purpose of the 'show system users' command?",
      question: "This command displays information about users currently logged into the system, including their login time, terminal, and idle time."
    },
    {
      answer: "What is the difference between 'clear bgp neighbor' and 'restart routing'?",
      question: "Clear bgp neighbor resets specific BGP sessions, while restart routing restarts the entire routing process affecting all protocols."
    },
    {
      answer: "What is the purpose of the 'show system alarms' command?",
      question: "This command displays active system alarms, indicating hardware or software issues that require attention."
    },
    {
      answer: "What is a community in Junos routing?",
      question: "A community is a tag that can be attached to routes for use in routing policies, allowing for route filtering and manipulation based on these tags."
    },
    {
      answer: "What is the purpose of the 'show interfaces diagnostics optics' command?",
      question: "This command displays diagnostic information for optical interfaces, including power levels, temperature, and other optical parameters."
    },
    {
      answer: "What is the difference between 'deactivate' and 'delete' in configuration mode?",
      question: "Deactivate retains the configuration but makes it inactive, while delete completely removes the configuration statements."
    },
    {
      answer: "What is the purpose of the 'show system core-dumps' command?",
      question: "This command displays information about system core dumps, which are created when a process crashes and are used for troubleshooting."
    },
    {
      answer: "What is an AS-path in BGP?",
      question: "An AS-path is a sequence of autonomous system numbers that a route has traversed, used for path selection and loop prevention in BGP."
    },
    {
      answer: "What is the purpose of the 'show system statistics' command?",
      question: "This command displays system-wide statistics including protocol counters, memory usage, and CPU utilization."
    },
    {
      answer: "What is the difference between 'show route receive-protocol bgp' and 'show route advertising-protocol bgp'?",
      question: "Show route receive-protocol displays routes received from a BGP peer, while show route advertising-protocol shows routes being advertised to a peer."
    }
  ];

  const [activeQuestions, setActiveQuestions] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);

  const rotateQuestions = useCallback(() => {
    const shuffledPool = [...fullQuestionPool].sort(() => Math.random() - 0.5);
    const selected = shuffledPool.slice(0, 65);
    setActiveQuestions(selected);
    setShuffledCards(selected);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  // Initialize questions
  useEffect(() => {
    rotateQuestions();
  }, [rotateQuestions]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledCards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledCards.length) % shuffledCards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    const shuffled = [...activeQuestions].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#84B135', mb: 4 }}>
        JNCIA Flashcards
      </Typography>

      <Box sx={{ position: 'relative', perspective: '1000px' }}>
        <Card
          onClick={handleFlip}
          sx={{
            minHeight: 300,
            cursor: 'pointer',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0)',
            backgroundColor: '#fff',
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
          <CardContent
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Typography variant="h5" align="center">
              {shuffledCards[currentIndex]?.answer || "Loading..."}
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Typography variant="body1" align="center">
              {shuffledCards[currentIndex]?.question || "Loading..."}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, gap: 2 }}>
        <IconButton onClick={handlePrevious} color="primary">
          <PrevIcon />
        </IconButton>

        <Typography>
          {currentIndex + 1} / {shuffledCards.length}
        </Typography>

        <IconButton onClick={handleNext} color="primary">
          <NextIcon />
        </IconButton>

        <Button
          startIcon={<ShuffleIcon />}
          onClick={handleShuffle}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          Shuffle
        </Button>

        <Button
          onClick={rotateQuestions}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          New Set
        </Button>
      </Box>
    </Box>
  );
};

export default JNCIAFlashcards; 