// Entry for make.fun's "Sum up 26 November's world news in one image"
// bounty (news-image-20261126, Node 22, standard library only): its
// image is the entry.png beside this file, and the program copies it to
// /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB
// and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(
  new URL('./entry.png', import.meta.url),
  join(OUTPUT_DIR, 'entry.png'),
);

// Hand-in check: the copy must be byte-identical to the image beside
// this file, or the judge would see something else than the entry.
const source = readFileSync(new URL('./entry.png', import.meta.url));
const copied = readFileSync(join(OUTPUT_DIR, 'entry.png'));
if (!source.equals(copied)) {
  throw new Error('entry.png copy is not byte-identical to the source');
}
console.log('wrote entry.png');
