import { ILocation, IUser } from "./user.d.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";

type Events = {
  like: [string];
};

type DailyLikes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class User {
  name: string;
  gender: Gender;
  email: string;
  birthdate: Date;
  location: ILocation;
  dailyLikes: DailyLikes;
  eventEmitter: EventEmitter<Events>;

  constructor(newUser: IUser, eventEmitter: EventEmitter<Events>) {
    this.eventEmitter = eventEmitter;
    const { name, gender, email, birthdate, location } = newUser;
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.birthdate = birthdate;
    this.location = location;

    this.dailyLikes = 0;
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
}

export enum Gender {
  Male,
  Female,
}
