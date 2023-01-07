import { useEffect, useState } from "react";
import "../../styles/components/calender.scss";
export const Calender = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [weekDaysInOrder, setWeekDaysInOrder] = useState<String[]>([]);

  const [month, setMonth] = useState("");
  const [monthAsNumber, setMonthAsNumber] = useState(0);
  const [year, setYear] = useState(0);

  const [startWeekDay, setStartWeekDay] = useState("");
  const [endWeekDay, setEndWeekDay] = useState("");

  const [lastDayOfMonth, setLastDayOfMonth] = useState("");
  const firstDayOfMonth = 1;

  const [allDaysOfMonth, setAllDaysOfMonth] = useState<number[]>([]);

  console.log("startWeekDay", startWeekDay);

  useEffect(() => {
    getCurrentDate();
    getAllDaysOfTheMonth();
  }, [month]);

  useEffect(() => {
    getAllDaysOfTheMonth();
  }, [lastDayOfMonth]);

  useEffect(() => {
    getWeekDaysInOrderByMonth();
  }, [startWeekDay]);

  const getWeekDaysInOrderByMonth = () => {
    let copyWeekDays = [...weekDays];
    let newOrder = [];
    let indexOfStartWeekDay = weekDays.indexOf(startWeekDay);

    if (indexOfStartWeekDay > 0) {
      let removeToIndex = copyWeekDays.splice(0, indexOfStartWeekDay);

      let removeRemovedDays = copyWeekDays.filter((d) => {
        for (let i = 0; i < removeToIndex.length; i++) {
          return d !== removeToIndex[i];
        }
      });

      newOrder.push(...removeRemovedDays);
      newOrder.push(...removeToIndex);
      setWeekDaysInOrder(newOrder);
    } else {
      setWeekDaysInOrder(copyWeekDays);
    }
  };

  const getAllDaysOfTheMonth = () => {
    let days = [];

    for (let i = 1; i <= +lastDayOfMonth; i++) {
      days.push(i);
    }
    setAllDaysOfMonth(days);
  };

  const getCurrentDate = () => {
    const date = new Date();

    let getCurrentMonth = date.getMonth();

    let currentMonth = months[getCurrentMonth];

    setMonth(currentMonth);
    setMonthAsNumber(getCurrentMonth);
    let getCurrentYear = date.getFullYear();
    setYear(getCurrentYear);

    let startDate = new Date(year, monthAsNumber, 1);
    let firstWeekDay = startDate.toString().slice(0, -63);

    setStartWeekDay(firstWeekDay);

    let lastDate = new Date(year, monthAsNumber + 1, 0);
    let lastWeekDay = lastDate.toString().slice(0, -63);
    setEndWeekDay(lastWeekDay);

    let lastDateDay = lastDate.toString().slice(8, -55);
    setLastDayOfMonth(lastDateDay);
  };

  const WeekDaysHtml = weekDaysInOrder.map((d, i) => {
    return (
      <div key={i} className="nameOfDay">
        {d}
      </div>
    );
  });

  const daysInMonthHtml = allDaysOfMonth.map((d, i) => {
    return (
      <div className="dayInMonth" key={i}>
        <p>{d}</p>
      </div>
    );
  });

  return (
    <section className="caldendarContainer">
      <section className="calender">
        <article className="monthNYear">
          <p>{month}</p>
          <p>{year}</p>
        </article>
        <article className="nameOfDays">{WeekDaysHtml}</article>
        <article className="daysDisplayed">{daysInMonthHtml}</article>
      </section>
    </section>
  );
};
