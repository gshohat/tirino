import { EventEmitter } from "../event-emitter/event-emitter.ts";
import { Gender, User } from "../user/user.ts";
import { ILocation } from "../user/user.d.ts";

type Events = {
  like: [string];
};

const viennaLocation: ILocation = {
  Latitude: 48.210033,
  Longitude: 16.363449,
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
      //todo replace
      console.log("payload", payload);
    });
    this.users = {
      men: new Map<string, User>(),
      women: new Map<string, User>(),
    };
    for (let i = 0; i < 10; i++) {
      const manName = `man${i}`;
      const man = new User({
        name: manName,
        gender: Gender.Male,
        email: "contact@giladshohat.com",
        birthdate: new Date(1990, i, 1),
        location: viennaLocation,
      }, this.eventEmitter);
      this.users.men.set(manName, man);

      const womanUsername = `woman${i}`;
      const woman = new User({
        name: womanUsername,
        gender: Gender.Female,
        email: "kate@gmail.com",
        birthdate: new Date(1990, i, 1),
        location: viennaLocation,
      }, this.eventEmitter);
      this.users.women.set(womanUsername, woman);
    }
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
