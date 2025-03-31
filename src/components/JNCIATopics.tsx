import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const JNCIATopics: React.FC = () => {
  const topics = [
    {
      title: 'Junos OS Fundamentals',
      content: [
        'Junos OS software architecture',
        'Routing engine and packet forwarding engine',
        'Transit traffic vs. host-bound traffic',
        'Junos OS CLI',
        'Configuration management',
      ]
    },
    {
      title: 'User Interface and Configuration',
      content: [
        'CLI help and command completion',
        'Configuration mode',
        'Configure, commit, and confirm commands',
        'Rollback and rescue configuration',
        'File management and user authentication',
      ]
    },
    {
      title: 'Routing Fundamentals',
      content: [
        'Static routing',
        'Default route',
        'Dynamic routing protocols overview',
        'Distance vector vs. link state',
        'Route preferences',
      ]
    },
    {
      title: 'Routing Policy and Firewall Filters',
      content: [
        'Processing of routing policies',
        'Policy chains',
        'Match conditions and actions',
        'Firewall filter concepts',
        'Filter match conditions',
      ]
    },
    {
      title: 'Network Security Services',
      content: [
        'Zones and zone interfaces',
        'Security policies',
        'Network Address Translation (NAT)',
        'IPsec VPN concepts',
        'Class of Service (CoS)',
      ]
    },
    {
      title: 'Monitoring and Maintenance',
      content: [
        'Interface monitoring',
        'System logging',
        'Network monitoring',
        'Performance monitoring',
        'Basic troubleshooting',
      ]
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#84B135', mb: 4 }}>
        JNCIA Study Topics
      </Typography>
      
      {topics.map((topic, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#f0f7e6',
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
        These topics cover the main areas of the JNCIA-Junos certification exam.
        Study each section thoroughly and use the flashcards and quiz features to test your knowledge.
      </Typography>
    </Box>
  );
};

export default JNCIATopics; 