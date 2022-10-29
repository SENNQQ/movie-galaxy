import React, {FC, useEffect, useState} from 'react';
import st from './comments.module.scss'
import CommentItem from "../CommentItem";
import {useForm} from "react-hook-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../axios";
import {CommentsGetData, CommentsPropsType} from "./types";
import {useAppSelector} from "../../store/hook";
import LoadableImage from "../LoadableImage";

type commentFormType = {
    comment: string
}

const Comments:FC<CommentsPropsType> = ({mt_id}) => {

    const {register, handleSubmit, formState: {errors}} = useForm<commentFormType>();
    const {userData} = useAppSelector(state => state.user);
    const [allContentComments, setAllContentComments] = useState<CommentsGetData[]>();

    const onSubmit = (dataForm: commentFormType) => {
        toast.info('Your comment has been sent for review!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        const data = async () => {
            return await axios.post('/api/comment/create/', {
                mt_id: mt_id,
                comment:dataForm.comment
            })
        }
        data().then(resolve => {
            if (resolve.status !== 204) {
                console.log(resolve);
            } else {
                console.log(resolve.data.error)
            }
        })
    };

    const userImage = (avatar:string):string =>{
        if(avatar){
            return `http://localhost:3100/${avatar}`
        }else {
            return  ''
        }
    }

    useEffect(()=>{
        const data = async () => {
            return await axios.get('/api/comment/getAll', {
                params: {
                    content_id: mt_id
                }
            })
        }
        data().then(resolve => {
            if (resolve.status !== 204) {
                setAllContentComments(resolve.data.data);
                console.log(resolve);
            } else {
                console.log(resolve.data.error)
            }
        })
    },[mt_id])


    return (
        <>
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
                                <LoadableImage src={userData ? userImage(userData.avatar) : ''} alt=""/>
                            </div>

                            <form className={st.comment_form}
                                  onSubmit={handleSubmit(onSubmit)}>
                                <div className={st.comment_form__textarea__wrapper}>
                                <textarea className={st.comment_form__textarea}
                                          placeholder="Write a comment..."
                                          spellCheck="false"
                                          {...register('comment', {
                                              required: true, minLength: {
                                                  value: 20,
                                                  message: "The minimum comment length is 20 characters."
                                              }
                                          })}>
                                </textarea>
                                </div>
                                <div className={st.comment_form__button}>
                                    <button className={st.comment_form__send}>
                                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18 9C18 8.5628 17.7819 8.16395 17.4168 7.93313C17.4151 7.93207 17.4135 7.93101 17.4118 7.92997L5.26689 0.437164C4.10101 -0.282148 2.61326 -0.0997352 1.64897 0.880748L0.361272 2.19006C-0.10787 2.66707 -0.1201 3.43546 0.324629 3.92768L3.37003 8.2946C3.43439 8.38688 3.53873 8.44171 3.64997 8.44171L12.3003 8.44168C12.6036 8.4417 12.8494 8.69165 12.8494 9C12.8494 9.30834 12.6036 9.55829 12.3003 9.55831L3.64997 9.55834C3.53873 9.55834 3.43439 9.61316 3.37003 9.70544L0.324605 14.0723C-0.120101 14.5645 -0.10787 15.3329 0.361271 15.8099L1.64897 17.1192C2.61326 18.0997 4.10101 18.2821 5.26686 17.5629L17.4117 10.07C17.4134 10.069 17.4151 10.0679 17.4168 10.0668C17.782 9.83604 18 9.43721 18 9Z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <div className="form_group errors comment_error">
                                {errors.comment && <div className="error">
                                    <span>Surname: </span><span>{errors.comment.message}</span>
                                </div>}
                            </div>
                        </div>
                        {allContentComments && allContentComments.map((item) => (
                            <CommentItem item={item}
                                         key={`comment-${item.content_id}-${item.clients_id}-${item.comments_id}`}/>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default Comments;