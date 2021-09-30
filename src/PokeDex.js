import React from "react";
import {useAxios} from "./hooks";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
  const format = (resp) => {
    return (
      {
        front: resp.data.sprites.front_default,
        back: resp.data.sprites.back_default,
        name: resp.data.name,
        // stats: resp.data.stats.map(stat => ({name: "hi", value: 10}))
        stats: resp.data.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat}))
      }
    )
  };
  const [pokemon, addPokemon, removePoke] = useAxios("poke_data", BASE_URL, format);

  // const [pokemon, setPokemon] = useState([]);
  // const addPokemon = async name => {
  //   const response = await axios.get(
  //     `https://pokeapi.co/api/v2/pokemon/${name}/`
  //   );
  //   setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
  // };

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} remove={removePoke} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
