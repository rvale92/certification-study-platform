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
        title: 'Threats and Vulnerabilities',
        description: 'Learn about different types of threats and vulnerabilities.',
        link: 'https://www.comptia.org/certifications/security'
      },
      {
        title: 'Architecture and Design',
        description: 'Understand security architecture and design principles.',
        link: 'https://www.comptia.org/certifications/security'
      },
      {
        title: 'Implementation',
        description: 'Explore security implementation and operations.',
        link: 'https://www.comptia.org/certifications/security'
      },
    ],
  },
  {
    category: 'SC-205',
    topics: [
      {
        title: 'Microsoft Security Solutions',
        description: 'Learn about Microsoft security tools and solutions.',
        link: 'https://learn.microsoft.com/en-us/certifications/exams/sc-200/'
      },
      {
        title: 'Threat Protection',
        description: 'Understand threat protection and response in Microsoft environments.',
        link: 'https://learn.microsoft.com/en-us/certifications/exams/sc-200/'
      },
      {
        title: 'Information Protection',
        description: 'Explore information protection and governance.',
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