import "./Signup.css";
import { useState, ChangeEvent } from "react";
import { Input, Button } from "./LoggedOut.tsx";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "./assets/logo.png";
import {
  loggedInProfileInfo,
  setLoggedInProfileInfo,
} from "./storage/storage.ts";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [favoriteTeam, setFavoriteTeam] = useState<string>("GALATASARAY");
  const navigate = useNavigate();

  function handleOnSignUp() {
    const registerUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      favoriteTeam: favoriteTeam,
    };

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        registerUser
      )
      .then((response) => {
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("email", email);
        localStorage.setItem("id", response.data.userId);
        setLoggedInProfileInfoFromAPI();
        navigate("/home");
      })
      .catch((error) => {
        setError("Email already exist");
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

  function handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === "Enter" &&
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      handleOnSignUp();
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
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <p style={{ textAlign: "center" }}>Create your account</p>
        <Input
          className="SignUpForm"
          type="text"
          id="email"
          placeHolder="E-Mail"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          onKeyDown={handleOnKeyDown}
        />
        <Input
          className="SignUpForm"
          type="text"
          id="firstName"
          placeHolder="First Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
          onKeyDown={handleOnKeyDown}
        />
        <Input
          className="SignUpForm"
          type="text"
          id="lastName"
          placeHolder="Last Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          onKeyDown={handleOnKeyDown}
        />
        <Input
          className="SignUpForm"
          type="password"
          id="password"
          placeHolder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onKeyDown={handleOnKeyDown}
        />
        <div>
          <h4 style={{ textAlign: "center" }}>Select the team you support!</h4>
          <select
            className="SignUpForm"
            name="team"
            id="team"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setFavoriteTeam(e.target.value);
            }}
          >
            <option value="GALATASARAY">Galatasaray</option>
            <option value="FENERBAHCE">Fenerbahçe</option>
            <option value="BESIKTAS">Beşiktaş</option>
            <option value="TRABZONSPOR">Trabzonspor</option>
            <option value="BASAKSEHIR">Başakşehir</option>
            <option value="RIZESPOR">Rizespor</option>
            <option value="KASIMPASA">Kasımpaşa</option>
            <option value="ALANYASPOR">Alanyaspor</option>
            <option value="SIVASSPOR">Sivasspor</option>
            <option value="ANTALYASPOR">Antalyaspor</option>
            <option value="ADANADEMIRSPOR">Adana Demirspor</option>
            <option value="KAYSERISPOR">Kayserispor</option>
            <option value="SAMSUNSPOR">Samsunspor</option>
            <option value="ANKARAGUCU">Ankaragücü</option>
            <option value="GAZIANTEP">Gaziantep</option>
            <option value="KONYASPOR">Konyaspor</option>
            <option value="KARAGUMRUK">Karagümrük</option>
            <option value="HATAYSPOR">Hatayspor</option>
            <option value="PENDIKSPOR">Pendikspor</option>
            <option value=" ISTANBULSPOR">İstanbulspor</option>
          </select>
        </div>
        <Button
          disabled={
            email === "" ||
            password === "" ||
            firstName === "" ||
            lastName === ""
          }
          handleOn={handleOnSignUp}
          text="Sign Up"
          className="SignUpButton"
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div
          className="have-account"
          style={{
            display: "flex",
            justifyContent: "center", // This will center the items horizontally
            alignItems: "center", // This will center the items vertically
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "5px 5px 0px 0", // Adjusted margin for better spacing
              fontSize: "14px",
            }}
          >
            Already have an account?
          </p>
          <p
            style={{
              margin: "5px 0px 0px 0", // Uniform vertical margin
              fontSize: "14px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
