import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./components/Layout";
import Movie from "./pages/Movie/Movie";
import Person from "./pages/Person/Person";
import TV from "./pages/TV/TV";
import GenreMovie from "./pages/Genre/GenreMovie";
import GenreTV from "./pages/Genre/GenreTV";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Main/>}/>
                <Route path="/movie/:id" element={<Movie/>}/>
                <Route path="/movie/" element={<Movie/>}/>
                <Route path="/tv/:id" element={<TV/>}/>
                <Route path="/tv/" element={<TV/>}/>
                <Route path="/genre/:id/tv" element={<GenreTV/>}/>
                <Route path="/genre/:id/movie" element={<GenreMovie/>}/>
                <Route path="/person/:id" element={<Person/>}/>
            </Route>
        </Routes>
    );
};

export default App;
