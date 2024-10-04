import React from 'react';
import '../styles/memory_verse.css';


// Define an array of memory verses
const memoryVerses = [
  "John 3:16 - For God so loved the world, that He gave His only Son...",
  "Psalm 23:1 - The Lord is my shepherd; I shall not want.",
  "Philippians 4:13 - I can do all things through Christ who strengthens me.",
  "Proverbs 3:5 - Trust in the Lord with all your heart and lean not on your own understanding.",
  "Ephesians 6:1 - Children, obey your parents in the Lord, for this is right.",
  "Colossians 3:20 - Children, obey your parents in everything, for this pleases the Lord.",
  "Matthew 5:16 - Let your light shine before others, that they may see your good deeds and glorify your Father in heaven."
];

// Get the current day of the year
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

const MemoryVerse = () => {
  // Calculate index based on the current day of the year
  const verseIndex = getDayOfYear() % memoryVerses.length;

  return (
    <div className="memory-verse-container">
      <h2>Today's Memory Verse</h2>
      <p>{memoryVerses[verseIndex]}</p>
    </div>
  );
};

export default MemoryVerse;
