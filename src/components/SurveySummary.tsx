import { type ReactNode } from 'react';
import type { SurveySummaryStats } from '../types';

interface SurveySummaryProps {
  stats: SurveySummaryStats;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  highlight?: boolean;
}

function StatCard({ label, value, icon, highlight }: StatCardProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
        highlight
          ? 'bg-red-950/30 border-red-800/40'
          : 'bg-dendy-card border-dendy-border'
      }`}
    >
      <div className={`text-xl ${highlight ? 'text-red-400' : 'text-dendy-accent'}`}>{icon}</div>
      <div>
        <div className={`text-xl font-bold ${highlight ? 'text-red-300' : 'text-dendy-text'}`}>
          {value}
        </div>
        <div className="text-xs text-dendy-text-secondary">{label}</div>
      </div>
    </div>
  );
}

export function SurveySummary({ stats }: SurveySummaryProps) {
  const hasEscalate = stats.actionCounts.escalate > 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        label="Toplam İçgörü"
        value={stats.totalInsights}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
      <StatCard
        label="Katılımcı"
        value={stats.totalParticipants}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />
      <StatCard
        label="Ort. Skor"
        value={`${(stats.avgScore * 100).toFixed(0)}%`}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />
      <StatCard
        label="Risk Bayrağı"
        value={stats.riskFlagCount}
        highlight={stats.riskFlagCount > 0}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
      />
      {hasEscalate && (
        <div className="col-span-2 md:col-span-4 flex items-center gap-2 px-4 py-2 bg-red-950/20 border border-red-800/30 rounded-xl">
          <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-red-300">
            <span className="font-semibold">{stats.actionCounts.escalate} eskalasyon</span> gerektiren içgörü var — acil dikkat gerekiyor.
          </span>
        </div>
      )}
    </div>
  );
}
