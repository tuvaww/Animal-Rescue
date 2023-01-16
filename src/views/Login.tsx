import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/layout/form.scss";
import { add } from "../redux/features/SessionSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [startLoader, setStartLoader] = useState(false);
  const [isWrongData, setIsWrongData] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsWrongData(false);
  }, [email, password]);

  const submitForm = async () => {
    setStartLoader(true);

    const rawResponse = await fetch("http://localhost:8000/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await rawResponse.json();

    if (rawResponse.status === 200) {
      setTimeout(() => {
        setStore(data.token);

        setStartLoader(false);
        setEmail("");
        setPassword("");
        navigate("/Schedule");
      }, 1800);
    } else {
      setTimeout(() => {
        setStartLoader(false);
        setIsWrongData(true);
      }, 1500);
    }
  };

  const setStore = (data: string) => {
    dispatch(add(data));
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handelPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className="formMainContainer">
      <div className="headerContainer">
        <p>Login to your account</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <span className={`${startLoader ? "loader" : "hide"}`}></span>

        <p>Login</p>
        <span className={`${isWrongData ? "errorMessage" : "hide"}`}>
          Email or password is wrong
        </span>

        <div className="divider">
          <label htmlFor="mail">Email:</label>
          <input
            className={`${isWrongData && "errorInput"}`}
            type="email"
            id="mail"
            placeholder="Email..."
            onChange={handleEmail}
            value={email}
          />
        </div>

        <div className="divider">
          <label htmlFor="password">Password:</label>
          <input
            className={`${isWrongData && "errorInput"}`}
            type="password"
            id="password"
            placeholder="Password..."
            onChange={handelPassword}
          />
        </div>

        <div className="buttonContainer">
          <button
            disabled={!email || !password}
            type="submit"
            onClick={submitForm}
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
};
