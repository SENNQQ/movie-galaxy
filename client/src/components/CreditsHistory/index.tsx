import React, {FC, useEffect, useState} from 'react';
import st from "./CreditsHistory.module.scss"
import CreditsHistoryGroup from "../CreditsHistoryGroup";
import {CreditsHistoryPropsType} from "./types";
import {combinedCreditsCast} from "../../types/MoviePageTypes";

interface iActiveMedia {
    name:string,
    groups:iHandleCredits[]
}

interface iHandleCredits {
    year:string,
    credits:combinedCreditsCast[]
}

const CreditsHistory: FC<CreditsHistoryPropsType> = ({credits}) => {

    const [activeMedia, setActiveMedia] = useState<iActiveMedia>({groups: [], name: ""});
    const [activeCredits, setActiveCredits] = useState<iActiveMedia>({groups: [], name: ""});

    const handleCast = (items: combinedCreditsCast[]):iHandleCredits[] | undefined => {
        if (!items || !items.length)
            return;

        // group credits (by year)
        let groups = groupItems(items);

        // get blank group (no year)
        const blankGroup = groups.find(group => group.year === "");

        // remove blank group
        if (blankGroup) groups = groups.filter(group => group.year !== "");

        // sort groups by year
        sortGroups(groups);

        // add blank group to the start
        if (blankGroup)
            groups.unshift(blankGroup);

        // sort credits in the group by date
        groups.forEach(group => sortCredits(group.credits));

        return groups;
    }

    const handleCrew = (items: combinedCreditsCast[]):iHandleCredits[] | undefined => {
        if (!items || !items.length) return;
        // group by department
        const categories = createCategories(items);
        categories.forEach((category) => {
            // group credits (by year)
            let groups = groupItems(category.groups);
            // get blank group (no year)
            const blankGroup = groups.find(group => group.year === '');
            // remove blank group
            if (blankGroup) groups = groups.filter(group => group.year !== '');
            // sort groups by year
            sortGroups(groups);
            // add blank group to the start
            if (blankGroup) groups.unshift(blankGroup);
            // sort credits in the group by date
            groups.forEach(group => sortCredits(group.credits));
            // set items to the new group
            category.groups = groups;
        });
        return categories;
    }

    const groupItems = (items: combinedCreditsCast[]):iHandleCredits[] => {
        return items.reduce(function (arr: any[], current) {
            const date = current.release_date ? current.release_date : current.first_air_date;
            const year = date ? date.split('-')[0] : '';
            const exists: any = arr.find(item => item.year === year);

            if (exists) {
                exists.credits.push(current);
            } else {
                arr.push({
                    year,
                    credits: [current],
                });
            }
            return arr;
        }, []);
    }

    const sortGroups = (items: iHandleCredits[]):iHandleCredits[] => {
        return items.sort((a, b) => a.year > b.year ? -1 : 1);
    }

    const sortCredits = (items: combinedCreditsCast[]) => {
        // sort items in the group by date
        return items.sort((a, b) => {
            const aDate = a.release_date ? a.release_date : a.first_air_date;
            const bDate = b.release_date ? b.release_date : b.first_air_date;
            if (aDate > bDate) {
                return -1;
            } else if (aDate < bDate) {
                return 1;
            }
            return 0;
        });
    }

    const createCategories = (items: combinedCreditsCast[]) => {
        const categories: any[] = [];
        items.forEach((item) => {
            const exists = categories.find(category => category.name === item.department);
            if (exists) {
                exists.groups.push(item);
            } else {
                categories.push({
                    name: item.department,
                    groups: [item],
                });
            }
        });
        return categories;
    }

    // const getCategories  = () => {
    //     return activeCredits.map(category => category.name);
    // }

    useEffect(() => {
        const cast = handleCast(credits.cast);
        const crew = handleCrew(credits.crew);

        if (cast) {
            setActiveCredits({name: 'Acting', groups: cast});
        }
        if (crew){
            // let tempObject = Object.assign(activeMedia, crew);
            setActiveCredits(prevState => ({
                ...prevState,
                crew,
            }))
        }

    }, [])

    return (
        <>
            <div className="spacing">
                <div className={st.head}>
                    <div className={st.filter}>
                        <label htmlFor="credits_category">
                            Department
                        </label>
                        <div className={st.headDropdown}>
                            <select name="infoVideo_dropdown">
                                <option value="all">All</option>
                                <option value="all">All 2</option>
                                <option value="all">All 3</option>
                                <option value="all">All 4</option>
                            </select>
                            {/*<select name="infoVideo_dropdown" onChange={(event) => filterVideos(event)}>*/}
                            {/*    <option value="all">All</option>*/}
                            {/*    {videoTypes().map((item) => <option value={item} key={item}>{item}</option>)}*/}
                            {/*</select>*/}

                            {/*<strong className={st.headDropdown__count}>*/}
                            {/*    {activeVideos.length} {activeVideos.length > 1 ? "Videos" : "Video"}*/}
                            {/*</strong>*/}
                        </div>
                    </div>
                    <div className={st.filter}>
                        <label htmlFor="credits_category">
                            Media
                        </label>
                        <div className={st.headDropdown}>
                            <select name="infoVideo_dropdown">
                                <option value="all">All</option>
                                <option value="all">All 2</option>
                                <option value="all">All 3</option>
                                <option value="all">All 4</option>
                            </select>
                            {/*<select name="infoVideo_dropdown" onChange={(event) => filterVideos(event)}>*/}
                            {/*    <option value="all">All</option>*/}
                            {/*    {videoTypes().map((item) => <option value={item} key={item}>{item}</option>)}*/}
                            {/*</select>*/}

                            {/*<strong className={st.headDropdown__count}>*/}
                            {/*    {activeVideos.length} {activeVideos.length > 1 ? "Videos" : "Video"}*/}
                            {/*</strong>*/}
                        </div>
                    </div>
                </div>
                <div className={st.category}>
                    <h2 className={st.title}>Acting</h2>

                    <table>
                        <tbody>
                        <CreditsHistoryGroup/>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CreditsHistory;