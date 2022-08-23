import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import MyProductsEdit from "../ProductsEdit/MyProductsEdit";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "../../Components/ProductCard/CardsContainer.css";

const MyProductsPage = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);

  const loginId = useSelector((state) => state.auth.loggedInId);

  const handleEditProduct = (id) => {
    console.log(id);
    let newProduct = productsArr.find((item) => {
      return item._id == id;
    });
    console.log("new product", newProduct);
    if (newProduct) {
      setSelectedProduct({ ...newProduct });
    }
  };

  const handleDeleteProduct = (id) => {
    //!cardsArr = productsArr.filter((item) => item.id != id);

    let newProductsArr = productsArr.filter((item) => item._id != id);
    console.log("New Product arr", newProductsArr);
    setProductsArr(newProductsArr);

    axios
      .delete("/products/" + id)
      .then(() => {
        console.log("data from nodeJs server: deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("products/myproducts").then((dataFromServer) => {
      setProductsArr(dataFromServer.data);
    });
  }, [hasChanged]);

  useEffect(() => {
    if (productsArr.length > 0) {
      setLoaded(true);
    }
  }, [productsArr]);

  const handleUpdateProduct = (
    name,
    description,
    category,
    price,
    image,
    id
  ) => {
    const editedProduct = productsArr.find((product) => {
      return product._id === id;
    });

    if (editedProduct) {
      axios
        .put(`/products/${id}`, { name, description, category, price, image })
        .then((res) => {
          setSelectedProduct(null);
          if (hasChanged === true) {
            setHasChanged(false);
          } else {
            setHasChanged(true);
          }
        })
        .catch((err) => {
          alert("Error:", err);
        });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <div className="products-container">
        {productsArr.map((item) => {
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
              isEditable={true}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              userProductID={item._id}
              userIdRedux={loginId}
              onShowModal={handleShow}
            ></ProductCard>
          );
        })}
      </div>
      {selectedProduct !== null && (
        <MyProductsEdit
          id={selectedProduct._id}
          name={selectedProduct.name}
          description={selectedProduct.description}
          category={selectedProduct.category}
          price={selectedProduct.price}
          onUpdateProduct={handleUpdateProduct}
          onClose={handleClose}
          show={show}
        ></MyProductsEdit>
      )}
    </Fragment>
  );
};

export default MyProductsPage;
