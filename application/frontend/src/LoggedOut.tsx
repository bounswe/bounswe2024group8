import React, { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import "./LoggedOut.css";
import axios from "axios";

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
    const data = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", data)
      .then((response) => {
        // Başarılı giriş durumunda yapılacak işlemler
        console.log(response.data.accessToken);
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("email", email);
        navigate("/");
      })
      .catch((error) => {
        // Hata durumunda yapılacak işlemler
        setError("Incorrect e-mail or password.");
        console.error("Hata:", error);
      });
  }

  function handleOnSignUp() {
    navigate("/sign-up");
  }

  return (
    <div className="container">
      <div className="logodiv">
        <img
          src={logo}
          alt="Logo"
          width="50"
          height="50"
          className="logo"
        ></img>
        <h2 className="logotext">appFanatic.</h2>
      </div>
      <div className="loginDiv">
        <h2 style={{ textAlign: "center" }}>Welcome Back!</h2>
        <p className="enter-credentials-text" style={{ textAlign: "center" }}>
          Enter your credentials to login{" "}
        </p>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
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
        <p
          style={{
            marginLeft: "0px",
            marginTop: "30px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          <Link to="/forgot" style={{ textDecoration: "none" }}>
            Forgot password?
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
      </div>
    </div>
  );
};

export default Login;
