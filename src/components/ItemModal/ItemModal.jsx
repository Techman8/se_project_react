import "./ItemModal.css";

function ItemModal({ activeModal, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 6.586L13.657.929A1 1 0 1115.071 2.343L9.414 8l5.657 5.657a1 1 0 01-1.414 1.414L8 9.414l-5.657 5.657a1 1 0 01-1.414-1.414L6.586 8 .929 2.343A1 1 0 012.343.929L8 6.586z" />
          </svg>
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
