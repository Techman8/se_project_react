import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  // Subscribe to your CurrentUserContext to read the current user's profile
  const currentUser = useContext(CurrentUserContext);

  // 1. Check if a user is logged in by validating their unique _id field
  const isLoggedIn = !!currentUser?._id;

  // 2. Check if the clothing item's likes array contains the current user's ID
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // 3. Construct the conditional className string for the like button styling
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  // 4. Trigger card preview modal handler
  const handleCardClick = () => {
    onCardClick(item);
  };

  // 5. Fire card liking state handler to send updates back to App component
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {/* 6. Conditionally render the button element only for authenticated users */}
        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          />
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
