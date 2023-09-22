import React from "react";

function Card({ card, handleSelected, disabled, rotated }) {
  const handleClick = () => {
    if (!disabled) {
      handleSelected(card);
    }
  };

  return (
    <div className="card">
      <div className={rotated ? "rotated" : ""}>
        <img className="front" src={card.path} alt={card.path} />
        <img className="back" src="/img/cover.png" onClick={handleClick} alt="cover" />
      </div>
    </div>
  );
}

export default Card;
