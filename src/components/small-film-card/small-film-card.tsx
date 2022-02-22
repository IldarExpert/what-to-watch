import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {AppRoute} from '../../consts';
import styled from 'styled-components';

interface SmallFilmCard {
  filmName: string,
  filmImage: string,
  filmId: number,
  videoPreview?: string,
}

const VideoContainer = styled.video`
  object-fit: contain;
`;

const SmallFilmCard = ({filmName, filmImage, filmId, videoPreview}: SmallFilmCard) => {

  return (
    <article data-id={filmId}
             className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        {videoPreview
          ? <VideoContainer
            // poster={filmImage}
            src={videoPreview}
            width="280"
            height="175"
            autoPlay
            loop
            muted
            playsInline
          />
          : <img src={filmImage}
                 alt={filmName} width="280" height="175"/>
        }

      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.OneMoviePage}/${filmId}`}>{filmName}</Link>
      </h3>
    </article>
  );
};

export default SmallFilmCard;
