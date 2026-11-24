import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { certifications } from '../data/certifications';
import { examQuestions, Question } from '../data/examQuestions';
import {
  WeakSpots as WeakSpotsState,
  WeakSpotEntry,
  loadWeakSpots,
  saveWeakSpots,
  recordMiss,
  recordCorrect,
  setFlagged,
  newSessionId,
  getActiveWeakSpots,
  filterWeakSpots,
  weakSpotKey,
} from '../data/weakSpots';

interface DrillItem {
  entry: WeakSpotEntry;
  question: Question;
}

const WeakSpots: React.FC = () => {
  const { certId } = useParams<{ certId?: string }>();
  const [weakSpots, setWeakSpots] = useState<WeakSpotsState>(loadWeakSpots);
  const [trackFilter, setTrackFilter] = useState<string>(
    certifications.some((c) => c.id === certId) ? (certId as string) : 'all',
  );
  const [deck, setDeck] = useState<DrillItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const persist = (next: WeakSpotsState) => {
    setWeakSpots(next);
    saveWeakSpots(next);
  };

  const validWeakSpots = useMemo(
    () => filterWeakSpots(weakSpots, (track, questionId) =>
      examQuestions[track]?.some((q) => q.id === questionId) ?? false),
    [weakSpots],
  );
  const allActive = useMemo(() => getActiveWeakSpots(validWeakSpots), [validWeakSpots]);

  const activeEntries = useMemo(
    () => (trackFilter === 'all' ? allActive : allActive.filter((entry) => entry.track === trackFilter)),
    [allActive, trackFilter],
  );

  const queue = useMemo<DrillItem[]>(
    () =>
      activeEntries
        .map((entry) => ({
          entry,
          question: examQuestions[entry.track].find((q) => q.id === entry.questionId),
        }))
        .filter((item): item is DrillItem => item.question !== undefined),
    [activeEntries],
  );

  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allActive.forEach((entry) => {
      counts[entry.track] = (counts[entry.track] || 0) + 1;
    });
    return counts;
  }, [allActive]);

  const startDrill = () => {
    setSessionId(newSessionId());
    setDeck(queue);
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setStats({ correct: 0, wrong: 0 });
  };

  const currentItem = deck && index < deck.length ? deck[index] : null;
  const currentEntry = currentItem
    ? weakSpots[weakSpotKey(currentItem.entry.track, currentItem.entry.questionId)]
    : undefined;
  const currentFlagged = currentEntry?.flagged ?? currentItem?.entry.flagged ?? false;

  const toggleFlag = () => {
    if (!currentItem) return;
    const next = setFlagged(
      weakSpots,
      currentItem.entry.track,
      currentItem.entry.questionId,
      !currentFlagged,
    );
    persist(next);
  };

  const checkAnswer = () => {
    if (!currentItem || !sessionId || selected === null) return;
    const isCorrect = selected === currentItem.question.correctAnswer;
    const next = isCorrect
      ? recordCorrect(weakSpots, currentItem.entry.track, currentItem.entry.questionId, sessionId)
      : recordMiss(weakSpots, currentItem.entry.track, currentItem.entry.questionId, sessionId);
    persist(next);
    setStats((current) => ({
      correct: current.correct + (isCorrect ? 1 : 0),
      wrong: current.wrong + (isCorrect ? 0 : 1),
    }));
    setChecked(true);
  };

  const nextQuestion = () => {
    setIndex((current) => current + 1);
    setSelected(null);
    setChecked(false);
  };

  const resetToQueue = () => {
    setDeck(null);
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setSessionId(null);
    setStats({ correct: 0, wrong: 0 });
  };

  // ---- Summary view (queue list, not yet drilling) ----
  if (deck === null) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4, mt: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Weak Spots
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
            Missed and flagged questions are collected here automatically. Answer a question
            correctly in two separate sessions to graduate it out of the queue.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="weak-spots-track-label">Certification</InputLabel>
              <Select
                labelId="weak-spots-track-label"
                value={trackFilter}
                label="Certification"
                onChange={(event) => setTrackFilter(event.target.value)}
              >
                <MenuItem value="all">All certifications</MenuItem>
                {certifications.map((certification) => (
                  <MenuItem key={certification.id} value={certification.id}>
                    {certification.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Queued questions</Typography>
                <Typography variant="h4">{activeEntries.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {Object.entries(trackCounts)
                    .map(([track, count]) => {
                      const cert = certifications.find((c) => c.id === track);
                      return `${cert?.examCode ?? track}: ${count}`;
                    })
                    .join(' · ') || 'Nothing queued yet'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={startDrill}
            disabled={queue.length === 0}
            sx={{ minWidth: 160, py: 1.5 }}
          >
            Start Weak Spots Drill
          </Button>
          <Button variant="outlined" component={RouterLink} to="/practice-exams" sx={{ minWidth: 160, py: 1.5 }}>
            Practice Exams
          </Button>
        </Box>

        {queue.length === 0 && (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
            {trackFilter !== 'all' && allActive.length > 0
              ? `No weak spots in this track yet — ${allActive.length} weak spot${allActive.length === 1 ? '' : 's'} across other tracks.`
              : 'No weak spots yet. Miss a question or flag one during a practice exam, and it will appear here.'}
          </Typography>
        )}
      </Container>
    );
  }

  // ---- Done view ----
  if (index >= deck.length) {
    const remaining = getActiveWeakSpots(weakSpots).length;
    return (
      <Container maxWidth="sm">
        <Card sx={{ mt: 6, p: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
              Drill complete
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary">Correct</Typography>
                    <Typography variant="h4" color="success.main">{stats.correct}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary">Missed</Typography>
                    <Typography variant="h4" color="error.main">{stats.wrong}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
              {remaining === 0
                ? 'All queued questions graduated. 🎉'
                : `${remaining} question${remaining === 1 ? '' : 's'} remain in the queue.`}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={resetToQueue} sx={{ minWidth: 140 }}>
                Back to Queue
              </Button>
              <Button variant="outlined" component={RouterLink} to="/practice-exams" sx={{ minWidth: 140 }}>
                Practice Exams
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // ---- Drill view ----
  const question = currentItem!.question;
  const isCorrect = checked && selected === question.correctAnswer;

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body1" color="text.secondary">
            Weak Spots · Question {index + 1} of {deck.length}
          </Typography>
          <Tooltip title={currentFlagged ? 'Unflag this question' : 'Flag this question'}>
            <IconButton onClick={toggleFlag} aria-label={currentFlagged ? 'Unflag question' : 'Flag question'}>
              {currentFlagged ? <FlagIcon color="warning" /> : <OutlinedFlagIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <LinearProgress
          variant="determinate"
          value={((index + 1) / deck.length) * 100}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Chip size="small" label={question.domain} color="primary" variant="outlined" />
          </Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {question.question}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup value={selected} onChange={(event) => setSelected(event.target.value)}>
              {question.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  disabled={checked}
                  control={<Radio />}
                  label={<Typography sx={{ py: 0.5 }}>{option}</Typography>}
                  sx={{
                    width: '100%',
                    mx: 0,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(37,99,235,0.05)' },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      {checked && (
        <Card sx={{ mb: 3, borderLeft: `4px solid ${isCorrect ? '#22c55e' : '#ef4444'}` }}>
          <CardContent>
            <Typography variant="subtitle1" color={isCorrect ? 'success.main' : 'error.main'} sx={{ fontWeight: 600 }}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </Typography>
            {!isCorrect && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Correct answer: <strong>{question.correctAnswer}</strong>
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" fontWeight={600}>Why this is right</Typography>
            <Typography variant="body2" color="text.secondary">{question.explanation}</Typography>
            {question.distractorExplanations && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {Object.values(question.distractorExplanations).map((reason) => `- ${reason}`).join(' ')}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="outlined" onClick={resetToQueue} sx={{ minWidth: 120 }}>
          Quit
        </Button>
        {!checked ? (
          <Button variant="contained" onClick={checkAnswer} disabled={selected === null} sx={{ minWidth: 160, py: 1.5 }}>
            Check Answer
          </Button>
        ) : (
          <Button variant="contained" onClick={nextQuestion} sx={{ minWidth: 160, py: 1.5 }}>
            {index + 1 >= deck.length ? 'Finish' : 'Next Question'}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default WeakSpots;
