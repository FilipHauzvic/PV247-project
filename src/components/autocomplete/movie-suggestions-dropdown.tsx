import { Paper, List, ListItem, ListItemButton, Typography } from "@mui/material";
import type { Movie } from "./use-movie-autocomplete";

interface MovieSuggestionsDropdownProps {
  suggestions: Movie[];
  open: boolean;
  highlightedIndex: number;
  onHighlight: (index: number) => void;
  onSelect: (movie: Movie) => void;
}

export const MovieSuggestionsDropdown = ({
  suggestions,
  open,
  highlightedIndex,
  onHighlight,
  onSelect,
}: MovieSuggestionsDropdownProps) => {
  if (!open || suggestions.length === 0) return null;

  return (
    <Paper
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        maxHeight: 200,
        overflowY: "auto",
        zIndex: 10,
      }}
      elevation={3}
    >
      <List>
        {suggestions.map((movie, idx) => (
          <ListItem key={movie.id} disablePadding>
            <ListItemButton
              selected={highlightedIndex === idx}
              onMouseDown={() => onSelect(movie)}
              onMouseEnter={() => onHighlight(idx)}
            >
              <Typography>
                {movie.title}
                {movie.release_date && ` (${movie.release_date.slice(0, 4)})`}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};