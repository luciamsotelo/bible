import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home_page';
import Stories from './pages/story_page';
import Games from './pages/game_page';
import SingAlong from './pages/sing_page';
import PrintableCrafts from './pages/craft_page';
import PrayerBoard from './pages/prayer_page';
import CharacterDressUp from './pages/dressup_page';
import AdventureMap from './pages/AdventureMap_page';
import CreateStory from './pages/CreateStory_page';
import BioPage from './pages/bio_page'; 
import Puzzle from './pages/puzzle_page';
import PuzzleArk from './pages/puzzleArk_page';
import PuzzleDanielLion from './components/puzzle_daniellion'; 
import Hangman from './components/hangman';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/games" element={<Games />} />
                <Route path="/sing-along" element={<SingAlong />} />
                <Route path="/crafts" element={<PrintableCrafts />} />
                <Route path="/prayer-board" element={<PrayerBoard />} />
                <Route path="/dress-up" element={<CharacterDressUp />} />
                <Route path="/adventure-map" element={<AdventureMap />} />
                <Route path="/create-story" element={<CreateStory />} />
                <Route path="/bio" element={<BioPage />} />
                <Route path="/games/puzzle" element={<Puzzle />} />
                <Route path="/puzzles/noah-ark" element={<PuzzleArk />} />
                <Route path="/puzzles/daniel-lion" element={<PuzzleDanielLion />} /> 
                <Route path="/games/hangman" element={<Hangman />} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
