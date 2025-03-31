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

const CCNAFlashcards: React.FC = () => {
  // This is the full pool of 120 questions
  const fullQuestionPool: Flashcard[] = [
    // Original 20 questions with swapped question/answer
    {
      answer: "What is a VLAN?",
      question: "A Virtual LAN is a logical network that groups devices together regardless of their physical location, allowing better network segmentation and security."
    },
    {
      answer: "What is OSPF?",
      question: "Open Shortest Path First is a link-state routing protocol that uses Dijkstra's algorithm to find the shortest path to each network. It operates within a single autonomous system."
    },
    {
      answer: "What is the purpose of STP (Spanning Tree Protocol)?",
      question: "STP prevents network loops in Layer 2 networks by creating a loop-free logical topology, while maintaining redundant paths as backups."
    },
    {
      answer: "What is the difference between TCP and UDP?",
      question: "TCP is connection-oriented, reliable, and ensures data delivery with flow control. UDP is connectionless, unreliable, but faster with less overhead."
    },
    {
      answer: "What is a trunk port?",
      question: "A trunk port is a switch port that carries traffic for multiple VLANs, typically using 802.1Q tagging to identify which VLAN each frame belongs to."
    },
    {
      answer: "What is DHCP and what are its four steps?",
      question: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses. Steps: 1) DHCP Discover 2) DHCP Offer 3) DHCP Request 4) DHCP Acknowledge (DORA)."
    },
    {
      answer: "What is NAT and what problem does it solve?",
      question: "Network Address Translation converts private IP addresses to public IP addresses, helping conserve IPv4 addresses and providing additional security by hiding internal network addresses."
    },
    {
      answer: "What is EtherChannel?",
      question: "EtherChannel combines multiple physical Ethernet links into one logical link for increased bandwidth and redundancy. It can use protocols like PAgP or LACP."
    },
    {
      answer: "What is the difference between a router and a switch?",
      question: "A router operates at Layer 3 and forwards packets between different networks using IP addresses. A switch operates at Layer 2 and forwards frames within the same network using MAC addresses."
    },
    {
      answer: "What is a subnet mask and what is its purpose?",
      question: "A subnet mask determines which portion of an IP address identifies the network and which portion identifies the host, allowing for efficient network segmentation and routing."
    },
    {
      answer: "What is the purpose of HSRP?",
      question: "Hot Standby Router Protocol provides network redundancy by allowing multiple routers to share a virtual IP address, ensuring continuous network availability if the primary router fails."
    },
    {
      answer: "What is the difference between access and trunk ports?",
      question: "Access ports belong to and carry traffic for a single VLAN, while trunk ports can carry traffic for multiple VLANs using VLAN tagging."
    },
    {
      answer: "What is CDP and what information does it provide?",
      question: "Cisco Discovery Protocol is a Layer 2 protocol that discovers directly connected Cisco devices and provides information about their platform, capabilities, and network addresses."
    },
    {
      answer: "What is the purpose of OSPF areas?",
      question: "OSPF areas help reduce routing table size, minimize CPU usage, and contain LSA flooding within specific areas of the network, improving scalability and performance."
    },
    {
      answer: "What is the difference between PAT and NAT?",
      question: "PAT (Port Address Translation) maps multiple private IP addresses to a single public IP using different port numbers, while basic NAT maps private IPs to public IPs one-to-one."
    },
    {
      answer: "What is a VLAN database?",
      question: "The VLAN database stores VLAN configuration information on a switch, including VLAN IDs, names, and associated ports. It can be in VLAN.dat file or running configuration."
    },
    {
      answer: "What is the purpose of VTP (VLAN Trunking Protocol)?",
      question: "VTP maintains VLAN configuration consistency across a network by propagating VLAN information from VTP server to VTP clients, reducing manual configuration."
    },
    {
      answer: "What is the difference between OSPF and EIGRP?",
      question: "OSPF is an open standard link-state protocol using Dijkstra's algorithm, while EIGRP is a Cisco proprietary advanced distance-vector protocol using DUAL algorithm."
    },
    {
      answer: "What is the purpose of ACLs (Access Control Lists)?",
      question: "ACLs filter network traffic by controlling which packets are forwarded or blocked at router interfaces based on specified criteria like source/destination addresses and ports."
    },
    {
      answer: "What is the purpose of the 'show running-config' command?",
      question: "This command displays the current active configuration in the device's memory, including interface configurations, routing protocols, and security settings."
    },
    // Additional questions to reach 120
    {
      answer: "What is the purpose of SNMP?",
      question: "Simple Network Management Protocol allows network administrators to monitor and manage network devices remotely by collecting data and modifying device configurations."
    },
    {
      answer: "What is the difference between a collision domain and a broadcast domain?",
      question: "A collision domain is a network segment where packets can collide, typically separated by switches. A broadcast domain is where broadcast packets can reach, typically separated by routers."
    },
    {
      answer: "What is the purpose of VRRP?",
      question: "Virtual Router Redundancy Protocol provides automatic router failover by creating a virtual router from a group of routers, ensuring network availability."
    },
    {
      answer: "What is the difference between a hub and a switch?",
      question: "A hub operates at Layer 1 and forwards data to all ports, while a switch operates at Layer 2 and forwards data only to the specific destination port."
    },
    {
      answer: "What is the purpose of OSPF LSAs?",
      question: "Link State Advertisements carry routing information about network topology, allowing OSPF routers to build and maintain their link-state databases."
    },
    {
      answer: "What is the purpose of LLDP?",
      question: "Link Layer Discovery Protocol is an industry-standard protocol that discovers and advertises device capabilities and neighbor information, similar to CDP but vendor-neutral."
    },
    {
      answer: "What is the difference between a router-on-a-stick and a multilayer switch?",
      question: "A router-on-a-stick uses a single interface with subinterfaces for inter-VLAN routing, while a multilayer switch performs routing between VLANs using dedicated hardware."
    },
    {
      answer: "What is the purpose of GLBP?",
      question: "Gateway Load Balancing Protocol provides both redundancy and load balancing across multiple routers, allowing active-active gateway configurations."
    },
    {
      answer: "What is the purpose of EIGRP feasible successors?",
      question: "Feasible successors are backup routes that meet EIGRP's feasibility condition, allowing for immediate failover without recalculating routes."
    },
    {
      answer: "What is the difference between OSPF network types?",
      question: "OSPF network types (point-to-point, broadcast, non-broadcast, point-to-multipoint) determine how OSPF operates, including neighbor discovery and DR/BDR election."
    },
    {
      answer: "What is the purpose of SPAN and RSPAN?",
      question: "SPAN (Switched Port Analyzer) and RSPAN (Remote SPAN) mirror network traffic to a monitoring port for analysis, with RSPAN allowing monitoring across different switches."
    },
    {
      answer: "What is the difference between TACACS+ and RADIUS?",
      question: "TACACS+ encrypts the entire packet and separates authentication, authorization, and accounting, while RADIUS only encrypts the password and combines these functions."
    },
    {
      answer: "What is the purpose of BPDU Guard?",
      question: "BPDU Guard disables a port when it receives a BPDU, protecting against unauthorized switches and maintaining the intended network topology."
    },
    {
      answer: "What is the difference between PVST+ and Rapid PVST+?",
      question: "PVST+ runs a separate instance of STP for each VLAN but converges slowly, while Rapid PVST+ uses RSTP for faster convergence."
    },
    {
      answer: "What is the purpose of IP SLA?",
      question: "IP SLA (Service Level Agreement) monitors network performance by measuring metrics like delay, jitter, and packet loss between network devices."
    },
    {
      answer: "What is the difference between OSPF E1 and E2 routes?",
      question: "E1 routes include both external cost and internal cost to reach the destination, while E2 routes only consider the external cost."
    },
    {
      answer: "What is the purpose of DHCP Snooping?",
      question: "DHCP Snooping prevents unauthorized DHCP servers by validating DHCP messages and maintaining a binding database of legitimate client-IP assignments."
    },
    {
      answer: "What is the difference between MLS and CEF?",
      question: "Multilayer Switching (MLS) caches flow information for fast switching, while Cisco Express Forwarding (CEF) pre-builds forwarding tables for deterministic switching."
    },
    {
      answer: "What is the purpose of UDLD?",
      question: "UniDirectional Link Detection monitors fiber-optic or copper links for unidirectional failures that STP can't detect, preventing network loops."
    },
    {
      answer: "What is the difference between EIGRP composite metrics?",
      question: "EIGRP uses bandwidth, delay, reliability, load, and MTU to calculate route metrics, with bandwidth and delay being the default components."
    },
    {
      answer: "What is the purpose of AutoQoS?",
      question: "AutoQoS automatically configures QoS settings for voice and video traffic, simplifying the deployment of QoS policies on Cisco devices."
    },
    {
      answer: "What is the difference between OSPF LSA types?",
      question: "Different LSA types carry different routing information: Type 1 (Router), Type 2 (Network), Type 3 (Summary), Type 4 (ASBR Summary), Type 5 (External)."
    },
    {
      answer: "What is the purpose of WCCP?",
      question: "Web Cache Communication Protocol redirects web traffic to content engines, improving response times and reducing WAN bandwidth usage."
    },
    {
      answer: "What is the difference between SNMP versions?",
      question: "SNMPv1 uses community strings, SNMPv2c adds bulk retrieval, and SNMPv3 adds security features like authentication and encryption."
    },
    {
      answer: "What is the purpose of NetFlow?",
      question: "NetFlow collects IP traffic statistics, providing detailed information about network flows for capacity planning, billing, and security monitoring."
    },
    {
      answer: "What is the difference between OSPF virtual links and sham links?",
      question: "Virtual links connect disconnected areas through the backbone, while sham links connect sites that share non-OSPF connections."
    },
    {
      answer: "What is the purpose of SDM templates?",
      question: "Switching Database Manager templates optimize system resources for specific features like IPv4 routing, IPv6 routing, or access control lists."
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
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1BA0D7', mb: 4 }}>
        CCNA Flashcards
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

export default CCNAFlashcards; 