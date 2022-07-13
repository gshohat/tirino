import { Gender, User } from "../user/user.ts";
import { PlayGround } from "./playground.ts";
import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";
import {
  assertSpyCall,
  spy,
} from "https://deno.land/std@0.137.0/testing/mock.ts";
import { ILocation } from "../user/user.d.ts";

type Events = {
  like: [string];
};

const eventEmitter = new EventEmitter<Events>();

const viennaLocation: ILocation = {
  Latitude: 48.210033,
  Longitude: 16.363449,
};

Deno.test("create users playground", () => {
  const playGround = new PlayGround();

  const man0 = playGround.users.men.get("man0");
  const woman0 = playGround.users.women.get("woman0");

  assertEquals(man0!.name, "man0");
  assertEquals(woman0!.name, "woman0");
});

Deno.test("man is expected to be liked by a woman", () => {
  const man = new User({
    name: "gshohat",
    gender: Gender.Male,
    email: "contact@giladshohat.com",
    birthdate: new Date(1990, 1, 1),
    location: viennaLocation,
  }, eventEmitter);
  const womanRatingScore = 1400;

  const expectedScoreResult = man.calcExpectedScore(womanRatingScore);

  assertEquals(expectedScoreResult, 0.64);
});

Deno.test("man is expected to be rejected by a woman", () => {
  const man = new User({
    name: "gshohat",
    gender: Gender.Male,
    email: "contact@giladshohat.com",
    birthdate: new Date(1990, 1, 1),
    location: viennaLocation,
  }, eventEmitter);
  const womanRatingScore = 1600;

  const expectedScoreResult = man.calcExpectedScore(womanRatingScore);

  assertEquals(expectedScoreResult, 0.36);
});

Deno.test("man was liked by a higher elo", () => {
  const playGround = new PlayGround();

  const emitSpy = spy(playGround.eventEmitter, "emit");

  const manEmail = playGround.users.men.get("man0")!.email;
  const woman0 = playGround.users.women.get("woman0")!;

  woman0!.like(manEmail);
  assertSpyCall(emitSpy, 0, {
    args: ["like", manEmail],
  });
});

Deno.test("reset daily counter likes", () => {
  const playGround = new PlayGround();
  const email = "man0";
  const man0 = playGround.users.men.get(email);
  man0!.dailyLikes = 8;
  const likesDailyCounter = playGround.resetDailyLikes(email, Gender.Male);
  assertEquals(likesDailyCounter, 0);
});
