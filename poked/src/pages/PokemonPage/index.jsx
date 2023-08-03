import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";

const PokemonPage = () => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState([]);

  let { pokemonId } = useParams();

  const getPokemonsById = async (id) => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(baseUrl);
    const lists = await response.json();
    return lists;
  };

  useEffect(() => {
    getPokemonsById(pokemonId);
  }, []);

  const [evolutions, setEvolution] = useState([]);
  const [evolution2, setEvolution2] = useState([]);
  const [imageEvolutions, setImageEvolution] = useState([]);
  const [imgenEvolutions2, setImagenEveolution2] = useState([]);
  const [evolutions0, setEvolutions0] = useState([]);
  const [evolutionsName0, setEvolutionsName0] = useState([]);
  const fechPokemons = async (id) => {
    const response = await getPokemonsById(id);

    const responseSpecies = await fetch(response.species?.url);
    const responseJson = await responseSpecies.json();
    const responseEvolution = await fetch(responseJson.evolution_chain?.url);
    const responseChain = await responseEvolution.json();

    const Evo0 = responseChain.chain?.species.name;

    const Evo = responseChain.chain?.evolves_to[0]?.species.name;
    const evulutionChain =
      responseChain.chain?.evolves_to[0]?.evolves_to[0]?.species.name;

    setEvolutionsName0(Evo0);
    fechImgPokemons(Evo0, setEvolutions0);

    setEvolution(evulutionChain);
    fechImgPokemons(evulutionChain, setImageEvolution);
    setPokemon(response);

    setEvolution2(Evo);
    fechImgPokemons(Evo, setImagenEveolution2);
  };

  useEffect(() => {
    fechPokemons(pokemonId);
  }, [pokemonId]);

  const fechImgPokemons = async (id, setImage) => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(baseUrl);

    const lits = await response.json();
    const imageEvolution = lits.sprites.other.dream_world.front_default;

    setImage(imageEvolution);
  };

  const { name, types, height, weight } = pokemon;

  const volver = () => {
    navigate("/");
  };
  return (
    <div className="divgrande">
      <p className="nombre">
        Nombre <p> {name}</p>
      </p>

      <div className="div1">
        <h3 className="tipos">Tipos</h3>
        <ul>
          {types?.map((type) => (
            <li className="listatipo" key={type.type.name}>
              <span className="spantipo">{type.type.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <img
          className="pokebuscado"
          src={pokemon.sprites?.other?.dream_world.front_default}
          alt="nada"
        />
      </div>
      <div>
        <p className="datos">Altura: {height}m</p>
        <p className="datos">Peso: {weight}kg</p>
      </div>

      <button className="btnRegresar" onClick={volver}>
        Regresar
      </button>
      <div>
      <Link to={`/PokemonPage/${evolutionsName0}`}>
        <p className="evolucion">{evolutionsName0}</p>
        <img className="imgEvolucion" src={evolutions0} alt="" />
      </Link>
      <Link to={`/PokemonPage/${evolution2}`}>
        <p className="evolucion">{evolution2}</p>
        <img className="imgEvolucion" src={imgenEvolutions2} alt="" />
      </Link>
      <Link to={`/PokemonPage/${evolutions}`}>
        <p className="evolucion">{evolutions}</p>
        <img className="imgEvolucion" src={imageEvolutions} alt="" />
      </Link>
      </div>
    </div>
  );
};

export default PokemonPage;
