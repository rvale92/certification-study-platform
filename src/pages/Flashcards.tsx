import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import FlipCard from '../components/FlipCard';
import { jnciaQuestions, ccnaQuestions, securityQuestions, sc205Questions } from '../data/examQuestions';

const examTypes = [
  { id: 'jncia', name: 'JNCIA', questions: jnciaQuestions },
  { id: 'ccna', name: 'CCNA', questions: ccnaQuestions },
  { id: 'security', name: 'Security+', questions: securityQuestions },
  { id: 'sc205', name: 'SC-205', questions: sc205Questions },
];

const Flashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedExam, setSelectedExam] = useState('jncia');

  const currentExam = examTypes.find(exam => exam.id === selectedExam);
  const currentQuestions = currentExam?.questions || [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentQuestions.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentQuestions.length) % currentQuestions.length);
  };

  const handleExamChange = (event: any) => {
    setSelectedExam(event.target.value);
    setCurrentIndex(0);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Flashcards
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Test your knowledge with interactive flashcards
        </Typography>
      </Box>

      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="exam-select-label">Select Exam</InputLabel>
            <Select
              labelId="exam-select-label"
              value={selectedExam}
              label="Select Exam"
              onChange={handleExamChange}
            >
              {examTypes.map((exam) => (
                <MenuItem key={exam.id} value={exam.id}>
                  {exam.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            {currentQuestions.length > 0 && (
              <FlipCard
                front={currentQuestions[currentIndex].correctAnswer}
                back={currentQuestions[currentIndex].question}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentIndex === currentQuestions.length - 1}
            >
              Next
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Card {currentIndex + 1} of {currentQuestions.length}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Flashcards; 