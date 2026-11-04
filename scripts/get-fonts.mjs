// Erode's licence lets us self-host it on our own site but not share the files through a public
// repository. So src/fonts is git-ignored and this fetches the official files from Fontshare.
import { access, mkdir, rename, writeFile } from "node:fs/promises";

const CSS_URL = "https://api.fontshare.com/v2/css?f%5B%5D=erode@1,2&display=swap";
const FONT_DIR = new URL("../src/fonts/", import.meta.url);
const FILES = { normal: "Erode-Variable.woff2", italic: "Erode-VariableItalic.woff2" };
const ATTEMPTS = 3;
const TIMEOUT_MS = 30000;
const RETRY_WAIT_MS = 3000;

async function exists(url)
{
  try {
    await access(url);
    return true;
  } catch {
    return false;
  }
}

async function fetchOk(url)
{
  const res = await fetch(url, {
    headers: { "User-Agent": "clupai-site-build" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`${url} answered ${res.status}`);
  }
  return res;
}

function woff2Urls(css)
{
  const urls = {};
  for (const block of css.split("@font-face").slice(1)) {
    const style = block.match(/font-style:\s*(normal|italic)/)?.[1];
    const path = block.match(/url\('(\/\/[^']+\.woff2)'\)/)?.[1];
    if (style && path) {
      urls[style] = `https:${path}`;
    }
  }
  return urls;
}

async function download()
{
  const css = await (await fetchOk(CSS_URL)).text();
  const urls = woff2Urls(css);
  for (const [style, name] of Object.entries(FILES)) {
    if (!urls[style]) {
      throw new Error(`Fontshare's stylesheet has no ${style} woff2`);
    }
    const bytes = Buffer.from(await (await fetchOk(urls[style])).arrayBuffer());
    if (bytes.subarray(0, 4).toString("latin1") !== "wOF2") {
      throw new Error(`${name} isn't a woff2 file`);
    }
    // Written then renamed, so a build killed halfway can't leave a cut-off file that counts as done.
    const part = new URL(`${name}.part`, FONT_DIR);
    await writeFile(part, bytes);
    await rename(part, new URL(name, FONT_DIR));
  }
}

async function main()
{
  const present = await Promise.all(Object.values(FILES).map((name) => exists(new URL(name, FONT_DIR))));
  if (present.every(Boolean)) {
    return;
  }
  await mkdir(FONT_DIR, { recursive: true });
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      await download();
      return;
    } catch (error) {
      console.error(`Fetching Erode, attempt ${attempt} of ${ATTEMPTS}: ${error.message}`);
      await new Promise((done) => setTimeout(done, RETRY_WAIT_MS));
    }
  }
  process.exit(1);
}

await main();
