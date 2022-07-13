import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { Gender, User } from "./user.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";
import { ILocation } from "./user.d.ts";

type Events = {
  like: [string];
};

const eventEmitter = new EventEmitter<Events>();

const viennaLocation: ILocation = {
  Latitude: 48.210033,
  Longitude: 16.363449,
};

Deno.test("max 8 likes a day", () => {
  const manName = "gshohat";
  const man = new User({
    name: manName,
    gender: Gender.Male,
    birthdate: new Date(1990, 1, 1),
    email: "contact@giladshohat.com",
    location: viennaLocation,
  }, eventEmitter);

  const womanUsername = "kate";

  for (let i = 1; i < 9; i++) {
    const res = man.like(womanUsername);
    assertEquals(res, true);
  }
  const res = man.like(womanUsername);
  assertEquals(res, false);
});
