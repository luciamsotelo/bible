import React, { useEffect, useState } from 'react';
import Sing from '../components/sing';
import { Spinner, Container, Dropdown, ButtonGroup } from 'react-bootstrap';
import Header from '../components/header';

const songs = [
  { title: "Jesus Loves Me", file: '/lyrics/jesus-loves-me.json' },
  { title: "Amazing Grace", file: '/lyrics/amazing-grace.json' },
  { title: "Holy, Holy, Holy", file: '/lyrics/holy-holy-holy.json' },
  { title: "How Great Thou Art", file: '/lyrics/how-great-thou-art.json' },
  { title: "Rock of Ages", file: '/lyrics/rock-of-ages.json' },
  { title: "This Little Light of Mine", file: '/lyrics/this-little-light.json' },
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
        <h2
          style={{
            color: 'purple',
            fontFamily: 'quicksand',
            fontSize: '1.6rem',
            textShadow: '2px 2px 3px goldenrod',
            marginBottom: '1rem',
          }}
        >
          Choose a Song and Get Ready to Sing Along!
        </h2>

        {/* Dropdown Menu */}
        <Dropdown as={ButtonGroup} className="mb-5">
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            style={{
              backgroundColor: 'purple',
              border: 'none',
              fontFamily: 'quicksand',
              textShadow: '1px 1px 2px goldenrod',
              fontSize: '1.5rem',
            }}
          >
            {selectedTitle}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {songs.map((song, index) => (
              <Dropdown.Item
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
    </div>
  );
};

export default SingPage;
