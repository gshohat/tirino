import { PlayerClass } from "./user.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";

declare type Events = {
  like: [string];
};

export interface IUser {
  username: string;
  gender: Gender;
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
  username: string;
  gender: Gender;
  class: PlayerClass;
  rating: IRating;
  eventEmitter: EventEmitter<Events>;

  constructor(user: IUser, eventEmitter: EventEmitter<Events>);

  like(username: string): void;

  calcExpectedScore(opponentRatingScore: number): number;
}
