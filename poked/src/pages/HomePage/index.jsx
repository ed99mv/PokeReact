import React, { useEffect, useState } from "react";
import CardPokemon from "../../componets/CardP";
import Paginacion from "./pagination";
import PokemonSearch from "../../componets/PokemonSearch";
import "./styles.css";

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [porPagina, setPorPagina] = useState(20);

  const lastIndex = pagina * porPagina;

  const [showSearch, setShowSearch] = useState(false);

  const getPokemons = async () => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${porPagina}&offset=${lastIndex}`;
    const response = await fetch(baseUrl);
    const listPokemons = await response.json();
    const data = listPokemons.results.map(async (pokemones) => {
      const response = await fetch(pokemones.url);
      const listPokemones = await response.json();
      return {
        name: listPokemones.name,
        img: listPokemones.sprites.other.dream_world.front_default,
        id: listPokemones.id,
      };
    });
    setPokemons(await Promise.all(data));
  };
  useEffect(() => {
    getPokemons();
  }, [pagina]);

  return (
    <div>
      <div className="search">
        <PokemonSearch setsearch={setShowSearch} />
      </div>
      {!showSearch ? (
        <div className="img-container">
          {pokemons.map((pokemones) => (
            <CardPokemon {...pokemones} key={pokemones.id} />
          ))}
          <Paginacion pagina={pagina} setPagina={setPagina} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomePage;
