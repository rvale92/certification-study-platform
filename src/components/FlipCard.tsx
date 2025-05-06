import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

interface FlipCardProps {
  front: string;
  back: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [showingAnswer, setShowingAnswer] = useState(false);

  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      {!showingAnswer ? (
        // Question Card (Front)
        <Card 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" component="div" align="center">
              {front}
            </Typography>
          </CardContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setShowingAnswer(true)}
            >
              Show Answer
            </Button>
          </Box>
        </Card>
      ) : (
        // Answer Card (Back)
        <Card 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" component="div" align="center">
              {back}
            </Typography>
          </CardContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => setShowingAnswer(false)}
            >
              Show Question
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default FlipCard; 