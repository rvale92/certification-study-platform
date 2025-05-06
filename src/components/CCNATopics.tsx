import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CCNATopics: React.FC = () => {
  const topics = [
    {
      title: 'Network Fundamentals',
      content: [
        'OSI and TCP/IP models',
        'Network protocols and services',
        'Network components and topologies',
        'IPv4 and IPv6 addressing',
        'Subnetting and VLSM',
      ]
    },
    {
      title: 'Network Access',
      content: [
        'VLANs and trunking',
        'EtherChannel',
        'Wireless principles',
        'WLAN components and topologies',
        'WLAN security',
      ]
    },
    {
      title: 'IP Connectivity',
      content: [
        'Static routing',
        'Dynamic routing protocols (OSPF)',
        'Router configuration',
        'First-hop redundancy protocols',
        'Network address translation',
      ]
    },
    {
      title: 'IP Services',
      content: [
        'DHCP',
        'DNS',
        'NTP',
        'SNMP',
        'QoS concepts',
        'Network management tools',
      ]
    },
    {
      title: 'Security Fundamentals',
      content: [
        'Security concepts',
        'Access control',
        'Layer 2 security features',
        'Device access control',
        'Security policies',
      ]
    },
    {
      title: 'Automation and Programmability',
      content: [
        'REST APIs',
        'Configuration management tools',
        'SDN concepts',
        'Controller types',
        'Network programmability',
      ]
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1BA0D7', mb: 4 }}>
        CCNA Study Topics
      </Typography>
      
      {topics.map((topic, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              }
            }}
          >
            <Typography variant="h6">{topic.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {topic.content.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Typography variant="body1" paragraph>
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
        These topics cover the main areas of the CCNA certification exam.
        Study each section thoroughly and use the flashcards and quiz features to test your knowledge.
      </Typography>
    </Box>
  );
};

export default CCNATopics; 