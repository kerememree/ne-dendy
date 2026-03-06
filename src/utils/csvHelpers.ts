import type { SurveyLabel, Sentiment, Action, SurveySummaryStats } from '../types';

export function parseRow(row: any): SurveyLabel | null {
  if (!row.label_id || !row.survey_id) return null;

  let themes: string[] = [];
  try {
    const raw = row.themes || '[]';
    themes = JSON.parse(raw);
    if (!Array.isArray(themes)) themes = [];
  } catch {
    themes = [];
  }

  return {
    label_id: String(row.label_id),
    survey_id: String(row.survey_id),
    participant_id: String(row.participant_id ?? ''),
    sentiment: (row.sentiment as Sentiment) || 'neutral',
    score: parseFloat(row.score) || 0,
    severity: parseFloat(row.severity) || 0,
    action: (row.action as Action) || 'ignore',
    themes,
    display_label: String(row.display_label ?? ''),
    display_note: String(row.display_note ?? ''),
    should_display: row.should_display === 't' || row.should_display === true,
    risk_flag: row.risk_flag === 't' || row.risk_flag === true,
    evaluated_at: String(row.evaluated_at ?? ''),
  };
}

export function computeSummary(labels: SurveyLabel[]): SurveySummaryStats {
  const visible = labels.filter((l) => l.should_display);
  const participantSet = new Set(labels.map((l) => l.participant_id));

  const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
  const actionCounts = { ignore: 0, watch: 0, follow_up: 0, escalate: 0 };
  let totalScore = 0;
  let riskFlagCount = 0;

  for (const l of visible) {
    sentimentCounts[l.sentiment] = (sentimentCounts[l.sentiment] || 0) + 1;
    actionCounts[l.action] = (actionCounts[l.action] || 0) + 1;
    totalScore += l.score;
    if (l.risk_flag) riskFlagCount++;
  }

  return {
    surveyId: visible[0]?.survey_id ?? '',
    totalInsights: visible.length,
    totalParticipants: participantSet.size,
    avgScore: visible.length > 0 ? totalScore / visible.length : 0,
    riskFlagCount,
    sentimentCounts,
    actionCounts,
  };
}

export function getUniqueSurveyIds(labels: SurveyLabel[]): string[] {
  const ids = new Set(labels.filter((l) => l.should_display).map((l) => l.survey_id));
  return Array.from(ids).sort();
}

export function getUniqueThemes(labels: SurveyLabel[]): string[] {
  const themes = new Set<string>();
  for (const l of labels) {
    for (const t of l.themes) themes.add(t);
  }
  return Array.from(themes).sort();
}

export function formatThemeLabel(theme: string): string {
  return theme
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
