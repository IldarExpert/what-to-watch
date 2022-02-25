import React from 'react';
import {convertTime} from '../../servises/convert-time';
import {FilmData} from '../../types/film-data-from-server';

interface FilmCardDetailsProps {
  filmData: FilmData,
}

const FilmCardDetails = ({filmData}: FilmCardDetailsProps) => {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{filmData.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
                {filmData.starring.map((actor, i) => {
                  if (i === filmData.starring.length - 1) return actor;
                  return <span key={actor}>{actor + ','}<br/></span>
                })
                }
              </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{convertTime(filmData.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{filmData.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{filmData.released}</span>
        </p>
      </div>
    </div>
  );
};

export default FilmCardDetails;
