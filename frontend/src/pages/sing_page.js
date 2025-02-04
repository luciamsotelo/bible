import React, { useEffect, useState } from 'react';
import Sing from '../components/sing';
import { Spinner, Container, Dropdown, ButtonGroup } from 'react-bootstrap';
import Header from '../components/header';
import Footer from '../components/footer';

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
      <Header />
      <Container className="sing-page text-center">
        <h2 className="text-center my-4" style={{ color: "goldenrod", textShadow: "2px 2px 8px black", fontFamily: "allura", fontSize: "3rem", fontWeight: "bold", }}>
          Choose a Song and Get Ready to Sing Along!
        </h2>

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
              fontSize: '1.3rem',
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
