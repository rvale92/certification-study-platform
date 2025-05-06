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

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const CCNAQuiz: React.FC = () => {
  const questions: Question[] = [
    {
      question: "Which protocol operates at Layer 2 of the OSI model and prevents switching loops?",
      options: [
        "OSPF",
        "STP",
        "BGP",
        "EIGRP"
      ],
      correctAnswer: 1,
      explanation: "Spanning Tree Protocol (STP) operates at Layer 2 and prevents switching loops by creating a loop-free logical topology while maintaining redundant paths as backups."
    },
    {
      question: "What is the purpose of VLAN 1 in a Cisco switch?",
      options: [
        "It is used for VoIP traffic only",
        "It is the default management VLAN",
        "It is reserved for future use",
        "It is used for multicast traffic"
      ],
      correctAnswer: 1,
      explanation: "VLAN 1 is the default VLAN on Cisco switches and is traditionally used as the management VLAN. All switch ports belong to VLAN 1 by default."
    },
    {
      question: "Which IPv4 address class has a default subnet mask of 255.255.0.0?",
      options: [
        "Class A",
        "Class B",
        "Class C",
        "Class D"
      ],
      correctAnswer: 1,
      explanation: "Class B networks have a default subnet mask of 255.255.0.0 (/16), allowing for approximately 65,000 hosts per network."
    },
    {
      question: "What is the primary purpose of OSPF areas?",
      options: [
        "To increase network security",
        "To reduce routing table size and CPU usage",
        "To enable multicast routing",
        "To support IPv6 routing"
      ],
      correctAnswer: 1,
      explanation: "OSPF areas are used to reduce routing table size, minimize CPU usage, and contain LSA flooding within specific areas of the network."
    },
    {
      question: "Which EtherChannel protocol is Cisco proprietary?",
      options: [
        "LACP",
        "PAgP",
        "VRRP",
        "HSRP"
      ],
      correctAnswer: 1,
      explanation: "Port Aggregation Protocol (PAgP) is Cisco's proprietary protocol for EtherChannel configuration. LACP is the industry-standard alternative."
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
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1BA0D7', mb: 4 }}>
          CCNA Quiz Review
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
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1BA0D7', mb: 4 }}>
          CCNA Quiz Results
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
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1BA0D7', mb: 4 }}>
        CCNA Practice Quiz
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

export default CCNAQuiz; 