import React, {useEffect} from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMyList} from '../../store/api-action';
import {getMyList} from '../../store/user-reducer/selectors';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import FilmList from '../../components/film-list/film-list';

const MyList = () => {
  const dispatch = useDispatch();
  const myList = useSelector(getMyList);

  useEffect(() => {
    dispatch(fetchMyList());
  }, [])

  return (
    <div className="user-page">
      <Header/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList filmList={myList} />

      </section>

      <Footer/>
    </div>
  );
};

export default MyList;
