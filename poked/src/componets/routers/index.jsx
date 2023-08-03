import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage/index";
import PokemonPage from "../../pages/PokemonPage/index";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route index element={<HomePage />} />
          <Route path="PokemonPage/:pokemonId" element={<PokemonPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
