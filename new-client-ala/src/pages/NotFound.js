import React from "react";
import { Link } from "react-router-dom";
import notFoundCat from "../assets/not-found-cat.png";

export const NotFound = () => {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut nobis
        magnam ipsum dicta eligendi corporis et nihil enim temporibus veritatis,
        quibusdam quas quia, id, earum consequuntur at tempore expedita
        assumenda?
      </p>
      <img
        className="img-cat-not-found"
        src={notFoundCat}
        alt="not found page"
      />

      <p className="homepage-btn">
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </div>
  );
};
