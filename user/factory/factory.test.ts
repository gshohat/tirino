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
  const name = "Gilad";
  const man = createManUser(name, eventEmitter);
  assertEquals(man.name, name);
  assertEquals(man.gender, manUserDetails.gender);
  assertEquals(man.email, manUserDetails.email);
  assertEquals(man.birthdate, manUserDetails.birthdate);
});

Deno.test("create a woman user", () => {
  const name = "Kate";
  const woman = createWomanUser("Kate", eventEmitter);
  assertEquals(woman.name, name);
  assertEquals(woman.gender, womanUserDetails.gender);
  assertEquals(woman.email, womanUserDetails.email);
  assertEquals(woman.birthdate, womanUserDetails.birthdate);
});
