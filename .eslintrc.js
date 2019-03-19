module.exports = {
    root:          true,
    parser:        'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    env:           {
        browser: true,
    },
    extends:       'airbnb-base',
    'rules':       {
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'semi':        [2, 'never'],
        'indent':      ['error', 'tab'],
    },
}