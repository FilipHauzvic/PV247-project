"use client";

import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { isOnlyEmojis, splitEmojiString } from "@/src/utils/emoji";

type EmojiInputProps = Omit<TextFieldProps, "onChange" | "value"> & {
  value: string;
  onChange: (newValue: string) => void;
  maxEmojis: number;
};

const EmojiInput = ({
  value,
  onChange,
  maxEmojis,
  ...props
}: EmojiInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Only allow emoji characters
    if (!isOnlyEmojis(inputValue)) {
      return;
    }

    const graphemes = splitEmojiString(inputValue);

    // Enforce max emoji count
    if (graphemes.length > maxEmojis) {
      const truncated = graphemes.slice(0, maxEmojis).join("");
      onChange(truncated);
    } else {
      onChange(inputValue);
    }
  };

  const currentCount = splitEmojiString(value).length;

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      helperText={`${currentCount}/${maxEmojis} emojis`}
      error={currentCount > maxEmojis}
    />
  );
};

export default EmojiInput;
