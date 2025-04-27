import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { useGetBook } from "../repo/mainRepo";
import { useNavigate } from "react-router-dom";
import { RiVolumeMuteLine, RiVolumeUpLine } from "@remixicon/react";

export const Homepage = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [dataToPost, setDataToPost] = useState("");
  const [enable, setEnable] = useState(false);
  const [toggleMusic, setToggleMusic] = useState(false);

  const { data, isFetching } = useGetBook(dataToPost, enable);

  const audioRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      setDataToPost(searchQuery.trim());
      setEnable(true);
      console.log("this is the submit button ");
    }
  };
  useEffect(() => {
    // when the audio metadata is loaded, set volume to 30%
    const audioEl = audioRef.current;
    const onLoaded = () => {
      audioEl.volume = 0.05; // 30% volume
    };

    audioEl.addEventListener("loadedmetadata", onLoaded);
    return () => {
      audioEl.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  useEffect(() => {
    console.log("data", data);
    setEnable(false);
  }, [data]);

  return (
    <div
      className="app"
      style={{
        zIndex: 1000,
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url(../assets/CoffeeBackground.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="audioIcon">
        {!toggleMusic && (
          <RiVolumeMuteLine
            color="white"
            onClick={() => {
              audioRef.current?.play().catch((err) => {
                console.warn("Audio blocked:", err);
              });
              setToggleMusic(true);
            }}
          />
        )}
        {toggleMusic && (
          <RiVolumeUpLine
            color="white"
            onClick={() => {
              if (audioRef) {
                audioRef.current.pause();
                // audioRef.current.currentTime = 0; // rewind to start
              }
              setToggleMusic(false);
            }}
          />
        )}
      </div>
      <audio ref={audioRef} src="/audio/BackgroundMusic.mp3" loop />
      <header className="header">
        <h1
          className="logo"
          onClick={() => {
            navigate("/homepage");
          }}
        >
          Woodink
        </h1>
        <nav className="nav">
          <a href="#recommendations">Recommendations</a>
          {/* <a href="#contact">Contact</a> */}
          <a href="#about">About</a>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Find your next favorite book</h2>
          <p>Tell us what you love, and we'll find your next cozy read.</p>

          <div className="searchBox">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="What books do you love?"
                className="searchInput"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="searchButton"
                // onClick={}
              >
                Search
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Made with ❤️ for book lovers.</p>
      </footer>
    </div>
  );
};

export default Homepage;
