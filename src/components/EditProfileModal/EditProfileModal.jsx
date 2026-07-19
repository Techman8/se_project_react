import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useModalClose from "../../hooks/useModalClose";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onUpdateUser, onClose, buttonText }) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // Automatically populate the input fields with current database strings when opened
  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  useModalClose(isOpen, onClose);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name* {""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL* {""}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
