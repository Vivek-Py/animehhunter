import React from "react";

const Genre = (props) => {
  const { setStatus } = props;
  return (
    <div>
      <button
        onClick={() => {
          setStatus("17");
        }}
      >
        {" "}
        Martial Arts
      </button>
      <button
        onClick={() => {
          setStatus("6");
        }}
      >
        {" "}
        Demon
      </button>
      <button
        onClick={() => {
          setStatus("22");
        }}
      >
        {" "}
        Romance
      </button>
      <button
        onClick={() => {
          setStatus("24");
        }}
      >
        {" "}
        Sci-Fi
      </button>
      <button
        onClick={() => {
          setStatus("11");
        }}
      >
        {" "}
        Game
      </button>
      <button
        onClick={() => {
          setStatus("27");
        }}
      >
        {" "}
        Shounen
      </button>
      <button
        onClick={() => {
          setStatus("41");
        }}
      >
        {" "}
        Thriller
      </button>
    </div>
  );
};

export default Genre;
