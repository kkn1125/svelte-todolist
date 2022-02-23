import path from 'path';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import alias from '@rollup/plugin-alias';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// compilerOptions: {
			// 	// enable run-time checks when not in production
			// 	dev: !production,
			// },
			dev: !production,
			css: css => {
				css.write('public/bundle.css')
			},
			preprocess: sveltePreprocess({
				scss: {
					// 전역에서 사용할 SCSS 파일을 지정합니다.
					// 단, style 태그에 lang="scss"가 지정되어 있어야 적용됩니다.
					prependData: '@import "./src/scss/main.scss";',
				},
				// PostCSS는 Autoprefixer를 설치하면 같이 설치됩니다.(9버전)
				// 10버전 이상은 postcss를 별도 설치해야 합니다.(npm i -D postcss)
				// Autoprefixer는 CSS에 자동으로 공급 업체 접두사(Vendor prefix)를 적용합니다.
				postcss: {
					plugins: [
						require('autoprefixer')()
					]
				}
			}),
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),

		commonjs(),
		// 일부 Node 모듈이 필요로 하는 전역 API를 사용할 수 있습니다.
		globals(),
		// Node 내장 API를 사용할 수 있습니다.
		builtins(),

		alias({
			entries: [
				{ find: '~', replacement: path.resolve(__dirname, 'src/') }
			]
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
