import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { Gender, PlayerClass, PlayGround, User } from "./index.ts";

Deno.test("create a man user", () => {
  const username = "gshohat";
  const initialScore = 1500;
  const man = new User({
    username,
    gender: Gender.Male,
  });
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
  });
  assertEquals(woman.username, username);
  assertEquals(woman.gender, Gender.Female);
  assertEquals(woman.rating.score, initialScore);
  assertEquals(woman.rating.k, 32);
  assertEquals(woman.class, PlayerClass.C);
});

Deno.test("create users playground", () => {
  const playGround = new PlayGround();
  assertEquals(playGround.men[0].username, "man0");
  assertEquals(playGround.women[0].username, "woman0");
});

// Deno.test("man was liked by a higher elo", () => {
//     const playGround = new PlayGround();
//     const man0 = playGround.men[0];
//     const woman0 = playGround.men[0];
//
//     const isEventEmitted = woman0.like(man0);
//     assertEquals(isEventEmitted, true);
// });

Deno.test("man is expected to be rejected by a woman", () => {
  const man = new User({
    username: "gshohat",
    gender: Gender.Male,
  });
  const womanRatingScore = 1600;

  const expectedScoreResult = man.calcExpectedScore(womanRatingScore);

  assertEquals(expectedScoreResult, 0.36);
});
