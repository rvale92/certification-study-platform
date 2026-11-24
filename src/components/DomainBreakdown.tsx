import { Box, LinearProgress, Typography } from '@mui/material';
import type { DomainResult } from '../data/examAttempt';

interface DomainBar {
  domain: string;
  total: number;
  correct: number;
  percent: number;
}

interface DomainBreakdownProps {
  breakdown: Record<string, DomainResult>;
}

/**
 * Per-domain accuracy bars, sorted weakest-first so the weakest blueprint areas
 * stand out at the top of a results screen.
 */
const DomainBreakdown: React.FC<DomainBreakdownProps> = ({ breakdown }) => {
  const bars: DomainBar[] = Object.entries(breakdown)
    .filter(([, result]) => result.total > 0)
    .map(([domain, result]) => ({
      domain,
      total: result.total,
      correct: result.correct,
      percent: Math.round((result.correct / result.total) * 100),
    }))
    .sort(
      (a, b) =>
        a.percent - b.percent
        || b.total - a.total
        || a.domain.localeCompare(b.domain),
    );

  if (bars.length === 0) return null;

  return (
    <Box>
      {bars.map(({ domain, total, correct, percent }) => (
        <Box key={domain} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
            <Typography variant="body2" fontWeight={600}>
              {domain}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2 }}>
              {correct}/{total} · {percent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={percent}
            aria-label={`${domain}: ${correct} of ${total} correct (${percent}%)`}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default DomainBreakdown;
