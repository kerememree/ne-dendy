import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { SurveySummaryStats } from '../types';

interface SentimentChartProps {
  stats: SurveySummaryStats;
}

const SENTIMENT_COLORS = {
  positive: '#22C55E',
  neutral: '#F59E0B',
  negative: '#EF4444',
};

const SENTIMENT_LABELS: Record<string, string> = {
  positive: 'Olumlu',
  neutral: 'Nötr',
  negative: 'Olumsuz',
};

export function SentimentChart({ stats }: SentimentChartProps) {
  const { sentimentCounts } = stats;
  const total = sentimentCounts.positive + sentimentCounts.neutral + sentimentCounts.negative;

  if (total === 0) return null;

  const data = [
    { name: 'positive', value: sentimentCounts.positive },
    { name: 'neutral', value: sentimentCounts.neutral },
    { name: 'negative', value: sentimentCounts.negative },
  ].filter((d) => d.value > 0);

  return (
    <div className="bg-dendy-card border border-dendy-border rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-dendy-text-secondary uppercase tracking-wider mb-4">
        Duygu Dağılımı
      </h3>
      <div className="flex items-center gap-6">
        <div className="w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={50}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#21263A',
                  border: '1px solid #2D3348',
                  borderRadius: '8px',
                  color: '#E5E7EB',
                  fontSize: '12px',
                }}
                formatter={(value: number, name: string) => [
                  `${value} (${Math.round((value / total) * 100)}%)`,
                  SENTIMENT_LABELS[name],
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {data.map((entry) => {
            const pct = Math.round((entry.value / total) * 100);
            return (
              <div key={entry.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS] }}
                    />
                    <span className="text-xs text-dendy-text-secondary">
                      {SENTIMENT_LABELS[entry.name]}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-dendy-text">
                    {entry.value} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 bg-dendy-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
