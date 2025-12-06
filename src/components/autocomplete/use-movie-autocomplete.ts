import { useState, useEffect, useRef } from "react";
import { searchMoviesTMDB } from "@/src/actions/quiz-actions";

export interface Movie {
  id: number;
  title: string;
  release_date?: string;
}

export const useMovieAutocomplete = (searchValue: string) => {
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const skipQueryRef = useRef(false);

  useEffect(() => {
    if (skipQueryRef.current) {
      skipQueryRef.current = false;
      return;
    }

    if (searchValue.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchMoviesTMDB(searchValue);
        setSuggestions(results);
        setOpen(true);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const handleSelect = (movie: Movie, callback: (title: string) => void) => {
    skipQueryRef.current = true;
    setSuggestions([]);
    setOpen(false);
    callback(movie.title);
  };

  const openSuggestions = () => {
    if (suggestions.length > 0) setOpen(true);
  };

  const closeSuggestions = () => {
    setTimeout(() => setOpen(false), 150);
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