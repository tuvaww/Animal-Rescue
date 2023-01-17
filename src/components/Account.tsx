import { useEffect, useState } from "react";
import "../styles/components/account.scss";

interface IBooking {
  _id: String;
  userId: String;
  year: String;
  month: String;
  day: String;
}

export const Account = () => {
  const userId = sessionStorage.getItem("User");

  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [email, setEmail] = useState("");

  const [myBookings, setMyBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    getUserData();
    getBookings();
  }, []);

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

    //  console.log(data);
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
    console.log(data);
    setMyBookings(data);
  };

  const bookingsHTML = myBookings.map((b, i) => {
    return (
      <div key={i} className="bookingContainer">
        <span>
          {b.day} {b.month} {b.year}
        </span>
      </div>
    );
  });

  return (
    <main className="AccountContainer">
      <section className="infoContainer">
        <div className="nameContainer">
          {fn} {ln}
        </div>
        <div>{email}</div>
      </section>

      <section className="bookingsContainer">{bookingsHTML}</section>
      <section className="buttonContainer">
        <button type="button">LOGOUT</button>

        <button type="button">DELETE ACCOUNT</button>
      </section>
    </main>
  );
};
