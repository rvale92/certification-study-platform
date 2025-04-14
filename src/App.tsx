import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Custom hook to handle GitHub Pages URL structure
const useGitHubPagesUrl = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/certification-study-platform/, '');
  return pathname || '/';
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/certification-study-platform">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/practice-exams" element={<Layout><PracticeExams /></Layout>} />
          <Route path="/practice-exams/:certId" element={<Layout><PracticeExams /></Layout>} />
          <Route path="/exam/:examId" element={<Layout><Exam /></Layout>} />
          <Route path="/flashcards" element={<Layout><Flashcards /></Layout>} />
          <Route path="/study-topics" element={<Layout><StudyTopics /></Layout>} />
          <Route path="/exam-review/:examId" element={<Layout><ExamReview /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
