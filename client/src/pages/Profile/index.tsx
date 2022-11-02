import React, {FC, useEffect, useRef, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import cn from "classnames";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import '../../style/profile.scss';
import LoadableImage from "../../components/LoadableImage";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {setAvatar, updateUser} from "../../store/user/slice";
import axios from "../../axios";
import {catalogType} from "../../store/catalog/types";
import {formatAMPM} from "../../helper/dateFormat";
import {Link, useParams} from "react-router-dom";
import {apiImgUrl} from "../../api/zxc";


import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ChartData,
} from 'chart.js';
import {UserType} from "../../store/user/types";
import PageNotFound from "../../components/Global/PageNotFound";
import Loading from "../../components/Loading";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
ChartJS.defaults.color = "#fff";

const options = {
    responsive: true,
    color: '#fff',
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
    scales: {
        x: {  // <-- axis is not array anymore, unlike before in v2.x: '[{'
            grid: {
                color: 'rgba(133,41,41,0.1)',
                borderColor: 'red'  // <-- this line is answer to initial question
            }
        },
        y: {  // <-- axis is not array anymore, unlike before in v2.x: '[{'
            grid: {
                color: 'rgba(0,255,0,0.1)',
                borderColor: 'green'  // <-- this line is answer to initial question
            }
        }
    }
};


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


