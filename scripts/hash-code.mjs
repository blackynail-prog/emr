import { createHash } from "node:crypto";

const [hospitalId, code, pepper] = process.argv.slice(2);
if (!hospitalId || !code || !pepper) {
  console.error("Usage: node scripts/hash-code.mjs <UJB|NHIS|KHU> <CODE> <PEPPER>");
  process.exit(1);
}

const h = createHash("sha256")
  .update(`${pepper}:${hospitalId}:${code.trim().toUpperCase()}`)
  .digest("hex");

console.log(h);
