import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;
const buildMode = process.env.NODE_ENV === "production";

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());
// const build = {
//   input: buildMode?"":"src/index.js",
//   output: [
//     { file: pkg.module, format: "es" },
//     { file: pkg.main, format: "umd", name },
//   ],
//   plugins: [
//     svelte({
//       compilerOptions: {
//         customElement: true,
//       }
//     }),
//     resolve(),
//   ],
// };

const config = {
  input: production ? "src/index.js" : "src/main.js",
  output: production
    ? [
        { file: pkg.module, format: "es" },
        { file: pkg.main, format: "umd", name },
      ]
    : {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "public/index.js",
      },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
        customElement: !!production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "index.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the directory and refresh the
    // browser on changes when not in production
    !production && livereload("."),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

export default config;