const Profile:FC = () => {

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormInputs>();
    const userStateData = useAppSelector(state => state.user.userData);

    const params = useParams();

    const [userData, setUserData] = useState<UserType>();
    const [catalogData, setCatalogData] = useState<catalogType[]>();
    const [loadUser, setLoadUser] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [selfProfile, setSelfProfile] = useState(false);

    const [dataChart, setDataChart] = useState<ChartData<"line">>();

    const ContainerStats = useRef<HTMLDivElement>(null);
    const [pixelMult, setPixelMult] = useState(6.2);

    const [lastUpdate, setLastUpdate] = useState<catalogType[]>();

    const [watching, setWatching] = useState<catalogType[]>();
    const [completed, setCompleted] = useState<catalogType[]>();
    const [on_hold, setOn_hold] = useState<catalogType[]>();
    const [dropped, setDropped] = useState<catalogType[]>();
    const [plan_to_watch, setPlan_to_watch] = useState<catalogType[]>();


    const dispatch = useAppDispatch();

    const schema = yup.object().shape({
        image: yup
            .mixed()
            .test('fileSize', 'Размер файла не должен превышать 20МБ', (value) => {
                return value && value[0].size <= 20 * 1024 * 1024;
            })
            .test('type', 'Допустимые форматы: png, jpg', value => {
                return value && (value[0].type === "image/png" || value[0].type === "image/jpeg");
            }),
    });

    const imageForm = useForm<FormImage>({resolver: yupResolver(schema)});

    const onSubmit = async (dataForm: FormInputs) => {
        dispatch(updateUser({...dataForm, id: userData!.clients_id}))
    }

    const onSubmitImage: SubmitHandler<FormImage> = async ({image}) => {
        try {
            const formData = new FormData();
            formData.append('avatar', image[0]);
            const {data} = await axios.post<{ success: boolean, message: string, url: string }>('/upload', formData);

            if (data.success) {
                await axios.patch('/api/auth/update', {avatar: data.url, id: userData!.clients_id});
                dispatch(setAvatar(data.url));
            }

        } catch (e) {
            return console.log('error');
        }
    };

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

    useEffect(() => {
        if (catalogData && ContainerStats.current) {
            configurationChart(catalogData);
            setPixelMult((ContainerStats.current.offsetWidth / catalogData.length));
            setWatching(catalogData.filter(item => item.status === 1))
            setCompleted(catalogData.filter(item => item.status === 2))
            setOn_hold(catalogData.filter(item => item.status === 3))
            setDropped(catalogData.filter(item => item.status === 4))
            setPlan_to_watch(catalogData.filter(item => item.status === 5))
        }
    }, [catalogData]);

    useEffect(() => {
        const dataUser = async () => {
            return await axios.get('/api/auth/getUser', {
                params: {
                    id: params.id
                }
            })
        }
        dataUser().then(resolve => {
            if (resolve.status !== 204) {
                if (userStateData && userStateData.clients_id === resolve.data.data.clients_id) {
                    setUserData(resolve.data.data);
                    fetchHistoryAndCatalog();
                    setLoadingPage(false);
                    setSelfProfile(true);
                    setLoadUser(true);
                } else {
                    setUserData(resolve.data.data)
                    fetchHistoryAndCatalog();
                    setLoadingPage(false);
                    setLoadUser(true);
                }
            } else {
                setLoadingPage(false);
                console.log(resolve.data.error)
            }
        })
    }, [userStateData])

    const fetchHistoryAndCatalog = () => {
        const data = async () => {
            return await axios.get('/api/profile/getHistory/',)
        }
        data().then(resolve => {
            if (resolve.status !== 204) {
                setLastUpdate(resolve.data.data);
            } else {
                console.log(resolve.data.error)
            }
        })
        const dateHistory = async () => {
            return await axios.get('/api/catalog/getAllEntryById', {
                params: {
                    id: params.id
                }
            })
        }
        dateHistory().then(resolve => {
            if (resolve.status !== 204) {
                if (resolve.data.data.length > 0) {
                    setCatalogData(resolve.data.data)
                }
            } else {
                console.log(resolve.data.error)
            }
        })
    }

    const configurationChart = (catalogData: catalogType[]) => {
        let labels: string[] = [];

        let catalogDataChart: catalogType[] = [...catalogData];
        catalogDataChart.sort((a: catalogType, b: catalogType): number => {
            if (a.id && b.id) {
                return a.id - b.id
            }
            return 1
        });

        let dataWatching = getValues(catalogDataChart, 1);
        let dataCompleted = getValues(catalogDataChart, 2);
        let dataOnHold = getValues(catalogDataChart, 3);
        let dataDropped = getValues(catalogDataChart, 4);
        let dataPlanToWatch = getValues(catalogDataChart, 5);
        let maxLengthData = Math.max(dataWatching.length, dataCompleted.length, dataOnHold.length, dataDropped.length, dataPlanToWatch.length);

        for (let i = 0; i < maxLengthData; i++) {
            labels.push(i.toString());
        }

        setDataChart({
            labels: labels,
            datasets: [
                {
                    label: 'Watching',
                    data: dataWatching,
                    borderColor: '#2db039',
                    backgroundColor: '#2db039',
                    tension: 0.3
                },
                {
                    label: 'Completed',
                    data: dataCompleted,
                    borderColor: '#26448f',
                    backgroundColor: '#26448f',
                    tension: 0.3
                },
                {
                    label: 'On-Hold',
                    data: dataOnHold,
                    borderColor: '#f9d457',
                    backgroundColor: '#f9d457',
                    tension: 0.3
                },
                {
                    label: 'Dropped',
                    data: dataDropped,
                    borderColor: '#a12f31',
                    backgroundColor: '#a12f31',
                    tension: 0.3
                },
                {
                    label: 'Plan to Watch',
                    data: dataPlanToWatch,
                    borderColor: '#8424a7',
                    backgroundColor: '#8424a7',
                    tension: 0.3
                },
            ]
        });
    }

    const getValues = (array: catalogType[], search: number) => {
        let values: (number | null)[] = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].status === search) {
                values.push(array[i].score);
            }
        }
        return values
    }

    const formatJoined = (date: string): string => {
        return new Date(date).toDateString().split(/\s(.*)/g, 2)[1]
    }

    const poster = (item: string) => {
        if (item) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item}`;
        } else {
            return '';
        }
    };

    return (
        <div className={"spacing"}>
            {loadingPage ? <Loading/> : loadUser ? <div className="profile_wrapper">
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18px"
                                                             height="18px"
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
                                                <input accept="image/png, image/jpeg"
                                                       className="form-control"
                                                       type="file"
                                                       id="image"
                                                       hidden={true}
                                                       {...imageForm.register('image', {disabled:!selfProfile})}/>
                                            </>
                                        }
                                    </div>
                                </form>
                                <ul className="user_status">
                                    {/*<li className="clearfix">*/}
                                    {/*    <span className="user_status_title">Last Online</span>*/}
                                    {/*    <span className="user_status_data online">Now</span>*/}
                                    {/*</li>*/}
                                    {userData && <li className="clearfix">
                                        <span className="user_status_title">Joined</span>
                                        <span className="user_status_data">{formatJoined(userData.joined)}</span>
                                    </li>}
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
                                                       disabled:!selfProfile
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
                                                           disabled:!selfProfile
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
                                                       disabled:!selfProfile
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
                                                    disabled:!selfProfile
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
                                                       disabled:!selfProfile
                                                   })} autoComplete="off" role={"presentation"}/>

                                        </div>
                                    </div>
                                    <div className="form_block">
                                        <div className="form_group">


                                            <select {...register("sex", {disabled:!selfProfile})}
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
                                                       disabled:!selfProfile
                                                   })}
                                                   autoComplete="off"/>
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
                                                       disabled:!selfProfile
                                                   })}
                                                   autoComplete="off"/>

                                        </div>
                                    </div>
                                    {selfProfile && <div className="form_block">
                                        <button className="btn" type="submit">Save</button>
                                    </div>}

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
                                        <span className="score_label">{catalogData ?
                                            (catalogData.length * 35 / 60)
                                                .toFixed(2) : 0}</span>
                                    </div>
                                    <div className="stat_score__mean">
                                        <span>Mean Score: </span>
                                        <span className="score_label">{catalogData ?
                                            (catalogData.map((item) => item.score)
                                                .reduce((prev, current) => (prev + current)) / catalogData.length)
                                                .toFixed(2) : 0}</span>
                                    </div>
                                </div>

                                <div className="stats_graph" ref={ContainerStats}>
                                    {
                                        watching &&
                                        completed &&
                                        on_hold &&
                                        dropped &&
                                        plan_to_watch &&
                                        <>
                                            <span className="graph watching"
                                                  style={{width: watching.length * pixelMult}}></span>
                                            <span className="graph completed"
                                                  style={{width: completed.length * pixelMult}}></span>
                                            <span className="graph on_hold"
                                                  style={{width: on_hold.length * pixelMult}}></span>
                                            <span className="graph dropped"
                                                  style={{width: dropped.length * pixelMult}}></span>
                                            <span className="graph plan_to_watch"
                                                  style={{width: plan_to_watch.length * pixelMult}}></span>
                                        </>
                                    }
                                </div>

                                <div className="stat_catalog">
                                    <ul className="stats_status">
                                        <li className="clearfix">
                                            <Link to="/catalog/1" className="circle watching">Watching</Link>
                                            <span className="di-ib fl-r lh10">
                                                {watching ? watching.length : 0}
                                            </span>
                                        </li>
                                        <li className="clearfix">
                                            <Link to="/catalog/2" className="circle completed">Completed</Link>
                                            <span className="di-ib fl-r lh10">
                                                {completed ? completed.length : 0}
                                            </span>
                                        </li>
                                        <li className="clearfix">
                                            <Link to="/catalog/3" className="circle on_hold">On-Hold</Link>
                                            <span className="di-ib fl-r lh10">
                                                {on_hold ? on_hold.length : 0}
                                            </span>
                                        </li>
                                        <li className="clearfix">
                                            <Link to="/catalog/4" className="circle dropped">Dropped</Link>
                                            <span className="di-ib fl-r lh10">
                                                {dropped ? dropped.length : 0}
                                            </span>
                                        </li>
                                        <li className="clearfix">
                                            <Link to="/catalog/5" className="circle plan_to_watch">Plan to Watch</Link>
                                            <span className="di-ib fl-r lh10">
                                                {plan_to_watch ? plan_to_watch.length : 0}
                                            </span>
                                        </li>
                                    </ul>
                                    <ul className="stats_data">
                                        <li className="clearfix">
                                            <span className="stats_data_entries">Total Entries</span>
                                            <span
                                                className="stats_data__count"> {catalogData ? catalogData.length : 0}</span>
                                        </li>
                                        <li className="clearfix">
                                            <span className="stats_data_entries">Episodes</span>
                                            <span className="stats_data__count">{catalogData ?
                                                catalogData.map((item) => item.episodes)
                                                    .reduce((prev, current) => prev + current) : 0}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="profile_right">
                            <div className="last_updates">
                                <h5 className="history">
                                    Last Updates
                                    {/*<a href="">History</a>*/}
                                </h5>
                                {lastUpdate && lastUpdate.map((item) => (
                                    <div className="last_updates_item"
                                         key={`history-last-${item.id}-${item.name_mt_id}`}>
                                        <Link to={item.type_mt === 'tv' ? `/tv/${item.mt_id}` : `/movie/${item.mt_id}`}
                                              className="history_image">
                                            <LoadableImage src={poster(item.img_string)} alt=""/>
                                        </Link>
                                        <div className="last_updates_item__data">
                                            <Link
                                                to={item.type_mt === 'tv'
                                                    ? `/tv/${item.mt_id}`
                                                    : `/movie/${item.mt_id}`}>
                                                {item.name_mt_id}
                                            </Link>
                                            <div className="graph_content">
                                                <div className="graph">
                                                    <span className={cn("graph_inner", {
                                                        'watching': item.status === 1,
                                                        'completed': item.status === 2,
                                                        'on_hold': item.status === 3,
                                                        'dropped': item.status === 4,
                                                        'plan_to_watch': item.status === 5
                                                    })} style={{width: (350 / item.episodes) * item.watchedep}}></span>
                                                </div>
                                                <span className="zxc">{formatAMPM(item.last_update)}</span>
                                            </div>
                                            <div className="condition">
                                                {item.status === 1 && 'Watching'}
                                                {item.status === 2 && 'Completed'}
                                                {item.status === 3 && 'On-Hold'}
                                                {item.status === 4 && 'Dropped'}
                                                {item.status === 5 && 'Plan to Watch'}
                                                <span className={cn("text", {
                                                    'watching': item.status === 1,
                                                    'completed': item.status === 2,
                                                    'on_hold': item.status === 3,
                                                    'dropped': item.status === 4,
                                                    'plan_to_watch': item.status === 5
                                                })}> {item.watchedep}</span>
                                                /{item.episodes} · Score
                                                <span className="text score_label"> {item.score}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {dataChart &&
                        <div className="profile_chart_stat">
                            <h2 className="title_chart">Chart catalog</h2>
                            <Line options={options} data={dataChart}/>
                        </div>
                    }
                </div>
            </div> : <PageNotFound/>}

            {/*<h1>YOUR FAVORITES CAROUSEL</h1>*/}
        </div>
    );
};

export default Profile;