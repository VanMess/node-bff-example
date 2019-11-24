// https://eslint.org/docs/user-guide/configuring

module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    camelcase: 0
  }
};
