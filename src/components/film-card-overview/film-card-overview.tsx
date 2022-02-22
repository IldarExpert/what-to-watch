import React from 'react';
import {transformRating} from '../../servises/transform-rating';
import {FilmData} from '../../types/film-data-from-server';

interface FilmCardOverviewProps {
  filmData: FilmData,
}

const FilmCardOverview = ({filmData}: FilmCardOverviewProps) => {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmData.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{transformRating(filmData.rating)}</span>
          <span className="film-rating__count">{filmData.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{filmData.description}</p>
        <p className="film-card__director"><strong>Director: {filmData.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {filmData.starring.join(', ')}</strong></p>
      </div>
    </>
  );
};

export default FilmCardOverview;
