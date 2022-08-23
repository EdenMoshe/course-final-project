import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "../../Components/ProductCard/CardsContainer.css";

const WishListPage = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const loginId = useSelector((state) => state.auth.loggedInId);

  useEffect(() => {
    axios
      .get("/products/wishlist")
      .then((res) => {
        setProductsArr(res.data);
        console.log("products:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changed]);

  const handleRemoveLike = (id) => {
    axios
      .post(`products/removefromwishlist/${id}`)
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
    <div className="products-container">
      {productsArr.map((item) => {
        if (item.likes.includes(loginId || userData._id)) {
          return (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              likes={item.likes}
              description={item.description}
              category={item.category}
              price={item.price}
              image={item.image}
              phone={item.phone}
              onRemoveLike={handleRemoveLike}
            ></ProductCard>
          );
        }
      })}
    </div>
  );
};

export default WishListPage;
