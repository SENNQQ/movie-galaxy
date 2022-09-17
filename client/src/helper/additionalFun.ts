/**
 * Truncate text
 */
import {languages} from "../api/zxc";
import {productionCompaniesType} from "../components/InfoOverview/types";

export const truncate = (text:string, length = 0) => {
    if(text.length < length){
        return text
    }
    else return text.substring(0,length) + "...";
}

/**
 * Format date to full date
 */
export const fullDate = (dateString:string) => {
    const dateArray:string[] = dateString.split('-');
    const date = dateArray[2].substr(0, 1) === '0' ? dateArray[2].substr(1, 1) : dateArray[2];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${date} ${months[dateArray[1].length - 1]} ${dateArray[0]}`;
}

/**
 * Format minutes into hours and mins
 */
export const runtime = (minutes:number) => {
    // seconds
    let secondsLeft = minutes * 60;

    // hours
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    // mins
    const mins = Math.floor(secondsLeft / 60);
    // secondsLeft = secondsLeft % 60;

    return `${hours ? hours + 'h' : ''} ${mins}min`;
}

/**
 * Format number to have commas
 */
export const numberWithCommas = (number:number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format iso_639_1 to full language
 */
export const fullLang = (iso:string) => {
    const fullLang = languages.find(lang => lang.iso_639_1 === iso);

    if (fullLang) {
        return fullLang.english_name;
    }

    return iso;
}

/**
 * Format array to comma separated list
 */
export const arrayToList = (array:productionCompaniesType[]) => {
    return array.map(item => item.name).join(', ');
}