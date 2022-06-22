import { PlayerClass } from "./index.ts";

export interface IUser {
  username: string;
  gender: Gender;
}

export interface IRating {
  score: number;
  k: number;
}

export declare class PlayGround {
  men: User[];
  women: User[];

  constructor();
}

export declare enum Gender {
  Male = 0,
  Female = 1,
}

export declare enum SwipeDirection {
  Left = 0,
  Right = 1,
}

export declare function create(): PlayGround;

export declare class User {
  username: string;
  gender: Gender;
  class: PlayerClass;
  rating: IRating;

  constructor(user: IUser);

  // like(user: User) : number;

  calcExpectedScore(opponentRatingScore: number): number;
}
