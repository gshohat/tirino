import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { Gender, PlayerClass, PlayGround, User } from "./index.ts";
import { EventEmitter } from "./event-emitter/event-emitter.ts";

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

Deno.test("create users playground", () => {
  const playGround = new PlayGround();

  const man0 = playGround.users.men.get("man0");
  const woman0 = playGround.users.women.get("woman0");

  assertEquals(man0!.username, "man0");
  assertEquals(woman0!.username, "woman0");
});

Deno.test("man was liked by a higher elo", () => {
  const playGround = new PlayGround();

  const man0 = playGround.users.men.get("man0")!;
  const woman0 = playGround.users.women.get("woman0")!;

  woman0!.like(man0);
  //todo assert spyOn callback to be executed
});

Deno.test("man is expected to be liked by a woman", () => {
  const man = new User({
    username: "gshohat",
    gender: Gender.Male,
  }, eventEmitter);
  const womanRatingScore = 1400;

  const expectedScoreResult = man.calcExpectedScore(womanRatingScore);

  assertEquals(expectedScoreResult, 0.64);
});

Deno.test("man is expected to be rejected by a woman", () => {
  const man = new User({
    username: "gshohat",
    gender: Gender.Male,
  }, eventEmitter);
  const womanRatingScore = 1600;

  const expectedScoreResult = man.calcExpectedScore(womanRatingScore);

  assertEquals(expectedScoreResult, 0.36);
});
