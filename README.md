# Certification Study Platform

**Live demo:** [rvale92.github.io/certification-study-platform](https://rvale92.github.io/certification-study-platform/)

A responsive React and TypeScript study app for IT and cloud certification practice. Review scenario-based questions, study answer-backed flashcards, and inspect results from completed practice sessions.

## Certification tracks

- **AWS Certified Solutions Architect – Associate (SAA-C03):** 65 questions / 130 minutes across the four official exam domains.
- **JNCIA-Junos (JN0-106):** 65-question / 90-minute practice exam.
- **Cisco CCNA (200-301):** 65-question custom practice session / 120 minutes. The official exam question count can vary.
- **CompTIA Security+ (SY0-701):** 39-question custom practice session / 90 minutes. The official exam allows up to 90 questions.
- **Microsoft Security Operations Analyst Associate (SC-200):** 9-question custom practice session / 100 minutes.

Practice scores are raw question-bank results; they do not represent official scaled exam scores or guarantee a passing result.

## Features

- Certification and domain filters for flashcard study.
- `Needs Review` / `Mastered` confidence tracking saved in `localStorage`, with a review-only queue.
- Keyboard controls: **Space** flips, **Left/Right** navigates, **1** marks Needs Review, and **2** marks Mastered.
- Timed full-length practice for AWS SAA-C03 and JNCIA-Junos, plus clearly labeled custom practice sessions for the other tracks.
- Completed attempt review with the actual answers, score, domain breakdown, and question explanations.
- GitHub Pages deep-link fallback that restores routes on refresh.

## Tech stack

- React 18 and TypeScript 4.9
- Material UI 5
- React Router 6
- Create React App (`react-scripts`)
- GitHub Pages deployment with `gh-pages`

## AI study tutor

Authenticated Supabase/DeepSeek tutor with 10 prompt requests per UTC day for regular accounts and unlimited daily access for the server-configured admin. The floating Tutor drawer supports sign-in, account creation, remaining quota, and graceful rate-limit handling. The API key stays in Edge Function secrets.

See [AI tutor setup, deployment, and verification](./docs/AI-TUTOR.md). Both the hosted backend and the updated GitHub Pages frontend are deployed. External tester email confirmation still requires custom SMTP.

## Local development

Requirements: Node.js and npm.

```bash
npm install
npm start
```

The development server opens at [http://localhost:3000](http://localhost:3000).

## Build and deploy

```bash
npm run build
npm run deploy
```

`npm run deploy` builds the app and publishes the `build/` directory to the `gh-pages` branch. The repository `homepage` is configured for the live GitHub Pages URL.

## Adding or editing study content

Question banks and certification parameters are maintained in [`src/data/examQuestions.ts`](./src/data/examQuestions.ts) and [`src/data/certifications.ts`](./src/data/certifications.ts). Add questions to the array for the matching certification ID; use stable, unique IDs such as `aws-saa-066`, `jncia-086`, `ccna-068`, `secplus-048`, or `sc200-012`.

Each question follows this shape:

```ts
{
  id: 'aws-saa-066',
  question: 'A scenario-based prompt with enough constraints to select one best answer.',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 'Option B',
  explanation: 'Why the correct answer satisfies the scenario.',
  domain: 'Design Secure Architectures',
  distractorExplanations: {
    'Option A': 'Why this option does not meet the stated requirement.',
    'Option C': 'Why this option does not meet the stated requirement.',
    'Option D': 'Why this option does not meet the stated requirement.',
  },
}
```

`domain` must match one of the domains declared for that certification in `certifications.ts`. Flashcards are generated from these questions, with the prompt on the front and the correct answer plus explanation on the back. Curated cards migrated from the earlier decks are kept in [`src/data/flashcards.ts`](./src/data/flashcards.ts); their schema is `{ id, question, answer, certification, domain }`.

Exam duration and practice-session length are configured per certification in `certifications.ts`. Mark a shorter drill as a custom practice session rather than describing it as a full certification exam.

## Progress storage

Flashcard confidence is stored under `certification-study:flashcard-confidence`. The latest completed attempt for each certification is stored under `certification-study:attempt:<certification-id>`. Data is local to the current browser.
