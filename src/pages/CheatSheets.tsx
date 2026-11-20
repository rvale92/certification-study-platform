import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Chip,
  Container, FormControl, Grid, InputAdornment, InputLabel, Link, MenuItem, Paper, Select, Stack, Tab, Tabs, TextField, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { cheatSheetModules, cheatSheetTracks } from '../data/cheatsheets';
import type { CheatSheetCard, CheatSheetDomain, CheatSheetModule } from '../data/cheatsheets';

function domainTitle(domain: CheatSheetDomain) {
  return domain.weight !== undefined ? `${domain.title} · ${domain.weight}%` : domain.title;
}

function TopicCard({ card, module, expanded, onToggle }: { card: CheatSheetCard; module: CheatSheetModule; expanded: boolean; onToggle: (expanded: boolean) => void }) {
  return <Accordion expanded={expanded} onChange={(_, value) => onToggle(value)} disableGutters sx={{ mb: 1.5, border: 1, borderColor: 'divider', borderRadius: '12px !important', '&:before': { display: 'none' } }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`card-${card.id}`} aria-controls={`details-${card.id}`}>
      <Box sx={{ minWidth: 0, py: 0.5 }}>
        <Typography component="h4" variant="subtitle1" fontWeight={700}>{card.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{card.summary}</Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails id={`details-${card.id}`} sx={{ overflowWrap: 'anywhere' }}>
      {card.analogy && <Alert severity="info" icon={false} sx={{ mb: 2 }}><strong>Think of it as:</strong> {card.analogy}</Alert>}
      {card.bullets.length > 0 && <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { mb: 1 } }}>
        {card.bullets.map((bullet) => <li key={bullet}><Typography variant="body2">{bullet}</Typography></li>)}
      </Box>}
      {card.comparisons && <Grid container spacing={1.5} sx={{ mt: 0 }}>
        {card.comparisons.map((comparison) => <Grid item xs={12} sm={6} key={comparison.option}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
            <Typography component="h5" variant="subtitle2" fontWeight={700}>{comparison.option}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}><strong>Pick when:</strong> {comparison.pickWhen}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}><strong>Watch out:</strong> {comparison.watchOut}</Typography>
          </Paper>
        </Grid>)}
      </Grid>}
      {card.examTip && <Box sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 1.5, my: 2 }}>
        <Typography variant="body2"><strong>Exam cue:</strong> {card.examTip}</Typography>
      </Box>}
      <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ my: 1.5 }}>
        {card.tags.map((tag) => <Chip size="small" label={tag} key={tag} variant="outlined" />)}
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={1.5} aria-label={`Sources for ${card.title}`}>
        {card.sourceIds.map((id) => module.sources.find((source) => source.id === id)).filter(Boolean).map((source) => source &&
          <Link key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" variant="caption">{source.label} ↗</Link>)}
      </Stack>
    </AccordionDetails>
  </Accordion>;
}

function CheatSheetReader({ module }: { module: CheatSheetModule }) {
  const [query, setQuery] = useState('');
  const [section, setSection] = useState('all');
  const [domainId, setDomainId] = useState('all');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (card: CheatSheetCard) => {
    const text = [card.title, card.summary, card.analogy, ...card.bullets, card.examTip, ...card.tags,
      ...(card.comparisons || []).flatMap((comparison) => [comparison.option, comparison.pickWhen, comparison.watchOut])].join(' ').toLowerCase();
    return terms.every((term) => text.includes(term));
  };
  const domains = section === 'all' || section === 'services'
    ? module.domains.filter((domain) => domainId === 'all' || domain.id === domainId).map((domain) => ({ ...domain, cards: domain.cards.filter(matches) })).filter((domain) => domain.cards.length)
    : [];
  const decisions = section === 'all' || section === 'decisions' ? module.decisionCards.filter(matches) : [];
  const limits = section === 'all' || section === 'numbers' ? module.limits.filter(matches) : [];
  const strategies = section === 'all' || section === 'strategy' ? module.strategies.filter(matches) : [];
  const visibleCards = [...domains.flatMap((domain) => domain.cards), ...decisions, ...limits, ...strategies];
  const count = visibleCards.length;
  const reset = () => { setQuery(''); setSection('all'); setDomainId('all'); setExpanded({}); };
  const cards = (items: CheatSheetCard[]) => items.map((card) => <TopicCard key={card.id} card={card} module={module}
    expanded={expanded[card.id] ?? terms.length > 0} onToggle={(value) => setExpanded((current) => ({ ...current, [card.id]: value }))} />);
  return <>
    <Box sx={{ mb: 3 }}>
      <Chip color="primary" size="small" label={module.examCode} sx={{ mb: 1 }} />
      <Typography component="h2" variant="h4" sx={{ fontSize: { xs: '1.6rem', sm: '2rem' }, fontWeight: 700 }}>{module.title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>{module.description}</Typography>
      <Typography variant="caption" color="text.secondary">Reviewed against official sources: {module.lastReviewed}. Study aid, not a guarantee of exam coverage.</Typography>
    </Box>
    <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <TextField fullWidth label="Search cheat sheet" value={query} placeholder="Try: private access, DAX, RPO, encryption…"
            onChange={(event) => { setQuery(event.target.value); setExpanded({}); }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl fullWidth disabled={section !== 'all' && section !== 'services'}>
            <InputLabel id="cheatsheet-domain-label">Domain</InputLabel>
            <Select labelId="cheatsheet-domain-label" value={domainId} label="Domain"
              onChange={(event) => { setDomainId(event.target.value); setSection('services'); setExpanded({}); }}>
              <MenuItem value="all">All domains</MenuItem>
              {module.domains.map((domain) => <MenuItem key={domain.id} value={domain.id} sx={{ whiteSpace: 'normal', maxWidth: '90vw' }}>{domainTitle(domain)}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Tabs value={section} onChange={(_, value) => { setSection(value); setDomainId('all'); setExpanded({}); }}
        variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label="Cheat sheet sections" sx={{ mt: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab value="all" label="All notes" /><Tab value="services" label="Core services" />
        <Tab value="decisions" label="Decision matrix" /><Tab value="numbers" label="Numbers & limits" /><Tab value="strategy" label="Exam strategy" />
      </Tabs>
      <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1} sx={{ mt: 1.5 }}>
        <Typography role="status" variant="body2" color="text.secondary" sx={{ mr: 'auto' }}>Showing {count} {count === 1 ? 'card' : 'cards'}</Typography>
        <Button size="small" disabled={!count} onClick={() => setExpanded(Object.fromEntries(visibleCards.map((card) => [card.id, true])))}>Expand all</Button>
        <Button size="small" disabled={!count} onClick={() => setExpanded(Object.fromEntries(visibleCards.map((card) => [card.id, false])))}>Collapse all</Button>
        {(query || section !== 'all' || domainId !== 'all') && <Button size="small" onClick={reset}>Reset filters</Button>}
      </Stack>
    </Paper>
    {count === 0 && <Alert severity="info" sx={{ mb: 3 }}>No cards match your filters.</Alert>}
    {domains.map((domain) => <Box component="section" key={domain.id} sx={{ mb: 4 }} aria-labelledby={`domain-${domain.id}`}>
      <Typography id={`domain-${domain.id}`} component="h3" variant="h5" sx={{ fontWeight: 700 }}>{domainTitle(domain)}</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.75, mb: 2 }}>{domain.summary}</Typography>
      {cards(domain.cards)}
    </Box>)}
    {decisions.length > 0 && <Box component="section" aria-labelledby="decision-heading" sx={{ mb: 4 }}>
      <Typography id="decision-heading" component="h3" variant="h5" fontWeight={700} sx={{ mb: 2 }}>Scenario decision matrix</Typography>
      {cards(decisions)}
    </Box>}
    {limits.length > 0 && <Box component="section" aria-labelledby="limits-heading" sx={{ mb: 4 }}>
      <Typography id="limits-heading" component="h3" variant="h5" fontWeight={700} sx={{ mb: 2 }}>Must-know numbers & limits</Typography>
      {cards(limits)}
    </Box>}
    {strategies.length > 0 && <Box component="section" aria-labelledby="strategy-heading" sx={{ mb: 4 }}>
      <Typography id="strategy-heading" component="h3" variant="h5" fontWeight={700} sx={{ mb: 2 }}>Exam strategy & pass tips</Typography>
      {cards(strategies)}
    </Box>}
    <Accordion sx={{ bgcolor: 'background.paper' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography component="h3" variant="h6">Official sources</Typography></AccordionSummary>
      <AccordionDetails><Box component="ul" sx={{ pl: 2.5 }}>{module.sources.map((source) => <li key={source.id}>
        <Link href={source.url} target="_blank" rel="noopener noreferrer" sx={{ overflowWrap: 'anywhere' }}>{source.label}</Link>
      </li>)}</Box></AccordionDetails>
    </Accordion>
  </>;
}

export default function CheatSheets() {
  const { trackId = 'aws-saa' } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const track = cheatSheetTracks.find((item) => item.id === trackId);
  const module = Object.prototype.hasOwnProperty.call(cheatSheetModules, trackId)
    ? cheatSheetModules[trackId]
    : undefined;
  return <Container maxWidth="lg" disableGutters sx={{ py: 1, overflowWrap: 'anywhere' }}>
    <Typography component="h1" variant="h3" sx={{ fontSize: { xs: '2rem', sm: '2.75rem' }, fontWeight: 800, mb: 1 }}>Cheat Sheets</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>Plain-English explanations, architecture trade-offs, and the numbers worth remembering.</Typography>
    <FormControl fullWidth sx={{ maxWidth: 520, mb: 3 }}>
      <InputLabel id="cheatsheet-track-label">Certification track</InputLabel>
      <Select labelId="cheatsheet-track-label" label="Certification track" value={track?.id || ''} onChange={(event) => navigate(`/cheatsheets/${event.target.value}`)}>
        {cheatSheetTracks.map((item) => <MenuItem value={item.id} key={item.id} sx={{ whiteSpace: 'normal', maxWidth: '90vw' }}>
          {item.title} ({item.examCode}){item.status === 'coming-soon' ? ' — Coming soon' : ''}
        </MenuItem>)}
      </Select>
    </FormControl>
    {module ? <CheatSheetReader key={module.id} module={module} /> : <Alert severity="info">
      <Typography component="h2" variant="h6">{track ? `${track.title}: coming soon` : 'Cheat sheet not found'}</Typography>
      <Typography sx={{ my: 1 }}>{track ? 'This track is planned. No incomplete notes are presented as a finished module.' : 'Choose a known certification track to continue.'}</Typography>
      <Button component={RouterLink} to="/cheatsheets/aws-saa">Open the AWS SAA-C03 cheat sheet</Button>
    </Alert>}
  </Container>;
}
