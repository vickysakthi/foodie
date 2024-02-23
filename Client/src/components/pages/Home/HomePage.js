import React, { useEffect, useReducer } from 'react'
import { getAll, gettAllByTag, gettAllTags, search } from '../../../services/foodService';
import Thumbnails from '../../Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../Search/Search';
import Tags from '../../Tags/Tags';
import NotFound from '../../NotFound/NotFound';
// import { type } from '@testing-library/user-event/dist/type';

const initialState = { foods:[], tags: []};

const reducer = (state,action) =>{
  switch(action.type){
    case 'FOODS_LOADED':
      return{...state, foods: action.payload};
      case 'TAGS_LOADED':
        return{...state, tags: action.payload};
      default:
        return state;
  }
};
export default function HomePage() {
  const [state,dispatch] = useReducer(reducer,initialState);
  const {foods,tags} = state;
  const {searchTerm, tag} = useParams();

  useEffect (() => {
     gettAllTags().then(tags => dispatch({type: 'TAGS_LOADED', payload: tags}));

    const loadFoods = tag
    ? gettAllByTag(tag)
    : searchTerm 
    ? search(searchTerm) 
    : getAll();

    loadFoods.then(foods => dispatch({type:'FOODS_LOADED' , payload:foods}));
      },[searchTerm, tag]);
  return (
    <>
    <Search/>
    <Tags tags={tags}/>
    {foods.length === 0 && <NotFound linkText="Reset Search"/>}
    <Thumbnails foods={foods} />
    </>
  )
}
