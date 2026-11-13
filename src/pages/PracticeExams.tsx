import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { certifications } from '../data/certifications';
import { examQuestions } from '../data/examQuestions';

const exams = certifications.map((certification) => ({
  ...certification,
  duration: certification.examDurationMinutes,
  totalQuestions: Math.min(certification.practiceQuestionCount, examQuestions[certification.id].length),
  isFullLength: certification.officialQuestionCount !== null
    && certification.practiceQuestionCount === certification.officialQuestionCount,
}));

const PracticeExams: React.FC = () => {
  const navigate = useNavigate();
  const { certId } = useParams<{ certId?: string }>();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [filteredExams, setFilteredExams] = useState(exams);

  useEffect(() => {
    if (certId) {
      const filtered = exams.filter(exam => 
        exam.id === certId || 
        exam.name.toLowerCase().replace(/\s+/g, '-') === certId
      );
      setFilteredExams(filtered);
    } else {
      setFilteredExams(exams);
    }
  }, [certId]);

  const handleStartExam = (examId: string) => {
    setSelectedExam(examId);
    setShowStartDialog(true);
  };

  const handleConfirmStart = () => {
    if (selectedExam) {
      navigate(`/exam/${selectedExam}`);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Practice Exams
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Choose an exam to begin your practice session
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {filteredExams.map((exam) => (
          <Grid item xs={12} sm={6} md={3} key={exam.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${exam.color}`,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {exam.name}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {exam.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {exam.duration} minutes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions: {exam.totalQuestions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Session: {exam.isFullLength ? 'Full-length practice' : 'Custom practice session'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleStartExam(exam.id)}
                >
                  Start Exam
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showStartDialog} onClose={() => setShowStartDialog(false)}>
        <DialogTitle>Start Practice Exam</DialogTitle>
        <DialogContent>
          <Typography>
            Are you ready to begin the practice exam? You will have {exams.find(e => e.id === selectedExam)?.duration} minutes to complete it.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowStartDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmStart} color="primary" variant="contained">
            Start Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PracticeExams; 