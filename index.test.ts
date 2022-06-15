import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { createPlayGround } from "./index.ts";

Deno.test("create users playground", () => {
  const playGround = createPlayGround();
  assertEquals(playGround.men[0].username, "man0");
});
