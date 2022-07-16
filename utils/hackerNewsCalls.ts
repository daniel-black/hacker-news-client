import axios from 'axios';
import { User, Item } from '../models';

const instance = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0"
});

export const getMaxItemId = async (): Promise<number> => {
  try {
    const { data, status } = await instance.get('/maxitem.json');
    if (status === 200) {
      return data as number;
    }
    throw new Error('Response was not 200 OK');
  } catch (err) {
    console.error(err);
    return -1;
  }
} 

export const getItem = async (id: number) => {
  try {
    const { data, status } = await instance.get(`item/${id}.json`);
    if (status === 200) {
      return data as Item;
    }
  } catch (err) {
    console.log(err);
  }
}

export const getUser = async (id: string) => {
  try {
    const { data, status } = await instance.get(`user/${id}.json`);
    if (status === 200) {
      return data as User;
    }
  } catch (err) {
    console.log(err);
  }
}

export const getNMostRecentItems = async (n: number = 10) => {
  // Get the maxitem number. Need this before we can do anything else
  const maxItemId = await getMaxItemId();
  
  // Have biggest number, want an array with that number and the n-1 preceding numbers
  const nItems = n > maxItemId ? maxItemId : n;
  const itemIds = [maxItemId];
  for (let i = maxItemId - 1; i > maxItemId - nItems; i--) {
    itemIds.push(i);
  }

  const requests = itemIds.map(id => getItem(id));
  const posts = await Promise.all(requests);

  return posts;
}