import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Home from './components/Home';
import JNCIATopics from './components/JNCIATopics';
import CCNATopics from './components/CCNATopics';
import SecurityPlusTopics from './components/SecurityPlusTopics';
import JNCIAFlashcards from './components/JNCIAFlashcards';
import CCNAFlashcards from './components/CCNAFlashcards';
import SecurityPlusFlashcards from './components/SecurityPlusFlashcards';
import JNCIAQuiz from './components/JNCIAQuiz';
import CCNAQuiz from './components/CCNAQuiz';
import SecurityPlusQuiz from './components/SecurityPlusQuiz';

const NavigationMenu: React.FC<{ certification: string, color: string }> = ({ certification, color }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  const path = certification.toLowerCase();

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ color }}
      >
        {certification}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleNavigate(`/${path}/topics`)}>Study Topics</MenuItem>
        <MenuItem onClick={() => handleNavigate(`/${path}/flashcards`)}>Flashcards</MenuItem>
        <MenuItem onClick={() => handleNavigate(`/${path}/quiz`)}>Practice Quiz</MenuItem>
      </Menu>
    </>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Certification Study Guide
            </Typography>
            <NavigationMenu certification="JNCIA" color="#84B135" />
            <NavigationMenu certification="CCNA" color="#1BA0D7" />
            <NavigationMenu certification="Security+" color="#FF0000" />
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* JNCIA Routes */}
          <Route path="/jncia/topics" element={<JNCIATopics />} />
          <Route path="/jncia/flashcards" element={<JNCIAFlashcards />} />
          <Route path="/jncia/quiz" element={<JNCIAQuiz />} />
          
          {/* CCNA Routes */}
          <Route path="/ccna/topics" element={<CCNATopics />} />
          <Route path="/ccna/flashcards" element={<CCNAFlashcards />} />
          <Route path="/ccna/quiz" element={<CCNAQuiz />} />
          
          {/* Security+ Routes */}
          <Route path="/security/topics" element={<SecurityPlusTopics />} />
          <Route path="/security/flashcards" element={<SecurityPlusFlashcards />} />
          <Route path="/security/quiz" element={<SecurityPlusQuiz />} />
        </Routes>
      </Container>
    </Box>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
