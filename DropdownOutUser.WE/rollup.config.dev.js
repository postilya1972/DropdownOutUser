const { BUNDLE_DIR } = require("./copy-path");
const defaultOptions = require("@docsvision/webclient-extension-build/rollup.config.js");

module.exports = {
  input: 'src/Index.ts',
  output: {
    dir: BUNDLE_DIR,
    format: defaultOptions.output.format,
    sourcemap: true
  },
  plugins: defaultOptions.plugins,
  external: defaultOptions.external
};