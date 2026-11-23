// How Many Tabs Do You Have Open? — a single digits-only count,
// written to /output/entry.txt.
//
// Craft notes (written against the published judge brief):
// - Criterion 1 and 2 are absolute: the entry is exactly one number in
//   digits, with no words, no punctuation and no second number. So the
//   file holds the two characters "87" and nothing else — no label, no
//   unit, and no trailing newline, because a newline is a character the
//   gate counts and the judge reads the text exactly as submitted.
// - Criterion 3 wants a count that is surprising: far higher, far lower
//   or stranger than the field would guess. 87 is far above the tidy
//   single-digit or low-teens counts most people report, yet it is not
//   a round, invented-looking figure like 100 or 1000.
// - Criterion 4 wants believable: 87 open tabs is a real, lived-in
//   number for someone mid-research across many projects — heavy, but
//   plainly possible, not an absurd shock figure.
// - Criterion 5 wants a life hinted at with no explanation: an odd,
//   unrounded count like 87 reads as counted, not chosen — the residue
//   of sessions that were never cleaned up.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The count, assembled from its digits so it is written digit for
// digit, never reformatted by number-to-string conversion: eight
// tens and seven ones, eighty-seven tabs left open.
const DIGITS = ["8", "7"];
const TAB_COUNT = DIGITS.join("");

function main(): void {
  // The gate: /output/entry.txt is UTF-8 text of 1 to 5 characters,
  // not only white space. Digits only, per the brief.
  if (!/^[0-9]{1,5}$/.test(TAB_COUNT)) {
    throw new Error(`entry must be 1 to 5 digits, got ${JSON.stringify(TAB_COUNT)}`);
  }

  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const entryPath = join(outDir, "entry.txt");
  writeFileSync(entryPath, TAB_COUNT, "utf-8");

  // Read it back and prove the file on disk is the entry and nothing
  // else: same digits, same length, no stray newline crept in.
  const written = readFileSync(entryPath, "utf-8");
  if (written !== TAB_COUNT) {
    throw new Error(`entry on disk differs: ${JSON.stringify(written)}`);
  }
}

main();
