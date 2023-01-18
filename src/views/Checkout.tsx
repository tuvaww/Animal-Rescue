import { ChangeEvent, useEffect, useState } from "react";
import { IAnimal } from "../interfaces/IAnimal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "../styles/views/checkout.scss";
import { PopupModal } from "../components/reusables/PopupModal";
export const Checkout = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [requestIsSent, setRequestIsSent] = useState(false);

  useEffect(() => {
    getAnimals();
  }, []);

  const getAnimals = () => {
    const storageAnimals = JSON.parse(
      sessionStorage.getItem("Animals") || "[]"
    );

    setAnimals(storageAnimals);
  };

  const removeFromAdoptList = (animal: IAnimal) => {
    let listFromStorage = JSON.parse(sessionStorage.getItem("Animals") || "[]");

    let copy: IAnimal[] = [...listFromStorage];

    if (animal) {
      let index = copy.indexOf(animal);

      copy.splice(index, 1);

      sessionStorage.setItem("Animals", JSON.stringify(copy));
    }

    getAnimals();
  };

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const sendRequest = async () => {
    await fetch("http://localhost:8000/bookings/create-request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ firstName, lastName, email, phone, animals }),
    });

    setRequestIsSent(true);

    sessionStorage.setItem("Animals", JSON.stringify("[]"));
  };

  /*   const getAnimalsHTML = () => {
    if (animals.length) {
      return animals?.map((a) => {
        return (
          <article className="itemContainer">
            <div className="imgContainer">
              <img src={require(`../assets/${a.img[0]}`)} alt="a.name" />
            </div>

            <p>{a.name}</p>
            <p>{a.breed}</p>

            <DeleteForeverIcon
              sx={{
                cursor: "pointer",
                color: "rgba(255, 0, 0, 0.647)",
                fontSize: "20pt",
              }}
              onClick={() => removeFromAdoptList(a)}
            ></DeleteForeverIcon>
          </article>
        );
      });
    } else {
      return (
        <section className="noAnimals">
          <span>You have not added any animals</span>
        </section>
      );
    }
  }; */

  return (
    <main className="checkoutContainer">
      <section className="headerContainer">
        <p className="header">Checkout</p>
        <span className="secondHeader">
          Proceed to checkout and we will contact you to make an apointment for
          you to see the animals you would like to adopt !
        </span>
      </section>
      <section className="animalsContainer">{/* getAnimalsHTML */}</section>

      <section className="formContainer">
        <form onSubmit={(e) => e.preventDefault()}>
          <p>Details</p>

          <div className="divider">
            <label htmlFor="fn">First name:</label>
            <input
              onChange={handleFirstName}
              value={firstName}
              type="text"
              id="fn"
              placeholder="First name..."
            />
          </div>

          <div className="divider">
            <label htmlFor="ln">Last name:</label>
            <input
              onChange={handleLastName}
              value={lastName}
              type="text"
              id="ln"
              placeholder="Last name..."
            />
          </div>

          <div className="divider">
            <label htmlFor="mail">Email:</label>
            <input
              onChange={handleEmail}
              value={email}
              type="email"
              id="mail"
              placeholder="Email..."
            />
          </div>

          <div className="divider">
            <label htmlFor="phone">Phone:</label>
            <input
              onChange={handlePhone}
              value={phone}
              type="phone"
              id="phone"
              placeholder="Phone..."
            />
          </div>
        </form>
      </section>

      <section className="buttonContainer">
        <button type="button" onClick={sendRequest}>
          Proceed
        </button>
      </section>

      <div className={requestIsSent ? "popupContainer" : "hide"}>
        <PopupModal
          header="Your request has been sent"
          body="Someone at the shelter will give you a call as fast as we can ! We hope you will find your bestfriend here at the shelter and give the animal what it deserves ! Thank you !"
          navUrl="/"
        ></PopupModal>
      </div>
    </main>
  );
};
