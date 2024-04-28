import "./Signup.css";
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
          handleOn={handleOnSignUp}
          text="Sign Up"
          className="SignUpButton"
        />
      </div>
    </div>
  );
}
