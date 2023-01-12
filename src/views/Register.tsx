import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/layout/form.scss";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailIsCorrect, setEmailIsCorrect] = useState(false);
  const [repeatedEmailIsCorrect, setRepeatedEmailIsCorrect] = useState(false);
  const [emailsMatch, setEmailsMatch] = useState(false);

  const [validateLengthFN, setValidateLengthFN] = useState(false);
  const [validateLengthLN, setValidateLengthLN] = useState(false);
  const [validateLengthEmail, setValidateLengthEmail] = useState(false);
  const [validateLengthRepeatEmail, setValidateRepeatEmail] = useState(false);
  const [validateLenghtPassword, setValidateLengthPassword] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let validate = validateEmail(email);
    setEmailIsCorrect(validate);
  }, [email]);

  useEffect(() => {
    let validate = validateEmail(repeatEmail);
    setRepeatedEmailIsCorrect(validate);
  }, [repeatEmail]);

  useEffect(() => {
    let match = checkIfEmailsMatch();
    setEmailsMatch(match);
  }, [email, repeatEmail]);

  useEffect(() => {
    validateLength();
  }, [firstName, lastName, email, repeatEmail, password]);

  const validateEmail = (email: string) => {
    var emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    return emailRegex.test(email);
  };

  const checkIfEmailsMatch = () => {
    if (email.length > 5 && repeatEmail.length > 5) {
      if (email === repeatEmail) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const validateLength = () => {
    if (firstName.length > 0) {
      setValidateLengthFN(true);
    }
    if (lastName.length > 0) {
      setValidateLengthLN(true);
    }
    if (email.length > 0) {
      setValidateLengthEmail(true);
    }
    if (repeatEmail.length > 0) {
      setValidateRepeatEmail(true);
    }
    if (password.length > 0) {
      setValidateLengthPassword(true);
    }
  };

  const submitForm = async () => {
    validateLength();
    setSubmit(true);

    if (
      validateLengthFN &&
      validateLengthLN &&
      validateLengthEmail &&
      validateLengthRepeatEmail &&
      validateLenghtPassword &&
      emailsMatch &&
      emailIsCorrect
    ) {
      navigate("/Login");

      const rawResponse = await fetch(
        "http://localhost:8000/account/create-user",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            mode: "no-cors",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );
    }
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
  const handleRepeatEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className="formMainContainer">
      <div className="headerContainer">
        <p>Register a account</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <p>Register</p>

        <div className="divider">
          <label htmlFor="fn">First name:</label>
          <input
            onChange={handleFirstName}
            value={firstName}
            type="text"
            id="fn"
            placeholder="First name..."
            className={`${!validateLengthFN && submit && "errorInput"}`}
          />
        </div>

        <div className="divider">
          <label htmlFor="ln">Last name:</label>
          <input
            onChange={handleLastName}
            value={lastName}
            type="text"
            id="ln"
            className={`${!validateLengthLN && submit && "errorInput"}`}
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
            className={`${!validateLengthEmail && submit && "errorInput"}`}
          />
        </div>

        <div className="divider">
          <label htmlFor="repeatEmail">Repeat email:</label>
          <input
            onChange={handleRepeatEmail}
            value={repeatEmail}
            type="email"
            id="repeatEmail"
            placeholder="Email..."
            className={`${
              !validateLengthRepeatEmail && submit && "errorInput"
            }`}
          />
        </div>

        <div className="divider">
          <label htmlFor="password">Password:</label>
          <input
            onChange={handlePassword}
            type="password"
            id="password"
            placeholder="Password..."
            className={`${!validateLenghtPassword && submit && "errorInput"}`}
          />
        </div>

        <div className="buttonContainer">
          <button type="submit" onClick={submitForm}>
            Create
          </button>
        </div>
      </form>
    </main>
  );
};
