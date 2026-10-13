import type { CalendarInput, CivilDate, LunarDate } from '../calendar/types';

export type BirthInput = CalendarInput & {
  gender: 'male' | 'female';
  hour: number;
  minute: number;
  leapPolicy: 'split_at_15' | 'same_month';
  ziPolicy: 'civil_midnight' | 'next_day_at_23';
};

export interface ChartStar {
  name: string;
  brightness: string;
  transformation: string;
  group: 'major' | 'minor' | 'auxiliary';
}
export interface ChartPalace {
  name: string;
  branch: string;
  branchIndex: number;
  stem: string;
  isBodyPalace: boolean;
  stars: ChartStar[];
  decade: [number, number];
  lifeStage: string;
}
export interface ChartResult {
  solar: CivilDate;
  lunar: LunarDate;
  effectiveLunar: LunarDate;
  gender: 'male' | 'female';
  timeLabel: string;
  yearName: string;
  napAm: { name: string; element: string };
  soul: string;
  body: string;
  cuc: string;
  palaces: ChartPalace[];
  provenance: {
    engine: string;
    calendar: string;
    profile: string;
    leapPolicy: BirthInput['leapPolicy'];
    ziPolicy: BirthInput['ziPolicy'];
  };
  warnings: string[];
}
