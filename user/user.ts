import { IRating, IUser } from "./user.d.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";

type Events = {
  like: [string];
};

export class User {
  username: string;
  gender: Gender;
  class: PlayerClass;
  rating: IRating;
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
    this.class = PlayerClass.C;
  }

  like(username: string): void {
    this.eventEmitter.emit("like", username);
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
