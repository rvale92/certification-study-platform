import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import {
  MenuBook as TopicsIcon,
  FlashOn as FlashcardsIcon,
  Quiz as QuizIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const certifications = [
    {
      title: 'JNCIA-Junos',
      description: 'Juniper Networks Certified Associate - Junos OS',
      path: 'jncia',
      color: '#84B135'
    },
    {
      title: 'CCNA',
      description: 'Cisco Certified Network Associate',
      path: 'ccna',
      color: '#1BA0D7'
    },
    {
      title: 'Security+',
      description: 'CompTIA Security+ Certification',
      path: 'security',
      color: '#FF0000'
    }
  ];

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Certification Study Guide
      </Typography>
      
      <Grid container spacing={4}>
        {certifications.map((cert) => (
          <Grid item xs={12} md={4} key={cert.path}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: cert.color }}>
                  {cert.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {cert.description}
                </Typography>
                <Typography variant="body2" paragraph>
                  Choose your study path:
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<TopicsIcon />}
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate(`/${cert.path}/topics`)}
                    >
                      Study Topics
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<FlashcardsIcon />}
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate(`/${cert.path}/flashcards`)}
                    >
                      Flashcards
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<QuizIcon />}
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate(`/${cert.path}/quiz`)}
                    >
                      Practice Quiz
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Choose a certification path above to begin your study journey.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Each path includes comprehensive study materials, flashcards, and practice quizzes.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home; 