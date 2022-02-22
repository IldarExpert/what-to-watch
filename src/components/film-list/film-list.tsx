import React, {useState, MouseEvent, useEffect} from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import {FilmData} from '../../types/film-data-from-server';
import {useSelector} from 'react-redux';
import {getIsLoading} from '../../store/data-reducer/selectors';

interface FilmListProps {
  filmList: FilmData[]
}

const FilmList = ({filmList}: FilmListProps): JSX.Element => {
  const [activeCardFilm, setActiveCardFilm] = useState<number>(0);
  const [showVideo, setShowVideo] = useState(0);
  const isLoading = useSelector(getIsLoading);
  let timer: ReturnType<typeof setTimeout> ;

  const handleActiveCardEnter = async (event: any) => {
    let id = event.target.closest('article')?.dataset.id;
    if (!id) id = 0;
    setActiveCardFilm(Number(id));
  }

  const handleActiveCardLeave = (event: any) => {
    let id = event.target.closest('article')?.dataset.id;
    setActiveCardFilm(0);
  }

  useEffect(() => {
    if (activeCardFilm !== 0) {
      timer = setTimeout(() => {
        setShowVideo(activeCardFilm);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      setShowVideo(0);
    };
  }, [activeCardFilm])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div
      onMouseOver={handleActiveCardEnter}
      onMouseLeave={handleActiveCardLeave}
      className="catalog__films-list"
    >
      {filmList.map((film) => (
        <SmallFilmCard
          videoPreview={showVideo === film.id ? film.previewVideoLink : ''}
          filmName={film.name}
          filmImage={film.backgroundImage}
          filmId={film.id}
          key={film.id}
        />
      ))
      }
    </div>
  );
};

export default FilmList;
