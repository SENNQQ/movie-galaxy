import React from 'react';
import st from "./commentItem.module.scss";
import userImg from "../../image/unnamed.png";

const CommentItem = () => {
    return (
        <div className={st.comments__item}>
            <div className={`${st.current_comment__img} ${st.user_img}`}>
                <img src={userImg} alt=""/>
            </div>
            <div className={st.comments__item__body}>
                <div className={st.comments__item_content}>
                    <div className={st.comments__item_header}>
                        <div className={st.comments__item_header__title}>
                            Pasha Technik
                        </div>
                    </div>
                    <div className={st.comments__item_text}>
                        I am writing this to strictly touch on my impression of the show.
                        First and foremost, it is very clear to me that almost all of the actors have
                        truly mastered their characters.
                    </div>
                </div>
                <div className={st.comments__item_action}>
                    <button className={st.like_btn} type="button">
                        <div className={st.like_btn__count}>0</div>
                        <div className={st.like_btn__img}>
                            <svg width="23" height="22"
                                 viewBox="0 0 19 18"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 8V16C5 16.2652 4.89464 16.5196 4.70711 16.7071C4.51957 16.8946 4.26522 17 4 17H2C1.73478 17 1.48043 16.8946 1.29289 16.7071C1.10536 16.5196 1 16.2652 1 16V9C1 8.73478 1.10536 8.48043 1.29289 8.29289C1.48043 8.10536 1.73478 8 2 8H5ZM5 8C6.06087 8 7.07828 7.57857 7.82843 6.82843C8.57857 6.07828 9 5.06087 9 4V3C9 2.46957 9.21071 1.96086 9.58579 1.58579C9.96086 1.21071 10.4696 1 11 1C11.5304 1 12.0391 1.21071 12.4142 1.58579C12.7893 1.96086 13 2.46957 13 3V8H16C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10L17 15C16.8562 15.6135 16.5834 16.1402 16.2227 16.501C15.8619 16.8617 15.4328 17.0368 15 17H8C7.20435 17 6.44129 16.6839 5.87868 16.1213C5.31607 15.5587 5 14.7956 5 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </button>
                    <span className={st.action_block__date}>
                                    <span>·</span>
                                    10 месяцев назад
                                </span>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;