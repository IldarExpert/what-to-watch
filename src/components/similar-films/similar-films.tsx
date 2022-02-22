import React from 'react';
import FilmList from '../film-list/film-list';
import {FilmData} from '../../types/film-data-from-server';

interface SimilarFilmsProps {
  similarFilms: FilmData[],
}

const SimilarFilms = ({similarFilms}:SimilarFilmsProps): JSX.Element => {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        <FilmList filmList={similarFilms.slice(0,4)} />
      </div>
    </section>
  );
};

export default SimilarFilms;
