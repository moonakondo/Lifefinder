// function adjustAvailability(availability, minutesAdjustment) {
//     const adjustedAvailability = {};

//     const parseTime = (timeStr) => {
//         const [hours, minutes] = timeStr.split(':').map(Number);
//         return new Date(1970, 0, 1, hours, minutes);
//     };

//     const formatTime = (date) => {
//         const hours = String(date.getHours()).padStart(2, '0');
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     const getNextDay = (day) => {
//         const dayIndex = daysOfWeek.indexOf(day);
//         return daysOfWeek[(dayIndex + 1) % 7];
//     };

//     const getPreviousDay = (day) => {
//         const dayIndex = daysOfWeek.indexOf(day);
//         return daysOfWeek[(dayIndex + 6) % 7];
//     };

//     for (const [day, times] of Object.entries(availability)) {
//         let [startTime, endTime] = times.map(parseTime);

//         let adjustedStartTime = new Date(startTime);
//         let adjustedEndTime = new Date(endTime);
        
//         adjustedStartTime.setMinutes(startTime.getMinutes() + minutesAdjustment);
//         adjustedEndTime.setMinutes(endTime.getMinutes() + minutesAdjustment);

//         // Handling overflow for start time
//         if (adjustedStartTime.getDate() !== startTime.getDate()) {
//             const previousDay = getPreviousDay(day);
//             if (!adjustedAvailability[previousDay]) {
//                 adjustedAvailability[previousDay] = ["00:00", "23:59"];
//             }
//             adjustedStartTime = new Date(1970, 0, 1, 23, 59);
//         }

//         // Handling underflow for start time
//         if (adjustedStartTime.getDate() < startTime.getDate()) {
//             const previousDay = getPreviousDay(day);
//             if (!adjustedAvailability[previousDay]) {
//                 adjustedAvailability[previousDay] = ["00:00", "23:59"];
//             }
//             adjustedAvailability[previousDay][1] = formatTime(new Date(1970, 0, 1, 23, 59));
//             adjustedStartTime = new Date(1970, 0, 1, 0, 0);
//         }

//         // Handling overflow for end time
//         if (adjustedEndTime.getDate() !== endTime.getDate()) {
//             const nextDay = getNextDay(day);
//             if (!adjustedAvailability[nextDay]) {
//                 adjustedAvailability[nextDay] = ["00:00", "00:00"];
//             }
//             adjustedAvailability[nextDay][0] = formatTime(new Date(1970, 0, 1, 0, 0));
//             adjustedEndTime = new Date(1970, 0, 1, 23, 59);
//         }

//         // Handling underflow for end time
//         if (adjustedEndTime.getDate() < endTime.getDate()) {
//             const previousDay = getPreviousDay(day);
//             if (!adjustedAvailability[previousDay]) {
//                 adjustedAvailability[previousDay] = ["00:00", "23:59"];
//             }
//             adjustedAvailability[previousDay][1] = formatTime(new Date(1970, 0, 1, 23, 59));
//             adjustedEndTime = new Date(1970, 0, 1, 0, 0);
//         }

//         adjustedAvailability[day] = [
//             formatTime(adjustedStartTime),
//             formatTime(adjustedEndTime)
//         ];
//     }

//     return adjustedAvailability;
// }

// // Example usage:
// const availability = {
//     "Friday": ["00:00", "23:00"],
//     "Saturday": ["00:00", "23:59"]
// };

// const minutesAdjustment = -120; // Adjust by -120 minutes
// const newAvailability = adjustAvailability(availability, minutesAdjustment);
// console.log(newAvailability);





// function adjustAvailability(availability, minutesAdjustment) {
//     const adjustedAvailability = {};

//     const parseTime = (timeStr) => {
//         const [hours, minutes] = timeStr.split(':').map(Number);
//         return new Date(1970, 0, 1, hours, minutes);
//     };

//     const formatTime = (date) => {
//         const hours = String(date.getHours()).padStart(2, '0');
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     const getNextDay = (day) => {
//         const dayIndex = daysOfWeek.indexOf(day);
//         return daysOfWeek[(dayIndex + 1) % 7];
//     };

//     const getPreviousDay = (day) => {
//         const dayIndex = daysOfWeek.indexOf(day);
//         return daysOfWeek[(dayIndex + 6) % 7];
//     };

//     for (const [day, times] of Object.entries(availability)) {
//         let [startTime, endTime] = times.map(parseTime);

//         let adjustedStartTime = new Date(startTime);
//         let adjustedEndTime = new Date(endTime);
        
//         adjustedStartTime.setMinutes(startTime.getMinutes() + minutesAdjustment);
//         adjustedEndTime.setMinutes(endTime.getMinutes() + minutesAdjustment);

//         // Handling overflow for end time
//         if (adjustedEndTime.getDate() > endTime.getDate()) {
//             const nextDay = getNextDay(day);
//             if (!adjustedAvailability[nextDay]) {
//                 adjustedAvailability[nextDay] = ["00:00", "00:00"];
//             }
//             adjustedAvailability[nextDay][0] = "00:00";
//             const overflowMinutes = adjustedEndTime.getMinutes();
//             adjustedAvailability[nextDay][1] = formatTime(new Date(1970, 0, 1, 0, overflowMinutes));
//             adjustedEndTime = new Date(1970, 0, 1, 23, 59);
//         }

//         // Handling negative overflow for start time
//         if (adjustedStartTime.getDate() < startTime.getDate()) {
//             const previousDay = getPreviousDay(day);
//             if (!adjustedAvailability[previousDay]) {
//                 adjustedAvailability[previousDay] = ["00:00", "23:59"];
//             }
//             adjustedAvailability[previousDay][1] = "23:59";
//             adjustedStartTime = new Date(1970, 0, 1, 0, 0);
//         }

//         // Correct handling for subtraction case
//         if (adjustedStartTime > adjustedEndTime) {
//             const previousDay = getPreviousDay(day);
//             if (!adjustedAvailability[previousDay]) {
//                 adjustedAvailability[previousDay] = ["00:00", "23:59"];
//             }
//             adjustedAvailability[previousDay][0] = formatTime(new Date(1970, 0, 1, 24 + adjustedStartTime.getHours(), adjustedStartTime.getMinutes()));
//             adjustedStartTime = new Date(1970, 0, 1, 0, 0);
//         }

//         adjustedAvailability[day] = [
//             formatTime(adjustedStartTime),
//             formatTime(adjustedEndTime)
//         ];
//     }

//     // Adjust for the overflow to the previous day
//     for (const day of Object.keys(adjustedAvailability)) {
//         const [startTime, endTime] = adjustedAvailability[day].map(parseTime);
//         if (startTime > endTime) {
//             const previousDay = getPreviousDay(day);
//             if (!adjustedAvailability[previousDay]) {
//                 adjustedAvailability[previousDay] = ["00:00", "23:59"];
//             }
//             adjustedAvailability[previousDay][1] = "23:59";
//             adjustedAvailability[day][0] = "00:00";
//         }
//     }

//     return adjustedAvailability;
// }

// // Example usage:
// const availability = {
//     "Friday": ["00:00", "23:00"],
//     "Saturday": ["00:00", "23:59"]
// };

// const minutesAdjustment = -120; // Adjust by -120 minutes
// const newAvailability = adjustAvailability(availability, minutesAdjustment);
// console.log(newAvailability);


const availability = {
  "Friday": ["00:00", "23:00"],
  "Saturday": ["00:00", "23:59"]
};

// Function to convert time string to minutes since midnight
function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Function to convert minutes since midnight to time string
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const minutesRemaining = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutesRemaining).padStart(2, '0')}`;
}

// Function to convert availability to a different GMT offset
function convertAvailabilityToGMTOffset(availability, offset) {
  const days = Object.keys(availability);
  const result = {};

  days.forEach(day => {
    const [start, end] = availability[day];
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    // Calculate new times
    const newStartMinutes = (startMinutes + offset * 60 + 1440) % 1440;
    const newEndMinutes = (endMinutes + offset * 60 + 1440) % 1440;

    const newStartDay = newStartMinutes < startMinutes ? getNextDay(day) : day;
    const newEndDay = newEndMinutes < endMinutes ? getNextDay(day) : day;

    result[newStartDay] = result[newStartDay] || [];
    result[newEndDay] = result[newEndDay] || [];

    if (newStartDay === day) {
      result[newStartDay][0] = minutesToTime(newStartMinutes);
    } else {
      result[newStartDay].push(minutesToTime(newStartMinutes));
    }

    if (newEndDay === day) {
      result[newEndDay][1] = minutesToTime(newEndMinutes);
    } else {
      result[newEndDay].push(minutesToTime(newEndMinutes));
    }
  });

  return result;
}

// Function to get the next day of the week
function getNextDay(day) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const index = days.indexOf(day);
  return days[(index + 1) % 7];
}

// Convert availability to GMT+5
const gmtPlus5Availability = convertAvailabilityToGMTOffset(availability, 5);
console.log("GMT+5 Availability:", gmtPlus5Availability);

// Convert availability to GMT-2
const gmtMinus2Availability = convertAvailabilityToGMTOffset(availability, -2);
console.log("GMT-2 Availability:", gmtMinus2Availability);
