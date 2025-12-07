"use client";

import React, { useEffect, useRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { isOnlyEmojis, splitEmojiString } from "@/src/utils/emoji";
import dynamic from "next/dynamic";
import { Categories, EmojiClickData } from "emoji-picker-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

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
  const latestValueRef = useRef(value);
  useEffect(() => {
	latestValueRef.current = value;
  }, [value]);

  const applyEmojiValue = (inputValue: string) => {
    if (!isOnlyEmojis(inputValue)) return;

    const graphemes = splitEmojiString(inputValue);

    if (graphemes.length > maxEmojis) {
      onChange(graphemes.slice(0, maxEmojis).join(""));
    } else {
      onChange(inputValue);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    applyEmojiValue(inputValue);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
	const newValue = latestValueRef.current + emojiData.emoji;
	applyEmojiValue(newValue);
  }

  const currentCount = splitEmojiString(value).length;

  return (
	<div className="w-full">
		<TextField
		{...props}
		value={value}
		onChange={handleChange}
		helperText={`${currentCount}/${maxEmojis} emojis`}
		error={currentCount > maxEmojis}
		/>
		<EmojiPicker emojiVersion="13.0" lazyLoadEmojis={true} width="100%" onEmojiClick={handleEmojiClick} categories={[
			{ category: Categories.SMILEYS_PEOPLE, name: "Smileys" },
			{ category: Categories.ANIMALS_NATURE, name: "Animals and nature" },
			{ category: Categories.FOOD_DRINK, name: "Food and drinks" },
			{ category: Categories.TRAVEL_PLACES, name: "Travel" },
			{ category: Categories.ACTIVITIES, name: "Activities" },
			{ category: Categories.OBJECTS, name: "Objects" },
			{ category: Categories.SYMBOLS, name: "Symbols" },
			{ category: Categories.FLAGS, name: "Flags" },
  		]}/>
	</div>
  );
};

export default EmojiInput;
