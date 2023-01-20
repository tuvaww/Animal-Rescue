import { useEffect, useState } from "react";
import "../styles/components/account.scss";
import Close from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../redux/models/IState";
import { remove } from "../redux/features/SessionSlice";

interface IBooking {
  _id: String;
  userId: String;
  year: String;
  month: String;
  day: String;
}

interface IAccountProps {
  closeAccount: (set: boolean) => void;
}

export const Account = (props: IAccountProps) => {
  const token = useSelector((state: IState) => state.session.value);

  const dispatch = useDispatch();

  const userId = sessionStorage.getItem("User");
  const [user, setUser] = useState("");
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [email, setEmail] = useState("");

  const [myBookings, setMyBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    if (userId) {
      setUser(userId);
      getUserData();
      getBookings();
    }
  }, [userId]);

  const getUserData = async () => {
    const rawResponse = await fetch("http://localhost:8000/account/get-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ id: userId }),
    });

    const data = await rawResponse.json();

    setFn(data.firstName.toUpperCase());
    setLn(data.lastName.toUpperCase());
    setEmail(data.email.toUpperCase());
  };

  const getBookings = async () => {
    const rawResponse = await fetch(
      "http://localhost:8000/bookings/get-by-user",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({ id: userId }),
      }
    );

    const data = await rawResponse.json();
    setMyBookings(data);
  };

  const closeAccount = () => {
    props.closeAccount(false);
  };

  const removeBooking = async (day: String, month: String, year: String) => {
    const rawResponse = await fetch("http://localhost:8000/bookings/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ id: userId, day, month, year }),
    });

    getBookings();
  };

  const logout = () => {
    dispatch(remove());

    props.closeAccount(false);
  };

  const deleteAccount = async () => {
    const rawResponse = await fetch("http://localhost:8000/account/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ userId }),
    });

    logout();
  };

  const bookingsHTML = myBookings.map((b, i) => {
    return (
      <div key={i} className="bookingContainer">
        <div className="remove">
          <Close
            onClick={() => removeBooking(b.day, b.month, b.year)}
            sx={{ fontSize: "10pt", cursor: "pointer" }}
          ></Close>
        </div>
        <span>
          {b.day} {b.month} {b.year}
        </span>
      </div>
    );
  });

  return (
    <main className="AccountContainer">
      <div className="closeContainer">
        <Close
          sx={{ cursor: "pointer", color: "gray" }}
          onClick={closeAccount}
        ></Close>
      </div>
      <section className="infoContainer">
        <div className="nameContainer">
          {fn} {ln}
        </div>
        <div className="emailC">{email}</div>
      </section>

      <section className="bookingsContainer">
        <div className="handleBookings">
          <span>Handle your bookings: </span>
        </div>

        <div
          className={`${!myBookings.length ? "noBookingsContainer" : "hide"}`}
        >
          <span>You have no bookings!</span>
          <span>Lets help us out !</span>
          <a href="/Schedule">Help at the shelter</a>
        </div>

        {bookingsHTML}
      </section>
      <section className="buttonContainer">
        <button type="button" onClick={logout}>
          LOGOUT
        </button>

        <button type="button" onClick={deleteAccount}>
          DELETE ACCOUNT
        </button>
      </section>
    </main>
  );
};
