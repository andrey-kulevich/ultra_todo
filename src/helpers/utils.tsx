export const getCurrentDate = () : string => {
    return new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' +
        new Date().getDate().toString().padStart(2, '0')
}

export const daysBetween = (firstDate: string, secondDate: string) : number => {
    let millisecondsPerDay = 1000 * 60 * 60 * 24
    let millisBetween = new Date(secondDate).getTime() - new Date(firstDate).getTime()
    let days = millisBetween / millisecondsPerDay
    return Math.floor(days)
}

// export const dateToDayWithMonth = () : string => {
//
// }
