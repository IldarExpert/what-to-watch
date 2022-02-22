import React, {FormEvent, useState} from 'react';
import './drag-and-drop.css';

type Card = {
  id: number,
  order: number,
  text: string,
}

const DragAndDrop = () => {
  const initList = [
    {id: 1, order: 3, text: 'Карточка 3'},
    {id: 2, order: 1, text: 'Карточка 1'},
    {id: 3, order: 2, text: 'Карточка 2'},
    {id: 4, order: 4, text: 'Карточка 4'},
  ];

  const [cardList, setCardList] = useState(initList);
  const [currentCard, setCurrentCard] = useState<any>(null);

  const dragStartHandler = (evt: React.MouseEvent, card: Card) => {
    console.log('dragStartHandler', card);
    setCurrentCard(card);
  };

  const dragEndHandler = (evt: any) => {
    console.log('dragEndHandler');
    evt.target.style.background = 'white';
  };

  const dragOverHandler = (evt: any) => {
    evt.preventDefault();
    evt.currentTarget.style.background = 'grey';
  };

  const dropHandler = (evt: any, card: Card) => {
    evt.preventDefault();
    setCardList(cardList.map((c) => {
      if (card.id === c.id) {
        return {...c, order: currentCard.order}
      }
      if (c.id === currentCard.id) {
        return {...c, order: card.order}
      }
      return  c;
    }));
  };

  const sortCards = (a: any, b: any) => {
    return a.order - b.order;
  }

  console.log('currentCard', currentCard);
  console.log('cardList', cardList);

  return (
    <div className='card-wrapper'>
      {cardList.sort(sortCards).map((card) =>
        <div
          className='card'
          key={card.id}
          draggable={true}

          onDragStart={(evt) => dragStartHandler(evt, card)}
          onDragLeave={(evt) => dragEndHandler(evt)}
          onDragEnd={(evt) => dragEndHandler(evt)}
          onDragOver={(evt) => dragOverHandler(evt)}
          onDrop={(evt) => dropHandler(evt, card)}
        >
          {card.text}
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
