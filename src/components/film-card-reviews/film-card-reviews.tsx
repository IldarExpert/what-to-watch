import React from 'react';
import {Comment} from '../../types/comments';
import {convertDate} from '../../servises/convert-date';

interface FilmDataReviewsProps {
  comments: Comment[],
}

const FilmCardReviews = ({comments}: FilmDataReviewsProps) => {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((comment, i) => {
          if (i % 2 === 0) {
            return (
              <div key={comment.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time className="review__date" dateTime={comment.date}>{convertDate(comment.date)}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            );
          }
        })
        }
      </div>
      <div className="film-card__reviews-col">
        {comments.map((comment, i) => {
          if (i % 2 !== 0) {
            return (
              <div key={comment.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time className="review__date" dateTime={comment.date}>{convertDate(comment.date)}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            );
          }
        })
        }
      </div>
    </div>
  );
};

export default FilmCardReviews;
