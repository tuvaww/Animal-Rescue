import { ChangeEvent, useEffect, useState } from "react";
import { PopupModal } from "../components/reusables/PopupModal";
import { validateEmail } from "../services/Validation";
import "../styles/layout/form.scss";
export const Donate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cardholder, setCardholder] = useState("");

  const userId = sessionStorage.getItem("User");
  const [submit, setSubmit] = useState(false);

  const [emailIsCorrect, setEmailIsCorrect] = useState(false);
  const [cardnumberIsCorrect, setCardnumberIsCorrect] = useState(false);
  const [cvcIsCorrect, setCvcIsCorrect] = useState(false);
  const [startLoader, setStartLoader] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (email) {
      let emailValidate = validateEmail(email);
      setEmailIsCorrect(emailValidate);
    }
  }, [email]);

  useEffect(() => {
    if (cardNumber) {
      validateCardnumberLength();
    }
  }, [cardNumber]);

  useEffect(() => {
    if (cvc) {
      validateCVC();
    }
  }, [cvc]);

  useEffect(() => {
    setSubmit(false);
  }, [email, firstName, lastName, cardNumber, cvc, expDate, cardNumber]);
  const validateCardnumberLength = () => {
    if (cardNumber.length >= 15 && cardNumber.length <= 16) {
      setCardnumberIsCorrect(true);
    } else {
      setCardnumberIsCorrect(false);
    }
  };

  const validateCVC = () => {
    if (cvc.length === 3) {
      setCvcIsCorrect(true);
    } else {
      setCvcIsCorrect(false);
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFirstname = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastname = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleCVC = (e: ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value);
  };
  const handleExpDate = (e: ChangeEvent<HTMLInputElement>) => {
    setExpDate(e.target.value);
  };
  const handleCardHolder = (e: ChangeEvent<HTMLInputElement>) => {
    setCardholder(e.target.value);
  };

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
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
  };

  const onSubmit = () => {
    setStartLoader(true);

    setTimeout(() => {
      setStartLoader(false);
      setSubmit(true);
    }, 1000);
  };

  return (
    <main className="formMainContainer">
      <div className="headerContainer">
        <p>Donate to help us at the shelter!</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <p>Details</p>
        <span className={`${startLoader ? "loader" : "hide"}`}></span>

        <div className="divider">
          <label htmlFor="firstname">First name:</label>
          <input
            type="text"
            id="firstName"
            placeholder="Firstname..."
            onChange={handleFirstname}
            value={firstName}
          />
        </div>

        <div className="divider">
          <label htmlFor="lastname">Last name:</label>
          <input
            type="text"
            id="lastname"
            placeholder="Lasname..."
            onChange={handleLastname}
            value={lastName}
          />
        </div>

        <div className="divider">
          <label htmlFor="mail">Email:</label>
          <input
            type="email"
            id="mail"
            placeholder="Email..."
            onChange={handleEmail}
            className={`              ${
              !emailIsCorrect && submit && "errorInput"
            }
            `}
            value={email}
          />
        </div>

        <p>Card details:</p>

        <div className="divider">
          <label htmlFor="cardholder">Cardholder name:</label>
          <input
            type="text"
            id="cardholder"
            placeholder="Jane Doe"
            onChange={handleCardHolder}
            value={cardholder}
          />
        </div>

        <div className="divider">
          <label htmlFor="cardnumber">Cardnumber:</label>
          <input
            type="number"
            id="cardnumber"
            placeholder="0000 1555 5555 2222"
            onChange={handleCardNumber}
            value={cardNumber}
            className={`              ${
              !cardnumberIsCorrect && submit && "errorInput"
            }
            `}
          />
        </div>

        <div className="divider">
          <label htmlFor="cvc">CVC:</label>
          <input
            type="text"
            id="cvc"
            placeholder="555"
            onChange={handleCVC}
            value={cvc}
            className={`              ${!cvcIsCorrect && submit && "errorInput"}
            `}
          />
        </div>

        <div className="divider">
          <label htmlFor="expdate">Card expire date:</label>
          <input
            type="text"
            id="expdate"
            placeholder="15/25"
            onChange={handleExpDate}
            value={expDate}
          />
        </div>
        <div className="buttonContainer">
          <button
            type="submit"
            onClick={onSubmit}
            disabled={
              !firstName ||
              !lastName ||
              !email ||
              !cardholder ||
              !cardNumber ||
              !cvc ||
              !expDate
            }
          >
            Create
          </button>
        </div>
      </form>
      <div
        className={
          submit && emailIsCorrect && cardnumberIsCorrect && cvcIsCorrect
            ? "popupContainer"
            : "hide"
        }
      >
        <PopupModal
          header="Your donation has been sent."
          body="Thank you for your donation, this will help us at the shelter very much. It will give the animals more food or extra toys or maybe better beds."
          navUrl="/"
        ></PopupModal>
      </div>
    </main>
  );
};
