interface SurveyFilterProps {
  surveyIds: string[];
  selectedId: string | null;
  onChange: (id: string) => void;
}

export function SurveyFilter({ surveyIds, selectedId, onChange }: SurveyFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-dendy-text-secondary whitespace-nowrap">
        Anket Seç
      </label>
      <div className="relative">
        <select
          value={selectedId ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-dendy-card border border-dendy-border text-dendy-text text-sm rounded-lg
                     pl-3 pr-8 py-2 focus:outline-none focus:border-dendy-accent focus:ring-1 focus:ring-dendy-accent
                     cursor-pointer min-w-[200px] transition-colors"
        >
          <option value="" disabled>
            — Anket seçin —
          </option>
          {surveyIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg className="w-4 h-4 text-dendy-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
