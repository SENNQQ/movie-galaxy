import React, {FC, useEffect, useRef, useState} from 'react';
import st from "./CreditsHistory.module.scss"
import CreditsHistoryGroup from "../CreditsHistoryGroup";
import {CreditsHistoryPropsType} from "./types";
import {CastUnitedCrew} from "../../../types/MoviePageTypes";

interface iActiveMedia {
    name: string,
    groups: iHandleCredits[]
}

interface iHandleCredits {
    year: string,
    credits: CastUnitedCrew[]
}

const CreditsHistory: FC<CreditsHistoryPropsType> = ({credits}) => {

    const [activeMedia, setActiveMedia] = useState<iActiveMedia[]>([{groups: [], name: ""}]);
    const [activeCredits, setActiveCredits] = useState<iActiveMedia[]>([{groups: [], name: ""}]);

    const categoryFilterRef = useRef<HTMLSelectElement>(null);
    const mediaFilterRef = useRef<HTMLSelectElement>(null);

    const [category, setCategory] = useState<string[]>([]);

    const handleCast = (items: CastUnitedCrew[]): iHandleCredits[] | undefined => {
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

    const handleCrew = (items: CastUnitedCrew[]): iActiveMedia[] | undefined => {
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

    const groupItems = (items: CastUnitedCrew[]): iHandleCredits[] => {
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

    const sortGroups = (items: iHandleCredits[]): iHandleCredits[] => {
        return items.sort((a, b) => a.year > b.year ? -1 : 1);
    }

    const sortCredits = (items: CastUnitedCrew[]) => {
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

    const createCategories = (items: CastUnitedCrew[]) => {
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

    const getCategories = () => {
        return activeMedia.map(category => category.name);
    }

    useEffect(() => {
        const cast = handleCast(credits.cast);
        const crew = handleCrew(credits.crew);

        if (cast) {
            setActiveMedia([{name: 'Acting', groups: cast}]);
            setActiveCredits([{name: 'Acting', groups: cast}]);
        }
        if (crew) {
            setActiveMedia(prevState => [...prevState, ...crew]);
            setActiveCredits(prevState => [...prevState, ...crew]);
        }

    }, [])

    useEffect(() => {
        setCategory(getCategories());
    }, [activeCredits])

    const filterCredits = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === 'all') {
            setActiveMedia(activeCredits);
        } else {
            setActiveMedia(activeCredits.filter(category => category.name.toLowerCase() === event.currentTarget.value.toLowerCase()))
        }
    }

    //TODO сделать потом сортировку истории по media

    // const getCredits = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    //
    //     if (event.currentTarget.value === 'all') {
    //         setActiveMedia(activeCredits);
    //         categoryFilterRef.current!.selectedIndex = 0;
    //     }
    //     else {
    //         let temp = activeCredits.map(category => category.groups.map((group) => {
    //
    //             return group.credits.filter((credit) => {
    //
    //             return credit.media_type.toLowerCase() === event.currentTarget.value.toLowerCase()
    //         })}))
    //         console.log(temp)
    //         console.log(activeCredits.filter(category =>
    //             category.groups.filter((group) => group.credits.filter((credit) =>
    //             credit.media_type.toLowerCase() === event.currentTarget.value.toLowerCase()))))
    //     }
    //
    //
    // }

    return (
        <>
            <div className="spacing">
                <div className={st.head}>
                    <div className={st.filter}>
                        <label htmlFor="credits_category">
                            Department
                        </label>
                        <div className={"headDropdown"}>

                            <select name="infoVideo_dropdown"
                                    onChange={(event) => filterCredits(event)}
                                    ref={categoryFilterRef}
                                    disabled={!category.length || category.length === 1}>
                                <option value="all">All</option>
                                {category.map((item) =>
                                    <option value={item} key={item}>{item}</option>)
                                }
                            </select>

                        </div>
                    </div>
                    {/*<div className={st.filter}>*/}
                    {/*    <label htmlFor="credits_category">*/}
                    {/*        Media*/}
                    {/*    </label>*/}
                    {/*    <div className={"headDropdown"}>*/}
                    {/*        <select name="infoVideo_dropdown"*/}
                    {/*                ref={mediaFilterRef}>*/}
                    {/*            <option value="all">*/}
                    {/*                All*/}
                    {/*            </option>*/}
                    {/*            <option value="movie">*/}
                    {/*                Movies*/}
                    {/*            </option>*/}
                    {/*            <option value="tv">*/}
                    {/*                TV Shows*/}
                    {/*            </option>*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {activeMedia.map((category) => (
                    <div className={st.category} key={`credits-${category.name.toLowerCase()}`}>
                        <h2 className={st.title}>{category.name}</h2>
                        <table>
                            <tbody>
                            {category.groups.map((groups) => (
                                <CreditsHistoryGroup
                                    key={`credit-${category.name.toLowerCase()}-${groups.year}`}
                                    groups={groups}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ))}

            </div>
        </>
    );
};

export default CreditsHistory;