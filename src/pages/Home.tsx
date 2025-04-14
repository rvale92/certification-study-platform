import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const certifications = [
  {
    name: 'JNCIA 105',
    description: 'Juniper Networks Certified Associate - Junos',
    color: '#84B135',
  },
  {
    name: 'CCNA',
    description: 'Cisco Certified Network Associate',
    color: '#1BA0D7',
  },
  {
    name: 'CompTIA Security+',
    description: 'Security+ Certification',
    color: '#FF0000',
  },
  {
    name: 'Microsoft SC-205',
    description: 'Microsoft Security Operations Analyst',
    color: '#00A4EF',
  },
];

const features = [
  {
    title: 'Practice Exams',
    description: 'Test your knowledge with timed practice exams that simulate the real certification experience.',
    path: '/practice-exams',
  },
  {
    title: 'Flashcards',
    description: 'Review key concepts and terms with interactive flashcards.',
    path: '/flashcards',
  },
  {
    title: 'Study Topics',
    description: 'Explore detailed study materials organized by topic.',
    path: '/study-topics',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Certification Study Platform
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your comprehensive resource for IT certification preparation
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Available Certifications
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {certifications.map((cert) => (
          <Grid item xs={12} sm={6} md={3} key={cert.name}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${cert.color}`,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {cert.name}
                </Typography>
                <Typography color="text.secondary">
                  {cert.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/practice-exams/${cert.name.replace(/\s+/g, '-').toLowerCase()}`)}
                >
                  Start Studying
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(feature.path)}
                >
                  Get Started
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 