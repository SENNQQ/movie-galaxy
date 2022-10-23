import React, {FC, useEffect, useRef, useState} from 'react';
import st from './addtocatalog.module.scss'
import {AddToCatalogPropsType} from "./types";
import axios from "../../axios";
import cn from "classnames";
import {episodesType} from "../TV/Episodes/types";

interface iEntry {
    id?: number,
    mt_id: number,
    score: number,
    status: number,
    watchedep: string
}

interface iSeasons {
    season: number,
    episodes: episodesType[]
}

const AddToCatalog: FC<AddToCatalogPropsType> = ({
                                                     _id,
                                                     type
                                                 }) => {

    const [isEntry, setIsEntry] = useState(false);
    const [loading, setLoading] = useState(false);

    const refStatus = useRef<HTMLSelectElement>(null);
    const refScore = useRef<HTMLSelectElement>(null);
    const refEpisodesCount = useRef<HTMLInputElement>(null);

    const [EntryData, setEntryData] = useState<iEntry>({
        mt_id: _id,
        score: 0,
        status: 1,
        watchedep: ""
    });


    const calcCountEpisodes = () => {
        if (type === "movie") {
            return 1
        } else {
            return 10
        }
    }

    const seasons = (): iSeasons[] => {
        const seasons: iSeasons[] = [];
        for (let index = 0; index < 2; index++) {
            seasons.push({
                season: index + 1,
                episodes: [],
            });
        }
        seasons.sort((a, b) => a.season > b.season ? -1 : 1);
        return seasons;
    }

    useEffect(() => {
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
                setEntryData({...resolve.data.data})
            } else {
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

        let watchedEpCount = refEpisodesCount.current!.value === "" ? "0" : refEpisodesCount.current!.value;
        if (parseInt(watchedEpCount) > calcCountEpisodes())
            watchedEpCount = "0";

        if (!isEntry) {
            const data = async () => {
                return await axios.post('/api/catalog/createEntry', {
                    score: refScore.current!.value,
                    status: "1",
                    watchedEp: watchedEpCount,
                    mt_id: _id,
                })
            }
            data().then(() => setLoading(false))
        }
        else {
            const data = async () => {
                return await axios.patch('/api/catalog/update', {
                    score: refScore.current!.value,
                    status: refStatus.current!.value,
                    watchedEp: watchedEpCount,
                    mt_id: _id,
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
                } else{
                    console.log(resolve.data.error)
                }
            })
        }
    }

    const addToCatalog = () => {
        setLoading(true);

        if (!isEntry) {
            const data = async () => {
                return await axios.post('/api/catalog/createEntry', {
                    score: "0",
                    status: "1",
                    watchedEp: "0",
                    mt_id: _id,
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
                </div>}

            <div className={st.form_user_episode}>
                <span> Episodes </span>
                <input type="number"
                       id="my_info_watchedeps"
                       className={st.form_user_episode__input}
                       name="myinfo_watchedeps"
                       onChange={onChangeInput}
                       ref={refEpisodesCount}/>
                <span> / </span>
                <span> {calcCountEpisodes()} </span>
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