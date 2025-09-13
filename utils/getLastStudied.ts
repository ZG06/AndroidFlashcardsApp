import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInYears } from "date-fns";
import { Timestamp } from "firebase/firestore";


export const getLastStudied = (createdAt: Timestamp, lastStudied: Timestamp) => {
    if (!createdAt || !lastStudied) return 'Never';

    const now = new Date()
    const lastStudiedDate = lastStudied.toDate();

    const minsDiff = differenceInMinutes(now, lastStudiedDate);
    const hoursDiff = differenceInHours(now, lastStudiedDate);
    const daysDiff = differenceInDays(now, lastStudiedDate);
    const monthsDiff = differenceInMonths(now, lastStudiedDate);
    const yearsDiff = differenceInYears(now, lastStudiedDate);
    
    if (minsDiff < 1) return 'Just now';
    if (minsDiff < 60) return `${minsDiff} minute${minsDiff === 1 ? '' : 's'} ago`;
    if (hoursDiff < 24) return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`;
    if (daysDiff < 30) return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
    if (monthsDiff < 12) return `${monthsDiff} month${monthsDiff === 1 ? '' : 's'} ago`;
    return `${yearsDiff} year${yearsDiff === 1 ? '' : 's'} ago`;
}