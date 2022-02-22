import React, {useEffect, useState} from 'react';
import FilmList from '../film-list/film-list';
import {FilmData} from '../../types/film-data-from-server';
import GenresList from '../genres-list/genres-list';
import {FILM_PER_PAGE, GENRES_PER_PAGE} from '../../consts';

interface FilmCatalogProps {
  filmList: FilmData[],
}

const FilmCatalog = ({filmList}: FilmCatalogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filmListCurrentPage, setFilmListCurrentPage] = useState<FilmData[]>([]);
  const [filteredFilmList, setFilteredFilmList] = useState<FilmData[]>([]);
  const [showButton, setShowButton] = useState(false);

  const genresList = Array.from(
    new Set(
      filmList.map((film) => film.genre)))
    .slice(0, GENRES_PER_PAGE);

  const handleShowMoreClick = () => {
    setCurrentPage((prev) => prev + 1);
  }

  const handleFilterGenresClick = (genre: string) => {
    setCurrentPage(1);
    if (genre === 'all')
    {
      setFilmListCurrentPage(filmList.slice(0, FILM_PER_PAGE));
      setFilteredFilmList(filmList);
    } else {
      setFilmListCurrentPage(filmList.filter((film) => film.genre === genre).slice(0, FILM_PER_PAGE));
      setFilteredFilmList(filmList.filter((film) => film.genre === genre));
    }
  }

  useEffect(() => {
    setFilteredFilmList(filmList);
  }, [filmList])

  useEffect(() => {
    setFilmListCurrentPage(filteredFilmList.slice(0, FILM_PER_PAGE * currentPage));
  }, [currentPage, filteredFilmList])

  useEffect(() => {
    setShowButton(filteredFilmList.length/FILM_PER_PAGE > currentPage);
  }, [filteredFilmList, currentPage])


  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList genresList={genresList} handleFilterGenresClick={handleFilterGenresClick}/>

      <FilmList filmList={filmListCurrentPage}/>

      <div className="catalog__more">
        {showButton?
          <button onClick={handleShowMoreClick} className="catalog__button" type="button">Show more</button>
          : ''
        }

      </div>
    </section>
  );
};

export default FilmCatalog;
