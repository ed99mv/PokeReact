import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const CardPokemon = ({ name, img, id }) => {
  return (
    <div>
      <Link to={`PokemonPage/${id}`} className="underline">
        <div className="img">
          <span>{name}</span>
          <img src={img} alt="nada" />
        </div>
      </Link>
    </div>
  );
};

export default CardPokemon;
