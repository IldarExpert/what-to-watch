import React, {useEffect} from 'react';
import Footer from '../../components/footer/footer';
import {useDispatch, useSelector} from 'react-redux';
import {getComments, getFilm, getIsLoading, getSimilarFilms} from '../../store/data-reducer/selectors';
import {useParams} from 'react-router-dom';
import {fetchFilm, fetchReviews, fetchSimilarFilms} from '../../store/api-action';
import Header from '../../components/header/header';
import SimilarFilms from '../../components/similar-films/similar-films';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';

const MoviePage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const filmData = useSelector(getFilm);
  const similarFilms = useSelector(getSimilarFilms);
  const comments = useSelector(getComments);

  useEffect(() => {
    dispatch(fetchFilm(id));
    dispatch(fetchSimilarFilms(id));
    dispatch(fetchReviews(id));
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={filmData.backgroundImage} alt={filmData.name}/>
          </div>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmData.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmData.genre}</span>
                <span className="film-card__year">{filmData.released}</span>
              </p>

            <FilmCardButtons filmData={filmData} />
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={filmData.posterImage} alt={filmData.name} width="218"
                   height="327"/>
            </div>

            <FilmCardDescription filmData={filmData} comments={comments}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <SimilarFilms similarFilms={similarFilms}/>
        <Footer/>
      </div>
    </>
  );
};

export default MoviePage;
