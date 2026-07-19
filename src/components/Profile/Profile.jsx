import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  onCreateModal,
  onEditProfileClick,
  onCardLike,
  onLogOut,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogOut={onLogOut} />
      {/* 2. Passed onCardLike directly into ClothesSection */}
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
        onCardLike={onCardLike}
      />
    </section>
  );
}
