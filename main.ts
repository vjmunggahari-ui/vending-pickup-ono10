import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Take the last chocolate bar. I was saving it for someone special, and the coil just picked you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: gate is 1-200 chars, UTF-8, no trailing newline.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
if (back.length < 1 || back.length > 200) {
  throw new Error(`entry length ${back.length} outside 1-200`);
}
if (back.endsWith("\n")) throw new Error("trailing newline");
if (!back.includes("coil")) throw new Error("missing machine-world anchor 'coil'");
if (!back.endsWith("picked you.")) {
  throw new Error("punch must land on the last words");
}
if (back.includes("  ")) throw new Error("double space");
console.log(`wrote ${outPath} (${back.length} chars)`);
