import React, {FC} from 'react';
import cn from "classnames";
import st from "../Movie/MovieInfo/overview.module.scss";
import {fullDate } from "../../helper/additionalFun";
import ExternalLinks from "../ExternalLinks";
import {apiImgUrl} from "../../api/zxc";
import {PersonInfoPropsType} from "./types";
import stPerson from './PersonInfo.module.scss'

const PersonInfo: FC<PersonInfoPropsType> = ({person}) => {

    const avatar = () => {
        if (person.profile_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${person.profile_path}`;
        } else {
            return null;
        }
    }

    const avatarItem = avatar();

    const formatContentPerson = (string: string) => {
        return (string.split('\n')
            .filter(section => section !== '')
            .map(section => `<p>${section}</p>`).join(''));
    };


    const age  = () => {
        const born = person.birthday;
        const died = person.deathday;
        if (born && !died) {
            return getAge(born);
        } else if (born && died) {
            return getAge(born, died);
        } else {
            return false;
        }
    }

    const getAge  = (born:string, died?:string) => {
        const startDate = new Date(born);
        let endDate;
        let age;
        if (!died) {
            endDate = new Date();
        } else {
            endDate = new Date(died);
        }
        const month = endDate.getMonth() - startDate.getMonth();
        age = endDate.getFullYear() - startDate.getFullYear();
        if (month < 0 || (month === 0 && endDate.getDate() < startDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <div>
            <div className={cn(st.info, "spacing")}>
                <div className={st.info__leftBlock}>
                    <div className={st.posterMovie}>
                        {avatarItem ? <img src={avatarItem} alt={person.name}/> :
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                     fillRule="evenodd" clipRule="evenodd" fill="#999">
                                    <path
                                        d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
                                </svg>
                            </span>
                        }
                    </div>
                </div>

                <div className={st.info__rightBlock}>
                    <div className={st.rightBlock__overview}>
                        <h2 className={st.rightBlock__title}>
                            {person.name}
                        </h2>

                        {person.biography &&
                            <div className={stPerson.person_overview}
                                 dangerouslySetInnerHTML={{__html: formatContentPerson(person.biography)}}></div>
                        }
                    </div>
                    <div className={st.stats}>
                        <ul className="noList">
                            {person.known_for_department &&
                                <li>
                                    <div className={st.noList__label}>
                                        Known For
                                    </div>
                                    <div className={st.noList__value}>
                                        {person.known_for_department }
                                    </div>
                                </li>
                            }
                            {person.birthday &&
                                <li>
                                    <div className={st.noList__label}>
                                        Born
                                    </div>
                                    <div className={st.noList__value}>
                                        {fullDate(person.birthday)}
                                        {!person.deathday  && <span>(age {age()})</span>}
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                {(person.external_ids.facebook_id
                        || person.external_ids.imdb_id
                        || person.external_ids.instagram_id
                        || person.external_ids.twitter_id) &&
                    <div className={st.externalLinks}>
                        <ExternalLinks links={person.external_ids}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default PersonInfo;