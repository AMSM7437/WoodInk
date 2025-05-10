import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { useGetBook } from "../repo/mainRepo";
import { useNavigate } from "react-router-dom";
import { RiVolumeMuteLine, RiVolumeUpLine } from "@remixicon/react";
import BookGrid from "../components/bookGrid";

export const Homepage = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [dataToPost, setDataToPost] = useState("");
  const [enable, setEnable] = useState(false);
  const [toggleMusic, setToggleMusic] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 2, pageSize: 5 });

  const { data, isFetching } = useGetBook(dataToPost, pagination, enable);

  const audioRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      setDataToPost(searchQuery.trim());
      setEnable(true);
    }
  };

  useEffect(() => {
    // when the audio metadata is loaded, set volume to 30%
    const audioEl = audioRef.current;
    const onLoaded = () => {
      audioEl.volume = 1; // 30% volume
    };

    audioEl.addEventListener("loadedmetadata", onLoaded);
    return () => {
      audioEl.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  return (
    <div className="app">
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

        <div style={{ width: "80vw", minHeight: "40vh" }}>
          {isFetching && <p className="loading">Loading results...</p>}
          {data?.docs && !isFetching && <BookGrid data={data.docs} />}
        </div>
      </main>

      <footer className="footer">
        <p>Made with ❤️</p>
      </footer>
    </div>
  );
};

export default Homepage;
