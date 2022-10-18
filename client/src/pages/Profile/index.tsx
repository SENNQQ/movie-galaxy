import React from 'react';
import {useForm} from "react-hook-form";
import cn from "classnames";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import '../../style/profile.scss';
import tempImage from '../../image/zOGINv5sJxEZQWw2dGuO8JUzvyK.jpg';
import LoadableImage from "../../components/LoadableImage";
import {useAppSelector} from "../../store/hook";


type FormInputs = {
    fullName: string;
    phone: string;
    email: string;
    birthDate: string;
    address: string;
    studyPlace: string;
    facebook: string;
    instagram: string;
    social: string;
}

type FormImage = {
    image: FileList
}

const Profile = () => {

    const {register, handleSubmit, setError, setValue, formState: {errors}} = useForm<FormInputs>();

    const {userData, load, error} = useAppSelector(state => state.user);

    const schema = yup.object().shape({
        image: yup
            .mixed()
            .test('fileSize', 'Размер файла не должен превышать 20МБ', (value) => {
                return value && value[0].size <= 20 * 1024 * 1024;
            })
            .test('type', 'Допустимые форматы: png, jpg', value => {
                return value && value[0].type === ('image/jpeg' || 'image/png');
            }),
    });

    const imageForm = useForm<FormImage>({resolver: yupResolver(schema)});
    console.log(userData);

    return (
        <div className={"spacing"}>
            <div className="profile_wrapper">
                <div className="profile">
                    <div className="profile_content">
                        <h2>Profile {userData?.nickname}</h2>
                        <div className="profile_left">
                            <div className="user">
                                <div className="user_img">
                                    <div className="add_picture">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" version="1.1"
                                             id="Capa_1" x="0px" y="0px" viewBox="0 0 52 52" className="plus_circle"
                                             fill="#787878">
                                            <path
                                                d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2  s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2  S39.604,28,38.5,28z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             version="1.1" id="Capa_1" x="0px" y="0px" width="48px" height="48px"
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
                                </div>
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
                            <form autoComplete="off">
                                <div className="info">
                                    <div className="form_block">
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.fullName})}
                                                   placeholder="Ф"
                                                   value={userData?.surname}
                                                   {...register('fullName', {
                                                       required: {
                                                           value: true,
                                                           message: 'Поле объязательное для заполнения'
                                                       },
                                                       minLength: {
                                                           value: 10,
                                                           message: 'Мимальное количество символов - 10'
                                                       },
                                                       maxLength: {
                                                           value: 250,
                                                           message: 'Максимальное количество символов - 250',
                                                       },
                                                   })}
                                                   autoComplete="off" role={"presentation"}/>
                                        </div>
                                        <div className="form_group">
                                            <div className="input-block">
                                                <input className={cn('form_control', {'error': errors.phone})}
                                                       type="tel"
                                                       title="Подтвержден"
                                                       placeholder="И"
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
                                                       })} autoComplete="off"  role={"presentation"}/>
                                            </div>
                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.email})}
                                                   placeholder="О"
                                                   title="Подтвержден"
                                                   {...register('email', {
                                                       required: {
                                                           value: true,
                                                           message: 'Поле объязательное для заполнения',
                                                       },
                                                       pattern: {
                                                           value: /^(([^<>()[\]\\.,;:\s@а-яА-ЯA-Z"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-z-]+\.)+[a-z]{2,}))$/,
                                                           message: 'Неверный формат почты, пример: test@test.test',
                                                       },
                                                   })} autoComplete="off"  role={"presentation"}/>
                                        </div>
                                    </div>
                                    <div className="form_block">
                                        <div className="form_group">
                                            <input
                                                className={cn('form_control', {'error': errors.birthDate})}
                                                placeholder="ПСЕВДОНИМ"
                                                {...register('birthDate', {
                                                    required: {
                                                        value: true,
                                                        message: 'Поле объязательное для заполнения',
                                                    },
                                                    pattern: {
                                                        value: /^(([0-2]\d)?(3[0-1])?[./-](0(1)?([3-9])?)?(1[0-2])?[./-]\d{4})|^(([0-2]\d)[./-]02[./-]\d{4})$/,
                                                        message: 'Неверный формат даты, пример: 28.06.2020',
                                                    },
                                                })} autoComplete="off"  role={"presentation"}/>
                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.address})}
                                                   placeholder="Т"
                                                   {...register('address', {
                                                       required: {
                                                           value: true,
                                                           message: 'Поле объязательное для заполнения',
                                                       },
                                                       minLength: {
                                                           value: 10,
                                                           message: 'Минимальная длина 10 символов',
                                                       },
                                                   })} autoComplete="off"  role={"presentation"}/>

                                        </div>
                                    </div>
                                    <div className="form_block">
                                        <div className="form_group">
                                            <input
                                                className={cn('form_control', {'error': errors.birthDate})}
                                                placeholder="ПОЛ"
                                                {...register('birthDate', {
                                                    required: {
                                                        value: true,
                                                        message: 'Поле объязательное для заполнения',
                                                    },
                                                    pattern: {
                                                        value: /^(([0-2]\d)?(3[0-1])?[./-](0(1)?([3-9])?)?(1[0-2])?[./-]\d{4})|^(([0-2]\d)[./-]02[./-]\d{4})$/,
                                                        message: 'Неверный формат даты, пример: 28.06.2020',
                                                    },
                                                })} autoComplete="off"/>
                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.address})}
                                                   placeholder="Дата"
                                                   {...register('address', {
                                                       required: {
                                                           value: true,
                                                           message: 'Поле объязательное для заполнения',
                                                       },
                                                       minLength: {
                                                           value: 10,
                                                           message: 'Минимальная длина 10 символов',
                                                       },
                                                   })} autoComplete="off"/>

                                        </div>
                                        <div className="form_group">
                                            <input className={cn('form_control', {'error': errors.address})}
                                                   placeholder="Почта"
                                                   {...register('address', {
                                                       required: {
                                                           value: true,
                                                           message: 'Поле объязательное для заполнения',
                                                       },
                                                       minLength: {
                                                           value: 10,
                                                           message: 'Минимальная длина 10 символов',
                                                       },
                                                   })} autoComplete="off"/>

                                        </div>
                                    </div>
                                    <div className="form_block">
                                        <button className="btn" type="submit">Save</button>
                                    </div>
                                    {/*<div className="form_group no_flex">*/}
                                    {/*    <p className="required-fields">*/}
                                    {/*        <span>*</span>*/}
                                    {/*        поля обязательные для заполнения*/}
                                    {/*    </p>*/}
                                    {/*</div>*/}


                                    {(Object.keys(errors).length > 0 || Object.keys(imageForm.formState.errors).length > 0) &&
                                        <div className="form_group errors">
                                            {errors.fullName && <div className="error">
                                                <span>ФИО:</span><span>{errors.fullName.message}</span>
                                            </div>}
                                            {errors.phone && <div className="error">
                                                <span>Телефон:</span><span>{errors.phone.message}</span>
                                            </div>}
                                            {errors.email && <div className="error">
                                                <span>Email:</span><span>{errors.email.message}</span>
                                            </div>}
                                            {errors.birthDate && <div className="error">
                                                <span>Дата рождения:</span><span>{errors.birthDate.message}</span>
                                            </div>}
                                            {errors.address && <div className="error">
                                                <span>Домашний адрес:</span><span>{errors.address.message}</span>
                                            </div>}
                                            {errors.studyPlace && <div className="error">
                                                <span>Место учебы:</span><span>{errors.studyPlace.message}</span>
                                            </div>}
                                            {errors.instagram && <div className="error">
                                                <span>Instagram:</span><span>{errors.instagram.message}</span>
                                            </div>}
                                            {errors.facebook && <div className="error">
                                                <span>Facebook:</span><span>{errors.facebook.message}</span>
                                            </div>}
                                            {errors.social && <div className="error">
                                                <span>Соц.сеть:</span><span>{errors.social.message}</span>
                                            </div>}
                                            {imageForm.formState.errors.image && <div className="error">
                                                <span>Фото:</span><span>{imageForm.formState.errors.image.message}</span>
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