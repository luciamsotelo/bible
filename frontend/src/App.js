import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
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
                <Route path="/bio" element={<BioPage />} /> {/* BioPage route */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
