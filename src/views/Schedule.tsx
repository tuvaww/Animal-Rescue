import { Calender } from "../components/schedule/Calender";
import "../styles/views/schedule.scss";

export const Schedule = () => {
  return (
    <main className="scheduleMainContainer">
      <div className="headerContainer">
        <p>Book the day you want to volonteer</p>
      </div>
      <Calender></Calender>
    </main>
  );
};
