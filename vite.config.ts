import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			process: "process/browser",
			buffer: "buffer",
			stream: "stream-browserify",
			crypto: "crypto-browserify",
		},
	},
	define: {
		global: "globalThis",
	},
	build: {
		rollupOptions: {
			plugins: [rollupNodePolyFill()],
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: "globalThis",
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					process: true,
					buffer: true,
				}),
				NodeModulesPolyfillPlugin(),
			],
		},
	},
});
