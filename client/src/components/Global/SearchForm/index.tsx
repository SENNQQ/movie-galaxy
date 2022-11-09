import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import st from './searchform.module.scss';
import {closeSearch, setFromPage, toggleSearch} from "../../../store/search/slice";
import {useAppDispatch, useAppSelector} from "../../../store/hook";
import {useLocation, useNavigate} from "react-router-dom";

type FormInputs = {
    search: string,
    genre:string
}

const SearchForm = () => {

    const {register, handleSubmit} = useForm<FormInputs>();
    const {fromPage} = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (dataForm: FormInputs) => {
        console.log(dataForm)
        if (dataForm.search) {
            navigate('/search', {replace: true, state:
                    {query: dataForm.search, genre:dataForm.genre}})
        } else {
            dispatch(closeSearch());
            navigate(fromPage);
        }
    }

    const unFocus = () => {
        if (location.pathname !== '/search') {
            dispatch(closeSearch());
        }
    }

    const handleClose = () => {
        navigate(fromPage);
        dispatch(toggleSearch());
    }

    useEffect(() => {
        dispatch(setFromPage(location.pathname))
    }, [dispatch])

    return (
        <div className={st.search_form}>
            <form autoComplete={"off"}>
                <label className={st.visuallyhidden} htmlFor="search">Search</label>
                <div className={st.form_field}>
                    <input type="text"
                           id="search"
                           placeholder="Search for a movie, tv show..."
                           {...register("search")}
                    />
                    <div className={"headDropdown"} style={{flex: "1 1"}}>
                        <h4>Select genre:</h4>
                        <select className="infoVideo_dropdown"  {...register("genre")}>
                            <option value="-">All</option>
                            <option value="9648">Mystery</option>
                            <option value="12">Adventure</option>
                            <option value="28">Action</option>
                            <option value="14">Fantasy</option>
                            <option value="18">Drama</option>
                            <option value="36">History</option>
                        </select>
                    </div>
                    <span aria-label="Approve" onClick={handleSubmit(onSubmit)} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 45.701 45.7" >
                          <g>
                              <g>
		<path d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504    c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0    c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"/>
                              </g>
                          </g>
                      </svg>
                    </span>
                    <span aria-label="Close" onClick={() => handleClose()}>
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