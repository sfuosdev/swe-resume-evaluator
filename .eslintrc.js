module.exports = {
    extends: ['react-app', 'react-app/jest', 'airbnb', 'airbnb/hooks', 'plugin:testing-library/react', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
    plugins: ['react', 'jest'],
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