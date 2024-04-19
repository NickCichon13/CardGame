import React, {useState} from "react";

// This will render the card as recived from the deck
// The angle, xPos, and yPos are generated randomly to position the card once drawn.
function CardImg({name, img}) {
    const [{ angle, xPos, yPos }] = useState({
        angle: Math.random() * 90 -45,
        xPos: Math.random() * 40 -20,
        yPos: Math.random() * 40 -20
    });

    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}))`;

    return (
        <img
        className="Card"
        alt={name}
        src={img}
        style={{transform}}
        />
    )
}
export default CardImg;