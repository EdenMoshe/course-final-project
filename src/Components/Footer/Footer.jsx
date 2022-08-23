import "./Footer.css";
import { NavLink, Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  const [phones] = useState("Phones");
  const [computers] = useState("Computers");
  const [accessories] = useState("Accessories");

  const history = useHistory();

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
    <footer className=" text-center text-dark footerForm">
      <div className="container p-4 ">
        <section className="mb-4">
          <Link
            className="btn btn-primary btn-floating m-1"
            to="#!"
            role="button"
            style={{ backgroundColor: "#3b5998" }}
          >
            <i className="fab fa-facebook-f"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            to="#!"
            role="button"
            style={{ backgroundColor: "#55acee" }}
          >
            <i className="fab fa-twitter"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            to="#!"
            role="button"
            style={{ backgroundColor: "#dd4b39" }}
          >
            <i className="fab fa-google"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            to="#!"
            role="button"
            style={{ backgroundColor: "#ac2bac" }}
          >
            <i className="fab fa-instagram"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            to="#!"
            role="button"
            style={{ backgroundColor: "#0082ca" }}
          >
            <i className="fab fa-linkedin-in"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            to="#!"
            role="button"
            style={{ backgroundColor: "#333333" }}
          >
            <i className="fab fa-github"></i>
          </Link>
        </section>
        <div className="link-sections">
          <section className="footer-section">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Website Pages</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="/home" className="text-dark">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-dark">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/createProduct" className="text-dark">
                      Add Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishList" className="text-dark">
                      Wish List
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Products Categories</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="/myProductsPage" className="text-dark">
                      My Products
                    </Link>
                  </li>

                  <li className="text-dark footerLink" onClick={handlePhones}>
                    Phones
                  </li>
                  <li
                    className="text-dark footerLink"
                    onClick={handleComputers}
                  >
                    Computers
                  </li>
                  <li
                    className="text-dark footerLink"
                    onClick={handleAccessories}
                  >
                    Accessories
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-black p-5">© 2022 Copyright: by Eden Moshe</div>
    </footer>
    // -----------------------------------------
  );
};

export default Footer;
