import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./components/Layout";
import Movie from "./pages/Movie";
import Person from "./pages/Person";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main/>} />
          <Route path="/movie/:id" element={<Movie/>} />
          <Route path="/movie/" element={<Movie/>} />
          <Route path="/person/:id" element={<Person/>} />
        </Route>
      </Routes>
  );
};

export default App;
