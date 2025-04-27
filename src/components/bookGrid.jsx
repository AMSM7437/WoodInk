import React from "react";
import "../App.css";

export const BookGrid = ({ data }) => {
  return (
    <div className="bookGrid">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((book) => (
          <div key={book.key} className="bookCard">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title} // asd as d
                className="bookCover"
              />
            ) : (
              <div className="noCover">No Cover</div>
            )}
            <h3 className="bookTitle">{book.title}</h3>
            <p className="bookAuthor">
              {book.author_name?.join(", ") || "Unknown Author"}
            </p>
            <p className="bookYear">{book.first_publish_year || "Year N/A"}</p>
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="viewButton"
            >
              View More
            </a>
          </div>
        ))
      ) : (
        <p>No books found. Try another search!</p>
      )}
    </div>
  );
};

export default BookGrid;
