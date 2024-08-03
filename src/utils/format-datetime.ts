export const formatDateFromArray = (dateArray: number[]) => {
    const [year, month, day, hour, minute, second, millisecond] = dateArray;
    
    console.log(year, month, day);
    // Create a new Date object using the array elements
    const date = new Date(year, month-1, day, hour, minute, second, millisecond);
    console.log(date);
    // Calculate the difference in milliseconds between now and the provided date
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    
    // Calculate the difference in days
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
    // Format the date based on the difference
    if (diffInDays > 0) {
        return `hơn ${diffInDays} ngày trước`;
    } else {
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
};
