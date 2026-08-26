import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ideasUrl = new URL("../app/data/ideas.json", import.meta.url);

test("ships the complete contiguous 1,697-idea ranking", async () => {
  const ideas = JSON.parse(await readFile(ideasUrl, "utf8"));

  assert.equal(ideas.length, 1697);
  assert.deepEqual(
    ideas.map(({ rank }) => rank),
    Array.from({ length: 1697 }, (_, index) => index + 1),
  );
  assert.equal(ideas[0].name, "Oathmesh");
  assert.equal(ideas.at(-1).name, "SemperSentry");
});
