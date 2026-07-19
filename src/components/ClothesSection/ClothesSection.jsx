import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onCreateModal,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter out any cards that don't match the currently logged in user's profile ID
  const myClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          onClick={onCreateModal}
          className="clothes-section__add-button"
        >
          + Add Item
        </button>
      </div>
      <ul className="clothes-section__items">
        {myClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike} // Passed prop onto your profile items list cards
            />
          );
        })}
      </ul>
    </div>
  );
}
