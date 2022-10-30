import React, {useEffect, useState} from 'react';
import '../../style/reviews.scss'
import avatar from '../../image/img.png'
import axios from "../../axios";
import {CommentsGetData} from "../../types/CommentTypes";

const Reviews = () => {

    const [allComments, setAllComments] = useState<CommentsGetData[]>();

    useEffect(()=>{
        const data = async () => {
            return await axios.get('/api/comment/getAll')
        }
        data().then(resolve => {
            if (resolve.status !== 204) {
                setAllComments(resolve.data.data)
                console.log(resolve);
            } else {
                console.log(resolve.data.error)
            }
        })
    },[])

    return (

        <>
            <div className="reviews_unit">
                <div className="reviews_status_title">
                    <span className="text">Reviews</span>
                </div>
                <div className="reviews_wrapper">
                    <div className="reviews_block">
                        {allComments && allComments.map((item)=> (
                            <div className="reviews_block__item">
                                <div className="reviews_block__title">
                                    <div className="reviews_username">
                                        Username:
                                        <span> {item.nickname}</span>
                                    </div>
                                    <div className="reviews_left_comment">
                                        Left a comment for: <span> {item.nickname} </span>
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
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Reviews;