import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Home from './pages/Home';
import PracticeExams from './pages/PracticeExams';
import Flashcards from './pages/Flashcards';
import StudyTopics from './pages/StudyTopics';
import ExamReview from './pages/ExamReview';
import Exam from './components/Exam';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/certification-study-platform">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice-exams" element={<PracticeExams />} />
            <Route path="/practice-exams/:certId" element={<PracticeExams />} />
            <Route path="/exam/:examId" element={<Exam />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/study-topics" element={<StudyTopics />} />
            <Route path="/exam-review/:examId" element={<ExamReview />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
