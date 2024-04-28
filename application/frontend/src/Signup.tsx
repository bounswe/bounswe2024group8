import { Input, Button } from "./LoggedOut.tsx";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  function handleOnSignUp() {
    navigate("/feed");
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
          onChange={() => {}}
        />
        <Input
          className="SignUpForm"
          type="text"
          id="username"
          placeHolder="Username"
          onChange={() => {}}
        />
        <Input
          className="SignUpForm"
          type="password"
          id="password"
          placeHolder="Password"
          onChange={() => {}}
        />
        <select className="SignUpForm" name="team" id="team">
          <option value="gs">Galatasaray</option>
          <option value="fb">Fenerbahçe</option>
          <option value="bjk">Beşiktaş</option>
          <option value="ts">Trabzonspor</option>
        </select>
        <Button
          handleOn={handleOnSignUp}
          text="Sign Up"
          className="SignUpButton"
        />
      </div>
    </div>
  );
}
