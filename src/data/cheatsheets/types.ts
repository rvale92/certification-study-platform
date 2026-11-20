export interface CheatSheetSource {
  id: string;
  label: string;
  url: string;
}

export interface CheatSheetComparison {
  option: string;
  pickWhen: string;
  watchOut: string;
}

export interface CheatSheetCard {
  id: string;
  title: string;
  summary: string;
  analogy?: string;
  bullets: string[];
  examTip?: string;
  tags: string[];
  sourceIds: string[];
  comparisons?: CheatSheetComparison[];
}

export interface CheatSheetDomain {
  id: string;
  title: string;
  weight?: number;
  summary: string;
  cards: CheatSheetCard[];
}

export interface CheatSheetModule {
  id: string;
  certificationId: string;
  title: string;
  examCode: string;
  description: string;
  lastReviewed: string;
  domains: CheatSheetDomain[];
  decisionCards: CheatSheetCard[];
  limits: CheatSheetCard[];
  strategies: CheatSheetCard[];
  sources: CheatSheetSource[];
}

export interface CheatSheetTrack {
  id: string;
  certificationId: string;
  title: string;
  examCode: string;
  status: 'available' | 'coming-soon';
}
