import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Mock data for exam results
const mockExamResults = {
  jncia: {
    score: 85,
    totalQuestions: 125,
    correctAnswers: 106,
    timeTaken: 75,
    questions: [
      {
        id: 1,
        question: 'What is the default administrative distance for static routes in Junos OS?',
        options: ['5', '10', '15', '20'],
        correctAnswer: '5',
        userAnswer: '5',
        explanation: 'In Junos OS, static routes have a default administrative distance of 5.',
      },
      {
        id: 2,
        question: 'Which command shows the routing table in Junos OS?',
        options: ['show route', 'show routing-table', 'show ip route', 'show routes'],
        correctAnswer: 'show route',
        userAnswer: 'show routing-table',
        explanation: 'The correct command to view the routing table in Junos OS is "show route".',
      },
    ],
  },
  ccna: {
    score: 78,
    totalQuestions: 125,
    correctAnswers: 98,
    timeTaken: 82,
    questions: [
      {
        id: 1,
        question: 'What is the default administrative distance of OSPF?',
        options: ['90', '100', '110', '120'],
        correctAnswer: '110',
        userAnswer: '110',
        explanation: 'OSPF has a default administrative distance of 110.',
      },
    ],
  },
  security: {
    score: 92,
    totalQuestions: 125,
    correctAnswers: 115,
    timeTaken: 70,
    questions: [
      {
        id: 1,
        question: 'What type of attack is a man-in-the-middle attack?',
        options: ['Passive', 'Active', 'Both', 'Neither'],
        correctAnswer: 'Active',
        userAnswer: 'Active',
        explanation: 'A man-in-the-middle attack is an active attack where the attacker intercepts and potentially alters the communication.',
      },
    ],
  },
  sc205: {
    score: 88,
    totalQuestions: 125,
    correctAnswers: 110,
    timeTaken: 80,
    questions: [
      {
        id: 1,
        question: 'What is Azure Sentinel?',
        options: [
          'A SIEM solution',
          'A SOAR solution',
          'Both SIEM and SOAR',
          'Neither',
        ],
        correctAnswer: 'Both SIEM and SOAR',
        userAnswer: 'Both SIEM and SOAR',
        explanation: 'Azure Sentinel is both a Security Information and Event Management (SIEM) and Security Orchestration, Automation, and Response (SOAR) solution.',
      },
    ],
  },
};

const ExamReview: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const examData = examId ? mockExamResults[examId as keyof typeof mockExamResults] : null;

  if (!examData) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Exam not found
        </Typography>
      </Container>
    );
  }

  const getExamTitle = (id: string) => {
    switch (id) {
      case 'jncia':
        return 'JNCIA 105';
      case 'ccna':
        return 'CCNA';
      case 'security':
        return 'CompTIA Security+';
      case 'sc205':
        return 'Microsoft SC-205';
      default:
        return 'Unknown Exam';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {getExamTitle(examId || '')} Exam Review
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Score
                </Typography>
                <Typography variant="h4" color="primary">
                  {examData.score}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Correct Answers
                </Typography>
                <Typography variant="h4" color="primary">
                  {examData.correctAnswers}/{examData.totalQuestions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Time Taken
                </Typography>
                <Typography variant="h4" color="primary">
                  {examData.timeTaken} min
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Status
                </Typography>
                <Chip
                  label={examData.score >= 70 ? 'Passed' : 'Failed'}
                  color={examData.score >= 70 ? 'success' : 'error'}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>
          Questions Review
        </Typography>

        <List>
          {examData.questions.map((question) => (
            <React.Fragment key={question.id}>
              <ListItem
                button
                onClick={() => setSelectedQuestion(question.id)}
                sx={{
                  backgroundColor: selectedQuestion === question.id ? 'action.hover' : 'inherit',
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">
                        Question {question.id}
                      </Typography>
                      {question.userAnswer === question.correctAnswer ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <CancelIcon color="error" />
                      )}
                    </Box>
                  }
                  secondary={question.question}
                />
              </ListItem>
              {selectedQuestion === question.id && (
                <Box sx={{ pl: 4, pr: 2, py: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Your Answer: {question.userAnswer}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Correct Answer: {question.correctAnswer}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Explanation: {question.explanation}
                  </Typography>
                </Box>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.history.back()}
          >
            Back to Exams
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ExamReview; 