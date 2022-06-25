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
