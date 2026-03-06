import { formatThemeLabel } from '../utils/csvHelpers';

interface ThemeFilterProps {
  themes: string[];
  selectedThemes: string[];
  onToggle: (theme: string) => void;
  onClear: () => void;
}

export function ThemeFilter({ themes, selectedThemes, onToggle, onClear }: ThemeFilterProps) {
  if (themes.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-dendy-text-secondary">Tema:</span>
      {themes.map((theme) => {
        const active = selectedThemes.includes(theme);
        return (
          <button
            key={theme}
            onClick={() => onToggle(theme)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
              active
                ? 'bg-dendy-accent text-white border-dendy-accent'
                : 'bg-transparent text-dendy-text-secondary border-dendy-border hover:border-dendy-accent hover:text-dendy-accent'
            }`}
          >
            {formatThemeLabel(theme)}
          </button>
        );
      })}
      {selectedThemes.length > 0 && (
        <button
          onClick={onClear}
          className="text-xs text-dendy-muted hover:text-dendy-text transition-colors underline"
        >
          Temizle
        </button>
      )}
    </div>
  );
}
