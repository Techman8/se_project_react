import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useModalClose from "../../hooks/useModalClose";

const LoginModal = ({
  buttonText,
  isOpen,
  onLogin,
  onClose,
  onToggleModal,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  useModalClose(isOpen, onClose);

  return (
    <ModalWithForm
      title="Log in"
      buttonText={buttonText}
      secondaryButtonText="or Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onToggleModal={onToggleModal}
    >
      <label htmlFor="login-email" className="modal__label">
        Email {""}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password {""}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
