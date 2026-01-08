
export type ClassLevel = '6' | '7' | '8';
export type Difficulty = 'below basic' | 'average' | 'advanced' | 'mixed';

export interface PeriodPlan {
  period: number;
  objective: string;
  activity: string;
  quickCheck: string;
  homework: string;
}

export interface LessonPlan {
  basicInfo: {
    class: string;
    subject: string;
    topic: string;
    difficulty: Difficulty;
    totalPeriods: number;
  };
  learningOutcomes: string[];
  tlm: string[];
  periods: PeriodPlan[];
  assessmentPlan: {
    ongoing: string[];
    summative: string;
  };
  teacherReflection: string[];
}

export interface FormData {
  class: ClassLevel;
  subject: string;
  topic: string;
  difficulty: Difficulty;
}
