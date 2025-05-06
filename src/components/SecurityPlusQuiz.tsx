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
} from '@mui/material';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const SecurityPlusQuiz: React.FC = () => {
  const questions: Question[] = [
    {
      question: "Which of the following best describes the concept of defense in depth?",
      options: [
        "Using a single, strong security control",
        "Implementing multiple layers of security controls",
        "Focusing only on perimeter security",
        "Using only encryption for data protection"
      ],
      correctAnswer: 1,
      explanation: "Defense in depth is a security strategy that employs multiple layers of security controls to protect assets. If one layer fails, other layers continue to provide protection."
    },
    {
      question: "What is the primary purpose of a SIEM system?",
      options: [
        "To encrypt network traffic",
        "To collect and analyze security events from multiple sources",
        "To block malicious websites",
        "To manage user passwords"
      ],
      correctAnswer: 1,
      explanation: "Security Information and Event Management (SIEM) systems collect, analyze, and correlate security events from multiple sources to detect and respond to security incidents in real-time."
    },
    {
      question: "Which encryption type uses the same key for encryption and decryption?",
      options: [
        "Asymmetric encryption",
        "Symmetric encryption",
        "Hashing",
        "Digital signatures"
      ],
      correctAnswer: 1,
      explanation: "Symmetric encryption uses the same key for both encryption and decryption processes. This makes it faster than asymmetric encryption but requires secure key distribution."
    },
    {
      question: "What is the purpose of non-repudiation in security?",
      options: [
        "To prevent data loss",
        "To ensure a user cannot deny their actions",
        "To encrypt data",
        "To block network attacks"
      ],
      correctAnswer: 1,
      explanation: "Non-repudiation ensures that a user cannot deny performing an action by providing proof of the origin of data and proof of delivery, often using digital signatures."
    },
    {
      question: "Which attack type exploits input validation vulnerabilities?",
      options: [
        "Social engineering",
        "SQL injection",
        "Shoulder surfing",
        "Tailgating"
      ],
      correctAnswer: 1,
      explanation: "SQL injection is an attack that exploits poor input validation by inserting malicious SQL code into application inputs, potentially allowing unauthorized database access."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [answers, setAnswers] = useState<number[]>([]);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore) {
      handleFinish();
    }
  }, [timeLeft, showScore]);

  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(parseInt(event.target.value));
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers([...answers, selectedAnswer]);
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinish = () => {
    if (selectedAnswer !== null) {
      setAnswers([...answers, selectedAnswer]);
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
    setShowScore(true);
  };

  const handleReview = () => {
    setShowReview(true);
    setShowScore(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showReview) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#FF0000', mb: 4 }}>
          Security+ Quiz Review
        </Typography>
        {questions.map((question, index) => (
          <Card key={index} sx={{ mb: 3, backgroundColor: answers[index] === question.correctAnswer ? '#e8f5e9' : '#ffebee' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Question {index + 1}
              </Typography>
              <Typography variant="body1" paragraph>
                {question.question}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Your answer: {question.options[answers[index]]}
              </Typography>
              <Typography variant="body2" color={answers[index] === question.correctAnswer ? 'success.main' : 'error.main'} paragraph>
                Correct answer: {question.options[question.correctAnswer]}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                Explanation: {question.explanation}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Retake Quiz
          </Button>
        </Box>
      </Box>
    );
  }

  if (showScore) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#FF0000', mb: 4 }}>
          Security+ Quiz Results
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Your Score: {score} out of {questions.length}
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
              {Math.round((score / questions.length) * 100)}%
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
              <Button variant="contained" onClick={handleReview}>
                Review Answers
              </Button>
              <Button variant="outlined" onClick={() => window.location.reload()}>
                Retake Quiz
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#FF0000', mb: 4 }}>
        Security+ Practice Quiz
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <LinearProgress 
          variant="determinate" 
          value={(currentQuestion / questions.length) * 100} 
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Time remaining: {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {questions[currentQuestion].question}
          </Typography>
          
          <FormControl component="fieldset">
            <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        {currentQuestion < questions.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            Next Question
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleFinish}
            disabled={selectedAnswer === null}
          >
            Finish Quiz
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SecurityPlusQuiz; 