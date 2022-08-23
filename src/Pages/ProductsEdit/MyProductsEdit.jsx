import { useState } from "react";
import { useEffect } from "react";
import "../Products/MyProductsPage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MyProductsEdit = (props) => {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [price, setPrice] = useState(props.price);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleImageUrl = () => {
    let userImage = document.getElementById("add-product-image").value;
    if (userImage === "") userImage = imageByCategory(category);

    return userImage;
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    const image = handleImageUrl();
    props.onUpdateProduct(name, description, category, price, image, props.id);
  };

  const handleClose = () => props.onClose(false);
  const show = props.show;

  const imageByCategory = (category) => {
    switch (category) {
      case "Phones":
        return "https://cdn.pixabay.com/photo/2018/05/21/13/12/phone-3418270_960_720.png";
      case "Computers":
        return "https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126880_960_720.png";
      case "Accessories":
        return "https://cdn.pixabay.com/photo/2022/01/07/20/40/icon-6922627_960_720.png";

      default:
        return "https://cdn.pixabay.com/photo/2013/07/12/14/53/cart-148964_960_720.png";
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Product Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={handleChangeName}
          />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Description</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={description}
              onChange={handleChangeDescription}
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-product-category">Category</label>
            <select
              className="form-select"
              id="add-product-category"
              name="categories"
              value={category}
              onChange={handleChangeCategory}
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Price</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={price}
              onChange={handleChangePrice}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default MyProductsEdit;
