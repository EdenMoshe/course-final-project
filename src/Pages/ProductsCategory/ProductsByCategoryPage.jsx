import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ProductCard from "../../Components/ProductCard/ProductCard";

const ProductsByCategoryPage = () => {
  const location = useLocation();
  const category = location.state;

  const [productsArr, setProductsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log("location state", location.state);
    axios.get(`/products/allproducts/${category}`).then((dataFromServer) => {
      setProductsArr(dataFromServer.data);
      console.log(dataFromServer.data);
    });
  }, [location.state, changed]);

  useEffect(() => {
    if (productsArr.length > 0) {
      setLoaded(true);
    }
  }, [productsArr]);

  const handleLike = (id) => {
    axios
      .post(`/products/addtowishlist/${id}`)
      .then(() => {
        if (changed === true) {
          setChanged(false);
        } else {
          setChanged(true);
        }
      })
      .catch((err) => {
        alert("Error:", err);
      });
  };

  const handleRemoveLike = (id) => {
    axios
      .post(`products/removefromwishelist/${id}`)
      .then(() => {
        if (changed === true) {
          setChanged(false);
        } else {
          setChanged(true);
        }
      })
      .catch((err) => {
        alert("Error:", err);
      });
  };

  return (
    <Fragment>
      <div className="products-container">
        {!loaded && <h1>loading...</h1>}

        {productsArr.map((item) => {
          return (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              category={item.category}
              price={item.price}
              likes={item.likes}
              image={item.image}
              // LoggedInUserData={userInfoRedux}
              onLikeProduct={handleLike}
              onRemoveLike={handleRemoveLike}
            ></ProductCard>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ProductsByCategoryPage;
