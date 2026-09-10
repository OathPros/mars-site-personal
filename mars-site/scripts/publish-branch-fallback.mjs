import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(projectRoot, "..");
const dist = resolve(projectRoot, "dist");
const assets = resolve(repositoryRoot, "assets");

await rm(assets, { force: true, recursive: true });
await mkdir(assets, { recursive: true });

await Promise.all([
  cp(resolve(dist, "assets"), assets, { recursive: true }),
  cp(resolve(dist, "favicon.svg"), resolve(repositoryRoot, "favicon.svg")),
  cp(resolve(dist, "icons.svg"), resolve(repositoryRoot, "icons.svg")),
  cp(resolve(dist, "index.html"), resolve(repositoryRoot, "index.html")),
  writeFile(resolve(repositoryRoot, ".nojekyll"), ""),
]);

// Reuse the logo already tracked with the source project instead of checking in
// a second binary copy, which some patch/PR systems cannot represent.
for (const name of (await readdir(assets)).filter((name) => name.endsWith(".js"))) {
  const path = resolve(assets, name);
  const contents = await readFile(path, "utf8");
  await writeFile(
    path,
    contents.replaceAll("./yorku-logo.png", "./mars-site/public/yorku-logo.png"),
  );
}
