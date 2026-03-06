import type { SurveyLabel, Action } from '../types';
import { ACTION_PRIORITY } from '../types';
import { InsightCard } from './InsightCard';

interface InsightListProps {
  labels: SurveyLabel[];
  selectedSentiment: string;
  selectedThemes: string[];
}

const ACTION_GROUP_LABELS: Record<Action, string> = {
  escalate: 'Eskalasyon',
  follow_up: 'Takip Et',
  watch: 'İzle',
  ignore: 'Yoksay',
};

const GROUP_HEADER_COLORS: Record<Action, string> = {
  escalate: 'text-red-400 border-red-800/40',
  follow_up: 'text-orange-400 border-orange-800/30',
  watch: 'text-yellow-400 border-yellow-800/30',
  ignore: 'text-dendy-muted border-dendy-border',
};

export function InsightList({ labels, selectedSentiment, selectedThemes }: InsightListProps) {
  // Apply filters
  let filtered = labels;

  if (selectedSentiment) {
    filtered = filtered.filter((l) => l.sentiment === selectedSentiment);
  }

  if (selectedThemes.length > 0) {
    filtered = filtered.filter((l) => selectedThemes.some((t) => l.themes.includes(t)));
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg className="w-12 h-12 text-dendy-border mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-dendy-text-secondary text-sm">Bu filtrelerle eşleşen içgörü bulunamadı.</p>
        <p className="text-dendy-muted text-xs mt-1">Filtreleri temizleyerek tüm içgörüleri görüntüleyin.</p>
      </div>
    );
  }

  const grouped = new Map<Action, SurveyLabel[]>();
  const actionOrder: Action[] = ['escalate', 'follow_up', 'watch', 'ignore'];

  for (const action of actionOrder) {
    const items = filtered
      .filter((l) => l.action === action)
      .sort((a, b) => b.severity - a.severity);
    if (items.length > 0) grouped.set(action, items);
  }

  return (
    <div className="space-y-6">
      {Array.from(grouped.entries()).map(([action, items]) => (
        <div key={action}>
          <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${GROUP_HEADER_COLORS[action]}`}>
            <span className="text-xs font-semibold uppercase tracking-wider">
              {ACTION_GROUP_LABELS[action]}
            </span>
            <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {items.map((label) => (
              <InsightCard key={label.label_id} label={label} />
            ))}
          </div>
        </div>
      ))}
      <div className="text-xs text-dendy-muted text-center pt-2">
        {filtered.length} içgörü gösteriliyor {labels.length !== filtered.length ? `(toplam ${labels.length})` : ''}
      </div>
    </div>
  );
}
void ACTION_PRIORITY;
