import { IRating, IUser } from "./index.d.ts";
import { EventEmitter } from "./event-emitter/event-emitter.ts";

type Events = {
  like: [string];
};

export class PlayGround {
  users: {
    men: Map<string, User>;
    women: Map<string, User>;
  };
  eventEmitter: EventEmitter<Events>;

  constructor() {
    this.eventEmitter = new EventEmitter<Events>();
    this.eventEmitter.on("like", (payload) => {
      console.log("payload", payload); //todo remove
    });
    this.users = {
      men: new Map<string, User>(),
      women: new Map<string, User>(),
    };
    for (let i = 0; i < 10; i++) {
      const usernameMan = `man${i}`;
      const man = new User({
        username: usernameMan,
        gender: Gender.Male,
      }, this.eventEmitter);
      this.users.men.set(usernameMan, man);

      const usernameWoman = `woman${i}`;
      const woman = new User({
        username: usernameWoman,
        gender: Gender.Female,
      }, this.eventEmitter);
      this.users.women.set(usernameWoman, woman);
    }
  }
}

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

  like(user: User): void {
    console.log("user", user); //todo remove
    this.eventEmitter.emit("like", "hello");
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
