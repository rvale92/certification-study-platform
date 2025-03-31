import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SecurityPlusTopics: React.FC = () => {
  const topics = [
    {
      title: 'Attacks, Threats, and Vulnerabilities',
      content: [
        'Social engineering techniques',
        'Types of malware',
        'Types of attacks',
        'Application attacks',
        'Network attacks',
        'Threat actors and vectors',
        'Vulnerability scanning',
        'Penetration testing',
      ]
    },
    {
      title: 'Architecture and Design',
      content: [
        'Enterprise security',
        'Virtualization and cloud concepts',
        'Secure application development',
        'Authentication and authorization',
        'Resilience and automation',
        'Embedded and specialized systems',
        'Physical security controls',
        'Cryptographic concepts',
      ]
    },
    {
      title: 'Implementation',
      content: [
        'Identity and access management',
        'Public key infrastructure',
        'Wireless security',
        'Mobile device security',
        'Cloud security',
        'Network security',
        'Network architecture',
        'Security technologies',
      ]
    },
    {
      title: 'Operations and Incident Response',
      content: [
        'Security tools',
        'Incident response procedures',
        'Incident response plans',
        'Digital forensics',
        'Security controls',
        'Security monitoring',
        'Log management',
        'Vulnerability management',
      ]
    },
    {
      title: 'Governance, Risk, and Compliance',
      content: [
        'Security policies',
        'Privacy and data protection',
        'Risk management',
        'Regulations and standards',
        'Organizational security',
        'Security frameworks',
        'Business continuity',
        'Personnel security',
      ]
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#FF0000', mb: 4 }}>
        CompTIA Security+ Study Topics
      </Typography>
      
      {topics.map((topic, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#fee',
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
        These topics cover the main areas of the CompTIA Security+ certification exam.
        Study each section thoroughly and use the flashcards and quiz features to test your knowledge.
      </Typography>
    </Box>
  );
};

export default SecurityPlusTopics; 