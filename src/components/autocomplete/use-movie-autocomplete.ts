import { useState, useEffect, useRef, useMemo } from "react";
import { searchMoviesTMDB } from "@/src/actions/quiz-actions";

export interface Movie {
  id: number;
  title: string;
  release_date?: string;
}

export const useMovieAutocomplete = (searchValue: string) => {
  const [rawSuggestions, setRawSuggestions] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [rawOpen, setRawOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const skipQueryRef = useRef(false);

  const shouldShowSuggestions = searchValue.length >= 2;
  
  const suggestions = useMemo(() => {
    return shouldShowSuggestions ? rawSuggestions : [];
  }, [shouldShowSuggestions, rawSuggestions]);

  const open = shouldShowSuggestions && rawOpen;

  useEffect(() => {
    if (skipQueryRef.current) {
      skipQueryRef.current = false;
      return;
    }

    if (!shouldShowSuggestions) {
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchMoviesTMDB(searchValue);
        setRawSuggestions(results);
        setRawOpen(true);
      } catch {
        setRawSuggestions([]);
        setRawOpen(false);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue, shouldShowSuggestions]);

  const handleSelect = (movie: Movie, callback: (title: string) => void) => {
    skipQueryRef.current = true;
    setRawSuggestions([]);
    setRawOpen(false);
    callback(movie.title);
  };

  const openSuggestions = () => {
    if (rawSuggestions.length > 0) setRawOpen(true);
  };

  const closeSuggestions = () => {
    setTimeout(() => setRawOpen(false), 150);
  };

  return {
    suggestions,
    loading,
    open,
    highlightedIndex,
    setHighlightedIndex,
    handleSelect,
    openSuggestions,
    closeSuggestions,
  };
};