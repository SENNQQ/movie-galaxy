import React from 'react';
import st from './sidebar.module.scss';
import {Link} from "react-router-dom";


const Sidebar = () => {
    return (
        <aside>
            <nav className={st.navAside}>
                <ul className={st.noList}>
                    <li>
                        <Link to={"/profile"} aria-label="Home">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
                                <path d="M11.78,11.28A4.462,4.462,0,0,1,16,6.61a4.462,4.462,0,0,1,4.22,4.67A4.45912,4.45912,0,0,1,16,15.94,4.45912,4.45912,0,0,1,11.78,11.28ZM30.04,16a13.91894,13.91894,0,0,1-2.39,7.82,1.43134,1.43134,0,0,1-.14.2,14.01332,14.01332,0,0,1-23.02,0,1.43134,1.43134,0,0,1-.14-.2A14.03633,14.03633,0,1,1,30.04,16ZM3.46,16a12.51091,12.51091,0,0,0,1.57,6.09C7.2,19.24,11.36,17.46,16,17.46s8.8,1.78,10.97,4.63A12.543,12.543,0,1,0,3.46,16Z" data-name="Layer 6"/></svg>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"} aria-label="Home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 data-v-7b357a42="">
                                <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                   strokeMiterlimit="10" strokeLinejoin="round" data-v-7b357a42="">
                                    <path
                                        d="M8.5 23.2H1.3V9L12 .8 22.7 9v14.2h-7.2v-5c0-1.9-1.6-3.4-3.5-3.4s-3.5 1.5-3.5 3.4v5z"
                                        data-v-7b357a42="">
                                    </path>
                                </g>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/movie"} aria-label="Movies">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 data-v-7b357a42="">
                                <g fill="none" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10"
                                   strokeLinejoin="round" strokeLinecap="round" data-v-7b357a42="">
                                    <path d="M3.2 12.8h19.6v9.5c0 .5-.4.9-1 .9H4.1c-.5 0-1-.4-1-.9v-9.5"
                                          data-v-7b357a42=""></path>
                                    <path d="M3.3 13.1l-2-4.4c-.2-.5 0-1 .5-1.2L18 .8c.5-.2 1.1 0 1.3.5l1.8 4-17.5 7.3"
                                          data-v-7b357a42=""></path>
                                    <path d="M15 2.1l-.9 6M8 4.7l-1.2 6.6" data-v-7b357a42=""></path>
                                </g>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/tv"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 data-v-7b357a42="">
                                <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                   strokeMiterlimit="10" data-v-7b357a42="">
                                    <path
                                        d="M21.4 23H2.6c-.9 0-1.6-.7-1.6-1.6V8.9c0-.9.7-1.6 1.6-1.6h18.9c.8 0 1.5.7 1.5 1.6v12.6c0 .8-.7 1.5-1.6 1.5zM6.4 1L12 7M17.6 1L12 7"
                                        data-v-7b357a42=""></path>
                                </g>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 data-v-7b357a42="">
                                <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                   strokeMiterlimit="10" data-v-7b357a42="">
                                    <path d="M16.4 16.7l6.3 6.5" data-v-7b357a42=""></path>
                                    <ellipse cx="10.5" cy="9.8" rx="9.2" ry="9.1" data-v-7b357a42=""></ellipse>
                                </g>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;