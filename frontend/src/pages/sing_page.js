import React, { useEffect, useState } from 'react';
import Sing from '../components/sing';
import { Spinner, Container, Form } from 'react-bootstrap';
import Header from '../components/header'

const songs = [
  { title: "Jesus Loves Me", file: '/lyrics/jesus-loves-me.json' },
  { title: "Amazing Grace", file: '/lyrics/amazing-grace.json' },
  { title: "Holy, Holy, Holy", file: '/lyrics/holy-holy-holy.json' },
  { title: "How Great Thou Art", file: '/lyrics/how-great-thou-art.json' },
  { title: "Rock of Ages", file: '/lyrics/rock-of-ages.json' },
  { title: "This Little Light of Mine", file: '/lyrics/this-little-light.json' }
];

const SingPage = () => {
  const [songData, setSongData] = useState(null);
  const [selectedSong, setSelectedSong] = useState(songs[0].file);

  useEffect(() => {
    // Fetch the song data
    fetch(selectedSong)
      .then(response => response.json())
      .then(data => setSongData(data))
      .catch(error => console.error('Error loading song data:', error));
  }, [selectedSong]);

  const handleSongChange = (event) => {
    setSelectedSong(event.target.value);
  };

  return (
    <div>
      <Header />
      <Container className="sing-page">
        <Form className="mb-4">
          <Form.Group controlId="songSelect">
            <Form.Label>Select a Song:</Form.Label>
            <Form.Control as="select" onChange={handleSongChange}>
              {songs.map((song, index) => (
                <option key={index} value={song.file}>
                  {song.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>

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
