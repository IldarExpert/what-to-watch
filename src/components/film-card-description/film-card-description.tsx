import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FilmData} from '../../types/film-data-from-server';
import Tabs from '../tabs/tabs';
import {useSelector} from 'react-redux';
import {getComments} from '../../store/data-reducer/selectors';

interface FilmCardDescriptionProps {
  filmData: FilmData,
}

const FilmCardDescription = ({filmData}: FilmCardDescriptionProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const comments = useSelector(getComments);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === 0? 'film-nav__item--active': ''}`}>
            <Link onClick={() => setActiveTab(0)} to={''} className="film-nav__link">Overview</Link>
          </li>
          <li className={`film-nav__item ${activeTab === 1? 'film-nav__item--active': ''}`}>
            <Link onClick={() => setActiveTab(1)} to={''} className="film-nav__link">Details</Link>
          </li>
          <li className={`film-nav__item ${activeTab === 2? 'film-nav__item--active': ''}`}>
            <Link onClick={() => setActiveTab(2)} to={''} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      <Tabs activeTab={activeTab} filmData={filmData} comments={comments}/>

    </div>
  );
};

export default FilmCardDescription;
