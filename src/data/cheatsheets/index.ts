import { certifications } from '../certifications';
import { awsSaaCheatSheet } from './awsSaa';
import { jnciaCheatSheet } from './jncia';
import { ccnaCheatSheet } from './ccna';
import { securityPlusCheatSheet } from './securityPlus';
import { sc200CheatSheet } from './sc200';
import type { CheatSheetModule, CheatSheetTrack } from './types';

export * from './types';

export const cheatSheetModules: Readonly<Record<string, CheatSheetModule>> = {
  'aws-saa': awsSaaCheatSheet,
  jncia: jnciaCheatSheet,
  ccna: ccnaCheatSheet,
  'security-plus': securityPlusCheatSheet,
  'sc-200': sc200CheatSheet,
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
