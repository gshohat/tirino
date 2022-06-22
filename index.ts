import { IRating, IUser } from "./index.d.ts";

export class PlayGround {
  men: User[];
  women: User[];

  constructor() {
    this.men = [];
    this.women = [];
    for (let i = 0; i < 10; i++) {
      const man = new User({
        username: `man${i}`,
        gender: Gender.Male,
      });
      const woman = new User({
        username: `woman${i}`,
        gender: Gender.Female,
      });
      this.men.push(man);
      this.women.push(woman);
    }
  }
}

export class User {
  username: string;
  gender: Gender;
  class: PlayerClass;
  rating: IRating;

  constructor(newUser: IUser) {
    const { username, gender } = newUser;
    this.username = username;
    this.gender = gender;
    this.rating = {
      score: 1500,
      k: 32,
    };
    this.class = PlayerClass.C;
  }

  // like(user: User) : number {
  //   //todo event emitter
  // }

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
