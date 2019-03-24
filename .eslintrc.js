module.exports = {
    root:          true,
    parser:        'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    env:           {
        browser: true,
    },
    extends:       "standard",
    'rules':       {
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'semi':        [2, 'never'],
        "indent": ["error", 4],
        "no-return-await": 0
    },
}
