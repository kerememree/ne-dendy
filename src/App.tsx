import { useState, useMemo } from 'react';
import { useSurveyData } from './hooks/useSurveyData';
import { SurveyFilter } from './components/SurveyFilter';
import { SurveySummary } from './components/SurveySummary';
import { SentimentChart } from './components/SentimentChart';
import { InsightList } from './components/InsightList';
import { ThemeFilter } from './components/ThemeFilter';
import { getUniqueSurveyIds, computeSummary, getUniqueThemes } from './utils/csvHelpers';
import type { Sentiment } from './types';

const SENTIMENT_OPTIONS: { value: Sentiment | ''; label: string }[] = [
  { value: '', label: 'Tümü' },
  { value: 'positive', label: 'Olumlu' },
  { value: 'negative', label: 'Olumsuz' },
  { value: 'neutral', label: 'Nötr' },
];

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-dendy-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-dendy-text-secondary text-sm">Veriler yükleniyor…</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-6 max-w-md text-center">
        <svg className="w-8 h-8 text-red-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-red-300 font-medium mb-1">Veri yüklenemedi</p>
        <p className="text-red-400/70 text-sm">{message}</p>
      </div>
    </div>
  );
}

export default function App() {
  const { allLabels, loading, error } = useSurveyData();
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | ''>('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const surveyIds = useMemo(() => getUniqueSurveyIds(allLabels), [allLabels]);

  // All labels for selected survey (all, including should_display=f for participant count)
  const surveyAllLabels = useMemo(
    () => (selectedSurveyId ? allLabels.filter((l) => l.survey_id === selectedSurveyId) : []),
    [allLabels, selectedSurveyId]
  );

  // Only displayable labels
  const displayLabels = useMemo(
    () => surveyAllLabels.filter((l) => l.should_display),
    [surveyAllLabels]
  );

  const stats = useMemo(
    () => (displayLabels.length > 0 ? computeSummary(surveyAllLabels) : null),
    [surveyAllLabels, displayLabels]
  );

  const availableThemes = useMemo(() => getUniqueThemes(displayLabels), [displayLabels]);

  function toggleTheme(theme: string) {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  }

  function handleSurveyChange(id: string) {
    setSelectedSurveyId(id);
    setSelectedSentiment('');
    setSelectedThemes([]);
  }

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <div className="min-h-screen bg-dendy-bg">
      {/* Top bar */}
      <header className="border-b border-dendy-border bg-dendy-surface/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-dendy-accent flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-dendy-text text-sm">Ne Dendy?</span>
              <span className="text-dendy-muted text-xs ml-2">Anket İçgörü Paneli</span>
            </div>
          </div>
          <SurveyFilter surveyIds={surveyIds} selectedId={selectedSurveyId} onChange={handleSurveyChange} />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* No survey selected */}
        {!selectedSurveyId && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-dendy-card border border-dendy-border flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-dendy-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-dendy-text font-semibold text-lg mb-2">Anket Seçin</h2>
            <p className="text-dendy-text-secondary text-sm max-w-sm">
              İçgörüleri görüntülemek için sağ üstteki dropdown menüden bir anket seçin.
              <br />
              <span className="text-dendy-muted">{surveyIds.length} anket mevcut.</span>
            </p>
          </div>
        )}

        {/* Survey loaded */}
        {selectedSurveyId && stats && (
          <>
            {/* Summary + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SurveySummary stats={stats} />
              </div>
              <div>
                <SentimentChart stats={stats} />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-dendy-surface border border-dendy-border rounded-xl px-4 py-3 flex flex-wrap gap-4 items-center">
              {/* Sentiment filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-dendy-text-secondary">Duygu:</span>
                <div className="flex gap-1">
                  {SENTIMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedSentiment(opt.value as Sentiment | '')}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        selectedSentiment === opt.value
                          ? 'bg-dendy-accent text-white border-dendy-accent'
                          : 'bg-transparent text-dendy-text-secondary border-dendy-border hover:border-dendy-accent hover:text-dendy-accent'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-dendy-border" />

              {/* Theme filter */}
              <ThemeFilter
                themes={availableThemes}
                selectedThemes={selectedThemes}
                onToggle={toggleTheme}
                onClear={() => setSelectedThemes([])}
              />
            </div>

            {/* Insight list */}
            <InsightList
              labels={displayLabels}
              selectedSentiment={selectedSentiment}
              selectedThemes={selectedThemes}
            />
          </>
        )}

        {/* Survey selected but no displayable data */}
        {selectedSurveyId && displayLabels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-dendy-text-secondary">Bu anket için gösterilecek içgörü yok.</p>
          </div>
        )}
      </main>
    </div>
  );
}
