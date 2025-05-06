import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  Refresh as RefreshIcon,
  Shuffle as ShuffleIcon
} from '@mui/icons-material';
import { flashcards, Flashcard } from '../data/flashcards';

const Flashcards: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);

  const filteredCards = flashcards.filter(card => {
    const examMatch = selectedExam === 'all' || card.exam === selectedExam;
    const categoryMatch = selectedCategory === 'all' || card.category === selectedCategory;
    return examMatch && categoryMatch;
  });

  const categories = Array.from(new Set(flashcards.map(card => card.category))).filter(Boolean);

  useEffect(() => {
    handleShuffle();
  }, [selectedExam, selectedCategory]);

  const handleNext = () => {
    if (currentCard < shuffledCards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    const newShuffled = [...filteredCards]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setShuffledCards(newShuffled);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const handleExamChange = (event: any) => {
    setSelectedExam(event.target.value);
    setSelectedCategory('all');
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Exam</InputLabel>
                  <Select
                    value={selectedExam}
                    onChange={handleExamChange}
                    label="Exam"
                  >
                    <MenuItem value="all">All Exams</MenuItem>
                    <MenuItem value="jncia">JNCIA</MenuItem>
                    <MenuItem value="ccna">CCNA</MenuItem>
                    <MenuItem value="security">Security+</MenuItem>
                    <MenuItem value="sc205">SC-205</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  startIcon={<ShuffleIcon />}
                  onClick={handleShuffle}
                  fullWidth
                >
                  Shuffle Cards
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Card
            sx={{
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
            onClick={handleFlip}
          >
            <CardContent
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <Typography variant="h5" component="div" gutterBottom>
                Question
              </Typography>
              <Typography variant="body1">
                {shuffledCards[currentCard]?.question}
              </Typography>
            </CardContent>
            <CardContent
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
              }}
            >
              <Typography variant="h5" component="div" gutterBottom>
                Answer
              </Typography>
              <Typography variant="body1">
                {shuffledCards[currentCard]?.answer}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton onClick={handlePrevious} disabled={currentCard === 0}>
              <PrevIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Card {currentCard + 1} of {shuffledCards.length}
            </Typography>
            <IconButton onClick={handleNext} disabled={currentCard === shuffledCards.length - 1}>
              <NextIcon />
            </IconButton>
          </Box>
          <LinearProgress
            variant="determinate"
            value={((currentCard + 1) / shuffledCards.length) * 100}
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Flashcards; 