import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import cn from "classnames";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import '../../style/profile.scss';
import tempImage from '../../image/zOGINv5sJxEZQWw2dGuO8JUzvyK.jpg';
import LoadableImage from "../../components/LoadableImage";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {setAvatar, updateUser} from "../../store/user/slice";
import axios from "../../axios";



type FormInputs = {
    surname: string;
    name: string;
    patronymic: string;
    nickname: string;
    phone: string;
    email: string;
    birthDate: string;
    sex: boolean;
}

type FormImage = {
    image: FileList
}

const Profile = () => {

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormInputs>();
    const {userData, load, error} = useAppSelector(state => state.user);
    const {catalogData} = useAppSelector(state => state.catalog)
    console.log(catalogData);
    const dispatch = useAppDispatch();
    

    const schema = yup.object().shape({
        image: yup
            .mixed()
            .test('fileSize', 'Размер файла не должен превышать 20МБ', (value) => {
                console.log(value)
                return value && value[0].size <= 20 * 1024 * 1024;
            })
            .test('type', 'Допустимые форматы: png, jpg', value => {
                return value && (value[0].type === "image/png" || value[0].type === "image/jpeg");
            }),
    });

    const imageForm = useForm<FormImage>({resolver: yupResolver(schema)});

    useEffect(() => {
        if (userData) {
            // console.log(userData)
            // const date =  new Date(userData.birthdate).toDateString();
            // console.log(date);
            userData.surname && setValue('surname', userData.surname, {shouldDirty: false})
            userData.name && setValue('name', userData.name, {shouldDirty: false})
            userData.patronymic && setValue('patronymic', userData.patronymic, {shouldDirty: false})
            setValue('sex', userData.sex, {shouldDirty: false})
            userData.birthdate && setValue('birthDate', userData.birthdate, {shouldDirty: false})
            userData.phone_number && setValue('phone', userData.phone_number, {shouldDirty: false})
            userData.nickname && setValue('nickname', userData.nickname, {shouldDirty: false})
            userData.email && setValue('email', userData.email, {shouldDirty: false})
        }
    }, [setValue, userData])

    const onSubmit = async (dataForm: FormInputs) => {
        dispatch(updateUser({...dataForm, id: userData!.clients_id}))
    }

    const onSubmitImage: SubmitHandler<FormImage> = async ({image}) => {
        try {
            const formData = new FormData();
            formData.append('avatar', image[0]);
            const {data} = await axios.post<{ success: boolean, message: string, url: string }>('/upload', formData);

            if (data.success) {
                await axios.patch('/api/auth/update', {avatar: data.url, id:userData!.clients_id});
                dispatch(setAvatar(data.url));
            }

        } catch (e) {
            return console.log('error');
        }
    };

    return (
        <div className={"spacing"}>
            <div className="profile_wrapper">
                <div className="profile">
                    <div className="profile_content">
                        <h2>Profile {userData?.nickname}</h2>
                        <div className="profile_left">
                            <div className="user">
                                <form action="" onChange={imageForm.handleSubmit(onSubmitImage)}>
                                    <div className="user_img">
                                        {userData?.avatar ?
                                            <div className="img_container">
                                                <img src={`http://localhost:3100/${userData?.avatar}`} alt="Profile"/>
                                            </div>
                                            :
                                            <>
                                                <label htmlFor="image">
                                                    <div className="add_picture">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px"
                                                             version="1.1"
                                                             id="Capa_1" x="0px" y="0px" viewBox="0 0 52 52"
                                                             className="plus_circle"
                                                             fill="#787878">
                                                            <path
                                                                d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2  s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2  S39.604,28,38.5,28z"/>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             version="1.1" id="Capa_1" x="0px" y="0px" width="48px"
                                                             height="48px"
                                                             fill="#787878"
                                                             viewBox="0 0 480.7 480.7" className="add_camera">
                                                            <g>
                                                                <g id="XMLID_1793_">
                                                                    <path id="XMLID_1959_"
                                                                          d="M240.4,202.3c-39.7,0-72.1,32.3-72.1,72.1c0,9.5,7.7,17.2,17.2,17.2s17.2-7.7,17.2-17.2    c0-20.7,16.9-37.6,37.6-37.6c9.5,0,17.2-7.7,17.2-17.2C257.6,210,249.9,202.3,240.4,202.3z"/>
                                                                    <path id="XMLID_1957_"
                                                                          d="M343.3,118.6l-5.2-22.4c-6.6-28.4-32-48.5-61.2-48.5h-73.2c-29.2,0-54.5,20.1-61.1,48.5l-5.2,22.4    C51.7,133.4,0,160.6,0,160.6v167.8C0,386.2,46.8,433,104.6,433h271.5c57.8,0,104.6-46.8,104.6-104.6V160.6    C480.7,160.6,429,133.4,343.3,118.6z M71.8,219c-10.3,0-18.7-8.4-18.7-18.7s8.4-18.7,18.7-18.7s18.7,8.4,18.7,18.7    C90.5,210.6,82.1,219,71.8,219z M240.4,389.8c-63.8,0-115.4-51.7-115.4-115.4c0-63.8,51.7-115.4,115.4-115.4    c63.8,0,115.4,51.7,115.4,115.4S304.1,389.8,240.4,389.8z"/>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        <br/>
                                                        <span className="text">Add Picture</span>
                                                    </div>
                                                </label>
                                                {/*<div className="form_block">*/}
                                                {/*    <button className="btn" type="submit">Save</button>*/}
                                                {/*</div>*/}
                                                <input accept="image/png, image/jpeg"
                                                       className="form-control"
                                                       type="file"
                                                       id="image"
                                                       hidden={true}
                                                       {...imageForm.register('image')}/>
                                            </>
                                        }
                                    </div>
                                </form>
                                <ul className="user_status">
                                    <li className="clearfix">
                                        <span className="user_status_title">Last Online</span>
                                        <span className="user_status_data online">Now</span>
                                    </li>
                                    <li className="clearfix">
                                        <span className="user_status_title">Joined</span>
                                        <span className="user_status_data">Aug 12, 2021</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="profile_right">
                            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                                <div className="info">
                                    <div className="form_block">
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.surname})}
                                                   placeholder="Surname"
                                                   {...register('surname', {
                                                       minLength: {
                                                           value: 6,
                                                           message: 'Мимальное количество символов - 6'
                                                       },
                                                       maxLength: {
                                                           value: 20,
                                                           message: 'Максимальное количество символов - 20',
                                                       },
                                                   })}
                                                   autoComplete="off" role={"presentation"}/>
                                        </div>
                                        <div className="form_group">
                                            <div className="input-block">
                                                <input className={cn('form_control', {'error': errors.name})}
                                                       type="text"
                                                       placeholder="Name"
                                                       {...register('name', {
                                                           minLength: {
                                                               value: 3,
                                                               message: 'Минимальное количество символов - 3'
                                                           },
                                                           maxLength: {
                                                               value: 16,
                                                               message: 'Максимальное количество символов - 16',
                                                           },
                                                       })} autoComplete="off" role={"presentation"}/>
                                            </div>
                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.patronymic})}
                                                   placeholder="Patronymic"
                                                   {...register('patronymic', {
                                                       minLength: {
                                                           value: 5,
                                                           message: 'Минимальное количество символов - 5'
                                                       },
                                                       maxLength: {
                                                           value: 16,
                                                           message: 'Максимальное количество символов - 16',
                                                       },
                                                   })} autoComplete="off" role={"presentation"}/>
                                        </div>
                                    </div>
                                    <div className="form_block">
                                        <div className="form_group">
                                            <input
                                                className={cn('form_control', {'error': errors.nickname})}
                                                placeholder="Nickname"
                                                {...register('nickname', {
                                                    required: {
                                                        value: true,
                                                        message: 'Поле обязательное для заполнения',
                                                    },
                                                    minLength: {
                                                        value: 5,
                                                        message: 'Минимальное количество символов - 5'
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: 'Максимальное количество символов - 16',
                                                    },
                                                })} autoComplete="off" role={"presentation"}/>
                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.phone})}
                                                   placeholder="Telephone"
                                                   {...register('phone', {
                                                       pattern: {
                                                           value: /^\d+$/,
                                                           message: 'Должен состоять только из цифр'
                                                       },
                                                       minLength: {
                                                           value: 9,
                                                           message: 'Минимальная длина номера 9 символов',
                                                       },
                                                       maxLength: {
                                                           value: 12,
                                                           message: 'Максимальная длина номера 12 символов',
                                                       },
                                                   })} autoComplete="off" role={"presentation"}/>

                                        </div>
                                    </div>
                                    <div className="form_block">
                                        <div className="form_group">


                                            <select {...register("sex")}
                                                    className={cn('form_control', {'error': errors.sex})}>
                                                <option value="true">Man</option>
                                                <option value="false">Woman</option>
                                            </select>

                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.birthDate})}
                                                   placeholder="Birthday"
                                                   type="text"
                                                   {...register('birthDate', {
                                                       pattern: {
                                                           value: /^(([0-2]\d)?(3[0-1])?[./-](0(1)?([3-9])?)?(1[0-2])?[./-]\d{4})|^(([0-2]\d)[./-]02[./-]\d{4})$/,
                                                           message: 'Неверный формат даты, пример: 28.06.2020',
                                                       },
                                                   })} autoComplete="off"/>
                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.email})}
                                                   placeholder="Email"
                                                   {...register('email', {
                                                       required: {
                                                           value: true,
                                                           message: 'Поле обязательное для заполнения',
                                                       },
                                                       pattern: {
                                                           value: /^(([^<>()[\]\\.,;:\s@а-яА-ЯA-Z"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-z-]+\.)+[a-z]{2,}))$/,
                                                           message: 'Неверный формат почты, пример: test@test.test',
                                                       },
                                                   })} autoComplete="off"/>

                                        </div>
                                    </div>
                                    <div className="form_block">
                                        <button className="btn" type="submit">Save</button>
                                    </div>

                                    {(Object.keys(errors).length > 0 || Object.keys(imageForm.formState.errors).length > 0) &&
                                        <div className="form_group errors">
                                            {errors.surname && <div className="error">
                                                <span>Surname: </span><span>{errors.surname.message}</span>
                                            </div>}
                                            {errors.name && <div className="error">
                                                <span>Name: </span><span>{errors.name.message}</span>
                                            </div>}
                                            {errors.patronymic && <div className="error">
                                                <span>Patronymic: </span><span>{errors.patronymic.message}</span>
                                            </div>}
                                            {errors.phone && <div className="error">
                                                <span>Phone: </span><span>{errors.phone.message}</span>
                                            </div>}
                                            {errors.email && <div className="error">
                                                <span>Email: </span><span>{errors.email.message}</span>
                                            </div>}
                                            {errors.birthDate && <div className="error">
                                                <span>BirthDate: </span><span>{errors.birthDate.message}</span>
                                            </div>}
                                            {errors.sex && <div className="error">
                                                <span>Sex: </span><span>{errors.sex.message}</span>
                                            </div>}
                                            {errors.nickname && <div className="error">
                                                <span>Nickname: </span><span>{errors.nickname.message}</span>
                                            </div>}

                                            {imageForm.formState.errors.image && <div className="error">
                                                <span>Фото: </span><span>{imageForm.formState.errors.image.message}</span>
                                            </div>}
                                        </div>}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="profile_content profile_stat">
                        <h2>Statistics</h2>
                        <div className="profile_left">
                            <div className="user_statistics">
                                <h5>Catalog Stats</h5>
                                <div className="stat_score">
                                    <div className="stat_score__days">
                                        <span>Days: </span>
                                        <span className="score_label">37.1</span>
                                    </div>
                                    <div className="stat_score__mean">
                                        <span>Mean Score: </span>
                                        <span className="score_label">8.25</span>
                                    </div>
                                </div>
                                <div className="stats_graph">
                                    <span className="graph watching" style={{width: 60}}></span>
                                    <span className="graph completed" style={{width: 354.2}}></span>
                                    <span className="graph on_hold" style={{width: 20}}></span>
                                    <span className="graph dropped" style={{width: 40}}></span>
                                    <span className="graph plan_to_watch" style={{width: 25.7}}></span>
                                </div>
                                <div className="stat_catalog">
                                    <ul className="stats_status">
                                        <li className="clearfix">
                                            <a href="#" className="circle watching">Watching</a>
                                            <span className="di-ib fl-r lh10">2</span>
                                        </li>
                                        <li className="clearfix">
                                            <a href="#" className="circle completed">Completed</a>
                                            <span className="di-ib fl-r lh10">55</span>
                                        </li>
                                        <li className="clearfix">
                                            <a href="#" className="circle on_hold">On-Hold</a>
                                            <span className="di-ib fl-r lh10">0</span>
                                        </li>
                                        <li className="clearfix">
                                            <a href="#" className="circle dropped">Dropped</a>
                                            <span className="di-ib fl-r lh10">0</span>
                                        </li>
                                        <li className="clearfix">
                                            <a href="#" className="circle plan_to_watch">Plan to Watch</a>
                                            <span className="di-ib fl-r lh10">2</span>
                                        </li>
                                    </ul>
                                    <ul className="stats_data">
                                        <li className="clearfix">
                                            <span className="stats_data_entries">Total Entries</span>
                                            <span className="stats_data__count">59</span>
                                        </li>
                                        <li className="clearfix">
                                            <span className="stats_data_entries">Rewatched</span>
                                            <span className="stats_data__count">0</span>
                                        </li>
                                        <li className="clearfix">
                                            <span className="stats_data_entries">Episodes</span>
                                            <span className="stats_data__count">2,232</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="profile_right">
                            <div className="last_updates">
                                <h5 className="history">
                                    Last Updates
                                    <a href="">History</a>
                                </h5>
                                <div className="last_updates_item">
                                    <a href="" className="history_image">
                                        <LoadableImage src={tempImage} alt=""/>
                                    </a>
                                    <div className="last_updates_item__data">
                                        <a href="">TOG GUN: MAVARIC</a>
                                        <div className="graph_content">
                                            <div className="graph">
                                                <span className="graph_inner completed" style={{width: 300}}></span>
                                            </div>
                                            <span className="zxc">Sep 26, 9:02 AM</span>
                                        </div>
                                        <div className="condition">
                                            Completed
                                            <span className="text completed"> 13</span>
                                            /13 · Score
                                            <span className="text score_label"> 9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="last_updates_item">
                                    <a href="" className="history_image">
                                        <LoadableImage src={tempImage} alt=""/>
                                    </a>
                                    <div className="last_updates_item__data">
                                        <a href="">TOG GUN: MAVARIC</a>
                                        <div className="graph_content">
                                            <div className="graph">
                                                <span className="graph_inner completed" style={{width: 300}}></span>
                                            </div>
                                            <span className="zxc">Sep 26, 9:02 AM</span>
                                        </div>
                                        <div className="condition">
                                            Completed
                                            <span className="text completed"> 13</span>
                                            /13 · Score
                                            <span className="text score_label"> 9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="last_updates_item">
                                    <a href="" className="history_image">
                                        <LoadableImage src={tempImage} alt=""/>
                                    </a>
                                    <div className="last_updates_item__data">
                                        <a href="">TOG GUN: MAVARIC</a>
                                        <div className="graph_content">
                                            <div className="graph">
                                                <span className="graph_inner completed" style={{width: 300}}></span>
                                            </div>
                                            <span className="zxc">Sep 26, 9:02 AM</span>
                                        </div>
                                        <div className="condition">
                                            Completed
                                            <span className="text completed"> 13</span>
                                            /13 · Score
                                            <span className="text score_label"> 9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <h1>YOUR FAVORITES CAROUSEL</h1>
        </div>
    );
};

export default Profile;