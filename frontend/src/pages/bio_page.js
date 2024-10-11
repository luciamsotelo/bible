// src/pages/bio_page.js
import React from 'react';
import Header from '../components/header';
import Bio from '../components/bio';

const BioPage = () => {
    return (
        <div>
            <Header />
            <div className="bio-page">
                <h1 className="text-center my-4">Biblical Figures</h1>
                <Bio />
            </div>
            
        </div>
    );
};

export default BioPage;
