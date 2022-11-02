import React, {FC, useEffect, useRef, useState} from 'react';
import st from './addtocatalog.module.scss'
import {AddToCatalogPropsType} from "./types";
import axios from "../../axios";
import cn from "classnames";
import { getTvShowEpisodesCount } from "../../api/zxc";
import {useAppDispatch} from "../../store/hook";
import {addEntryCatalog, updateEntryCatalog} from "../../store/catalog/slice";


interface iEntry {
    id?: number,
    mt_id: number,
    score: number,
    status: number,
    watchedep: string
}

const AddToCatalog: FC<AddToCatalogPropsType> = ({
                                                     _id,
                                                     type,
                                                     img = '',
                                                     name_mt
                                                 }) => {

    const [isEntry, setIsEntry] = useState(false);
    const [loading, setLoading] = useState(false);

    const refStatus = useRef<HTMLSelectElement>(null);
    const refScore = useRef<HTMLSelectElement>(null);
    const refEpisodesCount = useRef<HTMLInputElement>(null);
    const [countEpisodes, setCountEpisodes] = useState(1);
    const dispatch = useAppDispatch();

    const [EntryData, setEntryData] = useState<iEntry>({
        mt_id: _id,
        score: 0,
        status: 1,
        watchedep: ""
    });

    const calcCountEpisodes = async () => {
        if(type ==="movie"){
            return 1
        }
        else{
            return await getTvShowEpisodesCount(_id)
        }
    }


    useEffect(() => {
        setLoading(true);
        setIsEntry(false);
        console.log("_id change " + isEntry);
        calcCountEpisodes().then(response=>{
            setCountEpisodes(response)
        });

        const data = async () => {
            return await axios.get('/api/catalog/get/', {
                params: {
                    mt_id: _id
                }
            })
        }
        data().then(resolve => {
            if (resolve.status !== 204) {
                setIsEntry(true);
                setLoading(false);
                setEntryData({...resolve.data.data})
            } else {
                setLoading(false);
                setEntryData({
                    mt_id: _id,
                    score: 0,
                    status: 1,
                    watchedep: ""
                });
            }
        })
    }, [_id])

    useEffect(() => {
        if (isEntry) {
            refStatus.current!.selectedIndex = EntryData.status - 1;
            refScore.current!.selectedIndex = EntryData.score;
            refEpisodesCount.current!.value = EntryData.watchedep;
        } else {
            refScore.current!.selectedIndex = 0;
            refEpisodesCount.current!.value = '';
        }
    }, [EntryData])

    const onChangeInput = () => {
        setLoading(true);
        console.log("changeInput " + isEntry);
        let watchedEpCount = refEpisodesCount.current!.value === "" ? "0" : refEpisodesCount.current!.value;
        if (parseInt(watchedEpCount) > countEpisodes)
            watchedEpCount = "0";

        if (!isEntry) {
            const data = async () => {
                return await axios.post('/api/catalog/createEntry', {
                    score: refScore.current!.value,
                    status: "1",
                    watchedEp: watchedEpCount,
                    mt_id: _id,
                    type_mt:type,
                    episodes:countEpisodes,
                    img:img,
                    name_mt:name_mt
                })
            }
            data().then(() => {
                setLoading(false)
                setIsEntry(true)
                setEntryData({
                    mt_id: _id,
                    status: 1,
                    score: parseInt(refScore.current!.value),
                    watchedep: watchedEpCount
                })
                dispatch(addEntryCatalog( {
                    mt_id: _id,
                    status: 1,
                    score: parseInt(refScore.current!.value),
                    watchedep: parseInt(watchedEpCount),
                    last_update: new Date().toDateString(),
                    type_mt: type,
                    episodes: countEpisodes,
                    img_string:img,
                    name_mt_id:name_mt,
                }))
            })
        }
        else {
            const data = async () => {
                return await axios.patch('/api/catalog/update', {
                    score: refScore.current!.value,
                    status: refStatus.current!.value,
                    watchedEp: watchedEpCount,
                    mt_id: _id,
                    type_mt:type,
                    episodes:countEpisodes,
                    img:img,
                    name_mt:name_mt
                })
            }
            data().then((resolve) => {
                if(resolve.data.success){
                    setLoading(false)
                    setEntryData({
                        ...EntryData,
                        status: parseInt(refStatus.current!.value),
                        score: parseInt(refScore.current!.value),
                        watchedep: watchedEpCount
                    })
                    dispatch(updateEntryCatalog( {
                        id:EntryData.id,
                        mt_id: _id,
                        status: parseInt(refStatus.current!.value),
                        score: parseInt(refScore.current!.value),
                        watchedep: parseInt(watchedEpCount),
                        last_update: new Date().toDateString(),
                        type_mt: type,
                        episodes: countEpisodes,
                        img_string:img,
                        name_mt_id:name_mt,
                    }))
                } else{
                    console.log(resolve.data.error)
                }
            })
        }
    }

    const addToCatalog = () => {
        setLoading(true);
        console.log("addToCatalog " + isEntry);
        if (!isEntry) {
            const data = async () => {
                return await axios.post('/api/catalog/createEntry', {
                    score: "0",
                    status: "1",
                    watchedEp: "0",
                    mt_id: _id,
                    type_mt:type,
                    episodes:countEpisodes,
                    img:img,
                    name_mt:name_mt
                })
            }
            data().then((resolve) => {
                if(resolve.data.status){
                    setLoading(false)
                    setIsEntry(true)
                    setEntryData({
                        ...EntryData,
                        status: 1,
                        score: parseInt(refScore.current!.value),
                        watchedep: ''
                    })
                    dispatch(addEntryCatalog( {
                        mt_id: _id,
                        status: 1,
                        score: 0,
                        watchedep: 0,
                        last_update: new Date().toDateString(),
                        type_mt: type,
                        episodes: countEpisodes,
                        img_string:img,
                        name_mt_id:name_mt,
                    }))
                }
                else {
                    console.log(resolve.data.error)
                }

            })
        }

    }

    return (
        <div className={cn(st.user_status_block, {[st.on]: loading})}>
            {isEntry
                ?
                <select name="myinfo_status"
                        id="myinfo_status"
                        className={cn(st.form_user_status, {
                            [st.status_watching]: EntryData?.status === 1,
                            [st.status_completed]: EntryData?.status === 2,
                            [st.status_on_hold]: EntryData?.status === 3,
                            [st.status_dropped]: EntryData?.status === 4,
                            [st.status_platWatch]: EntryData?.status === 5
                        })}
                        onChange={onChangeInput}
                        ref={refStatus}>
                    <option value="1">Watching</option>
                    <option value="2">Completed</option>
                    <option value="3">On-Hold</option>
                    <option value="4">Dropped</option>
                    <option value="5">Plan to Watch</option>
                </select>
                :
                <div className={st.user_status_add_list} onClick={() => addToCatalog()}>
                    Add to Catalog
                </div>
            }

            <div className={st.form_user_episode}>
                <span> Episodes </span>
                <input type="number"
                       id="my_info_watchedeps"
                       className={st.form_user_episode__input}
                       name="myinfo_watchedeps"
                       onBlur={onChangeInput}
                       ref={refEpisodesCount}/>
                <span> / </span>
                <span> {countEpisodes} </span>
            </div>
            <select name="myinfo_score"
                    id="myinfo_score"
                    className={st.form_user_score}
                    onChange={onChangeInput}
                    ref={refScore}>
                <option value="0">Select</option>
                <option value="1">(1) Appalling</option>
                <option value="2">(2) Horrible</option>
                <option value="3">(3) Very Bad</option>
                <option value="4">(4) Bad</option>
                <option value="5">(5) Average</option>
                <option value="6">(6) Fine</option>
                <option value="7">(7) Good</option>
                <option value="8">(8) Very Good</option>
                <option value="9">(9) Great</option>
                <option value="10">(10) Masterpiece</option>
            </select>
        </div>

    );
};

export default AddToCatalog;