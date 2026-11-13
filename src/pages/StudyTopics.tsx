import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const topics = [
  {
    category: 'JNCIA',
    topics: [
      {
        title: 'Junos OS Fundamentals',
        description: 'Learn about the Junos operating system, its architecture, and basic operations.',
        link: 'https://www.juniper.net/us/en/training/certification/certification-tracks/jncia-junos.html'
      },
      {
        title: 'Routing Fundamentals',
        description: 'Understand routing concepts, protocols, and configuration in Junos OS.',
        link: 'https://www.juniper.net/us/en/training/certification/certification-tracks/jncia-junos.html'
      },
      {
        title: 'Security Features',
        description: 'Explore security features and firewall filters in Junos OS.',
        link: 'https://www.juniper.net/us/en/training/certification/certification-tracks/jncia-junos.html'
      },
    ],
  },
  {
    category: 'CCNA',
    topics: [
      {
        title: 'Network Fundamentals',
        description: 'Learn about network components, protocols, and architectures.',
        link: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html'
      },
      {
        title: 'IP Connectivity',
        description: 'Understand IP addressing, routing, and subnetting.',
        link: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html'
      },
      {
        title: 'Security Fundamentals',
        description: 'Explore basic security concepts and network security.',
        link: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html'
      },
    ],
  },
  {
    category: 'Security+',
    topics: [
      {
        title: 'General Security Concepts',
        description: 'Review foundational security concepts, control types, cryptography, and security responsibilities.',
        link: 'https://www.comptia.org/certifications/security'
      },
      {
        title: 'Threats, Vulnerabilities, and Mitigations',
        description: 'Identify common threats and vulnerabilities and select appropriate mitigations.',
        link: 'https://www.comptia.org/certifications/security'
      },
      {
        title: 'Security Architecture',
        description: 'Apply secure design principles across networks, cloud services, and resilient systems.',
        link: 'https://www.comptia.org/certifications/security'
      },
      {
        title: 'Security Operations',
        description: 'Operate security controls, monitor events, manage identities, and respond to incidents.',
        link: 'https://www.comptia.org/certifications/security'
      },
      {
        title: 'Security Program Management and Oversight',
        description: 'Understand security governance, risk, compliance, and oversight practices.',
        link: 'https://www.comptia.org/certifications/security'
      },
    ],
  },
  {
    category: 'SC-200',
    topics: [
      {
        title: 'Manage Security Operations Environment',
        description: 'Configure and manage Microsoft Sentinel and the security operations workspace.',
        link: 'https://learn.microsoft.com/en-us/certifications/exams/sc-200/'
      },
      {
        title: 'Configure Protections and Detections',
        description: 'Configure Microsoft security protections, detections, and data connectors.',
        link: 'https://learn.microsoft.com/en-us/certifications/exams/sc-200/'
      },
      {
        title: 'Manage Incident Response',
        description: 'Investigate alerts and incidents and coordinate response actions.',
        link: 'https://learn.microsoft.com/en-us/certifications/exams/sc-200/'
      },
      {
        title: 'Perform Threat Hunting',
        description: 'Use queries and threat intelligence to proactively search for threats.',
        link: 'https://learn.microsoft.com/en-us/certifications/exams/sc-200/'
      },
    ],
  },
];

const StudyTopics: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 5, md: 6 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold'
          }}
        >
          Study Topics
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          paragraph
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
          }}
        >
          Explore comprehensive study materials organized by topic
        </Typography>
      </Box>

      {topics.map((category) => (
        <Accordion 
          key={category.category} 
          sx={{ 
            mb: 2,
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Typography 
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
              }}
            >
              {category.category}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {category.topics.map((topic) => (
                <Grid item xs={12} sm={6} md={4} key={topic.title}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                        }}
                      >
                        {topic.title}
                      </Typography>
                      <Typography 
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
                        }}
                      >
                        {topic.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        color="primary"
                        href={topic.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9rem' }
                        }}
                      >
                        Start Learning
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default StudyTopics; 