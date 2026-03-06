import { useState, type ReactNode } from 'react';
import type { SurveyLabel, Action, Sentiment } from '../types';
import { formatThemeLabel } from '../utils/csvHelpers';

interface InsightCardProps {
  label: SurveyLabel;
}

const ACTION_CONFIG: Record<Action, { label: string; color: string; bgColor: string; borderColor: string; icon: ReactNode }> = {
  escalate: {
    label: 'Eskalasyon',
    color: 'text-red-300',
    bgColor: 'bg-red-950/40',
    borderColor: 'border-red-700/60',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  follow_up: {
    label: 'Takip Et',
    color: 'text-orange-300',
    bgColor: 'bg-orange-950/30',
    borderColor: 'border-orange-700/40',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  watch: {
    label: 'İzle',
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-950/20',
    borderColor: 'border-yellow-700/30',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  ignore: {
    label: 'Yoksay',
    color: 'text-dendy-muted',
    bgColor: 'bg-dendy-card',
    borderColor: 'border-dendy-border',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
};

const SENTIMENT_CONFIG: Record<Sentiment, { label: string; dotColor: string; textColor: string }> = {
  positive: { label: 'Olumlu', dotColor: 'bg-green-500', textColor: 'text-green-400' },
  negative: { label: 'Olumsuz', dotColor: 'bg-red-500', textColor: 'text-red-400' },
  neutral: { label: 'Nötr', dotColor: 'bg-yellow-500', textColor: 'text-yellow-400' },
};

function SeverityBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color =
    value >= 0.7 ? 'bg-red-500' : value >= 0.4 ? 'bg-orange-400' : value >= 0.2 ? 'bg-yellow-400' : 'bg-green-500';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-dendy-border rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-dendy-text-secondary w-8 text-right">{pct}%</span>
    </div>
  );
}

export function InsightCard({ label }: InsightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const actionCfg = ACTION_CONFIG[label.action];
  const sentimentCfg = SENTIMENT_CONFIG[label.sentiment];
  const isEscalate = label.action === 'escalate';

  return (
    <div
      className={`rounded-2xl border p-4 flex flex-col gap-3 transition-all duration-200 ${
        isEscalate
          ? `${actionCfg.bgColor} ${actionCfg.borderColor} shadow-lg shadow-red-950/20`
          : `bg-dendy-card ${actionCfg.borderColor}`
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {isEscalate && (
            <span className="mt-0.5 flex-shrink-0 text-red-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
          )}
          <h3 className={`text-sm font-semibold leading-snug ${isEscalate ? 'text-red-200' : 'text-dendy-text'}`}>
            {label.display_label || <span className="italic text-dendy-muted">Başlık yok</span>}
          </h3>
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${actionCfg.color} bg-black/20`}>
          {actionCfg.icon}
          <span>{actionCfg.label}</span>
        </div>
      </div>

      {/* Note */}
      {label.display_note && (
        <div className="text-xs text-dendy-text-secondary leading-relaxed">
          {expanded || label.display_note.length <= 120 ? (
            label.display_note
          ) : (
            <>
              {label.display_note.slice(0, 120)}…
              <button
                onClick={() => setExpanded(true)}
                className="ml-1 text-dendy-accent hover:underline"
              >
                devamı
              </button>
            </>
          )}
          {expanded && label.display_note.length > 120 && (
            <button
              onClick={() => setExpanded(false)}
              className="ml-1 text-dendy-accent hover:underline"
            >
              gizle
            </button>
          )}
        </div>
      )}

      {/* Severity */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-dendy-text-secondary">Ciddiyet</span>
        </div>
        <SeverityBar value={label.severity} />
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Sentiment */}
        <div className={`flex items-center gap-1.5 text-xs ${sentimentCfg.textColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sentimentCfg.dotColor}`} />
          {sentimentCfg.label}
          <span className="text-dendy-muted ml-1">({Math.round(label.score * 100)}%)</span>
        </div>

        {/* Risk flag */}
        {label.risk_flag && (
          <span className="flex items-center gap-1 text-xs text-red-400 bg-red-950/30 px-2 py-0.5 rounded-full border border-red-800/30">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 7l2.55 2.4A1 1 0 0116 11H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
            </svg>
            Risk
          </span>
        )}
      </div>

      {/* Themes */}
      {label.themes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-dendy-border/50">
          {label.themes.map((theme) => (
            <span
              key={theme}
              className="text-xs px-2 py-0.5 rounded-full bg-dendy-accent/10 text-dendy-accent border border-dendy-accent/20"
            >
              {formatThemeLabel(theme)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
