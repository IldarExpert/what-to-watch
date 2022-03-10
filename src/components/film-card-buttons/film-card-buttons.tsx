import React from 'react';
import {AppRoute, AuthStatus} from '../../consts';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPromoFilm} from '../../store/data-reducer/selectors';
import {postMyList} from '../../store/api-action';
import {FilmData} from '../../types/film-data-from-server';
import {getAuthStatus} from '../../store/user-reducer/selectors';

interface FilmCardButtonsProps {
  filmData: FilmData,
}

const FilmCardButtons = ({filmData}: FilmCardButtonsProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const promo = useSelector(getPromoFilm);
  const authStatus = useSelector(getAuthStatus);

  const handlePlayButton = () => {
    navigate(AppRoute.PlayerShow + '/' + filmData.id);
  }

  const handleMyListButton = () => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(postMyList(filmData.id, filmData.isFavorite, promo.id));
    } else {
      navigate(AppRoute.SignIn);
    }
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
        {filmData.isFavorite?
          <svg data-testid="inList" viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list" />
          </svg>
          :
          <svg data-testid="add" viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"/>
          </svg>
        }
        <span>My list</span>
      </button>
      {location.pathname !== AppRoute.Main
        ? authStatus===AuthStatus.Auth && <Link to={AppRoute.Films + '/' + filmData.id + '/review'} className="btn film-card__button">Add review</Link>
        : ''
      }
    </div>
  );
};

export default FilmCardButtons;
