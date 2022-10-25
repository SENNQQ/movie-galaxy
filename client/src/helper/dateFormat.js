export function formatAMPM(dateTimeStamp) {
    let date = new Date(dateTimeStamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return date.toLocaleString('en-US', { month: 'short' }) + ' ' + date.getDate() + ', ' +hours + ':' + minutes + ' ' + ampm ;
}