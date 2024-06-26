import React, { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import "./LoggedOut.css";
import axios from "axios";
import { loggedInProfileInfo, setLoggedInProfileInfo } from "./storage/storage";

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
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  className,
  type,
  id,
  placeHolder,
  onChange,
  onKeyDown,
}) => (
  <input
    className={className}
    type={type}
    id={id}
    placeholder={placeHolder} // Fixed typo here: 'placeHolder' to 'placeholder'
    onChange={onChange}
    onKeyDown={onKeyDown}
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
      .post(`${import.meta.env.VITE_API_URL}/api/v1/auth/authenticate`, data)
      .then((response) => {
        // Başarılı giriş durumunda yapılacak işlemler
        console.log(response.data.accessToken);
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("email", email);
        localStorage.setItem("id", response.data.userId);
        localStorage.setItem("myCommunity", response.data.favoriteTeam);
        setLoggedInProfileInfoFromAPI();
        axios
          .get(
            `${import.meta.env.VITE_API_URL}/api/v1/users?email=` +
              `${localStorage.getItem("email")}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
          .then((response) => {
          })
          .catch((error) => {});        
        window.location.href = "/home";
      })
      .catch((error) => {
        // Hata durumunda yapılacak işlemler
        setError("Incorrect e-mail or password.");
        console.error("Hata:", error);
      });
  }

  function setLoggedInProfileInfoFromAPI() {
    const id = localStorage.getItem("id");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const profileData = response.data;

        // Update the loggedInProfileInfo object
        setLoggedInProfileInfo({
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          community: {
            id: profileData.community.id,
            name: profileData.community.name,
            description: profileData.community.description,
            team: profileData.community.team,
            fanaticCount: profileData.community.fanaticCount,
          },
          profilePicture: profileData.profilePicture,
          accountNonExpired: profileData.accountNonExpired,
          accountNonLocked: profileData.accountNonLocked,
          credentialsNonExpired: profileData.credentialsNonExpired,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleOnSignUp() {
    navigate("/sign-up");
  }
  function handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleOnLogin();
    }
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
          onKeyDown={handleOnKeyDown}
        />
        <Input
          className="LoginForm"
          type="password"
          id="password"
          placeHolder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onKeyDown={handleOnKeyDown}
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
