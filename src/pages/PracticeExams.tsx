import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const exams = [
  {
    id: 'jncia',
    name: 'JNCIA 105',
    description: 'Juniper Networks Certified Associate - Junos',
    color: '#84B135',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
  {
    id: 'ccna',
    name: 'CCNA',
    description: 'Cisco Certified Network Associate',
    color: '#1BA0D7',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
  {
    id: 'security',
    name: 'CompTIA Security+',
    description: 'Security+ Certification',
    color: '#FF0000',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
  {
    id: 'sc205',
    name: 'Microsoft SC-205',
    description: 'Microsoft Security Operations Analyst',
    color: '#00A4EF',
    duration: 90,
    passingScore: 70,
    totalQuestions: 65,
  },
];

const PracticeExams: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(false);

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
        {exams.map((exam) => (
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
                  Passing Score: {exam.passingScore}%
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