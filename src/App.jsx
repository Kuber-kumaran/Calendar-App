import "./App.css";
import React, { useState } from "react";

import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const specialDate = new Date(selectedDate.getFullYear(), 2, 10); // March 10th

  
  


  const daysInMonth = () => {
    const daysArray = [];

    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i)
      );
    }

    console.log(firstDay);
    console.log(lastDay);

    return daysArray;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleChangeMonth = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleChangeYear = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
  };

  return (
    <>
      <div className="calendar w-[700px] bg-green-400 rounded-lg my-10 mx-auto p-2 shadow-md">
        <div className="uppercase font-bold text-2xl text-white text-center p-2">
          React Calendar
        </div>
        <div className="header flex justify-between items-center bg-orange-500 text-white p-2  ">
          <button
            className=""
            onClick={() => {
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1,
                  1
                )
              );
            }}
          >
            <FaCircleArrowLeft />
          </button>
          <select
            className="text-slate-900 py-0 px-2 rounded-sm outline-none"
            value={selectedDate.getMonth()}
            onChange={handleChangeMonth}
          >
            {months.map((month, index) => (
              <option
                className="bg-black  text-white"
                key={index}
                value={index}
              >
                {month}
              </option>
            ))}
          </select>
          <select
            className="text-slate-900 py-0 px-2 rounded-sm outline-none"
            value={selectedDate.getFullYear()}
            onChange={handleChangeYear}
          >
            {Array.from(
              { length: 10 },
              (_, i) => selectedDate.getFullYear() - 5 + i
            ).map((year) => (
              <option className="bg-black  text-white" key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1,
                  1
                )
              );
            }}
          >
            <FaCircleArrowRight />
          </button>
        </div>
        <div className="weekdays grid grid-cols-7 text-center text-sm font-semibold py-4  bg-orange-500 text-green-600 mb-2">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days grid grid-cols-7 gap-2 text-center font-bold text-orange-600">
          {daysInMonth().map((day, index) => (
            <div
            className={
              day
                ? isSameDay(day, new Date())
                  ? "currentDay bg-lime-400 px-4 py-2 border-2 rounded cursor-pointer "
                  : isSameDay(day, specialDate)
                  ? "specialDay px-4 py-2 border-2 bg-blue-500 text-white rounded cursor-pointer"
                  : "day px-4 py-2 border-2 bg-orange-500 text-green-600 hover:bg-green-600 hover:text-orange-500 rounded cursor-pointer"
                : "empty px-4 py-2 border bg-orange-400 rounded "
            }
              key={index}
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
