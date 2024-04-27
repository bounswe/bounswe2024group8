import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <li className="navbar-li">
          <a className="navbar-a" href="#profile">
            Profile
          </a>
        </li>
        <li className="navbar-li">
          <a className="navbar-a" href="#settings">
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
