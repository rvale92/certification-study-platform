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

const JNCIAQuiz: React.FC = () => {
  const questions: Question[] = [
    {
      question: "What is the primary function of the Routing Engine in Junos OS?",
      options: [
        "Forwarding network traffic",
        "Running routing protocols and maintaining routing tables",
        "Filtering packets",
        "Managing user interfaces"
      ],
      correctAnswer: 1,
      explanation: "The Routing Engine runs routing protocols, maintains routing tables, and handles system management and user access. It's the control plane of the system."
    },
    {
      question: "Which command is used to save the current configuration in Junos OS?",
      options: [
        "write memory",
        "save config",
        "commit",
        "copy running-config startup-config"
      ],
      correctAnswer: 2,
      explanation: "The 'commit' command is used to save and activate configuration changes in Junos OS. It also performs a validation check before applying changes."
    },
    {
      question: "What is the purpose of a rescue configuration in Junos OS?",
      options: [
        "To automatically recover from hardware failures",
        "To store a known working configuration for recovery",
        "To backup routing tables",
        "To save interface configurations only"
      ],
      correctAnswer: 1,
      explanation: "A rescue configuration is a known working configuration that can be loaded when the current configuration is not working properly or during recovery scenarios."
    },
    {
      question: "Which protocol is used by default for remote management in Junos OS?",
      options: [
        "Telnet",
        "SSH",
        "HTTP",
        "SNMP"
      ],
      correctAnswer: 1,
      explanation: "SSH (Secure Shell) is the default protocol for remote management in Junos OS as it provides secure, encrypted communications."
    },
    {
      question: "What is the function of the 'rollback' command in Junos OS?",
      options: [
        "To restart the system",
        "To return to a previous configuration",
        "To clear the routing table",
        "To reset interface statistics"
      ],
      correctAnswer: 1,
      explanation: "The 'rollback' command allows you to return to a previous configuration. Junos OS maintains up to 50 previous configurations by default."
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
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#84B135', mb: 4 }}>
          JNCIA Quiz Review
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
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#84B135', mb: 4 }}>
          JNCIA Quiz Results
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
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#84B135', mb: 4 }}>
        JNCIA Practice Quiz
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

export default JNCIAQuiz; 