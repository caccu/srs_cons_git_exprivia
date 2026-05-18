const fs = require("fs");
const path = require("path");
const {globSync} = require("glob");

const NOTES_GLOB = "src/site/notes/**/*.md";
const FRONT_MATTER_REGEX = /^(---)(\r?\n)([\s\S]*?)(\r?\n)(---)(\r?\n|$)/;

let updatedFiles = 0;
let replacements = 0;

for (const filePath of globSync(NOTES_GLOB)) {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, "utf8");
  const match = content.match(FRONT_MATTER_REGEX);

  if (!match) {
    continue;
  }

  const [
    ,
    frontMatterOpen,
    frontMatterOpenNewline,
    frontMatter,
    frontMatterCloseNewline,
    frontMatterClose,
    frontMatterTrailingNewline,
  ] = match;
  let escapedPipeCount = 0;
  const normalizedFrontMatter = frontMatter.replace(/\\\|/g, () => {
    escapedPipeCount += 1;
    return "|";
  });
  if (escapedPipeCount === 0) {
    continue;
  }

  replacements += escapedPipeCount;
  const normalizedFrontMatterBlock = `${frontMatterOpen}${frontMatterOpenNewline}${normalizedFrontMatter}${frontMatterCloseNewline}${frontMatterClose}${frontMatterTrailingNewline}`;
  const updatedContent =
    content.slice(0, match.index) +
    normalizedFrontMatterBlock +
    content.slice(match.index + match[0].length);
  fs.writeFileSync(absolutePath, updatedContent, "utf8");
  updatedFiles += 1;
}

console.log(
  `[sanitize:frontmatter] Updated ${updatedFiles} file(s), replaced ${replacements} escaped pipe(s).`
);
