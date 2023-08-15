import { config } from '../../wdio.conf';

// Appium capabilities
// https://appium.io/docs/en/writing-running-appium/caps/
config.capabilities = [
  {
    platformName: 'iOS',
    'appium:options': {
      automationName: 'XCUITest',
      platformVersion: '15.5',
      app: './ios/build/Build/Products/Debug-iphonesimulator/MetaMask-QA.app',
      deviceName: 'iPhone 12 Pro',
      settings: {
        snapshotMaxDepth: 100, // Enable testID on deep nested elements
      },
      language: 'en',
    },
    maxInstances: 1,
  },
];

config.cucumberOpts.tagExpression = '@performance and @iosApp'; // pass tag to run tests specific to ios

const _config = config;
// eslint-disable-next-line import/prefer-default-export
export { _config as config };
