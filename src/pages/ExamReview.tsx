import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { certifications } from '../data/certifications';
import { loadExamAttempt } from '../data/examAttempt';

const ExamReview: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const certification = certifications.find((item) => item.id === examId);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  if (!certification) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1">Exam not found</Typography>
      </Container>
    );
  }

  const attempt = loadExamAttempt(certification.id);
  if (!attempt) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          No completed practice session
        </Typography>
        <Typography color="text.secondary">
          Complete a {certification.examCode} practice session to see its score, domain breakdown, and answer review here.
        </Typography>
      </Container>
    );
  }

  const selectedQuestion = attempt.questions.find((question) => question.id === selectedQuestionId);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {certification.name} Review
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Completed {new Date(attempt.completedAt).toLocaleString()} · Practice result, not an official scaled exam score.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { label: 'Practice score', value: `${attempt.scorePercent}%` },
            { label: 'Correct answers', value: `${attempt.correctAnswers}/${attempt.totalQuestions}` },
            { label: 'Time taken', value: `${Math.floor(attempt.timeTakenSeconds / 60)} min` },
          ].map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">{stat.label}</Typography>
                  <Typography variant="h4">{stat.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom>Domain breakdown</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Object.entries(attempt.domainBreakdown).map(([domain, result]) => (
            <Grid item xs={12} sm={6} md={4} key={domain}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">{domain}</Typography>
                  <Typography variant="h5">{result.correct}/{result.total}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom>Question review</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
              {attempt.questions.map((question, index) => {
                const isCorrect = question.userAnswer === question.correctAnswer;
                return (
                  <React.Fragment key={question.id}>
                    <ListItemButton
                      selected={selectedQuestionId === question.id || (selectedQuestionId === null && index === 0)}
                      onClick={() => setSelectedQuestionId(question.id)}
                      sx={{ alignItems: 'flex-start' }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                            <Typography fontWeight={600}>Question {index + 1}</Typography>
                            <Chip
                              size="small"
                              label={isCorrect ? 'Correct' : 'Review'}
                              color={isCorrect ? 'success' : 'error'}
                            />
                          </Box>
                        }
                        secondary={question.question}
                      />
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} md={7}>
            {selectedQuestion && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{selectedQuestion.question}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {selectedQuestion.domain}
                  </Typography>
                  {selectedQuestion.options.map((option) => {
                    const isCorrect = option === selectedQuestion.correctAnswer;
                    const isSelected = option === selectedQuestion.userAnswer;
                    return (
                      <Box key={option} sx={{ py: 1 }}>
                        <Typography fontWeight={isCorrect || isSelected ? 600 : 400}>
                          {isCorrect ? 'Correct answer: ' : isSelected ? 'Your answer: ' : ''}{option}
                        </Typography>
                        {!isCorrect && selectedQuestion.userAnswer !== option && (
                          <Typography variant="body2" color="text.secondary">
                            {selectedQuestion.distractorExplanations?.[option]
                              || `This option does not answer the prompt; the keyed answer is ${selectedQuestion.correctAnswer}.`}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                  {!selectedQuestion.userAnswer && (
                    <Typography color="error.main" sx={{ mt: 1 }}>This question was unanswered.</Typography>
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight={600}>Why this is right</Typography>
                  <Typography color="text.secondary">{selectedQuestion.explanation}</Typography>
                  {selectedQuestion.distractorExplanations && (
                    <>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
                        Why the other options are wrong
                      </Typography>
                      {Object.entries(selectedQuestion.distractorExplanations).map(([option, reason]) => (
                        <Typography key={option} variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          <strong>{option}:</strong> {reason}
                        </Typography>
                      ))}
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ExamReview;
