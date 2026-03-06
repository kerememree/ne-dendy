export type Sentiment = 'positive' | 'negative' | 'neutral';
export type Action = 'ignore' | 'watch' | 'follow_up' | 'escalate';

export interface SurveyLabel {
  label_id: string;
  survey_id: string;
  participant_id: string;
  sentiment: Sentiment;
  score: number;
  severity: number;
  action: Action;
  themes: string[];
  display_label: string;
  display_note: string;
  should_display: boolean;
  risk_flag: boolean;
  evaluated_at: string;
}

export interface SurveySummaryStats {
  surveyId: string;
  totalInsights: number;
  totalParticipants: number;
  avgScore: number;
  riskFlagCount: number;
  sentimentCounts: { positive: number; negative: number; neutral: number };
  actionCounts: { ignore: number; watch: number; follow_up: number; escalate: number };
}

export const ACTION_PRIORITY: Record<Action, number> = {
  escalate: 4,
  follow_up: 3,
  watch: 2,
  ignore: 1,
};

export const ALL_THEMES = [
  'communication',
  'process',
  'tools_systems',
  'team_dynamics',
  'role_clarity',
  'learning_development',
  'manager_behavior',
  'workload',
  'culture',
  'career_growth',
  'compensation',
  'recognition',
  'fairness',
  'work_life_balance',
] as const;
