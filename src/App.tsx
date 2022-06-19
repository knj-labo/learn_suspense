import React from "react";
import useSWR from "swr";
import { fetchPokemons } from "./utils/fetch-pokemon";

import "./styles/reset.css";
import "./styles/globals.css";

const PokemonInfo = () => {
  fetchPokemons()
  return (
    <article className="rounded bg-white p-6 flex flex-col relative">
      <div className="flex justify-center w-full">
        <img src="" alt="" />
      </div>
    </article>
  );
};

const App = () => (
  <div className="flex flex-col justify-center items-center">
    <React.Suspense fallback={<div>Pokemon Loading...</div>}>
      <div className="min-h-screen flex justify-center items-center bg-blue-50">
        <PokemonInfo />
      </div>
    </React.Suspense>
  </div>
);

export default App;
