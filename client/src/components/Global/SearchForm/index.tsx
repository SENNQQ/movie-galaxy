import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import st from './searchform.module.scss';
import {closeSearch, setFromPage, toggleSearch} from "../../../store/search/slice";
import {useAppDispatch, useAppSelector} from "../../../store/hook";
import {useLocation, useNavigate} from "react-router-dom";

type FormInputs  = {
    search:string
}

const SearchForm = () => {

    const {register, handleSubmit} = useForm<FormInputs>();
    const {fromPage} = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (dataForm:FormInputs) =>{
        if (dataForm.search) {
            navigate('/search',{replace:true, state:{query:dataForm.search}})
        }
        else {
            dispatch(closeSearch());
            navigate(fromPage);
        }
    }

    const unFocus = () =>{
        if (location.pathname !== '/search') {
            dispatch(closeSearch());
        }
    }

    const handleClose = () =>{
        navigate(fromPage);
        dispatch(toggleSearch());
    }
    
    useEffect(()=>{
        dispatch(setFromPage(location.pathname))
    }, [dispatch])

    return (
        <div className={st.search_form}>
            <form onChange={handleSubmit(onSubmit)}  autoComplete={"off"}>
                <label className={st.visuallyhidden} htmlFor="search">Search</label>
                <div className={st.form_field}>
                    <input type="text"
                           id="search"
                           placeholder="Search for a movie, tv show or person..."
                           {...register("search")}
                           onBlur={()=>unFocus()}/>
                    <span aria-label="Close" onClick={()=>handleClose()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                            <g fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.5">
                            <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"/>
                            </g>
                        </svg>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;