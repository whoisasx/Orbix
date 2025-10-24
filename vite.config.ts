import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// import rollupNodePolyFill from "rollup-plugin-polyfill-node";

import { nodePolyfills } from "vite-plugin-node-polyfills";
// Add WASM plugin so Vite can handle ESM style .wasm imports (ESM integration proposal)
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), nodePolyfills(), wasm()],
	// resolve: {
	// 	alias: {
	// 		process: "process/browser",
	// 		buffer: "buffer",
	// 		stream: "stream-browserify",
	// 		crypto: "crypto-browserify",
	// 	},
	// },
	// define: {
	// 	global: "globalThis",
	// },
	// build: {
	// 	rollupOptions: {
	// 		plugins: [rollupNodePolyFill()],
	// 	},
	// },
	// optimizeDeps: {
	// 	esbuildOptions: {
	// 		define: {
	// 			global: "globalThis",
	// 		},
	// 		plugins: [
	// 			NodeGlobalsPolyfillPlugin({
	// 				process: true,
	// 				buffer: true,
	// 			}),
	// 			NodeModulesPolyfillPlugin(),
	// 		],
	// 	},
	// },
});
