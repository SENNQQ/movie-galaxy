import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./components/Layout";
import Movie from "./pages/Movie";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main/>} />
          <Route path="/movie/:id" element={<Movie/>} />
        </Route>
      </Routes>
  );
};

export default App;
