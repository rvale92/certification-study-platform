import { certifications } from '../certifications';
import { awsSaaCheatSheet } from './awsSaa';
import type { CheatSheetModule, CheatSheetTrack } from './types';

export * from './types';

export const cheatSheetModules: Readonly<Record<string, CheatSheetModule>> = {
  'aws-saa': awsSaaCheatSheet,
};

export const cheatSheetTracks: CheatSheetTrack[] = certifications.map((certification) => {
  const id = certification.id === 'aws-saa-c03' ? 'aws-saa' : certification.id;
  return {
    id,
    certificationId: certification.id,
    title: certification.name,
    examCode: certification.examCode,
    status: Object.prototype.hasOwnProperty.call(cheatSheetModules, id) ? 'available' : 'coming-soon',
  };
});
