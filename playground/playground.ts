import { EventEmitter } from "../event-emitter/event-emitter.ts";
import { Gender, User } from "../user/user.ts";

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
      //todo replace
      console.log("payload", payload);
    });
    this.users = {
      men: new Map<string, User>(),
      women: new Map<string, User>(),
    };
    for (let i = 0; i < 10; i++) {
      const manUsername = `man${i}`;
      const man = new User({
        username: manUsername,
        gender: Gender.Male,
      }, this.eventEmitter);
      this.users.men.set(manUsername, man);

      const womanUsername = `woman${i}`;
      const woman = new User({
        username: womanUsername,
        gender: Gender.Female,
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
