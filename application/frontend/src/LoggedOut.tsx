import React, { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoggedOut.css";

interface User {
  email: string;
  password: string;
}

export const users: User[] = [
  { email: "erselcanakcili@gmail.com", password: "ersel123" },
  { email: "daghanerdonmez@gmail.com", password: "daghan123" },
];

function checkUser(email: string, password: string): string {
  for (let user of users) {
    if (user.email === email) {
      return user.password === password ? "Correct" : "Incorrect password";
    }
  }
  return "Incorrect email";
}

interface ButtonProps {
  text: string;
  className: string;
  handleOn: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  className,
  handleOn,
  disabled,
}) => (
  <button disabled={disabled} onClick={handleOn} className={className}>
    {text}
  </button>
);

interface InputProps {
  className: string;
  type: string;
  id: string;
  placeHolder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  className,
  type,
  id,
  placeHolder,
  onChange,
}) => (
  <input
    className={className}
    type={type}
    id={id}
    placeholder={placeHolder} // Fixed typo here: 'placeHolder' to 'placeholder'
    onChange={onChange}
    required
  />
);

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  function handleOnLogin() {
    const result = checkUser(email, password);
    if (result === "Correct") {
      navigate("/feed");
    } else {
      setError(result);
    }
  }

  function handleOnSignUp() {
    navigate("/sign-up");
  }

  return (
    <div className="container">
      <div className="loginDiv">
        <h2 style={{ textAlign: "center" }}>Turkish Football Forum</h2>
        <Input
          className="LoginForm"
          type="text"
          id="email"
          placeHolder="E-Mail"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          className="LoginForm"
          type="password"
          id="password"
          placeHolder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <p style={{ marginLeft: "25px", marginTop: "2px", fontSize: "14px" }}>
          <Link to="/forgot" style={{ textDecoration: "none" }}>
            Forgot my password?
          </Link>
        </p>
        <Button
          disabled={email === "" || password === ""}
          handleOn={handleOnLogin}
          text="Login"
          className="LoginButton"
        />
        <Button
          handleOn={handleOnSignUp}
          text="Sign Up"
          className="SignUpButton"
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
