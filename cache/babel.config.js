const hjson = require("hjson");
const fs = require("fs");
const path = require("path");

const text = fs.readFileSync("./tsconfig.json", { encoding: "utf8" });

const tsConfig = hjson.parse(text);

const pathMap = tsConfig.compilerOptions.paths || {};
const pathAlias = Object.keys(pathMap).reduce((prev, curr) => {
  const realKey = `${curr}`.replace(/\/\*$/, "");
  const realPath = `/${(pathMap[curr] || [])[0]}`
    .replace(/\/\*$/, "")
    .replace(/^\S*src/, "./dist");
  prev[realKey] = realPath;
  return prev;
}, {});

module.exports = function (api) {
  api.cache(true);

  const plugins = [
    [
      "module-resolver",
      {
        root: ["dist/"],
        alias: pathAlias,
      },
    ],
  ];

  return {
    plugins,
  };
};
