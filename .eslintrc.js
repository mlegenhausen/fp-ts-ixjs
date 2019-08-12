module.exports = {
  extends: [
    'werk85/modern'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    'import/ignore': [
      'cors',
      'fork-ts-checker-webpack-plugin',
      'pino',
      'express',
      'jwks-rsa',
      'pg',
      'webpackbar'
    ]
  }
}