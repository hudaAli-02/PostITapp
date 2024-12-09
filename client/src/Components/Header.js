import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import logo from "../Images/logo-t.png";
import { useDispatch } from "react-redux";
import { logout } from "../Features/User";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/");
  };

  return (
  
    <Navbar className="header">
      <Nav>
        <NavItem>
          <Link to="">
          <img src={logo} className="logoImage"/>
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/"> Home</Link>
        </NavItem>

        <NavItem>
          <Link to="/profile"> Profile</Link>
        </NavItem>

        <NavItem>
          <Link onClick={handlelogout}> Logout</Link>
        </NavItem>

       <NavItem>
          <Link to=""></Link>
        </NavItem>
      </Nav>
    </Navbar>


  );
};

export default Header;

