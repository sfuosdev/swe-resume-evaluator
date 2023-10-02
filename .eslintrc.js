module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
        'airbnb',
        'airbnb/hooks',
        'plugin:testing-library/react',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', 'jest', '@emotion'],
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    rules: {
        'linebreak-style': 'off',
        'no-useless-constructor': 0,
        'import/prefer-default-export': 0,
        'jest/no-identical-title': 0,
        '@emotion/jsx-import': 0,
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};