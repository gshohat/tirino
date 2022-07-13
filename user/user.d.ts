import { PlayerClass } from "./user.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";

declare type Events = {
  like: [string];
};

declare type DailyLikes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IUser {
  name: string;
  gender: number;
  email: string;
  birthdate: Date;
}

export interface IRating {
  score: number;
  k: number;
}

export declare enum Gender {
  Male = 0,
  Female = 1,
}

export declare enum SwipeDirection {
  Left = 0,
  Right = 1,
}

export declare class User {
  name: string;
  gender: Gender;
  email: string;
  birthdate: Date;

  class: PlayerClass;
  rating: IRating;
  dailyLikes: DailyLikes;
  eventEmitter: EventEmitter<Events>;

  constructor(user: IUser, eventEmitter: EventEmitter<Events>);

  like(username: string): boolean;

  calcExpectedScore(opponentRatingScore: number): number;
}
