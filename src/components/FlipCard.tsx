import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Chip } from '@mui/material';

interface FlipCardProps {
  front: string;
  back: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [showingAnswer, setShowingAnswer] = useState(false);

  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      {!showingAnswer ? (
        // Question Side
        <Card 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            boxShadow: 3,
            position: 'relative',
            p: 2
          }}
        >
          <Chip 
            label="QUESTION" 
            color="primary" 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              left: 10,
              fontWeight: 'bold'
            }} 
          />
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: 4 }}>
            <Typography variant="h5" component="div" align="center">
              {front}
            </Typography>
          </CardContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => setShowingAnswer(true)}
              size="large"
              sx={{ minWidth: '200px' }}
            >
              Show Answer
            </Button>
          </Box>
        </Card>
      ) : (
        // Answer Side
        <Card 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
            boxShadow: 3,
            position: 'relative',
            p: 2
          }}
        >
          <Chip 
            label="ANSWER" 
            color="success" 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              left: 10,
              fontWeight: 'bold'
            }} 
          />
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: 4 }}>
            <Typography variant="h5" component="div" align="center">
              {back}
            </Typography>
          </CardContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setShowingAnswer(false)}
              size="large"
              sx={{ minWidth: '200px' }}
            >
              Back to Question
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default FlipCard; 