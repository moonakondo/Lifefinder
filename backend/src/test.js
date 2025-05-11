<<<<<<< HEAD
// For frontend
// const offset = -((new Date().getTimezoneOffset())/60);
const offset = new Date().getTimezoneOffset();
console.log(offset);

// For backend
let date = new Date();
console.log("Original Date: ", date);

let minutesToSubtract = offset;
date.setMinutes(date.getMinutes() - minutesToSubtract);
console.log("Changed Date: ", date);


// 2nd method
// let currentDate = new Date();

// let dayOfMonthUTC = currentDate.toTimeString();
// let hoursUTC = currentDate.getUTCHours();
// let minutesUTC = currentDate.getUTCMinutes();
// let secondsUTC = currentDate.getUTCSeconds();
// let dayOfWeekUTC = currentDate.getUTCDay();
// let yearUTC = currentDate.getUTCFullYear();

// console.log(`UTC Date: ${dayOfMonthUTC}`);
// console.log(`UTC Time: ${hoursUTC}:${minutesUTC}:${secondsUTC}`);
// console.log(`UTC Day of the Week: ${dayOfWeekUTC}`);
// console.log(`UTC Year: ${yearUTC}`);
=======
const now = new Date();
const utcDate = now.toISOString();
console.log(utcDate); // Outputs the current date and time in UTC in ISO 8601 format
>>>>>>> cf12a959ad95dff111e4c48488ce9bd7e24f00c4
