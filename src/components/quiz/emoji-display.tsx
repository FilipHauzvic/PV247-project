import React from 'react';

interface EmojiDisplayProps {
  emojis: string[];
  emojisToShow: number;
}

export const EmojiDisplay: React.FC<EmojiDisplayProps> = ({
  emojis,
  emojisToShow
}) => {
  const emojiArray = Array.from(emojis);

  return (
    <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {emojiArray.slice(0, emojisToShow).map((emoji, index) => (
          <div
            key={index}
            className="text-6xl animate-bounce"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {emoji}
          </div>
        ))}
        {emojisToShow < emojiArray.length && (
          <div className="text-6xl text-gray-300">❓</div>
        )}
      </div>
    </div>
  );
};