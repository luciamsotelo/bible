import React, { useEffect, useRef } from 'react';
import '../styles/memory_verse.css';


// Define an array of memory verses
const memoryVerses = [
  "John 3:16 - For God so loved the world, that He gave His only Son...",
  "Psalm 23:1 - The Lord is my shepherd; I shall not want.",
  "Philippians 4:13 - I can do all things through Christ who strengthens me.",
  "Proverbs 3:5 - Trust in the Lord with all your heart and lean not on your own understanding.",
  "Ephesians 6:1 - Children, obey your parents in the Lord, for this is right.",
  "Colossians 3:20 - Children, obey your parents in everything, for this pleases the Lord.",
  "Matthew 5:16 - Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
  "Psalm 119:105 - Your word is a lamp to my feet and a light to my path.",
  "Romans 8:28 - And we know that in all things God works for the good of those who love Him, who have been called according to His purpose.",
  "Isaiah 41:10 - So do not fear, for I am with you; do not be dismayed, for I am your God.",
  "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
  "1 John 4:19 - We love because He first loved us.",
  "Matthew 19:14 - Jesus said, 'Let the little children come to me, and do not hinder them, for to such belongs the kingdom of heaven.'",
  "Psalm 139:14 - I praise you because I am fearfully and wonderfully made.",
  "Proverbs 12:1 - Whoever loves discipline loves knowledge, but whoever hates correction is stupid.",
  "Romans 12:2 - Do not be conformed to this world, but be transformed by the renewal of your mind.",
  "Philippians 4:6 - Do not be anxious about anything, but in everything by prayer and petition, with thanksgiving, present your requests to God.",
  "Hebrews 13:8 - Jesus Christ is the same yesterday and today and forever.",
  "John 14:6 - Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
  "Matthew 7:7 - Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
  "Proverbs 4:23 - Above all else, guard your heart, for everything you do flows from it.",
  "Psalm 56:3 - When I am afraid, I put my trust in You.",
  "2 Timothy 1:7 - For God gave us a spirit not of fear but of power and love and self-control.",
  "Luke 6:31 - Do to others as you would have them do to you.",
  "Romans 15:13 - May the God of hope fill you with all joy and peace as you trust in Him.",
  "2 Corinthians 5:17 - Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
  "Joshua 1:9 - Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
  "Nehemiah 8:10 - Do not grieve, for the joy of the Lord is your strength.",
  "Galatians 5:22-23 - But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness, and self-control.",
  "Psalm 119:11 - I have hidden Your word in my heart that I might not sin against You.",
  "John 16:33 - I have told you these things, so that in Me you may have peace. In this world, you will have trouble. But take heart! I have overcome the world."
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
  const verseRef = useRef(null); // Initialize verseRef using useRef

  useEffect(() => {
    const element = verseRef.current;
    if (element) {
      const startAnimation = setTimeout(() => {
        element.classList.add('flash');
        const stopAnimation = setTimeout(() => {
          element.classList.remove('flash');
        }, 3000); // Duration of the flash animation
        return () => clearTimeout(stopAnimation);
      }, 1000); // Delay before animation starts
      return () => clearTimeout(startAnimation);
    }
  }, []);

  const verseIndex = getDayOfYear() % memoryVerses.length;

  return (
    <div className="memory-verse-container">
      <h2 className="" style= {{fontFamily: "allura", color: "black", textShadow: "2px 2px 8px goldenrod"}}>Today's Memory Verse</h2>
      <p className="memory-verse-container" style={{ fontFamily: "quicksand", color: "black", margin: "8px 20px"}} ref={verseRef}>{memoryVerses[verseIndex]}</p>
    </div>
  );
};

export default MemoryVerse;
