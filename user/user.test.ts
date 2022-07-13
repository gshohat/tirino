import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { Gender, PlayerClass, User } from "./user.ts";
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

Deno.test("create a man user", () => {
  const name = "Gilad";
  const initialScore = 1500; //todo remove
  const email = "contact@giladshohat.com";
  const birthdate = new Date(1986, 1, 1);
  const man = new User({
    name,
    gender: Gender.Male,
    email,
    birthdate,
    location: viennaLocation,
  }, eventEmitter);
  assertEquals(man.name, name);
  assertEquals(man.gender, Gender.Male);
  assertEquals(man.rating.score, initialScore);
  assertEquals(man.rating.k, 32);
  assertEquals(man.class, PlayerClass.C);
  assertEquals(man.email, email);
  assertEquals(man.birthdate, birthdate);
});

Deno.test("create a woman user", () => {
  const name = "kate";
  const initialScore = 1500;
  const email = "kate@gmail.com";
  const birthdate = new Date(1986, 1, 2);

  const woman = new User({
    name,
    gender: Gender.Female,
    email,
    birthdate,
    location: viennaLocation,
  }, eventEmitter);
  assertEquals(woman.name, name);
  assertEquals(woman.gender, Gender.Female);
  assertEquals(woman.rating.score, initialScore);
  assertEquals(woman.rating.k, 32);
  assertEquals(woman.class, PlayerClass.C);
  assertEquals(woman.email, email);
  assertEquals(woman.birthdate, birthdate);
});

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
