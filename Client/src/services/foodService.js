// import axios from "axios";

// export const getAll = async () => {
//   const {data} = await axios.get('/api/foods');
//   return data;
// }

// export const search = async (searchTerm) => 
//   {
//     const {data} = await axios.get('/api/foods/search' + searchTerm);
//    return data;
//   }

// export const gettAllTags = async()=>{
//   const {data} = await axios.get('/api/foods/tags');
//   return data;
// } 

// export const gettAllByTag = async tag =>{
//   if(tag==='All') return getAll();
//   const {data} = await axios.get('/api/foods/tag' + tag);
//   return data;
// }

// export const getById = async foodId =>
// {
//   const {data} = await axios.get('/api/foods/'+ foodId);
//   return data;
// }

import { sample_foods, sample_tags } from "../data";

export const getAll = async () => sample_foods;

export const search = async (searchTerm) => 
  sample_foods.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

export const gettAllTags = async()=>sample_tags;  

export const gettAllByTag = async tag =>{
  if(tag==='All') return getAll();
  return sample_foods.filter(item=>item.tags?.includes(tag));
}

export const getById = async foodId =>
sample_foods.find(item => item.id === foodId);