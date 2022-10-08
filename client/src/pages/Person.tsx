import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getPerson} from "../api/zxc";
import {combinedCreditsCast, imageProps, peopleProps} from "../types/MoviePageTypes";
import PersonInfo from "../components/PersonInfo";
import MediaNav from "../components/NavPerson";
import Listing from "../components/Listing";
import PhotosBlock from "../components/PhotosBlock";
import CreditsHistory from "../components/CreditsHistory";


const Person = () => {

    const params = useParams();

    const [person, setPerson] = useState<peopleProps>();
    const [imagePerson, setImagePerson] = useState<imageProps[]>();
    const [knowFor, setKnowFor] = useState<combinedCreditsCast[]>();

    const [menu, setMenu] = useState<string[]>([]);
    const [tab, setTab] = useState<string>("known-for")

    useEffect(() => {
        const fetchData = async () => {
            const person = await getPerson(params.id);
            return {person}
        }
        fetchData().then(response => {
            setPerson(response.person);
            setImagePerson(response.person.images.profiles)
        })

    }, [params.id])

    useEffect(() => {
        createMenu();
        initKnownFor();
    }, [person])

    const createMenu = () => {
        let tempMenu = [];
        tempMenu.push('Known For');
        tempMenu.push('Credits');

        if (showImages())
            tempMenu.push('Photos');

        setMenu(tempMenu);
    }

    const initKnownFor = () => {
        if (person) {
            // if recommendations don't exist, retreive them
            if (knowFor !== undefined)
                return;
            const department = person.known_for_department;
            let results;
            if (department === 'Acting') {
                results = person.combined_credits.cast;
            } else if (department === 'Directing') {
                results = person.combined_credits.crew.filter(item => item.department === 'Directing');
            } else if (department === 'Production') {
                results = person.combined_credits.crew.filter(item => item.department === 'Production');
            } else if (department === 'Writing' || department === 'Creator') {
                results = person.combined_credits.crew.filter(item => item.department === 'Writing');
            }

            // if no results, return
            if (!results) return;

            results = removeDuplicates(results);

            // sort by popularity
            results.sort((a, b) => a.vote_count > b.vote_count ? -1 : 1);

            setKnowFor(results);
        }
    }

    const removeDuplicates = (myArr: combinedCreditsCast[]) => {
        return myArr.filter((obj, pos, arr) => {
            const prop = obj.title ? 'title' : 'name';
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    const showImages = (): number | null => {
        if (person) {
            const images = person.images;
            return images && (images.profiles && images.profiles.length);
        }
        return null
    }

    const navClicked = (label: string): void => {
        setTab(label);
    }

    return (
        <>
            {person && <PersonInfo person={person}/>}
            {menu.length > 0 && <MediaNav menu={menu} changeTabHandler={navClicked}/>}
            {tab === "known-for" && knowFor && <Listing items={knowFor}/>}
            {tab === "credits"  && person && <CreditsHistory credits={person.combined_credits}/>}
            {tab === "photos" && imagePerson && <PhotosBlock title={"Photos"} image={imagePerson} type={"posters"}/>}
        </>
    );
};

export default Person;