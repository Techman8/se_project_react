import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfileClick, onLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  // Extract the first letter of the user's name for the circle avatar placeholder fallback
  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <aside className="aside">
      <div className="sidebar__user-container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>

      <div className="sidebar__controls">
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfileClick}
        >
          Edit profile
        </button>

        {/* Added Sign Out button component element node */}
        <button
          type="button"
          className="sidebar__logout-btn"
          onClick={onLogOut}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
