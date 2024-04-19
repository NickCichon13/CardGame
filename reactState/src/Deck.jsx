import React, {useEffect, useState} from "react";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeckFromAPI() {
        async function fetchData() {
            const d = await axios.get(`${BASE_URL}/new/shuffle/`);
            setDeck(d.data)
        }
        fetchData();
    },[]);
}

async function draw() {
    try{
        const draw = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);

        if (draw.data.remaining === 0) throw new Error("Deck empty");

        const card = draw.data.card[0];

        setDraw(d => [
            ...d,
            {
                id: card.code,
                name: card.suit + " " + card.value,
                img: card.image
            },
        ]);

    } catch(err){
        return(err);
    }
}

async function startShuffling() {
    setIsShuffling(true);
    try{
        await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
        setDrawn([]);
    } catch (err){
        return(err)
    } finally{
        setIsShuffling(false);
    }
}

function renderDrawBtnIFOK() {
    if (!deck) return null;

    return (
        <button
        className="Deck-gimme"
        onClick={draw}
        disabled={isShuffling}>
            Draw Card
        </button>
    )
}

function renderShuffleBtnIFok() {
    if (!deck) return null;

    return(
        <button
            className="Deck-gimme"
            onClick={startShuffling}
            disabled={isShuffling}>
                Shuffle Deck
            </button>
    );
}

return (
    <main className="deck">

    {renderDrawBtnIFOK()}
    {renderShuffleBtnIFok()}

    <div className="Deck-cardarea">{
        drawn.map(c => (
            <Card key={c.id} name={c.name} image={c.image} />
        ))}
        </div>


    </main>

)

export default Deck;