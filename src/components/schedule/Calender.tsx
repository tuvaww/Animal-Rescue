import { useEffect, useState } from "react";
import { IBooking } from "../../interfaces/IBooking";
import "../../styles/components/calender.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
interface IDay {
  day: Number;
  book: String;
}

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

  const [monthToday, setMonthToday] = useState("");
  const [yearToday, setYearToday] = useState(0);
  const [dayToday, setDayToday] = useState(0);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [weekDaysInOrder, setWeekDaysInOrder] = useState<String[]>([]);

  const [month, setMonth] = useState("");
  const [monthAsNumber, setMonthAsNumber] = useState(0);
  const [year, setYear] = useState(0);

  const [startWeekDay, setStartWeekDay] = useState("");
  const [endWeekDay, setEndWeekDay] = useState("");

  const [lastDayOfMonth, setLastDayOfMonth] = useState("");
  const firstDayOfMonth = 1;

  const [allDaysOfMonth, setAllDaysOfMonth] = useState<IDay[]>([]);

  const [bookingsForMonth, setBookingsForMonth] = useState<IBooking[]>([]);

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

  useEffect(() => {
    if (month && year) {
      getAllBookingsForCurrentMonth();
    }
  }, [month, year]);

  useEffect(() => {
    checkIfDayIsBooked();
  }, [bookingsForMonth]);

  const checkIfDayIsBooked = () => {
    let copyOfDays = [...allDaysOfMonth];

    bookingsForMonth.map((b) => {
      copyOfDays.map((d) => {
        if (+b.year === year && b.month === month && d.day === +b.day) {
          let index = copyOfDays.indexOf(d);

          let newD: IDay = { day: d.day, book: "F" };
          copyOfDays.splice(index, 1, newD);
          setAllDaysOfMonth(copyOfDays);
        }
      });
    });
  };

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
      const day: IDay = { day: i, book: "+" };
      days.push(day);
    }
    setAllDaysOfMonth(days);
  };

  const getCurrentDate = () => {
    if (!month) {
      const date = new Date();

      let todaysDay = date.getDate();
      setDayToday(todaysDay);

      let getCurrentMonth = date.getMonth();

      let currentMonth = months[getCurrentMonth];

      setMonthToday(currentMonth);

      setMonth(currentMonth);
      setMonthAsNumber(getCurrentMonth);
      let getCurrentYear = date.getFullYear();
      setYear(getCurrentYear);
      setYearToday(getCurrentYear);
      let startDate = new Date(year, monthAsNumber, 1);
      let firstWeekDay = startDate.toString().slice(0, -63);

      setStartWeekDay(firstWeekDay);

      let lastDate = new Date(year, monthAsNumber + 1, 0);
      let lastWeekDay = lastDate.toString().slice(0, -63);
      setEndWeekDay(lastWeekDay);

      let lastDateDay = lastDate.toString().slice(8, -55);
      setLastDayOfMonth(lastDateDay);
    } else {
      return;
    }
  };

  const getAllBookingsForCurrentMonth = async () => {
    const rawResponse = await fetch(
      "http://localhost:8000/bookings/Get-bookings",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({ month, year }),
      }
    );
    const data = await rawResponse.json();
    setBookingsForMonth(data);
  };

  const addBooking = async (day: string) => {
    const loggedInUser = sessionStorage.getItem("User");

    await fetch("http://localhost:8000/bookings/Book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ user: loggedInUser, year, month, day }),
    });

    getAllBookingsForCurrentMonth();
  };

  const handleLeftArrow = () => {
    let index = months.indexOf(month);

    if (index - 1 === -1) {
      let lastMonth = months[11];

      setMonth(lastMonth);
      setYear(year - 1);
    } else {
      let lastMonth = months[index - 1];
      setMonth(lastMonth);
    }
  };

  const handleRightArrow = () => {
    let index = months.indexOf(month);

    if (index + 1 === 12) {
      let nextMonth = months[0];

      setMonth(nextMonth);
      setYear(year + 1);
    } else {
      let nextMonth = months[index + 1];
      setMonth(nextMonth);
    }
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
        <div
          onClick={() => addBooking(d.day.toString())}
          className={`${
            d.book === "F" ||
            (d.day < dayToday && month === monthToday && year === yearToday)
              ? "hide"
              : "bookDay"
          }`}
        >
          {d.book}
        </div>
        <p>{d.day.toString()}</p>
      </div>
    );
  });

  return (
    <section className="caldendarContainer">
      <section className="calender">
        <article className="monthNYear">
          {month !== monthToday && year === yearToday && (
            <KeyboardArrowLeftIcon
              onClick={handleLeftArrow}
            ></KeyboardArrowLeftIcon>
          )}

          <p>{month}</p>
          <p>{year}</p>

          <KeyboardArrowRightIcon
            onClick={handleRightArrow}
          ></KeyboardArrowRightIcon>
        </article>
        <article className="nameOfDays">{WeekDaysHtml}</article>
        <article className="daysDisplayed">{daysInMonthHtml}</article>
      </section>
    </section>
  );
};
