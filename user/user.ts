import { ILocation, IPreferences, IUserDetails } from "./user.d.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";
import { IPartner } from "./user.d.ts";
type Events = {
  like: [string];
};

type DailyLikes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class User {
  name: string;
  gender: Gender;
  email: string;
  age: {
    birthdate: Date;
    years: number;
  };
  location: ILocation;
  preferences: IPreferences;
  pool: IPartner[];

  dailyLikes: DailyLikes;
  eventEmitter: EventEmitter<Events>;

  constructor(newUser: IUserDetails, eventEmitter: EventEmitter<Events>) {
    this.dailyLikes = 0;
    this.eventEmitter = eventEmitter;

    const { name, gender, email, birthdate, location, preferences } = newUser;
    this.name = name as string;
    this.gender = gender;
    this.email = email as string;
    this.age = {
      birthdate: birthdate as Date,
      years: calculateAge(birthdate as Date),
    };
    this.location = location;
    this.preferences = preferences;
    this.pool = [];
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

export const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
