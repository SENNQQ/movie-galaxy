import React from 'react';
import '../../style/reviews.scss'
import avatar from '../../image/img.png'

const Reviews = () => {


    return (

        <>
            <div className="reviews_unit">
                <div className="reviews_status_title">
                    <span className="text">Reviews</span>
                </div>
                <div className="reviews_wrapper">
                    <div className="reviews_block">
                        <div className="reviews_block__item">
                            <div className="reviews_block__title">
                                <div className="reviews_username">
                                    Username:
                                    <span> Sennqq</span>
                                </div>
                                <div className="reviews_left_comment">
                                    Left a comment for: <span> House Dragon </span>
                                </div>
                            </div>
                            <div className="reviews_block__main">
                                <div className="reviews_block__image_user">
                                    <img src={avatar} alt=""/>
                                </div>
                                <div className="reviews_block__comment">
                                    I am writing this to strictly touch on my impression of the show.
                                    First and foremost, it is very clear to me that almost all of the actors have
                                    truly mastered their characters.
                                </div>
                                <div className="reviews_block__approve">
                                    <button className="button-40">Approve</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Reviews;