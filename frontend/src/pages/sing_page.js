import React, { useEffect, useState } from 'react';
import Sing from '../components/sing';
import { Spinner, Container, Dropdown, ButtonGroup } from 'react-bootstrap';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom'; // import useNavigate

const songs = [
  { title: "Jesus Loves Me", file: '/lyrics/jesus-loves-me.json' },
  { title: "Amazing Grace", file: '/lyrics/amazing-grace.json' },
  { title: "Holy, Holy, Holy", file: '/lyrics/holy-holy-holy.json' },
  { title: "How Great Thou Art", file: '/lyrics/how-great-thou-art.json' },
];

const SingPage = () => {
  const [songData, setSongData] = useState(null);
  const [selectedSong, setSelectedSong] = useState(songs[0].file);
  const [selectedTitle, setSelectedTitle] = useState(songs[0].title);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch the song data
    fetch(selectedSong)
      .then((response) => response.json())
      .then((data) => setSongData(data))
      .catch((error) => console.error('Error loading song data:', error));
  }, [selectedSong]);

  const handleSongChange = (song) => {
    setSelectedSong(song.file);
    setSelectedTitle(song.title);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="triviaContainer">
        <nav className="navbar">
          <button className="navButton" onClick={() => navigate('/')}>Home</button>
        </nav>
      </div>

      <Container className="sing-page text-center">
        <h1 className="sing-page-title my-1" style={{ color: "goldenrod", textShadow: "2px 2px 1px black", fontFamily: "Allura", fontSize: "2.5rem", fontWeight: "bold" }}>Sing and Praise</h1>
        <p className="text-center my-1" style={{ color: "black", fontFamily: "quicksand", fontSize: "1rem" }}>
          Select a song, press 'Play' to start, and follow the lyrics on the screen. Pause anytime. Enjoy singing and praising God! <br/> <i>“Sing and make music from your heart to the Lord.” – Ephesians 5:19</i>
        </p>

        {/* Dropdown Menu */}
        <Dropdown as={ButtonGroup} className="mt-1 mb-1">
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            style={{
              backgroundColor: 'purple',
              border: 'none',
              fontFamily: 'quicksand',
              textShadow: '1px 1px 1px goldenrod',
              fontSize: '1.5rem',
            }}
          >
            {selectedTitle}
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdown-menu'>
            {songs.map((song, index) => (
              <Dropdown.Item className='dropdown-item'
                key={index}
                onClick={() => handleSongChange(song)}
                active={selectedSong === song.file}
              >
                {song.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Song Display */}
        {songData ? (
          <Sing songData={songData} />
        ) : (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default SingPage;
