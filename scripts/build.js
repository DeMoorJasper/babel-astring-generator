const fs = require("fs-extra");
const path = require("path");
const rollup = require("rollup");
const rollupPluginBabel = require("@rollup/plugin-babel");

const DIST_DIR = path.join(__dirname, "lib");

const bundles = [
  {
    format: "cjs",
    ext: ".js",
    plugins: [],
    babelPresets: [["@babel/preset-env", {}]],
  },
  {
    format: "esm",
    ext: ".mjs",
    plugins: [],
    babelPresets: [["@babel/preset-env", {}]],
  },
];

async function run() {
  // Clean up the output directory
  if (fs.existsSync(DIST_DIR)) {
    await fs.rmdir(DIST_DIR);
  }

  for (config of bundles) {
    // Compile code
    let bundle = await rollup.rollup({
      input: "src/index.js",
      external: ['astring'],
      plugins: [
        rollupPluginBabel.babel({
          babelrc: false,
          babelHelpers: "bundled",
          exclude: "node_modules/**",
          presets: config.babelPresets,
          plugins: [],
        }),
      ],
    });
    await bundle.write({
      file: `lib/index${config.ext}`,
      format: config.format,
    });
    await bundle.close();
  }
}

run().catch(console.error);
