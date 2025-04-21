import path from "path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const aliases = {
	"@": fileURLToPath(new URL("./src", import.meta.url)),
	"@scss": fileURLToPath(new URL("./src/assets/scss", import.meta.url)),
};

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => ({
	build: {
		rollupOptions: {
			input: {
				main: path.resolve(root, "index.html"),
				about: path.resolve(root, "pages/about/index.html"),
				err404: path.resolve(root, "pages/error/index.html"),
			},
		},
	},
	resolve: {
		alias: aliases,
	},
	plugins: [],
	css: {
		postcss: "./postcss.config.js",
		devSourcemap: mode === "development",
	},
}));
