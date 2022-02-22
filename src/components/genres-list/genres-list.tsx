import React, {useState} from 'react';
import {Link} from 'react-router-dom';

interface GenresListProps {
  genresList: string[],
  handleFilterGenresClick: any,
}

const GenresList = ({genresList, handleFilterGenresClick}: GenresListProps) => {
  const [currentGenre, setCurrentGenre] = useState('all');

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${currentGenre === 'all'? 'catalog__genres-item--active' : ''}`}>
        <Link
          onClick={() => {
            handleFilterGenresClick('all');
            setCurrentGenre('all');
          }}
          to="#"
          className="catalog__genres-link"
        >All genres</Link>
      </li>
      {genresList.map((genre) => {
        return (
          <li key={genre} className={`catalog__genres-item ${currentGenre === genre? 'catalog__genres-item--active' : ''}`}>
            <Link
              onClick={() => {
                handleFilterGenresClick(genre);
                setCurrentGenre(genre);
              }}
              to="#"
              className="catalog__genres-link"
            >{genre}</Link>
          </li>
        )
      })

      }

    </ul>
  );
};

export default GenresList;
