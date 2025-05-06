import React, { useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Router as RouterIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Storage as StorageIcon,
  Code as CodeIcon
} from '@mui/icons-material';

const topics = [
  {
    title: 'Networking Fundamentals',
    icon: RouterIcon,
    items: [
      'OSI Reference Model and TCP/IP',
      'IPv4 Addressing and Subnetting',
      'IPv6 Addressing and Concepts',
      'Layer 2 Switching Concepts',
      'Layer 3 Routing Concepts'
    ]
  },
  {
    title: 'Junos OS Fundamentals',
    icon: SettingsIcon,
    items: [
      'Junos OS Architecture',
      'Junos Device Portfolio',
      'Command Line Interface (CLI)',
      'User Interface Options',
      'Configuration Basics'
    ]
  },
  {
    title: 'Routing Fundamentals',
    icon: StorageIcon,
    items: [
      'Static Routing',
      'OSPF Protocol Basics',
      'BGP Protocol Basics',
      'Route Preferences',
      'Routing Policies'
    ]
  },
  {
    title: 'Security and Access',
    icon: SecurityIcon,
    items: [
      'User Authentication',
      'Firewall Filters',
      'Security Policies',
      'Access Management',
      'System Security'
    ]
  },
  {
    title: 'Network Management',
    icon: CodeIcon,
    items: [
      'System Logging',
      'SNMP Configuration',
      'Network Monitoring',
      'System Maintenance',
      'Troubleshooting Tools'
    ]
  }
];

const Topics: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        JNCIA Study Topics
      </Typography>
      <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        Master these topics to prepare for your JNCIA certification
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        {topics.map((topic, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center'
                }
              }}
            >
              <topic.icon sx={{ mr: 2 }} />
              <Typography variant="h6">{topic.title}</Typography>
              <Chip 
                label={`${topic.items.length} subtopics`} 
                size="small" 
                sx={{ ml: 2 }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {topic.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex}>
                    <ListItemText 
                      primary={item}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: 500
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Note: This study guide covers the main topics for the JNCIA-Junos exam. 
          Make sure to also review the official Juniper Networks certification resources 
          and practice with hands-on lab exercises.
        </Typography>
      </Box>
    </Box>
  );
};

export default Topics; 