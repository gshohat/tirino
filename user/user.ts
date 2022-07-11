import { IRating, IUser } from "./user.d.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";

type Events = {
  like: [string];
};

type DailyLikes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class User {
  username: string;
  gender: Gender;
  class: PlayerClass;
  rating: IRating;
  dailyLikes: DailyLikes;
  eventEmitter: EventEmitter<Events>;

  constructor(newUser: IUser, eventEmitter: EventEmitter<Events>) {
    this.eventEmitter = eventEmitter;
    const { username, gender } = newUser;
    this.username = username;
    this.gender = gender;
    this.rating = {
      score: 1500,
      k: 32,
    };
    this.dailyLikes = 0;
    this.class = PlayerClass.C;
  }

  like(username: string): boolean {
    if (this.dailyLikes === 8) {
      return false;
    }
    //todo?
    this.eventEmitter.emit("like", username);
    this.dailyLikes++;
    return true;
  }

  calcExpectedScore(opponentRatingScore: number): number {
    const expectedScore = 1 /
      (1 + Math.pow(10, (opponentRatingScore - this.rating.score) / 400));
    return parseFloat(expectedScore.toFixed(2));
  }
}

export enum Gender {
  Male,
  Female,
}

export enum PlayerClass {
  J,
  I,
  H,
  G,
  F,
  E,
  D,
  C,
  B,
  A,
}

export enum SwipeDirection {
  Left,
  Right,
}
