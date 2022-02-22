import React from 'react';
import {AppRoute} from '../../consts';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const FilmCardButtons = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const handlePlayButton = () => {
    navigate(AppRoute.Player);
  }

  const handleMyListButton = () => {
    navigate(AppRoute.MyList);
  }

  return (
    <div className="film-card__buttons">
      <button onClick={handlePlayButton} className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      <button onClick={handleMyListButton} className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
        <span>My list</span>
      </button>
      {location.pathname !== AppRoute.Main
        ? <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
        : ''
      }
    </div>
  );
};

export default FilmCardButtons;
