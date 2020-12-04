module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 5,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'no-tabs': 0,
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'semi': [
      2,
      'never',
      {
        'beforeStatementContinuationChars': 'never'
      }
    ],
    'no-delete-var': 2,
    'prefer-const': [
      2,
      {
        'ignoreReadBeforeAssign': false
      }
    ],
    // 以下部分为解除eslint限制的代码，如不需要可删除
    'template-curly-spacing': 'off',
    'indent': ['error'],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': 'off',
    'indent': 'off',
    'spaced-comment': 'off',
    'no-trailing-spaces': 'off',
    'no-new': 'off',
    'key-spacing': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'quotes': 'off',
    'semi': 'off',
    'keyword-spacing': 'off',
    'space-before-blocks': 'off',
    'comma-spacing': 'off',
    'space-before-function-paren': 'off',
    'space-infix-ops': 'off',
    'no-multiple-empty-lines': 'off',
    'block-spacing': 'off',
    'padded-blocks': 'off',
    'arrow-spacing': 'off',
    'no-sequences': 'off',
    'no-unused-expressions': 'off',
    'no-multi-spaces': 'off',
    'no-unused-vars': 'off',
    'camelcase ': 'off',
    // 解除eslint限制的代码删除到这里为止
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}