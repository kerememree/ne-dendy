import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { SurveyLabel } from '../types';
import { parseRow } from '../utils/csvHelpers';

interface UseSurveyDataReturn {
  allLabels: SurveyLabel[];
  loading: boolean;
  error: string | null;
}

export function useSurveyData(): UseSurveyDataReturn {
  const [allLabels, setAllLabels] = useState<SurveyLabel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.csv')
      .then((res) => {
        if (!res.ok) throw new Error(`CSV yüklenemedi: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const parsed = (results.data as any[])
              .map(parseRow)
              .filter((r): r is SurveyLabel => r !== null);
            setAllLabels(parsed);
            setLoading(false);
          },
          error: (err: Error) => {
            setError(`CSV parse hatası: ${err.message}`);
            setLoading(false);
          },
        });
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { allLabels, loading, error };
}
