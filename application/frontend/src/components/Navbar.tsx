import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" width="50" height="50" className="logo"></img>
      <p className="manrope-logo">appFanatic.</p>
      <ul className="navbar-ul">
        <li className="navbar-li">
          <a className="navbar-a" href="#profile">
            Profile
          </a>
        </li>
        <li className="navbar-li">
          <a className="navbar-a" href="#settings">
<<<<<<< HEAD
            <IoSettingsSharp className="Icons" />
          </a>
        </li>
        <li className="navbar-li">
          <a className="navbar-a" href="loggedOut">
            <IoLogOutOutline className="Icons" />
=======
            Settings
>>>>>>> main
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
