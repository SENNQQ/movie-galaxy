import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./components/Layout";
import Movie from "./pages/Movie/Movie";
import Person from "./pages/Person/Person";
import TV from "./pages/TV/TV";
import GenreMovie from "./pages/Genre/GenreMovie";
import GenreTV from "./pages/Genre/GenreTV";
import CategoryMovie from "./pages/Movie/category";
import CategoryTV from "./pages/TV/category";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Main/>}/>

                <Route path="/movie/" element={<Movie/>}>
                    <Route path=":id" element={<Movie/>}/>
                </Route>
                <Route path="/tv/" element={<TV/>}>
                    <Route path=":id" element={<TV/>}/>
                </Route>

                <Route path="/genre/:id/tv" element={<GenreTV/>}/>
                <Route path="/genre/:id/movie" element={<GenreMovie/>}/>

                <Route path="/movie/category/:name" element={<CategoryMovie/>}/>
                <Route path="/tv/category/:name" element={<CategoryTV/>}/>

                <Route path="/person/:id" element={<Person/>}/>
            </Route>
        </Routes>
    );
};

export default App;
