module.exports = {
  // @FIXME: Remove the testRegex once `controllers/test` has been removed.
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.[jt]sx?$',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy'
  },
  verbose: true
}
