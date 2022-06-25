import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { Gender, PlayerClass, User } from "./user.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";

type Events = {
  like: [string];
};

const eventEmitter = new EventEmitter<Events>();

Deno.test("create a man user", () => {
  const username = "gshohat";
  const initialScore = 1500;
  const man = new User({
    username,
    gender: Gender.Male,
  }, eventEmitter);
  assertEquals(man.username, username);
  assertEquals(man.gender, Gender.Male);
  assertEquals(man.rating.score, initialScore);
  assertEquals(man.rating.k, 32);
  assertEquals(man.class, PlayerClass.C);
});

Deno.test("create a woman user", () => {
  const username = "kate";
  const initialScore = 1500;
  const woman = new User({
    username,
    gender: Gender.Female,
  }, eventEmitter);
  assertEquals(woman.username, username);
  assertEquals(woman.gender, Gender.Female);
  assertEquals(woman.rating.score, initialScore);
  assertEquals(woman.rating.k, 32);
  assertEquals(woman.class, PlayerClass.C);
});
