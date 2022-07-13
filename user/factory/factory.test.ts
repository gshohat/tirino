import {
  createManUser,
  createWomanUser,
  manUserDetails,
  womanUserDetails,
} from "./factory.ts";
import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { EventEmitter } from "../../event-emitter/event-emitter.ts";

type Events = {
  like: [string];
};
const eventEmitter = new EventEmitter<Events>();

Deno.test("create a man user", () => {
  const name = "Romeo";
  const man = createManUser(name, eventEmitter);
  assertEquals(man.name, name);
  assertEquals(man.gender, manUserDetails.gender);
  assertEquals(man.email, "Romeo@gmail.com");
  assertEquals(man.birthdate, manUserDetails.birthdate);
  assertEquals(man.preferences.ageRange.min, 25);
  assertEquals(man.preferences.ageRange.max, 30);
});

Deno.test("create a woman user", () => {
  const name = "Juliet";
  const woman = createWomanUser(name, eventEmitter);
  assertEquals(woman.name, name);
  assertEquals(woman.gender, womanUserDetails.gender);
  assertEquals(woman.email, "Juliet@gmail.com");
  assertEquals(woman.birthdate, womanUserDetails.birthdate);
  assertEquals(woman.preferences.ageRange.min, 25);
  assertEquals(woman.preferences.ageRange.max, 30);
});
