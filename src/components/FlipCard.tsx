import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface FlipCardProps {
  front: string;
  back: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Front Card */}
      <Card
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          boxShadow: 3,
          transition: 'opacity 0.3s ease',
          opacity: isFlipped ? 0 : 1,
          visibility: isFlipped ? 'hidden' : 'visible',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            {front}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Click to reveal answer
          </Typography>
        </CardContent>
      </Card>

      {/* Back Card */}
      <Card
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          boxShadow: 3,
          transition: 'opacity 0.3s ease',
          opacity: isFlipped ? 1 : 0,
          visibility: isFlipped ? 'visible' : 'hidden',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            {back}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Click to show question
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FlipCard; 