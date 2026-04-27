import { readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const assetsDir = join(clientDir, "assets");

const files = await readdir(assetsDir);
const indexChunks = await Promise.all(
  files
    .filter((file) => /^index-[\w-]+\.js$/.test(file))
    .map(async (file) => ({
      file,
      size: (await stat(join(assetsDir, file))).size,
    })),
);
const entry = indexChunks.sort((a, b) => b.size - a.size)[0]?.file;
const stylesheet = files.find((file) => /^styles-[\w-]+\.css$/.test(file));

if (!entry) {
  throw new Error("Could not find the generated client entry in dist/client/assets.");
}

const cssTag = stylesheet
  ? `    <link rel="stylesheet" href="/assets/${stylesheet}" />\n`
  : "";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>KosherLending AI Content OS</title>
${cssTag}  </head>
  <body>
    <script type="module" src="/assets/${entry}"></script>
  </body>
</html>
`;

await writeFile(join(clientDir, "index.html"), html, "utf8");
