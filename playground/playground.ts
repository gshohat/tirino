import { EventEmitter } from "../event-emitter/event-emitter.ts";
import { Gender, User } from "../user/user.ts";
import { createManUser, createWomanUser } from "../user/factory/factory.ts";
import { IUsers } from "./playground.d.ts";

type Events = {
  like: [string];
};

export class PlayGround {
  users: IUsers;
  eventEmitter: EventEmitter<Events>;

  constructor() {
    this.eventEmitter = new EventEmitter<Events>();
    this.eventEmitter.on("like", (payload) => {
      //todo replace
      console.log("payload", payload);
    });
    this.users = {
      men: new Map<string, User>(),
      women: new Map<string, User>(),
    };
    //todo extract
    for (let i = 0; i < 10; i++) {
      const manName = `man${i}`;
      const manBirthdate = new Date(1990 - i, 0, 1);
      //todo extract with gender
      const man = createManUser(manName, manBirthdate, this.eventEmitter);
      this.users.men.set(man.email, man);

      const womanName = `woman${i}`;
      const womanBirthDate = new Date(1990 - i, 0, 1);
      const woman = createWomanUser(
        womanName,
        womanBirthDate,
        this.eventEmitter,
      );
      this.users.women.set(woman.email, woman);
    }

    createPools(this.users);
  }

  resetDailyLikes(username: string, gender: Gender) {
    if (gender === Gender.Male) {
      const man = this.users.men.get(username);
      return man!.dailyLikes = 0;
    } else {
      const woman = this.users.women.get(username);
      return woman!.dailyLikes = 0;
    }
  }
}

const createPools = (users: IUsers) => {
  //todo extract for loop
  for (const [_manEmail, man] of users.men.entries()) {
    const agePreference = man.preferences.ageRange;
    for (const [womanEmail, woman] of users.women.entries()) {
      const res = isAgeBetweenRange(
        woman.age.years,
        agePreference.min,
        agePreference.max,
      );
      if (!res) continue;
      man.pool.push({ email: womanEmail, ageYears: woman.age.years });
    }
  }
  for (const [_womanEmail, woman] of users.men.entries()) {
    const ageRangePreference = woman.preferences.ageRange;
    for (const [manEmail, man] of users.men.entries()) {
      const res = isAgeBetweenRange(
        man.age.years,
        ageRangePreference.min,
        ageRangePreference.max,
      );
      if (!res) continue;
      woman.pool.push({ email: manEmail, ageYears: man.age.years });
    }
  }
};

export const isAgeBetweenRange = (
  age: number,
  min: number,
  max: number,
): boolean => {
  return (age >= min && age <= max);
};
