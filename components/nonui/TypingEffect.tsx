"use client";

import { useEffect, useState } from "react";

const words = [
  "code.",
  "create.",
  "build.",
  "innovate.",
  "develop.",
  "design.",
];

export default function TypingEffect() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        // Typing phase
        if (charIndex < currentWord.length) {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause at full word, then start deleting
          setTimeout(() => setIsDeleting(true), 1500); // 1.5s pause
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          setText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next word and reset
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 75 : 150; // Slower speeds: 150ms type, 75ms delete
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <h1 className="text-4xl font-bold text-blue-700 inline-block">
      I love to{" "}
      <span className="border-r-2 border-blue-700 animate-blink">{text}</span>
    </h1>
  );
}
