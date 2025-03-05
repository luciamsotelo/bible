import React, { useEffect, useState } from "react";
import Sing from "../components/sing";
import { Spinner, Container, Dropdown, ButtonGroup } from "react-bootstrap";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Sing.module.css"; // CSS Module

const songs = [
  { title: "Jesus Loves Me", file: "/lyrics/jesus-loves-me.json" },
  { title: "Amazing Grace", file: "/lyrics/amazing-grace.json" },
  { title: "Holy, Holy, Holy", file: "/lyrics/holy-holy-holy.json" },
  { title: "How Great Thou Art", file: "/lyrics/how-great-thou-art.json" },
];

const SingPage = () => {
  const [songData, setSongData] = useState(null);
  const [selectedSong, setSelectedSong] = useState(songs[0].file);
  const [selectedTitle, setSelectedTitle] = useState(songs[0].title);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(selectedSong)
      .then((response) => response.json())
      .then((data) => setSongData(data))
      .catch((error) => console.error("Error loading song data:", error));
  }, [selectedSong]);

  const handleSongChange = (song) => {
    setSelectedSong(song.file);
    setSelectedTitle(song.title);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className={styles.triviaContainer}>
        <nav className={styles.navbar}>
          <button className={styles.navButton} onClick={() => navigate("/")}>
            Home
          </button>
        </nav>
      </div>

      <Container className="text-center">
        <h1 className={styles.singTitle}>Sing and Praise</h1>
        <p className={styles.singDescription}>
          Select a song, press 'Play' to start, and follow the lyrics on the
          screen. Pause anytime. Enjoy singing and praising God!
        </p>

        {/* Dropdown Menu */}
        <Dropdown as={ButtonGroup} className="mt-1 mb-1">
          <Dropdown.Toggle variant="secondary" className={styles.dropdownToggle}>
            {selectedTitle}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {songs.map((song, index) => (
              <Dropdown.Item key={index} onClick={() => handleSongChange(song)}>
                {song.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Song Display */}
        {songData ? <Sing songData={songData} /> : <Spinner animation="border" />}
      </Container>
      <Footer />
    </div>
  );
};

export default SingPage;
