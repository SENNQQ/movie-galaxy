import React, {FC, useEffect, useState} from 'react';
import st from './episodes.module.scss';
import {EpisodesPropsType, episodesType} from "./types";
import {getTvShowEpisodes} from "../../../api/zxc";
import {useParams} from "react-router-dom";
import EpisodesItem from "../EpisodesItem";

interface iSeasons {
    season: number,
    episodes: episodesType[]
}

const Episodes:FC<EpisodesPropsType> = ({numberOfSeasons}) => {

    const [activeEpisodes, setActiveEpisodes] = useState<episodesType[]>();
    const [activeSeason, setActiveSeason] = useState<number>(numberOfSeasons);

    const handleSeasonChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setActiveSeason(parseInt(e.currentTarget.value));
    }

    const params = useParams();

    const seasons = ():iSeasons[] => {
        const seasons:iSeasons[] = [];
        for (let index = 0; index < numberOfSeasons; index++) {
            seasons.push({
                season: index + 1,
                episodes: [],
            });
        }
        seasons.sort((a, b) => a.season > b.season ? -1 : 1);
        return seasons;
    }


    const getEpisodes = () => {
        const season = seasons().find(season => season.season === activeSeason);
        // if we already have the episodes, just show them
        // else do api call

        if(season){
            if (season.episodes.length > 0) {
                setActiveEpisodes(season.episodes);
            }
            else {
                // get episodes for a certain season
                getTvShowEpisodes(params.id, activeSeason).then((response) => {
                    season.episodes = response.episodes;
                    setActiveEpisodes(season.episodes);
                });
            }
        }
    }
    
    useEffect(()=>{
        getEpisodes();
    }, [activeSeason]);

    const episodeCount = () =>{
        if(activeEpisodes)
            return `${activeEpisodes.length} ${activeEpisodes.length > 1 ? 'Episodes' : 'Episode'}`;

    }

    return (
        <div className={"spacing"}>
            <div className={st.head}>
                <div className={"headDropdown"}>

                    <select name="infoVideo_dropdown"
                            onChange={(event) => handleSeasonChange(event)}>
                        {seasons().map((item) =>
                            <option value={item.season} key={`season-${item.season}`}>Season {item.season}</option>)
                        }
                    </select>

                </div>
                {episodeCount()}
            </div>
            <div className={st.items}>
                {activeEpisodes && activeEpisodes.map((item) =>
                    <EpisodesItem item={item}
                                  key={`episodes${item.id}`}/>)
                }
            </div>

        </div>
    );
};

export default Episodes;