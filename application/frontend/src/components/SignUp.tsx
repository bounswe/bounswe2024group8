import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../LoggedOut.tsx";

interface InputProps {
  className: string;
  type: string;
  id: string;
  placeHolder: string;
}

interface ButtonProps {
  handleOn: () => void;
  text: string;
  className: string;
}

const Input: FC<InputProps> = ({ className, type, id, placeHolder }) => (
  <input className={className} type={type} id={id} placeholder={placeHolder} />
);

const Button: FC<ButtonProps> = ({ handleOn, text, className }) => (
  <button onClick={handleOn} className={className}>
    {text}
  </button>
);

const SignUpPage: FC = () => {
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
        />
        <Input
          className="SignUpForm"
          type="text"
          id="username"
          placeHolder="Username"
        />
        <Input
          className="SignUpForm"
          type="password"
          id="password"
          placeHolder="Password"
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
};

export default SignUpPage;
