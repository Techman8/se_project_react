import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, isOpen, card, onClose, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if current user created the current clothing item card
  const isOwn = card.owner === currentUser?._id;

  if (!isOpen) return null;

  return (
    <div
      className={`modal modal_type_preview ${activeModal === "preview" ? "modal_opened" : ""}`}
    >
      <div className="modal__container modal__container_type_image">
        <button className="modal__close" type="button" onClick={onClose} />
        <img className="modal__image" src={card.imageUrl} alt={card.name} />

        <div className="modal__footer">
          <div className="modal__text-wrapper">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather-type">Weather: {card.weather}</p>
          </div>

          {/* Render delete button only if you own the resource card */}
          {isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={() => onDeleteItem(card._id)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
