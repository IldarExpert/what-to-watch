import React from 'react';
import {FilmData} from '../../types/film-data-from-server';
import {Comment} from '../../types/comments';
import FilmCardOverview from '../film-card-overview/film-card-overview';
import FilmCardDetails from '../film-card-details/film-card-details';
import FilmCardReviews from '../film-card-reviews/film-card-reviews';

interface TabsProps {
  filmData: FilmData,
  activeTab: number,
  comments: Comment[],
}

const Tabs = ({activeTab, filmData, comments}: TabsProps) => {


  switch (activeTab) {
    case 1:
      return (
        <FilmCardDetails filmData={filmData}/>
      );
    case 2:
      return (
        <FilmCardReviews comments={comments}/>
      );
    default:
      return <FilmCardOverview filmData={filmData}/>
  }
};

export default Tabs;
