import React, {useEffect, useState} from 'react';
import '../../style/reviews.scss'
import axios from "../../axios";
import {CommentsGetData} from "../../types/CommentTypes";
import LoadableImage from "../../components/LoadableImage";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";

const Reviews = () => {

    const [allComments, setAllComments] = useState<CommentsGetData[]>([]);

    useEffect(() => {
        const data = async () => {
            return await axios.get('/api/comment/getAll')
        }
        data().then(resolve => {
            if (resolve.status !== 204) {
                setAllComments(resolve.data.data)
            } else {
                console.log(resolve.data.error)
            }
        })
    }, [])

    const userImage = (avatar: string): string => {
        if (avatar) {
            return `http://localhost:3100/${avatar}`
        } else {
            return ''
        }
    }

    const ApproveComment = (id: number) => {
        const data = async () => {
            return await axios.patch('/api/comment/updateApprove', {
                comments_id: id
            })
        }
        data().then(resolve => {
            if (resolve.data.success) {
                toast.success('Comment approved!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                const filteredData = allComments.filter((item) => item.comments_id !== id)
                setAllComments(filteredData)
            } else {
                console.log(resolve.data.error)
            }
        })
    }

    return (
        <>
            <div className="reviews_unit">
                <div className="reviews_status_title">
                    <span className="text">Reviews</span>
                </div>
                <div className="reviews_wrapper">
                    <div className="reviews_block">
                        {allComments.length !== 0 ? allComments.map((item) => (
                                <div className="reviews_block__item"
                                     key={`reviews_${item.clients_id}-${item.content_name}-${item.content_id}_${item.comments_id}`}>
                                    <div className="reviews_block__title">
                                        <div className="reviews_username">
                                            Username:
                                            <span> {item.nickname}</span>
                                        </div>
                                        <div className="reviews_left_comment">
                                            Left a comment for:
                                            <span>
                                                <Link to={item.content_type === 'tv'
                                            ? `/tv/${item.content_id}`
                                            : `/movie/${item.content_id}`} className="data_load_image">
                                                    {item.content_name}
                                                </Link>
                                        </span>
                                        </div>
                                    </div>
                                    <div className="reviews_block__main">
                                        <div className="reviews_block__image_user">
                                            <LoadableImage src={userImage(item.avatar)} alt=""/>
                                        </div>
                                        <div className="reviews_block__content">
                                            <div className="reviews_block__textarea">
                                            <textarea value={item.comment}
                                                      placeholder="comment..."
                                                      disabled={true}
                                                      spellCheck="false">
                                             </textarea>
                                            </div>
                                            <div className="reviews_block__approve">
                                                <button className="button-40"
                                                        onClick={() => ApproveComment(item.comments_id)}>
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))
                            :
                            <h1 className="reviews_no_check">There are no comments to check.</h1>
                        }

                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>

    );
};

export default Reviews;