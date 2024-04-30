import "./Navbar.css";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import SearchBar from "./SearchBar";

interface NavbarProps {
  setShowCreatePostOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar: React.FC<NavbarProps> = ({ setShowCreatePostOverlay }) => {
  return (
    <div>
      <nav className="navbar">
        <img
          src={logo}
          alt="Logo"
          width="50"
          height="50"
          className="logo"
        ></img>
        <p className="manrope-logo">appFanatic</p>
        <div className="searchBar">
          <SearchBar />
        </div>
        <ul className="navbar-ul">
          <li
            className="navbar-li"
            onClick={() => setShowCreatePostOverlay(true)}
          >
            <a className="navbar-a" href="#write">
              <IoMdCreate className="Icons" />
            </a>
          </li>
          <li className="navbar-li">
            <a className="navbar-a" href="/home">
              <FaHome className="Icons" />
            </a>
          </li>
          <li className="navbar-li divider">|</li>
          <li className="navbar-li">
            <a className="navbar-a" href="#profile">
              <CgProfile className="Icons" />
            </a>
          </li>
          <li className="navbar-li">
            <a className="navbar-a" href="#settings">
              <IoSettingsSharp className="Icons" />
            </a>
          </li>
          <li className="navbar-li">
            <a className="navbar-a" href="/">
              <IoLogOutOutline className="Icons" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
