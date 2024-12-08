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
import PuzzleDanielLion from './pages/puzzleDaniel_page';
import Hangman from './pages/hangman_page';
import WordJumble from './pages/wordJumblePage'
import WordSearch from './pages/wordSearchPage'
import Maze from './pages/mazePage';
import Trivia from './pages/triviaPage'
import JosephCoat from './pages/puzzleJosephAndCoat'
import MaryWithJesus from './pages/maryWithJesusPage'
import MosesPartSea from './pages/mosesPaartingSeaPage';


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
                <Route path="/games/wordJumble" element={<WordJumble />} />
                <Route path='/games/wordSearch' element={<WordSearch /> } />
                <Route path='/games/maze' element={<Maze /> } />
                <Route path='/games/trivia' element={<Trivia />} />
                <Route path='/puzzles/joseph-coat' element={<JosephCoat />} />
                <Route path='/puzzles/mary-jesus' element={< MaryWithJesus />} />
                <Route path='/puzzles/moses-sea' element={< MosesPartSea />} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
