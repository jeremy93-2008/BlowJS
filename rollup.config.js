import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default [
    {
        input: 'src/index.ts',
        external: ['ms'],
        output: [
            { file: "dist/" + pkg.main, format: 'cjs' }
        ],
        plugins: [
            typescript()
        ]
    }
];