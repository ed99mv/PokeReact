import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPokemon from "../CardP";
import "./styles.css";

const PokemonSearch = ({ setsearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      setError("");

      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        .then((response) => {
          setPokemonList(response.data);
          setIsLoading(false);
          setsearch(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setError("No se ha encontrado la búsqueda!");
          } else {
            setError("Algo salió mal. Por favor intenta más tarde.");
          }
          setPokemonList({});
          setIsLoading(false);
        });
    } else {
      setPokemonList({});
      setError("");
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form>
      <div className="divpoke">
        <img
          className="gifsquirlt"
          src="https://pa1.aminoapps.com/6270/1c9f9fe62eb54f768f1ac9494bc0a2cb1a92a5b0_hq.gif"
        />
        <img
          className="pokeimg"
          src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
          alt=""
        />
        <img
          className="gifsquirlt"
          src="https://thumbs.gfycat.com/UnderstatedFlashyHumpbackwhale-max-1mb.gif"
        />
      </div>
      <input
        className="inputP"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar Pokemon"
      />
      {isLoading && (
        <div class="container">
          <div class="cargando">
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <span class="texto-cargando">Cargando...</span>
          </div>
        </div>
      )}
      {error && <p className="loader">{error}</p>}
      {Object.keys(pokemonList).length > 0 && (
        <div>
          <CardPokemon
            id={pokemonList.id}
            name={pokemonList.name}
            img={pokemonList.sprites?.other?.dream_world.front_default}
          />
        </div>
      )}
      {pokemonList.length === 0 && !isLoading && !error && (
        <div class="container">
          <div class="cargando">
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <div class="pelotas"></div>
            <span class="texto-cargando">No se encontró la búsqueda</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default PokemonSearch;
