import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'

const extensions = ['.ts']

const babelOptions = {
    babelrc: false,
    extensions,
    exclude: '**/node_modules/**',
    babelHelpers: 'bundled',
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                modules: false,
                targets: '>1%, not dead, not ie 11, not op_mini all',
            },
        ],
        '@babel/preset-typescript',
    ],
}

export default [
    {
        input: `./src/weatherbot-dev-plotter`,
        output: { file: `dist/weatherbot-dev-plotter.js`, format: 'esm' },
        plugins: [json(), resolve({ extensions }), babel(babelOptions), filesize()],
    },
    {
        input: `./src/weatherbot-dev-plotter`,
        output: { file: `dist/weatherbot-dev-plotter.cjs.js`, format: 'cjs' },
        plugins: [
            json(),
            resolve({ extensions }),
            babel(babelOptions),
            replace({
                'globalThis.preformance': `require('perf_hooks').performance`,
            }),
            filesize(),
        ],
    },
]
