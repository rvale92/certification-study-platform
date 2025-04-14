import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { examQuestions, Question } from '../data/examQuestions';

const Exam: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (examId && examQuestions[examId as keyof typeof examQuestions]) {
      // Get all questions for the exam
      const allQuestions = examQuestions[examId as keyof typeof examQuestions];
      // Randomly select 65 questions
      const shuffled = [...allQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 65);
      setQuestions(shuffled);
      setAnswers(new Array(65).fill(''));
    }
  }, [examId]);

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore) {
      handleFinish();
    }
  }, [timeLeft, showScore]);

  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleFinish = () => {
    const finalScore = answers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(finalScore);
    setShowScore(true);
  };

  const handleConfirmFinish = () => {
    setShowConfirmDialog(true);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showScore) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Exam Results
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Your Score: {score} out of {questions.length}
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
              {percentage.toFixed(1)}%
            </Typography>
            <Typography variant="h6" gutterBottom align="center" color={passed ? 'success.main' : 'error.main'}>
              {passed ? 'Passed' : 'Failed'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
              <Button variant="contained" onClick={() => navigate('/exam-review/' + examId)}>
                Review Answers
              </Button>
              <Button variant="outlined" onClick={() => navigate('/practice-exams')}>
                Back to Exams
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" align="center">
          Loading exam...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        {examId?.toUpperCase()} Practice Exam
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" align="center" color="text.secondary">
          Time Remaining: {formatTime(timeLeft)}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(timeLeft / 5400) * 100} 
          sx={{ mt: 1 }}
        />
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={((currentQuestion + 1) / questions.length) * 100} 
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            {questions[currentQuestion].question}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        {currentQuestion < questions.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmFinish}
          >
            Finish Exam
          </Button>
        )}
      </Box>

      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>Finish Exam</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to finish the exam? You will not be able to return to it.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleFinish} color="primary" variant="contained">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Exam; 