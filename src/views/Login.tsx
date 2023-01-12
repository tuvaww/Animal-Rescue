import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/layout/form.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isWrongData, setIsWrongData] = useState(false);

  const navigate = useNavigate();

  const submitForm = async () => {
    const rawResponse = await fetch("http://localhost:8000/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ email, password }),
    });
    if (rawResponse.status === 200) {
      navigate("/Schedule");
    } else {
      setIsWrongData(true);
    }
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
        <p>Login</p>

        <div className="divider">
          <label htmlFor="mail">Email:</label>
          <input
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
            type="password"
            id="password"
            placeholder="Password..."
            onChange={handelPassword}
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
