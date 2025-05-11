import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CustomDayPicker = ({ onChange }) => {
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        onChange(day);
    };

    return (
        <DayPicker
            mode="single"
            selected={selectedDay}
            onDayClick={handleDayClick}
            modifiersClassNames={{
                selected: 'bg-blue-500 text-white',
            }}
            weekStartsOn={1} // Start week on Monday
            fixedWeeks
        />
    );
};

export default CustomDayPicker;
