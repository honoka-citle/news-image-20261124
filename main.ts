// Entry for make.fun "Sum up 24 November's world news in one image".
//
// The picture itself is the whole entry: a one-page newspaper front sheet
// for Tuesday 24 November 2026, drawn headline by headline so that a reader
// who sees nothing else can still tell what happened in the world that day.
//
//   - Lead: Nvidia reinstates Jensen Huang as CEO after a push from Trump.
//   - Ukraine sinks a Russian warship off Libya; a Russian cargo ship burns
//     in the Gulf of Finland and Kyiv-region strikes kill 14.
//   - COP31 climate talks in Antalya, Türkiye collapse with no pact.
//   - The UN chief urges a global AI risk-management framework within a year.
//   - A candy factory fire in Banten, Indonesia leaves dozens dead or missing.
//   - Drone strikes hit homes and a UN building in Khartoum, Sudan.
//   - Also today: Jimmy Gomez to resign, Democrats clinch a historic House
//     majority, South Korea scrambles jets, and a 6.7 quake hits Peru.
//
// The image lives beside this file as entry.png (1024 x 1024, under 1 MiB).
// This program's only job is to deliver those exact bytes, unchanged, to
// the grader's output file, so the run is fully deterministic: no clock,
// no randomness, no network, nothing read except the bundled picture.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

// The picture bundled with this repository, resolved relative to this file
// so the program works no matter which directory it is launched from.
const sourceImage = new URL("./entry.png", import.meta.url);

// The grader writes to /output; a local run may point elsewhere instead.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputImage = join(outputDir, "entry.png");

// Make sure the destination exists, then copy the bytes across verbatim.
// copyFileSync preserves the file exactly, so two runs always produce
// byte-identical output, as the contest rules require.
mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceImage, outputImage);

// Sanity check the copy that was just written: it must be a non-empty file
// no larger than the contest's 1 MiB cap. Failing loudly here is better
// than handing the grader a truncated or empty picture.
const written = statSync(outputImage);
if (written.size === 0 || written.size > 1_048_576) {
  throw new Error(`entry.png has an invalid size: ${written.size} bytes`);
}
