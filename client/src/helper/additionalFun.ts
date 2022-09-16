
export const truncate = (text:string, length = 0) => {
    if(text.length < length){
        return text
    }
    else return text.substring(0,length) + "...";
};