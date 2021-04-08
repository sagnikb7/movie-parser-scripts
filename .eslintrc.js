module.exports = {
    env: {
        es6  : true,
        node : true,
    },
    extends       : 'airbnb-base',
    parserOptions : {
        experimentalObjectRestSpread : true,
        ecmaVersion                  : 2018,
        sourceType                   : 'module',
    },
    rules: {
        indent                      : ['error', 4],
        'no-underscore-dangle'      : 'off',
        'import/no-dynamic-require' : 'off',
        'no-unused-vars'            : 'error',
        camelcase                   : ['error', { properties: 'never', ignoreDestructuring: true }],
        'key-spacing'               : ['error', {
            multiLine: {
                beforeColon : false,
                afterColon  : true,
            },
            align: {
                beforeColon : true,
                afterColon  : true,
                on          : 'colon',
            },
        }],
        'object-curly-newline' : 'off',
        'no-param-reassign'    : 'off',
        'no-await-in-loop'     : 'off',
        'global-require'       : 'off',
        'no-continue'          : 'off',
    },
};
