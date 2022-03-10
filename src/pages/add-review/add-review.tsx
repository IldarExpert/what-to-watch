import React, {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchFilm, postReview} from '../../store/api-action';
import {useDispatch, useSelector} from 'react-redux';
import {getCommentsError, getFilm, getIsLoading} from '../../store/data-reducer/selectors';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {AppRoute} from '../../consts';
import {saveReviewError} from '../../store/actions';

const AddReview = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filmData = useSelector(getFilm);
  const isLoading = useSelector(getIsLoading);
  const commentsError = useSelector(getCommentsError)

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const handleRatingClick = (e: any) => {
    if (e.target.closest('input')) {
      setRating(e.target.closest('input').value);
    }
  }

  const handleReviewChange = (e: any) => {
    setComment(e.target.value);
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) dispatch(postReview(id, {rating, comment}));
  }

  useEffect(() => {
    dispatch(fetchFilm(id));
  }, [id]);

  useEffect(() => {
    let reviewCorrect = comment.length > 50 && comment.length <400;
    if (rating && reviewCorrect) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [rating, comment]);

  useEffect(() => {
    if (commentsError === '') {
      dispatch(saveReviewError(null));
      navigate(AppRoute.OneMoviePage + '/' + id);
    }
  }, [commentsError])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmData.backgroundImage} alt={filmData.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__poster film-card__poster--small">
          <img src={filmData.posterImage} alt={filmData.name} width="218"
               height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form onSubmit={handleFormSubmit} action="#" className="add-review__form">
          <div className="rating">
            <div onClick={handleRatingClick} className="rating__stars">
              <input className="rating__input" id="star-10" type="radio" name="rating" value="10"/>
              <label className="rating__label" htmlFor="star-10">Rating 10</label>

              <input className="rating__input" id="star-9" type="radio" name="rating" value="9"/>
              <label className="rating__label" htmlFor="star-9">Rating 9</label>

              <input className="rating__input" id="star-8" type="radio" name="rating" value="8" />
              <label className="rating__label" htmlFor="star-8">Rating 8</label>

              <input className="rating__input" id="star-7" type="radio" name="rating" value="7"/>
              <label className="rating__label" htmlFor="star-7">Rating 7</label>

              <input className="rating__input" id="star-6" type="radio" name="rating" value="6"/>
              <label className="rating__label" htmlFor="star-6">Rating 6</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>
            </div>
          </div>
          {commentsError?
            <h3>{commentsError}</h3>
            : ''
          }
          <div className="add-review__text">
            <textarea
              onChange={handleReviewChange}
              value={comment}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={disableButton}
              >Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

export default AddReview;
