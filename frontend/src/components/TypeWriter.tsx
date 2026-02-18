import { useState, useEffect } from "react";

interface Props {
  words: string[];
  typingSpeed: number;
  deletingSpeed: number;
  delayBetweenWords: number;
}

export default function Typewriter({
  words = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
}: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  return (
    <span className="inline-flex items-center">
      {text}
      <span className="ml-1 h-6 w-0.5 bg-blue-600 animate-blink" />
    </span>
  );
}
