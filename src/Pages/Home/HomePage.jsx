import { useEffect, useState } from "react";
import "./HomePage.css";
import "../../Components/ProductCard/CardsContainer.css";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";

const HomePage = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchLine, setSearchLine] = useState("");

  useEffect(() => {
    axios.get("/products/allproducts").then((dataFromServer) => {
      setProductsArr(dataFromServer.data);
      console.log("products:", dataFromServer.data);
    });
  }, [changed]);

  useEffect(() => {
    if (productsArr.length > 0) {
      setLoaded(true);
      setNotFound(false);
    } else {
      setNotFound(true);
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
        // alert("Error:", err);
        handleRemoveLike(id);
      });
  };

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

  const handleSearchChange = (event) => {
    setSearchLine(event.target.value);
  };

  return (
    <div className="homepage-container">
      <div className="search-container">
        <form className="form-inline my-2 my-lg-0 search-form">
          <input
            className="mr-sm-2 my-search-area  "
            type="text"
            placeholder="Search Product"
            aria-label="Search"
            value={searchLine}
            onChange={handleSearchChange}
          />
          {notFound === true && <h3>Not Founded Products</h3>}
        </form>
      </div>
      <div className="products-container">
        {!loaded && <h1>loading...</h1>}
        {productsArr
          .filter((val) => {
            if (searchLine === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchLine.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => {
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
                creatorName={item.creatorName}
                creatorAddress={item.creatorAddress}
                onLikeProduct={handleLike}
                onRemoveLike={handleRemoveLike}
                onEditProduct={null}
                onDeleteProduct={null}
              ></ProductCard>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
