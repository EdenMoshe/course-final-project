import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import createProductSchema from "../../validation/createProductSchema";
import "./CreateProducts.css";

const CreateProductPage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const userPhone = useSelector((state) =>
    state.auth.loggedInPhone === "" ? userData.phone : state.auth.loggedInPhone
  );

  const loginPhone = userData.phone;
  const loginName = userData.name;
  const loginAddress = userData.address;

  const userName = useSelector((state) =>
    state.auth.loggedInName === "Guest"
      ? userData.name
      : state.auth.loggedInName
  );
  const userAddress = useSelector((state) =>
    state.auth.loggedInAddress === ""
      ? userData.address
      : state.auth.loggedInAddress
  );

  // const userPhone = useSelector((state) => state.auth.loggedInPhone);
  // const userName = useSelector((state) => state.auth.loggedInName);
  // const userAddress = useSelector((state) => state.auth.loggedInAddress);

  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Phones");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  // const [creatorName, setCreatorName] = useState(userName);
  // const [creatorAddress, setCreatorAddress] = useState(userAddress);
  // const [phone, setPhone] = useState(userPhone);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleImageUrl = (event) => {
    setImage(event.target.value);
  };

  const handleNewProduct = (event) => {
    event.preventDefault();
    const validatedValue = Joi.validate(
      { name, description, category, price, image },
      createProductSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedValue;
    if (error) {
      alert(error);
    } else {
      axios
        .post("/products/createnewproduct", {
          name,
          description,
          price,
          category,
          image,
          phone: loginPhone,
          creatorName: loginName,
          creatorAddress: loginAddress,
        })
        .then((res) => {
          console.log("res.data", res.data);
          history.push("/myProductsPage");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  return (
    <form className="createProductForm" onSubmit={handleNewProduct}>
      <div className="form-group">
        <label htmlFor="add-product-name">Name</label>
        <input
          type="text"
          className="form-control"
          id="add-product-name"
          placeholder="Product Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="add-product-description">Description</label>
        <input
          type="text"
          className="form-control"
          id="add-product-description"
          placeholder="Product description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="add-product-category">Category</label>
        <select
          className="form-select"
          id="add-product-category"
          name="categories"
          onChange={handleCategory}
        >
          <option value="Phones">Phones</option>
          <option value="Computers">Computers</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="add-product-image">Image</label>
        <input
          type="text"
          className="form-control"
          id="add-product-image"
          placeholder="Product image: optional"
          value={image}
          onChange={handleImageUrl}
        />
      </div>
      <div className="form-group">
        <label htmlFor="add-product-price">Price</label>
        <input
          type="text"
          className="form-control"
          id="add-product-price"
          placeholder="Product price"
          value={price}
          onChange={handlePriceChange}
        />
      </div>

      <button type="submit" className="btn btn-primary create-product-btn">
        create
      </button>
    </form>
  );
};

export default CreateProductPage;
