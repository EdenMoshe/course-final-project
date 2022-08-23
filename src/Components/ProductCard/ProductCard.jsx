import "./ProductCard.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const ProductCard = (props) => {
  const loginId = useSelector((state) => state.auth.loggedInId);
  const userData = useSelector((state) => state.auth.userData);

  const handleLikeClick = () => {
    props.onLikeProduct(props.id);
  };

  const handleRemoveLikeClick = () => {
    props.onRemoveLike(props.id);
  };

  const isEditable = props.isEditable;
  const handleDeleteClick = () => props.onDeleteProduct(props.id);
  const handleEditClick = () => {
    props.onShowModal();
    props.onEditProduct(props.id);
  };

  return (
    <div className="card h-100">
      <img src={props.image} className="card-img-top" alt="Product Image" />
      <div className="card-body">
        <div className="present-like-container">
          {props.likes.includes(loginId || userData._id) ? (
            <div className="like-icon">
              <FontAwesomeIcon
                id="like-button"
                icon={faHeart}
                size="xl"
                onClick={handleRemoveLikeClick}
                color="#d20f31"
              />
              <br />
              <b className="likes-counter">
                {props.likes.length === 1
                  ? props.likes.length + " like"
                  : props.likes.length + " likes"}
              </b>
            </div>
          ) : (
            <div className="like-icon">
              <FontAwesomeIcon
                id="like-button"
                icon={faHeart}
                size="xl"
                onClick={handleLikeClick}
              />
              <br />
              <b className="likes-counter">
                {props.likes.length === 1
                  ? props.likes.length + " like"
                  : props.likes.length + " likes"}
              </b>
            </div>
          )}
          <h5 className="card-title name">{props.name}</h5>
        </div>
        <FontAwesomeIcon icon={faComment} color="#0072b9" />
        <p className="card-text font-bolder detail-line">
          <span> {props.description}</span>
        </p>

        <h5 className="card-title price">{props.price}$</h5>

        <h6 className="card-subtitle mb-2 font-bolder">{props.category}</h6>
        <h5 className="card-text cinfo">
          {props.creatorAddress} | {props.phone} | {props.creatorName}
        </h5>
      </div>
      <div className="card-footer">
        {isEditable ? (
          <button
            type="button"
            className="btn btn-danger btns"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        ) : (
          ""
        )}
        {isEditable ? (
          <button
            type="button"
            className="btn btn-info btns"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={handleEditClick}
          >
            Edit
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductCard;
