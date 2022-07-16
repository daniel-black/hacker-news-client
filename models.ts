// Defines the shape of response objects from the Hacker News API

export type StoryType = 'top' | 'new' | 'best';

export interface ItemModel {
  id: number,
  deleted: boolean,
  type: "job" | "story" | "comment" | "poll" | "pollopt",
  by: string,
  time: number,        // unix time 
  text: string,        // HTML string
  dead?: boolean,
  parent: ItemModel, 
  poll?: ItemModel,
  kids?: number[],     // the ids of the item's comments, in ranked display order
  url?: string,
  score: number,       // story's score or votes on a pollopt
  title: string,
  parts?: ItemModel,
  descendants?: number
}

export interface UserModel {
  id: string,
  created: number,
  karma: number,
  about?: string,
  submitted?: number[]
}