import React, {useEffect} from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFilmList, fetchPromo} from '../../store/api-action';
import {getFilmList, getIsLoading, getPromoFilm} from '../../store/data-reducer/selectors';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import FilmCatalog from '../../components/film-catalog/film-catalog';

const Main = () => {
  const dispatch = useDispatch();

  const filmList = useSelector(getFilmList);
  const promoFilm = useSelector(getPromoFilm);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchPromo());
    dispatch(fetchFilmList());
  }, []);


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218"
                   height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <FilmCardButtons filmData={promoFilm}/>

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <FilmCatalog filmList={filmList}/>

        <Footer/>
      </div>
    </>
  );
};

export default Main;
