import { ILocation, IPreferences, IUserDetails } from "./user.d.ts";
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
  preferences: IPreferences;

  dailyLikes: DailyLikes;
  eventEmitter: EventEmitter<Events>;

  constructor(newUser: IUserDetails, eventEmitter: EventEmitter<Events>) {
    this.dailyLikes = 0;
    this.eventEmitter = eventEmitter;

    const { name, gender, email, birthdate, location, preferences } = newUser;
    this.name = name as string;
    this.gender = gender;
    this.email = email as string;
    this.birthdate = birthdate;
    this.location = location;
    this.preferences = preferences;
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
