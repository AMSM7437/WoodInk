import React, { useState, useEffect } from "react";
import "../App.css";
import { useGetBook } from "../repo/mainRepo";

export const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataToPost, setDataToPost] = useState("");
  const [enable, setEnable] = useState(false);

  const { data, isFetching } = useGetBook(dataToPost, enable);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = () => {
    if (searchQuery !== "") {
      setDataToPost(searchQuery);
      setEnable(true);
      console.log("this is the submit button ");
    }
  };

  useEffect(() => {
    console.log("data", data);
    setEnable(false);
  }, [data]);

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Woodink</h1>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#recommendations">Recommendations</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Find your next favorite book</h2>
          <p>Tell us what you love, and we'll find your next cozy read.</p>

          <div className="searchBox">
            <input
              type="text"
              placeholder="What books do you love?"
              className="searchInput"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="searchButton"
              onClick={handleSubmit}
            >
              Search
            </button>
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
