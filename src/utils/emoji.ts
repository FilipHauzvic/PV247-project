export const MAX_EMOJI_LENGTH = 10;

/**
 * Splits a string into an array of visual emoji characters (Graphemes).
 */
export const splitEmojiString = (str: string): string[] => {
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
  return Array.from(segmenter.segment(str), (s) => s.segment);
};

/**
 * Validates if a string contains ONLY emojis.
 * Returns true for empty strings.
 */
export const isOnlyEmojis = (str: string): boolean => {
  if (str === '') return true;
  // The 'u' flag is essential for Unicode support.
  const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation})+$/u;
  return emojiRegex.test(str);
};

/**
 * Validates a string for DB insertion.
 * Checks content and max length.
 */
export const validateEmojiString = (str: string, max: number) => {
  if (!isOnlyEmojis(str)) return { valid: false, error: 'Contains non-emoji characters' };
  
  const count = splitEmojiString(str).length;
  if (count > max) return { valid: false, error: `Exceeds maximum of ${max} emojis` };
  
  return { valid: true };
};
