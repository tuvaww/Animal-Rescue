import { useDispatch, useSelector } from "react-redux";
import { PopupModal } from "../components/reusables/PopupModal";
import { Calender } from "../components/schedule/Calender";
import { IState } from "../redux/models/IState";
import "../styles/views/schedule.scss";

export const Schedule = () => {
  const token = useSelector((state: IState) => state.session.value);
  const dispatch = useDispatch();

  return (
    <main className="scheduleMainContainer">
      <div className={`${token ? "hide" : "notPermitted"}`}>
        <PopupModal
          header="Not permitted"
          body="You need to login to use this part of the site."
          navUrl="/Login"
        ></PopupModal>
      </div>
      <div className="headerContainer">
        <p>Book the day you want to volonteer</p>
      </div>
      <Calender></Calender>
    </main>
  );
};
