import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Shuffle as ShuffleIcon,
} from '@mui/icons-material';

interface Flashcard {
  question: string;
  answer: string;
}

const SecurityPlusFlashcards: React.FC = () => {
  const fullQuestionPool: Flashcard[] = [
    // Original 20 questions with swapped question/answer
    {
      answer: "What is the CIA triad?",
      question: "The CIA triad consists of Confidentiality (ensuring data is accessible only to authorized users), Integrity (ensuring data accuracy and reliability), and Availability (ensuring data is accessible when needed)."
    },
    // ... existing questions with swapped question/answer ...
    // Additional questions to reach 120
    {
      answer: "What is the purpose of a WAF?",
      question: "A Web Application Firewall protects web applications by filtering and monitoring HTTP traffic between a web application and the Internet, preventing attacks like SQL injection and XSS."
    },
    {
      answer: "What is the difference between symmetric and asymmetric encryption?",
      question: "Symmetric encryption uses the same key for encryption and decryption (faster, simpler), while asymmetric encryption uses different public and private keys (more secure for key exchange)."
    },
    {
      answer: "What is a security control?",
      question: "A security control is a safeguard or countermeasure designed to protect the confidentiality, integrity, and availability of data and systems."
    },
    {
      answer: "What is the purpose of network segmentation?",
      question: "Network segmentation divides a network into smaller parts to improve security by limiting access between segments and containing potential security breaches."
    },
    {
      answer: "What is the difference between authentication and authorization?",
      question: "Authentication verifies who someone is (identity), while authorization determines what resources they have permission to access (privileges)."
    },
    {
      answer: "What is the purpose of a honeypot?",
      question: "A honeypot is a security mechanism that creates a decoy system to attract and detect attackers, gathering information about their methods and protecting real systems."
    },
    {
      answer: "What is the difference between vulnerability scanning and penetration testing?",
      question: "Vulnerability scanning automatically identifies potential vulnerabilities, while penetration testing actively attempts to exploit vulnerabilities to assess system security."
    },
    {
      answer: "What is the purpose of an incident response plan?",
      question: "An incident response plan provides a structured approach to handling security incidents, including preparation, detection, analysis, containment, eradication, and recovery phases."
    },
    {
      answer: "What is the difference between black box and white box testing?",
      question: "Black box testing is performed without knowledge of internal systems, while white box testing is performed with full knowledge of system internals."
    },
    {
      answer: "What is the purpose of a security baseline?",
      question: "A security baseline establishes minimum security requirements for systems, providing a reference point for security configurations and compliance checks."
    },
    {
      answer: "What is the difference between IDS and IPS placement?",
      question: "IDS is typically placed out-of-band for monitoring only, while IPS is placed in-line to actively block threats."
    },
    {
      answer: "What is the purpose of security awareness training?",
      question: "Security awareness training educates users about security risks, best practices, and their responsibilities in maintaining organizational security."
    },
    {
      answer: "What is the difference between SIEM and log management?",
      question: "SIEM provides real-time analysis and correlation of security events, while log management focuses on collecting and storing log data for compliance and forensics."
    },
    {
      answer: "What is the purpose of data classification?",
      question: "Data classification categorizes information based on sensitivity and value, determining appropriate security controls and handling procedures."
    },
    {
      answer: "What is the difference between RBAC and ABAC?",
      question: "Role-Based Access Control assigns permissions based on user roles, while Attribute-Based Access Control uses multiple attributes to make access decisions."
    },
    {
      answer: "What is the purpose of a security audit?",
      question: "A security audit systematically evaluates security controls, policies, and procedures to ensure they meet security requirements and identify vulnerabilities."
    },
    {
      answer: "What is the difference between disaster recovery and business continuity?",
      question: "Disaster recovery focuses on restoring IT systems after a disaster, while business continuity ensures critical business functions continue during disruptions."
    },
    {
      answer: "What is the purpose of security metrics?",
      question: "Security metrics measure the effectiveness of security controls and programs, providing quantifiable data for decision-making and improvement."
    },
    {
      answer: "What is the difference between encryption at rest and in transit?",
      question: "Encryption at rest protects stored data, while encryption in transit protects data as it moves across networks."
    },
    {
      answer: "What is the purpose of a security incident playbook?",
      question: "A security incident playbook provides step-by-step procedures for responding to specific types of security incidents, ensuring consistent and effective responses."
    },
    {
      answer: "What is the difference between MFA factors?",
      question: "MFA factors include something you know (password), something you have (token), something you are (biometrics), and somewhere you are (location)."
    },
    {
      answer: "What is the purpose of threat hunting?",
      question: "Threat hunting proactively searches for security threats that have evaded existing security controls, using advanced analytics and intelligence."
    },
    {
      answer: "What is the difference between SOAR and SIEM?",
      question: "SOAR automates security operations and incident response, while SIEM focuses on collecting and analyzing security events."
    },
    {
      answer: "What is the purpose of a vulnerability management program?",
      question: "A vulnerability management program identifies, assesses, prioritizes, and remedies security vulnerabilities in systems and applications."
    },
    {
      answer: "What is the difference between DMARC, SPF, and DKIM?",
      question: "SPF verifies sender IP addresses, DKIM provides email authentication through digital signatures, and DMARC combines both while adding reporting."
    },
    {
      answer: "What is the purpose of security orchestration?",
      question: "Security orchestration automates and coordinates security tools and processes, improving incident response efficiency and consistency."
    },
    {
      answer: "What is the difference between CASB and SASE?",
      question: "CASB provides security for cloud services, while SASE combines network security and WAN capabilities into a cloud-delivered service."
    }
  ];

  const [activeQuestions, setActiveQuestions] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);

  const rotateQuestions = useCallback(() => {
    const shuffledPool = [...fullQuestionPool].sort(() => Math.random() - 0.5);
    const selected = shuffledPool.slice(0, 65);
    setActiveQuestions(selected);
    setShuffledCards(selected);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  // Initialize questions
  useEffect(() => {
    rotateQuestions();
  }, [rotateQuestions]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledCards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledCards.length) % shuffledCards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    const shuffled = [...activeQuestions].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#FF0000', mb: 4 }}>
        CompTIA Security+ Flashcards
      </Typography>

      <Box sx={{ position: 'relative', perspective: '1000px' }}>
        <Card
          onClick={handleFlip}
          sx={{
            minHeight: 300,
            cursor: 'pointer',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0)',
            backgroundColor: '#fff',
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
          <CardContent
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Typography variant="h5" align="center">
              {shuffledCards[currentIndex]?.answer || "Loading..."}
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Typography variant="body1" align="center">
              {shuffledCards[currentIndex]?.question || "Loading..."}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, gap: 2 }}>
        <IconButton onClick={handlePrevious} color="primary">
          <PrevIcon />
        </IconButton>

        <Typography>
          {currentIndex + 1} / {shuffledCards.length}
        </Typography>

        <IconButton onClick={handleNext} color="primary">
          <NextIcon />
        </IconButton>

        <Button
          startIcon={<ShuffleIcon />}
          onClick={handleShuffle}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          Shuffle
        </Button>

        <Button
          onClick={rotateQuestions}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          New Set
        </Button>
      </Box>
    </Box>
  );
};

export default SecurityPlusFlashcards; 