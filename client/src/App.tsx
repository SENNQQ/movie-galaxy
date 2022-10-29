import React, {useEffect} from 'react';
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
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog";
import Authorization from "./pages/Authorization";
import {useAppDispatch} from "./store/hook";
import {fetchAuth} from "./store/user/slice";
import PageNotFound from "./components/Global/PageNotFound";
import Reviews from "./pages/Reviews";
import RequireAuth from "./hoc/RequireAuth";


const App = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuth());
    }, [dispatch]);

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
                <Route path="/profile/" element={<Profile/>}/>
                <Route path="/catalog/:status" element={<Catalog/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path="/reviews" element={<Reviews/>}/>
                </Route>
            </Route>
            <Route path="/login" element={<Authorization/>}/>
            <Route path="/register" element={<Authorization/>}/>
            <Route path="*" element={<PageNotFound/>}/>

        </Routes>
    );
};

export default App;
