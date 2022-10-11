import React from 'react';
import userImg from '../../image/unnamed.png';
import st from './comments.module.scss'
import CommentItem from "../CommentItem";

const Comments = () => {


    return (
        <div className={"spacing"}>
            <div className={st.comments}>
                <div className={st.comments__head}>
                    <div className={st.comments__title}>
                        <strong>4 </strong>
                        comments
                    </div>
                    <div className="comments__filter">
                        <div className="headDropdown">
                            <div className={"headDropdown"}>

                                <select name="infoVideo_dropdown">
                                    <option value="all_comments">All comments</option>
                                    <option value="new_to_old">New to Old</option>
                                    <option value="popular">Popular</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={st.comments__body}>
                    <div className={st.current__comments}>
                        <div className={`${st.current_comment__img} ${st.user_img}`}>
                            <img src={userImg} alt=""/>
                        </div>
                        <form className={st.comment_form}>
                            <div className={st.comment_form__textarea__wrapper}>
                                <textarea className={st.comment_form__textarea} name="comment"
                                          placeholder="Write a comment..."
                                          spellCheck="false"></textarea>
                            </div>
                            <div className={st.comment_form__button}>
                                <button className={st.comment_form__send}>
                                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 9C18 8.5628 17.7819 8.16395 17.4168 7.93313C17.4151 7.93207 17.4135 7.93101 17.4118 7.92997L5.26689 0.437164C4.10101 -0.282148 2.61326 -0.0997352 1.64897 0.880748L0.361272 2.19006C-0.10787 2.66707 -0.1201 3.43546 0.324629 3.92768L3.37003 8.2946C3.43439 8.38688 3.53873 8.44171 3.64997 8.44171L12.3003 8.44168C12.6036 8.4417 12.8494 8.69165 12.8494 9C12.8494 9.30834 12.6036 9.55829 12.3003 9.55831L3.64997 9.55834C3.53873 9.55834 3.43439 9.61316 3.37003 9.70544L0.324605 14.0723C-0.120101 14.5645 -0.10787 15.3329 0.361271 15.8099L1.64897 17.1192C2.61326 18.0997 4.10101 18.2821 5.26686 17.5629L17.4117 10.07C17.4134 10.069 17.4151 10.0679 17.4168 10.0668C17.782 9.83604 18 9.43721 18 9Z"></path>
                                    </svg>
                                </button>
                            </div>

                        </form>
                    </div>
                    <CommentItem/>
                </div>
            </div>
        </div>
    );
};

export default Comments;