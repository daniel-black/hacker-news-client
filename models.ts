// Defines the shape of response objects from the Hacker News API

export interface Item {
  id: number,
  deleted: boolean,
  type: "job" | "story" | "comment" | "poll" | "pollopt",
  by: string,
  time: number,        // unix time 
  text: string,        // HTML string
  dead?: boolean,
  parent: Item, 
  poll?: Item,
  kids?: number[],     // the ids of the item's comments, in ranked display order
  url?: string,
  score: number,       // story's score or votes on a pollopt
  title: string,
  parts?: Item,
  descendants?: number
}

export interface User {
  id: string,
  created: number,
  karma: number,
  about?: string,
  submitted?: number[]
}