import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import "./NavBarComponent.css";

const NavBarComponent = () => {
  const [phones, setPhones] = useState("Phones");
  const [computers, setComputers] = useState("Computers");
  const [accessories, setAccessories] = useState("Accessories");

  const LoggedInRedux = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch(authActions.logOut());
    history.push("/login");
    localStorage.clear();
  };

  const handlePhones = () => {
    history.push("/productsbycategory", phones);
  };
  const handleComputers = () => {
    history.push("/productsbycategory", computers);
  };
  const handleAccessories = () => {
    history.push("/productsbycategory", accessories);
  };

  return (
    <nav className="navbar navbar-expand-lg  navbar-light navbar-fixed-top navColors">
      <div className="container-fluid  navColors ">
        <NavLink className="navbar-brand navColors " to="/home">
          Eden's Shop
        </NavLink>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation "
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item  navColors ">
              <NavLink
                className="nav-link active  navColors"
                aria-current="page"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link  navColors" to="/about">
                About
              </NavLink>
            </li>

            {!LoggedInRedux && (
              <li className="nav-item  ">
                <NavLink className="nav-link navColors" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            <li className="nav-item  ">
              <NavLink className="nav-link navColors" to="/createProduct">
                Add Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link navColors" to="/myProductsPage">
                My Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link navColors" to="/wishList">
                Wish List
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle navColors"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Products & More
              </NavLink>
              <ul
                className="dropdown-menu navColors"
                aria-labelledby="navbarDropdown"
              >
                <li className="my-active-nav-link" onClick={handlePhones}>
                  <div>Phones</div>
                </li>

                <li className="my-active-nav-link" onClick={handleComputers}>
                  <div>Computers</div>
                </li>

                <li className="my-active-nav-link" onClick={handleAccessories}>
                  <div>Accessories</div>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex ">
            {LoggedInRedux && (
              <button
                type="button"
                className="btn btn-light btn-logout btn-outline-info-bold"
                onClick={logOut}
              >
                Logout
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
