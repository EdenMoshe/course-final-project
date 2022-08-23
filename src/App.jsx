import "./App.css";

import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthGuardRoute from "./Components/AuthGuardRoute";
import NavBarComponent from "./Components/NavBar/NavBarComponent";
import HomePage from "./Pages/Home/HomePage";
import AboutPage from "./Pages/About/AboutPage";
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import CreateProductPage from "./Pages/CreateProducts/CreateProductPage";
import MyProductsPage from "./Pages/Products/MyProductsPage";
import ProductsByCategoryPage from "./Pages/ProductsCategory/ProductsByCategoryPage";
import WishListPage from "./Pages/WishList/WishListPage";
import NotFoundPage from "./Pages/NotFoundPage";
import Footer from "./Components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("tokenKey");
    if (!token) {
      dispatch(authActions.logOut());
      return;
    }

    const decoded = jwt_decode(token);
    const date = new Date();
    if (decoded.exp < date.getTime() / 1000) {
      dispatch(authActions.logOut());
      history.push("/login");
    } else {
      dispatch(authActions.login());
      dispatch(authActions.updatedUser(decoded));
    }
  }, [dispatch, history]);

  return (
    <div className="appContainer">
      <NavBarComponent></NavBarComponent>
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/" exact>
          <LoginPage />
        </Route>

        <AuthGuardRoute path="/home" exact component={HomePage} />

        <AuthGuardRoute path="/about" exact component={AboutPage} />

        <AuthGuardRoute
          path="/myProductsPage"
          exact
          component={MyProductsPage}
        />

        <AuthGuardRoute
          path="/createProduct"
          exact
          component={CreateProductPage}
        />

        <AuthGuardRoute
          path="/productsbycategory"
          exact
          component={ProductsByCategoryPage}
        />

        <AuthGuardRoute path="/wishList" exact component={WishListPage} />

        <Route path="/signUpPage" exact>
          <SignUpPage />
        </Route>

        <Route path="/notfound" exact>
          <NotFoundPage />
        </Route>
        <Route path="*" exact>
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
