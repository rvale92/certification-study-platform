import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { NavigateBefore as PrevIcon, NavigateNext as NextIcon } from '@mui/icons-material';
import { flashcards } from '../data/flashcards';
import { certifications as certificationData } from '../data/certifications';
import {
  FlashcardRating,
  FlashcardSrs,
  loadFlashcardSrs,
  orderBySrs,
  rateFlashcard,
  saveFlashcardSrs,
} from '../data/flashcardSrs';

const Flashcards: React.FC = () => {
  const [srs, setSrs] = useState<FlashcardSrs>(loadFlashcardSrs);
  const [deck, setDeck] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  useEffect(() => {
    saveFlashcardSrs(srs);
  }, [srs]);

  const certificationCards = selectedCertification === 'all'
    ? flashcards
    : flashcards.filter((card) => card.certification === selectedCertification);
  const availableDomains = [...new Set(certificationCards.map((card) => card.domain))].sort();
  const filteredCards = certificationCards.filter((card) =>
    selectedDomain === 'all' || card.domain === selectedDomain,
  );

  // Build the session deck (SRS-ordered) whenever the filter changes.
  useEffect(() => {
    setDeck(orderBySrs(filteredCards, srs).map((card) => card.id));
    setCurrentCard(0);
    setIsFlipped(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCertification, selectedDomain]);

  useEffect(() => {
    setCurrentCard((index) => Math.min(index, Math.max(deck.length - 1, 0)));
  }, [deck.length]);

  const activeCard = deck.length > 0 && currentCard < deck.length
    ? flashcards.find((card) => card.id === deck[currentCard])
    : undefined;

  const selectCertification = (value: string) => {
    setSelectedCertification(value);
    setSelectedDomain('all');
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const selectDomain = (value: string) => {
    setSelectedDomain(value);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentCard((index) => Math.min(index + 1, Math.max(deck.length - 1, 0)));
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentCard((index) => Math.max(index - 1, 0));
    setIsFlipped(false);
  };

  const rateCard = useCallback((rating: FlashcardRating) => {
    if (!activeCard || !isFlipped) return;
    setSrs((current) => ({ ...current, [activeCard.id]: rateFlashcard(rating) }));
    setDeck((currentDeck) => {
      if (rating === 'again') {
        // Last card rated "Again": keep it in the session for immediate re-test.
        if (currentCard >= currentDeck.length - 1) return currentDeck;
        const next = currentDeck.slice();
        const [card] = next.splice(currentCard, 1);
        next.push(card);
        return next;
      }
      return currentDeck.filter((_, index) => index !== currentCard);
    });
    setIsFlipped(false);
  }, [activeCard, currentCard, isFlipped]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (
        target.isContentEditable
        || target.closest(
          'button, a[href], input, select, textarea, [contenteditable="true"], [role="combobox"], [role="button"], [role="menu"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="listbox"], [role="option"], [role="tab"], [role="switch"], [role="checkbox"], [role="radio"], [role="slider"]',
        )
      )) return;
      if (event.code === 'Space') {
        event.preventDefault();
        setIsFlipped((flipped) => !flipped);
      } else if (event.key === 'ArrowLeft') {
        setCurrentCard((index) => Math.max(index - 1, 0));
        setIsFlipped(false);
      } else if (event.key === 'ArrowRight') {
        setCurrentCard((index) => Math.min(index + 1, Math.max(deck.length - 1, 0)));
        setIsFlipped(false);
      } else if (event.key === '1') {
        rateCard('again');
      } else if (event.key === '2') {
        rateCard('hard');
      } else if (event.key === '3') {
        rateCard('good');
      } else if (event.key === '4') {
        rateCard('easy');
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [activeCard, deck.length, rateCard]);

  const currentSrs = activeCard ? srs[activeCard.id] : undefined;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1, sm: 3 } }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 700,
          mb: 2,
          background: 'linear-gradient(135deg, #2563eb 0%, #db2777 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Flashcards
      </Typography>
      <Typography variant="body1" paragraph align="center" color="text.secondary">
        Due cards come first. Flip a card to reveal the answer, then rate it to schedule its next review.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="certification-filter-label">Certification</InputLabel>
            <Select
              labelId="certification-filter-label"
              value={selectedCertification}
              label="Certification"
              onChange={(event) => selectCertification(event.target.value)}
            >
              <MenuItem value="all">All certifications</MenuItem>
              {certificationData.map((certification) => (
                <MenuItem key={certification.id} value={certification.id}>{certification.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="domain-filter-label">Domain</InputLabel>
            <Select
              labelId="domain-filter-label"
              value={selectedDomain}
              label="Domain"
              onChange={(event) => selectDomain(event.target.value)}
            >
              <MenuItem value="all">All domains</MenuItem>
              {availableDomains.map((domain) => <MenuItem key={domain} value={domain}>{domain}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Shortcuts: Space flip · ←/→ navigate · 1 Again · 2 Hard · 3 Good · 4 Easy
        </Typography>
      </Box>

      {activeCard ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardActionArea
                aria-label={isFlipped ? 'Flashcard answer. Press Space to show the question.' : 'Flashcard question. Press Space to show the answer.'}
                onClick={() => setIsFlipped((flipped) => !flipped)}
                sx={{
                  minHeight: { xs: 240, sm: 300 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  p: { xs: 1, sm: 3 },
                  overflowWrap: 'anywhere',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(219,39,119,0.08) 100%)',
                }}
              >
                <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                  <Typography variant="overline">{activeCard.domain}</Typography>
                  <Typography variant="h5" component="div" sx={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere', my: 2 }}>
                    {isFlipped ? activeCard.answer : activeCard.question}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{isFlipped ? 'Answer and explanation' : 'Question · click or press Space to flip'}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Button variant="outlined" startIcon={<PrevIcon />} onClick={handlePrevious} disabled={currentCard === 0}>
                Previous
              </Button>
              <Button variant="outlined" endIcon={<NextIcon />} onClick={handleNext} disabled={currentCard >= deck.length - 1}>
                Next
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Button variant={currentSrs?.rating === 'again' ? 'contained' : 'outlined'} color="error" disabled={!isFlipped} onClick={() => rateCard('again')}>
                1 · Again
              </Button>
              <Button variant={currentSrs?.rating === 'hard' ? 'contained' : 'outlined'} color="warning" disabled={!isFlipped} onClick={() => rateCard('hard')}>
                2 · Hard
              </Button>
              <Button variant={currentSrs?.rating === 'good' ? 'contained' : 'outlined'} color="primary" disabled={!isFlipped} onClick={() => rateCard('good')}>
                3 · Good
              </Button>
              <Button variant={currentSrs?.rating === 'easy' ? 'contained' : 'outlined'} color="success" disabled={!isFlipped} onClick={() => rateCard('easy')}>
                4 · Easy
              </Button>
            </Box>
            {!isFlipped && (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Flip the card to reveal the answer, then rate it.
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              Card {currentCard + 1} of {deck.length} · {currentSrs ? (currentSrs.rating === 'again' ? 'Re-queued' : currentSrs.due <= Date.now() ? 'Due now' : `Due ${new Date(currentSrs.due).toLocaleDateString()}`) : 'New'}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ py: 6 }}>
          {filteredCards.length === 0
            ? 'No flashcards match these filters.'
            : 'No cards are due right now — come back later or switch filters.'}
        </Typography>
      )}
    </Box>
  );
};

export default Flashcards;
