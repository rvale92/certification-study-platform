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
        perspective: '1000px',
        width: '100%',
        height: '300px',
        cursor: 'pointer',
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {front}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(180deg)',
            backgroundColor: '#f5f5f5',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {back}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FlipCard; 