import "./Signup.css";
import { useState,ChangeEvent} from "react";
import { Input, Button } from "./LoggedOut.tsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  function handleOnSignUp() {

    const registerUser = {
      firstName:username,
      lastName:"",
      userName: email,
      password: password
    };
    
  
      axios.post('http://localhost:8080/api/v1/auth/register', registerUser)
      .then(response => {
        navigate("/");
      })
      .catch(error => {
        setError("Email already exist");
      });


    


  }
  return (
    <div className="container">
      <div className="loginDiv">
        <h2 style={{ textAlign: "center" }}>SIGN UP</h2>
        <Input
          className="SignUpForm"
          type="text"
          id="email"
          placeHolder="E-Mail"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          className="SignUpForm"
          type="text"
          id="username"
          placeHolder="Username"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Input
          className="SignUpForm"
          type="password"
          id="password"
          placeHolder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div >
        <select className="SignUpForm" name="team"  id="team" >
          <option value="gs">Galatasaray</option>
          <option value="fb">Fenerbahçe</option>
          <option value="bjk">Beşiktaş</option>
          <option value="ts">Trabzonspor</option>
          <option value="bşk">Başakşehir</option>
          <option value="riz">Rizespor</option>
          <option value="las">Kasımpaşa</option>
          <option value="aln">Alanyaspor</option>
          <option value="svs">Sivasspor</option>
          <option value="ant">Antalyaspor</option>
          <option value="ads">Adana Demirspor</option>
          <option value="kay">Kayserispor</option>
          <option value="sam">Samsunspor</option>
          <option value="ank">Ankaragücü</option>
          <option value="gfk">Gaziantep FK</option>
          <option value="kon">Konyaspor</option>
          <option value="krg">Karagümrük</option>
          <option value="hty">Hatayspor</option>
          <option value="pen">Pendikspor</option>
          <option value="ist">İstanbulspor</option>
        </select>
        </div>
        <Button
          disabled={email === "" || password === ""||username===""}
          handleOn={handleOnSignUp}
          text="Sign Up"
          className="SignUpButton"
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </div>
    </div>
  );
}
